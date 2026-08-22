import React from 'react';
import SecurityCard from './SecurityCard';
import { ShieldCheck, Lock, FileCheck, Server, Eye, KeyRound, ClipboardList, Database } from 'lucide-react';

const certificationStandards = [
  {
    icon: ShieldCheck,
    code: 'SOC2-II',
    title: 'SOC 2 Type II',
    description: 'Audited controls covering security, availability, integrity, confidentiality, and privacy.',
    status: 'AUDITED'
  },
  {
    icon: Server,
    code: 'ISO-27001',
    title: 'ISO 27001',
    description: 'Certified information security management system ensuring systematic protection of company data.',
    status: 'CERTIFIED'
  }
];

const privacyStandards = [
  {
    icon: Lock,
    code: 'GDPR-EU',
    title: 'GDPR Compliant',
    description: 'Privacy controls covering data minimization, erasure, consent, and EU data protection requirements.',
    status: 'COMPLIANT'
  },
  {
    icon: FileCheck,
    code: 'HIPAA-US',
    title: 'HIPAA Compliant',
    description: 'Enterprise healthcare compliance with BAA agreements, PHI encryption, and audit trails for patient interactions.',
    status: 'HIPAA READY'
  },
  {
    icon: Eye,
    code: 'CCPA-CA',
    title: 'CCPA Compliant',
    description: 'California Consumer Privacy Act compliance with transparent data practices and consumer rights management.',
    status: 'COMPLIANT'
  }
];

const controlStandards = [
  {
    icon: KeyRound,
    code: 'AES-256',
    title: 'End-to-End Encryption',
    description: 'AES-256 encryption at rest and TLS 1.3 in transit. Zero-knowledge architecture ensures data safety.',
    status: 'ACTIVE'
  },
  {
    icon: ClipboardList,
    code: 'LOG-AUDIT',
    title: 'Audit Logs',
    description: 'Comprehensive audit logging for every action, API call, and data access. Full traceability for compliance.',
    status: 'ENABLED'
  },
  {
    icon: Database,
    code: 'INFRA-HA',
    title: 'Secure Infrastructure',
    description: 'Deployed on AWS and GCP with multi-region redundancy, automated backups, and 99.99% uptime guarantee.',
    status: 'ACTIVE'
  }
];

export default function ComplianceGrid() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 mt-12 sm:mt-16">
      
      {/* 1. Certifications Group */}
      <div>
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
          <span className="w-1 h-1 rounded-full bg-accent" />
          <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary font-bold">Certifications & Frameworks</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {certificationStandards.map((s, idx) => (
            <SecurityCard key={s.title} {...s} index={idx} />
          ))}
        </div>
      </div>

      {/* 2. Privacy Group */}
      <div>
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
          <span className="w-1 h-1 rounded-full bg-accent" />
          <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary font-bold">Privacy & Regulatory Compliance</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {privacyStandards.map((s, idx) => (
            <SecurityCard key={s.title} {...s} index={idx + 2} />
          ))}
        </div>
      </div>

      {/* 3. Controls Group */}
      <div>
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
          <span className="w-1 h-1 rounded-full bg-accent" />
          <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary font-bold">Security Controls & Protection</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {controlStandards.map((s, idx) => (
            <SecurityCard key={s.title} {...s} index={idx + 5} />
          ))}
        </div>
      </div>

    </div>
  );
}
