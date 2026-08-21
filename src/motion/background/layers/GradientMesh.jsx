import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const TINTS = {
  accent: ['rgba(91,124,250,0.12)', 'rgba(143,152,168,0.09)', 'rgba(91,124,250,0.07)'],
  secondary: ['rgba(143,152,168,0.10)', 'rgba(91,124,250,0.08)', 'rgba(120,110,250,0.07)'],
  warm: ['rgba(250,170,91,0.08)', 'rgba(91,124,250,0.06)', 'rgba(250,120,120,0.05)'],
};

export default function GradientMesh({ tint = 'accent', className = '' }) {
  const reducedMotion = useReducedMotion();
  const colors = TINTS[tint] ?? TINTS.accent;

  const blobs = [
    { top: '-15%', left: '-10%', size: '60%', color: colors[0], duration: 22 },
    { top: '10%', right: '-12%', size: '50%', color: colors[1], duration: 26 },
    { bottom: '-20%', left: '25%', size: '45%', color: colors[2], duration: 30 },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
          }}
          animate={
            reducedMotion
              ? undefined
              : { scale: [1, 1.1, 1], opacity: [0.85, 1, 0.85] }
          }
          transition={{ duration: b.duration, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        />
      ))}
    </div>
  );
}
