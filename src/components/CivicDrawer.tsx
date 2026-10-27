import React from 'react';
import { ScreenId, Language } from '../types';

interface CivicDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenGlossary: () => void;
}

export const CivicDrawer: React.FC<CivicDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  currentLang,
  onLanguageChange,
  onOpenGlossary
}) => {
  if (!isOpen) return null;

  const handleQuickExit = () => {
    // Discreet privacy exit: immediately redirects browser
    window.location.replace('https://www.google.com/search?q=weather+today');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#141c28]/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 left-0 max-w-[320px] w-full bg-[#ffffff] shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="p-4 bg-[#002046] text-[#ffffff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#94f2f7]">balance</span>
            <div>
              <h2 className="font-bold text-[16px] leading-tight">LegalSaathi</h2>
              <p className="text-[11px] text-[#87a0cd]">Civic Framework & Constitutional Rights</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#ffffff]/80 hover:text-[#ffffff] active:bg-[#ffffff]/10"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Quick Safety Exit Button */}
        <div className="p-3 bg-[#ffdad6] border-b border-[#ffdad6]">
          <button
            onClick={handleQuickExit}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#ba1a1a] text-[#ffffff] text-xs font-bold active:scale-95 transition-transform"
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">visibility_off</span>
              <span>Quick Discreet Exit</span>
            </span>
            <span className="text-[10px] opacity-80">Leaves Page</span>
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[#141c28]">
          {/* Language Switcher */}
          <div>
            <label className="text-xs font-bold text-[#74777f] uppercase tracking-wider block mb-2">
              Select Language / भाषा निवडा
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => onLanguageChange('en')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                  currentLang === 'en'
                    ? 'bg-[#002046] text-[#ffffff]'
                    : 'bg-[#eff3ff] text-[#141c28] hover:bg-[#dbe3f3]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                  currentLang === 'hi'
                    ? 'bg-[#002046] text-[#ffffff]'
                    : 'bg-[#eff3ff] text-[#141c28] hover:bg-[#dbe3f3]'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => onLanguageChange('mr')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                  currentLang === 'mr'
                    ? 'bg-[#002046] text-[#ffffff]'
                    : 'bg-[#eff3ff] text-[#141c28] hover:bg-[#dbe3f3]'
                }`}
              >
                मराठी
              </button>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <label className="text-xs font-bold text-[#74777f] uppercase tracking-wider block mb-2">
              Citizen Modules
            </label>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onNavigate('guide-cyber');
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#eff3ff] text-left transition-colors"
              >
                <span className="material-symbols-outlined text-[20px] text-[#00696d]">phonelink_lock</span>
                <span className="text-sm font-semibold text-[#002046]">Cyber Fraud & 1930</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('guide-consumer');
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#eff3ff] text-left transition-colors"
              >
                <span className="material-symbols-outlined text-[20px] text-[#00696d]">shopping_bag</span>
                <span className="text-sm font-semibold text-[#002046]">Consumer Protection & e-Daakhil</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('guide-safety');
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#eff3ff] text-left transition-colors"
              >
                <span className="material-symbols-outlined text-[20px] text-[#00696d]">shield_person</span>
                <span className="text-sm font-semibold text-[#002046]">Harassment & POSH Act</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('fir');
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#eff3ff] text-left transition-colors"
              >
                <span className="material-symbols-outlined text-[20px] text-[#00696d]">menu_book</span>
                <span className="text-sm font-semibold text-[#002046]">BNS Section 173 FIR Guide</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('aid');
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#eff3ff] text-left transition-colors"
              >
                <span className="material-symbols-outlined text-[20px] text-[#00696d]">account_balance</span>
                <span className="text-sm font-semibold text-[#002046]">NALSA Free Legal Aid Checker</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('ask');
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-[#eff3ff] text-left hover:bg-[#dbe3f3] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px] text-[#002046]">smart_toy</span>
                <span className="text-sm font-bold text-[#002046]">Ask LegalSaathi Bot</span>
              </button>
            </div>
          </div>

          {/* Civic Tools */}
          <div className="pt-2 border-t border-[#e1e8f9]">
            <label className="text-xs font-bold text-[#74777f] uppercase tracking-wider block mb-2">
              Citizen Literacy
            </label>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onOpenGlossary();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#eff3ff] text-left transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-[#00696d]">translate</span>
                  <span className="text-sm font-medium">Plain-Language Legal Glossary</span>
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#74777f]">chevron_right</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('desk');
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#eff3ff] text-left transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-[#00696d]">folder_shared</span>
                  <span className="text-sm font-medium">My Desk (Saved Checklists)</span>
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#74777f]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Emergency Hotlines Strip */}
          <div className="p-3 bg-[#eff3ff] rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00696d] uppercase tracking-wider">
              24x7 State Emergency Hub
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="tel:112" className="p-2 bg-[#ffffff] rounded-lg font-bold text-[#ba1a1a] flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[16px]">call</span>
                Police: 112
              </a>
              <a href="tel:1930" className="p-2 bg-[#ffffff] rounded-lg font-bold text-[#002046] flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[16px]">shield</span>
                Cyber: 1930
              </a>
              <a href="tel:1091" className="p-2 bg-[#ffffff] rounded-lg font-bold text-[#00696d] flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[16px]">support_agent</span>
                Women: 1091
              </a>
              <a href="tel:15100" className="p-2 bg-[#ffffff] rounded-lg font-bold text-[#00696d] flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[16px]">gavel</span>
                NALSA: 15100
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#f8f9ff] border-t border-[#e1e8f9] text-center text-[10px] text-[#74777f]">
          LegalSaathi • Public Constitutional Literacy Initiative
        </div>
      </div>
    </div>
  );
};
