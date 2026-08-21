import { motion } from 'framer-motion';
import { Check, X, HelpCircle } from 'lucide-react';

const features = [
  { name: 'AI Voice Agents', starter: '1', growth: '5', enterprise: 'Unlimited' },
  { name: 'Monthly Minutes', starter: '500', growth: '5,000', enterprise: 'Unlimited' },
  { name: 'Concurrent Calls', starter: '5', growth: '50', enterprise: 'Unlimited' },
  { name: 'Voice Cloning', starter: false, growth: true, enterprise: true },
  { name: 'CRM Integrations', starter: '2', growth: '10', enterprise: 'Unlimited' },
  { name: 'Analytics Dashboard', starter: 'Basic', growth: 'Advanced', enterprise: 'Enterprise' },
  { name: 'Multi-Language', starter: false, growth: true, enterprise: true },
  { name: 'Custom Knowledge Base', starter: false, growth: true, enterprise: true },
  { name: 'API Access', starter: false, growth: true, enterprise: true },
  { name: 'Dedicated Support', starter: false, growth: false, enterprise: true },
  { name: 'SLA Guarantee', starter: false, growth: '99.9%', enterprise: '99.99%' },
  { name: 'HIPAA Compliance', starter: false, growth: false, enterprise: true },
];

function CellValue({ value }) {
  if (value === true) return <Check className="w-4 h-4 text-success mx-auto" />;
  if (value === false) return <X className="w-4 h-4 text-text-secondary/30 mx-auto" />;
  return <span className="text-xs sm:text-sm text-white font-medium">{value}</span>;
}

export default function PricingComparison() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="mt-14 sm:mt-20 overflow-x-auto rounded-2xl border border-white/[0.08] p-4 sm:p-6 glass"
    >
      <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-text-secondary" />
          <h3 className="text-base sm:text-lg font-semibold text-white">Compare Plans</h3>
        </div>
        <span className="text-[10px] text-text-tertiary sm:hidden">Scroll right →</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px]" role="table">
          <thead>
            <tr className="border-b border-white/[0.08]">
              <th className="text-left py-3 sm:py-4 text-xs sm:text-sm font-medium text-text-secondary w-1/4">Feature</th>
              <th className="text-center py-3 sm:py-4 text-xs sm:text-sm font-medium text-text-secondary w-1/4">Starter</th>
              <th className="text-center py-3 sm:py-4 text-xs sm:text-sm font-medium gradient-text w-1/4">Growth</th>
              <th className="text-center py-3 sm:py-4 text-xs sm:text-sm font-medium text-text-secondary w-1/4">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {features.map((f) => (
              <tr key={f.name} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <td className="py-3 text-xs sm:text-sm text-white">{f.name}</td>
                <td className="py-3 text-center"><CellValue value={f.starter} /></td>
                <td className="py-3 text-center bg-accent/[0.02]"><CellValue value={f.growth} /></td>
                <td className="py-3 text-center"><CellValue value={f.enterprise} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
