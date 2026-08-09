import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cn } from '../../utils/cn';

const sheen = {
  rest: { x: '-150%' },
  hover: { x: '250%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * A diagonal light sheen that sweeps across an element on hover — the
 * "glass reflection" feel used on premium cards/buttons. Purely an overlay;
 * place inside a `relative overflow-hidden` parent that also carries
 * `initial="rest" whileHover="hover"` so the sheen variant propagates down.
 */
export default function GlassReflection({ className, angle = 20, width = '40%' }) {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]', className)}>
      <motion.div
        className="absolute inset-y-0"
        style={{
          width,
          transform: `skewX(-${angle}deg)`,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)',
        }}
        variants={reducedMotion ? undefined : sheen}
        initial="rest"
      />
    </div>
  );
}
