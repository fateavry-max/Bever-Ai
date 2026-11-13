export const AFRICAN_TRAINING_CATEGORIES = [
  'African Languages',
  'Voice & Speech Collection',
  'Audio Transcription',
  'Image Annotation',
  'Video Annotation',
  'AI Response Evaluation',
  'Translation & Localization',
  'Data Collection',
] as const;

export type AfricanTrainingCategory = (typeof AFRICAN_TRAINING_CATEGORIES)[number];

export const AFRICAN_COUNTRIES = [
  'Nigeria',
  'Kenya',
  'Ghana',
  'South Africa',
  'Ethiopia',
  'Tanzania',
  'Uganda',
  'Rwanda',
  'Senegal',
  'Cameroon',
  'Egypt',
  'Morocco',
  "Côte d'Ivoire",
  'Zimbabwe',
  'Zambia',
] as const;

export const AFRICAN_LANGUAGES = [
  'Yoruba',
  'Igbo',
  'Hausa',
  'Swahili',
  'Zulu',
  'Twi',
  'Amharic',
  'Nigerian Pidgin',
  'Xhosa',
  'Shona',
  'Luganda',
  'Kinyarwanda',
  'Wolof',
  'Oromo',
  'Afrikaans',
  'Arabic',
  'French (African Regional)',
  'English (African Regional)',
] as const;

export const TASK_DIFFICULTIES = ['Foundational', 'Intermediate', 'Specialist'] as const;
export type TaskDifficulty = (typeof TASK_DIFFICULTIES)[number];

export type ConsentRequirementType = 'voice' | 'image_video' | 'personal_data' | 'standard';

export interface TaskExample {
  input: string;
  expectedOutput: string;
  note: string;
}

export interface AfricanTrainingTask {
  id: string;
  title: string;
  category: AfricanTrainingCategory;
  language: string;
  dialectOrRegion: string;
  difficulty: TaskDifficulty;
  rewardUsd: number;
  estimatedMinutes: number;
  status: 'published' | 'paused' | 'archived';
  instructions: string;
  guidelines: string[];
  examples: TaskExample[];
  datasetSnippet: string;
  datasetFileName?: string;
  requiresConsentType: ConsentRequirementType;
  createdAt: string;
  createdBy: string;
}

export interface LanguageProficiency {
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Conversational';
}

export interface AfricanContributorProfile {
  email: string;
  name: string;
  applicantId: string;
  country: string;
  languagesSpoken: LanguageProficiency[];
  accentsDialects: string[];
  skills: string[];
  previousExperience: string;
  preferredCategories: AfricanTrainingCategory[];
  consentSigned: boolean;
  consentSignedAt: string | null;
  qualityScore: number;
  fraudFlagsCount: number;
  accountStatus: 'active' | 'flagged' | 'suspended';
  updatedAt: string;
}

export interface SubmissionResponsePayload {
  primaryAnswer: string;
  translationOrTranscript?: string;
  annotationTags?: string[];
  ratingScore?: number;
  rubricNotes: string;
  attachmentName?: string;
  voiceDurationSec?: number;
}

export interface AfricanTaskSubmission {
  id: string;
  taskId: string;
  taskTitle: string;
  category: AfricanTrainingCategory;
  language: string;
  contributorEmail: string;
  contributorName: string;
  contributorId: string;
  responsePayload: SubmissionResponsePayload;
  consentAccepted: boolean;
  consentScope: string;
  completionSeconds: number;
  status: 'pending' | 'approved' | 'rejected';
  rewardUsd: number;
  qualityScore: number | null;
  fraudFlags: string[];
  reviewNotes: string;
  reviewedBy: string | null;
  submittedAt: string;
  reviewedAt: string | null;
}

export type PayoutMethodType =
  | 'Mobile Money (M-Pesa / MTN MoMo / Airtel)'
  | 'African Local Bank Transfer (NGN / KES / GHS / ZAR)'
  | 'International ACH / Wise';

export interface WithdrawalRequest {
  id: string;
  contributorEmail: string;
  contributorName: string;
  amountUsd: number;
  payoutMethod: PayoutMethodType;
  destinationAccount: string;
  status: 'pending' | 'paid' | 'rejected';
  requestedAt: string;
  processedAt: string | null;
  adminNote: string;
}

export interface ContributorLedgerSummary {
  approvedEarningsUsd: number;
  pendingEarningsUsd: number;
  rejectedEarningsUsd: number;
  totalWithdrawnUsd: number;
  pendingWithdrawalsUsd: number;
  withdrawableBalanceUsd: number;
  totalSubmissions: number;
  approvedCount: number;
  pendingCount: number;
  rejectedCount: number;
  averageQualityScore: number;
}

function roundUsd(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Computes contributor financial balances strictly enforcing that ONLY approved
 * submissions become withdrawable. Pending and rejected submissions cannot be withdrawn.
 */
export function calculateContributorLedger(
  submissions: AfricanTaskSubmission[],
  withdrawals: WithdrawalRequest[]
): ContributorLedgerSummary {
  let approvedEarningsUsd = 0;
  let pendingEarningsUsd = 0;
  let rejectedEarningsUsd = 0;
  let approvedCount = 0;
  let pendingCount = 0;
  let rejectedCount = 0;
  let qualitySum = 0;
  let qualityCount = 0;

  for (const sub of submissions) {
    if (sub.status === 'approved') {
      approvedEarningsUsd += sub.rewardUsd;
      approvedCount += 1;
    } else if (sub.status === 'pending') {
      pendingEarningsUsd += sub.rewardUsd;
      pendingCount += 1;
    } else if (sub.status === 'rejected') {
      rejectedEarningsUsd += sub.rewardUsd;
      rejectedCount += 1;
    }

    if (typeof sub.qualityScore === 'number') {
      qualitySum += sub.qualityScore;
      qualityCount += 1;
    }
  }

  let totalWithdrawnUsd = 0;
  let pendingWithdrawalsUsd = 0;

  for (const wd of withdrawals) {
    if (wd.status === 'paid') {
      totalWithdrawnUsd += wd.amountUsd;
    } else if (wd.status === 'pending') {
      pendingWithdrawalsUsd += wd.amountUsd;
    }
  }

  const withdrawableRaw = approvedEarningsUsd - totalWithdrawnUsd - pendingWithdrawalsUsd;

  return {
    approvedEarningsUsd: roundUsd(approvedEarningsUsd),
    pendingEarningsUsd: roundUsd(pendingEarningsUsd),
    rejectedEarningsUsd: roundUsd(rejectedEarningsUsd),
    totalWithdrawnUsd: roundUsd(totalWithdrawnUsd),
    pendingWithdrawalsUsd: roundUsd(pendingWithdrawalsUsd),
    withdrawableBalanceUsd: roundUsd(Math.max(0, withdrawableRaw)),
    totalSubmissions: submissions.length,
    approvedCount,
    pendingCount,
    rejectedCount,
    averageQualityScore:
      qualityCount > 0 ? Math.round((qualitySum / qualityCount) * 10) / 10 : 100,
  };
}

export interface WithdrawalValidationResult {
  valid: boolean;
  error?: string;
}

export function validateWithdrawalRequest(
  amountUsd: number,
  ledger: ContributorLedgerSummary,
  destinationAccount: string
): WithdrawalValidationResult {
  if (!Number.isFinite(amountUsd) || amountUsd <= 0) {
    return { valid: false, error: 'Withdrawal amount must be greater than $0.00.' };
  }
  if (amountUsd < 5) {
    return { valid: false, error: 'Minimum withdrawal threshold is $5.00.' };
  }
  if (amountUsd > ledger.withdrawableBalanceUsd) {
    return {
      valid: false,
      error: `Cannot withdraw $${amountUsd.toFixed(2)}. Only approved earnings ($${ledger.withdrawableBalanceUsd.toFixed(2)} available) can be withdrawn. Pending tasks ($${ledger.pendingEarningsUsd.toFixed(2)}) are locked until admin approval.`,
    };
  }
  if (!destinationAccount || destinationAccount.trim().length < 4) {
    return { valid: false, error: 'Please provide a valid payout account or mobile money number.' };
  }
  return { valid: true };
}

export interface FraudCheckInput {
  primaryAnswer: string;
  rubricNotes: string;
  completionSeconds: number;
  consentAccepted: boolean;
  contributorEmail: string;
  taskId: string;
}

export function evaluateSubmissionQualityAndFraud(
  input: FraudCheckInput,
  existingSubmissions: AfricanTaskSubmission[]
): { flags: string[]; valid: boolean; validationError?: string } {
  if (!input.consentAccepted) {
    return {
      flags: ['CONSENT_MISSING'],
      valid: false,
      validationError:
        'You must acknowledge the Data Ownership, Privacy & Consent Agreement before submitting this task.',
    };
  }

  const trimmedAnswer = input.primaryAnswer.trim();
  const trimmedNotes = input.rubricNotes.trim();

  if (trimmedAnswer.length < 8) {
    return {
      flags: ['INSUFFICIENT_RESPONSE'],
      valid: false,
      validationError: 'Task response is too short. Provide a complete, accurate submission.',
    };
  }

  if (trimmedNotes.length < 10) {
    return {
      flags: ['INSUFFICIENT_JUSTIFICATION'],
      valid: false,
      validationError: 'Please add quality notes or context explaining your submission (at least 10 characters).',
    };
  }

  const flags: string[] = [];

  if (input.completionSeconds > 0 && input.completionSeconds < 10) {
    flags.push('FAST_COMPLETION_ANOMALY');
  }

  const normalized = trimmedAnswer.toLowerCase();
  const duplicateFound = existingSubmissions.some(
    (s) =>
      s.contributorEmail.toLowerCase() === input.contributorEmail.toLowerCase() &&
      s.taskId === input.taskId &&
      s.responsePayload.primaryAnswer.trim().toLowerCase() === normalized
  );
  if (duplicateFound) {
    flags.push('DUPLICATE_SUBMISSION_TEXT');
  }

  // Detect low-entropy repeated characters/words
  const uniqueWords = new Set(normalized.split(/\s+/).filter(Boolean));
  if (trimmedAnswer.split(/\s+/).length >= 6 && uniqueWords.size <= 2) {
    flags.push('REPETITIVE_LOW_ENTROPY_TEXT');
  }

  return { flags, valid: true };
}

export interface TaskFilterOptions {
  category?: string;
  language?: string;
  difficulty?: string;
  searchQuery?: string;
  includeUnpublished?: boolean;
}

export function filterAfricanTasks(
  tasks: AfricanTrainingTask[],
  filters: TaskFilterOptions
): AfricanTrainingTask[] {
  return tasks.filter((task) => {
    if (!filters.includeUnpublished && task.status !== 'published') {
      return false;
    }
    if (filters.category && filters.category !== 'All Categories') {
      if (task.category !== filters.category) return false;
    }
    if (filters.difficulty && filters.difficulty !== 'All Levels') {
      if (task.difficulty !== filters.difficulty) return false;
    }
    if (filters.language && filters.language !== 'All Languages') {
      if (!task.language.toLowerCase().includes(filters.language.toLowerCase())) {
        return false;
      }
    }
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      const hay = `${task.id} ${task.title} ${task.category} ${task.language} ${task.dialectOrRegion} ${task.instructions}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function getConsentCopyForType(type: ConsentRequirementType): {
  title: string;
  summary: string;
  clauses: string[];
} {
  switch (type) {
    case 'voice':
      return {
        title: 'Voice, Accent & Speech Biometric Consent',
        summary:
          'Your recorded audio or voice metadata is licensed solely for ethical speech recognition and inclusive African accent model training.',
        clauses: [
          'Audio clips are anonymized and stripped of personal identifiers before model packaging.',
          'Bever never sells raw personal voiceprints for biometric impersonation or non-consensual voice cloning.',
          'You retain the right to request deletion of unexported raw samples via privacy@bever.ai.',
        ],
      };
    case 'image_video':
      return {
        title: 'Image, Video & Environmental Data Privacy Policy',
        summary:
          'Visual annotations and contributed African contextual imagery must respect third-party privacy and avoid identifiable bystanders.',
        clauses: [
          'Do not upload private IDs, license plates, or unconsented faces of minors.',
          'Contributed annotations and contextual metadata remain attributed to anonymized contributor IDs.',
          'Datasets are encrypted at rest and licensed exclusively to audited AI safety and research partners.',
        ],
      };
    case 'personal_data':
      return {
        title: 'Cultural & Contextual Dataset Ownership Policy',
        summary:
          'Authentic cultural, proverbs, food, and everyday experience datasets are curated under fair compensation and provenance tracking.',
        clauses: [
          'Submissions must reflect authentic lived knowledge and must not contain copyrighted third-party textbooks.',
          'All approved submissions trigger verified royalty-free dataset delivery compensated per published task reward.',
        ],
      };
    default:
      return {
        title: 'Bever Contributor Quality, Privacy & Data Integrity Agreement',
        summary:
          'Submissions must be original human work completed in good faith according to African AI Training guidelines.',
        clauses: [
          'Zero tolerance for unedited machine-translation pasting or automated spam submissions.',
          'Payouts unlock only after administrative verification confirms adherence to cultural and linguistic accuracy rubrics.',
        ],
      };
  }
}
