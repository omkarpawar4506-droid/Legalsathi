export type Language = 'en' | 'hi' | 'mr';

export type ScreenId =
  | 'home'
  | 'guide-cyber'
  | 'guide-consumer'
  | 'guide-safety'
  | 'ask'
  | 'fir'
  | 'aid'
  | 'desk';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  verifiedProtocol?: boolean;
  statusBadge?: string;
  steps?: {
    num: number;
    title: string;
    badge?: string;
    desc: string;
    badgeColor?: string;
  }[];
  sources?: string;
  actions?: {
    label: string;
    href?: string;
    isExternal?: boolean;
    icon?: string;
    variant?: 'primary' | 'secondary' | 'outline';
  }[];
  showGuideLink?: boolean;
}

export interface ScenarioAdvice {
  id: string;
  buttonLabel: string;
  tag: string;
  heading: string;
  desc: string;
  urgentHelpline?: string;
  portalUrl?: string;
}

export interface LegalTopic {
  id: string;
  title: string;
  statusBadge: string;
  badgeType: 'active' | 'preview' | 'directory';
  icon: string;
  description: string;
  tags: string[];
  screenTarget: ScreenId;
  readTime: string;
}

export interface DirectoryItem {
  id: string;
  name: string;
  subtext: string;
  helpline?: string;
  url: string;
  icon: string;
  badge?: string;
  isEmergency?: boolean;
}

export interface GlossaryTerm {
  term: string;
  hindi: string;
  marathi: string;
  definition: string;
  statute: string;
  practicalTip: string;
}
