import React, { useState } from 'react';
import { ScreenId } from '../types';

interface FIRScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const FIRScreen: React.FC<FIRScreenProps> = ({ onNavigate }) => {
  const [complaintName, setComplaintName] = useState('');
  const [stationName, setStationName] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentLocation, setIncidentLocation] = useState('');
  const [details, setDetails] = useState('');
  const [accusedDetails, setAccusedDetails] = useState('');
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);

  const handleGenerateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    const draft = `TO,
THE OFFICER-IN-CHARGE / STATION HOUSE OFFICER (SHO),
POLICE STATION: ${stationName.toUpperCase() || '[NAME OF POLICE STATION]'},
CITY / DISTRICT: __________________________

SUBJECT: FORMAL INFORMATION OF COGNIZABLE OFFENCE UNDER SECTION 173 OF BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS)

Respected Officer,

I, the undersigned informant, ${complaintName || '[YOUR FULL NAME]'}, hereby bring to your official notice the commission of a cognizable offence:

1. DATE & TIME OF OCCURRENCE: ${incidentDate || '[DATE AND TIME]'}
2. EXACT PLACE OF INCIDENT: ${incidentLocation || '[LOCATION / ADDRESS]'}
3. ACCUSED / SUSPECT PARTICULARS: ${accusedDetails || '[KNOWN DETAILS / PHONE / UNKNOWN PERSONS]'}

4. SUMMARY OF INCIDENT & CHRONOLOGY:
${details || '[CLEAR DESCRIPTION OF WHAT OCCURRED AND VALUE OF LOSS / INJURY]'}

5. PRAYER & STATUTORY MANDATE:
Under Section 173 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), an officer in charge of a police station is legally bound to reduce this information to writing and forthwith register a First Information Report (FIR). Furthermore, under BNSS, a copy of the FIR as recorded shall be given forthwith, free of cost, to the informant.

I request you to kindly register the First Information Report (FIR) and provide me a signed carbon copy/acknowledgement with the official Crime/FIR Number.

Informant Signature: __________________________
Full Name: ${complaintName || 'Informant'}
Mobile Contact: __________________________
Address: __________________________
Date of Submission: ${new Date().toLocaleDateString('en-IN')}`;

    setGeneratedDraft(draft);
  };

  const handleCopyDraft = () => {
    if (generatedDraft) {
      navigator.clipboard.writeText(generatedDraft);
      alert('FIR Draft copied to clipboard! You can paste, print, or share it.');
    }
  };

  return (
    <div className="flex flex-col w-full pb-12 space-y-4">
      {/* Header Banner */}
      <div className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e1e8f9] space-y-2">
        <div className="flex items-center gap-1.5 text-[#00696d]">
          <span className="material-symbols-outlined text-[20px]">menu_book</span>
          <span className="text-xs font-bold uppercase tracking-wider">Statutory Citizen Guide</span>
        </div>
        <h2 className="text-[22px] font-bold text-[#002046]">Filing an FIR Under BNS Section 173</h2>
        <p className="text-xs text-[#44474e] leading-relaxed">
          The First Information Report (FIR) sets the criminal law machinery in motion. Here is your constitutional entitlement, step-by-step procedure, and statutory remedies if an officer refuses registration.
        </p>
      </div>

      {/* 3 Core Statutory Rules Every Citizen Must Know */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[#e1e8f9] space-y-1 shadow-sm">
          <div className="flex items-center gap-2 text-[#ba1a1a]">
            <span className="material-symbols-outlined text-[20px]">mandatory_disclosures</span>
            <span className="text-xs font-bold">1. Mandatory Registration</span>
          </div>
          <p className="text-xs text-[#44474e] leading-relaxed">
            In <em>Lalita Kumari (2014)</em>, the Supreme Court held that registration of FIR is mandatory under Section 154 CrPC / BNS 173 if information discloses a cognizable offence.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[#e1e8f9] space-y-1 shadow-sm">
          <div className="flex items-center gap-2 text-[#00696d]">
            <span className="material-symbols-outlined text-[20px]">verified</span>
            <span className="text-xs font-bold">2. Free Copy is Your Right</span>
          </div>
          <p className="text-xs text-[#44474e] leading-relaxed">
            Police officers cannot charge money or create delays. A signed copy of the FIR must be handed over to you immediately and free of cost.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[#e1e8f9] space-y-1 shadow-sm">
          <div className="flex items-center gap-2 text-[#002046]">
            <span className="material-symbols-outlined text-[20px]">share_location</span>
            <span className="text-xs font-bold">3. Zero-FIR Anywhere</span>
          </div>
          <p className="text-xs text-[#44474e] leading-relaxed">
            No police station can reject your report citing territorial jurisdiction. They must file a Zero-FIR and transfer it to the jurisdictional police station.
          </p>
        </div>
      </div>

      {/* What If Police Refuse? Section */}
      <section className="bg-[#ffdad6] text-[#93000a] p-4 rounded-xl shadow-sm border border-[#ffb4ab] space-y-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[22px] text-[#ba1a1a]">report_problem</span>
          <h3 className="text-sm font-bold uppercase tracking-wider">What To Do If An Officer Refuses?</h3>
        </div>
        <p className="text-xs text-[#93000a] leading-relaxed">
          Refusal by a police officer to record information regarding cognizable offences (especially women/child safety offences) is itself punishable under Bharatiya Nyaya Sanhita. Follow this escalation ladder:
        </p>
        <div className="space-y-1.5 text-xs text-[#93000a] pt-1">
          <div className="flex items-start gap-2 bg-[#ffffff]/80 p-2 rounded-lg">
            <span className="font-bold text-[#ba1a1a]">Step A:</span>
            <span>Send the complaint in writing by Registered Speed Post to the <strong>Superintendent of Police (SP) / Commissioner</strong> under BNSS.</span>
          </div>
          <div className="flex items-start gap-2 bg-[#ffffff]/80 p-2 rounded-lg">
            <span className="font-bold text-[#ba1a1a]">Step B:</span>
            <span>If SP fails to direct investigation, file a formal complaint before the <strong>Judicial Magistrate</strong> under BNSS Section 175(3) requesting an order for police investigation.</span>
          </div>
          <div className="flex items-start gap-2 bg-[#ffffff]/80 p-2 rounded-lg">
            <span className="font-bold text-[#ba1a1a]">Step C:</span>
            <span>Call <strong>112</strong> immediately while at the station to generate an auditable dispatch ticket with police control room logs.</span>
          </div>
        </div>
      </section>

      {/* Interactive FIR Complaint Letter Builder */}
      <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e1e8f9] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00696d] text-[20px]">edit_document</span>
            <h3 className="text-[17px] font-bold text-[#002046]">Formal FIR Letter Builder</h3>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#94f2f7] text-[#002021] text-[10px] font-bold">
            Print-Ready
          </span>
        </div>
        <p className="text-xs text-[#44474e] leading-relaxed">
          Fill in these basic facts to generate a clean, legally structured complaint letter you can carry to the police station:
        </p>

        <form onSubmit={handleGenerateDraft} className="space-y-3 pt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#002046] block mb-1">Your Full Name (Informant)</label>
              <input
                type="text"
                required
                value={complaintName}
                onChange={(e) => setComplaintName(e.target.value)}
                placeholder="e.g. Ramesh Kumar Sharma"
                className="w-full bg-[#eff3ff] text-xs p-2.5 rounded-lg border border-[#e1e8f9] focus:outline-none focus:border-[#00696d]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#002046] block mb-1">Police Station Name</label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                placeholder="e.g. Cyber Crime Police Station / Local Station"
                className="w-full bg-[#eff3ff] text-xs p-2.5 rounded-lg border border-[#e1e8f9] focus:outline-none focus:border-[#00696d]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#002046] block mb-1">Date & Time of Incident</label>
              <input
                type="text"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                placeholder="e.g. 26 October 2026, 3:30 PM"
                className="w-full bg-[#eff3ff] text-xs p-2.5 rounded-lg border border-[#e1e8f9] focus:outline-none focus:border-[#00696d]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#002046] block mb-1">Location of Occurrence</label>
              <input
                type="text"
                value={incidentLocation}
                onChange={(e) => setIncidentLocation(e.target.value)}
                placeholder="e.g. Online UPI transfer at residential address"
                className="w-full bg-[#eff3ff] text-xs p-2.5 rounded-lg border border-[#e1e8f9] focus:outline-none focus:border-[#00696d]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#002046] block mb-1">Accused or Suspect Details (if known)</label>
            <input
              type="text"
              value={accusedDetails}
              onChange={(e) => setAccusedDetails(e.target.value)}
              placeholder="e.g. Mobile number 98XXXXXXXX, beneficiary UPI ID: fraud@upi, or Unknown"
              className="w-full bg-[#eff3ff] text-xs p-2.5 rounded-lg border border-[#e1e8f9] focus:outline-none focus:border-[#00696d]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#002046] block mb-1">Description of Incident & Financial / Physical Loss</label>
            <textarea
              rows={4}
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="State what occurred in clear chronological order. Mention financial loss, transaction UTR numbers, or nature of harassment."
              className="w-full bg-[#eff3ff] text-xs p-2.5 rounded-lg border border-[#e1e8f9] focus:outline-none focus:border-[#00696d]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#002046] text-[#ffffff] text-xs font-bold shadow-sm active:scale-95 transition-transform"
          >
            Generate Statutory FIR Complaint Draft
          </button>
        </form>

        {/* Generated Draft Output */}
        {generatedDraft && (
          <div className="mt-4 p-4 rounded-xl bg-[#eff3ff] border border-[#dbe3f3] space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#002046]">Generated Complaint Letter</span>
              <button
                onClick={handleCopyDraft}
                className="px-3 py-1.5 rounded-lg bg-[#00696d] text-[#ffffff] text-xs font-bold flex items-center gap-1 active:scale-95 shadow-sm"
              >
                <span className="material-symbols-outlined text-[14px]">content_copy</span>
                <span>Copy Draft</span>
              </button>
            </div>
            <pre className="text-[11px] text-[#141c28] font-mono whitespace-pre-wrap bg-[#ffffff] p-3 rounded-lg border border-[#e1e8f9] max-h-96 overflow-y-auto">
              {generatedDraft}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
};
