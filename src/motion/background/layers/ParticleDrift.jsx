import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * A sparse field of tiny drifting light specks — dust in a light beam,
 * not confetti. Count is intentionally low; positions/timings are
 * generated once per mount with a seeded RNG so they don't jump around
 * on re-render.
 */
export default function ParticleDrift({ count = 14, color = 'rgba(255,255,255,0.5)', seed = 42 }) {
  const reducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    const rand = seededRandom(seed);
    return Array.from({ length: count }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      size: 1 + rand() * 2,
      duration: 14 + rand() * 16,
      delay: rand() * 8,
      drift: 20 + rand() * 40,
    }));
  }, [count, seed]);

  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
          }}
          animate={{
            y: [0, -p.drift, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  );
}
