/**
 * Named layer recipes so sections don't hand-assemble layer lists. Each
 * preset is intentionally sparse — 3–5 layers max — because stacking every
 * effect everywhere is exactly the "distracting" outcome we're avoiding.
 * `tint` selects a GradientMesh/BlurLayers palette; sections alternate
 * tint to stay visually distinct while remaining part of one system.
 */
export const BACKGROUND_PRESETS = {
  // Hero — the one place the full system shows up at once.
  hero: {
    layers: ['gradientMesh', 'aurora', 'grid', 'spotlights', 'mouseLight', 'particles', 'depth'],
    tint: 'accent',
  },
  // Standard content section — calm, mostly static feel with gentle drift.
  section: {
    layers: ['gradientMesh', 'blurLayers', 'grid', 'depth'],
    tint: 'accent',
  },
  sectionAlt: {
    layers: ['gradientMesh', 'blurLayers', 'grid', 'depth'],
    tint: 'secondary',
  },
  // Interactive/demo-style sections — adds a slow mouse-reactive light.
  interactive: {
    layers: ['gradientMesh', 'spotlights', 'mouseLight', 'depth'],
    tint: 'accent',
  },
  // Conversion-focused sections (contact, pricing) — beams draw the eye down.
  conversion: {
    layers: ['gradientMesh', 'beams', 'blurLayers', 'depth'],
    tint: 'secondary',
  },
  // Very light touch — footer, dense text sections.
  minimal: {
    layers: ['blurLayers', 'depth'],
    tint: 'accent',
  },
};
