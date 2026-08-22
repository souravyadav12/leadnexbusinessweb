import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from './Button';
import Background from '../../motion/background/Background';

export default function CTABanner() {
  return (
    <section className="py-20 lg:py-24 relative" aria-label="Call to action">
      <Background preset="conversion" />

      <div className="section-padding relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Limited Time — 14-Day Free Trial</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            Stop Missing Calls.{' '}
            <span className="gradient-text">Start Closing Deals.</span>
          </h2>

          <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
            Join 2,000+ companies using LeadNex AI to automate their calling operations.
            Deploy in minutes, see results in hours.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Start Free Trial
            </Button>
            <Button variant="secondary" size="lg">
              Talk to Sales
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-8">
            {['No credit card required', 'Cancel anytime', 'Full feature access'].map((t) => (
              <span key={t} className="text-sm text-text-secondary">✓ {t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
