import React, { useState } from 'react';
import { ScreenId } from '../types';

interface GuideCybercrimeProps {
  onNavigate: (screen: ScreenId) => void;
}

export const GuideCybercrime: React.FC<GuideCybercrimeProps> = ({ onNavigate }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem('legalsaathi_cyber_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const checklistDefs = [
    {
      id: 'utr',
      title: 'Bank Statement & 12-digit UTR',
      desc: 'Clear screenshot of debit notification SMS showing timestamp and reference ID.'
    },
    {
      id: 'phone',
      title: 'Fraudster Phone / UPI Handle / URL',
      desc: 'The recipient virtual payment address (VPA), sender ID, or fake landing page link.'
    },
    {
      id: 'chat',
      title: 'Chat & Phishing Screenshots',
      desc: 'Full WhatsApp/Telegram discussion logs, fraudulent APK files, or payment request modals.'
    },
    {
      id: 'ref',
      title: 'Bank Dispute Reference Number',
      desc: 'Official CRM complaint ticket acknowledgment provided by your primary bank branch.'
    }
  ];

  const total = checklistDefs.length;
  const count = checklistDefs.filter((i) => checkedItems[i.id]).length;
  const progressPct = Math.round((count / total) * 100);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('legalsaathi_cyber_checklist', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="py-1 flex items-center gap-1.5 overflow-x-auto text-[#44474e] text-xs">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-[#002046] transition-colors flex items-center gap-1 shrink-0"
        >
          <span className="material-symbols-outlined text-[14px]">home</span>
          <span>Home</span>
        </button>
        <span className="material-symbols-outlined text-[12px] opacity-40 shrink-0">chevron_right</span>
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-[#002046] transition-colors shrink-0"
        >
          Browse Topics
        </button>
        <span className="material-symbols-outlined text-[12px] opacity-40 shrink-0">chevron_right</span>
        <span className="text-[#002046] font-semibold shrink-0">Online Fraud & Cybercrime</span>
      </nav>

      {/* Hero Header Meta Card */}
      <header className="rounded-xl bg-[#ffffff] p-4 shadow-sm flex flex-col gap-2.5 relative overflow-hidden border border-[#e1e8f9]">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#94f2f7] text-[#002021] text-xs font-bold">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              security
            </span>
            Financial Cyber Safety
          </span>
          <div className="flex items-center gap-1.5 text-[#44474e] text-[11px] font-medium">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span>4 min read</span>
          </div>
        </div>

        <h2 className="text-[22px] md:text-[26px] font-bold text-[#002046] tracking-tight leading-snug">
          Online Fraud & Financial Cybercrime
        </h2>

        <div className="flex items-center gap-1.5 text-[#44474e] text-xs pt-1">
          <span className="material-symbols-outlined text-[16px] text-[#00696d]">verified_user</span>
          <span>Updated: March 2025 • Aligned with BNS & Information Technology Act</span>
        </div>
      </header>

      {/* Golden Hour Emergency Alert Box */}
      <div className="rounded-xl bg-[#ffdbc9] text-[#321200] p-4 shadow-sm relative overflow-hidden border border-[#ffb68c]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#f67d27] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm animate-pulse">
            <span className="material-symbols-outlined text-[24px]">timer</span>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <span className="text-xs uppercase tracking-wider text-[#321200] font-bold">
                Crucial • The Golden Hour
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#321200] text-[#ffdbc9] text-[11px] font-bold">
                2 - 3 Hrs
              </span>
            </div>
            <p className="text-xs text-[#321200] leading-snug">
              Reporting financial fraud within <strong>2 to 3 hours</strong> gives banks the legal mandate to freeze stolen funds before the fraudster cashes out.
            </p>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <a
                className="min-h-[44px] px-3.5 rounded-lg bg-[#3a1600] text-[#ffffff] flex items-center justify-center gap-2 text-xs font-bold shadow-sm active:scale-95 transition-transform"
                href="tel:1930"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Dial 1930 Now</span>
              </a>
              <a
                className="min-h-[44px] px-3.5 rounded-lg bg-[#ffffff] text-[#3a1600] flex items-center justify-center gap-1.5 text-xs font-bold active:scale-95 transition-transform border border-[#dbe3f3]"
                href="https://cybercrime.gov.in"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>cybercrime.gov.in</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Plain Language Meaning */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-6 rounded-full bg-[#00696d]"></span>
          <h3 className="text-[18px] font-bold text-[#002046]">What does this mean?</h3>
        </div>
        <div className="rounded-xl bg-[#ffffff] p-4 shadow-sm flex flex-col gap-3 border border-[#e1e8f9]">
          <p className="text-sm text-[#141c28] leading-relaxed">
            You do not need legal jargon to understand that taking your money deceitfully is a serious, cognizable offense under the <strong className="text-[#002046]">Information Technology Act</strong> and the <strong className="text-[#002046]">Bharatiya Nyaya Sanhita (BNS)</strong>.
          </p>
          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {/* Explainer 1 */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#eff3ff]">
              <div className="w-8 h-8 rounded-full bg-[#94f2f7] text-[#002021] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">send_money</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#002046]">Unauthorized UPI / QR Scams</span>
                <span className="text-xs text-[#44474e] mt-0.5 leading-relaxed">Scanning a QR code never deposits money into your bank—it exclusively debits funds from your account.</span>
              </div>
            </div>
            {/* Explainer 2 */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#eff3ff]">
              <div className="w-8 h-8 rounded-full bg-[#94f2f7] text-[#002021] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">contact_phone</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#002046]">Spoofed Support Numbers</span>
                <span className="text-xs text-[#44474e] mt-0.5 leading-relaxed">Fraudulent customer care numbers listed on search engines tricking users into downloading screen-mirroring apps.</span>
              </div>
            </div>
            {/* Explainer 3 */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#eff3ff]">
              <div className="w-8 h-8 rounded-full bg-[#94f2f7] text-[#002021] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">trending_up</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#002046]">Investment & Part-time Scams</span>
                <span className="text-xs text-[#44474e] mt-0.5 leading-relaxed">Telegram and WhatsApp group traps promising high returns on crypto or daily e-commerce tasks.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Step-by-Step Guidance */}
      <section className="flex flex-col gap-2 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-[#002046]"></span>
            <h3 className="text-[18px] font-bold text-[#002046]">What can you do?</h3>
          </div>
          <span className="text-[11px] text-[#00696d] font-bold uppercase tracking-wider">
            Procedural Action
          </span>
        </div>

        {/* Stepper Container */}
        <div className="rounded-xl bg-[#ffffff] p-4 shadow-sm flex flex-col gap-4 border border-[#e1e8f9]">
          {/* Step 1 */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#1b365d] text-[#ffffff] flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                1
              </div>
              <div className="w-0.5 h-16 bg-[#dbe3f3] mt-1"></div>
            </div>
            <div className="flex-1 flex flex-col pb-2">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="text-sm font-bold text-[#002046]">Contact Bank / Payment Provider</span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
                  Immediate
                </span>
              </div>
              <p className="text-xs text-[#44474e] mt-1 leading-relaxed">
                Request an immediate block on UPI and debit cards. Demand a formal <strong>Dispute Reference Number</strong> and 12-digit transaction UTR.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#00696d] text-[#ffffff] flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                2
              </div>
              <div className="w-0.5 h-16 bg-[#dbe3f3] mt-1"></div>
            </div>
            <div className="flex-1 flex flex-col pb-2">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="text-sm font-bold text-[#002046]">Call Helpline 1930</span>
                <span className="px-2 py-0.5 rounded-full bg-[#94f2f7] text-[#002021] text-[10px] font-bold">
                  National
                </span>
              </div>
              <p className="text-xs text-[#44474e] mt-1 leading-relaxed">
                Keep transaction SMS handy. The operator initiates a real-time auto-freeze notification across beneficiary banking gateways.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#002046] text-[#ffffff] flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                3
              </div>
              <div className="w-0.5 h-16 bg-[#dbe3f3] mt-1"></div>
            </div>
            <div className="flex-1 flex flex-col pb-2">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="text-sm font-bold text-[#002046]">File Formal Portal Complaint</span>
                <span className="px-2 py-0.5 rounded-full bg-[#e1e8f9] text-[#44474e] text-[10px] font-bold">
                  &lt; 24 Hours
                </span>
              </div>
              <p className="text-xs text-[#44474e] mt-1 leading-relaxed">
                Log on to <strong>cybercrime.gov.in</strong> under ‘Report Cyber Crime &gt; Financial Fraud’. Download the acknowledgment receipt (Acknowledgement Number).
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e1e8f9] text-[#141c28] flex items-center justify-center text-xs font-bold shrink-0">
              4
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="text-sm font-bold text-[#002046]">Police Station & Zero-FIR</span>
                <span className="px-2 py-0.5 rounded-full bg-[#e1e8f9] text-[#44474e] text-[10px] font-bold">
                  Legal Stage
                </span>
              </div>
              <p className="text-xs text-[#44474e] mt-1 leading-relaxed">
                If total financial loss exceeds your state’s cyber threshold, visit the Cyber Cell. Officers are mandated to register a Zero-FIR regardless of territorial jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Evidence Checklist */}
      <section className="flex flex-col gap-2 pt-2" id="checklist-section">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-[#00696d]"></span>
            <h3 className="text-[18px] font-bold text-[#002046]">Information You Need</h3>
          </div>
          <span className="text-xs font-bold text-[#00696d]" id="evidence-count">
            {count} of {total} gathered
          </span>
        </div>

        {/* Progress indicator bar */}
        <div className="w-full h-2 rounded-full bg-[#dbe3f3] overflow-hidden">
          <div
            className="h-full bg-[#00696d] transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>

        <div className="rounded-xl bg-[#ffffff] p-4 shadow-sm flex flex-col gap-2.5 border border-[#e1e8f9]">
          <p className="text-xs text-[#44474e] leading-relaxed">
            Tap to verify you have preserved these critical artifacts before lodging formal complaints:
          </p>

          {/* Checklist items */}
          {checklistDefs.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <label
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer select-none transition-colors border ${
                  isChecked
                    ? 'bg-[#94f2f7]/25 border-[#00696d]/40'
                    : 'bg-[#eff3ff] border-transparent hover:border-[#dbe3f3]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-0.5 w-5 h-5 rounded text-[#00696d] accent-[#00696d] focus:ring-0 cursor-pointer shrink-0"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-[#141c28] font-bold">{item.title}</span>
                  <span className="text-xs text-[#44474e] mt-0.5 leading-relaxed">{item.desc}</span>
                </div>
              </label>
            );
          })}

          {count === total && (
            <div className="p-3 rounded-lg bg-[#94f2f7] text-[#002021] flex items-center gap-2 mt-1 animate-in fade-in">
              <span className="material-symbols-outlined text-[20px] text-[#00696d]">task_alt</span>
              <span className="text-xs font-bold">
                All evidence ready! Proceed to cybercrime.gov.in or call 1930 to lodge your complaint.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Section 4: Official Help Cards */}
      <section className="flex flex-col gap-2 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-6 rounded-full bg-[#002046]"></span>
          <h3 className="text-[18px] font-bold text-[#002046]">Where to get official help</h3>
        </div>

        <div className="flex flex-col gap-2">
          {/* 1930 Helpline */}
          <div className="rounded-xl bg-[#ffffff] p-3.5 shadow-sm flex items-center justify-between gap-3 border border-[#e1e8f9]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-lg bg-[#94f2f7] text-[#002021] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">shield</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-[#002046] truncate">National Cyber Helpline</span>
                <span className="text-[11px] text-[#44474e]">Toll-free 24x7 Emergency line</span>
              </div>
            </div>
            <a
              className="min-h-[44px] px-3.5 rounded-lg bg-[#002046] text-[#ffffff] flex items-center gap-1.5 text-xs font-bold shrink-0 active:scale-95 transition-transform shadow-sm"
              href="tel:1930"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>1930</span>
            </a>
          </div>

          {/* Cybercrime Portal */}
          <div className="rounded-xl bg-[#ffffff] p-3.5 shadow-sm flex items-center justify-between gap-3 border border-[#e1e8f9]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-lg bg-[#e1e8f9] text-[#002046] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">language</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-bold text-[#002046] truncate">Cybercrime Portal</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#d6e3ff] text-[#001b3d] text-[10px] font-bold uppercase">
                    Govt of India
                  </span>
                </div>
                <span className="text-[11px] text-[#44474e]">cybercrime.gov.in</span>
              </div>
            </div>
            <a
              className="min-h-[44px] px-3.5 rounded-lg bg-[#eff3ff] text-[#002046] flex items-center gap-1 text-xs font-bold shrink-0 active:scale-95 transition-transform border border-[#dbe3f3]"
              href="https://cybercrime.gov.in"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>File</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

          {/* RBI Ombudsman */}
          <div className="rounded-xl bg-[#ffffff] p-3.5 shadow-sm flex items-center justify-between gap-3 border border-[#e1e8f9]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-lg bg-[#e1e8f9] text-[#002046] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">account_balance</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-[#002046] truncate">RBI Ombudsman (CMS)</span>
                <span className="text-[11px] text-[#44474e]">If bank fails resolution in 30 days</span>
              </div>
            </div>
            <a
              className="min-h-[44px] px-3.5 rounded-lg bg-[#eff3ff] text-[#002046] flex items-center gap-1 text-xs font-bold shrink-0 active:scale-95 transition-transform border border-[#dbe3f3]"
              href="https://cms.rbi.org.in"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Escalate</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>
        </div>
      </section>

      {/* Section 5: Safety Warning Box */}
      <div className="rounded-xl bg-[#ffdad6] text-[#93000a] p-4 shadow-sm flex items-start gap-3 border border-[#ffb4ab]">
        <span className="material-symbols-outlined text-[24px] text-[#ba1a1a] shrink-0">gpp_maybe</span>
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-wider">Important Safety Rule</span>
          <p className="text-xs text-[#93000a] mt-0.5 leading-relaxed">
            Never share OTPs, ATM PINs, or install remote access software (AnyDesk, TeamViewer, RustDesk) at the request of anyone claiming to be a police officer or bank fraud investigator. Real authorities never ask for screen access.
          </p>
        </div>
      </div>

      {/* Related Legal Guides */}
      <div className="flex flex-col gap-2 pt-2">
        <span className="text-xs font-bold text-[#44474e] uppercase tracking-wider">
          Related Legal Guides
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigate('guide-consumer')}
            className="px-3.5 py-2 rounded-full bg-[#e1e8f9] text-[#002046] text-xs font-bold flex items-center gap-1 hover:bg-[#dbe3f3] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
            <span>Consumer Rights</span>
          </button>
          <button
            onClick={() => onNavigate('guide-safety')}
            className="px-3.5 py-2 rounded-full bg-[#e1e8f9] text-[#002046] text-xs font-bold flex items-center gap-1 hover:bg-[#dbe3f3] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">chat_error</span>
            <span>Digital Harassment</span>
          </button>
          <button
            onClick={() => onNavigate('aid')}
            className="px-3.5 py-2 rounded-full bg-[#e1e8f9] text-[#002046] text-xs font-bold flex items-center gap-1 hover:bg-[#dbe3f3] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">gavel</span>
            <span>Free Legal Aid</span>
          </button>
        </div>
      </div>

      {/* Disclaimer Footer */}
      <div className="p-3 rounded-lg bg-[#eff3ff] text-[#44474e] text-[11px] text-center leading-relaxed border border-[#e1e8f9]/70">
        LegalSaathi provides public awareness guidelines aligned with statutory frameworks. This content does not substitute professional legal counsel or immediate police intervention in life-critical emergencies.
      </div>
    </div>
  );
};
