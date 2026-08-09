import { useCallback, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

let uid = 0;

/**
 * Manages a list of transient ripple instances anchored to click coordinates
 * within the bound element. Consumers render the returned `ripples` array
 * and call `onPointerDown` on the same element.
 */
export function useRipple({ duration = 700 } = {}) {
  const [ripples, setRipples] = useState([]);
  const reducedMotion = useReducedMotion();

  const onPointerDown = useCallback(
    (e) => {
      if (reducedMotion) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const id = uid++;
      const ripple = {
        id,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        size,
      };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, duration);
    },
    [duration, reducedMotion]
  );

  return { ripples, onPointerDown };
}
