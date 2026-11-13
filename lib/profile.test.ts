import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEarningsSummary,
  getProfileForUser,
  EarningsRecord,
} from './profile';

test('calculateEarningsSummary correctly sums disbursed vs pending earnings and approved hours', () => {
  const sampleRecords: EarningsRecord[] = [
    {
      id: 'PAY-1',
      period: 'Period 1',
      projectTitle: 'Project A',
      category: 'Coding and Software Engineering',
      approvedHours: 10,
      ratePerHour: 50,
      totalAmount: 500,
      payoutDate: 'Nov 01, 2026',
      status: 'Disbursed',
      paymentMethod: 'ACH',
    },
    {
      id: 'PAY-2',
      period: 'Period 2',
      projectTitle: 'Project A',
      category: 'Coding and Software Engineering',
      approvedHours: 5,
      ratePerHour: 50,
      totalAmount: 250,
      payoutDate: 'Nov 08, 2026',
      status: 'Processing',
      paymentMethod: 'ACH',
    },
  ];

  const summary = calculateEarningsSummary(sampleRecords);
  assert.equal(summary.totalLifetimeEarnings, 500);
  assert.equal(summary.pendingPayoutAmount, 250);
  assert.equal(summary.totalApprovedHours, 15);
});

test('getProfileForUser builds complete profile with project, assessments, and earnings', () => {
  const profile = getProfileForUser('alex.dev@bever.ai', 'BEV-99999');
  assert.equal(profile.email, 'alex.dev@bever.ai');
  assert.equal(profile.applicantId, 'BEV-99999');
  assert.equal(profile.identityVerified, true);
  assert.ok(profile.completedAssessments.length >= 3);
  assert.ok(profile.earningsHistory.length >= 3);
  assert.equal(profile.projectStatus.status, 'Active Queue');
});
