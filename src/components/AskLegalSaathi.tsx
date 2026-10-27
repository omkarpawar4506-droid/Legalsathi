import React, { useState, useRef, useEffect } from 'react';
import { ScreenId, ChatMessage } from '../types';

interface AskLegalSaathiProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AskLegalSaathi: React.FC<AskLegalSaathiProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Namaste! I am LegalSaathi. I can help explain common legal procedures, consumer grievances, or connect you to verified statutory Indian helplines. What is your concern today?',
      time: 'Just now'
    },
    {
      id: 'user-demo',
      sender: 'user',
      text: 'I transferred money on UPI to a fake seller yesterday. How do I get it back?',
      time: '10:42 AM · Seen'
    },
    {
      id: 'bot-response-demo',
      sender: 'bot',
      text: 'Here are the immediate steps you should take under Indian banking regulations & national cyber safety procedures:',
      time: '10:42 AM',
      verifiedProtocol: true,
      statusBadge: 'Verified Protocol',
      steps: [
        {
          num: 1,
          title: 'Act Quickly (Golden Window)',
          badge: 'Urgent',
          badgeColor: 'bg-[#ffdbc9] text-[#753400]',
          desc: "Dial the National Cyber Financial Helpline 1930 immediately. If reported early, the portal directly alerts the beneficiary bank's nodal officer to freeze the fraudulent recipient account or wallet before funds are withdrawn."
        },
        {
          num: 2,
          title: 'Lodge Bank Grievance (Within 3 Days)',
          desc: 'File a written fraud report with your remitting bank & UPI provider (GPay, PhonePe, Paytm). Under RBI Circular on Limiting Customer Liability, timely reporting minimizes or eliminates customer liability. Keep your 12-digit UPI UTR number saved.'
        },
        {
          num: 3,
          title: 'File Formal Incident Acknowledgement',
          desc: 'Register a formal complaint at the official portal cybercrime.gov.in. Download the generated acknowledgment receipt for local cyber police documentation.'
        }
      ],
      sources:
        'Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs & RBI Master Direction on Electronic Banking Security.',
      actions: [
        { label: 'Call 1930 Desk', href: 'tel:1930', icon: 'call', variant: 'secondary' },
        {
          label: 'cybercrime.gov.in',
          href: 'https://cybercrime.gov.in',
          isExternal: true,
          icon: 'open_in_new',
          variant: 'outline'
        }
      ],
      showGuideLink: true
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showGuidePanel, setShowGuidePanel] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const suggestedQueries = [
    'What should I do after online fraud?',
    'Where can I raise a consumer complaint?',
    'How do I find free legal aid in India?',
    'What is a Zero-FIR and when is it filed?'
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showGuidePanel]);

  const handleSuggestedClick = (query: string) => {
    sendMessage(query);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim());
    setInputText('');
  };

  const sendMessage = async (userText: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: 'Just now · Sent'
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // First attempt server-side proxy endpoint if available
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          const botMsg: ChatMessage = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: data.reply,
            time: 'Just now',
            verifiedProtocol: true,
            statusBadge: 'Civic Guidance',
            sources: 'Statutory Indian Legal Database & Nyaaya Public Mission'
          };
          setMessages((prev) => [...prev, botMsg]);
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // Fallback to client-side structured legal responses
    }

    // Comprehensive realistic response engine for common legal questions
    setTimeout(() => {
      const botMsg = generateLocalLegalResponse(userText);
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const generateLocalLegalResponse = (query: string): ChatMessage => {
    const q = query.toLowerCase();

    if (q.includes('fir') || q.includes('police')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'Under Section 173 of the Bharatiya Nyaya Sanhita (BNS) and Section 154 CrPC jurisprudence, police are legally mandated to register an FIR for cognizable offences:',
        time: 'Just now',
        verifiedProtocol: true,
        statusBadge: 'BNS Section 173 Protocol',
        steps: [
          {
            num: 1,
            title: 'Demand a Free Copy of the FIR',
            desc: 'Under the law, a signed copy of the FIR must be provided to the informant immediately, free of cost. Check that all names, dates, and loss details are accurately transcribed.'
          },
          {
            num: 2,
            title: 'Invoke Zero-FIR if Station Declines Territory',
            desc: 'Any police station in India must register a Zero-FIR irrespective of place of occurrence and transfer it to the concerned police station thereafter.'
          },
          {
            num: 3,
            title: 'If Station In-Charge Refuses to Register',
            desc: 'Send substance of complaint in writing and by registered post to the Superintendent of Police (SP) or approach the Judicial Magistrate under BNS Section 175(3).'
          }
        ],
        sources: 'Bharatiya Nagarik Suraksha Sanhita (BNSS) & Ministry of Home Affairs Guidelines.',
        actions: [
          { label: 'Police: 112', href: 'tel:112', icon: 'call', variant: 'secondary' },
          { label: 'Open FIR Guide', icon: 'menu_book', variant: 'outline' }
        ]
      };
    }

    if (q.includes('consumer') || q.includes('refund') || q.includes('seller') || q.includes('defective') || q.includes('amazon') || q.includes('flipkart')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'Under the Consumer Protection Act, 2019, unreasonable refund denial or delivering defective goods is an Unfair Trade Practice with strict statutory recourse:',
        time: 'Just now',
        verifiedProtocol: true,
        statusBadge: 'CPA 2019 Redressal',
        steps: [
          {
            num: 1,
            title: 'Send 7-Day Written Notice to Seller',
            desc: 'Email the brand grievance officer with invoice, order ID, product photos, and customer care rejection trail. Give 7-14 days to rectify or refund.'
          },
          {
            num: 2,
            title: 'Call 1915 or File on NCH Portal',
            desc: 'The National Consumer Helpline mediates directly with registered corporate convergence partners without legal fees.'
          },
          {
            num: 3,
            title: 'Lodge Online Petition on e-Daakhil',
            desc: 'If unresolved within 30 days, file digitally on edaakhil.nic.in. No lawyer is required for claims up to ₹5 Lakhs, and decisions are legally binding.'
          }
        ],
        sources: 'Ministry of Consumer Affairs, Food & Public Distribution (e-Daakhil / NCH).',
        actions: [
          { label: 'Call 1915', href: 'tel:1915', icon: 'call', variant: 'secondary' },
          { label: 'consumerhelpline.gov.in', href: 'https://consumerhelpline.gov.in', isExternal: true, icon: 'open_in_new', variant: 'outline' }
        ]
      };
    }

    if (q.includes('legal aid') || q.includes('free lawyer') || q.includes('nalsa') || q.includes('advocate')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'Section 12 of the Legal Services Authorities Act, 1987 guarantees completely free, state-funded legal representation to eligible citizens:',
        time: 'Just now',
        verifiedProtocol: true,
        statusBadge: 'NALSA Sec 12',
        steps: [
          {
            num: 1,
            title: 'Who is Automatically Entitled to Free Aid',
            desc: 'Women, children, SC/ST citizens, industrial workmen, persons with disabilities, victims of trafficking, and prisoners in custody are eligible regardless of income.'
          },
          {
            num: 2,
            title: 'Income Ceiling for Other Citizens',
            desc: 'Citizens with annual household income under ₹1 Lakh to ₹3 Lakh (depending on state) are also entitled to free legal counsel.'
          },
          {
            num: 3,
            title: 'How to Connect Immediately',
            desc: 'Dial the National Legal Aid Toll-Free helpline 15100, or walk into the District Legal Services Authority (DLSA) office inside your local court complex.'
          }
        ],
        sources: 'National Legal Services Authority (NALSA) & Supreme Court Legal Services Committee.',
        actions: [
          { label: 'Call 15100', href: 'tel:15100', icon: 'call', variant: 'secondary' },
          { label: 'nalsa.gov.in', href: 'https://nalsa.gov.in', isExternal: true, icon: 'open_in_new', variant: 'outline' }
        ]
      };
    }

    // Default general civic response
    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `Regarding your query about "${query.slice(0, 50)}...", here is the plain-language civic guidance under Indian law:`,
      time: 'Just now',
      verifiedProtocol: true,
      statusBadge: 'Civic Overview',
      steps: [
        {
          num: 1,
          title: 'Preserve Key Documents & Chronology',
          desc: 'Keep receipts, bank statements, messages, notices, and communications with dates and times clearly preserved.'
        },
        {
          num: 2,
          title: 'Identify the Appropriate Statutory Forum',
          desc: 'Civil/consumer disputes go to NCH (1915) or e-Daakhil; cyber fraud goes to 1930; immediate physical safety goes to 112; free advice is available at 15100.'
        },
        {
          num: 3,
          title: 'Consult a Para-Legal Volunteer Free of Cost',
          desc: 'You can speak with an empanelled legal aid counsel toll-free at 15100 to review your exact rights before spending money on private litigation.'
        }
      ],
      sources: 'LegalSaathi Constitutional Literacy Framework & Statutory Indian Codes.',
      actions: [
        { label: 'NALSA: 15100', href: 'tel:15100', icon: 'call', variant: 'secondary' },
        { label: 'Emergency: 112', href: 'tel:112', icon: 'call', variant: 'outline' }
      ]
    };
  };

  const handleVoiceToggle = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser environment.');
      return;
    }
    try {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setVoiceActive(true);
      recognition.onend = () => setVoiceActive(false);
      recognition.onerror = () => setVoiceActive(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
        }
      };
      recognition.start();
    } catch (e) {
      console.error(e);
      setVoiceActive(false);
    }
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-4">
      {/* Status / Context Banner */}
      <div className="bg-[#eff3ff] rounded-xl p-3.5 shadow-sm flex flex-col gap-2 border border-[#e1e8f9]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00696d] animate-pulse"></div>
            <span className="text-xs font-bold text-[#002046] tracking-wide">Ask LegalSaathi</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdbc9] text-[#753400] text-[10px] font-bold">
            <span className="material-symbols-outlined text-[13px]">school</span>
            Prototype Demo
          </span>
        </div>
        <div className="flex items-start gap-2 bg-[#ffffff] rounded-lg p-2.5 border border-[#e1e8f9]/70">
          <span className="material-symbols-outlined text-[#74777f] text-[18px] shrink-0 mt-0.5">
            verified_user
          </span>
          <p className="text-[11px] text-[#44474e] leading-snug">
            Educational prototype inspired by Nyaaya's public legal mission. Generates plain-language civil & statutory summaries. Not formal advocate legal advice.
          </p>
        </div>
      </div>

      {/* Chat Thread */}
      <div className="flex flex-col space-y-3.5">
        {messages.map((msg, idx) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex gap-2 justify-end items-end animate-in fade-in">
                <div className="max-w-[85%] bg-[#1b365d] text-[#ffffff] rounded-2xl rounded-br-sm p-3.5 shadow-sm space-y-1">
                  <p className="text-xs md:text-sm leading-relaxed">{msg.text}</p>
                  <div className="text-right">
                    <span className="text-[10px] text-[#aec7f7] opacity-80">{msg.time}</span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#dbe3f3] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#002046] text-[15px]">person</span>
                </div>
              </div>
            );
          }

          // Bot message
          return (
            <div key={msg.id} className="flex gap-2.5 items-start animate-in fade-in">
              <div className="w-8 h-8 rounded-full bg-[#002046] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <span className="material-symbols-outlined text-[#ffffff] text-[18px]">balance</span>
              </div>
              <div className="flex-1 space-y-2.5">
                <div className="bg-[#ffffff] p-3.5 rounded-2xl rounded-tl-sm shadow-sm space-y-2.5 border border-[#e1e8f9]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#002046]">LegalSaathi</span>
                      {msg.statusBadge && (
                        <span className="inline-flex px-1.5 py-0.5 rounded-full bg-[#94f2f7] text-[#002021] text-[10px] font-bold">
                          {msg.statusBadge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#74777f]">{msg.time}</span>
                  </div>

                  <p className="text-xs md:text-sm text-[#141c28] leading-relaxed font-normal">
                    {msg.text}
                  </p>

                  {/* Structured action steps */}
                  {msg.steps && msg.steps.length > 0 && (
                    <div className="space-y-2 pt-0.5">
                      {msg.steps.map((st) => (
                        <div key={st.num} className="bg-[#eff3ff] rounded-xl p-2.5 space-y-1 border border-[#e1e8f9]/70">
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <div className="flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-[#002046] text-[#ffffff] flex items-center justify-center text-[10px] font-bold shrink-0">
                                {st.num}
                              </span>
                              <span className="text-xs font-bold text-[#002046]">{st.title}</span>
                            </div>
                            {st.badge && (
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  st.badgeColor || 'bg-[#ffdbc9] text-[#753400]'
                                }`}
                              >
                                {st.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#44474e] pl-6 leading-relaxed">{st.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Sources citation */}
                  {msg.sources && (
                    <div className="pt-1 flex items-start gap-1.5 bg-[#eff3ff] rounded-lg p-2 text-[#44474e] text-[11px]">
                      <span className="material-symbols-outlined text-[15px] text-[#00696d] shrink-0 mt-0.5">
                        menu_book
                      </span>
                      <span>
                        <strong>Sources:</strong> {msg.sources}
                      </span>
                    </div>
                  )}

                  {/* Action CTAs */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="pt-1 grid grid-cols-2 gap-2">
                      {msg.actions.map((act) => (
                        <a
                          key={act.label}
                          href={act.href}
                          target={act.isExternal ? '_blank' : undefined}
                          rel={act.isExternal ? 'noopener noreferrer' : undefined}
                          onClick={(e) => {
                            if (!act.href && act.label.includes('Guide')) {
                              e.preventDefault();
                              onNavigate('guide-cyber');
                            }
                          }}
                          className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-bold active:scale-95 transition-transform text-center shadow-sm ${
                            act.variant === 'secondary'
                              ? 'bg-[#00696d] text-[#ffffff]'
                              : 'bg-[#eff3ff] text-[#002046] border border-[#dbe3f3]'
                          }`}
                        >
                          {act.icon && (
                            <span className="material-symbols-outlined text-[16px]">{act.icon}</span>
                          )}
                          <span>{act.label}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Step-by-step guide sheet toggle */}
                  {msg.showGuideLink && (
                    <button
                      onClick={() => setShowGuidePanel((prev) => !prev)}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#eff3ff] text-[#002046] text-xs font-bold hover:bg-[#dbe3f3] transition-colors border border-[#e1e8f9]"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-[#00696d]">
                          fact_check
                        </span>
                        <span>View Full Cybercrime Step-by-Step Guide</span>
                      </span>
                      <span
                        className={`material-symbols-outlined text-[18px] transition-transform ${
                          showGuidePanel ? 'rotate-90' : ''
                        }`}
                      >
                        chevron_right
                      </span>
                    </button>
                  )}
                </div>

                {/* Welcome suggested query pills on first bot message */}
                {idx === 0 && (
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] text-[#44474e] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#00696d]">
                        tips_and_updates
                      </span>
                      Suggested Citizen Queries:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedQueries.map((sq) => (
                        <button
                          key={sq}
                          onClick={() => handleSuggestedClick(sq)}
                          className="px-2.5 py-1.5 rounded-full bg-[#eff3ff] hover:bg-[#dbe3f3] active:scale-95 transition-all text-left text-xs font-semibold text-[#1b365d] border border-[#e1e8f9]"
                        >
                          "{sq}"
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2.5 items-center">
            <div className="w-8 h-8 rounded-full bg-[#002046] flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[#ffffff] text-[18px]">balance</span>
            </div>
            <div className="bg-[#ffffff] px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 border border-[#e1e8f9]">
              <span className="w-2 h-2 rounded-full bg-[#00696d] animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-[#00696d] animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-[#00696d] animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-xs text-[#74777f] ml-1">Searching statutory framework...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Collapsible Cyber Fraud Recovery Checklist panel */}
      {showGuidePanel && (
        <div className="bg-[#ffffff] rounded-2xl p-4 shadow-md space-y-3 border border-[#e1e8f9] animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00696d] text-[22px]">
                assignment_turned_in
              </span>
              <h3 className="text-sm font-bold text-[#002046]">Cyber Fraud Recovery Checklist</h3>
            </div>
            <button
              onClick={() => setShowGuidePanel(false)}
              className="p-1 rounded-full text-[#74777f] hover:bg-[#eff3ff]"
              aria-label="Close checklist"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <div className="space-y-2">
            <label className="flex items-start gap-2.5 p-2 rounded-lg bg-[#eff3ff] cursor-pointer">
              <input defaultChecked className="mt-1 rounded text-[#00696d] focus:ring-0" type="checkbox" />
              <span className="text-xs text-[#141c28]">
                Captured screenshot of transaction reference ID (UTR) & chat history
              </span>
            </label>
            <label className="flex items-start gap-2.5 p-2 rounded-lg bg-[#eff3ff] cursor-pointer">
              <input defaultChecked className="mt-1 rounded text-[#00696d] focus:ring-0" type="checkbox" />
              <span className="text-xs text-[#141c28]">
                Called bank customer care to block linked UPI IDs & debit cards
              </span>
            </label>
            <label className="flex items-start gap-2.5 p-2 rounded-lg bg-[#eff3ff] cursor-pointer">
              <input className="mt-1 rounded text-[#00696d] focus:ring-0" type="checkbox" />
              <span className="text-xs text-[#141c28]">
                Recorded 1930 ticket number for district cyber cell follow-up
              </span>
            </label>
          </div>
          <button
            onClick={() => onNavigate('guide-cyber')}
            className="w-full py-2 bg-[#002046] text-[#ffffff] rounded-lg text-xs font-bold text-center block active:scale-95 transition-transform"
          >
            Open Complete Cybercrime Guide
          </button>
        </div>
      )}

      {/* Persistent Emergency & Helpline Floating Quick Triggers */}
      <div className="pt-1 flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <a
          href="tel:112"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#ffdad6] text-[#93000a] text-xs font-bold shrink-0 active:scale-95 transition shadow-sm border border-[#ffb4ab]"
        >
          <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">e911_emergency</span>
          <span>Police/All-in-one: <strong>112</strong></span>
        </a>
        <a
          href="tel:15100"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#94f2f7] text-[#002021] text-xs font-bold shrink-0 active:scale-95 transition shadow-sm border border-[#77d5da]"
        >
          <span className="material-symbols-outlined text-[16px]">gavel</span>
          <span>NALSA Legal Aid: <strong>15100</strong></span>
        </a>
      </div>

      {/* Bottom Message Input Dock */}
      <div className="sticky bottom-2 z-20 bg-[#ffffff] p-2 rounded-2xl shadow-lg space-y-2 border border-[#e1e8f9]">
        <form onSubmit={handleFormSubmit} className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => alert('Photo / document attachment: You can describe your document in the message.')}
            aria-label="Attach context or screenshot"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#74777f] hover:bg-[#eff3ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">attach_file</span>
          </button>
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your situation in simple words..."
              className="w-full bg-[#eff3ff] text-[#141c28] text-xs md:text-sm px-3.5 py-2.5 pr-8 rounded-full placeholder:text-[#74777f] focus:outline-none focus:bg-[#dbe3f3] transition-colors"
            />
            <button
              type="button"
              onClick={handleVoiceToggle}
              aria-label="Speech to text"
              className={`absolute right-2 p-1 transition-colors ${
                voiceActive ? 'text-[#ba1a1a] animate-pulse' : 'text-[#74777f] hover:text-[#00696d]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
          </div>
          <button
            type="submit"
            disabled={!inputText.trim()}
            aria-label="Send message"
            className="w-10 h-10 rounded-full bg-[#002046] text-[#ffffff] flex items-center justify-center active:scale-90 disabled:opacity-40 transition-transform shadow-sm shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>

        {/* Security & Privacy Reassurance Notice */}
        <div className="flex items-center justify-center gap-1.5 px-2">
          <span className="material-symbols-outlined text-[14px] text-[#ba1a1a]">lock_reset</span>
          <p className="text-[10px] text-[#74777f] leading-tight text-center">
            Never share OTP, PIN, or banking passwords. LegalSaathi responses are informational.
          </p>
        </div>
      </div>
    </div>
  );
};
