export interface CompletedAssessment {
  id: string;
  title: string;
  category: string;
  completedAt: string;
  score: number;
  passThreshold: number;
  status: 'Passed' | 'Under Review' | 'Needs Retake';
  rubricBreakdown: {
    accuracy: number;
    helpfulness: number;
    safetyCompliance: number;
  };
}

export interface EarningsRecord {
  id: string;
  period: string;
  projectTitle: string;
  category: string;
  approvedHours: number;
  ratePerHour: number;
  totalAmount: number;
  payoutDate: string;
  status: 'Disbursed' | 'Processing' | 'Pending Approval';
  paymentMethod: string;
}

export interface CurrentProjectStatus {
  projectId: string;
  projectTitle: string;
  category: string;
  role: string;
  status: 'Active Queue' | 'Under Review' | 'Onboarding';
  benchmarkRate: string;
  tasksCompletedThisWeek: number;
  tasksAvailableInQueue: number;
  interAnnotatorAgreement: string;
  tier: string;
}

export interface ContributorProfile {
  applicantId: string;
  email: string;
  name: string;
  country: string;
  primaryLanguage: string;
  joinedDate: string;
  identityVerified: boolean;
  projectStatus: CurrentProjectStatus;
  completedAssessments: CompletedAssessment[];
  earningsHistory: EarningsRecord[];
}

export function calculateEarningsSummary(records: EarningsRecord[]): {
  totalLifetimeEarnings: number;
  pendingPayoutAmount: number;
  totalApprovedHours: number;
} {
  let totalLifetimeEarnings = 0;
  let pendingPayoutAmount = 0;
  let totalApprovedHours = 0;

  for (const record of records) {
    if (record.status === 'Disbursed') {
      totalLifetimeEarnings += record.totalAmount;
    } else if (record.status === 'Processing' || record.status === 'Pending Approval') {
      pendingPayoutAmount += record.totalAmount;
    }
    totalApprovedHours += record.approvedHours;
  }

  return {
    totalLifetimeEarnings,
    pendingPayoutAmount,
    totalApprovedHours: Math.round(totalApprovedHours * 10) / 10,
  };
}

export function getProfileForUser(email: string, applicantId?: string | null): ContributorProfile {
  const isAlex = email.includes('alex');
  const isMath = email.includes('math') || email.includes('chen');
  const isSophia = email.includes('sophia');

  const assignedId = applicantId || 'BEV-78491';
  const name = isAlex
    ? 'Alex Rivera'
    : isMath
    ? 'Dr. Wei Chen'
    : isSophia
    ? 'Sophia Lin'
    : email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const currentProject: CurrentProjectStatus = isMath
    ? {
        projectId: 'opp-math-03',
        projectTitle: 'Advanced Calculus & Discrete Mathematics Verifier',
        category: 'Mathematics',
        role: 'Specialist Proof Auditor',
        status: 'Active Queue',
        benchmarkRate: '$45 – $75 / hr',
        tasksCompletedThisWeek: 8,
        tasksAvailableInQueue: 19,
        interAnnotatorAgreement: '99.1%',
        tier: 'Senior Specialist Tier 2',
      }
    : {
        projectId: 'opp-code-01',
        projectTitle: 'Python Backend & Algorithm Evaluation',
        category: 'Coding and Software Engineering',
        role: 'Senior RLHF Evaluator',
        status: 'Active Queue',
        benchmarkRate: '$38 – $65 / hr',
        tasksCompletedThisWeek: 12,
        tasksAvailableInQueue: 24,
        interAnnotatorAgreement: '98.4%',
        tier: 'Verified Contributor Tier 1',
      };

  const assessments: CompletedAssessment[] = [
    {
      id: 'asm-01',
      title: isMath ? 'Formal Mathematical Proof Validation' : 'Python Concurrency & AsyncIO Safety',
      category: isMath ? 'Mathematics' : 'Coding and Software Engineering',
      completedAt: 'Nov 02, 2026',
      score: 96,
      passThreshold: 85,
      status: 'Passed',
      rubricBreakdown: { accuracy: 98, helpfulness: 94, safetyCompliance: 96 },
    },
    {
      id: 'asm-02',
      title: 'Adversarial Instruction Following & Edge Cases',
      category: 'General AI Training',
      completedAt: 'Oct 24, 2026',
      score: 93,
      passThreshold: 80,
      status: 'Passed',
      rubricBreakdown: { accuracy: 92, helpfulness: 95, safetyCompliance: 92 },
    },
    {
      id: 'asm-03',
      title: 'Double-Blind Peer Critique Calibration',
      category: 'Subject-Matter Expertise',
      completedAt: 'Oct 14, 2026',
      score: 89,
      passThreshold: 80,
      status: 'Passed',
      rubricBreakdown: { accuracy: 88, helpfulness: 90, safetyCompliance: 90 },
    },
  ];

  const earnings: EarningsRecord[] = [
    {
      id: 'PAY-89102',
      period: 'Nov 03 – Nov 09, 2026',
      projectTitle: currentProject.projectTitle,
      category: currentProject.category,
      approvedHours: 9.5,
      ratePerHour: 55,
      totalAmount: 522.5,
      payoutDate: 'Tuesday, Nov 11, 2026',
      status: 'Processing',
      paymentMethod: 'Direct Deposit (ACH ••••4092)',
    },
    {
      id: 'PAY-88410',
      period: 'Oct 27 – Nov 02, 2026',
      projectTitle: currentProject.projectTitle,
      category: currentProject.category,
      approvedHours: 14.0,
      ratePerHour: 55,
      totalAmount: 770.0,
      payoutDate: 'Tuesday, Nov 04, 2026',
      status: 'Disbursed',
      paymentMethod: 'Direct Deposit (ACH ••••4092)',
    },
    {
      id: 'PAY-87291',
      period: 'Oct 20 – Oct 26, 2026',
      projectTitle: currentProject.projectTitle,
      category: currentProject.category,
      approvedHours: 11.2,
      ratePerHour: 55,
      totalAmount: 616.0,
      payoutDate: 'Tuesday, Oct 28, 2026',
      status: 'Disbursed',
      paymentMethod: 'Direct Deposit (ACH ••••4092)',
    },
    {
      id: 'PAY-86104',
      period: 'Oct 13 – Oct 19, 2026',
      projectTitle: currentProject.projectTitle,
      category: currentProject.category,
      approvedHours: 16.5,
      ratePerHour: 55,
      totalAmount: 907.5,
      payoutDate: 'Tuesday, Oct 21, 2026',
      status: 'Disbursed',
      paymentMethod: 'Direct Deposit (ACH ••••4092)',
    },
  ];

  return {
    applicantId: assignedId,
    email,
    name,
    country: 'United States',
    primaryLanguage: 'English (Native)',
    joinedDate: 'October 2026',
    identityVerified: true,
    projectStatus: currentProject,
    completedAssessments: assessments,
    earningsHistory: earnings,
  };
}
