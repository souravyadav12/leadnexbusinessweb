import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { Check } from 'lucide-react';

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
  const monthlyPrice = parseInt(price.replace(/\D/g, '')) || null;
  const annualPrice = parseInt(yearlyPrice.replace(/\D/g, '')) || null;
  const annualSavings = monthlyPrice && annualPrice ? (monthlyPrice - annualPrice) * 12 : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.38, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
      className={`relative flex flex-col h-full overflow-hidden rounded-2xl transition-all duration-300 ${
        popular
          ? 'bg-gradient-to-b from-accent/[0.08] to-bg-card scale-[1.03] z-10'
          : 'bg-bg-card hover:bg-bg-elevated'
      }`}
      style={{
        border: popular
          ? '1px solid rgba(91,124,250,0.4)'
          : '1px solid var(--color-border-subtle)',
        boxShadow: popular ? 'var(--shadow-glow-popular)' : 'var(--shadow-soft)',
      }}
    >
      {/* MOST POPULAR banner */}
      {popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-accent via-purple-500 to-accent text-white text-[10px] font-bold tracking-[0.15em] uppercase text-center py-1.5 animate-shimmer">
          MOST POPULAR
        </div>
      )}

      <div className={`p-6 lg:p-8 flex flex-col h-full ${popular ? 'pt-10' : ''}`}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6 min-h-[3.75rem]">
          <div className="flex items-baseline gap-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={yearly ? 'yearly' : 'monthly'}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`font-editorial text-5xl ${popular ? 'text-accent' : 'text-white'}`}
              >
                {yearly ? yearlyPrice : price}
              </motion.span>
            </AnimatePresence>
            {price !== 'Custom' && (
              <span className="text-text-secondary text-sm">/month</span>
            )}
          </div>
          <AnimatePresence>
            {yearly && annualSavings && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="text-xs text-success mt-1 font-medium"
              >
                Save ${annualSavings}/year with annual billing
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
              <Check className={`w-4 h-4 mt-0.5 shrink-0 ${popular ? 'text-accent' : 'text-success/70'}`} />
              {f}
            </li>
          ))}
        </ul>

        <Button
          variant={popular ? 'primary' : 'secondary'}
          size="lg"
          className={`w-full ${popular ? 'shadow-lg shadow-accent/25' : ''}`}
        >
          {cta}
        </Button>
      </div>
    </motion.div>
  );
}
