import { motion, useMotionValue, useSpring } from 'framer-motion';
import { SPRING } from '../config';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useRipple } from '../hooks/useRipple';
import Ripple from './Ripple';
import { cn } from '../../utils/cn';

/**
 * Pulls its contents toward the pointer within a radius (magnetic effect)
 * and shows a click ripple. Use for primary CTAs where a premium, tactile
 * feel matters — pair with `data-cursor="link"` on the child for the
 * custom cursor to react too.
 */
export default function MagneticButton({ children, strength = 0.4, className, ripple = true, ...rest }) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING.magnetic);
  const sy = useSpring(y, SPRING.magnetic);
  const { ripples, onPointerDown } = useRipple();

  const handleMove = (e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onPointerDown={ripple ? onPointerDown : undefined}
      style={{ x: sx, y: sy }}
      className={cn('relative inline-flex', className)}
      {...rest}
    >
      {children}
      {ripple && <Ripple ripples={ripples} />}
    </motion.div>
  );
}
