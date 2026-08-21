import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import PageLoader from './components/common/PageLoader';
import CTABanner from './components/common/CTABanner';
import NoiseTexture from './motion/background/layers/NoiseTexture';

import DemoSection from './components/demo/DemoSection';
import Workflow from './components/workflow/Workflow';
import Features from './components/features/Features';
import Testimonials from './components/testimonial/Testimonials';
import Pricing from './components/pricing/Pricing';
import Compliance from './components/compliance/Compliance';
import TryYourself from './components/lead/TryYourself';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary relative">
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <NoiseTexture opacity={0.025} />
      </div>
      <PageLoader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <DemoSection />
        <Workflow />
        <Features />
        <Testimonials />
        <Pricing />
        <Compliance />
        <TryYourself />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
