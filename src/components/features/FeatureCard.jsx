import { motion } from 'framer-motion';
import GradientBorder from '../common/GradientBorder';
import FeatureLiveWidget from './FeatureLiveWidget';
import { cn } from '../../utils/cn';

/**
 * Bento-grid tile with the icon-in-a-rounded-square treatment removed —
 * that pattern is the single most recognizable "SaaS feature card" tell.
 * In its place: a small ghost-outline index number sits above the title,
 * and the icon shrinks to an inline mark beside the heading instead of
 * anchoring its own colored tile.
 */
export default function FeatureCard({ icon: Icon, title, description, index, size = 'sm', liveWidget }) {
  const spans = {
    lg: 'sm:col-span-2 lg:row-span-2',
    md: 'sm:col-span-2',
    sm: '',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={spans[size]}
    >
      <GradientBorder className={cn('h-full group flex flex-col', size === 'lg' ? 'p-8 justify-end min-h-[280px]' : 'p-6')}>
        <span className={cn('numeral-ghost block leading-none', size === 'lg' ? 'text-4xl mb-4' : 'text-2xl mb-3')}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex items-center gap-2.5 mb-2">
          <Icon className={cn('text-accent shrink-0', size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')} strokeWidth={1.5} />
          <h3 className={cn('font-semibold text-white', size === 'lg' ? 'text-2xl' : 'text-base')}>{title}</h3>
        </div>
        <p className={cn('text-text-secondary leading-relaxed', size === 'lg' ? 'text-base max-w-sm' : 'text-sm')}>{description}</p>
        {liveWidget && <FeatureLiveWidget variant={liveWidget} />}
      </GradientBorder>
    </motion.div>
  );
}
