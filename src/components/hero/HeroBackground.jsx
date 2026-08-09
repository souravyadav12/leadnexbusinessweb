import { memo } from 'react';
import Background from '../../motion/background/Background';

// Thin compatibility wrapper — the hero's living backdrop now comes from
// the shared background engine (gradient mesh, aurora, grid, spotlights,
// mouse-reactive light, particles, depth) instead of a bespoke layer stack.
function HeroBackground() {
  return <Background preset="hero" />;
}

export default memo(HeroBackground);
