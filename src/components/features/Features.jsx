import SectionTitle from '../common/SectionTitle';
import FeatureGrid from './FeatureGrid';
import USPSection from './USPSection';
import Background from '../../motion/background/Background';

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-24 relative" aria-label="Features">
      <Background preset="section" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="section-padding relative">
        <SectionTitle
          index="03"
          badge="Features"
          title="Everything You Need to"
          titleAccent="Automate Calls"
          subtitle="A complete AI calling platform built for enterprise teams that demand reliability, scalability, and performance."
        />
        <FeatureGrid />
        <USPSection />
      </div>
    </section>
  );
}
