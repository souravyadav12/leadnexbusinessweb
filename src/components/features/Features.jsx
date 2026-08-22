import React from 'react';
import SectionTitle from '../common/SectionTitle';
import FeatureGrid from './FeatureGrid';
import USPSection from './USPSection';
import Background from '../../motion/background/Background';

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden bg-[#06070B]" aria-label="Features">
      <Background preset="section" />

      {/* Top Ambient Glow & Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          index="03"
          badge="Enterprise Features"
          title="Everything You Need to"
          titleAccent="Automate Calls at Scale"
          subtitle="A battle-tested AI calling infrastructure built for high-volume sales, support, and revenue operations."
        />

        {/* Dynamic Animated Bento Grid */}
        <div className="mt-12 sm:mt-16">
          <FeatureGrid />
        </div>

        {/* High-Converting Comparison Section */}
        <div className="mt-24 lg:mt-32">
          <USPSection />
        </div>
      </div>
    </section>
  );
}