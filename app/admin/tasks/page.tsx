'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, FileUp, PlusCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { buildBeverHeaders } from '@/lib/african-training-client';
import {
  AFRICAN_TRAINING_CATEGORIES,
  TASK_DIFFICULTIES,
  type AfricanTrainingCategory,
  type AfricanTrainingTask,
  type ConsentRequirementType,
  type TaskDifficulty,
} from '@/lib/african-training';

export default function AdminTasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<AfricanTrainingTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Create Task Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AfricanTrainingCategory>('African Languages');
  const [language, setLanguage] = useState('Yoruba');
  const [dialectOrRegion, setDialectOrRegion] = useState('Southwest Nigeria');
  const [difficulty, setDifficulty] = useState<TaskDifficulty>('Intermediate');
  const [rewardUsd, setRewardUsd] = useState('18.00');
  const [estimatedMinutes, setEstimatedMinutes] = useState('20');
  const [requiresConsentType, setRequiresConsentType] =
    useState<ConsentRequirementType>('standard');
  const [instructions, setInstructions] = useState('');
  const [guidelinesText, setGuidelinesText] = useState('');
  const [exampleInput, setExampleInput] = useState('');
  const [exampleOutput, setExampleOutput] = useState('');
  const [datasetSnippet, setDatasetSnippet] = useState('');
  const [datasetFileName, setDatasetFileName] = useState('');
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (!user) return;
    let active = true;
    async function loadTasks() {
      try {
        const res = await fetch('/api/african-training/tasks?all=1', {
          headers: buildBeverHeaders(user),
        });
        const data = await res.json();
        if (active) setTasks(data.tasks || []);
      } catch {
        // Ignored
      } finally {
        if (active) setLoading(false);
      }
    }
    loadTasks();
    return () => {
      active = false;
    };
  }, [user]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDatasetFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const content = String(reader.result || '').slice(0, 800);
      if (content) {
        setDatasetSnippet(content);
      }
    };
    reader.readAsText(file);
  };

  const handlePublishTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setErrorMsg(null);
    setNotice(null);
    setPublishing(true);

    try {
      const res = await fetch('/api/african-training/tasks', {
        method: 'POST',
        headers: buildBeverHeaders(user),
        body: JSON.stringify({
          title,
          category,
          language,
          dialectOrRegion,
          difficulty,
          rewardUsd: Number(rewardUsd),
          estimatedMinutes: Number(estimatedMinutes),
          requiresConsentType,
          instructions,
          guidelines: guidelinesText,
          exampleInput,
          exampleOutput,
          datasetSnippet,
          datasetFileName: datasetFileName || undefined,
          status: 'published',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Could not publish task.');
      } else {
        setTasks((prev) => [data.task, ...prev]);
        setNotice(`Published task ${data.task.id}: "${data.task.title}" ($${data.task.rewardUsd.toFixed(2)})`);
        setTitle('');
        setInstructions('');
        setGuidelinesText('');
        setExampleInput('');
        setExampleOutput('');
        setDatasetSnippet('');
        setDatasetFileName('');
      }
    } catch {
      setErrorMsg('Network error publishing task.');
    } finally {
      setPublishing(false);
    }
  };

  const handleUpdateTaskStatus = async (
    taskId: string,
    newStatus: 'published' | 'paused' | 'archived',
    newReward?: number
  ) => {
    if (!user) return;
    try {
      const res = await fetch('/api/african-training/tasks', {
        method: 'PATCH',
        headers: buildBeverHeaders(user),
        body: JSON.stringify({ id: taskId, status: newStatus, rewardUsd: newReward }),
      });
      const data = await res.json();
      if (res.ok && data.task) {
        setTasks((prev) => prev.map((t) => (t.id === taskId ? data.task : t)));
        setNotice(`Updated ${taskId} status to ${newStatus}.`);
      }
    } catch {
      // Ignored
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="pb-5 border-b border-black/[0.06]">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
          Admin Task &amp; Dataset Manager
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
          Publish African AI Training Tasks &amp; Datasets
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Create training tasks across the 8 African AI categories, attach datasets and instructions, and adjust task rewards.
        </p>
      </div>

      {notice && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
          {errorMsg}
        </div>
      )}

      {/* Create & Publish New Task Form */}
      <form
        onSubmit={handlePublishTask}
        className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <h2 className="text-base font-semibold text-zinc-950 flex items-center gap-2 font-display">
            <PlusCircle className="w-4 h-4 text-zinc-700" />
            <span>Create &amp; Publish Training Task</span>
          </h2>
          <span className="text-xs font-mono text-zinc-400">Live Contributor Dispatch</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="admin-task-title" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Task Title *
            </label>
            <input
              id="admin-task-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Hausa Agricultural Proverbs & Tone Verification"
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 focus:bg-white focus:outline-hidden focus:border-zinc-950"
            />
          </div>

          <div>
            <label htmlFor="admin-task-category" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Category *
            </label>
            <select
              id="admin-task-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as AfricanTrainingCategory)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950"
            >
              {AFRICAN_TRAINING_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label htmlFor="admin-task-lang" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Target Language *
            </label>
            <input
              id="admin-task-lang"
              type="text"
              required
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="e.g. Yoruba / Hausa"
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950"
            />
          </div>

          <div>
            <label htmlFor="admin-task-region" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Dialect / Region
            </label>
            <input
              id="admin-task-region"
              type="text"
              value={dialectOrRegion}
              onChange={(e) => setDialectOrRegion(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950"
            />
          </div>

          <div>
            <label htmlFor="admin-task-diff" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Difficulty
            </label>
            <select
              id="admin-task-diff"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as TaskDifficulty)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950"
            >
              {TASK_DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="admin-task-reward" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Task Reward (USD) *
            </label>
            <input
              id="admin-task-reward"
              type="number"
              step="0.50"
              min="1"
              required
              value={rewardUsd}
              onChange={(e) => setRewardUsd(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-950"
            />
          </div>

          <div>
            <label htmlFor="admin-task-consent" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Privacy Consent Policy
            </label>
            <select
              id="admin-task-consent"
              value={requiresConsentType}
              onChange={(e) => setRequiresConsentType(e.target.value as ConsentRequirementType)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950"
            >
              <option value="standard">Standard Data Integrity</option>
              <option value="voice">Voice &amp; Speech Biometric</option>
              <option value="image_video">Image &amp; Video Privacy</option>
              <option value="personal_data">Cultural &amp; Personal Context</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="admin-task-instructions" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Contributor Instructions *
            </label>
            <textarea
              id="admin-task-instructions"
              rows={3}
              required
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Explain clearly what contributors need to record, transcribe, annotate, or evaluate..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950"
            />
          </div>

          <div>
            <label htmlFor="admin-task-guidelines" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Guidelines Checklist (one per line)
            </label>
            <textarea
              id="admin-task-guidelines"
              rows={3}
              value={guidelinesText}
              onChange={(e) => setGuidelinesText(e.target.value)}
              placeholder="Preserve tone marks&#10;Flag literal Western translations"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="admin-example-in" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Example Prompt Input
            </label>
            <input
              id="admin-example-in"
              type="text"
              value={exampleInput}
              onChange={(e) => setExampleInput(e.target.value)}
              placeholder="Sample source prompt or audio description"
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950"
            />
          </div>
          <div>
            <label htmlFor="admin-example-out" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Example Expected Output
            </label>
            <input
              id="admin-example-out"
              type="text"
              value={exampleOutput}
              onChange={(e) => setExampleOutput(e.target.value)}
              placeholder="Verified expected human annotation or translation"
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950"
            />
          </div>
        </div>

        {/* Dataset Upload / Snippet */}
        <div className="p-4 rounded-xl bg-[#FBFBFA] border border-black/[0.06] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label htmlFor="admin-dataset-snippet" className="text-xs font-medium text-zinc-800">
              Dataset Upload (JSON / JSONL / CSV) or Prompt Payload
            </label>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-black/[0.1] text-xs font-medium text-zinc-900 cursor-pointer hover:bg-zinc-50">
              <FileUp className="w-3.5 h-3.5" />
              <span>{datasetFileName ? `Attached: ${datasetFileName}` : 'Attach Dataset File'}</span>
              <input
                type="file"
                accept=".json,.jsonl,.csv,.txt"
                onChange={handleFileUpload}
                className="sr-only"
              />
            </label>
          </div>
          <textarea
            id="admin-dataset-snippet"
            rows={2}
            value={datasetSnippet}
            onChange={(e) => setDatasetSnippet(e.target.value)}
            placeholder="Paste sample dataset prompt or attach a JSONL/CSV batch above..."
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-mono text-zinc-900"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <label htmlFor="admin-est-mins">Est. Minutes:</label>
            <input
              id="admin-est-mins"
              type="number"
              min="5"
              value={estimatedMinutes}
              onChange={(e) => setEstimatedMinutes(e.target.value)}
              className="w-16 px-2 py-1 rounded-lg bg-zinc-50 border border-zinc-200 font-mono text-zinc-950"
            />
          </div>
          <button
            type="submit"
            disabled={publishing}
            className="px-6 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium cursor-pointer disabled:opacity-50"
          >
            {publishing ? 'Publishing Task...' : 'Publish African AI Task'}
          </button>
        </div>
      </form>

      {/* Catalog List */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <h2 className="text-base font-semibold text-zinc-950 font-display">
            Published Task Catalog ({tasks.length})
          </h2>
        </div>

        {loading ? (
          <p className="text-xs font-mono text-zinc-500">Loading tasks...</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl bg-[#FBFBFA] border border-black/[0.06] flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-zinc-500">
                    <span className="font-semibold text-zinc-900">{task.id}</span>
                    <span>·</span>
                    <span>{task.category}</span>
                    <span>·</span>
                    <span>{task.language}</span>
                    <span>·</span>
                    <span
                      className={`uppercase font-semibold ${
                        task.status === 'published' ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-zinc-950">{task.title}</p>
                  {task.datasetFileName && (
                    <span className="text-[11px] font-mono text-zinc-500 block">
                      Dataset: {task.datasetFileName}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-black/[0.08] font-semibold text-zinc-950 tabular-nums">
                    ${task.rewardUsd.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateTaskStatus(
                        task.id,
                        task.status,
                        Math.round((task.rewardUsd + 2) * 100) / 100
                      )
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-black/[0.08] hover:bg-zinc-100 text-zinc-800 cursor-pointer"
                  >
                    +$2 Reward
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateTaskStatus(
                        task.id,
                        task.status === 'published' ? 'paused' : 'published'
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white cursor-pointer"
                  >
                    {task.status === 'published' ? 'Pause' : 'Publish'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
