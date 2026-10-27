import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS } from '../data/legalContent';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = useMemo(() => {
    if (!searchTerm.trim()) return GLOSSARY_TERMS;
    const q = searchTerm.toLowerCase();
    return GLOSSARY_TERMS.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.hindi.toLowerCase().includes(q) ||
        t.marathi.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#141c28]/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#ffffff] rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden z-10 border border-[#e1e8f9] animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-[#002046] text-[#ffffff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#94f2f7]">translate</span>
            <div>
              <h3 className="text-base font-bold">Plain-Language Legal Glossary</h3>
              <p className="text-[11px] text-[#87a0cd]">Demystifying complex Indian statutory terms</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close glossary"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#ffffff]/80 hover:text-[#ffffff] active:bg-[#ffffff]/10"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search input */}
        <div className="p-3 bg-[#eff3ff] border-b border-[#e1e8f9]">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined text-[#74777f] text-[18px] ml-2.5 absolute">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search legal terms (e.g. FIR, Bail, Coparcenary)..."
              className="w-full bg-[#ffffff] text-xs py-2 pl-8 pr-3 rounded-lg border border-[#e1e8f9] focus:outline-none focus:border-[#00696d]"
            />
          </div>
        </div>

        {/* Terms list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredTerms.map((item) => (
            <div
              key={item.term}
              className="p-3.5 rounded-xl bg-[#eff3ff] border border-[#e1e8f9] space-y-1.5"
            >
              <div className="flex items-center justify-between flex-wrap gap-1">
                <h4 className="text-sm font-bold text-[#002046]">{item.term}</h4>
                <div className="flex gap-1.5 text-[11px] font-semibold text-[#00696d]">
                  <span>{item.hindi}</span>
                  <span>•</span>
                  <span>{item.marathi}</span>
                </div>
              </div>

              <p className="text-xs text-[#141c28] leading-relaxed">{item.definition}</p>

              <div className="text-[10px] text-[#74777f] font-mono bg-[#ffffff] p-1.5 rounded border border-[#e1e8f9]">
                <strong>Citation:</strong> {item.statute}
              </div>

              <div className="text-xs text-[#00696d] font-medium flex items-start gap-1 pt-0.5">
                <span className="material-symbols-outlined text-[15px] shrink-0 mt-0.5">
                  lightbulb
                </span>
                <span>{item.practicalTip}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#f8f9ff] border-t border-[#e1e8f9] text-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#002046] text-[#ffffff] rounded-lg text-xs font-bold active:scale-95 transition-transform"
          >
            Close Glossary
          </button>
        </div>
      </div>
    </div>
  );
};
