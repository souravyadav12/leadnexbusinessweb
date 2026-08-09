import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * A single beat in the story. Activation is scroll-driven — each step
 * reports when it crosses the viewport's center band, which drives the
 * connector fill and the floating stage window in sync. No click-to-tab
 * carousel; the reader's scroll position *is* the interaction.
 */
export default function WorkflowStep({ step, index, total, active, onEnter }) {
  const { icon: Icon, title, description, tag } = step;
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <div ref={ref} className="relative pl-[3.25rem] py-6">
      <motion.div
        className={cn(
          'absolute left-0 top-6 w-[2.75rem] h-[2.75rem] rounded-full flex items-center justify-center border transition-colors duration-300',
          active ? 'bg-accent border-accent text-white' : 'bg-bg-card border-white/[0.1] text-text-secondary'
        )}
        animate={{ scale: active ? 1.08 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <Icon className="w-[1.15rem] h-[1.15rem]" strokeWidth={1.75} />
      </motion.div>

      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-mono-label text-[10px] text-text-tertiary">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        {tag && <span className="tag-bracket text-[10px] text-accent">{tag}</span>}
      </div>
      <h3
        className={cn(
          'text-lg lg:text-xl font-semibold transition-colors duration-300',
          active ? 'text-white' : 'text-white/50'
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          'text-sm mt-1.5 leading-relaxed max-w-sm transition-colors duration-300',
          active ? 'text-text-secondary' : 'text-text-tertiary/70'
        )}
      >
        {description}
      </p>
    </div>
  );
}
