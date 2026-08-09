import { useState, useRef, useCallback } from 'react';
import { PhoneIncoming, Mic2, Target, CalendarCheck2, RefreshCw, TrendingUp } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import WorkflowStep from './WorkflowStep';
import WorkflowVisual from './WorkflowVisual';
import WorkflowConnector from './WorkflowConnector';
import Background from '../../motion/background/Background';

// The exact lead-to-close chain, one beat per stage.
const steps = [
  {
    icon: PhoneIncoming,
    tag: 'Lead arrives',
    title: 'A lead calls in',
    description: 'Inbound or outbound, the call reaches your AI agent instantly — no queue, no voicemail, no missed opportunity.',
  },
  {
    icon: Mic2,
    tag: 'AI answers',
    title: 'The AI answers',
    description: 'A natural, on-brand voice picks up on the first ring and starts a real conversation, not an IVR tree.',
  },
  {
    icon: Target,
    tag: 'Qualifies',
    title: 'It qualifies the lead',
    description: 'Budget, authority, need, and timeline are assessed live against your playbook — no manual scoring.',
  },
  {
    icon: CalendarCheck2,
    tag: 'Books meeting',
    title: 'A meeting gets booked',
    description: 'Qualified leads are scheduled directly onto your team\u2019s calendar before the call even ends.',
  },
  {
    icon: RefreshCw,
    tag: 'CRM updates',
    title: 'The CRM updates itself',
    description: 'Contact, stage, deal size, and next steps sync automatically \u2014 zero manual data entry.',
  },
  {
    icon: TrendingUp,
    tag: 'Analytics updates',
    title: 'Analytics reflect it live',
    description: 'Conversion, sentiment, and pipeline dashboards update in real time, so the next call is sharper.',
  },
];

export default function Workflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const handleEnter = useCallback((i) => setActiveIndex(i), []);

  return (
    <section id="workflow" className="py-20 lg:py-24 relative" aria-label="How LeadNex AI works">
      <Background preset="sectionAlt" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="section-padding relative">
        <SectionTitle
          index="02"
          badge="How It Works"
          title="One call, six things"
          titleAccent="happen automatically"
          subtitle="Scroll through the exact chain LeadNex AI runs on every single call \u2014 from the first ring to the dashboard reflecting it."
        />

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-start">
          <div ref={containerRef} className="relative">
            <WorkflowConnector containerRef={containerRef} />
            {steps.map((step, i) => (
              <WorkflowStep
                key={step.title}
                step={step}
                index={i}
                total={steps.length}
                active={i === activeIndex}
                onEnter={handleEnter}
              />
            ))}
          </div>

          <WorkflowVisual steps={steps} activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}
