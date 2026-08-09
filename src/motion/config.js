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
  default: { type: 'spring', stiffness: 260, damping: 28, mass: 0.6 },
  // Soft — slow, ambient, embient background motion
  soft: { type: 'spring', stiffness: 120, damping: 20, mass: 0.8 },
  // Snappy — buttons, toggles, small interactive elements
  snappy: { type: 'spring', stiffness: 400, damping: 30, mass: 0.5 },
  // Bouncy — playful emphasis (badges, counters landing, pop-ins)
  bouncy: { type: 'spring', stiffness: 420, damping: 18, mass: 0.6 },
  // Gentle — cursor/pointer followers, parallax (smooth trailing)
  trailing: { type: 'spring', stiffness: 150, damping: 15, mass: 0.3 },
  // Lazy — very slow trailing, for large-radius light/spotlight effects
  lazy: { type: 'spring', stiffness: 40, damping: 20, mass: 0.5 },
  // Stiff — near-instant, for magnetic buttons / tilt cards
  magnetic: { type: 'spring', stiffness: 150, damping: 12, mass: 0.3 },
  tilt: { type: 'spring', stiffness: 220, damping: 22, mass: 0.4 },
};

/** Cubic-bezier curves, reserved for opacity/filter/clip-path reveals. */
export const EASE = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
};

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.8,
  slower: 1.1,
};

/** Default viewport trigger — fires once, slightly before entering view. */
export const VIEWPORT_ONCE = { once: true, margin: '-60px' };
export const VIEWPORT_REPEAT = { once: false, margin: '-40px', amount: 0.3 };

/** Shared stagger factory so every list/grid reveal is consistent. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
