import React, { useState } from 'react';
import { ScreenId } from '../types';

interface GuideSafetyProps {
  onNavigate: (screen: ScreenId) => void;
}

export const GuideSafety: React.FC<GuideSafetyProps> = ({ onNavigate }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem('legalsaathi_safety_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const checklistDefs = [
    {
      id: 'digital',
      title: 'Digital Stalking Screenshots & URLs',
      desc: 'Capture full profile handles, message timestamps, caller logs, and unaltered message threads.'
    },
    {
      id: 'incident',
      title: 'Incident Diary with Dates & Times',
      desc: 'Written chronological log of events, locations, verbal exchanges, and names of individuals present.'
    },
    {
      id: 'witness',
      title: 'Colleague or Third-Party Witness Corroboration',
      desc: 'Colleagues or acquaintances who were informed immediately after the occurrence.'
    },
    {
      id: 'prior',
      title: 'Prior Internal Complaints / HR Records',
      desc: 'Preserve email acknowledgments sent to supervisors or the Internal Committee (IC).'
    }
  ];

  const total = checklistDefs.length;
  const count = checklistDefs.filter((i) => checkedItems[i.id]).length;

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('legalsaathi_safety_checklist', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
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
        <span className="text-[#002046] font-semibold truncate max-w-[150px] shrink-0">Harassment & Safety</span>
      </nav>

      {/* Hero Header */}
      <header className="rounded-xl bg-[#ffffff] p-4 shadow-sm flex flex-col gap-2.5 relative overflow-hidden border border-[#e1e8f9]">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbc9] text-[#753400] text-xs font-bold">
            <span className="material-symbols-outlined text-[14px]">shield_person</span>
            Personal Safety & POSH
          </span>
          <div className="flex items-center gap-1.5 text-[#44474e] text-[11px] font-medium">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span>5 min read</span>
          </div>
        </div>

        <h2 className="text-[22px] md:text-[26px] font-bold text-[#002046] tracking-tight leading-snug">
          Harassment, POSH & Personal Safety
        </h2>

        <div className="flex items-center gap-1.5 text-[#44474e] text-xs pt-1">
          <span className="material-symbols-outlined text-[16px] text-[#00696d]">verified_user</span>
          <span>Statutory Protection under POSH Act 2013, DV Act 2005 & BNS</span>
        </div>
      </header>

      {/* Emergency Immediate Shield Box */}
      <div className="rounded-xl bg-[#ffdad6] text-[#93000a] p-4 shadow-sm border border-[#ffb4ab]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ba1a1a] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[22px]">emergency</span>
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <span className="text-xs font-bold uppercase tracking-wider">Immediate Safety Triggers</span>
              <span className="px-2 py-0.5 rounded-full bg-[#ba1a1a] text-[#ffffff] text-[10px] font-bold">
                24x7 Active
              </span>
            </div>
            <p className="text-xs text-[#93000a] leading-relaxed">
              If under physical threat, in an unsafe situation, or facing severe intimidation, emergency state protection is guaranteed:
            </p>
            <div className="pt-1 flex gap-2 flex-wrap">
              <a
                href="tel:1091"
                className="px-3 py-2 rounded-lg bg-[#ba1a1a] text-[#ffffff] text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>Women Helpline: 1091</span>
              </a>
              <a
                href="tel:112"
                className="px-3 py-2 rounded-lg bg-[#ffffff] text-[#ba1a1a] text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform border border-[#ffdad6]"
              >
                <span className="material-symbols-outlined text-[16px]">local_police</span>
                <span>Police: 112</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: What Does This Mean? */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm space-y-3 border border-[#e1e8f9]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-6 rounded-full bg-[#00696d]"></span>
          <h3 className="text-[18px] font-bold text-[#002046]">What does this mean?</h3>
        </div>
        <p className="text-xs text-[#141c28] leading-relaxed">
          Indian statutes strictly penalize physical, verbal, digital, and workplace harassment. You have legally protected avenues for redressal without retaliation:
        </p>
        <div className="space-y-2 pt-1">
          <div className="p-3 rounded-lg bg-[#eff3ff] flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ffdbc9] text-[#753400] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">domain</span>
            </div>
            <div>
              <span className="text-sm font-bold text-[#002046] block">POSH at Workplace</span>
              <span className="text-xs text-[#44474e] leading-relaxed">
                Mandates an Internal Committee (IC) in any organization with 10+ employees. You have the right to confidential inquiry, interim transfer, or paid leave during hearings.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#eff3ff] flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#94f2f7] text-[#002021] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">no_encryption</span>
            </div>
            <div>
              <span className="text-sm font-bold text-[#002046] block">Digital Stalking & Trolling</span>
              <span className="text-xs text-[#44474e] leading-relaxed">
                Persistent unwanted calls, impersonation, morphed images, or tracking location is a non-bailable offense under IT Act Sec 66E / 67 and BNS Section 78.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#eff3ff] flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#d6e3ff] text-[#001b3d] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">home</span>
            </div>
            <div>
              <span className="text-sm font-bold text-[#002046] block">Domestic Violence Protection</span>
              <span className="text-xs text-[#44474e] leading-relaxed">
                Under the Protection of Women from Domestic Violence Act 2005, Magistrates can grant immediate Protection Orders, Residence Orders, and Monetary Relief.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Action Steps */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm space-y-3 border border-[#e1e8f9]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-[#002046]"></span>
            <h3 className="text-[18px] font-bold text-[#002046]">Step-by-Step Action Plan</h3>
          </div>
          <span className="text-[11px] text-[#00696d] font-bold uppercase tracking-wider">Rights Enforced</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#eff3ff]">
            <div className="w-7 h-7 rounded-full bg-[#1b365d] text-[#ffffff] flex items-center justify-center text-xs font-bold shrink-0">1</div>
            <div>
              <h4 className="text-sm font-bold text-[#002046]">Document & Preserve Everything</h4>
              <p className="text-xs text-[#44474e] mt-0.5 leading-relaxed">
                Never delete messages or call records. Take timestamped screenshots and store backups on a secure private cloud or with a trusted family member.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#eff3ff]">
            <div className="w-7 h-7 rounded-full bg-[#00696d] text-[#ffffff] flex items-center justify-center text-xs font-bold shrink-0">2</div>
            <div>
              <h4 className="text-sm font-bold text-[#002046]">Lodge Internal / NCW Grievance</h4>
              <p className="text-xs text-[#44474e] mt-0.5 leading-relaxed">
                At work, submit a formal written complaint to the IC within 90 days. For external harassment, register directly on the National Commission for Women portal (ncw.nic.in).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#eff3ff]">
            <div className="w-7 h-7 rounded-full bg-[#002046] text-[#ffffff] flex items-center justify-center text-xs font-bold shrink-0">3</div>
            <div>
              <h4 className="text-sm font-bold text-[#002046]">Demand a Zero-FIR</h4>
              <p className="text-xs text-[#44474e] mt-0.5 leading-relaxed">
                You can lodge an FIR at the nearest police station regardless of where the incident happened. Women have the right to be examined by a woman police officer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Evidence Checklist */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm space-y-3 border border-[#e1e8f9]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-[#00696d]"></span>
            <h3 className="text-[18px] font-bold text-[#002046]">Safety Evidence Checklist</h3>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#94f2f7] text-[#002021]">
            {count}/{total} Preserved
          </span>
        </div>

        <div className="space-y-2">
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
      </section>

      {/* Official Directory */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm space-y-3 border border-[#e1e8f9]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-6 rounded-full bg-[#002046]"></span>
          <h3 className="text-[18px] font-bold text-[#002046]">Official Safety Channels</h3>
        </div>

        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-[#eff3ff] flex items-center justify-between gap-2">
            <div>
              <div className="text-sm font-bold text-[#002046]">National Commission for Women (NCW)</div>
              <div className="text-[11px] text-[#44474e]">ncw.nic.in • 24x7 Helpline: 7827170170</div>
            </div>
            <a
              href="https://ncw.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#002046] text-[#ffffff] text-xs font-bold shrink-0"
            >
              NCW Portal
            </a>
          </div>

          <div className="p-3 rounded-lg bg-[#eff3ff] flex items-center justify-between gap-2">
            <div>
              <div className="text-sm font-bold text-[#002046]">Free Legal Aid (NALSA)</div>
              <div className="text-[11px] text-[#44474e]">Women are entitled to 100% free advocate support under Sec 12</div>
            </div>
            <a
              href="tel:15100"
              className="px-3 py-1.5 rounded-lg bg-[#00696d] text-[#ffffff] text-xs font-bold shrink-0"
            >
              Call 15100
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
