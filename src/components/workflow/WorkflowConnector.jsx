import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { SPRING } from '../../motion/config';

/**
 * The vertical spine of the workflow story. Unlike a static connector line,
 * this fills and a glowing pulse travels down it in lockstep with scroll —
 * so "the workflow animates" means the product literally shows the lead
 * moving through each stage as you read, not a decorative squiggle.
 */
export default function WorkflowConnector({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 15%', 'end 75%'],
  });
  const progress = useSpring(scrollYProgress, SPRING.soft);
  const fillHeight = useTransform(progress, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`);
  const dotTop = fillHeight;
  const dotOpacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <div className="absolute left-[1.35rem] top-0 bottom-0 w-px" aria-hidden="true">
      {/* Track */}
      <div className="absolute inset-0 bg-white/[0.07]" />
      {/* Fill */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent to-accent-secondary"
        style={{ height: fillHeight }}
      />
      {/* Traveling pulse */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_16px_4px_rgba(91,124,250,0.55)]"
        style={{ top: dotTop, opacity: dotOpacity, translateY: '-50%' }}
      />
    </div>
  );
}
