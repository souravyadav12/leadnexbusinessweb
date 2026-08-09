import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * One or two long, thin, heavily-blurred diagonal light beams that sweep
 * across the section very slowly — like light through a gap in blinds.
 * Extremely low opacity by design; meant to be felt more than seen.
 */
export default function BeamLights({ count = 2, color = 'rgba(255,255,255,0.05)' }) {
  const reducedMotion = useReducedMotion();

  const beams = Array.from({ length: count }, (_, i) => ({
    width: 240 - i * 60,
    angle: -24 - i * 8,
    duration: 18 + i * 10,
    delay: i * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {beams.map((b, i) => (
        <motion.div
          key={i}
          className="absolute top-[-20%] h-[140%] blur-[60px]"
          style={{
            width: b.width,
            transform: `rotate(${b.angle}deg)`,
            background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
          }}
          initial={{ left: '-20%' }}
          animate={reducedMotion ? undefined : { left: ['-20%', '120%'] }}
          transition={{ duration: b.duration, repeat: Infinity, ease: 'linear', delay: b.delay }}
        />
      ))}
    </div>
  );
}
