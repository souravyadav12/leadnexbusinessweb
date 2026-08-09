// ─────────────────────────────────────────────────────────────────────────
// Motion System — public API
// Import everything animation-related from here, e.g.:
//   import { FadeUp, Tilt, useReducedMotion, SPRING } from '@/motion';
// ─────────────────────────────────────────────────────────────────────────

export * from './config';
export * from './variants';

export { useReducedMotion } from './hooks/useReducedMotion';
export { usePointerSpring } from './hooks/usePointerSpring';
export { useCountUpSpring } from './hooks/useCountUpSpring';
export { useRipple } from './hooks/useRipple';

export { default as FadeUp } from './components/FadeUp';
export { default as BlurReveal } from './components/BlurReveal';
export { default as MaskReveal } from './components/MaskReveal';
export { default as TextReveal } from './components/TextReveal';
export { default as Counter } from './components/Counter';
export { default as Waveform } from './components/Waveform';
export { default as FloatingMotion } from './components/FloatingMotion';
export { default as CursorLight } from './components/CursorLight';
export { default as Spotlight } from './components/Spotlight';
export { default as GlassReflection } from './components/GlassReflection';
export { default as Tilt } from './components/Tilt';
export { default as Ripple } from './components/Ripple';
export { default as MagneticButton } from './components/MagneticButton';
export { default as SectionTransition } from './components/SectionTransition';
export { default as PageTransition } from './components/PageTransition';

// Background engine
export { default as Background } from './background/Background';
export { MouseProvider, useSharedMouse } from './background/MouseProvider';
export { BACKGROUND_PRESETS } from './background/presets';
