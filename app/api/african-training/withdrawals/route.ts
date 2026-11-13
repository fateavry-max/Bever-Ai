import { NextRequest, NextResponse } from 'next/server';
import { readDatabase, writeDatabase, getOrCreateProfileForEmail } from '@/lib/african-training-store';
import {
  calculateContributorLedger,
  validateWithdrawalRequest,
  type PayoutMethodType,
  type WithdrawalRequest,
} from '@/lib/african-training';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const role = (req.headers.get('x-bever-role') || '').toLowerCase();
  const email = (req.headers.get('x-bever-email') || '').trim();
  const url = new URL(req.url);
  const scope = url.searchParams.get('scope');

  if (!role || role === 'guest') {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const db = readDatabase();

  if (scope === 'all' && role === 'admin') {
    const platformTotals = calculateContributorLedger(db.submissions, db.withdrawals);
    return NextResponse.json({
      withdrawals: db.withdrawals,
      platformTotals,
    });
  }

  const userSubs = db.submissions.filter(
    (s) => s.contributorEmail.toLowerCase() === email.toLowerCase()
  );
  const userWithdrawals = db.withdrawals.filter(
    (w) => w.contributorEmail.toLowerCase() === email.toLowerCase()
  );
  const ledger = calculateContributorLedger(userSubs, userWithdrawals);

  return NextResponse.json({
    ledger,
    withdrawals: userWithdrawals,
  });
}

export async function POST(req: NextRequest) {
  const role = (req.headers.get('x-bever-role') || '').toLowerCase();
  const email = (req.headers.get('x-bever-email') || '').trim();
  const nameHeader = req.headers.get('x-bever-name') || undefined;
  const applicantIdHeader = req.headers.get('x-bever-id') || undefined;

  if ((role !== 'contributor' && role !== 'admin') || !email) {
    return NextResponse.json(
      { error: 'Forbidden: Authenticated contributor session required.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const amountUsd = Number(body.amountUsd);
    const payoutMethod = String(
      body.payoutMethod || 'Mobile Money (M-Pesa / MTN MoMo / Airtel)'
    ) as PayoutMethodType;
    const destinationAccount = String(body.destinationAccount || '').trim();

    const db = readDatabase();
    const profile = getOrCreateProfileForEmail(db, email, nameHeader, applicantIdHeader);

    const userSubs = db.submissions.filter(
      (s) => s.contributorEmail.toLowerCase() === email.toLowerCase()
    );
    const userWithdrawals = db.withdrawals.filter(
      (w) => w.contributorEmail.toLowerCase() === email.toLowerCase()
    );

    const ledger = calculateContributorLedger(userSubs, userWithdrawals);
    const check = validateWithdrawalRequest(amountUsd, ledger, destinationAccount);
    if (!check.valid) {
      return NextResponse.json({ error: check.error, ledger }, { status: 400 });
    }

    const newWithdrawal: WithdrawalRequest = {
      id: `WD-AF-${Math.floor(1000 + Math.random() * 8999)}`,
      contributorEmail: profile.email,
      contributorName: profile.name,
      amountUsd: Math.round(amountUsd * 100) / 100,
      payoutMethod,
      destinationAccount,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      processedAt: null,
      adminNote: '',
    };

    db.withdrawals.unshift(newWithdrawal);
    writeDatabase(db);

    const updatedLedger = calculateContributorLedger(userSubs, [
      newWithdrawal,
      ...userWithdrawals,
    ]);

    return NextResponse.json(
      { withdrawal: newWithdrawal, ledger: updatedLedger },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid withdrawal request.' }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const role = (req.headers.get('x-bever-role') || '').toLowerCase();
  if (role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden: Only Administrators can approve or settle withdrawals.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const id = String(body.id || '').trim();
    const status = body.status;
    const adminNote = String(body.adminNote || '').trim();

    if (status !== 'paid' && status !== 'rejected') {
      return NextResponse.json(
        { error: 'Invalid status. Must be "paid" or "rejected".' },
        { status: 400 }
      );
    }

    const db = readDatabase();
    const idx = db.withdrawals.findIndex((w) => w.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Withdrawal request not found.' }, { status: 404 });
    }

    db.withdrawals[idx] = {
      ...db.withdrawals[idx],
      status,
      processedAt: new Date().toISOString(),
      adminNote:
        adminNote ||
        (status === 'paid' ? 'Processed & settled via Bever Treasury.' : 'Rejected by Admin.'),
    };

    writeDatabase(db);
    return NextResponse.json({ withdrawal: db.withdrawals[idx] });
  } catch {
    return NextResponse.json({ error: 'Invalid payout update payload.' }, { status: 400 });
  }
}
