// ─────────────────────────────────────────────────────────────────────────
// Motion System — config
// Every timing value in the app should come from here. Nothing animates
// with raw numbers scattered across components.
// ─────────────────────────────────────────────────────────────────────────

/**
 * Named spring presets. Every animation in the system is spring-driven —
 * duration-based easing is only used for opacity/blur "reveal" curves where
 * a spring would look unnaturally bouncy (see EASE below), never for motion
 * that implies physical weight (position, scale, rotation, drag).
 */
export const SPRING = {
  // Default — most UI motion (reveals, layout shifts)
  default: { type: 'spring', stiffness: 300, damping: 30, mass: 0.5 },
  // Soft — slow, ambient, embient background motion
  soft: { type: 'spring', stiffness: 150, damping: 22, mass: 0.7 },
  // Snappy — buttons, toggles, small interactive elements
  snappy: { type: 'spring', stiffness: 450, damping: 32, mass: 0.4 },
  // Bouncy — playful emphasis
  bouncy: { type: 'spring', stiffness: 450, damping: 20, mass: 0.5 },
  // Gentle
  trailing: { type: 'spring', stiffness: 180, damping: 18, mass: 0.3 },
  // Lazy
  lazy: { type: 'spring', stiffness: 50, damping: 22, mass: 0.5 },
  // Stiff
  magnetic: { type: 'spring', stiffness: 180, damping: 14, mass: 0.3 },
  tilt: { type: 'spring', stiffness: 240, damping: 24, mass: 0.4 },
};

/** Cubic-bezier curves, reserved for opacity/filter/clip-path reveals. */
export const EASE = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
};

export const DURATION = {
  fast: 0.28,
  base: 0.38,
  slow: 0.42,
  slower: 0.45,
};

/** Default viewport trigger — triggers when 12% of the content is visible, earlier than before */
export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -8% 0px"
};

export const VIEWPORT_REPEAT = {
  once: false,
  amount: 0.12,
  margin: "0px 0px -8% 0px"
};

/** Shared stagger factory so every list/grid reveal is consistent. */
export const stagger = (staggerChildren = 0.07, delayChildren = 0.03) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
