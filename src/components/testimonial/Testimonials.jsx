import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import TestimonialCard from './TestimonialCard';
import LogoCloud from './LogoCloud';
import Background from '../../motion/background/Background';

const testimonials = [
  {
    name: 'Marcus Chen',
    role: 'VP of Sales',
    company: 'TechFlow',
    quote: 'LeadNex AI replaced our entire SDR team for outbound calls. The AI agents book 3x more meetings than our human reps ever did, and the quality of qualified leads has skyrocketed.',
    metric: '300%',
    metricLabel: 'Increase in qualified meetings',
    rating: 5,
  },
  {
    name: 'Sarah Williams',
    role: 'Head of Operations',
    company: 'Quantum Health',
    quote: 'We handle over 50,000 patient calls monthly. LeadNex reduced our wait times from 8 minutes to under 10 seconds while maintaining HIPAA compliance. Game-changer for healthcare.',
    metric: '80%',
    metricLabel: 'Reduction in operational costs',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'CEO',
    company: 'Apex Realty',
    quote: 'Every missed call was a lost deal. Since deploying LeadNex, we capture 100% of leads and our agents can focus on closing instead of cold calling. ROI was visible in week one.',
    metric: '2.5x',
    metricLabel: 'More deals closed per month',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'CTO',
    company: 'NovaStar',
    quote: 'The API integration took less than a day. Voice quality is indistinguishable from humans. Our customers genuinely cannot tell they are speaking with an AI agent.',
    metric: '99.8%',
    metricLabel: 'Customer satisfaction score',
    rating: 5,
  },
  {
    name: 'James Morrison',
    role: 'Director of Sales',
    company: 'Meridian',
    quote: 'We scaled from 500 to 50,000 daily outbound calls without hiring a single new rep. LeadNex handles objections better than most of our top performers.',
    metric: '100x',
    metricLabel: 'Scale without additional headcount',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'COO',
    company: 'Pinnacle',
    quote: 'The multi-language support is incredible. We serve customers in 12 languages across 30 countries, all with the same AI agent.',
    metric: '12',
    metricLabel: 'Languages supported seamlessly',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 relative" aria-label="Testimonials">
      <Background preset="section" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[300px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-padding relative">
        <SectionTitle
          index="04"
          badge="Testimonials"
          title="Loved by Teams"
          titleAccent="Worldwide"
          subtitle="See how leading companies are transforming their operations with AI-powered calling agents."
        />

        {/* Primary 3-card row — most impactful testimonials */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-12">
          {testimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard
              key={t.name}
              {...t}
              index={i}
              featured={false}
            />
          ))}
        </div>

        {/* Secondary row — 3 more, slightly smaller */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-5">
          {testimonials.slice(3).map((t, i) => (
            <TestimonialCard
              key={t.name}
              {...t}
              index={i + 3}
              featured={false}
            />
          ))}
        </div>

        <LogoCloud />
      </div>
    </section>
  );
}
