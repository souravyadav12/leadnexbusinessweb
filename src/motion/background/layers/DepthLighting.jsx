/**
 * Static vignette + soft top-down highlight. This is the layer that keeps
 * focus centered on content by gently darkening the edges and lifting a
 * highlight toward the top — the "studio lighting" cue. Always last in
 * the stack (painted on top of color layers, under content).
 */
export default function DepthLighting({ vignette = 0.5, highlight = 0.04 }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 85% 65% at 50% 25%, transparent 40%, rgba(10,10,13,${vignette}) 100%)`,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-1/2"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,${highlight}), transparent)`,
        }}
      />
    </div>
  );
}
