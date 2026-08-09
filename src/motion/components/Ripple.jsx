import { AnimatePresence, motion } from 'framer-motion';

/**
 * Purely visual — renders expanding click-ripples from a `ripples` array.
 * Pair with the `useRipple()` hook: spread its `onPointerDown` onto the
 * actual interactive element (button, card, etc.) and pass its `ripples`
 * here. Kept pointer-events-none so it never intercepts clicks itself.
 */
export default function Ripple({ ripples, color = 'rgba(255,255,255,0.35)' }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute rounded-full"
            style={{
              left: r.x - r.size / 2,
              top: r.y - r.size / 2,
              width: r.size,
              height: r.size,
              background: color,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
