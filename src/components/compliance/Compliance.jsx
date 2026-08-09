import SectionTitle from '../common/SectionTitle';
import ComplianceGrid from './ComplianceGrid';
import SecureDataFlow from './SecureDataFlow';
import Background from '../../motion/background/Background';
import MagneticButton from '../../motion/components/MagneticButton';
import { motion } from 'framer-motion';

export default function Compliance() {
  return (
    <section id="compliance" className="py-20 lg:py-24 relative" aria-label="Security and compliance">
      <Background preset="sectionAlt" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="section-padding relative">
        <SectionTitle
          index="06"
          badge="Security & Compliance"
          title="Enterprise-Grade"
          titleAccent="Security"
          subtitle="We meet the highest security standards so you can deploy AI calling agents with complete confidence."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 lg:mb-14"
        >
          <SecureDataFlow />
        </motion.div>

        <ComplianceGrid />

        {/* Signature line — replaces the icon-card CTA banner with an
            editorial closing line, avoiding a second "trust card" that
            would duplicate CTABanner's job further down the page. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-8 border-t border-white/[0.07] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <p className="text-white/90 text-lg font-editorial italic max-w-md">
            Need a custom security review for your organization?
          </p>
          <MagneticButton strength={0.3}>
            <a
              href="#contact"
              data-cursor="link"
              className="tag-bracket text-[12px] text-accent hover:text-white transition-colors py-2 cursor-pointer inline-block"
            >
              Request review →
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
