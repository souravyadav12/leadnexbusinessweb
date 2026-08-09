import { motion } from 'framer-motion';

const comparisons = [
  'Available 24/7/365',
  'Zero missed calls',
  'Instant lead qualification',
  'Handles 10,000+ concurrent calls',
  'Consistent brand voice',
  'Sub-second response time',
  'Automatic CRM updates',
  'Scales without hiring',
  'Multi-language support',
  'Cost per call under $0.10',
];

/**
 * Replaces the generic 3-column checkmark/X comparison table (classic
 * Bootstrap pricing-table iconography) with an editorial ledger: each row
 * is a single line with the "traditional" state rendered as a struck-through
 * ghost and the AI state as a lit accent mark — read top to bottom like a
 * spec sheet, not scanned left-to-right like a feature matrix.
 */
export default function USPSection() {
  return (
    <div className="mt-20 lg:mt-28 max-w-5xl mx-auto">
      <div className="flex items-baseline justify-between mb-8 gap-6">
        <span className="tag-bracket text-[11px] text-accent">Why LeadNex AI</span>
        <div className="flex items-center gap-6 text-[11px] text-mono-label">
          <span className="text-text-tertiary">Traditional</span>
          <span className="font-editorial text-base text-accent normal-case tracking-normal">vs</span>
          <span className="text-accent">LeadNex AI</span>
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        {comparisons.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: (i % 10) * 0.04 }}
            className="group flex items-center justify-between gap-6 py-4 border-b border-white/[0.05] hover:border-accent/20 transition-colors"
          >
            <span className="text-sm sm:text-base text-white/90">{item}</span>
            <div className="flex items-center gap-6 shrink-0">
              <span className="hidden sm:block w-6 h-px bg-white/15" aria-hidden="true" />
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(91,124,250,0.7)] group-hover:scale-125 transition-transform"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
