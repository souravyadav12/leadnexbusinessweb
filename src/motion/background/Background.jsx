import { useRef, useState, useEffect } from 'react';
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
import { fpsMonitor } from '../../utils/FPSMonitor';

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

export default function Background({ preset = 'section', layers, tint, parallax = true, className = '', layerProps = {} }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const unsub = fpsMonitor.subscribe((fps, isLowPower) => {
      setLowPower(isLowPower);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { rootMargin: '300px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) {
    return <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
  }

  const config = preset ? BACKGROUND_PRESETS[preset] ?? BACKGROUND_PRESETS.section : { layers: [], tint: 'accent' };
  let activeLayers = layers ?? config.layers;

  // Graceful degradation when low power / dropped frames detected
  if (lowPower) {
    activeLayers = activeLayers.filter((key) => key !== 'particles' && key !== 'aurora' && key !== 'spotlights');
  }

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
