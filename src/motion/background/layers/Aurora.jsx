import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * A wide, softly-blurred conic/linear gradient band that slowly rotates
 * and drifts, evoking an aurora wash across the top of a section. Distinct
 * from GradientMesh (isolated blobs) — this is one continuous ribbon.
 */
export default function Aurora({ className = '', color = 'rgba(91,124,250,0.10)', secondColor = 'rgba(120,110,250,0.08)' }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[140%] h-[80%] blur-[100px] opacity-70"
        style={{
          background: `linear-gradient(100deg, transparent 10%, ${color} 35%, ${secondColor} 55%, transparent 80%)`,
        }}
        animate={
          reducedMotion
            ? undefined
            : {
                rotate: [0, 6, -4, 0],
                x: ['-2%', '2%', '-2%'],
              }
        }
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
