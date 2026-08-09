import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * Editorial section masthead — replaces the centered badge/headline/subtitle
 * stack that every SaaS template ships (and that this project repeated
 * eight times identically). Composition is a two-column asymmetric grid:
 * a large ghost-outline index numeral anchors the left, a left-set
 * headline + kicker + subtitle fill the right. `flip` mirrors the numeral
 * to the right so consecutive sections don't read as the same template.
 */
export default function SectionTitle({
  index = '01',
  badge,
  title,
  titleAccent,
  subtitle,
  flip = false,
}) {
  const numeral = (
    <motion.div
      initial={{ opacity: 0, x: flip ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="numeral-ghost text-[7rem] sm:text-[9rem] lg:text-[11rem] select-none shrink-0"
      aria-hidden="true"
    >
      {index}
    </motion.div>
  );

  const copy = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn('flex-1 min-w-0', flip && 'lg:text-right')}
    >
      {badge && (
        <div className={cn('mb-4', flip && 'lg:flex lg:justify-end')}>
          <span className="tag-bracket text-[11px] text-accent">{badge}</span>
        </div>
      )}
      <h2 className="text-display text-3xl sm:text-4xl lg:text-5xl text-white">
        {title}{' '}
        <span className="font-editorial text-accent">{titleAccent}</span>
      </h2>
      {subtitle && (
        <p className={cn('text-text-secondary text-base lg:text-lg leading-relaxed max-w-xl mt-5', flip && 'lg:ml-auto')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );

  return (
    <div className="mb-14 lg:mb-20 flex items-start gap-6 lg:gap-10">
      {flip ? (
        <>
          {copy}
          <div className="hidden lg:block">{numeral}</div>
        </>
      ) : (
        <>
          <div className="hidden lg:block">{numeral}</div>
          {copy}
        </>
      )}
    </div>
  );
}
