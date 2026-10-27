import React, { useState } from 'react';
import { ScreenId } from '../types';

interface GuideConsumerProps {
  onNavigate: (screen: ScreenId) => void;
}

export const GuideConsumer: React.FC<GuideConsumerProps> = ({ onNavigate }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem('legalsaathi_consumer_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const checklistDefs = [
    {
      id: 'invoice',
      title: 'Tax Invoice or Cash Memo',
      desc: 'Digital GST invoice, marketplace receipt (Amazon/Flipkart), or physical bill with seller details.'
    },
    {
      id: 'warranty',
      title: 'Warranty / Guarantee Card',
      desc: 'Manufacturer warranty card, terms booklet, or policy screenshot displaying refund timeline.'
    },
    {
      id: 'photos',
      title: 'Defect Photos or Unboxing Video',
      desc: 'Timestamped high-resolution photos of damaged parts, broken seal, or video proof of non-functioning product.'
    },
    {
      id: 'trail',
      title: 'Written Communication Trail',
      desc: 'Screenshots of customer support chats, email exchanges, and brand’s refusal or non-response within deadline.'
    }
  ];

  const total = checklistDefs.length;
  const count = checklistDefs.filter((i) => checkedItems[i.id]).length;

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('legalsaathi_consumer_checklist', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-x-auto py-1 text-[#44474e] text-xs font-semibold">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 hover:text-[#002046] transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-[15px]">home</span>
          <span>Home</span>
        </button>
        <span className="material-symbols-outlined text-[13px] opacity-40 shrink-0">chevron_right</span>
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-[#002046] transition-colors shrink-0"
        >
          Browse Topics
        </button>
        <span className="material-symbols-outlined text-[13px] opacity-40 shrink-0">chevron_right</span>
        <span className="text-[#002046] font-semibold truncate max-w-[130px] shrink-0">Consumer Rights</span>
      </nav>

      {/* Topic Meta Hero Card */}
      <div className="bg-[#ffffff] p-4 rounded-xl shadow-sm space-y-3 relative overflow-hidden border border-[#e1e8f9]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eff3ff] text-[#002046] text-xs font-bold">
            <span className="material-symbols-outlined text-[14px]">gavel</span>
            CPA 2019 Statute
          </span>
          <div className="flex items-center gap-1.5 text-[#00696d] text-xs font-bold">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Verified Guidance</span>
          </div>
        </div>

        <div>
          <h2 className="text-[22px] md:text-[26px] font-bold text-[#002046] tracking-tight leading-snug">
            Consumer Rights & Faulty Services
          </h2>
          <div className="flex items-center gap-3 mt-1.5 text-[#44474e] text-[11px] font-medium">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              3 min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">update</span>
              Updated Oct 2024
            </span>
          </div>
        </div>

        <p className="text-[#141c28] text-xs md:text-sm leading-relaxed">
          A plain-language guide for everyday citizens navigating defective devices, refused e-commerce refunds, unjustified cancellation charges, and misleading advertisements in India.
        </p>

        {/* Quick action row */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            className="min-h-[44px] px-3 py-2 rounded-lg bg-[#5b2700] text-[#ffdbc9] flex items-center justify-center gap-2 text-xs font-bold active:scale-95 transition-transform shadow-sm"
            href="tel:1915"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Call NCH: 1915</span>
          </a>
          <button
            onClick={() => {
              document.getElementById('checklist-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="min-h-[44px] px-3 py-2 rounded-lg bg-[#eff3ff] text-[#002046] flex items-center justify-center gap-2 text-xs font-bold active:scale-95 transition-transform border border-[#dbe3f3]"
          >
            <span className="material-symbols-outlined text-[18px]">checklist</span>
            <span>Evidence Kit</span>
          </button>
        </div>
      </div>

      {/* Section 1: What Does This Mean? */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm space-y-3 border border-[#e1e8f9]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#94f2f7] flex items-center justify-center text-[#007074]">
            <span className="material-symbols-outlined text-[18px]">shield</span>
          </div>
          <h3 className="text-[18px] font-bold text-[#002046]">What does this mean?</h3>
        </div>
        <p className="text-[#141c28] text-xs leading-relaxed">
          Under the <span className="font-bold text-[#002046]">Consumer Protection Act, 2019</span>, you are legally protected against unfair trade practices and hazardous goods. You possess 6 sovereign consumer rights:
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="p-2.5 rounded-lg bg-[#eff3ff] flex flex-col gap-1 border border-[#e1e8f9]/70">
            <div className="flex items-center gap-1.5 text-[#00696d]">
              <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
              <span className="text-xs font-bold">1. Safety</span>
            </div>
            <p className="text-[#44474e] text-[11px] leading-tight">Protection from hazardous products & services.</p>
          </div>

          <div className="p-2.5 rounded-lg bg-[#eff3ff] flex flex-col gap-1 border border-[#e1e8f9]/70">
            <div className="flex items-center gap-1.5 text-[#00696d]">
              <span className="material-symbols-outlined text-[18px]">info</span>
              <span className="text-xs font-bold">2. Information</span>
            </div>
            <p className="text-[#44474e] text-[11px] leading-tight">Accurate details on purity, price & ingredients.</p>
          </div>

          <div className="p-2.5 rounded-lg bg-[#eff3ff] flex flex-col gap-1 border border-[#e1e8f9]/70">
            <div className="flex items-center gap-1.5 text-[#00696d]">
              <span className="material-symbols-outlined text-[18px]">interests</span>
              <span className="text-xs font-bold">3. Choice</span>
            </div>
            <p className="text-[#44474e] text-[11px] leading-tight">Assured access to competitive variety & pricing.</p>
          </div>

          <div className="p-2.5 rounded-lg bg-[#eff3ff] flex flex-col gap-1 border border-[#e1e8f9]/70">
            <div className="flex items-center gap-1.5 text-[#00696d]">
              <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
              <span className="text-xs font-bold">4. Heard</span>
            </div>
            <p className="text-[#44474e] text-[11px] leading-tight">Guaranteed voice in forums & dispute cells.</p>
          </div>

          <div className="p-2.5 rounded-lg bg-[#eff3ff] flex flex-col gap-1 border border-[#e1e8f9]/70">
            <div className="flex items-center gap-1.5 text-[#00696d]">
              <span className="material-symbols-outlined text-[18px]">handshake</span>
              <span className="text-xs font-bold">5. Redressal</span>
            </div>
            <p className="text-[#44474e] text-[11px] leading-tight">Right to compensation, repairs, or full refund.</p>
          </div>

          <div className="p-2.5 rounded-lg bg-[#eff3ff] flex flex-col gap-1 border border-[#e1e8f9]/70">
            <div className="flex items-center gap-1.5 text-[#00696d]">
              <span className="material-symbols-outlined text-[18px]">school</span>
              <span className="text-xs font-bold">6. Education</span>
            </div>
            <p className="text-[#44474e] text-[11px] leading-tight">Lifelong access to awareness & civic knowledge.</p>
          </div>
        </div>
      </section>

      {/* Section 2: Action Hierarchy */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm space-y-4 border border-[#e1e8f9]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#002046] text-[#ffffff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">alt_route</span>
            </div>
            <h3 className="text-[18px] font-bold text-[#002046]">Action Hierarchy</h3>
          </div>
          <span className="text-[#44474e] text-[11px] font-bold">4 Guided Steps</span>
        </div>

        <div className="space-y-3">
          {/* Step 1 */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#eff3ff]">
            <div className="w-7 h-7 shrink-0 rounded-full bg-[#1b365d] text-[#ffffff] flex items-center justify-center text-xs font-bold mt-0.5 shadow-sm">
              1
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <h4 className="text-sm font-bold text-[#002046]">Direct Written Notice</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e6eeff] text-[#44474e] font-semibold">
                  Step 1
                </span>
              </div>
              <p className="text-[#141c28] text-xs leading-relaxed">
                Send an email directly to the seller or brand’s grievance officer. Clearly cite the defective order ID, describe the deficiency, and demand resolution within 7-14 days.
              </p>
              <div className="pt-1 flex items-center gap-1 text-[#44474e] text-[11px]">
                <span className="material-symbols-outlined text-[15px] text-[#00696d]">lightbulb</span>
                <span>Always preserve automated ticket numbers & timestamps.</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#eff3ff]">
            <div className="w-7 h-7 shrink-0 rounded-full bg-[#00696d] text-[#ffffff] flex items-center justify-center text-xs font-bold mt-0.5 shadow-sm">
              2
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <h4 className="text-sm font-bold text-[#002046]">National Consumer Helpline</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#94f2f7] text-[#002021] font-bold">
                  Pre-Litigation
                </span>
              </div>
              <p className="text-[#141c28] text-xs leading-relaxed">
                Dial toll-free <strong className="text-[#002046]">1915</strong> or submit via web portal. NCH facilitates direct mediation with registered corporate convergence partners without court proceedings.
              </p>
              <div className="pt-1">
                <a
                  className="inline-flex items-center gap-1 text-[#00696d] text-xs font-bold hover:underline"
                  href="https://consumerhelpline.gov.in"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>consumerhelpline.gov.in</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#eff3ff]">
            <div className="w-7 h-7 shrink-0 rounded-full bg-[#1b365d] text-[#ffffff] flex items-center justify-center text-xs font-bold mt-0.5 shadow-sm">
              3
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <h4 className="text-sm font-bold text-[#002046]">e-Daakhil Online Filing</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e6eeff] text-[#44474e] font-semibold">
                  Govt Portal
                </span>
              </div>
              <p className="text-[#141c28] text-xs leading-relaxed">
                File an official petition from your phone through the official e-Daakhil portal. <strong className="text-[#002046]">No advocate is required</strong> for claims under ₹5 Lakhs, and nominal digital fees apply.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#eff3ff]">
            <div className="w-7 h-7 shrink-0 rounded-full bg-[#dbe3f3] text-[#141c28] flex items-center justify-center text-xs font-bold mt-0.5">
              4
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <h4 className="text-sm font-bold text-[#002046]">District Commission Hearing</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e6eeff] text-[#44474e] font-semibold">
                  Statutory Forum
                </span>
              </div>
              <p className="text-[#141c28] text-xs leading-relaxed">
                If informal mediation stalls, the District Commission adjudicates binding financial compensations, order refunds, punitive damages, and legal costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Evidence Checklist */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm space-y-3 border border-[#e1e8f9]" id="checklist-section">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#94f2f7] text-[#007074] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            </div>
            <h3 className="text-[18px] font-bold text-[#002046]">Evidence Checklist</h3>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#94f2f7] text-[#002021]">
            {count}/{total} Ready
          </span>
        </div>

        <p className="text-[#44474e] text-xs leading-relaxed">
          Gather these four essential proof pieces before registering any grievance on NCH or e-Daakhil:
        </p>

        <div className="space-y-2 pt-1">
          {checklistDefs.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <label
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors border select-none ${
                  isChecked
                    ? 'bg-[#94f2f7]/25 border-[#00696d]/40'
                    : 'bg-[#eff3ff] border-transparent hover:border-[#dbe3f3]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-1 w-5 h-5 rounded text-[#00696d] accent-[#00696d] cursor-pointer shrink-0"
                />
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-[#002046] block">{item.title}</span>
                  <span className="text-xs text-[#44474e] block leading-relaxed">{item.desc}</span>
                </div>
              </label>
            );
          })}
        </div>

        {count === total && (
          <div className="p-3 rounded-lg bg-[#94f2f7] text-[#002021] flex items-center gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-[20px] text-[#00696d]">task_alt</span>
            <span className="text-xs font-bold">
              All evidence collected! You are ready to submit on e-Daakhil.
            </span>
          </div>
        )}
      </section>

      {/* Section 4: Official Channels */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm space-y-3 border border-[#e1e8f9]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1b365d] text-[#ffffff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">account_balance</span>
          </div>
          <h3 className="text-[18px] font-bold text-[#002046]">Official Channels</h3>
        </div>

        {/* NCH Card */}
        <div className="p-3.5 rounded-lg bg-[#eff3ff] space-y-2 border border-[#e1e8f9]/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00696d] text-[22px]">phone_in_talk</span>
              <span className="text-sm font-bold text-[#002046]">National Consumer Helpline</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#94f2f7] text-[#002021]">
              MoCA, GoI
            </span>
          </div>
          <p className="text-xs text-[#141c28] leading-relaxed">
            Toll-free portal operating between 8:00 AM and 8:00 PM (Except National Holidays). Offers 12+ Indian regional languages.
          </p>
          <div className="flex gap-2 pt-1">
            <a
              className="flex-1 min-h-[44px] py-2 px-3 rounded-lg bg-[#002046] text-[#ffffff] flex items-center justify-center gap-2 text-xs font-bold active:scale-95 transition-transform shadow-sm"
              href="tel:1915"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>Call 1915</span>
            </a>
            <a
              className="min-h-[44px] px-3.5 py-2 rounded-lg bg-[#ffffff] text-[#002046] flex items-center justify-center gap-1 text-xs font-bold active:scale-95 transition-transform border border-[#dbe3f3]"
              href="https://consumerhelpline.gov.in"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              <span>Portal</span>
            </a>
          </div>
        </div>

        {/* e-Daakhil Portal */}
        <div className="p-3.5 rounded-lg bg-[#eff3ff] space-y-2 border border-[#e1e8f9]/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#002046] text-[22px]">devices</span>
              <span className="text-sm font-bold text-[#002046]">e-Daakhil Portal</span>
            </div>
            <span className="text-[10px] text-[#44474e] font-bold">NIC Hosted</span>
          </div>
          <p className="text-xs text-[#141c28] leading-relaxed">
            File statutory cases to District, State, and National Consumer Commissions without physical court visits.
          </p>
          <a
            className="min-h-[44px] w-full py-2 px-3 rounded-lg bg-[#ffffff] text-[#002046] flex items-center justify-between text-xs font-bold active:scale-95 transition-transform border border-[#dbe3f3]"
            href="https://edaakhil.nic.in"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#00696d]">link</span>
              <span>Visit edaakhil.nic.in</span>
            </span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

        {/* NCDRC */}
        <div className="p-3.5 rounded-lg bg-[#eff3ff] space-y-2 border border-[#e1e8f9]/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#002046] text-[22px]">balance</span>
              <span className="text-sm font-bold text-[#002046]">NCDRC Apex Forum</span>
            </div>
            <span className="text-[10px] text-[#44474e] font-bold">Claims &gt; ₹2 Cr</span>
          </div>
          <p className="text-xs text-[#141c28] leading-relaxed">
            For high-value disputes, builder delays, and statutory appeals against state orders.
          </p>
          <a
            className="min-h-[44px] w-full py-2 px-3 rounded-lg bg-[#ffffff] text-[#002046] flex items-center justify-between text-xs font-bold active:scale-95 transition-transform border border-[#dbe3f3]"
            href="http://ncdrc.nic.in"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#00696d]">travel_explore</span>
              <span>Access ncdrc.nic.in</span>
            </span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </section>

      {/* Section 5: Key Distinction Note */}
      <div className="p-4 rounded-xl bg-[#e1e8f9] text-[#141c28] space-y-2 border border-[#dbe3f3]">
        <div className="flex items-center gap-2 text-[#002046]">
          <span className="material-symbols-outlined text-[20px] text-[#00696d]">info</span>
          <h4 className="text-xs font-bold uppercase tracking-wider">Important Civic Distinction</h4>
        </div>
        <p className="text-xs leading-relaxed text-[#44474e]">
          LegalSaathi empowers you with statutory rights awareness and procedural guidance. LegalSaathi is not a government portal. All legally enforceable complaints must be filed on the official government systems (<strong className="text-[#002046]">1915 NCH</strong> or <strong className="text-[#002046]">e-Daakhil</strong>).
        </p>
      </div>

      {/* Section 6: Frequently Asked Questions (Accordion) */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm space-y-3 border border-[#e1e8f9]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#eff3ff] text-[#002046] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">quiz</span>
          </div>
          <h3 className="text-[18px] font-bold text-[#002046]">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-2">
          {/* FAQ 1 */}
          <div className="rounded-lg bg-[#eff3ff] overflow-hidden transition-all border border-[#e1e8f9]/70">
            <button
              className="min-h-[44px] w-full px-3.5 py-3 flex items-center justify-between text-left gap-2 text-[#002046] text-xs font-bold"
              onClick={() => toggleFaq('faq-1')}
            >
              <span>Can I file without a licensed lawyer?</span>
              <span
                className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                  expandedFaq === 'faq-1' ? 'rotate-180 text-[#00696d]' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {expandedFaq === 'faq-1' && (
              <div className="px-3.5 pb-3 pt-0 text-[#44474e] text-xs leading-relaxed">
                Yes. Under the Consumer Protection Act 2019, any complainant can represent themselves in person or through an authorized representative before the District Commission.
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="rounded-lg bg-[#eff3ff] overflow-hidden transition-all border border-[#e1e8f9]/70">
            <button
              className="min-h-[44px] w-full px-3.5 py-3 flex items-center justify-between text-left gap-2 text-[#002046] text-xs font-bold"
              onClick={() => toggleFaq('faq-2')}
            >
              <span>What is the time limit for filing a claim?</span>
              <span
                className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                  expandedFaq === 'faq-2' ? 'rotate-180 text-[#00696d]' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {expandedFaq === 'faq-2' && (
              <div className="px-3.5 pb-3 pt-0 text-[#44474e] text-xs leading-relaxed">
                A complaint must be filed within <strong className="text-[#002046]">2 years</strong> from the date on which the cause of action (defect, denial of refund, or deficient service) arose.
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="rounded-lg bg-[#eff3ff] overflow-hidden transition-all border border-[#e1e8f9]/70">
            <button
              className="min-h-[44px] w-full px-3.5 py-3 flex items-center justify-between text-left gap-2 text-[#002046] text-xs font-bold"
              onClick={() => toggleFaq('faq-3')}
            >
              <span>Are e-commerce platforms like Amazon/Flipkart covered?</span>
              <span
                className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                  expandedFaq === 'faq-3' ? 'rotate-180 text-[#00696d]' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {expandedFaq === 'faq-3' && (
              <div className="px-3.5 pb-3 pt-0 text-[#44474e] text-xs leading-relaxed">
                Yes. The Consumer Protection (E-Commerce) Rules 2020 hold digital platforms accountable for counterfeit items, delayed refunds, and dark patterns in billing.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Legal Guides */}
      <section className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-[#002046]">Related Legal Guides</h3>
          <button
            onClick={() => onNavigate('home')}
            className="text-[#00696d] text-xs font-bold hover:underline"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onNavigate('guide-cyber')}
            className="p-3.5 rounded-xl bg-[#ffffff] shadow-sm flex flex-col justify-between gap-3 active:scale-95 transition-transform text-left border border-[#e1e8f9]"
          >
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-[#94f2f7] text-[#002021] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">credit_card_off</span>
              </div>
              <h4 className="text-xs font-bold text-[#002046] leading-tight">Banking & UPI Frauds</h4>
            </div>
            <div className="flex items-center gap-1 text-[#00696d] text-xs font-bold">
              <span>Explore</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('fir')}
            className="p-3.5 rounded-xl bg-[#ffffff] shadow-sm flex flex-col justify-between gap-3 active:scale-95 transition-transform text-left border border-[#e1e8f9]"
          >
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-[#eff3ff] text-[#002046] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">apartment</span>
              </div>
              <h4 className="text-xs font-bold text-[#002046] leading-tight">Tenant Rights & Rent Act</h4>
            </div>
            <div className="flex items-center gap-1 text-[#00696d] text-xs font-bold">
              <span>Explore</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
