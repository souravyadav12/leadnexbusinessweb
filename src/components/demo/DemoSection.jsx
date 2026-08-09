import SectionTitle from '../common/SectionTitle';
import DemoPhone from './DemoPhone';
import Background from '../../motion/background/Background';
import { motion } from 'framer-motion';
import { Headphones, BarChart3, Clock } from 'lucide-react';

const highlights = [
  { icon: Headphones, title: 'Natural Voice', desc: 'Indistinguishable from human agents' },
  { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Track every conversation metric' },
  { icon: Clock, title: 'Instant Response', desc: '< 300ms latency on every call' },
];

export default function DemoSection() {
  return (
    <section id="demo" className="py-20 lg:py-24 relative" aria-label="Interactive demo">
      <Background preset="interactive" />

      <div className="section-padding relative">
        <SectionTitle
          index="01"
          badge="Live Demo"
          flip
          title="Experience the AI"
          titleAccent="In Action"
          subtitle="Try our AI calling agent yourself. Select a scenario, start the call, and watch the conversation unfold in real-time."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <DemoPhone />

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              See Why Teams Switch to{' '}
              <span className="gradient-text">LeadNex AI</span>
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Our AI agents handle complex multi-turn conversations with contextual understanding, 
              sentiment analysis, and real-time decision making. Every call is an opportunity — 
              and LeadNex never misses one.
            </p>

            <div className="space-y-4">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{title}</div>
                    <div className="text-sm text-text-secondary">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
