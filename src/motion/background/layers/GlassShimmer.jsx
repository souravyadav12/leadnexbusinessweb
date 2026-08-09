import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Ambient version of the card-level GlassReflection: a faint diagonal
 * sheen that sweeps across the whole section on a slow, continuous loop
 * rather than on hover — gives large glassy surfaces (hero panels,
 * dashboard mockups) a sense of a light source moving past.
 */
export default function GlassShimmer({ angle = 18, width = '25%', color = 'rgba(255,255,255,0.05)', duration = 12 }) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-y-0"
        style={{
          width,
          transform: `skewX(-${angle}deg)`,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
        initial={{ x: '-150%' }}
        animate={{ x: '400%' }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', repeatDelay: duration * 0.6 }}
      />
    </div>
  );
}
