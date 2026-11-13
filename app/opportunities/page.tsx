'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  Clock,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  OPPORTUNITIES_DATA,
  OpportunityCategory,
  filterOpportunities,
  getCategoryCounts,
  Opportunity,
} from '@/lib/opportunities';
import { ApplicationModal } from '@/components/ApplicationModal';

const CATEGORIES: ('All Categories' | OpportunityCategory)[] = [
  'All Categories',
  'General AI Training',
  'Writing and Editing',
  'Coding and Software Engineering',
  'Mathematics',
  'Science',
  'Language and Translation',
  'Data Annotation',
  'Image and Video Evaluation',
  'Audio Transcription',
  'Subject-Matter Expertise',
];

function OpportunitiesContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as OpportunityCategory) || 'All Categories';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [difficultyFilter, setDifficultyFilter] = useState('All Levels');
  const [selectedOpportunityForApply, setSelectedOpportunityForApply] = useState<Opportunity | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const categoryCounts = useMemo(() => getCategoryCounts(OPPORTUNITIES_DATA), []);

  const filteredOpportunities = useMemo(() => {
    return filterOpportunities(OPPORTUNITIES_DATA, {
      category: selectedCategory,
      difficulty: difficultyFilter,
      searchQuery: searchQuery,
    });
  }, [selectedCategory, difficultyFilter, searchQuery]);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-10 text-center sm:text-left">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200">Opportunities Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-4">
            Find Work That Matches Your Expertise.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
            Explore active AI training, evaluation, and research tracks across 10 specialized disciplines.
            Pass domain assessments to unlock project queues and benchmark hourly rates.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by role, programming language, topic, or keyword (e.g. Python, Translation)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Experience:</span>
            </div>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="text-xs font-medium py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
            >
              <option value="All Levels">All Levels</option>
              <option value="Entry">Entry Level</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Specialist">Specialist / Expert</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Filter */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Qualification Disclaimer Banner */}
        <div className="mb-8 p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-3">
          <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Qualification &amp; Compensation Notice:</span> Listed compensation ranges represent benchmark hourly targets for verified contributors who pass domain assessments. Bever does not guarantee fixed earnings or automatic project assignment; project volume fluctuates based on enterprise client demand.
          </div>
        </div>

        {/* Opportunity Cards Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-xs hover:shadow-xl hover:border-indigo-300/60 dark:hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top metadata strip */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
                    <span className="text-indigo-600 dark:text-indigo-400">{opp.category}</span>
                    <span>{opp.difficulty} · {opp.language}</span>
                  </div>

                  {/* Title linking to dedicated project page */}
                  <Link
                    href={`/opportunities/${opp.id}`}
                    className="block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-2">
                      {opp.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {opp.shortDescription}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {opp.requiredSkills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {opp.requiredSkills.length > 3 && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400">
                        +{opp.requiredSkills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase tracking-wider">
                        Benchmark Rate
                      </span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                        {opp.estimatedRate}
                      </span>
                    </div>
                    <div className="text-right text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{opp.eligibility}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/opportunities/${opp.id}`}
                      className="flex-1 py-2 text-center text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                    >
                      Project Details
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedOpportunityForApply(opp);
                        setIsApplyModalOpen(true);
                      }}
                      className="flex-1 py-2 text-center text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-100 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 group/btn cursor-pointer"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <Layers className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              No matching opportunities found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              Try clearing your search query or selecting a different experience level.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
                setDifficultyFilter('All Levels');
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Application Wizard Modal */}
      {selectedOpportunityForApply && (
        <ApplicationModal
          key={selectedOpportunityForApply.id}
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          preselectedOpportunity={selectedOpportunityForApply}
        />
      )}
    </div>
  );
}

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-sm text-slate-500">Loading opportunities directory...</div>}>
      <OpportunitiesContent />
    </Suspense>
  );
}
