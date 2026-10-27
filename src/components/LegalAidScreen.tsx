import React, { useState } from 'react';
import { ScreenId } from '../types';

interface LegalAidScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const LegalAidScreen: React.FC<LegalAidScreenProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('woman');
  const [annualIncome, setAnnualIncome] = useState<number>(150000);

  const categories = [
    { id: 'woman', label: 'Woman or Child', eligibleAuto: true, desc: 'Eligible unconditionally under Section 12(c) regardless of income.' },
    { id: 'scst', label: 'Member of SC or ST', eligibleAuto: true, desc: 'Eligible unconditionally under Section 12(a).' },
    { id: 'custody', label: 'In Custody / Undertrial', eligibleAuto: true, desc: 'Eligible unconditionally under Section 12(g).' },
    { id: 'workman', label: 'Industrial Workman', eligibleAuto: true, desc: 'Eligible unconditionally under Section 12(f).' },
    { id: 'disabled', label: 'Person with Disability', eligibleAuto: true, desc: 'Eligible unconditionally under Section 12(d).' },
    { id: 'general', label: 'General / Other Citizen', eligibleAuto: false, desc: 'Eligible if annual family income is below state threshold (typically ₹1 to ₹3 Lakhs).' }
  ];

  const currentCat = categories.find((c) => c.id === selectedCategory) || categories[0];
  const isEligible = currentCat.eligibleAuto || annualIncome <= 300000;

  return (
    <div className="flex flex-col w-full pb-12 space-y-4">
      {/* Hero Card */}
      <div className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e1e8f9] space-y-2">
        <div className="flex items-center gap-1.5 text-[#00696d]">
          <span className="material-symbols-outlined text-[20px]">account_balance</span>
          <span className="text-xs font-bold uppercase tracking-wider">NALSA Citizen Charter</span>
        </div>
        <h2 className="text-[22px] font-bold text-[#002046]">Free Legal Aid & NALSA Services</h2>
        <p className="text-xs text-[#44474e] leading-relaxed">
          Access to justice is a constitutional right under Article 39A. Under the Legal Services Authorities Act 1987, the state provides free empanelled advocates, pays court fees, and handles drafting for eligible citizens.
        </p>

        {/* Toll-free action */}
        <div className="pt-2">
          <a
            href="tel:15100"
            className="w-full py-3 px-4 rounded-lg bg-[#002046] text-[#ffffff] flex items-center justify-center gap-2 text-xs font-bold shadow-sm active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px] text-[#94f2f7]">call</span>
            <span>Dial National Legal Aid Helpline: 15100</span>
          </a>
        </div>
      </div>

      {/* Interactive Eligibility Checker */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e1e8f9] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00696d] text-[20px]">how_to_reg</span>
            <h3 className="text-[17px] font-bold text-[#002046]">Section 12 Eligibility Checker</h3>
          </div>
          <span className="text-xs font-bold text-[#00696d]">Instant Result</span>
        </div>
        <p className="text-xs text-[#44474e] leading-relaxed">
          Select your category to determine your statutory entitlement to a free state-appointed lawyer:
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-2.5 rounded-lg text-xs font-bold text-left transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-[#002046] text-[#ffffff] border-[#002046]'
                  : 'bg-[#eff3ff] text-[#141c28] border-[#e1e8f9] hover:bg-[#dbe3f3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {selectedCategory === 'general' && (
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-[#002046] flex items-center justify-between">
              <span>Annual Family Income</span>
              <span className="text-[#00696d]">₹{annualIncome.toLocaleString('en-IN')}</span>
            </label>
            <input
              type="range"
              min="50000"
              max="600000"
              step="10000"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full accent-[#00696d]"
            />
            <span className="text-[10px] text-[#74777f] block">
              Most High Court Legal Services Committees set the annual threshold between ₹1,50,000 and ₹3,00,000.
            </span>
          </div>
        )}

        {/* Verdict Badge */}
        <div
          className={`p-3.5 rounded-xl flex items-start gap-2.5 border ${
            isEligible
              ? 'bg-[#94f2f7]/30 border-[#00696d] text-[#002021]'
              : 'bg-[#ffdad6] border-[#ba1a1a] text-[#93000a]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px] shrink-0">
            {isEligible ? 'verified' : 'help'}
          </span>
          <div>
            <h4 className="text-sm font-bold">
              {isEligible
                ? 'You are entitled to 100% Free Legal Aid'
                : 'Income exceeds standard threshold'}
            </h4>
            <p className="text-xs mt-0.5 leading-relaxed">
              {currentCat.desc}
            </p>
          </div>
        </div>
      </section>

      {/* What Services Does Legal Aid Cover? */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e1e8f9] space-y-3">
        <h3 className="text-[17px] font-bold text-[#002046]">What Is Fully Covered By The State?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-[#eff3ff] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00696d] text-[18px]">gavel</span>
            <span>Honorarium of appointed senior or junior advocate</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#eff3ff] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00696d] text-[18px]">receipt_long</span>
            <span>Court fees, process fees & summoning witness expenses</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#eff3ff] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00696d] text-[18px]">description</span>
            <span>Preparation of appeal, petition, and typing expenses</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#eff3ff] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00696d] text-[18px]">print</span>
            <span>Supply of certified copies of judgments & evidence</span>
          </div>
        </div>
      </section>

      {/* Lok Adalat Information */}
      <section className="bg-[#eff3ff] p-4 rounded-xl shadow-sm border border-[#e1e8f9] space-y-2">
        <div className="flex items-center gap-1.5 text-[#00696d]">
          <span className="material-symbols-outlined text-[20px]">groups</span>
          <h3 className="text-sm font-bold uppercase tracking-wider">National Lok Adalat</h3>
        </div>
        <p className="text-xs text-[#141c28] leading-relaxed">
          Lok Adalat is an alternative dispute resolution forum where pending compoundable civil, matrimonial, traffic, and banking disputes are resolved amicably. 
        </p>
        <ul className="text-xs text-[#44474e] space-y-1 list-disc pl-4 leading-relaxed">
          <li><strong>No Court Fee:</strong> If a pending case is settled in Lok Adalat, court fees already paid are refunded.</li>
          <li><strong>Final Award:</strong> The award passed by Lok Adalat is deemed a civil court decree with no appeal, guaranteeing permanent closure.</li>
        </ul>
      </section>
    </div>
  );
};
