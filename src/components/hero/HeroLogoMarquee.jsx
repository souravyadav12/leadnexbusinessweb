const logos = ['Acme Corp', 'TechFlow', 'Meridian', 'Quantum Health', 'Apex Realty', 'NovaStar'];
const track = [...logos, ...logos];

export default function HeroLogoMarquee() {
  return (
    <div
      className="relative overflow-hidden mt-8 max-w-md"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)',
      }}
    >
      <div className="flex w-max animate-marquee gap-8">
        {track.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="text-text-secondary/35 text-sm font-semibold tracking-wide whitespace-nowrap"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
