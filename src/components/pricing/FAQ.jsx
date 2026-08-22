import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

const faqs = [
  { cat: 'General', q: 'How quickly can I set up LeadNex AI?', a: 'Most teams are up and running in under 5 minutes. Simply connect your phone system, upload your knowledge base, and configure your AI agent. Our onboarding team provides hands-on support for enterprise deployments.' },
  { cat: 'Technical', q: 'Is the AI voice really indistinguishable from humans?', a: 'Yes. Our proprietary voice models achieve a 98.7% human-likeness score in blind tests. We offer 50+ natural voices across 30+ languages, plus custom voice cloning for enterprise clients.' },
  { cat: 'General', q: "What happens when the AI can't handle a question?", a: 'LeadNex AI seamlessly escalates to a human agent when it detects complex situations, high-emotion conversations, or topics outside its knowledge base. The handoff is smooth and contextual — the human agent receives the full transcript and summary.' },
  { cat: 'Pricing', q: 'How does pricing work for high-volume calling?', a: 'Our Growth and Enterprise plans are designed for scale. Enterprise clients receive custom per-minute pricing that decreases with volume. Contact our sales team for a personalized quote based on your expected call volume.' },
  { cat: 'Technical', q: 'Can LeadNex AI integrate with my existing CRM?', a: 'Absolutely. We offer native integrations with Salesforce, HubSpot, Pipedrive, Zoho, and 50+ other tools. Our REST API and webhooks enable custom integrations with any system.' },
  { cat: 'Security', q: 'Is my data secure and compliant?', a: 'Yes. LeadNex AI is SOC 2 Type II certified, GDPR compliant, and HIPAA ready. All data is encrypted with AES-256 at rest and TLS 1.3 in transit. We never use your data to train our models.' },
];

const TABS = ['All', 'General', 'Technical', 'Pricing', 'Security'];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [query, setQuery] = useState('');

  // 3D Parallax Mouse Tracker
  const cardRef = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const rotX = useTransform(sy, [0, 1], [3, -3]);
  const rotY = useTransform(sx, [0, 1], [-3, 3]);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseLeave = () => { mx.set(0.5); my.set(0.5); };

  const filtered = useMemo(() => {
    return faqs.filter(f => {
      const matchesTab = activeTab === 'All' || f.cat === activeTab;
      const matchesQuery = query === '' || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [activeTab, query]);

  return (
    <div className="mt-24 w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-[10px] font-mono tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full mb-3 inline-block">
          FAQ / SUPPORT
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-lg mt-3">
          Everything you need to know about deploying and scaling LeadNex AI.
        </p>
      </div>

      {/* Search input */}
      <div className="relative mb-5 max-w-xl mx-auto">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
        <input
          type="text"
          placeholder="Search questions..."
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(null); }}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:border-accent/40 transition-colors"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 justify-center flex-wrap mb-8">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setOpen(null); }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
              activeTab === tab
                ? 'bg-accent text-white shadow-md shadow-accent/25'
                : 'bg-white/[0.04] border border-white/[0.08] text-text-secondary hover:text-white hover:bg-white/[0.07]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3D FAQ Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
        className="rounded-2xl border border-white/[0.08] bg-[#0b0d14]/90 backdrop-blur-xl overflow-hidden divide-y divide-white/[0.06] shadow-2xl relative group/faq will-change-transform"
      >
        {/* Dynamic cursor spotlight */}
        <div
          className="absolute pointer-events-none w-[350px] h-[350px] bg-accent/5 rounded-full blur-[100px] transition-opacity duration-300 opacity-0 group-hover/faq:opacity-100"
          style={{ left: `${coords.x - 175}px`, top: `${coords.y - 175}px` }}
        />

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-10 text-center text-sm text-text-secondary"
            >
              No questions match your search.
            </motion.div>
          ) : (
            filtered.map((faq, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`relative transition-all duration-300 z-10 ${isOpen ? 'border-l-2 border-accent' : 'border-l-2 border-transparent'}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={`w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer group transition-colors duration-200 ${isOpen ? 'bg-white/[0.02]' : 'hover:bg-white/[0.015]'}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                  >
                    <div className="flex items-center gap-4 sm:gap-6 flex-1 pr-4">
                      <span className={`text-xs font-mono w-6 text-left transition-colors duration-200 shrink-0 ${isOpen ? 'text-accent font-bold' : 'text-text-secondary'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <span className={`text-xs font-mono uppercase tracking-wider mr-2 px-1.5 py-0.5 rounded ${
                          faq.cat === 'Security' ? 'text-success/70 bg-success/5' :
                          faq.cat === 'Pricing' ? 'text-warning/70 bg-warning/5' :
                          faq.cat === 'Technical' ? 'text-cyan-400/70 bg-cyan-400/5' :
                          'text-accent/70 bg-accent/5'
                        }`}>{faq.cat}</span>
                        <span className={`text-sm sm:text-base font-semibold transition-colors duration-200 ${isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                          {faq.q}
                        </span>
                      </div>
                    </div>
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 shrink-0 ${isOpen ? 'border-accent/40 bg-accent/10 text-accent rotate-180' : 'border-white/10 bg-white/[0.02] text-text-secondary group-hover:border-white/20 group-hover:text-white'}`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        initial={{ height: 0, opacity: 0, y: -4 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -4 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-14 sm:pl-16 pr-6 sm:pr-8 pb-5 sm:pb-6 text-xs sm:text-sm text-text-secondary leading-relaxed max-w-3xl">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
