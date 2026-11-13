import { NextRequest, NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/african-training-store';
import { calculateContributorLedger } from '@/lib/african-training';

export const dynamic = 'force-dynamic';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const role = (req.headers.get('x-bever-role') || '').toLowerCase();
  const reviewerEmail = req.headers.get('x-bever-email') || 'staff@bever.ai';

  if (role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden: Only Bever Administrators can approve or reject submissions.' },
      { status: 403 }
    );
  }

  try {
    const { id } = await context.params;
    const body = await req.json();
    const decision = body.status;
    if (decision !== 'approved' && decision !== 'rejected') {
      return NextResponse.json(
        { error: 'Invalid review status. Must be "approved" or "rejected".' },
        { status: 400 }
      );
    }

    const qualityScoreRaw =
      body.qualityScore !== undefined ? Number(body.qualityScore) : decision === 'approved' ? 96 : 45;
    const qualityScore = Math.max(0, Math.min(100, Math.round(qualityScoreRaw)));
    const reviewNotes = String(body.reviewNotes || '').trim();

    if (decision === 'rejected' && reviewNotes.length < 5) {
      return NextResponse.json(
        { error: 'Please provide a clear rejection reason so the contributor can learn from feedback.' },
        { status: 400 }
      );
    }

    const db = readDatabase();
    const idx = db.submissions.findIndex((s) => s.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
    }

    const sub = db.submissions[idx];
    db.submissions[idx] = {
      ...sub,
      status: decision,
      qualityScore,
      reviewNotes:
        reviewNotes ||
        (decision === 'approved'
          ? 'Approved after quality and cultural accuracy audit.'
          : 'Rejected during quality review.'),
      reviewedBy: reviewerEmail,
      reviewedAt: new Date().toISOString(),
    };

    // Recompute contributor average quality score
    const contributorSubs = db.submissions.filter(
      (s) => s.contributorEmail.toLowerCase() === sub.contributorEmail.toLowerCase()
    );
    const contributorWds = db.withdrawals.filter(
      (w) => w.contributorEmail.toLowerCase() === sub.contributorEmail.toLowerCase()
    );
    const ledger = calculateContributorLedger(contributorSubs, contributorWds);

    const profileIdx = db.profiles.findIndex(
      (p) => p.email.toLowerCase() === sub.contributorEmail.toLowerCase()
    );
    if (profileIdx !== -1) {
      db.profiles[profileIdx].qualityScore = ledger.averageQualityScore;
      db.profiles[profileIdx].updatedAt = new Date().toISOString();
    }

    writeDatabase(db);
    return NextResponse.json({ submission: db.submissions[idx], ledger });
  } catch {
    return NextResponse.json({ error: 'Invalid review payload.' }, { status: 400 });
  }
}
