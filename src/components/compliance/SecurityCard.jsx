import { motion } from 'framer-motion';

/**
 * A single row in the compliance ledger — replaces the icon-in-a-rounded-
 * square card grid (the single most common "trust badge" template pattern)
 * with a dense, document-like row: a monospace code, the icon reduced to
 * a small inline mark, title and description running inline like an audit
 * entry rather than a marketing card.
 */
export default function SecurityCard({ icon: Icon, code, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
      className="group py-5 border-b border-white/[0.06] hover:border-accent/25 transition-colors sm:grid sm:grid-cols-[4rem_2rem_11rem_1fr] sm:items-start sm:gap-x-3"
    >
      <div className="flex items-center gap-3 sm:contents">
        <span className="text-mono-label text-[10px] text-text-tertiary sm:pt-0.5 shrink-0">{code}</span>
        <Icon className="w-4 h-4 text-accent/70 group-hover:text-accent transition-colors sm:mt-0.5 shrink-0" strokeWidth={1.5} />
        <h3 className="text-sm font-semibold text-white sm:hidden">{title}</h3>
      </div>
      <h3 className="hidden sm:block text-sm font-semibold text-white">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed mt-1.5 sm:mt-0">{description}</p>
    </motion.div>
  );
}
