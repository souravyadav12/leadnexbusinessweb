import { motion } from 'framer-motion';
import GradientBorder from '../common/GradientBorder';

/**
 * Editorial testimonial layout — removes the avatar-initial-circle and
 * uniform 5-star row (every entry rated 5 stars, so the stars conveyed
 * zero information — a tell of template filler content). The metric now
 * leads as a large serif pull-number, the quote follows as body copy,
 * and the byline is a plain underlined name/role line instead of a
 * circular avatar chip.
 */
export default function TestimonialCard({
  name,
  role,
  company,
  quote,
  metric,
  metricLabel,
  index,
  featured = false,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      className={className}
    >
      <GradientBorder className={`h-full flex flex-col ${featured ? 'p-7 lg:p-10 justify-center' : 'p-6'}`}>
        {/* Metric leads — the number is the headline, not a footnote */}
        <div className={`flex items-baseline gap-2 ${featured ? 'mb-6' : 'mb-4'}`}>
          <span className={`font-editorial text-accent leading-none ${featured ? 'text-6xl lg:text-7xl' : 'text-4xl'}`}>
            {metric}
          </span>
          <span className="text-mono-label text-[10px] text-text-tertiary max-w-[7rem] leading-tight">
            {metricLabel}
          </span>
        </div>

        {/* Quote */}
        <blockquote className={`text-text-secondary leading-relaxed mb-6 flex-1 ${featured ? 'text-lg lg:text-xl text-white/90' : 'text-sm'}`}>
          {quote}
        </blockquote>

        {/* Byline — underlined text, no avatar chip */}
        <div className="pt-4 border-t border-white/[0.07]">
          <div className="text-sm font-semibold text-white">{name}</div>
          <div className="text-xs text-text-tertiary text-mono-label mt-0.5">{role} · {company}</div>
        </div>
      </GradientBorder>
    </motion.div>
  );
}
