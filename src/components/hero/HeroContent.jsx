import { motion } from 'framer-motion';
import Badge from '../common/Badge';
import HeroCTA from './HeroCTA';
import HeroLogoMarquee from './HeroLogoMarquee';
import TextReveal from '../../motion/components/TextReveal';

export default function HeroContent() {
  return (
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Badge variant="accent" icon={<span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />}>
          Powered by Advanced AI Voice Models
        </Badge>
      </motion.div>

      <h1 className="text-display mt-5 sm:mt-6 text-3xl sm:text-5xl lg:text-[5.25rem] xl:text-[6rem] text-white leading-[0.98] sm:leading-[0.95]">
        <TextReveal text="Voice agents" delay={0.1} />
        <br />
        <TextReveal text="that" delay={0.3} />{' '}
        <span className="gradient-text">
          <TextReveal text="close deals" delay={0.4} />
        </span>
        <br />
        <TextReveal text="while you sleep" delay={0.6} />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-5 sm:mt-7 text-base sm:text-lg lg:text-xl text-text-secondary max-w-xl leading-relaxed"
      >
        Deploy human-like AI calling agents that handle inbound and outbound calls 24/7.
        Qualify leads, book meetings, and close sales — at enterprise scale.
      </motion.p>

      <div className="mt-7 sm:mt-9">
        <HeroCTA />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <p className="text-mono-label text-[10px] text-text-tertiary mt-8 sm:mt-10">
          Trusted by revenue teams at
        </p>
        <HeroLogoMarquee />
      </motion.div>
    </div>
  );
}
