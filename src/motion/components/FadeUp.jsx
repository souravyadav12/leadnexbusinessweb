import { motion } from 'framer-motion';
import { fadeUp, withDelay } from '../variants';
import { VIEWPORT_ONCE } from '../config';

/**
 * Fades and springs an element up into place as it enters the viewport.
 * Wrap any block-level content — this never re-implements its own transition.
 */
export default function FadeUp({ children, as = 'div', delay = 0, className, once = true, ...rest }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      variants={withDelay(fadeUp, delay)}
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
