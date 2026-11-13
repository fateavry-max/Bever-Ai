'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'enterprise',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PublicLayout>
      <div className="py-20 sm:py-28 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest mb-3">
              <span>Direct Channels</span>
              <span className="text-zinc-300">/</span>
              <span>Global Support</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#09090B] tracking-tight mb-4">
              Contact Bever
            </h1>
            <p className="text-base text-zinc-600 leading-relaxed">
              Have questions about enterprise data pilots, contributor qualification, or platform partnerships? We’re here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact details */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
                <Mail className="w-5 h-5 text-zinc-700 mb-3" />
                <h4 className="text-xs font-semibold text-[#09090B] mb-1">Direct Inquiries</h4>
                <p className="text-xs text-zinc-500 font-mono">contact@bever.ai</p>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">enterprise@bever.ai</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
                <Building2 className="w-5 h-5 text-zinc-700 mb-3" />
                <h4 className="text-xs font-semibold text-[#09090B] mb-1">Enterprise Headquarters</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  BEVER AI Technologies Inc.<br />
                  555 Mission Street, Suite 2100<br />
                  San Francisco, CA 94105
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
                <MessageSquare className="w-5 h-5 text-zinc-700 mb-3" />
                <h4 className="text-xs font-semibold text-[#09090B] mb-1">Contributor Support</h4>
                <p className="text-xs text-zinc-500 mb-3">
                  For active task support or payment inquiries:
                </p>
                <Link
                  href="/login"
                  className="text-xs font-medium text-[#09090B] hover:underline flex items-center gap-1"
                >
                  <span>Open Contributor Support</span>
                  <ArrowRight className="w-3 h-3 text-zinc-500" />
                </Link>
              </div>
            </div>

            {/* Contact form */}
            <div className="md:col-span-2 p-8 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#09090B] mb-2">Message Dispatched</h3>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto mb-6">
                    Thank you for reaching out. A Bever solutions representative will respond to {formData.email || 'your email'} within one business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-xs font-medium text-[#09090B]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#09090B] mb-4">Send an Inquiry</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-700 mb-1.5">Your Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-black/[0.08] text-xs text-[#09090B] placeholder-zinc-400 focus:outline-hidden focus:border-zinc-900 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-700 mb-1.5">Business / Work Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. elena@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-black/[0.08] text-xs text-[#09090B] placeholder-zinc-400 focus:outline-hidden focus:border-zinc-900 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-type" className="block text-xs font-medium text-zinc-700 mb-1.5">Inquiry Type</label>
                    <select
                      id="contact-type"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-black/[0.08] text-xs text-[#09090B] focus:outline-hidden focus:border-zinc-900 focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="enterprise">Enterprise Model Alignment & RLHF Datasets</option>
                      <option value="contributor">Contributor Qualification & Assessment Inquiry</option>
                      <option value="career">Core Engineering / Research Careers</option>
                      <option value="security">Security & Compliance Audit Review</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-700 mb-1.5">Message / Project Scope</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your requirements, modality (text, code, math), target SLA, or inquiry..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-black/[0.08] text-xs text-[#09090B] placeholder-zinc-400 focus:outline-hidden focus:border-zinc-900 focus:bg-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#09090B] hover:bg-zinc-800 text-white font-medium text-xs rounded-full shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
