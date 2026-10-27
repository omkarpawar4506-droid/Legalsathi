import React from 'react';
import { ScreenId, Language } from '../types';
import { TRANSLATIONS } from '../data/legalContent';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const tabs: { id: ScreenId; label: string; icon: string }[] = [
    { id: 'home', label: t.tabRights, icon: 'balance' },
    { id: 'fir', label: t.tabFir, icon: 'menu_book' },
    { id: 'aid', label: t.tabAid, icon: 'assured_workload' },
    { id: 'desk', label: t.tabDesk, icon: 'folder_shared' }
  ];

  return (
    <nav
      aria-label="Primary Mobile Navigation"
      className="fixed bottom-0 w-full z-40 pb-safe bg-[#f8f9ff]/90 backdrop-blur-xl border-t border-[#e1e8f9] shadow-[0_-4px_16px_rgba(27,54,93,0.06)]"
    >
      <div className="max-w-4xl mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive =
            currentScreen === tab.id ||
            (tab.id === 'home' && (currentScreen === 'guide-cyber' || currentScreen === 'guide-consumer' || currentScreen === 'guide-safety'));

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] flex-1 transition-colors select-none ${
                isActive ? 'text-[#002046] font-bold' : 'text-[#44474e] hover:text-[#002046]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
