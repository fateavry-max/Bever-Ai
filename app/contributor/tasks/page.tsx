'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  DollarSign,
  Filter,
  Play,
  Search,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { buildBeverHeaders } from '@/lib/african-training-client';
import {
  AFRICAN_LANGUAGES,
  AFRICAN_TRAINING_CATEGORIES,
  TASK_DIFFICULTIES,
  filterAfricanTasks,
  type AfricanTaskSubmission,
  type AfricanTrainingTask,
} from '@/lib/african-training';

export default function ContributorTasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<AfricanTrainingTask[]>([]);
  const [submissions, setSubmissions] = useState<AfricanTaskSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All Languages');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All Levels');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (!user) return;
    let active = true;
    const headers = buildBeverHeaders(user);

    async function loadData() {
      try {
        const [tRes, sRes] = await Promise.all([
          fetch('/api/african-training/tasks', { headers }),
          fetch('/api/african-training/submissions', { headers }),
        ]);
        const [tData, sData] = await Promise.all([tRes.json(), sRes.json()]);
        if (!active) return;
        setTasks(tData.tasks || []);
        setSubmissions(sData.submissions || []);
      } catch {
        // Ignore fetch failure
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, [user]);

  const filteredTasks = useMemo(() => {
    return filterAfricanTasks(tasks, {
      category: selectedCategory,
      language: selectedLanguage,
      difficulty: selectedDifficulty,
      searchQuery,
    });
  }, [tasks, selectedCategory, selectedLanguage, selectedDifficulty, searchQuery]);

  const firstTask = filteredTasks[0] || tasks[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
            African AI Training Marketplace
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight font-display">
            Available AI Training Tasks
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Filter tasks across all 8 African AI training categories, select your language specialty, and earn transparent rewards upon admin approval.
          </p>
        </div>

        {firstTask && (
          <Link
            href={`/contributor/tasks/${firstTask.id}`}
            className="px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Start Next Available Task</span>
          </Link>
        )}
      </div>

      {/* Category & Search Filters */}
      <div className="p-4 rounded-2xl bg-white border border-black/[0.06] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, African languages, dialects, keywords..."
              aria-label="Search African AI training tasks"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-50 border border-black/[0.08] text-xs text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-hidden focus:border-zinc-950"
            />
          </div>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            aria-label="Filter by African language"
            className="px-3 py-2 rounded-xl bg-zinc-50 border border-black/[0.08] text-xs text-zinc-900 focus:bg-white focus:outline-hidden focus:border-zinc-950"
          >
            <option value="All Languages">All Languages</option>
            {AFRICAN_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            aria-label="Filter by difficulty level"
            className="px-3 py-2 rounded-xl bg-zinc-50 border border-black/[0.08] text-xs text-zinc-900 focus:bg-white focus:outline-hidden focus:border-zinc-950"
          >
            <option value="All Levels">All Difficulty Levels</option>
            {TASK_DIFFICULTIES.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* 8 Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setSelectedCategory('All Categories')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium cursor-pointer transition-colors ${
              selectedCategory === 'All Categories'
                ? 'bg-zinc-950 text-white'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            All Categories ({tasks.length})
          </button>
          {AFRICAN_TRAINING_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium cursor-pointer transition-colors ${
                selectedCategory === category
                  ? 'bg-zinc-950 text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-white border border-black/[0.06] animate-pulse"
            />
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-black/[0.06] text-center space-y-3">
          <Filter className="w-7 h-7 text-zinc-400 mx-auto" />
          <h2 className="text-base font-semibold text-zinc-950">No matching African AI training tasks</h2>
          <p className="text-xs text-zinc-500">
            Adjust your category, language, or difficulty filters to inspect other available tasks.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All Categories');
              setSelectedLanguage('All Languages');
              setSelectedDifficulty('All Levels');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-zinc-950 text-white text-xs font-medium cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((t) => {
            const existingSub = submissions.find((s) => s.taskId === t.id);
            return (
              <div
                key={t.id}
                className="p-5 rounded-2xl bg-white border border-black/[0.06] hover:border-zinc-400 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-zinc-700 font-semibold">{t.id}</span>
                    <span className="text-zinc-300">·</span>
                    <span className="font-medium text-zinc-900">{t.category}</span>
                    <span className="text-zinc-300">·</span>
                    <span className="font-mono text-zinc-600">{t.language}</span>
                    <span className="text-zinc-300">·</span>
                    <span className="font-mono text-zinc-500 text-[11px]">{t.difficulty}</span>
                  </div>
                  <h2 className="text-base font-semibold text-zinc-950 font-display">{t.title}</h2>
                  <p className="text-xs text-zinc-600 line-clamp-2 max-w-3xl">{t.instructions}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-1">
                    <span className="flex items-center gap-1.5 font-mono tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      ~{t.estimatedMinutes} mins
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-emerald-700 font-semibold tabular-nums">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      ${t.rewardUsd.toFixed(2)} upon approval
                    </span>
                    <span className="font-mono text-[11px] text-zinc-400">
                      Region: {t.dialectOrRegion}
                    </span>
                    {existingSub && (
                      <span
                        className={`font-mono text-[11px] font-semibold uppercase ${
                          existingSub.status === 'approved'
                            ? 'text-emerald-700'
                            : existingSub.status === 'rejected'
                            ? 'text-rose-700'
                            : 'text-amber-700'
                        }`}
                      >
                        Last submission: {existingSub.status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/contributor/tasks/${t.id}`}
                    className="px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <span>Start Task</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
