import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Gentle infinite float/drift, for badges, cards, orbs, decorative icons.
 * Disabled entirely under prefers-reduced-motion rather than just slowed —
 * ambient looping motion is exactly the category that spec calls out.
 */
export default function FloatingMotion({
  children,
  as = 'div',
  distance = 12,
  duration = 4,
  delay = 0,
  axis = 'y', // 'y' | 'x' | 'both'
  rotate = 0,
  className,
  ...rest
}) {
  const reducedMotion = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reducedMotion) {
    return (
      <MotionTag className={className} {...rest}>
        {children}
      </MotionTag>
    );
  }

  const animate = {
    ...(axis === 'y' || axis === 'both' ? { y: [0, -distance, 0] } : {}),
    ...(axis === 'x' || axis === 'both' ? { x: [0, distance, 0] } : {}),
    ...(rotate ? { rotate: [0, rotate, 0, -rotate, 0] } : {}),
  };

  return (
    <MotionTag
      className={className}
      animate={animate}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
