import fs from 'node:fs';
import path from 'node:path';
import type {
  AfricanContributorProfile,
  AfricanTaskSubmission,
  AfricanTrainingTask,
  WithdrawalRequest,
} from './african-training';

export interface AfricanTrainingDatabase {
  tasks: AfricanTrainingTask[];
  profiles: AfricanContributorProfile[];
  submissions: AfricanTaskSubmission[];
  withdrawals: WithdrawalRequest[];
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'african-training-db.json');

function createInitialSeedDatabase(): AfricanTrainingDatabase {
  const tasks: AfricanTrainingTask[] = [
    {
      id: 'AF-LNG-101',
      title: 'Yoruba Tonal Diacritics & Dialectal Naturalness Calibration',
      category: 'African Languages',
      language: 'Yoruba',
      dialectOrRegion: 'Lagos & Oyo Standard Yoruba, Nigeria',
      difficulty: 'Intermediate',
      rewardUsd: 16.5,
      estimatedMinutes: 20,
      status: 'published',
      instructions:
        'Review AI-generated Yoruba conversational dialogues, restore missing tonal marks (àmì ohùn) and sub-dots (ẹ, ọ, ṣ), and rewrite stiff Westernized phrasing into natural contemporary Yoruba.',
      guidelines: [
        'Preserve full Unicode diacritics (e.g., ṣé, àlàáfíà, ọ̀rọ̀) in every corrected sentence.',
        'Flag literal English calques that ignore Yoruba greetings or elder honorifics (ẹ / wọ́n).',
        'Explain tonal disambiguation choices when homographs appear.',
      ],
      examples: [
        {
          input: 'E kaaro, bawo ni ise lana? Mo fe ra ounje ni oja.',
          expectedOutput: 'Ẹ káàárọ̀, báwo ni iṣẹ́ àná? Mo fẹ́ ra oúnjẹ ní ọjà.',
          note: 'Sub-dots restored on ẹ/ṣ/ọ and rising/falling tones applied accurately.',
        },
      ],
      datasetSnippet:
        'Prompt #YR-482: Customer asking a neighbourhood tailor in Ibadan whether an Agbádá outfit will be ready before Saturday morning.',
      datasetFileName: 'yoruba_dialogue_batch_v2.jsonl',
      requiresConsentType: 'standard',
      createdAt: '2026-11-08T09:00:00Z',
      createdBy: 'staff@bever.ai',
    },
    {
      id: 'AF-VOC-102',
      title: 'Accented English, Igbo & Hausa Code-Switched Speech Collection',
      category: 'Voice & Speech Collection',
      language: 'Igbo / Hausa / English',
      dialectOrRegion: 'Enugu, Kano & Abuja, Nigeria',
      difficulty: 'Foundational',
      rewardUsd: 14.0,
      estimatedMinutes: 15,
      status: 'published',
      instructions:
        'Record spoken prompts naturally incorporating regional Nigerian English intonation alongside Igbo or Hausa code-switching phrases for banking and agriculture voice assistants.',
      guidelines: [
        'Record in a quiet room with minimal echo and clear microphone proximity.',
        'Speak naturally at conversational pace without over-articulating into a foreign accent.',
        'Provide exact verbatim phonetic notes and confirm accent region metadata.',
      ],
      examples: [
        {
          input: 'Prompt: "Kedu ihe kpatara network ji dị slow taa? Send me the receipt."',
          expectedOutput: '12s clean WAV/voice log + speaker region confirmation (Enugu Igbo-English)',
          note: 'Natural intonation preserved across code-switched clauses.',
        },
      ],
      datasetSnippet:
        'Speech Prompt Set #SP-19: 5 everyday mobile money & logistics voice queries recorded in local accent.',
      datasetFileName: 'west_african_asr_prompts.json',
      requiresConsentType: 'voice',
      createdAt: '2026-11-08T10:30:00Z',
      createdBy: 'staff@bever.ai',
    },
    {
      id: 'AF-AUD-103',
      title: 'Nigerian Pidgin & Swahili Street-Market Audio Transcription',
      category: 'Audio Transcription',
      language: 'Nigerian Pidgin / Swahili',
      dialectOrRegion: 'Lagos & Mombasa',
      difficulty: 'Intermediate',
      rewardUsd: 18.0,
      estimatedMinutes: 22,
      status: 'published',
      instructions:
        'Convert multi-speaker Nigerian Pidgin and coastal Swahili voice notes into time-stamped verbatim transcripts, annotating slang idioms and overlapping speaker turns.',
      guidelines: [
        'Transcribe Pidgin orthography consistently (e.g., "abeg", "wahala", "no vex", "how far").',
        'Use [Speaker 1] and [Speaker 2] tags with timestamps such as [00:08].',
        'Do not "correct" colloquial grammar into formal British English.',
      ],
      examples: [
        {
          input: 'Audio Clip #AUD-309 (00:00–00:14): Two market vendors discussing tomato dispatch.',
          expectedOutput: '[00:01] [Speaker 1]: Abeg, dat driver don reach Mile 12? [00:06] [Speaker 2]: Im dey Ojota now, ten minutes.',
          note: 'Preserves exact Pidgin lexical items and speaker boundaries.',
        },
      ],
      datasetSnippet:
        'Clip Metadata: 16kHz Mono | Ambient market background | Speakers: 2 | Dialect: Lagos Pidgin / Sheng overlap.',
      datasetFileName: 'pidgin_swahili_asr_batch4.jsonl',
      requiresConsentType: 'voice',
      createdAt: '2026-11-08T12:00:00Z',
      createdBy: 'staff@bever.ai',
    },
    {
      id: 'AF-IMG-104',
      title: 'African Cuisine, Textiles & Urban Mobility Image Annotation',
      category: 'Image Annotation',
      language: 'Swahili / English',
      dialectOrRegion: 'Pan-African (Kenya, Ghana, Nigeria, South Africa)',
      difficulty: 'Foundational',
      rewardUsd: 15.0,
      estimatedMinutes: 18,
      status: 'published',
      instructions:
        'Label objects, dishes, traditional garments, and local transit vehicles (Keke Napep, Matatu, Danfo, Boda-boda, Jollof, Injera, Kente, Ankara) in authentic African street and household photographs.',
      guidelines: [
        'Avoid generic Western labels like "generic stew" or "minivan" when accurate cultural terms apply.',
        'Tag foreground and background context including lighting, market stalls, and signage.',
        'Confirm zero identifiable private license plates or faces appear in contributed frames.',
      ],
      examples: [
        {
          input: 'Scene ID #IMG-882: Roadside food vendor serving grilled plantain with suya spice beside yellow tricycle.',
          expectedOutput: 'Tags: bole_roasted_plantain, suya_spice, keke_napep_tricycle, lagos_street_vendor',
          note: 'Specific regional culinary & transit ontology tags.',
        },
      ],
      datasetSnippet:
        'Frame #IMG-882: Morning street scene featuring a brightly painted matatu minibus beside a roasted maize vendor and Ankara fabric stall.',
      datasetFileName: 'pan_african_vision_taxonomy_v3.json',
      requiresConsentType: 'image_video',
      createdAt: '2026-11-09T08:00:00Z',
      createdBy: 'staff@bever.ai',
    },
    {
      id: 'AF-VID-105',
      title: 'Everyday African Activity & Gesture Video Action Annotation',
      category: 'Video Annotation',
      language: 'Zulu / Twi',
      dialectOrRegion: 'Johannesburg & Kumasi',
      difficulty: 'Intermediate',
      rewardUsd: 21.0,
      estimatedMinutes: 25,
      status: 'published',
      instructions:
        'Identify temporal action boundaries, hand gestures, greetings, and craftsmanship activities in short African household and workshop video sequences.',
      guidelines: [
        'Log start and end timestamps for each distinct action segment.',
        'Note culturally specific nonverbal greetings or artisan tool handling.',
        'Describe camera viewpoint and lighting transitions objectively.',
      ],
      examples: [
        {
          input: 'Clip #VID-114 (00:00–00:30): Potter shaping clay vessel on outdoor wheel in Kumasi.',
          expectedOutput: '[00:02-00:14] centering_wet_clay; [00:15-00:28] shaping_rim_with_calabash_rib',
          note: 'Captures indigenous pottery tool nomenclature accurately.',
        },
      ],
      datasetSnippet:
        'Video Sequence #VID-114 (30fps, 18s): Two neighbors exchanging morning greetings outside a township bakery before sorting bread crates.',
      datasetFileName: 'african_activity_segments.jsonl',
      requiresConsentType: 'image_video',
      createdAt: '2026-11-09T11:15:00Z',
      createdBy: 'staff@bever.ai',
    },
    {
      id: 'AF-EVL-106',
      title: 'Cultural Relevance & Context Accuracy AI Response Evaluation',
      category: 'AI Response Evaluation',
      language: 'Amharic / Swahili / English',
      dialectOrRegion: 'Addis Ababa & Nairobi',
      difficulty: 'Specialist',
      rewardUsd: 24.0,
      estimatedMinutes: 25,
      status: 'published',
      instructions:
        'Compare two AI model responses to African small-business, health, and civic queries. Grade factual correctness, respect for local economic realities, and absence of Western-centric assumptions.',
      guidelines: [
        'Check whether currency, mobile money rails (M-Pesa, Telebirr, OPay), and climate seasons match the user locale.',
        'Penalize condescending generalizations or inaccurate regional laws.',
        'Provide a structured 1–5 rating and a clear comparative justification.',
      ],
      examples: [
        {
          input: 'User asks how a smallholder farmer in Nakuru can invoice co-op buyers digitally without credit cards.',
          expectedOutput: 'Model B wins: Recommends M-Pesa Till/Paybill & SACCO mobile rails instead of US-only ACH/Venmo.',
          note: 'Evaluates practical local infrastructure relevance.',
        },
      ],
      datasetSnippet:
        'Evaluation Pair #EV-904 — Prompt: "Explain how a boutique retailer in Addis Ababa or Nairobi can manage inventory and accept instant customer payments offline-first."',
      datasetFileName: 'african_rlhf_eval_pair_904.json',
      requiresConsentType: 'standard',
      createdAt: '2026-11-09T14:00:00Z',
      createdBy: 'staff@bever.ai',
    },
    {
      id: 'AF-TRN-107',
      title: 'English ↔ Twi & Zulu Healthcare & Fintech Localization',
      category: 'Translation & Localization',
      language: 'Twi / Zulu',
      dialectOrRegion: 'Accra (Asante Twi) & KwaZulu-Natal (isiZulu)',
      difficulty: 'Specialist',
      rewardUsd: 22.5,
      estimatedMinutes: 25,
      status: 'published',
      instructions:
        'Translate critical consumer healthcare instructions and mobile banking alerts between English and Twi or Zulu while keeping terminology accessible and culturally trustworthy.',
      guidelines: [
        'Avoid awkward machine-translated loanwords where clear indigenous idioms exist.',
        'Verify dosage numbers, transaction fee warnings, and polite imperative forms.',
        'Include brief glossary notes for specialized financial/medical phrases.',
      ],
      examples: [
        {
          input: 'EN: "Never share your 4-digit mobile wallet PIN with any caller claiming to be support."',
          expectedOutput: 'Twi: "Mma obiara a ɔfrɛ wo sɛ ɔyɛ adwumayɛni no nnhu wo mobile sika PIN nɔma nnan no da."',
          note: 'Clear warning tone preserving security intent.',
        },
      ],
      datasetSnippet:
        'Batch #LOC-210: 4 fintech fraud-prevention notifications + primary maternal clinic reminder sentences.',
      datasetFileName: 'twi_zulu_localization_v1.jsonl',
      requiresConsentType: 'standard',
      createdAt: '2026-11-10T07:30:00Z',
      createdBy: 'staff@bever.ai',
    },
    {
      id: 'AF-DAT-108',
      title: 'Authentic African Proverbs, Idioms & Contextual Dataset Curation',
      category: 'Data Collection',
      language: 'Hausa / Igbo / Swahili / Yoruba',
      dialectOrRegion: 'Pan-African Linguistic Commons',
      difficulty: 'Intermediate',
      rewardUsd: 19.0,
      estimatedMinutes: 20,
      status: 'published',
      instructions:
        'Collect, verify, and annotate authentic African proverbs, everyday social scenarios, agricultural weather wisdom, and community etiquette entries not already over-represented in generic web scrapes.',
      guidelines: [
        'Include original native script, literal gloss, figurative social meaning, and when NOT to use the proverb.',
        'Contribute original lived cultural knowledge only — never copy Wikipedia lists.',
        'Tag region, language, and conversational register.',
      ],
      examples: [
        {
          input: 'Igbo Proverb Collection Entry',
          expectedOutput: '"Otu aka anaghị eke ngwugwu" — Literal: One hand cannot tie a parcel. Meaning: Meaningful work requires community solidarity.',
          note: 'Includes native orthography, literal gloss, and pragmatic usage guidance.',
        },
      ],
      datasetSnippet:
        'Schema: { native_text, language, region, literal_translation, pragmatic_context, usage_example }',
      datasetFileName: 'african_contextual_corpus_template.json',
      requiresConsentType: 'personal_data',
      createdAt: '2026-11-10T09:15:00Z',
      createdBy: 'staff@bever.ai',
    },
  ];

  const profiles: AfricanContributorProfile[] = [
    {
      email: 'contributor@bever.ai',
      name: 'Chidinma Okafor',
      applicantId: 'BEV-98124',
      country: 'Nigeria',
      languagesSpoken: [
        { language: 'Yoruba', proficiency: 'Native' },
        { language: 'Igbo', proficiency: 'Fluent' },
        { language: 'Nigerian Pidgin', proficiency: 'Native' },
        { language: 'English (African Regional)', proficiency: 'Fluent' },
      ],
      accentsDialects: ['Lagos Urban Yoruba', 'Standard Nigerian English', 'Onitsha Igbo'],
      skills: [
        'African Languages',
        'Audio Transcription',
        'AI Response Evaluation',
        'Translation & Localization',
      ],
      previousExperience:
        '3 years annotating West African ASR datasets, Yoruba tonal diacritic corpora, and bilingual customer-support RLHF benchmarks.',
      preferredCategories: [
        'African Languages',
        'Voice & Speech Collection',
        'Translation & Localization',
      ],
      consentSigned: true,
      consentSignedAt: '2026-11-05T10:00:00Z',
      qualityScore: 97.4,
      fraudFlagsCount: 0,
      accountStatus: 'active',
      updatedAt: '2026-11-10T08:00:00Z',
    },
    {
      email: 'alex.rivera@bever.ai',
      name: 'Alex Rivera',
      applicantId: 'BEV-98124',
      country: 'Kenya',
      languagesSpoken: [
        { language: 'Swahili', proficiency: 'Fluent' },
        { language: 'English (African Regional)', proficiency: 'Native' },
      ],
      accentsDialects: ['Nairobi Urban Swahili', 'East African English'],
      skills: ['AI Response Evaluation', 'Image Annotation', 'Data Collection'],
      previousExperience:
        'Multimodal annotation specialist covering East African fintech evaluation and agricultural computer vision datasets.',
      preferredCategories: ['AI Response Evaluation', 'Image Annotation', 'Data Collection'],
      consentSigned: true,
      consentSignedAt: '2026-11-06T09:00:00Z',
      qualityScore: 98.4,
      fraudFlagsCount: 0,
      accountStatus: 'active',
      updatedAt: '2026-11-10T08:30:00Z',
    },
    {
      email: 'kwame.mensah@bever.ai',
      name: 'Kwame Mensah',
      applicantId: 'BEV-97410',
      country: 'Ghana',
      languagesSpoken: [
        { language: 'Twi', proficiency: 'Native' },
        { language: 'English (African Regional)', proficiency: 'Fluent' },
      ],
      accentsDialects: ['Asante Twi', 'Accra Urban Twi'],
      skills: ['Translation & Localization', 'Voice & Speech Collection', 'Video Annotation'],
      previousExperience:
        'Kumasi linguistic researcher focused on Akan speech segmentation and clinical instruction localization.',
      preferredCategories: ['Translation & Localization', 'Voice & Speech Collection'],
      consentSigned: true,
      consentSignedAt: '2026-11-04T14:20:00Z',
      qualityScore: 96.2,
      fraudFlagsCount: 0,
      accountStatus: 'active',
      updatedAt: '2026-11-09T17:00:00Z',
    },
  ];

  const submissions: AfricanTaskSubmission[] = [
    {
      id: 'SUB-AF-901',
      taskId: 'AF-LNG-101',
      taskTitle: 'Yoruba Tonal Diacritics & Dialectal Naturalness Calibration',
      category: 'African Languages',
      language: 'Yoruba',
      contributorEmail: 'contributor@bever.ai',
      contributorName: 'Chidinma Okafor',
      contributorId: 'BEV-98124',
      responsePayload: {
        primaryAnswer:
          'Ẹ káàárọ̀ ọ̀gá, ṣé aṣọ Agbádá mi yóò ti parí kí ó tó di àárọ̀ ọjọ́ Àbámẹ́ta?',
        rubricNotes:
          'Added full tone marks and used respectful singular honorific phrasing suitable for an Ibadan artisan.',
      },
      consentAccepted: true,
      consentScope: 'standard',
      completionSeconds: 185,
      status: 'approved',
      rewardUsd: 16.5,
      qualityScore: 98,
      fraudFlags: [],
      reviewNotes: 'Exemplary Yoruba tonal accuracy and cultural register.',
      reviewedBy: 'staff@bever.ai',
      submittedAt: '2026-11-09T14:15:00Z',
      reviewedAt: '2026-11-09T16:40:00Z',
    },
    {
      id: 'SUB-AF-902',
      taskId: 'AF-IMG-104',
      taskTitle: 'African Cuisine, Textiles & Urban Mobility Image Annotation',
      category: 'Image Annotation',
      language: 'Swahili / English',
      contributorEmail: 'contributor@bever.ai',
      contributorName: 'Chidinma Okafor',
      contributorId: 'BEV-98124',
      responsePayload: {
        primaryAnswer:
          'Annotated 12 bounding regions: matatu_minibus, roasted_maize_vendor, ankara_fabric_stall, pedestrian_umbrella.',
        annotationTags: ['matatu_minibus', 'ankara_fabric', 'nairobi_street_market'],
        rubricNotes:
          'Excluded license plate region and specified regional textile nomenclature.',
      },
      consentAccepted: true,
      consentScope: 'image_video',
      completionSeconds: 240,
      status: 'pending',
      rewardUsd: 15.0,
      qualityScore: null,
      fraudFlags: [],
      reviewNotes: '',
      reviewedBy: null,
      submittedAt: '2026-11-11T09:10:00Z',
      reviewedAt: null,
    },
    {
      id: 'SUB-AF-903',
      taskId: 'AF-AUD-103',
      taskTitle: 'Nigerian Pidgin & Swahili Street-Market Audio Transcription',
      category: 'Audio Transcription',
      language: 'Nigerian Pidgin / Swahili',
      contributorEmail: 'kwame.mensah@bever.ai',
      contributorName: 'Kwame Mensah',
      contributorId: 'BEV-97410',
      responsePayload: {
        primaryAnswer:
          '[00:02] [Speaker 1]: Abeg make you check whether di dispatch rider don drop am.',
        rubricNotes: 'Fast single pass submitted without Speaker 2 overlap tag.',
      },
      consentAccepted: true,
      consentScope: 'voice',
      completionSeconds: 9,
      status: 'pending',
      rewardUsd: 18.0,
      qualityScore: null,
      fraudFlags: ['FAST_COMPLETION_ANOMALY'],
      reviewNotes: '',
      reviewedBy: null,
      submittedAt: '2026-11-11T10:30:00Z',
      reviewedAt: null,
    },
  ];

  const withdrawals: WithdrawalRequest[] = [
    {
      id: 'WD-AF-401',
      contributorEmail: 'kwame.mensah@bever.ai',
      contributorName: 'Kwame Mensah',
      amountUsd: 42.0,
      payoutMethod: 'Mobile Money (M-Pesa / MTN MoMo / Airtel)',
      destinationAccount: 'MTN MoMo +233-24-555-0184',
      status: 'paid',
      requestedAt: '2026-11-07T15:00:00Z',
      processedAt: '2026-11-08T11:30:00Z',
      adminNote: 'Settled via MTN MoMo Ghana rail.',
    },
  ];

  return { tasks, profiles, submissions, withdrawals };
}

function ensureDatabase(): AfricanTrainingDatabase {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initial = createInitialSeedDatabase();
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
    return initial;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw) as AfricanTrainingDatabase;
    if (!parsed.tasks || !parsed.profiles || !parsed.submissions || !parsed.withdrawals) {
      throw new Error('Incomplete database structure');
    }
    return parsed;
  } catch {
    const initial = createInitialSeedDatabase();
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
    return initial;
  }
}

export function readDatabase(): AfricanTrainingDatabase {
  return ensureDatabase();
}

export function writeDatabase(db: AfricanTrainingDatabase): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

export function getOrCreateProfileForEmail(
  db: AfricanTrainingDatabase,
  email: string,
  name?: string,
  applicantId?: string
): AfricanContributorProfile {
  const existing = db.profiles.find(
    (p) => p.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) {
    return existing;
  }
  const derivedName =
    name?.trim() ||
    email
      .split('@')[0]
      .split(/[._-]/)
      .filter(Boolean)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ') ||
    'Bever Contributor';

  const newProfile: AfricanContributorProfile = {
    email,
    name: derivedName,
    applicantId: applicantId || `BEV-${Math.floor(10000 + Math.random() * 89999)}`,
    country: 'Nigeria',
    languagesSpoken: [
      { language: 'English (African Regional)', proficiency: 'Fluent' },
      { language: 'Yoruba', proficiency: 'Conversational' },
    ],
    accentsDialects: ['Standard Nigerian English'],
    skills: ['African Languages', 'AI Response Evaluation'],
    previousExperience: '',
    preferredCategories: ['African Languages', 'AI Response Evaluation'],
    consentSigned: false,
    consentSignedAt: null,
    qualityScore: 100,
    fraudFlagsCount: 0,
    accountStatus: 'active',
    updatedAt: new Date().toISOString(),
  };

  db.profiles.push(newProfile);
  writeDatabase(db);
  return newProfile;
}
