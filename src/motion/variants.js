import { SPRING, EASE, DURATION, stagger } from './config';

// ─────────────────────────────────────────────────────────────────────────
// Motion System — variants
// Reveal variants use eased opacity/filter/clip-path curves (spring physics
// on filter/clip-path is unsupported by the browser's compositor and looks
// wrong), everything else — position, scale — is spring-driven.
// ─────────────────────────────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { ...SPRING.default, opacity: { duration: DURATION.slow, ease: EASE.out } } },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -24 },
  show: { opacity: 1, y: 0, transition: { ...SPRING.default, opacity: { duration: DURATION.slow, ease: EASE.out } } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.base, ease: EASE.out } },
};

export const blurReveal = {
  hidden: { opacity: 0, filter: 'blur(14px)', y: 16 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: SPRING.default },
};

/** Wipe reveal via clip-path — used for image/media panels, underlines, dividers. */
export const maskReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0.4 },
  show: { clipPath: 'inset(0 0 0% 0)', opacity: 1, transition: { duration: DURATION.slower, ease: EASE.out } },
};

export const maskRevealX = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 },
  show: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: DURATION.slower, ease: EASE.out } },
};

export const slideReveal = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: SPRING.default },
};

export const slideRevealRight = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: SPRING.default },
};

/** Per-character / per-word reveal step, used inside TextReveal's stagger container. */
export const textUnitReveal = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.65, ease: EASE.out } },
};

export const staggerContainer = stagger;
export { stagger };

/**
 * Returns a copy of a hidden/show variant pair with `delay` merged into the
 * "show" transition. Used by reveal components instead of passing a
 * component-level `transition` prop, which would otherwise clobber the
 * variant's own spring/easing config rather than extending it.
 */
export function withDelay(variant, delay = 0) {
  if (!delay) return variant;
  return {
    ...variant,
    show: {
      ...variant.show,
      transition: { ...variant.show.transition, delay },
    },
  };
}

/** A whole <section> entering the viewport — fadeUp + child stagger combined. */
export const sectionTransition = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ...SPRING.soft, when: 'beforeChildren', staggerChildren: 0.08 },
  },
};

/** Whole-page enter/exit, for use with AnimatePresence at the route/app root. */
export const pageTransition = {
  initial: { opacity: 0, y: 12, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATION.base, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(6px)',
    transition: { duration: DURATION.fast, ease: EASE.inOut },
  },
};
