import { motion } from 'framer-motion';
import Badge from '../common/Badge';
import HeroCTA from './HeroCTA';
import HeroLogoMarquee from './HeroLogoMarquee';
import TextReveal from '../../motion/components/TextReveal';

export default function HeroContent() {
  return (
    // max-w-full ensure karega ki ye parent div se bahar na jaye
    <div className="w-full max-w-full sm:max-w-xl lg:max-w-lg xl:max-w-2xl flex flex-col justify-center">
      
      {/* Badge Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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

      {/* Main Heading - Sizes reduced for desktop to give room to dashboard */}
      <h1 className="mt-5 sm:mt-6 text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4.5rem] text-white font-bold leading-[1.15] sm:leading-[1.05] tracking-tight break-words">
        <TextReveal text="Voice agents" delay={0.1} />
        {/* br sirf desktop/tablet pe line todega, mobile pe normal wrap hoga */}
        <br className="hidden sm:block" />
        <TextReveal text="that" delay={0.3} />{' '}
        <span className="gradient-text inline">
          <TextReveal text="close deals" delay={0.4} />
        </span>
        <br className="hidden sm:block" />
        <TextReveal text="while you sleep" delay={0.6} />
      </h1>

      {/* Description Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-text-secondary w-full max-w-[95%] sm:max-w-lg leading-relaxed break-words"
      >
        Deploy human-like AI calling agents that handle inbound and outbound
        calls 24/7. Qualify leads, book meetings, and close sales — at
        enterprise scale.
      </motion.p>

      {/* Call to Action Buttons */}
      <div className="mt-6 sm:mt-8 w-full max-w-[95%] sm:max-w-md">
        <HeroCTA />
      </div>

      {/* Logo Marquee Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
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