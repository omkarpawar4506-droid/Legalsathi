import React, { useState, useMemo } from 'react';
import { ScreenId, Language } from '../types';
import { LEGAL_TOPICS, SCENARIOS, DIRECTORY_PORTALS, TRANSLATIONS } from '../data/legalContent';

interface HomeHubProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const HomeHub: React.FC<HomeHubProps> = ({ onNavigate, lang, onLanguageChange }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('upi');

  const activeScenario = useMemo(() => {
    return SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];
  }, [selectedScenarioId]);

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return LEGAL_TOPICS;
    const q = searchQuery.toLowerCase();
    return LEGAL_TOPICS.filter(
      (topic) =>
        topic.title.toLowerCase().includes(q) ||
        topic.description.toLowerCase().includes(q) ||
        topic.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const handlePillClick = (tag: string) => {
    setSearchQuery(tag);
    const topicsEl = document.getElementById('topics-grid');
    if (topicsEl) {
      topicsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const topicsEl = document.getElementById('topics-grid');
    if (topicsEl) {
      topicsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* 1. Emergency Response Ribbon (Civic Safety Touchpoint) */}
      <section className="bg-[#ffdad6] text-[#93000a] rounded-xl p-4 shadow-sm border border-[#ffb4ab]">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#ba1a1a]">fmd_bad</span>
            <span className="text-xs font-bold tracking-tight uppercase">
              {t.emergencyRibbonTitle}
            </span>
          </div>
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ba1a1a] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ba1a1a]"></span>
          </span>
        </div>
        <p className="text-xs mt-1 text-[#93000a]/90 leading-relaxed">
          {t.emergencyRibbonDesc}
        </p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <a
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-[#ba1a1a] text-[#ffffff] text-xs font-bold shadow-sm active:scale-95 transition-transform min-h-[44px]"
            href="tel:112"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>{t.policeCall}</span>
          </a>
          <a
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-[#ffffff] text-[#002046] text-xs font-bold shadow-sm active:scale-95 transition-transform min-h-[44px] border border-[#dbe3f3]"
            href="tel:1930"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">shield</span>
            <span>{t.cyberCall}</span>
          </a>
        </div>
      </section>

      {/* 2. Hero Reassurance Card */}
      <section className="bg-[#ffffff] rounded-xl p-4 shadow-sm space-y-4 border border-[#e1e8f9]">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#94f2f7] text-[#007074] text-[11px] font-bold">
            <span className="material-symbols-outlined text-[14px]">gavel</span>
            <span>{t.heroTag}</span>
          </div>
          <h1 className="text-[24px] md:text-[28px] font-bold text-[#002046] tracking-tight leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-sm text-[#44474e] leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Search Module */}
        <div className="space-y-2">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-[#eff3ff] rounded-xl focus-within:bg-[#dbe3f3] transition-colors border border-transparent focus-within:border-[#00696d]"
          >
            <span className="material-symbols-outlined text-[#74777f] text-[22px] ml-3">search</span>
            <input
              id="legal-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent py-3 pl-2 pr-3 text-[#141c28] text-sm placeholder:text-[#74777f] focus:outline-none min-h-[48px]"
              placeholder={t.searchPlaceholder}
              type="text"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-[#74777f] hover:text-[#141c28] mr-1"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
            <button
              id="search-action-btn"
              type="submit"
              aria-label="Trigger Legal Search"
              className="mr-1.5 px-3.5 py-2 bg-[#002046] text-[#ffffff] rounded-lg text-xs font-semibold active:scale-95 transition-transform min-h-[40px] flex items-center shrink-0 shadow-sm"
            >
              {t.searchBtn}
            </button>
          </form>

          {/* Quick query tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 no-scrollbar text-xs">
            <span className="text-[11px] text-[#74777f] whitespace-nowrap font-medium">
              {t.suggested}
            </span>
            {['Cyber Fraud', 'Defective Product', 'FIR Process', 'Tenant Rights', 'POSH Act'].map(
              (pill) => (
                <button
                  key={pill}
                  onClick={() => handlePillClick(pill)}
                  type="button"
                  className="px-2.5 py-1 rounded-full bg-[#e6eeff] text-[#44474e] hover:bg-[#94f2f7] hover:text-[#007074] text-xs whitespace-nowrap active:scale-95 transition-all cursor-pointer font-medium"
                >
                  {pill}
                </button>
              )
            )}
          </div>
        </div>

        {/* Primary Action Split */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-lg bg-[#002046] text-[#ffffff] text-sm font-semibold shadow-sm active:scale-95 transition-all text-center min-h-[48px]"
            href="#topics-grid"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('topics-grid')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>{t.exploreTopics}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </a>
          <a
            className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-lg bg-[#e6eeff] text-[#002046] text-sm font-semibold active:bg-[#dbe3f3] transition-colors text-center min-h-[48px]"
            href="#helpline-directory"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('helpline-directory')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="material-symbols-outlined text-[18px] text-[#00696d]">support_agent</span>
            <span>{t.officialHelplines}</span>
          </a>
        </div>
      </section>

      {/* 3. Interactive Civic Flow: How LegalSaathi Works */}
      <section className="bg-[#eff3ff] rounded-xl p-4 space-y-3.5 border border-[#e1e8f9]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#00696d] font-bold block">
              {t.civicFramework}
            </span>
            <h2 className="text-[17px] font-bold text-[#002046]">{t.howItWorks}</h2>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#94f2f7] flex items-center justify-center text-[#004f52]">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
        </div>

        <div className="space-y-2">
          {/* Step 1 */}
          <div className="flex items-start gap-3 bg-[#ffffff] p-3 rounded-lg shadow-sm border border-[#e1e8f9]/70">
            <div className="w-7 h-7 rounded-full bg-[#1b365d] text-[#ffffff] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[#002046]">{t.step1Title}</h3>
              <p className="text-xs text-[#44474e] mt-0.5 leading-relaxed">{t.step1Desc}</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 bg-[#ffffff] p-3 rounded-lg shadow-sm border border-[#e1e8f9]/70">
            <div className="w-7 h-7 rounded-full bg-[#00696d] text-[#ffffff] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[#002046]">{t.step2Title}</h3>
              <p className="text-xs text-[#44474e] mt-0.5 leading-relaxed">{t.step2Desc}</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 bg-[#ffffff] p-3 rounded-lg shadow-sm border border-[#e1e8f9]/70">
            <div className="w-7 h-7 rounded-full bg-[#5b2700] text-[#f67d27] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[#002046]">{t.step3Title}</h3>
              <p className="text-xs text-[#44474e] mt-0.5 leading-relaxed">{t.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Visual Case Mosaic Banner: New to Filing an FIR? */}
      <section className="relative overflow-hidden rounded-xl bg-[#002046] text-[#ffffff] p-4 shadow-md">
        <div className="relative z-10 space-y-1.5">
          <span className="px-2 py-0.5 rounded-full bg-[#94f2f7] text-[#002021] text-[10px] font-bold uppercase tracking-wider inline-block">
            {t.freeCitizenTool}
          </span>
          <h3 className="text-[17px] font-bold text-[#ffffff]">{t.firBannerTitle}</h3>
          <p className="text-xs text-[#87a0cd] leading-relaxed max-w-[90%]">
            {t.firBannerDesc}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('fir')}
              className="px-3.5 py-2 rounded-lg bg-[#ffffff] text-[#002046] text-xs font-bold active:bg-[#d2daeb] transition-colors flex items-center gap-1.5 min-h-[44px] shadow-sm"
            >
              <span>{t.viewFirChecklist}</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-[#1b365d] opacity-60 pointer-events-none"></div>
      </section>

      {/* 5. Browse By Topic Section */}
      <section className="space-y-2.5 pt-1" id="topics-grid">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#00696d] font-bold uppercase tracking-wider block">
              Know Your Protections
            </span>
            <h2 className="text-[19px] font-bold text-[#002046]">{t.browseByTopic}</h2>
          </div>
          <span className="text-xs text-[#74777f] font-medium">{t.modulesCount}</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {filteredTopics.map((topic) => {
            const isClickable = true;
            return (
              <article
                key={topic.id}
                onClick={() => {
                  if (topic.screenTarget) {
                    onNavigate(topic.screenTarget);
                  }
                }}
                className="bg-[#ffffff] p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-[#e1e8f9] active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      topic.id === 'cyber'
                        ? 'bg-[#94f2f7] text-[#007074]'
                        : topic.id === 'safety'
                        ? 'bg-[#ffdbc9] text-[#753400]'
                        : topic.id === 'consumer'
                        ? 'bg-[#e6eeff] text-[#002046]'
                        : topic.id === 'nalsa'
                        ? 'bg-[#d6e3ff] text-[#001b3d]'
                        : 'bg-[#e1e8f9] text-[#002046]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{topic.icon}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      topic.badgeType === 'active'
                        ? 'bg-[#94f2f7] text-[#007074]'
                        : topic.badgeType === 'directory'
                        ? 'bg-[#d6e3ff] text-[#2e476f]'
                        : 'bg-[#e6eeff] text-[#44474e]'
                    }`}
                  >
                    {topic.statusBadge}
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="text-[16px] font-bold text-[#002046] flex items-center justify-between">
                    <span>{topic.title}</span>
                    <span className="material-symbols-outlined text-[18px] text-[#74777f]">
                      arrow_forward
                    </span>
                  </h3>
                  <p className="text-xs text-[#44474e] leading-relaxed">{topic.description}</p>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {topic.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-[#eff3ff] text-[#002046] text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 6. Direct Resource Directory: Zero Middlemen */}
      <section className="space-y-2.5 pt-2" id="helpline-directory">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#00696d] font-bold uppercase tracking-wider block">
              {t.zeroMiddlemen}
            </span>
            <h2 className="text-[19px] font-bold text-[#002046]">{t.directoryTitle}</h2>
          </div>
          <span className="material-symbols-outlined text-[#74777f]">assured_workload</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {DIRECTORY_PORTALS.map((portal) => (
            <a
              key={portal.id}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#ffffff] shadow-sm active:bg-[#eff3ff] transition-colors border border-[#e1e8f9] min-h-[48px]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    portal.isEmergency ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#e6eeff] text-[#002046]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{portal.icon}</span>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#002046] truncate">{portal.name}</div>
                  <div className="text-[11px] text-[#44474e] truncate">{portal.subtext}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#00696d] shrink-0 font-bold text-xs ml-2">
                <span>Portal</span>
                <span className="material-symbols-outlined text-[15px]">open_in_new</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 7. Interactive Citizen Quick-Check Module */}
      <section className="bg-[#ffffff] rounded-xl p-4 shadow-sm space-y-3 border border-[#e1e8f9]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#00696d] text-[20px]">fact_check</span>
          <h3 className="text-[16px] font-bold text-[#002046]">{t.instantOrientation}</h3>
        </div>
        <p className="text-xs text-[#44474e] leading-relaxed">{t.instantOrientationDesc}</p>

        {/* Dynamic scenario switcher buttons */}
        <div className="grid grid-cols-2 gap-2" id="quick-scenario-selectors">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setSelectedScenarioId(sc.id)}
              className={`py-2.5 px-2 rounded-lg text-xs font-semibold text-center transition-colors min-h-[44px] ${
                selectedScenarioId === sc.id
                  ? 'bg-[#002046] text-[#ffffff] shadow-sm'
                  : 'bg-[#e6eeff] text-[#141c28] hover:bg-[#dbe3f3]'
              }`}
            >
              {sc.buttonLabel}
            </button>
          ))}
        </div>

        {/* Dynamic advice card */}
        <div className="p-3.5 rounded-lg bg-[#eff3ff] space-y-1.5 border border-[#e1e8f9]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#00696d] uppercase tracking-wider">
              {activeScenario.tag}
            </span>
            <span className="material-symbols-outlined text-[#00696d] text-[16px]">schedule</span>
          </div>
          <h4 className="text-sm font-bold text-[#002046]">{activeScenario.heading}</h4>
          <p className="text-xs text-[#44474e] leading-relaxed">{activeScenario.desc}</p>

          {activeScenario.urgentHelpline && (
            <div className="pt-2 flex items-center gap-2">
              <a
                href={`tel:${activeScenario.urgentHelpline}`}
                className="px-3 py-1.5 rounded-lg bg-[#002046] text-[#ffffff] text-xs font-bold inline-flex items-center gap-1 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[14px]">call</span>
                Dial {activeScenario.urgentHelpline}
              </a>
              {activeScenario.portalUrl && (
                <a
                  href={activeScenario.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#ffffff] text-[#00696d] text-xs font-semibold inline-flex items-center gap-1 border border-[#dbe3f3] hover:bg-[#f8f9ff]"
                >
                  Visit Portal
                  <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 8. Hackathon & Civic Disclaimers */}
      <section className="rounded-xl bg-[#eff3ff] p-4 space-y-2 border border-[#e1e8f9]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#002046]">
            <span className="material-symbols-outlined text-[18px] text-[#00696d]">verified</span>
            <span className="text-xs font-bold">{t.openPublicProject}</span>
          </div>
          <div className="flex items-center gap-1">
            {(['en', 'hi', 'mr'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => onLanguageChange(l)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  lang === l
                    ? 'bg-[#002046] text-[#ffffff]'
                    : 'bg-[#e6eeff] text-[#44474e] hover:bg-[#dbe3f3]'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-[#44474e] leading-relaxed">{t.disclaimer}</p>
      </section>

      {/* Legal Disclaimer Box */}
      <aside className="p-3.5 rounded-xl bg-[#eff3ff] text-[#44474e] text-[11px] text-center leading-relaxed border border-[#e1e8f9]/70">
        <span className="font-bold text-[#002046] block mb-0.5">Legal Disclaimer (अस्वीकरण)</span>
        {t.disclaimerFooter}
      </aside>

      {/* 9. Floating Ask LegalSaathi Button */}
      <button
        onClick={() => onNavigate('ask')}
        aria-label="Ask LegalSaathi AI Legal Assistant"
        className="fixed bottom-20 md:bottom-24 right-4 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#002046] text-[#ffffff] shadow-[0_8px_20px_rgba(0,32,70,0.3)] min-h-[48px] active:scale-95 transition-all hover:bg-[#1b365d] border border-[#87a0cd]/30 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px] text-[#94f2f7]">smart_toy</span>
        <span className="text-sm font-bold tracking-tight">{t.askBtn}</span>
      </button>
    </div>
  );
};
