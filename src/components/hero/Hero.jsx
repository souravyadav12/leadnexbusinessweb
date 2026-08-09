import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroDashboard from './HeroDashboard';
import HeroStats from './HeroStats';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 lg:pt-36 pb-12 overflow-hidden"
      aria-label="Hero section"
    >
      <HeroBackground />
      <div className="section-padding w-full py-10 lg:py-16 relative">
        {/* Asymmetric 58/42 split — the dashboard overlaps the section edge for a cinematic, non-boxed feel */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-14 lg:gap-10 items-center">
          <HeroContent />
          <div className="lg:-mr-6 xl:-mr-16 lg:-mt-12 xl:-mt-20 lg:-translate-y-4">
            <HeroDashboard />
          </div>
        </div>
        <HeroStats />
      </div>

      {/* Soft fade into the next section so the hero doesn't end on a hard line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-bg-primary pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
