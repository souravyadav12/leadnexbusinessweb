import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * A hairline grid, masked to fade at the edges, that drifts extremely
 * slowly via backgroundPosition. Reads as texture/depth, not a pattern —
 * kept at very low opacity by design.
 */
export default function AnimatedGrid({ size = 56, opacity = 0.025, mask = 'radial-gradient(ellipse 75% 55% at 50% 30%, black, transparent)' }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: `${size}px ${size}px`,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
      animate={reducedMotion ? undefined : { backgroundPosition: [`0px 0px`, `${size}px ${size}px`] }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
    />
  );
}
