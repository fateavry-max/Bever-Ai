'use client';

import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Globe,
  Languages,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { buildBeverHeaders } from '@/lib/african-training-client';
import {
  AFRICAN_COUNTRIES,
  AFRICAN_LANGUAGES,
  AFRICAN_TRAINING_CATEGORIES,
  type AfricanContributorProfile,
  type AfricanTrainingCategory,
  type LanguageProficiency,
} from '@/lib/african-training';

export default function ContributorProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<AfricanContributorProfile | null>(null);
  const [country, setCountry] = useState('Nigeria');
  const [languagesSpoken, setLanguagesSpoken] = useState<LanguageProficiency[]>([
    { language: 'Yoruba', proficiency: 'Native' },
  ]);
  const [newLang, setNewLang] = useState<string>('Swahili');
  const [newProficiency, setNewProficiency] =
    useState<LanguageProficiency['proficiency']>('Fluent');

  const [accentsText, setAccentsText] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [previousExperience, setPreviousExperience] = useState('');
  const [preferredCategories, setPreferredCategories] = useState<AfricanTrainingCategory[]>([]);
  const [consentSigned, setConsentSigned] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let active = true;

    async function loadProfile() {
      try {
        const res = await fetch('/api/african-training/profile', {
          headers: buildBeverHeaders(user),
        });
        const data = await res.json();
        const p = data.profile as AfricanContributorProfile | undefined;
        if (!active || !p) return;
        setProfile(p);
        setCountry(p.country || 'Nigeria');
        setLanguagesSpoken(p.languagesSpoken || []);
        setAccentsText((p.accentsDialects || []).join(', '));
        setSkillsText((p.skills || []).join(', '));
        setPreviousExperience(p.previousExperience || '');
        setPreferredCategories(p.preferredCategories || []);
        setConsentSigned(Boolean(p.consentSigned));
      } catch {
        // Fallback state preserved
      }
    }

    loadProfile();
    return () => {
      active = false;
    };
  }, [user]);

  const handleAddLanguage = () => {
    if (!newLang) return;
    if (languagesSpoken.some((l) => l.language === newLang)) return;
    setLanguagesSpoken([...languagesSpoken, { language: newLang, proficiency: newProficiency }]);
  };

  const handleRemoveLanguage = (lang: string) => {
    if (languagesSpoken.length <= 1) return;
    setLanguagesSpoken(languagesSpoken.filter((l) => l.language !== lang));
  };

  const toggleCategory = (cat: AfricanTrainingCategory) => {
    if (preferredCategories.includes(cat)) {
      setPreferredCategories(preferredCategories.filter((c) => c !== cat));
    } else {
      setPreferredCategories([...preferredCategories, cat]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaveMessage(null);

    try {
      const res = await fetch('/api/african-training/profile', {
        method: 'PUT',
        headers: buildBeverHeaders(user),
        body: JSON.stringify({
          country,
          languagesSpoken,
          accentsDialects: accentsText
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          skills: skillsText
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          previousExperience,
          preferredCategories,
          consentSigned,
        }),
      });

      const data = await res.json();
      if (res.ok && data.profile) {
        setProfile(data.profile);
        setSaveMessage('African Contributor Identity saved to server.');
      } else {
        setSaveMessage(data.error || 'Could not update profile.');
      }
    } catch {
      setSaveMessage('Network error while saving profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl pb-10">
      <div className="pb-4 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 mb-1 text-xs">
          <span className="font-mono text-zinc-500 font-medium">African Contributor Identity</span>
          <span className="text-zinc-300">·</span>
          <span className="text-zinc-500 font-mono">ID: {user?.applicantId || 'BEV-98124'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight font-display">
          Contributor Profile, Languages &amp; Accents
        </h1>
        <p className="text-xs text-zinc-500 mt-1 max-w-2xl">
          Configure your country, African languages, regional accents and dialects, expertise, and data collection consent so tasks match your authentic background.
        </p>
      </div>

      {/* Hero Summary Card */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-950 text-white font-mono text-lg font-medium flex items-center justify-center shrink-0">
            {user?.avatarInitials || 'BC'}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-950 font-display">
              {profile?.name || user?.name || 'Bever Contributor'}
            </h2>
            <p className="text-xs text-zinc-500 font-mono">
              {profile?.email || user?.email} · {country}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="px-3.5 py-2 rounded-xl bg-zinc-50 border border-black/[0.06]">
            <span className="text-zinc-400 block text-[10px]">Quality Score</span>
            <span className="text-zinc-950 font-semibold tabular-nums">
              {(profile?.qualityScore ?? 100).toFixed(1)}%
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-zinc-50 border border-black/[0.06]">
            <span className="text-zinc-400 block text-[10px]">Consent Status</span>
            <span className="text-emerald-700 font-semibold">
              {consentSigned ? 'SIGNED' : 'PENDING'}
            </span>
          </div>
        </div>
      </div>

      {saveMessage && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Country & Dialect Card */}
          <div className="p-6 rounded-2xl bg-white border border-black/[0.06] space-y-4">
            <h3 className="text-sm font-semibold text-zinc-950 flex items-center gap-2">
              <Globe className="w-4 h-4 text-zinc-700" />
              <span>Country &amp; Regional Accents</span>
            </h3>

            <div>
              <label htmlFor="country-select" className="block text-xs font-medium text-zinc-700 mb-1.5">
                Country of Residence / Origin
              </label>
              <select
                id="country-select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 focus:bg-white focus:outline-hidden focus:border-zinc-950"
              >
                {AFRICAN_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="accents-input" className="block text-xs font-medium text-zinc-700 mb-1.5">
                Accents &amp; Dialects Spoken (comma-separated)
              </label>
              <input
                id="accents-input"
                type="text"
                value={accentsText}
                onChange={(e) => setAccentsText(e.target.value)}
                placeholder="e.g. Lagos Urban Yoruba, Standard Nigerian English, Ibadan Dialect"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 focus:bg-white focus:outline-hidden focus:border-zinc-950"
              />
            </div>

            <div>
              <label htmlFor="skills-input" className="block text-xs font-medium text-zinc-700 mb-1.5">
                Skills &amp; Areas of Expertise (comma-separated)
              </label>
              <input
                id="skills-input"
                type="text"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                placeholder="e.g. Tonal Diacritics, ASR Transcription, Cultural Context Auditing"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 focus:bg-white focus:outline-hidden focus:border-zinc-950"
              />
            </div>
          </div>

          {/* Languages Spoken */}
          <div className="p-6 rounded-2xl bg-white border border-black/[0.06] space-y-4">
            <h3 className="text-sm font-semibold text-zinc-950 flex items-center gap-2">
              <Languages className="w-4 h-4 text-zinc-700" />
              <span>Languages Spoken</span>
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {languagesSpoken.map((item) => (
                <div
                  key={item.language}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-50 border border-black/[0.05] text-xs"
                >
                  <div>
                    <span className="font-medium text-zinc-950">{item.language}</span>
                    <span className="text-zinc-400 mx-1.5">·</span>
                    <span className="font-mono text-zinc-600">{item.proficiency}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLanguage(item.language)}
                    aria-label={`Remove ${item.language}`}
                    className="p-1 text-zinc-400 hover:text-rose-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-black/[0.05] grid grid-cols-1 sm:grid-cols-3 gap-2">
              <select
                value={newLang}
                onChange={(e) => setNewLang(e.target.value)}
                aria-label="Select African language to add"
                className="px-2.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950"
              >
                {AFRICAN_LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <select
                value={newProficiency}
                onChange={(e) =>
                  setNewProficiency(e.target.value as LanguageProficiency['proficiency'])
                }
                aria-label="Select language proficiency"
                className="px-2.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950"
              >
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Conversational">Conversational</option>
              </select>
              <button
                type="button"
                onClick={handleAddLanguage}
                className="px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Preferred Task Categories */}
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] space-y-4">
          <h3 className="text-sm font-semibold text-zinc-950">
            Preferred AI Training Task Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            {AFRICAN_TRAINING_CATEGORIES.map((cat) => {
              const selected = preferredCategories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`p-3 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                    selected
                      ? 'bg-zinc-950 text-white border-zinc-950'
                      : 'bg-zinc-50 text-zinc-700 border-black/[0.06] hover:border-zinc-400'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Previous Task Experience + Data Privacy Consent */}
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] space-y-4">
          <div>
            <label
              htmlFor="prev-experience"
              className="block text-xs font-medium text-zinc-700 mb-1.5"
            >
              Previous AI Training / Annotation Experience
            </label>
            <textarea
              id="prev-experience"
              rows={3}
              value={previousExperience}
              onChange={(e) => setPreviousExperience(e.target.value)}
              placeholder="Describe prior linguistics, speech recording, dataset annotation, or model evaluation experience..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 focus:bg-white focus:outline-hidden focus:border-zinc-950 leading-relaxed"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#FBFBFA] border border-black/[0.06] flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-zinc-950">
                African Data Ownership, Voice &amp; Image Privacy Consent
              </p>
              <p className="text-zinc-600 leading-relaxed">
                Your contributed voice clips, images, language texts, and profile metadata are stripped of personal identifiers before client export and never licensed for biometric impersonation.
              </p>
              <label className="flex items-center gap-2 text-zinc-900 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentSigned}
                  onChange={(e) => setConsentSigned(e.target.checked)}
                  className="accent-zinc-950 cursor-pointer"
                />
                <span>I consent to Bever&apos;s Privacy &amp; Ethical AI Data Policy</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving Identity...' : 'Save African Contributor Profile'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
