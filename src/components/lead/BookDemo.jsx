import { motion } from 'framer-motion';
import { Calendar, Clock, Video, CheckCircle2 } from 'lucide-react';

const benefits = [
  'See LeadNex AI handle live calls',
  'Get a custom ROI analysis',
  'Learn about enterprise features',
  'Discuss your specific use case',
  'See CRM integrations in action',
];

export default function BookDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
          Ready to Transform Your{' '}
          <span className="gradient-text">Calling Operations?</span>
        </h3>
        <p className="text-text-secondary leading-relaxed">
          Schedule a personalized demo with our team and discover how LeadNex AI 
          can automate your calls, qualify leads, and drive revenue — all while 
          reducing operational costs by up to 80%.
        </p>
      </div>

      {/* Benefits */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white">What you'll get:</h4>
        {benefits.map((b) => (
          <div key={b} className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
            <span className="text-sm text-text-secondary">{b}</span>
          </div>
        ))}
      </div>

      {/* Quick info cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Calendar, label: 'Pick a Date', sub: 'Flexible scheduling' },
          { icon: Clock, label: '30 Minutes', sub: 'Quick & focused' },
          { icon: Video, label: 'Video Call', sub: 'Screen sharing' },
        ].map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
          >
            <Icon className="w-5 h-5 text-accent mx-auto mb-2" />
            <div className="text-xs font-semibold text-white">{label}</div>
            <div className="text-[10px] text-text-secondary">{sub}</div>
          </div>
        ))}
      </div>

      {/* Calendly placeholder */}
      <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
        <Calendar className="w-8 h-8 text-accent mx-auto mb-3" />
        <p className="text-sm text-text-secondary">
          Calendar integration available — select a time that works for your team
        </p>
      </div>
    </motion.div>
  );
}
