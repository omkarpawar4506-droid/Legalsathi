import { LegalTopic, ScenarioAdvice, DirectoryItem, GlossaryTerm } from '../types';

export const LEGAL_TOPICS: LegalTopic[] = [
  {
    id: 'cyber',
    title: 'Online Fraud & Cybercrime',
    statusBadge: 'Active Guide',
    badgeType: 'active',
    icon: 'phonelink_lock',
    description: 'Immediate steps for unauthorized UPI debit, fake lottery links, SIM card hijacking, and freezing funds via the 1930 portal within the golden hour.',
    tags: ['UPI Fraud', 'SIM Swap', '1930 Hotline'],
    screenTarget: 'guide-cyber',
    readTime: '4 min read'
  },
  {
    id: 'safety',
    title: 'Harassment & Personal Safety',
    statusBadge: 'Active Guide',
    badgeType: 'active',
    icon: 'shield_person',
    description: 'Navigating POSH complaints at work, stalking evidence preservation, domestic violence remedies, and emergency police response rights.',
    tags: ['POSH Act', 'Zero FIR', 'Women Helpline 1091'],
    screenTarget: 'guide-safety',
    readTime: '5 min read'
  },
  {
    id: 'consumer',
    title: 'Consumer Rights & Claims',
    statusBadge: 'Active Guide',
    badgeType: 'active',
    icon: 'shopping_bag',
    description: 'What to do when e-commerce denies refunds, dealing with defective gadgets, and filing an online complaint through e-Daakhil without a lawyer.',
    tags: ['Refund Refusal', 'e-Daakhil', 'NCH 1915'],
    screenTarget: 'guide-consumer',
    readTime: '3 min read'
  },
  {
    id: 'labor',
    title: 'Employment & Labor Rights',
    statusBadge: 'Sample Preview',
    badgeType: 'preview',
    icon: 'badge',
    description: 'Unlawful contract termination, minimum wage statutes, gratuity dispute timelines, and formal notice recovery for salaried and contract workers.',
    tags: ['Severance', 'Gratuity', 'Notice Periods'],
    screenTarget: 'ask',
    readTime: '4 min read'
  },
  {
    id: 'family',
    title: 'Family, Property & Succession',
    statusBadge: 'Sample Preview',
    badgeType: 'preview',
    icon: 'diversity_1',
    description: "Daughters' coparcenary property shares, mutual consent divorce procedural steps, elder maintenance laws, and basic will validation.",
    tags: ['Succession', 'Maintenance', 'Parental Care'],
    screenTarget: 'ask',
    readTime: '6 min read'
  },
  {
    id: 'nalsa',
    title: 'Free Legal Aid & NALSA Services',
    statusBadge: 'Active Directory',
    badgeType: 'directory',
    icon: 'account_balance',
    description: 'Entitlement criteria under Legal Services Authorities Act Section 12 for free state advocates for women, children, workers, and undertrials.',
    tags: ['Free Advocate', 'Section 12', 'Lok Adalat'],
    screenTarget: 'aid',
    readTime: '3 min read'
  }
];

export const SCENARIOS: ScenarioAdvice[] = [
  {
    id: 'upi',
    buttonLabel: 'Lost money via UPI',
    tag: 'Action Window: 0 - 2 Hours',
    heading: 'Call 1930 & Alert Bank Immediately',
    desc: 'The cyber nodal officer can place a temporary debit lien on the recipient bank account before cash is withdrawn at an ATM. Note transaction reference (UTR) numbers.',
    urgentHelpline: '1930',
    portalUrl: 'https://cybercrime.gov.in'
  },
  {
    id: 'refuse',
    buttonLabel: 'Seller refused return',
    tag: 'Statutory Term: 30 Days Formal Notice',
    heading: 'Log Complaint On 1915 National Portal',
    desc: 'Under the Consumer Protection Act 2019, unreasonable return denial is an unfair trade practice. Generate a dispute docket number on consumerhelpline.gov.in.',
    urgentHelpline: '1915',
    portalUrl: 'https://consumerhelpline.gov.in'
  },
  {
    id: 'police',
    buttonLabel: 'Police refused FIR',
    tag: 'Legal Right: BNS Section 175(3)',
    heading: 'Send Written Complaint to SP / Magistrate',
    desc: 'Under Section 173 of Bharatiya Nyaya Sanhita, police are legally bound to register cognizable offences. If refused, post signed complaint by registered mail to Superintendent of Police or file under Sec 175(3).',
    urgentHelpline: '112',
    portalUrl: 'https://112.gov.in'
  },
  {
    id: 'deposit',
    buttonLabel: 'Landlord withheld deposit',
    tag: 'Model Tenancy Act Guidance',
    heading: 'Issue 15-Day Statutory Notice',
    desc: 'Security deposits must be refunded within 30 days of vacating after reasonable deduction. Unlawful withholding can be contested before Rent Authority / Small Causes Court.',
    urgentHelpline: '15100',
    portalUrl: 'https://nalsa.gov.in'
  }
];

export const DIRECTORY_PORTALS: DirectoryItem[] = [
  {
    id: 'cybercrime',
    name: 'National Cyber Crime Portal',
    subtext: 'cybercrime.gov.in • Helpline 1930',
    helpline: '1930',
    url: 'https://cybercrime.gov.in',
    icon: 'policy'
  },
  {
    id: 'consumer',
    name: 'National Consumer Helpline (NCH)',
    subtext: 'consumerhelpline.gov.in • Dial 1915',
    helpline: '1915',
    url: 'https://consumerhelpline.gov.in',
    icon: 'support'
  },
  {
    id: 'nalsa',
    name: 'National Legal Services Authority',
    subtext: 'nalsa.gov.in • 15100 (Free Aid Toll-Free)',
    helpline: '15100',
    url: 'https://nalsa.gov.in',
    icon: 'account_balance'
  },
  {
    id: 'erss',
    name: 'ERSS Single Emergency Response',
    subtext: '112.gov.in • Police, Fire, Ambulance',
    helpline: '112',
    url: 'https://112.gov.in',
    icon: 'emergency',
    isEmergency: true
  },
  {
    id: 'edaakhil',
    name: 'e-Daakhil Online Commission',
    subtext: 'edaakhil.nic.in • Digital Consumer Court',
    url: 'https://edaakhil.nic.in',
    icon: 'devices'
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Cognizable Offence',
    hindi: 'संज्ञेय अपराध',
    marathi: 'दखलपात्र गुन्हा',
    definition: 'A serious crime (e.g. theft, cyber fraud, assault) where a police officer has the legal authority to arrest without a warrant and MUST register an FIR immediately under BNS Section 173.',
    statute: 'Bharatiya Nagarik Suraksha Sanhita (BNSS) Sec 2(1)(g)',
    practicalTip: 'Police cannot ask you to wait or decline an FIR if the complaint discloses a cognizable offence.'
  },
  {
    term: 'Zero-FIR',
    hindi: 'जीरो एफआईआर',
    marathi: 'झिरो एफआयआर',
    definition: 'An FIR that can be filed at ANY police station in India, regardless of where the crime took place. The station registers it as "Zero" and transfers it to the jurisdictional station.',
    statute: 'Ministry of Home Affairs Advisory / Supreme Court Mandate',
    practicalTip: 'Never let police turn you away citing jurisdiction. Insist on a Zero-FIR if you are stranded or far from home.'
  },
  {
    term: 'Section 12 NALSA (Free Legal Aid)',
    hindi: 'मुफ्त कानूनी सहायता (धारा 12)',
    marathi: 'मोफत कायदेशीर मदत (कलम 12)',
    definition: 'Guarantees free legal representation by a qualified advocate at government cost for women, children, SC/ST citizens, industrial workers, undertrial prisoners, and persons with annual income under statutory threshold.',
    statute: 'Legal Services Authorities Act, 1987 (Sec 12)',
    practicalTip: 'Dial 15100 or visit your local Taluk / District Court complex to apply for a free legal aid advocate.'
  },
  {
    term: 'Unfair Trade Practice',
    hindi: 'अनुचित व्यापार व्यवहार',
    marathi: 'अयोग्य व्यापारी पद्धती',
    definition: 'Deceptive practices by sellers or platforms, such as refusing refund for defective items, charging above MRP, hidden cancellation penalties, or misleading claims.',
    statute: 'Consumer Protection Act 2019 (Sec 2(47))',
    practicalTip: 'Preserve order invoices and return request chats. Complain to NCH at 1915 first.'
  },
  {
    term: 'Bail & Anticipatory Bail',
    hindi: 'जमानत / अग्रिम जमानत',
    marathi: 'जामीन / अटकपूर्व जामीन',
    definition: 'Temporary conditional release of an accused from custody. Anticipatory bail can be sought from Sessions Court or High Court if there is genuine apprehension of arrest in a false or non-bailable accusation.',
    statute: 'BNSS Section 480 & Section 482',
    practicalTip: 'For bailable offences, getting bail at the police station is a matter of statutory right.'
  },
  {
    term: 'Coparcenary Rights',
    hindi: 'सहदायिकी अधिकार (पैतृक संपत्ति)',
    marathi: 'वारसाहक्क (वडिलोपार्जित मालमत्ता)',
    definition: 'Equal birthright of daughters in Hindu ancestral property, identical to sons, affirmed unconditionally by the Supreme Court of India in Vineeta Sharma (2020).',
    statute: 'Hindu Succession (Amendment) Act 2005 Sec 6',
    practicalTip: 'Daughters retain equal rights regardless of whether the father passed away before or after 2005.'
  }
];

export const TRANSLATIONS = {
  en: {
    appName: 'LegalSaathi',
    tagline: 'न्याय & सुरक्षा',
    emergencyRibbonTitle: 'EMERGENCY IMMEDIATE FIRST-AID',
    emergencyRibbonDesc: 'In immediate danger or physical threat? Reach state emergency networks instantly:',
    policeCall: 'Police / EMS: 112',
    cyberCall: 'Cyber Crime: 1930',
    heroTag: 'Constitutional Literacy For All',
    heroTitle: 'Understand Your Rights. Know Your Next Step.',
    heroSubtitle: 'Simple legal information, practical statutory guidance, and trusted resources to help you make dignified, informed decisions.',
    searchPlaceholder: 'Search a legal topic or describe your problem...',
    searchBtn: 'Search',
    suggested: 'Suggested:',
    exploreTopics: 'Explore Topics',
    officialHelplines: 'Official Helplines',
    civicFramework: 'Civic Framework',
    howItWorks: 'How LegalSaathi Works',
    step1Title: 'Choose Your Situation',
    step1Desc: 'Select a category or describe what occurred without fearing complex legal terms.',
    step2Title: 'Understand In Plain Language',
    step2Desc: 'View your exact legal rights, required evidence checklist, and time limits explained simply.',
    step3Title: 'Connect to Official Portals',
    step3Desc: 'File complaints directly through vetted government systems with no middlemen fees.',
    freeCitizenTool: 'Free Citizen Tool',
    firBannerTitle: 'New to Filing an FIR?',
    firBannerDesc: 'Learn what police must record under BNS Section 173 and what steps to take if an officer refuses registration.',
    viewFirChecklist: 'View FIR Checklist',
    browseByTopic: 'Browse By Topic',
    modulesCount: '6 Core Modules',
    zeroMiddlemen: 'Zero Middlemen',
    directoryTitle: 'Official Government Directory',
    instantOrientation: 'Need Instant Orientation?',
    instantOrientationDesc: 'Select your current situation to see the statutory timeline and primary agency responsible:',
    openPublicProject: 'Open Public Civic Project',
    disclaimer: 'LegalSaathi provides public legal awareness, rights simplification, and direct official redirection. It does not constitute formal judicial attorney advice nor do we accept payments on behalf of any citizen or agency.',
    disclaimerFooter: 'LegalSaathi is a civic legal literacy initiative. Content provided does not substitute professional judicial counsel or advocate representation.',
    askBtn: 'Ask LegalSaathi',
    tabRights: 'Know Rights',
    tabFir: 'FIR & Safety',
    tabAid: 'Legal Aid',
    tabDesk: 'My Desk'
  },
  hi: {
    appName: 'LegalSaathi',
    tagline: 'न्याय & सुरक्षा',
    emergencyRibbonTitle: 'आपातकालीन त्वरित सहायता',
    emergencyRibbonDesc: 'क्या आप खतरे या संकट में हैं? तुरंत राज्य आपातकालीन नेटवर्क से संपर्क करें:',
    policeCall: 'पुलिस / आपातकाल: 112',
    cyberCall: 'साइबर अपराध: 1930',
    heroTag: 'सभी के लिए संवैधानिक साक्षरता',
    heroTitle: 'अपने अधिकार समझें। सही कदम उठाएं।',
    heroSubtitle: 'सरल कानूनी जानकारी, व्यावहारिक मार्गदर्शन और आधिकारिक संसाधन ताकि आप सम्मानजनक निर्णय ले सकें।',
    searchPlaceholder: 'कानूनी विषय खोजें या अपनी समस्या लिखें...',
    searchBtn: 'खोजें',
    suggested: 'सुझाव:',
    exploreTopics: 'विषय देखें',
    officialHelplines: 'सरकारी हेल्पलाइन',
    civicFramework: 'नागरिक ढांचा',
    howItWorks: 'LegalSaathi कैसे काम करता है',
    step1Title: 'अपनी परिस्थिति चुनें',
    step1Desc: 'कठिन कानूनी शब्दों के बिना अपनी समस्या को सरल भाषा में चुनें।',
    step2Title: 'सरल भाषा में समझें',
    step2Desc: 'अपने कानूनी अधिकार, आवश्यक प्रमाण सूची और समय सीमा सरल रूप से जानें।',
    step3Title: 'आधिकारिक पोर्टलों से जुड़ें',
    step3Desc: 'बिना किसी दलाल या शुल्क के सीधे सत्यापित सरकारी पोर्टलों पर शिकायत दर्ज करें।',
    freeCitizenTool: 'मुफ्त नागरिक उपकरण',
    firBannerTitle: 'क्या आप पहली बार FIR दर्ज कर रहे हैं?',
    firBannerDesc: 'BNS धारा 173 के तहत पुलिस को क्या दर्ज करना आवश्यक है और यदि पुलिस मना करे तो क्या करें।',
    viewFirChecklist: 'FIR चेकलिस्ट देखें',
    browseByTopic: 'विषय अनुसार देखें',
    modulesCount: '6 प्रमुख मार्गदर्शिकाएँ',
    zeroMiddlemen: 'शून्य बिचौलिया',
    directoryTitle: 'आधिकारिक सरकारी निर्देशिका',
    instantOrientation: 'तुरंत दिशा-निर्देश चाहिए?',
    instantOrientationDesc: 'कानूनी समय-सीमा और जिम्मेदार एजेंसी देखने के लिए अपनी स्थिति चुनें:',
    openPublicProject: 'खुली जनहित नागरिक पहल',
    disclaimer: 'LegalSaathi जनहित में कानूनी जागरूकता और आधिकारिक सरकारी लिंक प्रदान करता है। यह औपचारिक वकील की सलाह नहीं है।',
    disclaimerFooter: 'LegalSaathi एक नागरिक कानूनी साक्षरता पहल है। यहाँ दी गई जानकारी पेशेवर कानूनी प्रतिनिधित्व का विकल्प नहीं है।',
    askBtn: 'LegalSaathi से पूछें',
    tabRights: 'अधिकार जानें',
    tabFir: 'FIR & सुरक्षा',
    tabAid: 'मुफ्त कानूनी मदद',
    tabDesk: 'मेरा डेस्क'
  },
  mr: {
    appName: 'LegalSaathi',
    tagline: 'न्याय & सुरक्षा',
    emergencyRibbonTitle: 'तातडीची मदत व सुरक्षा',
    emergencyRibbonDesc: 'धोका किंवा संकटात आहात? तात्काळ शासकीय आपत्कालीन यंत्रणेशी संपर्क साधा:',
    policeCall: 'पोलीस / आपत्कालीन: 112',
    cyberCall: 'सायबर गुन्हे: 1930',
    heroTag: 'सर्वांसाठी संविधानात्मक साक्षरता',
    heroTitle: 'आपले हक्क जाणा. योग्य पाऊल उचला.',
    heroSubtitle: 'सोपी कायदेशीर माहिती, मार्गदर्शक तत्त्वे आणि विश्वासार्ह शासकीय यंत्रणांची माहिती.',
    searchPlaceholder: 'कायदेशीर विषय शोधा किंवा समस्या लिहा...',
    searchBtn: 'शोधा',
    suggested: 'सुचवलेले:',
    exploreTopics: 'विषय पहा',
    officialHelplines: 'शासकीय हेल्पलाईन',
    civicFramework: 'नागरी कार्यपद्धती',
    howItWorks: 'LegalSaathi कसे कार्य करते',
    step1Title: 'तुमची समस्या निवडा',
    step1Desc: 'क्लिष्ट शब्दांशिवाय तुमची परिस्थिती सहजपणे निवडा.',
    step2Title: 'सोप्या भाषेत समजून घ्या',
    step2Desc: 'तुमचे हक्क, लागणारे पुरावे आणि कालावधी सहज समजून घ्या.',
    step3Title: 'अधिकृत पोर्टलशी जोडा',
    step3Desc: 'कोणत्याही मध्यस्थाशिवाय थेट शासकीय पोर्टलवर तक्रार नोंदवा.',
    freeCitizenTool: 'मोफत नागरी टूल',
    firBannerTitle: 'पहिल्यांदा FIR नोंदवत आहात?',
    firBannerDesc: 'BNS कलम 173 नुसार पोलिसांनी काय नोंदवले पाहिजे व नकार दिल्यास काय करावे ते शिका.',
    viewFirChecklist: 'FIR चेकलिस्ट पहा',
    browseByTopic: 'विषयानुसार मार्गदर्शक',
    modulesCount: '६ मुख्य मार्गदर्शक',
    zeroMiddlemen: 'शून्य मध्यस्थ',
    directoryTitle: 'अधिकृत शासकीय निर्देशिका',
    instantOrientation: 'तातडीचे मार्गदर्शन हवे आहे?',
    instantOrientationDesc: 'कायदेशीर मुदत आणि जबाबदार यंत्रणा पाहण्यासाठी परिस्थिती निवडा:',
    openPublicProject: 'खुली नागरी समाज चळवळ',
    disclaimer: 'LegalSaathi ही नागरी साक्षरता मोहीम आहे. ही अधिकृत वकिलाची न्यायालयीन सल्ला सेवा नाही.',
    disclaimerFooter: 'LegalSaathi ही जनहितार्थ कायदेशीर साक्षरता मोहीम आहे.',
    askBtn: 'LegalSaathi ला विचारा',
    tabRights: 'हक्क जाणा',
    tabFir: 'FIR आणि सुरक्षा',
    tabAid: 'मोफत मदत',
    tabDesk: 'माझा डेस्क'
  }
};
