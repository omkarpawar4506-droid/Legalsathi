/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenId, Language } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CivicDrawer } from './components/CivicDrawer';
import { GlossaryModal } from './components/GlossaryModal';
import { HomeHub } from './components/HomeHub';
import { GuideCybercrime } from './components/GuideCybercrime';
import { GuideConsumer } from './components/GuideConsumer';
import { GuideSafety } from './components/GuideSafety';
import { AskLegalSaathi } from './components/AskLegalSaathi';
import { FIRScreen } from './components/FIRScreen';
import { LegalAidScreen } from './components/LegalAidScreen';
import { MyDeskScreen } from './components/MyDeskScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  // Scroll to top upon navigating to a new screen
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'guide-cyber':
        return 'Online Fraud & Cybercrime';
      case 'guide-consumer':
        return 'Consumer Rights & Faulty Services';
      case 'guide-safety':
        return 'Harassment & Safety';
      case 'ask':
        return 'Ask LegalSaathi';
      case 'fir':
        return 'FIR & Safety';
      case 'aid':
        return 'Legal Aid (NALSA)';
      case 'desk':
        return 'My Desk';
      default:
        return undefined;
    }
  };

  const getQuickHelpline = () => {
    switch (currentScreen) {
      case 'guide-consumer':
        return '1915';
      case 'guide-safety':
        return '1091';
      case 'aid':
        return '15100';
      default:
        return '1930';
    }
  };

  return (
    <div className="bg-[#f8f9ff] text-[#141c28] flex flex-col min-h-screen selection:bg-[#94f2f7]">
      {/* Top Fixed Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenDrawer={() => setDrawerOpen(true)}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        screenTitle={getScreenTitle()}
        quickHelpline={getQuickHelpline()}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col relative w-full pt-20 pb-24 md:pb-28 max-w-4xl mx-auto px-4">
        {currentScreen === 'home' && (
          <HomeHub
            onNavigate={setCurrentScreen}
            lang={currentLang}
            onLanguageChange={setCurrentLang}
          />
        )}

        {currentScreen === 'guide-cyber' && (
          <GuideCybercrime onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'guide-consumer' && (
          <GuideConsumer onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'guide-safety' && (
          <GuideSafety onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'ask' && (
          <AskLegalSaathi onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'fir' && (
          <FIRScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'aid' && (
          <LegalAidScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'desk' && (
          <MyDeskScreen onNavigate={setCurrentScreen} />
        )}
      </main>

      {/* Primary Fixed Bottom Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        lang={currentLang}
      />

      {/* Slide-out Civic Drawer Menu */}
      <CivicDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={setCurrentScreen}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenGlossary={() => setGlossaryOpen(true)}
      />

      {/* Plain Language Legal Glossary Modal */}
      <GlossaryModal
        isOpen={glossaryOpen}
        onClose={() => setGlossaryOpen(false)}
      />
    </div>
  );
}
