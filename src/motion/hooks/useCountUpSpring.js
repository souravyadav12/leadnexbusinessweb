import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SPRING } from '../config';
import { useReducedMotion } from './useReducedMotion';

/**
 * Drives a numeric value from 0 -> end using spring physics (rather than a
 * fixed-duration eased tween), triggered once the bound ref enters view.
 * Returns a ref to attach and a MotionValue<string> ready to render.
 */
export function useCountUpSpring({ end, decimals = 0, prefix = '', suffix = '', spring = SPRING.soft } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();
  const [settled, setSettled] = useState(false);

  const raw = useMotionValue(0);
  const smoothed = useSpring(raw, spring);
  const display = useTransform(smoothed, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      raw.set(end);
      setSettled(true);
      return;
    }
    raw.set(end);
    const unsub = smoothed.on('change', (v) => {
      if (Math.abs(v - end) < 10 ** -(decimals + 2)) setSettled(true);
    });
    return unsub;
  }, [inView, end, reducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, display, settled };
}
