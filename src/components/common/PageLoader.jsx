import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { useReducedMotion } from '../../motion/hooks/useReducedMotion';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDone(true);
      return;
    }
    let raf;
    let doneTimeout;
    // Purely a branded first-impression beat, not real asset loading — kept
    // short (600ms) so it never meaningfully delays LCP/TTI on a page with
    // nothing actually blocking to wait for.
    const DURATION = 600;
    const start = performance.now();
    const tick = (t) => {
      const elapsed = t - start;
      const pct = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        doneTimeout = setTimeout(() => setDone(true), 120);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(doneTimeout);
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-bg-primary flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            animate={{ rotate: [0, 12, 0, -12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-14 h-14 rounded-full bg-accent flex items-center justify-center"
          >
            <Sparkle className="w-7 h-7 text-white" strokeWidth={2.5} />
          </motion.div>
          <div className="w-48 h-px bg-white/10 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
