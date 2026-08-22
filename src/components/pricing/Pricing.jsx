import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CreditCard, RotateCcw, ChevronDown } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import PricingCard from './PricingCard';
import PricingComparison from './PricingComparison';
import FAQ from './FAQ';
import Background from '../../motion/background/Background';

const plans = [
  {
    name: 'Starter',
    price: '$99',
    yearlyPrice: '$79',
    description: 'Perfect for small teams getting started with AI calling.',
    features: [
      '1 AI Voice Agent',
      '500 minutes per month',
      '5 concurrent calls',
      'Basic analytics',
      '2 CRM integrations',
      'Email support',
      'Call recording',
      'Standard voices',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$399',
    yearlyPrice: '$319',
    description: 'For growing teams that need advanced AI capabilities.',
    features: [
      '5 AI Voice Agents',
      '5,000 minutes per month',
      '50 concurrent calls',
      'Advanced analytics',
      '10 CRM integrations',
      'Priority support',
      'Voice cloning',
      'Multi-language support',
      'Custom knowledge base',
      'API access',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    yearlyPrice: 'Custom',
    description: 'For large organizations with custom requirements.',
    features: [
      'Unlimited AI Voice Agents',
      'Unlimited minutes',
      'Unlimited concurrent calls',
      'Enterprise analytics',
      'Unlimited integrations',
      'Dedicated support manager',
      'Custom voice models',
      'HIPAA / SOC2 compliance',
      '99.99% SLA guarantee',
      'On-premise deployment',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section id="pricing" className="py-20 lg:py-28 relative" aria-label="Pricing">
      <Background preset="sectionAlt" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="section-padding relative">
        <SectionTitle
          index="05"
          badge="Pricing"
          title="Simple, Transparent"
          titleAccent="Pricing"
          subtitle="No hidden fees. No surprises. Choose the plan that fits your team and scale as you grow."
        />

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14 px-4"
        >
          <span
            onClick={() => setYearly(false)}
            className={`text-sm cursor-pointer select-none transition-colors duration-200 ${!yearly ? 'text-white font-semibold' : 'text-text-secondary hover:text-white'}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative w-14 h-7 shrink-0 rounded-full transition-colors duration-300 ease-[var(--ease-out)] cursor-pointer ${yearly ? 'bg-accent' : 'bg-white/10 hover:bg-white/15'}`}
            aria-label="Toggle annual billing"
            role="switch"
            aria-checked={yearly}
          >
            <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white transition-transform duration-300 ease-[var(--ease-out)] shadow-[var(--shadow-soft)] ${yearly ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span
            onClick={() => setYearly(true)}
            className={`text-sm cursor-pointer select-none transition-colors duration-200 ${yearly ? 'text-white font-semibold' : 'text-text-secondary hover:text-white'}`}
          >
            Yearly{' '}
            <span className="text-success text-xs font-medium bg-success/10 px-1.5 py-0.5 rounded-full ml-1">
              Save 20%
            </span>
          </span>
        </motion.div>

        {/* Cards — popular is elevated with scale-[1.03] in PricingCard */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} {...plan} index={i} yearly={yearly} />
          ))}
        </div>

        {/* Trust guarantees */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {[
            { icon: Shield, text: 'Money-back guarantee' },
            { icon: CreditCard, text: 'No credit card required' },
            { icon: RotateCcw, text: 'Cancel anytime' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-text-secondary">
              <Icon className="w-4 h-4 text-accent" />
              {text}
            </div>
          ))}
        </div>

        {/* Collapsible comparison table */}
        <div className="mt-16 border-t border-white/[0.06] pt-10">
          <button
            onClick={() => setShowComparison(v => !v)}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors mx-auto"
          >
            <span>{showComparison ? 'Hide' : 'Show'} full feature comparison</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showComparison ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showComparison && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <PricingComparison />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <FAQ />
      </div>
    </section>
  );
}
