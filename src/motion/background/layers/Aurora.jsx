import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function Aurora({ className = '', color = 'rgba(91,124,250,0.10)', secondColor = 'rgba(120,110,250,0.08)' }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <motion.div
        className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[140%] h-[80%] opacity-70"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${color} 0%, ${secondColor} 45%, transparent 75%)`,
        }}
        animate={
          reducedMotion
            ? undefined
            : {
                rotate: [0, 4, -3, 0],
                x: ['-1%', '1%', '-1%'],
              }
        }
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
