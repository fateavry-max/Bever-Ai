'use client';

import React, { useEffect, useRef, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Mic,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { buildBeverHeaders } from '@/lib/african-training-client';
import {
  getConsentCopyForType,
  type AfricanTaskSubmission,
  type AfricanTrainingTask,
} from '@/lib/african-training';

export default function ContributorTaskWorkstationPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const startTimeRef = useRef<number>(0);

  const [task, setTask] = useState<AfricanTrainingTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGuidelines, setShowGuidelines] = useState(true);

  const [primaryAnswer, setPrimaryAnswer] = useState('');
  const [translationOrTranscript, setTranslationOrTranscript] = useState('');
  const [annotationTagsRaw, setAnnotationTagsRaw] = useState('');
  const [ratingScore, setRatingScore] = useState<number>(5);
  const [rubricNotes, setRubricNotes] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [voiceDurationSec, setVoiceDurationSec] = useState<number>(15);
  const [consentAccepted, setConsentAccepted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<AfricanTaskSubmission | null>(null);

  useEffect(() => {
    if (!user) return;
    let active = true;
    const headers = buildBeverHeaders(user);
    startTimeRef.current = Date.now();

    async function loadTask() {
      try {
        const res = await fetch('/api/african-training/tasks', { headers });
        const data = await res.json();
        const found = (data.tasks || []).find(
          (t: AfricanTrainingTask) => t.id === resolvedParams.taskId
        );
        if (active) {
          setTask(found || (data.tasks || [])[0] || null);
        }
      } catch {
        // Handled cleanly below
      } finally {
        if (active) setLoading(false);
      }
    }

    loadTask();
    return () => {
      active = false;
    };
  }, [user, resolvedParams.taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !user) return;
    setSubmitError(null);
    setIsSubmitting(true);

    const elapsedSeconds = Math.max(
      12,
      Math.round((Date.now() - startTimeRef.current) / 1000)
    );

    const annotationTags = annotationTagsRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await fetch('/api/african-training/submissions', {
        method: 'POST',
        headers: buildBeverHeaders(user),
        body: JSON.stringify({
          taskId: task.id,
          primaryAnswer,
          translationOrTranscript: translationOrTranscript || undefined,
          annotationTags: annotationTags.length > 0 ? annotationTags : undefined,
          ratingScore:
            task.category === 'AI Response Evaluation' ? ratingScore : undefined,
          rubricNotes,
          attachmentName: attachmentName || undefined,
          voiceDurationSec:
            task.category === 'Voice & Speech Collection' ? voiceDurationSec : undefined,
          consentAccepted,
          completionSeconds: elapsedSeconds,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || 'Unable to submit task.');
      } else {
        setSubmittedRecord(data.submission);
      }
    } catch {
      setSubmitError('Network error while submitting task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-12 rounded-2xl bg-white border border-black/[0.06] text-center text-xs font-mono text-zinc-500">
        Loading African AI Training Workspace...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto p-12 rounded-2xl bg-white border border-black/[0.06] text-center space-y-4">
        <h1 className="text-xl font-semibold text-zinc-950">Task Not Found</h1>
        <p className="text-xs text-zinc-500">
          The requested training task ({resolvedParams.taskId}) is unavailable or archived.
        </p>
        <Link
          href="/contributor/tasks"
          className="inline-flex px-5 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-medium"
        >
          Back to African AI Tasks
        </Link>
      </div>
    );
  }

  const consentCopy = getConsentCopyForType(task.requiresConsentType);
  const isVoiceOrAudio =
    task.category === 'Voice & Speech Collection' ||
    task.category === 'Audio Transcription';
  const isMediaAnnotation =
    task.category === 'Image Annotation' || task.category === 'Video Annotation';

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div className="flex items-center gap-3">
          <Link
            href="/contributor/tasks"
            aria-label="Back to task queue"
            className="p-2 rounded-xl bg-white border border-black/[0.08] text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="font-semibold text-zinc-900">{task.id}</span>
              <span>·</span>
              <span>{task.category}</span>
              <span>·</span>
              <span>{task.language}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-zinc-950 font-display mt-0.5">
              {task.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-800 font-mono tabular-nums">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>Est. {task.estimatedMinutes}m</span>
          </div>

          <span className="font-mono text-emerald-700 font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 tabular-nums">
            ${task.rewardUsd.toFixed(2)} Reward
          </span>

          <button
            type="button"
            onClick={() => setShowGuidelines(!showGuidelines)}
            className="px-3 py-1.5 rounded-lg border border-black/[0.08] bg-white hover:bg-zinc-50 text-zinc-800 font-medium flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
            <span>{showGuidelines ? 'Hide Guidelines' : 'Show Guidelines'}</span>
          </button>
        </div>
      </div>

      {/* Guidelines, Instructions & Examples */}
      {showGuidelines && (
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] space-y-5 text-xs">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
              Task Instructions · {task.dialectOrRegion}
            </span>
            <p className="text-sm text-zinc-900 leading-relaxed">{task.instructions}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#FBFBFA] border border-black/[0.06] space-y-2">
              <span className="font-semibold text-zinc-950 block">Quality Guidelines</span>
              <ul className="space-y-1.5 text-zinc-600 list-disc pl-4">
                {task.guidelines.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#FBFBFA] border border-black/[0.06] space-y-2">
              <span className="font-semibold text-zinc-950 block">Annotated Example</span>
              {task.examples.length > 0 ? (
                <div className="space-y-1.5 text-zinc-700">
                  <p>
                    <strong className="text-zinc-950">Input:</strong> {task.examples[0].input}
                  </p>
                  <p>
                    <strong className="text-zinc-950">Expected:</strong>{' '}
                    {task.examples[0].expectedOutput}
                  </p>
                  <p className="text-zinc-500 font-mono text-[11px]">{task.examples[0].note}</p>
                </div>
              ) : (
                <p className="text-zinc-500">Follow instructions and cultural accuracy standards.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {submittedRecord ? (
        <div className="p-10 rounded-2xl bg-white border border-black/[0.06] text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-zinc-950 font-display">
            Submission Recorded ({submittedRecord.id})
          </h2>
          <p className="text-xs text-zinc-600 max-w-lg mx-auto leading-relaxed">
            Your work for <strong>{task.title}</strong> is now{' '}
            <strong className="font-mono uppercase">{submittedRecord.status}</strong>. Once a Bever Administrator reviews and approves your submission,{' '}
            <strong className="font-mono">${submittedRecord.rewardUsd.toFixed(2)}</strong> unlocks in your withdrawable balance.
          </p>
          {submittedRecord.fraudFlags.length > 0 && (
            <p className="text-[11px] font-mono text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 inline-block">
              Automated Notice: Flagged for manual verification ({submittedRecord.fraudFlags.join(', ')}).
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/contributor/submissions"
              className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl"
            >
              Track Submission Status
            </Link>
            <Link
              href="/contributor/tasks"
              className="px-5 py-2.5 bg-white border border-black/[0.1] hover:bg-zinc-50 text-zinc-800 text-xs font-medium rounded-xl"
            >
              Return to African AI Queue
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dataset Item Context */}
          <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono uppercase tracking-wider text-zinc-400">
                Dataset Source &amp; Prompt
              </span>
              {task.datasetFileName && (
                <span className="font-mono text-zinc-600 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  {task.datasetFileName}
                </span>
              )}
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-black/[0.06] text-xs font-mono text-zinc-900 leading-relaxed">
              {task.datasetSnippet}
            </div>
          </div>

          {/* Submission Workspace */}
          <div className="p-6 rounded-2xl bg-white border border-black/[0.06] space-y-5">
            <h2 className="text-sm font-semibold text-zinc-950 font-display">
              Contributor Submission Workspace
            </h2>

            {submitError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                {submitError}
              </div>
            )}

            {isVoiceOrAudio && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#FBFBFA] border border-black/[0.06]">
                <div>
                  <label
                    htmlFor="voice-attachment"
                    className="block text-xs font-medium text-zinc-700 mb-1.5 flex items-center gap-1.5"
                  >
                    <Mic className="w-3.5 h-3.5 text-zinc-600" />
                    <span>Audio Sample File or Recording Clip Reference</span>
                  </label>
                  <input
                    id="voice-attachment"
                    type="text"
                    value={attachmentName}
                    onChange={(e) => setAttachmentName(e.target.value)}
                    placeholder="e.g. lagos_yoruba_sample_01.wav"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-950 focus:outline-hidden focus:border-zinc-950"
                  />
                </div>
                <div>
                  <label
                    htmlFor="voice-duration"
                    className="block text-xs font-medium text-zinc-700 mb-1.5"
                  >
                    Audio Duration (Seconds)
                  </label>
                  <input
                    id="voice-duration"
                    type="number"
                    min={3}
                    max={600}
                    value={voiceDurationSec}
                    onChange={(e) => setVoiceDurationSec(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-mono text-zinc-950 focus:outline-hidden focus:border-zinc-950"
                  />
                </div>
              </div>
            )}

            {isMediaAnnotation && (
              <div>
                <label
                  htmlFor="annotation-tags"
                  className="block text-xs font-medium text-zinc-700 mb-1.5"
                >
                  Cultural &amp; Visual Object / Action Tags (comma-separated)
                </label>
                <input
                  id="annotation-tags"
                  type="text"
                  value={annotationTagsRaw}
                  onChange={(e) => setAnnotationTagsRaw(e.target.value)}
                  placeholder="e.g. jollof_rice, keke_napep, ankara_textile, market_vendor"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 focus:bg-white focus:outline-hidden focus:border-zinc-950"
                />
              </div>
            )}

            {task.category === 'AI Response Evaluation' && (
              <div className="p-4 rounded-xl bg-zinc-50 border border-black/[0.06]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label htmlFor="cultural-rating" className="font-medium text-zinc-800">
                    Cultural Relevance &amp; Accuracy Rating
                  </label>
                  <span className="font-mono font-semibold text-zinc-950 tabular-nums">
                    {ratingScore} / 5
                  </span>
                </div>
                <input
                  id="cultural-rating"
                  type="range"
                  min={1}
                  max={5}
                  value={ratingScore}
                  onChange={(e) => setRatingScore(Number(e.target.value))}
                  className="w-full accent-zinc-950 cursor-pointer"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="primary-answer"
                className="block text-xs font-medium text-zinc-700 mb-1.5"
              >
                Primary Task Response / Annotation / Translation *
              </label>
              <textarea
                id="primary-answer"
                rows={4}
                required
                value={primaryAnswer}
                onChange={(e) => setPrimaryAnswer(e.target.value)}
                placeholder="Enter your complete African-language output, verbatim transcription, bounding label details, or structured dataset entry..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-hidden focus:border-zinc-950 leading-relaxed"
              />
            </div>

            <div>
              <label
                htmlFor="translation-gloss"
                className="block text-xs font-medium text-zinc-700 mb-1.5"
              >
                English Gloss / Phonetic Notes (Optional)
              </label>
              <input
                id="translation-gloss"
                type="text"
                value={translationOrTranscript}
                onChange={(e) => setTranslationOrTranscript(e.target.value)}
                placeholder="Literal English meaning, speaker dialect tag, or orthography reference..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-hidden focus:border-zinc-950"
              />
            </div>

            <div>
              <label
                htmlFor="rubric-notes"
                className="block text-xs font-medium text-zinc-700 mb-1.5"
              >
                Quality &amp; Cultural Context Justification *
              </label>
              <textarea
                id="rubric-notes"
                rows={3}
                required
                value={rubricNotes}
                onChange={(e) => setRubricNotes(e.target.value)}
                placeholder="Explain your dialect choices, cultural nuance checks, or annotation decisions..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-hidden focus:border-zinc-950 leading-relaxed"
              />
            </div>

            {/* Consent, Privacy & Data Ownership Policy Box */}
            <div className="p-4 rounded-xl bg-[#FBFBFA] border border-black/[0.08] space-y-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-zinc-950 block">{consentCopy.title}</span>
                  <p className="text-zinc-600 leading-relaxed">{consentCopy.summary}</p>
                  <ul className="list-disc pl-4 text-zinc-500 space-y-1 pt-1">
                    {consentCopy.clauses.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <label className="flex items-start gap-2.5 pt-2 border-t border-black/[0.06] cursor-pointer text-xs text-zinc-900">
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="mt-0.5 accent-zinc-950 cursor-pointer"
                />
                <span>
                  I confirm this submission is original human work, respects privacy rules, and I accept Bever&apos;s Consent, Privacy &amp; Data Ownership Policy.
                </span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.push('/contributor/tasks')}
                className="px-4 py-2 rounded-xl border border-black/[0.08] text-zinc-700 hover:bg-zinc-50 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting
                    ? 'Submitting...'
                    : `Submit Task ($${task.rewardUsd.toFixed(2)} Reward)`}
                </span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
