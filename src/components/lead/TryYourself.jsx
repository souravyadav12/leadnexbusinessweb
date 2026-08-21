import SectionTitle from '../common/SectionTitle';
import LeadForm from './LeadForm';
import BookDemo from './BookDemo';
import Background from '../../motion/background/Background';

export default function TryYourself() {
  return (
    <section id="contact" className="py-20 lg:py-24 relative" aria-label="Contact and demo request">
      <Background preset="conversion" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="section-padding relative">
        <SectionTitle
          index="07"
          badge="Get Started"
          flip
          title="Start Automating"
          titleAccent="Today"
          subtitle="Book a personalized demo or start your free trial. No credit card required. Setup takes less than 5 minutes."
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start max-w-7xl mx-auto">
          <BookDemo />
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
