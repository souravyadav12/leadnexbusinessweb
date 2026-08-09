import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cn } from '../../utils/cn';

/**
 * Animated bar waveform. Accepts either live `levels` (e.g. from an audio
 * analyser) for reactive playback, or animates ambiently on its own when
 * `active` is true and no levels are supplied. Used for voice/call UI and
 * any "listening" indicator.
 */
export default function Waveform({
  bars = 32,
  levels, // optional number[] — externally driven (e.g. mic analyser)
  active = true,
  barClassName = 'bg-gradient-to-t from-accent to-accent-secondary',
  barWidth = 3,
  gap = 2,
  minHeight = 4,
  maxHeight = 28,
  className,
}) {
  const reducedMotion = useReducedMotion();
  const count = levels?.length ?? bars;

  return (
    <div
      className={cn('flex items-end justify-center', className)}
      style={{ gap, height: maxHeight }}
      role="img"
      aria-label="Waveform"
    >
      {Array.from({ length: count }).map((_, i) => {
        const level = levels?.[i];
        const driven = level !== undefined;

        if (reducedMotion) {
          return (
            <div
              key={i}
              className={cn('rounded-full', barClassName)}
              style={{ width: barWidth, height: driven ? level : active ? maxHeight * 0.4 : minHeight, opacity: active ? 1 : 0.4 }}
            />
          );
        }

        return (
          <motion.div
            key={i}
            className={cn('rounded-full', barClassName)}
            style={{ width: barWidth }}
            animate={
              driven
                ? { height: Math.max(minHeight, level) }
                : active
                  ? { height: [minHeight, Math.random() * (maxHeight - minHeight) + minHeight, minHeight], opacity: [0.5, 1, 0.5] }
                  : { height: minHeight, opacity: 0.3 }
            }
            transition={
              driven
                ? { duration: 0.12 }
                : active
                  ? { duration: 0.6 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.03 }
                  : { duration: 0.3 }
            }
          />
        );
      })}
    </div>
  );
}
