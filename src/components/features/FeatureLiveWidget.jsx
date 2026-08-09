import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function CallCounterWidget() {
  const [count, setCount] = useState(2847);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 3)), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] w-fit">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-60" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
      </span>
      <div>
        <div className="text-lg font-bold text-white tabular-nums">{count.toLocaleString()}</div>
        <div className="text-[11px] text-text-secondary">calls answered live today</div>
      </div>
    </div>
  );
}

function AnalyticsWidget() {
  const [bars, setBars] = useState([40, 65, 50, 80, 60, 90]);
  useEffect(() => {
    const id = setInterval(() => {
      setBars((b) => b.map(() => 30 + Math.random() * 65));
    }, 1600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-end gap-1.5 h-14 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] w-fit">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-2.5 rounded-full bg-gradient-to-t from-accent to-accent-secondary"
          animate={{ height: `${h}%` }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

const widgets = {
  calls: CallCounterWidget,
  analytics: AnalyticsWidget,
};

export default function FeatureLiveWidget({ variant }) {
  const Widget = widgets[variant];
  if (!Widget) return null;
  return (
    <div className="mt-5">
      <Widget />
    </div>
  );
}
