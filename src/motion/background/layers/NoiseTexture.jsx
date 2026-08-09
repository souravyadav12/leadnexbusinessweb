// Precomputed once at module scope — an SVG feTurbulence data-uri is cheap
// to keep static (no per-frame cost) and reused across every section.
const NOISE_DATA_URI =
  "data:image/svg+xml;base64," +
  btoa(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`
  );

/**
 * Fine film-grain texture layer. Intentionally static (no animation loop —
 * animating noise every frame is pure GPU cost for a texture the eye
 * perceives as constant) at very low opacity, blended to only lift the
 * darkest areas so it never reads as "dirty".
 */
export default function NoiseTexture({ opacity = 0.035 }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 mix-blend-overlay"
      style={{
        opacity,
        backgroundImage: `url("${NOISE_DATA_URI}")`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
}
