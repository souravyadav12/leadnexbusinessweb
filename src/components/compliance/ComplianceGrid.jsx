import React from 'react';
import { ShieldCheck, Lock, FileCheck, Server, Eye, KeyRound, ClipboardList, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const badges = [
  { icon: ShieldCheck, label: 'SOC 2 Type II', color: 'text-accent' },
  { icon: Lock, label: 'GDPR', color: 'text-accent' },
  { icon: FileCheck, label: 'HIPAA', color: 'text-accent' },
  { icon: Server, label: 'ISO 27001', color: 'text-accent' },
  { icon: Eye, label: 'CCPA', color: 'text-accent' },
  { icon: KeyRound, label: 'AES-256', color: 'text-accent' },
  { icon: ClipboardList, label: 'Audit Logs', color: 'text-accent' },
  { icon: Database, label: '99.99% Uptime', color: 'text-accent' },
];

export default function ComplianceGrid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04, delayChildren: 0.02 } }
      }}
      className="mt-10"
    >
      <p className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-5">
        Certifications &amp; Controls
      </p>
      <div className="flex flex-wrap gap-3">
        {badges.map(({ icon: Icon, label }) => (
          <motion.div
            key={label}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover={{ y: -2, scale: 1.02, transition: { duration: 0.2 } }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-accent/30 transition-all duration-200 group"
          >
            <Icon className="w-3.5 h-3.5 text-accent/70 group-hover:text-accent transition-colors" />
            <span className="text-xs font-semibold text-text-secondary group-hover:text-white transition-colors">{label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
