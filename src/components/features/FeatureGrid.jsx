import {
  PhoneIncoming,
  PhoneOutgoing,
  Mic2,
  Globe,
  Link2,
  Disc3,
  BarChart3,
  FileText,
  CalendarCheck,
  BookOpen,
  Captions,
  GitBranch,
} from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: PhoneIncoming,
    title: 'Inbound Calling',
    description: 'Automatically answer every inbound call with an AI agent that understands context, routes intelligently, and resolves issues instantly. Trained on your playbooks from day one.',
    size: 'lg',
    liveWidget: 'calls',
  },
  {
    icon: PhoneOutgoing,
    title: 'Outbound Calling',
    description: 'Run large-scale outbound campaigns with AI agents that adapt their pitch and qualify leads in real-time.',
  },
  {
    icon: Mic2,
    title: 'Voice Cloning',
    description: 'Custom voice profiles that match your brand identity.',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    description: 'Serve customers in 30+ languages with native-sounding AI voices and automatic detection.',
    size: 'md',
  },
  {
    icon: Link2,
    title: 'CRM Integration',
    description: 'Connect with Salesforce, HubSpot, Pipedrive, and 50+ tools.',
  },
  {
    icon: Disc3,
    title: 'Call Recording',
    description: 'Record, store, and review every conversation with full compliance.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Track conversion, duration, sentiment, and ROI with real-time dashboards and custom reports built for revenue teams.',
    size: 'lg',
    liveWidget: 'analytics',
  },
  {
    icon: FileText,
    title: 'AI Call Summary',
    description: 'Instant AI-generated summaries after every call, with action items.',
  },
  {
    icon: CalendarCheck,
    title: 'Meeting Booking',
    description: 'AI checks availability and books meetings on the spot.',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Base',
    description: 'Train your AI on custom docs, FAQs, and product knowledge for accurate, on-brand responses every time.',
    size: 'md',
  },
  {
    icon: Captions,
    title: 'Realtime Transcription',
    description: 'Live speech-to-text with 99% accuracy, fully searchable.',
  },
  {
    icon: GitBranch,
    title: 'Smart Routing',
    description: 'Intent-based routing with seamless human escalation.',
  },
];

export default function FeatureGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4 lg:gap-6">
      {features.map((feature, i) => (
        <FeatureCard key={feature.title} {...feature} index={i} />
      ))}
    </div>
  );
}
