'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpRight,
  AlertCircle,
  X,
} from 'lucide-react';
import {
  OPPORTUNITIES_DATA,
  Opportunity,
  OpportunityCategory,
  filterOpportunities,
  getCategoryCounts,
} from '../lib/opportunities';
import { useRouter } from 'next/navigation';

const CATEGORIES: OpportunityCategory[] = [
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

interface OpportunitiesSectionProps {
  onSelectOpportunity?: (opportunity: Opportunity) => void;
  onApplyOpportunity?: (opportunity: Opportunity) => void;
}

export function OpportunitiesSection({
  onSelectOpportunity,
  onApplyOpportunity,
}: OpportunitiesSectionProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All Levels');

  const categoryCounts = useMemo(
    () => getCategoryCounts(OPPORTUNITIES_DATA),
    []
  );

  const filteredOpportunities = useMemo(() => {
    return filterOpportunities(OPPORTUNITIES_DATA, {
      category: selectedCategory,
      searchQuery,
      difficulty: selectedDifficulty,
    });
  }, [selectedCategory, searchQuery, selectedDifficulty]);

  const resetFilters = () => {
    setSelectedCategory('All Categories');
    setSearchQuery('');
    setSelectedDifficulty('All Levels');
  };

  return (
    <section id="opportunities" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 tracking-wider uppercase mb-3">
            <span>Project Discovery</span>
            <span className="text-zinc-300">/</span>
            <span>Flexible Engagement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#09090B] mb-4 text-balance">
            Find Work That Matches Your Expertise.
          </h2>
          <p className="text-base text-zinc-600 leading-relaxed">
            Browse active AI evaluation tracks spanning 10 core disciplines. Work remotely on your schedule with transparent task benchmarks.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by skill, topic, or keyword (e.g. Python, Calculus, Japanese)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl bg-white border border-black/[0.08] text-[#09090B] placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-900 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Difficulty selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="difficulty-select" className="text-xs font-medium text-zinc-500 whitespace-nowrap">
                Level:
              </label>
              <select
                id="difficulty-select"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                aria-label="Filter opportunities by difficulty level"
                className="text-xs font-medium py-2.5 px-3 rounded-xl bg-white border border-black/[0.08] text-zinc-800 focus:outline-hidden focus:border-zinc-900 shadow-xs"
              >
                <option value="All Levels">All Levels</option>
                <option value="Entry">Entry</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Specialist">Specialist</option>
              </select>
            </div>
          </div>

          {/* Category Horizontal Segmented Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 scrollbar-none no-scrollbar text-xs">
            <button
              onClick={() => setSelectedCategory('All Categories')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer ${
                selectedCategory === 'All Categories'
                  ? 'bg-[#09090B] text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              All Categories ({categoryCounts['All Categories'] || 0})
            </button>
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#09090B] text-white shadow-xs'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {cat} {count > 0 && <span className="opacity-70">({count})</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Benchmark notice indicator */}
        <div className="mb-6 flex items-start gap-2.5 p-3.5 rounded-xl bg-zinc-50 border border-black/[0.05] text-xs text-zinc-500">
          <AlertCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-zinc-800 font-medium">Benchmark Rate Notice:</strong> Rates and timelines shown represent active market ranges for skilled AI contributor tasks. Exact compensation is determined upon skill qualification, task difficulty, and active client terms. Bever does not guarantee fixed earnings.
          </p>
        </div>

        {/* Opportunity Cards Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="group rounded-2xl bg-white border border-black/[0.06] p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-black/15 transition-all duration-200"
              >
                <div>
                  {/* Clean unboxed metadata header */}
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-2.5">
                    <span className="font-mono text-[11px] font-medium text-zinc-700">
                      {opp.category}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                      <span>{opp.difficulty}</span>
                      <span aria-hidden="true">·</span>
                      <span>{opp.language}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[#09090B] mb-2">
                    {opp.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-3">
                    {opp.shortDescription}
                  </p>

                  {/* Skills List */}
                  <div className="mb-5 pt-3 border-t border-black/[0.04]">
                    <p className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider mb-2">
                      Required Competencies:
                    </p>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {opp.requiredSkills.join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Footer of Card: Rate & CTAs */}
                <div className="pt-4 border-t border-black/[0.04]">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-zinc-400 block">Est. Benchmark:</span>
                      <span className="text-base font-semibold text-[#09090B] font-mono tabular-nums">
                        {opp.estimatedRate}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-zinc-400 block">Assessment:</span>
                      <span className="text-xs font-medium text-zinc-700">
                        {opp.assessmentEstimate}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => (onSelectOpportunity ? onSelectOpportunity(opp) : router.push(`/opportunities/${opp.id}`))}
                      className="w-full py-2 px-3 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors text-center cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => (onApplyOpportunity ? onApplyOpportunity(opp) : router.push('/register'))}
                      className="w-full py-2 px-3 text-xs font-medium text-white bg-[#09090B] hover:bg-zinc-800 rounded-full transition-colors text-center flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Apply</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-2xl bg-zinc-50 border border-black/[0.06] max-w-lg mx-auto">
            <Filter className="w-8 h-8 text-zinc-400 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-[#09090B] mb-1">
              No matching opportunities found
            </h4>
            <p className="text-xs text-zinc-500 mb-5">
              Try adjusting your search query, clearing the difficulty filter, or viewing all categories.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2 text-xs font-medium text-[#09090B] bg-white border border-black/[0.08] hover:bg-zinc-50 rounded-full shadow-xs cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
