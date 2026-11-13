import { NextRequest, NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/african-training-store';
import {
  AFRICAN_TRAINING_CATEGORIES,
  filterAfricanTasks,
  type AfricanTrainingTask,
  type AfricanTrainingCategory,
  type TaskDifficulty,
  type ConsentRequirementType,
} from '@/lib/african-training';

export const dynamic = 'force-dynamic';

function getRequestRole(req: NextRequest): string {
  return (req.headers.get('x-bever-role') || 'guest').toLowerCase();
}

export async function GET(req: NextRequest) {
  const db = readDatabase();
  const url = new URL(req.url);
  const category = url.searchParams.get('category') || undefined;
  const language = url.searchParams.get('language') || undefined;
  const difficulty = url.searchParams.get('difficulty') || undefined;
  const searchQuery = url.searchParams.get('q') || undefined;
  const includeUnpublished = url.searchParams.get('all') === '1' && getRequestRole(req) === 'admin';

  const tasks = filterAfricanTasks(db.tasks, {
    category,
    language,
    difficulty,
    searchQuery,
    includeUnpublished,
  });

  return NextResponse.json({ tasks });
}

export async function POST(req: NextRequest) {
  const role = getRequestRole(req);
  if (role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden: Only Bever Administrators can create or publish training tasks.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const title = String(body.title || '').trim();
    const category = String(body.category || '') as AfricanTrainingCategory;
    const language = String(body.language || '').trim();
    const dialectOrRegion = String(body.dialectOrRegion || 'Pan-African').trim();
    const difficulty = (body.difficulty || 'Intermediate') as TaskDifficulty;
    const rewardUsd = Number(body.rewardUsd);
    const estimatedMinutes = Number(body.estimatedMinutes || 20);
    const instructions = String(body.instructions || '').trim();
    const datasetSnippet = String(body.datasetSnippet || '').trim();
    const datasetFileName = body.datasetFileName ? String(body.datasetFileName).trim() : undefined;
    const requiresConsentType = (body.requiresConsentType || 'standard') as ConsentRequirementType;
    const status = body.status === 'paused' ? 'paused' : 'published';
    const createdBy = req.headers.get('x-bever-email') || 'staff@bever.ai';

    if (!title || title.length < 4) {
      return NextResponse.json({ error: 'Task title is required (minimum 4 characters).' }, { status: 400 });
    }
    if (!AFRICAN_TRAINING_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: 'Invalid African AI Training category.' }, { status: 400 });
    }
    if (!language) {
      return NextResponse.json({ error: 'Target African language or locale is required.' }, { status: 400 });
    }
    if (!Number.isFinite(rewardUsd) || rewardUsd <= 0) {
      return NextResponse.json({ error: 'Task reward must be greater than $0.00.' }, { status: 400 });
    }
    if (!instructions || instructions.length < 15) {
      return NextResponse.json({ error: 'Clear task instructions (min 15 chars) are required.' }, { status: 400 });
    }

    const guidelines: string[] = Array.isArray(body.guidelines)
      ? body.guidelines.map((g: unknown) => String(g).trim()).filter(Boolean)
      : String(body.guidelines || '')
          .split('\n')
          .map((g) => g.trim())
          .filter(Boolean);

    const exampleInput = String(body.exampleInput || '').trim();
    const exampleOutput = String(body.exampleOutput || '').trim();
    const exampleNote = String(body.exampleNote || 'Verified cultural & linguistic standard.').trim();

    const examples =
      exampleInput && exampleOutput
        ? [{ input: exampleInput, expectedOutput: exampleOutput, note: exampleNote }]
        : [];

    const db = readDatabase();
    const prefix = category.slice(0, 3).toUpperCase().replace(/[^A-Z]/g, 'X');
    const newTask: AfricanTrainingTask = {
      id: `AF-${prefix}-${Math.floor(200 + Math.random() * 799)}`,
      title,
      category,
      language,
      dialectOrRegion,
      difficulty,
      rewardUsd: Math.round(rewardUsd * 100) / 100,
      estimatedMinutes: Math.max(5, Math.round(estimatedMinutes)),
      status,
      instructions,
      guidelines:
        guidelines.length > 0
          ? guidelines
          : ['Follow the published language orthography and cultural context guidelines.'],
      examples,
      datasetSnippet: datasetSnippet || 'Uploaded dataset batch ready for contributor evaluation.',
      datasetFileName,
      requiresConsentType,
      createdAt: new Date().toISOString(),
      createdBy,
    };

    db.tasks.unshift(newTask);
    writeDatabase(db);

    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const role = getRequestRole(req);
  if (role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden: Only Administrators can modify task state or rewards.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const taskId = String(body.id || '').trim();
    const db = readDatabase();
    const idx = db.tasks.findIndex((t) => t.id === taskId);
    if (idx === -1) {
      return NextResponse.json({ error: 'Task not found.' }, { status: 404 });
    }

    const existing = db.tasks[idx];
    const updatedReward =
      body.rewardUsd !== undefined && Number(body.rewardUsd) > 0
        ? Math.round(Number(body.rewardUsd) * 100) / 100
        : existing.rewardUsd;
    const updatedStatus =
      body.status === 'published' || body.status === 'paused' || body.status === 'archived'
        ? body.status
        : existing.status;

    db.tasks[idx] = {
      ...existing,
      rewardUsd: updatedReward,
      status: updatedStatus,
    };
    writeDatabase(db);

    return NextResponse.json({ task: db.tasks[idx] });
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }
}
