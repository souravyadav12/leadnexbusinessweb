import { useEffect, useRef, useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import DemoPhone from './DemoPhone';
import Background from '../../motion/background/Background';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Headphones, BarChart3, Clock, Database, GitBranch, Radio, Sparkles } from 'lucide-react';
import GlassShimmer from '../../motion/background/layers/GlassShimmer';

const highlights = [
  {
    icon: Headphones,
    title: 'Natural Voice',
    desc: 'Indistinguishable from human agents',
    tag: '99.4% Match',
    color: 'from-accent to-accent-secondary',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    desc: 'Track every conversation metric',
    tag: 'Live Sync',
    color: 'from-success to-accent',
  },
  {
    icon: Clock,
    title: 'Instant Response',
    desc: '< 300ms latency on every call',
    tag: '<300ms Delay',
    color: 'from-warning to-accent-secondary',
  },
];

const liveLogs = [
  "Inbound call qualified: VP of Sales (TechFlow)",
  "Meeting booked: Thursday at 2:00 PM with Dr. Smith",
  "Outbound call qualified: 94% BANT Match (Apex Realty)",
  "CRM sync complete: Lead status changed to Qualified",
  "Uptime check: All 12 edge nodes operational (99.99% SLA)",
  "Outbound campaign active: 150 concurrent calls connected"
];

const integrationLogos = [
  { name: 'Salesforce', icon: Database },
  { name: 'HubSpot', icon: GitBranch },
  { name: 'Twilio', icon: Radio },
  { name: 'Zapier', icon: Sparkles }
];

export default function DemoSection() {
  const cardRef = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });

  const rotX = useTransform(sy, [0, 1], [6, -6]);
  const rotY = useTransform(sx, [0, 1], [-6, 6]);

  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % liveLogs.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <section id="demo" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-bg-primary" aria-label="Interactive demo">
      {/* Background with subtle indigo radial glow and gridlines */}
      <div 
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, #5B7CFA 0%, transparent 65%),
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 32px 32px, 32px 32px',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <SectionTitle
          index="01"
          badge="Live Demo"
          title="Experience the AI"
          titleAccent="In Action"
          subtitle="Try our AI calling agent yourself. Select a scenario, start the call, and watch the conversation unfold in real-time."
          className="mb-10 lg:mb-14"
        />

        {/* 12-Column Responsive Grid Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          
          {/* Left Column: Demo Console Wrapper (7 Columns) */}
          <div className="lg:col-span-7 w-full flex justify-center lg:justify-start">
            <DemoPhone />
          </div>

          {/* Right Column: Features Display Card (5 Columns) */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 w-full glass rounded-2xl border border-indigo-500/25 p-5 sm:p-6 flex flex-col justify-start relative group/content shadow-2xl shadow-indigo-950/10 will-change-transform"
          >
            {/* Local Glow */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-[60px] pointer-events-none group-hover/content:bg-accent/10 transition-colors duration-500" />
            
            <GlassShimmer duration={8} width="25%" />

            <div className="flex items-center gap-2 mb-2 relative z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-semibold">
                Platform Advantages
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-[1.65rem] font-bold text-white tracking-tight leading-tight relative z-10">
              See Why Teams Switch to{' '}
              <span className="gradient-text">LeadNex AI</span>
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[540px] mt-2 relative z-10">
              Our AI agents handle complex multi-turn conversations with contextual understanding,
              sentiment analysis, and real-time decision making. Every call is an opportunity.
            </p>

            {/* Highlights Grid */}
            <div className="space-y-2.5 mt-4 relative z-10">
              {highlights.map(({ icon: Icon, title, desc, tag, color }) => (
                <div
                  key={title}
                  className="group/card relative flex items-center justify-between gap-4 p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] hover:border-accent/20 hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-accent/5 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-transparent group-hover/card:bg-accent transition-all duration-300" />
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} bg-opacity-10 p-[1px] flex items-center justify-center flex-shrink-0 group-hover/card:scale-105 transition-all duration-300`}>
                      <div className="w-full h-full rounded-[7px] bg-[#0A0A0D]/90 flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5 text-white/90 group-hover/card:text-accent transition-colors" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-white/95 leading-snug group-hover/card:text-white transition-colors">
                        {title}
                      </div>
                      <div className="text-[11px] sm:text-xs text-text-secondary leading-normal mt-0.5">
                        {desc}
                      </div>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex items-center text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-white/[0.04] text-text-secondary border border-white/[0.08] group-hover/card:text-accent group-hover/card:border-accent/20 group-hover/card:bg-accent/5 transition-all duration-300 shrink-0">
                    {tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Live Performance Stats Panel */}
            <div className="mt-4 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.04] relative overflow-hidden z-10">
              <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-accent/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider font-semibold">
                    Live System Performance
                  </span>
                </div>
                <span className="text-[9px] text-text-tertiary">Edge Node: Global</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-[9px] text-text-secondary font-mono">Response Speed</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5 flex items-baseline gap-1">
                    280ms
                    <span className="text-[8px] text-success font-medium">↓ 12%</span>
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-text-secondary font-mono">Speech Accuracy</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5 flex items-baseline gap-1">
                    99.8%
                    <span className="text-[8px] text-success font-medium">↑ 0.2%</span>
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-text-secondary font-mono">Simultaneous Calls</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5 flex items-baseline gap-1">
                    8,420
                    <span className="text-[8px] text-accent font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time CRM Log Ticker */}
            <div className="mt-3.5 p-2.5 rounded-lg bg-black/40 border border-white/[0.04] flex items-center justify-between gap-3 text-[10px] font-mono relative z-10">
              <div className="flex items-center gap-2 text-text-secondary truncate w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping flex-shrink-0" />
                <span className="text-white/80 font-bold shrink-0">[Log Feed]</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={logIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="truncate text-text-secondary/90"
                  >
                    {liveLogs[logIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-accent text-[9px] font-bold whitespace-nowrap">Active</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Integration Status Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-6">
          <div className="text-xs font-mono text-text-secondary uppercase tracking-wider">
            Connected Integrations:
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {integrationLogos.map(({ name, icon: Icon }) => (
              <div key={name} className="flex items-center gap-2 text-text-secondary/60 hover:text-white transition-colors duration-200">
                <Icon className="w-4.5 h-4.5 text-accent/80" />
                <span className="text-[11px] font-mono font-semibold tracking-wider uppercase">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
