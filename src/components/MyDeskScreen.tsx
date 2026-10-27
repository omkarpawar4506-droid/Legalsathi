import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';

interface MyDeskScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

interface ComplaintRecord {
  id: string;
  category: string;
  referenceNumber: string;
  authority: string;
  date: string;
  notes: string;
}

export const MyDeskScreen: React.FC<MyDeskScreenProps> = ({ onNavigate }) => {
  const [complaints, setComplaints] = useState<ComplaintRecord[]>(() => {
    try {
      const saved = localStorage.getItem('legalsaathi_desk_complaints');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: '1',
              category: 'Cyber Financial Fraud',
              referenceNumber: 'ACK-2026/89412',
              authority: 'cybercrime.gov.in (1930)',
              date: '2026-10-25',
              notes: 'Reported unauthorized UPI transfer of ₹4,200. Bank lien initiated.'
            }
          ];
    } catch {
      return [];
    }
  });

  const [category, setCategory] = useState('Cybercrime (1930)');
  const [refNum, setRefNum] = useState('');
  const [authority, setAuthority] = useState('');
  const [notes, setNotes] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('legalsaathi_desk_complaints', JSON.stringify(complaints));
    } catch (e) {
      console.error(e);
    }
  }, [complaints]);

  const handleAddComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refNum.trim()) return;

    const newRec: ComplaintRecord = {
      id: Date.now().toString(),
      category,
      referenceNumber: refNum.trim(),
      authority: authority.trim() || 'Official Portal',
      date: new Date().toISOString().split('T')[0],
      notes: notes.trim()
    };

    setComplaints([newRec, ...complaints]);
    setRefNum('');
    setAuthority('');
    setNotes('');
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setComplaints(complaints.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col w-full pb-12 space-y-4">
      {/* Header Banner */}
      <div className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e1e8f9] space-y-1.5">
        <div className="flex items-center gap-1.5 text-[#00696d]">
          <span className="material-symbols-outlined text-[20px]">folder_shared</span>
          <span className="text-xs font-bold uppercase tracking-wider">Citizen Legal Notebook</span>
        </div>
        <h2 className="text-[22px] font-bold text-[#002046]">My Desk & Case Tracker</h2>
        <p className="text-xs text-[#44474e] leading-relaxed">
          Store your official grievance docket numbers, 12-digit bank UTR references, cybercrime acknowledgements, and access preserved evidence checklists locally on your device.
        </p>
      </div>

      {/* Active Complaints Docket Tracker */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e1e8f9] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#002046] text-[20px]">receipt_long</span>
            <h3 className="text-[17px] font-bold text-[#002046]">Tracked Grievance Dockets</h3>
          </div>
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="px-3 py-1.5 rounded-lg bg-[#002046] text-[#ffffff] text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[16px]">
              {showAddForm ? 'close' : 'add'}
            </span>
            <span>{showAddForm ? 'Cancel' : 'Track New Docket'}</span>
          </button>
        </div>

        {/* Add Record Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddComplaint}
            className="p-3.5 rounded-xl bg-[#eff3ff] border border-[#dbe3f3] space-y-2.5 animate-in fade-in"
          >
            <span className="text-xs font-bold text-[#002046] block">Save Official Reference</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-[#44474e] block mb-0.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#ffffff] text-xs p-2 rounded-lg border border-[#e1e8f9]"
                >
                  <option value="Cybercrime (1930)">Cybercrime (1930 / cybercrime.gov.in)</option>
                  <option value="Consumer Grievance (NCH 1915)">Consumer Grievance (NCH 1915 / e-Daakhil)</option>
                  <option value="Police Station / Zero-FIR">Police Station / Zero-FIR</option>
                  <option value="Bank Dispute (12-digit UTR)">Bank Dispute (12-digit UTR)</option>
                  <option value="NALSA Legal Aid Application">NALSA Legal Aid Application</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#44474e] block mb-0.5">Reference / Docket Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026/CYBER/1842 or 12-digit UTR"
                  value={refNum}
                  onChange={(e) => setRefNum(e.target.value)}
                  className="w-full bg-[#ffffff] text-xs p-2 rounded-lg border border-[#e1e8f9]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-[#44474e] block mb-0.5">Authority / Portal</label>
                <input
                  type="text"
                  placeholder="e.g. SBI Cyber Cell / cybercrime.gov.in"
                  value={authority}
                  onChange={(e) => setAuthority(e.target.value)}
                  className="w-full bg-[#ffffff] text-xs p-2 rounded-lg border border-[#e1e8f9]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#44474e] block mb-0.5">Notes / Follow-up Details</label>
                <input
                  type="text"
                  placeholder="e.g. Officer requested bank statement by Friday"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#ffffff] text-xs p-2 rounded-lg border border-[#e1e8f9]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#00696d] text-[#ffffff] rounded-lg text-xs font-bold active:scale-95 transition-transform"
            >
              Save to My Desk
            </button>
          </form>
        )}

        {/* Complaints list */}
        {complaints.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#74777f] bg-[#eff3ff] rounded-xl border border-[#e1e8f9]">
            No grievance dockets saved yet. When you file a complaint on 1930, 1915, or at a police station, record your docket number here.
          </div>
        ) : (
          <div className="space-y-2">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="p-3.5 rounded-xl bg-[#eff3ff] border border-[#e1e8f9] flex items-start justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#002046]">{c.category}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#94f2f7] text-[#002021] text-[10px] font-bold">
                      {c.date}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-bold text-[#00696d]">
                    Ref: {c.referenceNumber}
                  </div>
                  <div className="text-[11px] text-[#44474e]">Authority: {c.authority}</div>
                  {c.notes && (
                    <div className="text-xs text-[#141c28] bg-[#ffffff] p-2 rounded-lg mt-1 border border-[#e1e8f9]/70">
                      {c.notes}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  aria-label="Delete docket"
                  className="text-[#ba1a1a] p-1 rounded-lg hover:bg-[#ffdad6] shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Access to Active Guides */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e1e8f9] space-y-2">
        <h3 className="text-sm font-bold text-[#002046]">Quick Access Evidence Kits</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onNavigate('guide-cyber')}
            className="p-3 rounded-lg bg-[#eff3ff] text-left hover:bg-[#dbe3f3] transition-colors"
          >
            <span className="text-xs font-bold text-[#002046] block">Cyber Evidence Kit</span>
            <span className="text-[11px] text-[#44474e]">UTR, SMS, Phishing URLs</span>
          </button>
          <button
            onClick={() => onNavigate('guide-consumer')}
            className="p-3 rounded-lg bg-[#eff3ff] text-left hover:bg-[#dbe3f3] transition-colors"
          >
            <span className="text-xs font-bold text-[#002046] block">Consumer Proof Kit</span>
            <span className="text-[11px] text-[#44474e]">Invoices, warranty, chats</span>
          </button>
        </div>
      </section>
    </div>
  );
};
