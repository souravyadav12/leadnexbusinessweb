import { motion } from 'framer-motion';
import Badge from '../common/Badge';
import HeroCTA from './HeroCTA';
import HeroLogoMarquee from './HeroLogoMarquee';
import TextReveal from '../../motion/components/TextReveal';

export default function HeroContent() {
  return (
    <div className="w-full max-w-full sm:max-w-xl lg:max-w-lg xl:max-w-2xl flex flex-col justify-center">
      
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="inline-flex max-w-full">
          <Badge
            variant="accent"
            icon={
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse shrink-0" />
            }
          >
            <span className="truncate text-xs sm:text-sm">
              Powered by Advanced AI Voice Models
            </span>
          </Badge>
        </div>
      </motion.div>

      {/* Main Heading — larger, tighter, animated gradient on "close deals" */}
      <h1 className="mt-5 sm:mt-6 text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] text-white font-bold leading-[1.08] tracking-tight break-words">
        <TextReveal text="Voice agents" delay={0.1} />
        <br className="hidden sm:block" />
        <TextReveal text="that" delay={0.3} />{' '}
        <span className="gradient-text-animated inline">
          <TextReveal text="close deals" delay={0.4} />
        </span>
        <br className="hidden sm:block" />
        <TextReveal text="while you sleep" delay={0.6} />
      </h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-text-secondary w-full max-w-[95%] sm:max-w-lg leading-relaxed"
      >
        Deploy human-like AI calling agents that handle inbound and outbound
        calls 24/7. Qualify leads, book meetings, and close sales — at
        enterprise scale.
      </motion.p>

      {/* Trust badges — more prominent */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 sm:mt-6 flex flex-wrap gap-3"
      >
        {[
          { stat: '10M+', label: 'Calls Handled' },
          { stat: '98.7%', label: 'Human Score' },
          { stat: '<300ms', label: 'Latency' },
          { stat: '24/7', label: 'Uptime' },
        ].map(({ stat, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
          >
            <span className="text-xs font-bold text-accent">{stat}</span>
            <span className="text-[10px] text-text-secondary">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <div className="mt-6 sm:mt-8 w-full max-w-[95%] sm:max-w-md">
        <HeroCTA />
      </div>

      {/* Logo Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="w-full mt-8 sm:mt-12 overflow-hidden"
      >
        <p className="text-mono-label text-[10px] sm:text-xs text-text-tertiary mb-3 uppercase tracking-wider">
          Trusted by revenue teams at
        </p>
        <HeroLogoMarquee />
      </motion.div>
      
    </div>
  );
}