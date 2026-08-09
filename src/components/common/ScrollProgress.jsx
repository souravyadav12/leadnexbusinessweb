import { motion, useScroll, useSpring } from 'framer-motion';
import { SPRING } from '../../motion/config';

/**
 * Reading-progress indicator. Gradient-filled and lightly glowing rather
 * than a flat single-color bar, so it reads as a deliberate piece of UI
 * rather than a leftover default browser progress affordance.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRING.snappy);

  return (
    <motion.div
      aria-hidden="true"
      role="progressbar"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] origin-left z-[60] bg-gradient-to-r from-accent via-accent to-accent-secondary shadow-[0_0_12px_rgba(91,124,250,0.6)]"
    />
  );
}
