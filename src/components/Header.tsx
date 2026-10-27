import React from 'react';
import { ScreenId, Language } from '../types';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenDrawer: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  screenTitle?: string;
  quickHelpline?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenDrawer,
  currentLang,
  onLanguageChange,
  screenTitle,
  quickHelpline = '1930'
}) => {
  const isHome = currentScreen === 'home';
  const logoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1UwHzuA_XeSxsYPJi_83Q1Nmmp2dJ1EuFbeo450K8aSIqoLeM4iR8_8UokogwfD0RwR2z2juEqt3PZntv0pg-5S5_LqymFNNIwuVUZocypQjcb6chWQ6BCgUF2crDuCYtlCrdU-1kYWt6IJyXWFTUboa9mkgXO-fn7KoJ_cBJnm6CRz7jSxBLsfjiusLufn547mI2SoSmxWoIYNqGRPVrIaqNGKVcMAs0q2dVaHx6mFVSr6v_8ZSSRXoSU8';

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#f8f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(27,54,93,0.06)] border-b border-[#e1e8f9]/70">
      <div className="h-20 px-4 max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Left section: Nav action + Logo */}
        <div className="flex items-center gap-2 min-w-0">
          {isHome ? (
            <button
              onClick={onOpenDrawer}
              aria-label="Open civic menu drawer"
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg flex items-center justify-center text-[#002046] active:bg-[#e6eeff] transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('home')}
              aria-label="Go back"
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg flex items-center justify-center text-[#002046] active:bg-[#e6eeff] transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          )}

          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <img
              alt="LegalSaathi Brand Logo"
              className="h-8 w-auto object-contain shrink-0"
              src={logoUrl}
            />
            {isHome ? (
              <div className="flex flex-col">
                <span className="font-semibold text-[15px] text-[#002046] leading-tight tracking-tight">
                  LegalSaathi
                </span>
                <span className="text-[11px] text-[#00696d] font-medium leading-none">
                  न्याय & सुरक्षा
                </span>
              </div>
            ) : (
              <h1 className="font-semibold text-[17px] text-[#002046] tracking-tight truncate max-w-[140px]">
                {screenTitle || 'Guide Detail'}
              </h1>
            )}
          </div>
        </div>

        {/* Right section: Quick actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Language selector */}
          <div className="relative flex items-center">
            <label className="sr-only" htmlFor="lang-select">
              Select Language
            </label>
            <select
              id="lang-select"
              aria-label="Select Language"
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="h-9 pl-2 pr-5 rounded-lg bg-[#eff3ff] text-[#141c28] text-xs font-semibold appearance-none focus:outline-none focus:ring-1 focus:ring-[#00696d] min-h-[44px] cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
            </select>
            <span className="material-symbols-outlined text-[16px] text-[#74777f] absolute right-1 pointer-events-none">
              arrow_drop_down
            </span>
          </div>

          {/* Emergency / Hotline Call Trigger */}
          {isHome ? (
            <a
              href="tel:112"
              aria-label="Emergency SOS 112"
              className="min-h-[44px] px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center gap-1 text-xs font-bold active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[16px]">sos</span>
              <span>112</span>
            </a>
          ) : (
            <a
              href={`tel:${quickHelpline}`}
              aria-label={`National Helpline ${quickHelpline}`}
              className="min-h-[44px] px-2.5 py-1 rounded-full bg-[#94f2f7] text-[#002021] flex items-center gap-1 text-xs font-bold active:scale-95 transition-transform shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">shield</span>
              <span>{quickHelpline}</span>
            </a>
          )}

          {/* Profile / Desk shortcut */}
          <button
            onClick={() => onNavigate('desk')}
            aria-label="My Desk and Saved Documents"
            className="w-8 h-8 rounded-full bg-[#002046] flex items-center justify-center active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[#ffffff] text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
