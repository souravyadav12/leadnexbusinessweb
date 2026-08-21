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
      <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 sm:gap-4 mb-6 sm:mb-7">
        <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center" iconRight={<ArrowRight className="w-4 h-4" />}>
          Book a Demo
        </Button>
        <Button variant="secondary" size="lg" className="w-full sm:w-auto justify-center" icon={<Play className="w-4 h-4" />}>
          Watch Demo
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {trustBadges.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Icon className="w-3.5 h-3.5 text-accent/70 shrink-0" />
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
