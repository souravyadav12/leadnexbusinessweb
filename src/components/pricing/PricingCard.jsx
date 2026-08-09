import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';

/**
 * Replaces the floating "Most Popular" pill + checkmark list (the two
 * most-repeated pricing-template tells) with a corner-folded highlight
 * card and a plain dash list. The popular tier's distinction now comes
 * from a torn-corner fold + accent-lit left rule, not a badge sitting
 * on top of the card.
 */
export default function PricingCard({
  name,
  price,
  yearlyPrice,
  description,
  features,
  cta,
  popular = false,
  index,
  yearly,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col h-full overflow-hidden ${
        popular ? 'bg-gradient-to-b from-accent/[0.06] to-bg-card' : 'bg-bg-card'
      }`}
      style={{
        borderLeft: popular ? '2px solid var(--color-accent)' : '1px solid var(--color-border-subtle)',
        borderTop: '1px solid var(--color-border-subtle)',
        borderRight: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      {popular && (
        <div
          className="absolute top-0 right-0 w-10 h-10 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, var(--color-accent) 50%)',
            opacity: 0.9,
          }}
          aria-hidden="true"
        />
      )}

      <div className="p-6 lg:p-8 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
            <p className="text-sm text-text-secondary">{description}</p>
          </div>
          {popular && <span className="tag-bracket text-[10px] text-accent shrink-0 mt-1">Popular</span>}
        </div>

        <div className="mb-6 min-h-[3.75rem]">
          <div className="flex items-baseline gap-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={yearly ? 'yearly' : 'monthly'}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-editorial text-5xl text-white"
              >
                {yearly ? yearlyPrice : price}
              </motion.span>
            </AnimatePresence>
            <span className="text-text-secondary text-sm">/month</span>
          </div>
          <AnimatePresence>
            {yearly && price !== 'Custom' && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="text-xs text-success mt-1"
              >
                Save 20% with annual billing
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
              <span className="text-accent/60 mt-0.5 shrink-0 font-editorial">—</span>
              {f}
            </li>
          ))}
        </ul>

        <Button variant={popular ? 'primary' : 'secondary'} size="lg" className="w-full">
          {cta}
        </Button>
      </div>
    </motion.div>
  );
}
