import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePointerSpring } from '../hooks/usePointerSpring';
import { SPRING } from '../config';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Fixed, viewport-tracking custom cursor dot that grows on hovering any
 * element tagged `data-cursor="link"|"card"` and hides over `data-cursor="hide"`.
 * Disabled on touch devices and under prefers-reduced-motion.
 */
export default function CursorLight() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hoverTarget, setHoverTarget] = useState(null);

  // Raw pixel-space motion values (idle off-screen), spring-smoothed.
  const { x, y, mx, my } = usePointerSpring({ mode: 'viewport', spring: SPRING.snappy, idleX: -100, idleY: -100 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer || reducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      const el = e.target.closest('[data-cursor]');
      setHoverTarget(el ? el.getAttribute('data-cursor') : null);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [reducedMotion, mx, my]);

  if (!enabled) return null;

  const isBig = hoverTarget === 'link' || hoverTarget === 'card';

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        animate={{
          width: isBig ? 64 : 16,
          height: isBig ? 64 : 16,
          opacity: hoverTarget === 'hide' ? 0 : 1,
        }}
        transition={SPRING.snappy}
        className="rounded-full bg-white"
      />
    </motion.div>
  );
}
