import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function BlurLayers({ containerRef, parallax = true, tint = 'rgba(91,124,250,0.06)' }) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const enableParallax = parallax && containerRef && !reducedMotion;

  const slowY = useTransform(scrollYProgress, [0, 1], enableParallax ? ['-6%', '6%'] : ['0%', '0%']);
  const fastY = useTransform(scrollYProgress, [0, 1], enableParallax ? ['-14%', '14%'] : ['0%', '0%']);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-[-10%] left-[5%] w-[45%] h-[60%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${tint} 0%, transparent 70%)`,
          y: slowY,
        }}
      />
      <motion.div
        className="absolute bottom-[-15%] right-[0%] w-[40%] h-[55%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${tint} 0%, transparent 70%)`,
          y: fastY,
        }}
      />
    </div>
  );
}
