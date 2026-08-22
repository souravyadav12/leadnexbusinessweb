import React from 'react';
import SectionTitle from '../common/SectionTitle';
import ComplianceGrid from './ComplianceGrid';
import SecureDataFlow from './SecureDataFlow';
import Background from '../../motion/background/Background';
import MagneticButton from '../../motion/components/MagneticButton';
import { motion } from 'framer-motion';

export default function Compliance() {
  return (
    <section id="compliance" className="py-16 lg:py-20 relative overflow-hidden" aria-label="Security and compliance">
      <Background preset="sectionAlt" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <SectionTitle
          index="06"
          badge="Security & Compliance"
          title="Enterprise-Grade"
          titleAccent="Security"
          subtitle="Protect every conversation with encryption, access controls, auditability, and compliance-ready infrastructure."
        />

        {/* Security Flow Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <SecureDataFlow />
        </motion.div>

        {/* Certification Badge Row */}
        <ComplianceGrid />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">Need a custom security review?</h4>
            <p className="text-xs text-text-secondary mt-1 max-w-sm">Talk to our team about your organization's requirements.</p>
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
