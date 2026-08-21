import { ShieldCheck, Lock, FileCheck, Server, Eye, ClipboardList, KeyRound, Database } from 'lucide-react';
import SecurityCard from './SecurityCard';

const standards = [
  {
    icon: ShieldCheck,
    code: 'SOC2-II',
    title: 'SOC 2 Type II',
    description: 'Independently audited controls for security, availability, processing integrity, confidentiality, and privacy.',
  },
  {
    icon: Lock,
    code: 'GDPR-EU',
    title: 'GDPR Compliant',
    description: 'Full compliance with EU data protection regulations including data minimization, right to erasure, and consent management.',
  },
  {
    icon: FileCheck,
    code: 'HIPAA-US',
    title: 'HIPAA Compliant',
    description: 'Enterprise healthcare compliance with BAA agreements, PHI encryption, and audit trails for all patient interactions.',
  },
  {
    icon: Server,
    code: 'ISO-27001',
    title: 'ISO 27001',
    description: 'Certified information security management system ensuring systematic protection of sensitive company data.',
  },
  {
    icon: Eye,
    code: 'CCPA-CA',
    title: 'CCPA Compliant',
    description: 'California Consumer Privacy Act compliance with transparent data practices and consumer rights management.',
  },
  {
    icon: KeyRound,
    code: 'AES-256',
    title: 'End-to-End Encryption',
    description: 'AES-256 encryption at rest and TLS 1.3 in transit. Zero-knowledge architecture ensures your data stays yours.',
  },
  {
    icon: ClipboardList,
    code: 'LOG-AUDIT',
    title: 'Audit Logs',
    description: 'Comprehensive audit logging for every action, API call, and data access. Full traceability for compliance reviews.',
  },
  {
    icon: Database,
    code: 'INFRA-HA',
    title: 'Secure Infrastructure',
    description: 'Deployed on AWS and GCP with multi-region redundancy, automated backups, and 99.99% uptime guarantee.',
  },
];

export default function ComplianceGrid() {
  return (
    <div className="max-w-7xl mx-auto">
      {standards.map((s, i) => (
        <SecurityCard key={s.title} {...s} index={i} />
      ))}
    </div>
  );
}
