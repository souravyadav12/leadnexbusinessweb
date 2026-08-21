import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Phone, TrendingUp, Activity, Sparkles } from 'lucide-react';
import LiveWaveform from './LiveWaveform';
import HeroTranscript from './HeroTranscript';
import HeroNotifications from './HeroNotifications';
import Counter from '../../motion/components/Counter';
import GlassShimmer from '../../motion/background/layers/GlassShimmer';

export default function HeroDashboard() {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });

  // Depth layers: cards further "forward" move more than the base panel
  const rotX = useTransform(sy, [0, 1], [6, -6]);
  const rotY = useTransform(sx, [0, 1], [-6, 6]);
  const layer1X = useTransform(sx, [0, 1], [-10, 10]);
  const layer1Y = useTransform(sy, [0, 1], [-10, 10]);
  const layer2X = useTransform(sx, [0, 1], [-22, 22]);
  const layer2Y = useTransform(sy, [0, 1], [-22, 22]);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto"
    >
      <HeroNotifications />

      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
        className="relative will-change-transform"
      >
        {/* Main glass panel */}
        <div className="glass-strong rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xl shadow-black/50 relative overflow-hidden">
          <GlassShimmer duration={9} width="20%" />
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white">AI Agent Dashboard</div>
                <div className="text-[10px] sm:text-xs text-text-secondary">Real-time monitoring</div>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-success font-medium">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Live
            </span>
          </div>

          {/* Live analytics row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { icon: Phone, label: 'Active Calls', value: 247, color: 'text-accent' },
              { icon: Sparkles, label: 'Qualified', value: 89, color: 'text-accent-secondary' },
              { icon: TrendingUp, label: 'Leads Today', value: 1247, color: 'text-success' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-white/[0.03] rounded-xl p-2.5 sm:p-3 border border-white/[0.06]">
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${color} mb-1`} />
                <div className="text-base sm:text-lg font-bold text-white tabular-nums">
                  <Counter end={value} />
                </div>
                <div className="text-[9px] sm:text-[10px] text-text-secondary truncate">{label}</div>
              </div>
            ))}
          </div>

          {/* Live call card: waveform + realtime transcript */}
          <div className="bg-white/[0.03] rounded-xl p-3 sm:p-4 border border-white/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium text-white">Paras Yadav</div>
                  <div className="text-[9px] sm:text-[10px] text-text-secondary">Enterprise Lead · Live</div>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-success/10 text-success text-[9px] sm:text-[10px] font-medium rounded-full shrink-0">Qualifying</span>
            </div>

            <LiveWaveform />

            <div className="mt-3 pt-3 border-t border-white/[0.06]">
              <HeroTranscript />
            </div>
          </div>

          {/* ROI bar */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-accent/10 to-accent-secondary/10 rounded-xl border border-accent/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-success shrink-0" />
              <span className="text-xs text-text-secondary">Monthly ROI</span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-success">+312%</span>
          </div>
        </div>

        {/* Floating card top-right — responsive positioning */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ x: layer2X, y: layer2Y }}
          className="absolute -top-3 -right-2 sm:-top-5 sm:-right-5 glass rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 animate-float shadow-xl shadow-black/30 z-10"
        >
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-3 h-3 text-success" />
            </span>
            <div>
              <div className="text-[9px] sm:text-[10px] text-text-secondary">Conversion</div>
              <div className="text-xs sm:text-sm font-bold text-white">65.4%</div>
            </div>
          </div>
        </motion.div>

        {/* Floating card bottom-left — responsive positioning */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{ x: layer1X, y: layer1Y }}
          className="absolute -bottom-3 -left-2 sm:-bottom-5 sm:-left-5 glass rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 animate-float shadow-xl shadow-black/30 z-10"
        >
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
              <Phone className="w-3 h-3 text-accent" />
            </span>
            <div>
              <div className="text-[9px] sm:text-[10px] text-text-secondary">Calls Today</div>
              <div className="text-xs sm:text-sm font-bold text-white">2,847</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
