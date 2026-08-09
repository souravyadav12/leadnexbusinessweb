import { motion } from 'framer-motion';
import { Play, ArrowRight, ShieldCheck, Lock, FileCheck } from 'lucide-react';
import Button from '../common/Button';

const trustBadges = [
  { icon: ShieldCheck, label: 'SOC 2 Type II' },
  { icon: Lock, label: 'GDPR Compliant' },
  { icon: FileCheck, label: 'HIPAA Ready' },
];

export default function HeroCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="flex flex-wrap gap-4 mb-7">
        {/* Button now has its own built-in magnetic pull + ripple (see
            Button.jsx) — wrapping it in MagneticButton would compound two
            separate spring transforms on the same element. */}
        <Button variant="primary" size="lg" iconRight={<ArrowRight className="w-4 h-4" />}>
          Book a Demo
        </Button>
        <Button variant="secondary" size="lg" icon={<Play className="w-4 h-4" />}>
          Watch Demo
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {trustBadges.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Icon className="w-3.5 h-3.5 text-accent/70" />
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
