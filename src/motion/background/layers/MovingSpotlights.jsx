import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * One or two radial "light pools" that drift along a slow, wide loop —
 * independent of the pointer (see MouseReactiveLighting for the
 * pointer-driven variant). Gives a section a sense of an unseen light
 * source moving overhead.
 */
export default function MovingSpotlights({ count = 2, color = 'rgba(91,124,250,0.06)', size = 600 }) {
  const reducedMotion = useReducedMotion();

  const spots = Array.from({ length: count }, (_, i) => ({
    duration: 24 + i * 6,
    delay: i * 3,
    path: i % 2 === 0 ? ['10%', '85%', '40%', '10%'] : ['90%', '20%', '60%', '90%'],
    pathY: i % 2 === 0 ? ['15%', '55%', '80%', '15%'] : ['70%', '30%', '10%', '70%'],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {spots.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[130px]"
          style={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          }}
          animate={
            reducedMotion
              ? { left: s.path[0], top: s.pathY[0] }
              : { left: s.path, top: s.pathY }
          }
          transition={reducedMotion ? undefined : { duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        />
      ))}
    </div>
  );
}
