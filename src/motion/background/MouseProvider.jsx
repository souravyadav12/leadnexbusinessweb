import { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const MouseContext = createContext(null);

/**
 * Tracks normalized (-0.5..0.5) pointer position with a single window
 * mousemove listener, shared via context. Every background layer across
 * every section reads from this instead of attaching its own listener —
 * with 10+ sections on the page that's the difference between one
 * listener and a dozen.
 */
export function MouseProvider({ children }) {
  const reducedMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const raf = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;
    const handle = (e) => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
        raf.current = null;
      });
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handle);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [mx, my, reducedMotion]);

  const value = useMemo(() => ({ mx, my, reducedMotion }), [mx, my, reducedMotion]);

  return <MouseContext.Provider value={value}>{children}</MouseContext.Provider>;
}

/**
 * Reads the shared raw mouse motion values. Falls back to static center
 * values (no listener) if used outside a MouseProvider, so background
 * layers never crash if someone forgets to wrap the app.
 */
export function useSharedMouse() {
  const ctx = useContext(MouseContext);
  const reducedMotion = useReducedMotion();
  const fallbackMx = useMotionValue(0);
  const fallbackMy = useMotionValue(0);
  if (ctx) return ctx;
  return { mx: fallbackMx, my: fallbackMy, reducedMotion };
}
