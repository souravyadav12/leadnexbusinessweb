import { motion } from 'framer-motion';
import { blurReveal, withDelay } from '../variants';
import { VIEWPORT_ONCE } from '../config';

/** Un-blurs and fades an element into place as it enters the viewport. */
export default function BlurReveal({ children, as = 'div', delay = 0, className, once = true, ...rest }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      variants={withDelay(blurReveal, delay)}
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
