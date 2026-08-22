import React from 'react';
import SectionTitle from '../common/SectionTitle';
import ComplianceGrid from './ComplianceGrid';
import SecureDataFlow from './SecureDataFlow';
import Background from '../../motion/background/Background';
import MagneticButton from '../../motion/components/MagneticButton';
import { motion } from 'framer-motion';

export default function Compliance() {
  return (
    <section id="compliance" className="py-20 lg:py-24 relative overflow-hidden bg-[#09090b]" aria-label="Security and compliance">
      <Background preset="sectionAlt" />
      
      {/* Top ambient glow decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionTitle
          index="06"
          badge="Security & Compliance"
          title="Enterprise-Grade"
          titleAccent="Security"
          subtitle="Protect every conversation with enterprise-grade encryption, access controls, auditability, and compliance-ready infrastructure."
        />

        {/* Section 1: Security Flow Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mt-10 sm:mt-12"
        >
          <SecureDataFlow />
        </motion.div>

        {/* Section 2: Security Standards Grid */}
        <ComplianceGrid />

        {/* Section 3: Custom Security Review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">Need a custom security review?</h4>
            <p className="text-xs text-text-secondary mt-1 max-w-md">Talk to our team about your organization's custom security requirements.</p>
          </div>
          <MagneticButton strength={0.3}>
            <a
              href="#contact"
              data-cursor="link"
              className="tag-bracket text-[12px] text-accent hover:text-white transition-colors py-2.5 cursor-pointer inline-block"
            >
              REQUEST SECURITY REVIEW →
            </a>
          </MagneticButton>
        </motion.div>
        
      </div>
    </section>
  );
}
