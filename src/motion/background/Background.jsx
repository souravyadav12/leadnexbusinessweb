import { useRef } from 'react';
import { BACKGROUND_PRESETS } from './presets';
import GradientMesh from './layers/GradientMesh';
import Aurora from './layers/Aurora';
import AnimatedGrid from './layers/AnimatedGrid';
import NoiseTexture from './layers/NoiseTexture';
import MovingSpotlights from './layers/MovingSpotlights';
import MouseReactiveLighting from './layers/MouseReactiveLighting';
import BlurLayers from './layers/BlurLayers';
import ParticleDrift from './layers/ParticleDrift';
import GlassShimmer from './layers/GlassShimmer';
import BeamLights from './layers/BeamLights';
import DepthLighting from './layers/DepthLighting';

// Maps a layer key (used in presets.js) to its component + how it's rendered.
// Layers that need the section's own container ref (for scroll-parallax)
// are marked `needsContainer`.
const LAYER_MAP = {
  gradientMesh: { Component: GradientMesh, needsContainer: false },
  aurora: { Component: Aurora, needsContainer: false },
  grid: { Component: AnimatedGrid, needsContainer: false },
  noise: { Component: NoiseTexture, needsContainer: false },
  spotlights: { Component: MovingSpotlights, needsContainer: false },
  mouseLight: { Component: MouseReactiveLighting, needsContainer: false },
  blurLayers: { Component: BlurLayers, needsContainer: true },
  particles: { Component: ParticleDrift, needsContainer: false },
  glassShimmer: { Component: GlassShimmer, needsContainer: false },
  beams: { Component: BeamLights, needsContainer: false },
  depth: { Component: DepthLighting, needsContainer: false },
};

const TINT_COLORS = {
  accent: 'rgba(91,124,250,0.05)',
  secondary: 'rgba(143,152,168,0.05)',
};

/**
 * The reusable background engine. Drop it as the first child of any
 * `relative` section and it fills it with a composed, layered, subtle,
 * living backdrop — no section hand-rolls its own blurred divs anymore.
 *
 * Usage:
 *   <section className="relative ...">
 *     <Background preset="section" />
 *     <div className="relative section-padding">...</div>
 *   </section>
 *
 * Or compose custom layers directly:
 *   <Background layers={['gradientMesh', 'beams', 'depth']} tint="secondary" />
 *
 * All layers self-disable/simplify under prefers-reduced-motion; parallax
 * (via BlurLayers) automatically scopes scroll tracking to this section's
 * own bounds so it never fights with other sections' scroll math.
 */
export default function Background({ preset = 'section', layers, tint, parallax = true, className = '', layerProps = {} }) {
  const containerRef = useRef(null);
  const config = preset ? BACKGROUND_PRESETS[preset] ?? BACKGROUND_PRESETS.section : { layers: [], tint: 'accent' };
  const activeLayers = layers ?? config.layers;
  const activeTint = tint ?? config.tint ?? 'accent';
  const blurTint = TINT_COLORS[activeTint] ?? TINT_COLORS.accent;

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {activeLayers.map((key) => {
        const entry = LAYER_MAP[key];
        if (!entry) return null;
        const { Component, needsContainer } = entry;
        const extraProps = layerProps[key] ?? {};

        if (key === 'gradientMesh') {
          return <Component key={key} tint={activeTint} {...extraProps} />;
        }
        if (key === 'spotlights') {
          return <Component key={key} color={extraProps.color ?? blurTint} {...extraProps} />;
        }
        if (key === 'mouseLight') {
          return <Component key={key} color={extraProps.color ?? blurTint} {...extraProps} />;
        }
        if (needsContainer) {
          return <Component key={key} containerRef={containerRef} parallax={parallax} tint={blurTint} {...extraProps} />;
        }
        return <Component key={key} {...extraProps} />;
      })}
    </div>
  );
}
