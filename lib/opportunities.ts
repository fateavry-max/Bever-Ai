export type OpportunityCategory =
  | 'General AI Training'
  | 'Writing and Editing'
  | 'Coding and Software Engineering'
  | 'Mathematics'
  | 'Science'
  | 'Language and Translation'
  | 'Data Annotation'
  | 'Image and Video Evaluation'
  | 'Audio Transcription'
  | 'Subject-Matter Expertise';

export interface Opportunity {
  id: string;
  title: string;
  category: OpportunityCategory;
  requiredSkills: string[];
  language: string;
  eligibility: string;
  estimatedRate: string;
  isBenchmarkRate: boolean;
  shortDescription: string;
  fullDescription: string;
  difficulty: 'Entry' | 'Intermediate' | 'Advanced' | 'Specialist';
  weeklyHours: string;
  assessmentEstimate: string;
  deliverables: string[];
}

export const OPPORTUNITIES_DATA: Opportunity[] = [
  {
    id: 'opp-code-01',
    title: 'Python Backend & Algorithm Evaluation',
    category: 'Coding and Software Engineering',
    requiredSkills: ['Python 3.11+', 'Data Structures', 'AsyncIO', 'Code Quality & PEP8'],
    language: 'English',
    eligibility: 'Global (Remote)',
    estimatedRate: '$38 – $65 / hr',
    isBenchmarkRate: true,
    difficulty: 'Advanced',
    weeklyHours: '10 – 30 hrs/week flexible',
    assessmentEstimate: '45 mins code assessment',
    shortDescription:
      'Evaluate model-generated Python algorithms for time complexity, memory safety, test coverage, and security edge cases.',
    fullDescription:
      'In this project, software engineering contributors review paired code generations produced by state-of-the-art LLMs. You will construct adversarial unit tests, identify subtle race conditions or boundary off-by-one errors, and write step-by-step counter-examples explaining why one implementation is superior.',
    deliverables: [
      'Comparative code ranking (Response A vs Response B)',
      'Identification of hallucinated libraries or insecure practices',
      'Refactored benchmark reference solution when both fail',
    ],
  },
  {
    id: 'opp-writing-02',
    title: 'Creative Prose & Stylistic Editing Benchmarking',
    category: 'Writing and Editing',
    requiredSkills: ['Narrative Structure', 'Copyediting', 'Tone Calibration', 'Fact Checking'],
    language: 'English (Native/Bilingual)',
    eligibility: 'Global (Remote)',
    estimatedRate: '$26 – $42 / hr',
    isBenchmarkRate: true,
    difficulty: 'Intermediate',
    weeklyHours: '10 – 25 hrs/week flexible',
    assessmentEstimate: '35 mins writing critique',
    shortDescription:
      'Critique narrative voice, coherence, tonal register, and rhetorical subtlety across long-form model-generated texts.',
    fullDescription:
      'Help Frontier AI models master natural human voice without robotic clichés. Contributors evaluate essays, editorial articles, and creative storytelling prompts for natural phrasing, emotional cadence, logical flow, and absence of formulaic AI transition tropes.',
    deliverables: [
      'Multi-axis rubric scoring on voice, originality, and adherence to tone',
      'Line-by-line editorial markups highlighting unnatural phrasing',
      'Exemplary rewritten passages showcasing human craft',
    ],
  },
  {
    id: 'opp-math-03',
    title: 'Advanced Calculus & Discrete Mathematics Verifier',
    category: 'Mathematics',
    requiredSkills: ['Linear Algebra', 'Multivariable Calculus', 'Proof Verification', 'LaTeX'],
    language: 'English',
    eligibility: 'Global (Remote)',
    estimatedRate: '$45 – $75 / hr',
    isBenchmarkRate: true,
    difficulty: 'Specialist',
    weeklyHours: '8 – 20 hrs/week flexible',
    assessmentEstimate: '60 mins proof test',
    shortDescription:
      'Verify formal mathematical proofs, step-by-step algebraic derivations, and combinatorial problem solutions.',
    fullDescription:
      'Evaluating reasoning models on graduate-level mathematics. You will inspect chains-of-thought, pinpoint the exact step where arithmetic or deductive reasoning drifts, and formulate verified ground-truth proof trees in standard LaTeX formatting.',
    deliverables: [
      'Verification of each intermediate step in reasoning chains',
      'Step-index bug localization for deductive failures',
      'LaTeX ground-truth verification notes',
    ],
  },
  {
    id: 'opp-lang-04',
    title: 'Japanese — English Technical Localization & Nuance Review',
    category: 'Language and Translation',
    requiredSkills: ['Bilingual JP/EN (JLPT N1)', 'Technical Terminology', 'Cultural Nuance', 'Keigo'],
    language: 'Japanese / English',
    eligibility: 'Global (Remote)',
    estimatedRate: '$32 – $50 / hr',
    isBenchmarkRate: true,
    difficulty: 'Advanced',
    weeklyHours: '10 – 25 hrs/week flexible',
    assessmentEstimate: '40 mins translation test',
    shortDescription:
      'Assess high-context conversational and technical Japanese LLM responses for politeness levels and idiomatic fidelity.',
    fullDescription:
      'Evaluate how well AI handles honorifics (Keigo/Sonkeigo), business idioms, and colloquial Tokyo dialects versus literal translations. Contributor feedback guides cross-lingual alignment for international enterprise clients.',
    deliverables: [
      'Naturalness and register classification',
      'Detection of unnatural literal calques from Western idioms',
      'Cultural context notes and native-sounding alternatives',
    ],
  },
  {
    id: 'opp-gen-05',
    title: 'Core Conversational AI & Factuality Evaluator',
    category: 'General AI Training',
    requiredSkills: ['Fact-Checking', 'Web Search Synthesis', 'Analytical Reading', 'Prompt Following'],
    language: 'English',
    eligibility: 'Global (Remote)',
    estimatedRate: '$20 – $32 / hr',
    isBenchmarkRate: true,
    difficulty: 'Entry',
    weeklyHours: '10 – 35 hrs/week flexible',
    assessmentEstimate: '30 mins general reasoning assessment',
    shortDescription:
      'Grade general-domain assistant answers for instruction-following, truthfulness, neutrality, and concise clarity.',
    fullDescription:
      'The foundational layer of RLHF. You receive multi-turn conversational prompts submitted by users and score model responses on whether all instructions (e.g. constraints on length, formatting, tone) were strictly followed without hallucinated facts.',
    deliverables: [
      'Constraint check matrix (did it follow negative constraints?)',
      'Fact verification with citation links',
      'Helpfulness and verbosity ranking',
    ],
  },
  {
    id: 'opp-sci-06',
    title: 'Biomedical & Life Sciences Literature Review Specialist',
    category: 'Science',
    requiredSkills: ['Molecular Biology', 'PubMed Verification', 'Clinical Terminology', 'Research Methods'],
    language: 'English',
    eligibility: 'Graduate degree or professional equivalent',
    estimatedRate: '$50 – $85 / hr',
    isBenchmarkRate: true,
    difficulty: 'Specialist',
    weeklyHours: '5 – 15 hrs/week flexible',
    assessmentEstimate: '50 mins literature review test',
    shortDescription:
      'Review clinical trial summaries, biochemical pathway explanations, and pharmacological mechanisms generated by AI.',
    fullDescription:
      'Domain experts evaluate medical literature synthesis prompts to prevent dangerous hallucinations, ensure precise dosages are flagged, and verify that biomedical citations correspond to genuine peer-reviewed studies.',
    deliverables: [
      'Safety and medical disclaimer audit',
      'Biochemical claim verification against PubMed DOIs',
      'Evaluation of synthesis quality for non-specialist clinicians',
    ],
  },
  {
    id: 'opp-data-07',
    title: 'Hierarchical Entity & Taxonomy Data Annotation',
    category: 'Data Annotation',
    requiredSkills: ['Attention to Detail', 'Schema Adherence', 'Speed & Accuracy', 'JSON/XML Structuring'],
    language: 'English',
    eligibility: 'Global (Remote)',
    estimatedRate: '$18 – $28 / hr',
    isBenchmarkRate: true,
    difficulty: 'Entry',
    weeklyHours: '15 – 40 hrs/week flexible',
    assessmentEstimate: '25 mins annotation guideline test',
    shortDescription:
      'Annotate nested entities, relationships, coreference chains, and tabular data according to formal guideline schemas.',
    fullDescription:
      'High-volume structured dataset curation. Annotators classify sentence spans, tag parts of speech, mark intent boundaries, and structure unstructured textual logs into clean JSON training schemas for model pre-training.',
    deliverables: [
      'Bounding and classification of nested named entities',
      'Intent label assignment under strict decision trees',
      'Discrepancy resolution for ambiguous border cases',
    ],
  },
  {
    id: 'opp-img-08',
    title: 'Multimodal Vision-Language Grounding & Artifact Review',
    category: 'Image and Video Evaluation',
    requiredSkills: ['Visual QA', 'Spatial Reasoning', 'Diagram Analysis', 'UI/UX Visual Inspection'],
    language: 'English',
    eligibility: 'Global (Remote)',
    estimatedRate: '$24 – $38 / hr',
    isBenchmarkRate: true,
    difficulty: 'Intermediate',
    weeklyHours: '10 – 30 hrs/week flexible',
    assessmentEstimate: '35 mins visual reasoning test',
    shortDescription:
      'Audit vision-language models on technical chart reading, spatial object relations, and visual OCR fidelity.',
    fullDescription:
      'Test multimodal AI models with complex diagrams, engineering schematics, handwritten whiteboard notes, and UI mockups. Verify whether the AI accurately locates objects in 2D space, extracts numbers from graphs without distortion, and spots visual glitches.',
    deliverables: [
      'Spatial coordinate verification (bounding box precision)',
      'Chart and graph data extraction audit',
      'Visual hallucination cataloging',
    ],
  },
  {
    id: 'opp-audio-09',
    title: 'Phonetic & Dialectal Audio Transcription Auditing',
    category: 'Audio Transcription',
    requiredSkills: ['Audio Listening', 'Timecoding', 'Accented English / Regionalisms', 'Disfluency Tagging'],
    language: 'English (Various Regional Accents)',
    eligibility: 'Global (Remote)',
    estimatedRate: '$22 – $34 / hr',
    isBenchmarkRate: true,
    difficulty: 'Intermediate',
    weeklyHours: '10 – 25 hrs/week flexible',
    assessmentEstimate: '30 mins audio transcription test',
    shortDescription:
      'Audit automated speech-to-text transcripts with heavy regional accents, background noise, and overlapping speakers.',
    fullDescription:
      'Train speech and audio foundational models. Contributors listen to challenging acoustic clips and generate verbatim phonetic transcriptions, tagging filler words (ums, ahs), false starts, speaker turns, and ambient audio cues.',
    deliverables: [
      'Word Error Rate (WER) correction logs',
      'Speaker diarization timestamps',
      'Phonetic tagging of homophones and colloquial slang',
    ],
  },
  {
    id: 'opp-exp-10',
    title: 'Corporate Finance & Regulatory Compliance Specialist',
    category: 'Subject-Matter Expertise',
    requiredSkills: ['GAAP / IFRS', 'SEC Filings (10-K)', 'Financial Modeling', 'Risk Assessment'],
    language: 'English',
    eligibility: 'CPA, CFA, or 4+ years professional finance',
    estimatedRate: '$55 – $95 / hr',
    isBenchmarkRate: true,
    difficulty: 'Specialist',
    weeklyHours: '5 – 15 hrs/week flexible',
    assessmentEstimate: '45 mins financial statement audit',
    shortDescription:
      'Stress-test financial reasoning models on 10-K earnings analysis, cash flow projections, and regulatory disclosures.',
    fullDescription:
      'Enterprise financial institutions rely on Bever experts to stress-test financial LLMs. You will pose complex multi-statement accounting puzzles, check whether balance sheets articulate correctly in model answers, and flag non-compliant tax interpretations.',
    deliverables: [
      'Comparative evaluation on financial logic and calculations',
      'Verification against GAAP/IFRS regulatory frameworks',
      'Creation of high-difficulty test suites for benchmark suites',
    ],
  },
  {
    id: 'opp-code-11',
    title: 'TypeScript & React Architecture Code Critique',
    category: 'Coding and Software Engineering',
    requiredSkills: ['TypeScript 5+', 'Next.js / React 19', 'State Management', 'Web Performance'],
    language: 'English',
    eligibility: 'Global (Remote)',
    estimatedRate: '$36 – $60 / hr',
    isBenchmarkRate: true,
    difficulty: 'Advanced',
    weeklyHours: '10 – 25 hrs/week flexible',
    assessmentEstimate: '40 mins frontend architecture test',
    shortDescription:
      'Audit AI-generated React components for hydration safety, accessibility tags, rendering loops, and strict type safety.',
    fullDescription:
      'Assess modern web development code. Evaluate how well models handle React Server Components, custom hook lifecycle memory leaks, CSS module clashes, and accessible ARIA attributes.',
    deliverables: [
      'Hydration and re-render bug detection',
      'Strict TypeScript generic typing verification',
      'Interactive component refactoring and performance notes',
    ],
  },
  {
    id: 'opp-lang-12',
    title: 'Spanish — English Dialectal Translation & Cultural Context',
    category: 'Language and Translation',
    requiredSkills: ['Native Spanish (LATAM/Spain)', 'Fluent English', 'Idiomatic Nuance', 'Subtitling'],
    language: 'Spanish / English',
    eligibility: 'Global (Remote)',
    estimatedRate: '$24 – $38 / hr',
    isBenchmarkRate: true,
    difficulty: 'Intermediate',
    weeklyHours: '10 – 30 hrs/week flexible',
    assessmentEstimate: '35 mins bilingual translation test',
    shortDescription:
      'Review Latin American and Peninsular Spanish translations for cultural register, regional slang, and tone fidelity.',
    fullDescription:
      'Evaluate conversational dialogue, customer support scenarios, and literary text translations between Spanish and English. Ensure regional dialect consistency (Mexican, Argentine, Colombian, Peninsular) is preserved without awkward hybrid phrasing.',
    deliverables: [
      'Regional dialect tagging and register audit',
      'Detection of mistranslated idioms or false cognates',
      'Polished localized rewrites with cultural notes',
    ],
  },
];

export interface FilterOptions {
  category?: string;
  searchQuery?: string;
  language?: string;
  difficulty?: string;
}

export function filterOpportunities(
  opportunities: Opportunity[],
  filters: FilterOptions
): Opportunity[] {
  return opportunities.filter((item) => {
    // Category match
    if (filters.category && filters.category !== 'All Categories') {
      if (item.category !== filters.category) return false;
    }

    // Difficulty match
    if (filters.difficulty && filters.difficulty !== 'All Levels') {
      if (item.difficulty !== filters.difficulty) return false;
    }

    // Language match
    if (filters.language && filters.language !== 'All Languages') {
      if (!item.language.toLowerCase().includes(filters.language.toLowerCase())) {
        return false;
      }
    }

    // Search query match (title, description, skills, category)
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      const inTitle = item.title.toLowerCase().includes(q);
      const inDesc = item.shortDescription.toLowerCase().includes(q) || item.fullDescription.toLowerCase().includes(q);
      const inCategory = item.category.toLowerCase().includes(q);
      const inSkills = item.requiredSkills.some((skill) => skill.toLowerCase().includes(q));
      if (!inTitle && !inDesc && !inCategory && !inSkills) return false;
    }

    return true;
  });
}

export function getCategoryCounts(opportunities: Opportunity[]): Record<string, number> {
  const counts: Record<string, number> = {
    'All Categories': opportunities.length,
  };
  for (const opp of opportunities) {
    counts[opp.category] = (counts[opp.category] || 0) + 1;
  }
  return counts;
}

export function getOpportunityById(id: string): Opportunity | undefined {
  return OPPORTUNITIES_DATA.find((item) => item.id === id);
}

export function getAllOpportunityIds(): string[] {
  return OPPORTUNITIES_DATA.map((item) => item.id);
}
