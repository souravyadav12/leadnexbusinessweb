import { SPRING, EASE, DURATION, stagger } from './config';

// ─────────────────────────────────────────────────────────────────────────
// Motion System — variants
// Reveal variants use eased opacity/filter/clip-path curves (spring physics
// on filter/clip-path is unsupported by the browser's compositor and looks
// wrong), everything else — position, scale — is spring-driven.
// ─────────────────────────────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.base, ease: EASE.out } },
};

export const blurReveal = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 14 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.985 },
  show: { opacity: 1, scale: 1, transition: { duration: DURATION.base, ease: EASE.out } },
};

export const maskReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0.4 },
  show: { clipPath: 'inset(0 0 0% 0)', opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out } },
};

export const maskRevealX = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 },
  show: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out } },
};

export const slideReveal = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

export const slideRevealRight = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

export const textUnitReveal = {
  hidden: { y: '100%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out } },
};

// ─── Newly Requested Fast Animation Variants ───
export const revealUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
};

export const cardReveal = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
};

export const fastContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.03 } },
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.03 } },
};

export const smallStaggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
};

export const staggerContainer = stagger;
export { stagger };

export function withDelay(variant, delay = 0) {
  if (!delay) return variant;
  return {
    ...variant,
    show: {
      ...variant.show,
      transition: { ...variant.show.transition, delay },
    },
    visible: {
      ...variant.visible,
      transition: { ...variant.visible?.transition, delay },
    }
  };
}

export const sectionTransition = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slower, ease: EASE.out, when: 'beforeChildren', staggerChildren: 0.06 },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 8, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATION.base, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    y: -6,
    filter: 'blur(4px)',
    transition: { duration: DURATION.fast, ease: EASE.inOut },
  },
};
