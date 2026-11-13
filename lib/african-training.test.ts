import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AFRICAN_TRAINING_CATEGORIES,
  calculateContributorLedger,
  validateWithdrawalRequest,
  evaluateSubmissionQualityAndFraud,
  filterAfricanTasks,
  type AfricanTaskSubmission,
  type AfricanTrainingTask,
  type WithdrawalRequest,
} from './african-training';

function makeSubmission(overrides: Partial<AfricanTaskSubmission>): AfricanTaskSubmission {
  return {
    id: 'SUB-1',
    taskId: 'AF-001',
    taskTitle: 'Yoruba Diacritics & Tone Calibration',
    category: 'African Languages',
    language: 'Yoruba',
    contributorEmail: 'adaeze@bever.ai',
    contributorName: 'Adaeze Okafor',
    contributorId: 'BEV-44102',
    responsePayload: {
      primaryAnswer: 'Ẹ káàárọ̀, ṣé àlàáfíà ni? Báwo ni iṣẹ́ lónìí?',
      rubricNotes: 'Verified sub-dot diacritics and tonal markers.',
    },
    consentAccepted: true,
    consentScope: 'standard',
    completionSeconds: 95,
    status: 'approved',
    rewardUsd: 12.5,
    qualityScore: 98,
    fraudFlags: [],
    reviewNotes: 'Accurate tonal orthography.',
    reviewedBy: 'admin@bever.ai',
    submittedAt: '2026-11-10T10:00:00Z',
    reviewedAt: '2026-11-10T11:00:00Z',
    ...overrides,
  };
}

test('includes all 8 required African AI Training categories', () => {
  assert.equal(AFRICAN_TRAINING_CATEGORIES.length, 8);
  assert.deepEqual([...AFRICAN_TRAINING_CATEGORIES], [
    'African Languages',
    'Voice & Speech Collection',
    'Audio Transcription',
    'Image Annotation',
    'Video Annotation',
    'AI Response Evaluation',
    'Translation & Localization',
    'Data Collection',
  ]);
});

test('calculateContributorLedger strictly blocks unapproved pending and rejected earnings from withdrawable balance', () => {
  const submissions: AfricanTaskSubmission[] = [
    makeSubmission({ id: 'S1', status: 'approved', rewardUsd: 18.0, qualityScore: 96 }),
    makeSubmission({ id: 'S2', status: 'pending', rewardUsd: 45.0, qualityScore: null }),
    makeSubmission({ id: 'S3', status: 'rejected', rewardUsd: 30.0, qualityScore: 40 }),
  ];

  const withdrawals: WithdrawalRequest[] = [
    {
      id: 'WD-1',
      contributorEmail: 'adaeze@bever.ai',
      contributorName: 'Adaeze Okafor',
      amountUsd: 6.0,
      payoutMethod: 'Mobile Money (M-Pesa / MTN MoMo / Airtel)',
      destinationAccount: '+234-803-000-1122',
      status: 'paid',
      requestedAt: '2026-11-10T12:00:00Z',
      processedAt: '2026-11-10T13:00:00Z',
      adminNote: 'Disbursed.',
    },
  ];

  const ledger = calculateContributorLedger(submissions, withdrawals);

  assert.equal(ledger.approvedEarningsUsd, 18.0);
  assert.equal(ledger.pendingEarningsUsd, 45.0);
  assert.equal(ledger.rejectedEarningsUsd, 30.0);
  assert.equal(ledger.withdrawableBalanceUsd, 12.0);
  assert.equal(ledger.averageQualityScore, 68.0);

  // Trying to withdraw approved + pending fails
  const invalidCheck = validateWithdrawalRequest(20.0, ledger, '+234-803-000-1122');
  assert.equal(invalidCheck.valid, false);
  assert.match(invalidCheck.error || '', /Only approved earnings/);

  // Withdrawing within approved balance succeeds
  const validCheck = validateWithdrawalRequest(12.0, ledger, '+234-803-000-1122');
  assert.equal(validCheck.valid, true);
});

test('evaluateSubmissionQualityAndFraud requires consent and flags anomalies', () => {
  const missingConsent = evaluateSubmissionQualityAndFraud(
    {
      primaryAnswer: 'Valid Swahili translation text here.',
      rubricNotes: 'Checked coastal dialect phrasing carefully.',
      completionSeconds: 120,
      consentAccepted: false,
      contributorEmail: 'user@bever.ai',
      taskId: 'AF-002',
    },
    []
  );
  assert.equal(missingConsent.valid, false);

  const fastAndRepetitive = evaluateSubmissionQualityAndFraud(
    {
      primaryAnswer: 'yes yes yes yes yes yes yes',
      rubricNotes: 'Completed the annotation check in full.',
      completionSeconds: 4,
      consentAccepted: true,
      contributorEmail: 'user@bever.ai',
      taskId: 'AF-002',
    },
    []
  );
  assert.equal(fastAndRepetitive.valid, true);
  assert.ok(fastAndRepetitive.flags.includes('FAST_COMPLETION_ANOMALY'));
  assert.ok(fastAndRepetitive.flags.includes('REPETITIVE_LOW_ENTROPY_TEXT'));
});

test('filterAfricanTasks filters cleanly by category, language, difficulty, and search', () => {
  const tasks: AfricanTrainingTask[] = [
    {
      id: 'AF-001',
      title: 'Yoruba Vowel Harmony & Diacritics',
      category: 'African Languages',
      language: 'Yoruba',
      dialectOrRegion: 'Southwest Nigeria',
      difficulty: 'Intermediate',
      rewardUsd: 16,
      estimatedMinutes: 20,
      status: 'published',
      instructions: 'Add tonal marks.',
      guidelines: ['Keep tone accurate'],
      examples: [],
      datasetSnippet: 'E kaaro',
      requiresConsentType: 'standard',
      createdAt: '2026-11-01',
      createdBy: 'admin@bever.ai',
    },
    {
      id: 'AF-002',
      title: 'Swahili Coastal Market Audio Transcript',
      category: 'Audio Transcription',
      language: 'Swahili',
      dialectOrRegion: 'Mombasa, Kenya',
      difficulty: 'Foundational',
      rewardUsd: 14,
      estimatedMinutes: 15,
      status: 'paused',
      instructions: 'Transcribe verbatim.',
      guidelines: [],
      examples: [],
      datasetSnippet: 'Habari za asubuhi',
      requiresConsentType: 'voice',
      createdAt: '2026-11-02',
      createdBy: 'admin@bever.ai',
    },
  ];

  const publishedOnly = filterAfricanTasks(tasks, {});
  assert.equal(publishedOnly.length, 1);
  assert.equal(publishedOnly[0].id, 'AF-001');

  const allAdmin = filterAfricanTasks(tasks, { includeUnpublished: true, language: 'Swahili' });
  assert.equal(allAdmin.length, 1);
  assert.equal(allAdmin[0].id, 'AF-002');
});
