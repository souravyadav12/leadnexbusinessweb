import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { SPRING } from '../config';
import { useReducedMotion } from './useReducedMotion';

/**
 * Tracks pointer position relative to a target element (or the viewport)
 * and exposes it as spring-smoothed motion values. This is the single
 * primitive behind parallax, tilt, magnetic buttons, spotlight and the
 * cursor light — they all differ only in how they *use* {x, y}.
 *
 * @param {'viewport'|'element'} mode
 *   'viewport' — normalized -0.5..0.5 position within the window (parallax, cursor light)
 *   'element'  — normalized 0..1 position within the bound element's rect (tilt, spotlight)
 * @param {object} spring   framer-motion spring config, defaults to SPRING.trailing
 * @param {number} idleX/idleY  resting value returned when pointer leaves / on touch devices
 */
export function usePointerSpring({
  mode = 'viewport',
  spring = SPRING.trailing,
  idleX = mode === 'element' ? 0.5 : 0,
  idleY = mode === 'element' ? 0.5 : 0,
} = {}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const mx = useMotionValue(idleX);
  const my = useMotionValue(idleY);
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);

  const onPointerMove = (e) => {
    if (reducedMotion) return;
    if (mode === 'viewport') {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onPointerLeave = () => {
    mx.set(idleX);
    my.set(idleY);
  };

  return { ref, x, y, mx, my, onPointerMove, onPointerLeave, reducedMotion };
}
