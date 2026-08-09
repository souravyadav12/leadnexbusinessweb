import { motion } from 'framer-motion';
import { sectionTransition } from '../variants';
import { VIEWPORT_ONCE } from '../config';

/**
 * Wraps an entire <section>. Fades/springs the section up as a whole and,
 * because it sets `staggerChildren`, any direct motion children using
 * variants (e.g. fadeUp items with no explicit viewport trigger of their
 * own) will cascade in automatically. For finer control inside a section,
 * nest FadeUp/BlurReveal components instead — they trigger independently.
 */
export default function SectionTransition({ children, as = 'section', className, once = true, ...rest }) {
  const MotionTag = motion[as] ?? motion.section;
  return (
    <MotionTag
      variants={sectionTransition}
      initial="hidden"
      whileInView="show"
      viewport={{ ...VIEWPORT_ONCE, once }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
