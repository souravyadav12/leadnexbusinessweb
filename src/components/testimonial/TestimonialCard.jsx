import { motion } from 'framer-motion';
import GradientBorder from '../common/GradientBorder';

const GRADIENTS = [
  'from-accent to-purple-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-rose-500',
  'from-pink-500 to-purple-500',
  'from-blue-500 to-cyan-500',
  'from-indigo-500 to-blue-400',
];

const StarRating = ({ rating = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`w-3 h-3 ${i < rating ? 'text-yellow-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function TestimonialCard({
  name,
  role,
  company,
  quote,
  metric,
  metricLabel,
  rating = 5,
  index,
  featured = false,
  className,
}) {
  const gradientClass = GRADIENTS[index % GRADIENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.38, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
      className={className}
    >
      <GradientBorder className={`h-full flex flex-col relative overflow-hidden ${featured ? 'p-7 lg:p-10 justify-center' : 'p-6'}`}>
        {/* Decorative large quote mark */}
        <div className="absolute top-3 right-4 text-7xl font-serif text-white/[0.04] leading-none pointer-events-none select-none">
          "
        </div>

        {/* Metric — the visual hero */}
        <div className={`flex items-baseline gap-2 ${featured ? 'mb-5' : 'mb-4'}`}>
          <span className={`font-editorial leading-none ${featured ? 'text-6xl lg:text-7xl' : 'text-5xl'} gradient-text-animated`}>
            {metric}
          </span>
          <span className="text-mono-label text-[10px] text-text-tertiary max-w-[7rem] leading-tight">
            {metricLabel}
          </span>
        </div>

        {/* Star rating */}
        <div className="mb-3">
          <StarRating rating={rating} />
        </div>

        {/* Quote */}
        <blockquote className={`text-text-secondary leading-relaxed mb-6 flex-1 ${featured ? 'text-base lg:text-lg text-white/85' : 'text-sm'}`}>
          "{quote}"
        </blockquote>

        {/* Byline with avatar */}
        <div className="pt-4 border-t border-white/[0.07] flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{name}</div>
            <div className="text-[10px] text-text-tertiary font-mono mt-0.5 uppercase tracking-wider">{role} · {company}</div>
          </div>
        </div>
      </GradientBorder>
    </motion.div>
  );
}
