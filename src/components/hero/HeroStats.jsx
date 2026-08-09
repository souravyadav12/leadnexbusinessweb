import { motion } from 'framer-motion';
import Counter from '../../motion/components/Counter';

const stats = [
  { value: 98, suffix: '%', label: 'Accuracy Rate' },
  { value: 10, suffix: 'M+', label: 'Calls Handled' },
  { value: 65, suffix: '%', label: 'Conversion Lift' },
  { value: 99.99, suffix: '%', label: 'Uptime SLA', decimals: 2 },
];

export default function HeroStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
          className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
        >
          <div className="text-2xl lg:text-3xl font-bold gradient-text">
            <Counter end={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
          </div>
          <div className="text-xs text-text-secondary mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
