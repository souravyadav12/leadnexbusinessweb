import { motion } from 'framer-motion';
import { maskReveal, maskRevealX, withDelay } from '../variants';
import { VIEWPORT_ONCE } from '../config';

/** Wipes an element into view via clip-path. Great for images, dividers, panels. */
export default function MaskReveal({
  children,
  as = 'div',
  direction = 'up', // 'up' | 'left'
  delay = 0,
  className,
  once = true,
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div;
  const base = direction === 'left' ? maskRevealX : maskReveal;
  return (
    <MotionTag
      variants={withDelay(base, delay)}
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
