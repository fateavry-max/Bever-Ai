import { NextRequest, NextResponse } from 'next/server';
import { readDatabase, writeDatabase, getOrCreateProfileForEmail } from '@/lib/african-training-store';
import {
  AFRICAN_TRAINING_CATEGORIES,
  calculateContributorLedger,
  type AfricanTrainingCategory,
  type LanguageProficiency,
} from '@/lib/african-training';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const role = (req.headers.get('x-bever-role') || '').toLowerCase();
  const email = (req.headers.get('x-bever-email') || '').trim();
  const name = req.headers.get('x-bever-name') || undefined;
  const applicantId = req.headers.get('x-bever-id') || undefined;
  const url = new URL(req.url);
  const scope = url.searchParams.get('scope');

  if (!role || role === 'guest') {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const db = readDatabase();

  if (scope === 'all') {
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required.' }, { status: 403 });
    }
    const enriched = db.profiles.map((profile) => {
      const subs = db.submissions.filter(
        (s) => s.contributorEmail.toLowerCase() === profile.email.toLowerCase()
      );
      const wds = db.withdrawals.filter(
        (w) => w.contributorEmail.toLowerCase() === profile.email.toLowerCase()
      );
      return {
        ...profile,
        ledger: calculateContributorLedger(subs, wds),
      };
    });
    return NextResponse.json({ profiles: enriched });
  }

  if (!email) {
    return NextResponse.json({ error: 'User email header missing.' }, { status: 400 });
  }

  const profile = getOrCreateProfileForEmail(db, email, name, applicantId);
  return NextResponse.json({ profile });
}

export async function PUT(req: NextRequest) {
  const role = (req.headers.get('x-bever-role') || '').toLowerCase();
  const email = (req.headers.get('x-bever-email') || '').trim();
  const nameHeader = req.headers.get('x-bever-name') || undefined;
  const applicantIdHeader = req.headers.get('x-bever-id') || undefined;

  if (!role || role === 'guest' || !email) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const db = readDatabase();
    const profile = getOrCreateProfileForEmail(db, email, nameHeader, applicantIdHeader);

    const country = String(body.country || profile.country).trim();
    const languagesSpoken: LanguageProficiency[] = Array.isArray(body.languagesSpoken)
      ? body.languagesSpoken
          .map((item: unknown) => {
            const obj = item as Partial<LanguageProficiency>;
            return {
              language: String(obj.language || '').trim(),
              proficiency: (obj.proficiency || 'Fluent') as LanguageProficiency['proficiency'],
            };
          })
          .filter((l: LanguageProficiency) => l.language.length > 0)
      : profile.languagesSpoken;

    const accentsDialects: string[] = Array.isArray(body.accentsDialects)
      ? body.accentsDialects.map((a: unknown) => String(a).trim()).filter(Boolean)
      : profile.accentsDialects;

    const skills: string[] = Array.isArray(body.skills)
      ? body.skills.map((s: unknown) => String(s).trim()).filter(Boolean)
      : profile.skills;

    const preferredCategories: AfricanTrainingCategory[] = Array.isArray(body.preferredCategories)
      ? body.preferredCategories.filter((c: unknown): c is AfricanTrainingCategory =>
          AFRICAN_TRAINING_CATEGORIES.includes(c as AfricanTrainingCategory)
        )
      : profile.preferredCategories;

    const previousExperience =
      body.previousExperience !== undefined
        ? String(body.previousExperience).trim()
        : profile.previousExperience;

    const consentSigned =
      body.consentSigned !== undefined ? Boolean(body.consentSigned) : profile.consentSigned;

    const idx = db.profiles.findIndex(
      (p) => p.email.toLowerCase() === profile.email.toLowerCase()
    );

    db.profiles[idx] = {
      ...profile,
      name: body.name ? String(body.name).trim() : profile.name,
      country,
      languagesSpoken,
      accentsDialects,
      skills,
      preferredCategories,
      previousExperience,
      consentSigned,
      consentSignedAt:
        consentSigned && !profile.consentSignedAt
          ? new Date().toISOString()
          : profile.consentSignedAt,
      updatedAt: new Date().toISOString(),
    };

    writeDatabase(db);
    return NextResponse.json({ profile: db.profiles[idx] });
  } catch {
    return NextResponse.json({ error: 'Invalid profile update payload.' }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const role = (req.headers.get('x-bever-role') || '').toLowerCase();
  if (role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden: Admin access required.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const targetEmail = String(body.email || '').trim().toLowerCase();
    const accountStatus = body.accountStatus;
    if (
      accountStatus !== 'active' &&
      accountStatus !== 'flagged' &&
      accountStatus !== 'suspended'
    ) {
      return NextResponse.json({ error: 'Invalid account status.' }, { status: 400 });
    }

    const db = readDatabase();
    const idx = db.profiles.findIndex((p) => p.email.toLowerCase() === targetEmail);
    if (idx === -1) {
      return NextResponse.json({ error: 'Contributor profile not found.' }, { status: 404 });
    }

    db.profiles[idx].accountStatus = accountStatus;
    db.profiles[idx].updatedAt = new Date().toISOString();
    writeDatabase(db);

    return NextResponse.json({ profile: db.profiles[idx] });
  } catch {
    return NextResponse.json({ error: 'Invalid status update payload.' }, { status: 400 });
  }
}
