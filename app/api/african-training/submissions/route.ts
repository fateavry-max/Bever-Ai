import { NextRequest, NextResponse } from 'next/server';
import { readDatabase, writeDatabase, getOrCreateProfileForEmail } from '@/lib/african-training-store';
import {
  evaluateSubmissionQualityAndFraud,
  type AfricanTaskSubmission,
} from '@/lib/african-training';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const role = (req.headers.get('x-bever-role') || '').toLowerCase();
  const requesterEmail = (req.headers.get('x-bever-email') || '').toLowerCase();
  const url = new URL(req.url);
  const statusFilter = url.searchParams.get('status') || undefined;

  if (!role || role === 'guest') {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const db = readDatabase();
  let submissions = db.submissions;

  if (role !== 'admin') {
    submissions = submissions.filter(
      (s) => s.contributorEmail.toLowerCase() === requesterEmail
    );
  }

  if (statusFilter && statusFilter !== 'all') {
    submissions = submissions.filter((s) => s.status === statusFilter);
  }

  return NextResponse.json({ submissions });
}

export async function POST(req: NextRequest) {
  const role = (req.headers.get('x-bever-role') || '').toLowerCase();
  const email = (req.headers.get('x-bever-email') || '').trim();
  const nameHeader = req.headers.get('x-bever-name') || undefined;
  const applicantIdHeader = req.headers.get('x-bever-id') || undefined;

  if (role !== 'contributor' && role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden: Only authenticated contributors can submit training tasks.' },
      { status: 403 }
    );
  }
  if (!email) {
    return NextResponse.json({ error: 'Authenticated contributor email is required.' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const taskId = String(body.taskId || '').trim();
    const primaryAnswer = String(body.primaryAnswer || '').trim();
    const rubricNotes = String(body.rubricNotes || '').trim();
    const translationOrTranscript = body.translationOrTranscript
      ? String(body.translationOrTranscript).trim()
      : undefined;
    const annotationTags = Array.isArray(body.annotationTags)
      ? body.annotationTags.map((t: unknown) => String(t).trim()).filter(Boolean)
      : undefined;
    const ratingScore =
      body.ratingScore !== undefined ? Number(body.ratingScore) : undefined;
    const attachmentName = body.attachmentName ? String(body.attachmentName).trim() : undefined;
    const voiceDurationSec =
      body.voiceDurationSec !== undefined ? Number(body.voiceDurationSec) : undefined;
    const consentAccepted = Boolean(body.consentAccepted);
    const completionSeconds = Number(body.completionSeconds || 60);

    const db = readDatabase();
    const task = db.tasks.find((t) => t.id === taskId);
    if (!task) {
      return NextResponse.json({ error: 'Training task not found.' }, { status: 404 });
    }
    if (task.status !== 'published') {
      return NextResponse.json(
        { error: 'This task is currently paused or archived and no longer accepting submissions.' },
        { status: 400 }
      );
    }

    const fraudCheck = evaluateSubmissionQualityAndFraud(
      {
        primaryAnswer,
        rubricNotes,
        completionSeconds,
        consentAccepted,
        contributorEmail: email,
        taskId,
      },
      db.submissions
    );

    if (!fraudCheck.valid) {
      return NextResponse.json({ error: fraudCheck.validationError }, { status: 400 });
    }

    const profile = getOrCreateProfileForEmail(db, email, nameHeader, applicantIdHeader);
    if (profile.accountStatus === 'suspended') {
      return NextResponse.json(
        { error: 'Your contributor account is suspended pending compliance audit.' },
        { status: 403 }
      );
    }

    if (!profile.consentSigned && consentAccepted) {
      profile.consentSigned = true;
      profile.consentSignedAt = new Date().toISOString();
    }
    if (fraudCheck.flags.length > 0) {
      profile.fraudFlagsCount += fraudCheck.flags.length;
    }

    const newSubmission: AfricanTaskSubmission = {
      id: `SUB-AF-${Math.floor(1000 + Math.random() * 8999)}`,
      taskId: task.id,
      taskTitle: task.title,
      category: task.category,
      language: task.language,
      contributorEmail: profile.email,
      contributorName: profile.name,
      contributorId: profile.applicantId,
      responsePayload: {
        primaryAnswer,
        translationOrTranscript,
        annotationTags,
        ratingScore,
        rubricNotes,
        attachmentName,
        voiceDurationSec,
      },
      consentAccepted,
      consentScope: task.requiresConsentType,
      completionSeconds: Math.max(1, Math.round(completionSeconds)),
      status: 'pending',
      rewardUsd: task.rewardUsd,
      qualityScore: null,
      fraudFlags: fraudCheck.flags,
      reviewNotes: '',
      reviewedBy: null,
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
    };

    db.submissions.unshift(newSubmission);
    writeDatabase(db);

    return NextResponse.json({ submission: newSubmission }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid submission payload.' }, { status: 400 });
  }
}
