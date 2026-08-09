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
        <div className="glass-strong rounded-2xl p-6 space-y-4 shadow-2xl shadow-black/50 relative overflow-hidden">
          <GlassShimmer duration={9} width="20%" />
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">AI Agent Dashboard</div>
                <div className="text-xs text-text-secondary">Real-time monitoring</div>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-success">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Live
            </span>
          </div>

          {/* Live analytics row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Phone, label: 'Active Calls', value: 247, color: 'text-accent' },
              { icon: Sparkles, label: 'Qualified', value: 89, color: 'text-accent-secondary' },
              { icon: TrendingUp, label: 'Leads Today', value: 1247, color: 'text-success', suffix: '' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                <Icon className={`w-4 h-4 ${color} mb-1`} />
                <div className="text-lg font-bold text-white tabular-nums">
                  <Counter end={value} />
                </div>
                <div className="text-[10px] text-text-secondary">{label}</div>
              </div>
            ))}
          </div>

          {/* Live call card: waveform + realtime transcript */}
          <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Paras Yadav</div>
                  <div className="text-[10px] text-text-secondary">Enterprise Lead · Live</div>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-success/10 text-success text-[10px] font-medium rounded-full">Qualifying</span>
            </div>

            <LiveWaveform />

            <div className="mt-3 pt-3 border-t border-white/[0.06]">
              <HeroTranscript />
            </div>
          </div>

          {/* ROI bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-accent/10 to-accent-secondary/10 rounded-xl border border-accent/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-xs text-text-secondary">Monthly ROI</span>
            </div>
            <span className="text-sm font-bold text-success">+312%</span>
          </div>
        </div>

        {/* Floating card top-right — nearest depth layer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ x: layer2X, y: layer2Y }}
          className="absolute -top-5 -right-5 glass rounded-xl px-3 py-2 animate-float shadow-xl shadow-black/30"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-success" />
            </span>
            <div>
              <div className="text-[10px] text-text-secondary">Conversion</div>
              <div className="text-sm font-bold text-white">65.4%</div>
            </div>
          </div>
        </motion.div>

        {/* Floating card bottom-left — mid depth layer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{ x: layer1X, y: layer1Y }}
          className="absolute -bottom-5 -left-5 glass rounded-xl px-3 py-2 animate-float shadow-xl shadow-black/30"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
              <Phone className="w-3 h-3 text-accent" />
            </span>
            <div>
              <div className="text-[10px] text-text-secondary">Calls Today</div>
              <div className="text-sm font-bold text-white">2,847</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
