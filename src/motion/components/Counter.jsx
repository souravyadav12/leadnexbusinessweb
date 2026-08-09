import { motion } from 'framer-motion';
import { useCountUpSpring } from '../hooks/useCountUpSpring';

/**
 * Animates a number counting up to `end` with spring physics once it enters
 * view, rather than a fixed-duration tween — the count settles naturally
 * instead of stopping abruptly.
 */
export default function Counter({ end, decimals = 0, prefix = '', suffix = '', className, spring }) {
  const { ref, display } = useCountUpSpring({ end, decimals, prefix, suffix, spring });
  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
