import { motion } from 'framer-motion';
import { PhoneIncoming, Check, CalendarCheck2, RefreshCw, TrendingUp } from 'lucide-react';
import Waveform from '../../motion/components/Waveform';
import Counter from '../../motion/components/Counter';

const item = {
  hidden: { opacity: 0, y: 10 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.12, duration: 0.45, ease: [0.16, 1, 0.3, 1] } }),
};

// 1 — Lead Arrives: an incoming call notification
export function StageLeadArrives() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative mb-6"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-accent/30"
          animate={{ scale: [1, 1.8, 1.8], opacity: [0.5, 0, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
        <div className="relative w-16 h-16 rounded-full bg-accent flex items-center justify-center">
          <PhoneIncoming className="w-7 h-7 text-white" />
        </div>
      </motion.div>
      <motion.p variants={item} custom={0} initial="hidden" animate="show" className="text-mono-label text-[10px] text-accent mb-1">
        Incoming call
      </motion.p>
      <motion.p variants={item} custom={1} initial="hidden" animate="show" className="text-white font-semibold">
        +1 (415) 555-0182
      </motion.p>
      <motion.p variants={item} custom={2} initial="hidden" animate="show" className="text-xs text-text-tertiary mt-1">
        Routed in 240ms — no queue
      </motion.p>
    </div>
  );
}

// 2 — AI Answers: live transcript with waveform
export function StageAIAnswers() {
  return (
    <div className="flex flex-col h-full justify-center gap-4">
      <Waveform active bars={28} maxHeight={26} minHeight={3} />
      <div className="space-y-2.5 mt-2">
        <motion.div variants={item} custom={0} initial="hidden" animate="show" className="bg-white/[0.06] rounded-xl rounded-tl-sm px-3.5 py-2 text-sm text-white/90 w-fit max-w-[85%]">
          "Hi, I'm calling about the enterprise plan..."
        </motion.div>
        <motion.div variants={item} custom={1} initial="hidden" animate="show" className="bg-accent/15 rounded-xl rounded-tr-sm px-3.5 py-2 text-sm text-white ml-auto w-fit max-w-[85%]">
          "I can help with that — how many seats?"
        </motion.div>
      </div>
    </div>
  );
}

// 3 — Qualifies: score ring filling
export function StageQualifies() {
  const checks = ['Budget confirmed', 'Decision maker', 'Timeline: this quarter'];
  return (
    <div className="flex flex-col h-full justify-center gap-6">
      <div className="flex items-center gap-5">
        <div className="relative w-20 h-20 shrink-0">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
            <motion.circle
              cx="40" cy="40" r="34" fill="none" stroke="url(#qGrad)" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 34}
              initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - 0.87) }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
            <defs>
              <linearGradient id="qGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5B7CFA" />
                <stop offset="100%" stopColor="#8F98A8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Counter end={87} suffix="" className="text-lg font-bold text-white" />
          </div>
        </div>
        <div>
          <p className="text-mono-label text-[10px] text-accent mb-1">Lead score</p>
          <p className="text-white font-semibold">Highly qualified</p>
        </div>
      </div>
      <ul className="space-y-2">
        {checks.map((c, i) => (
          <motion.li key={c} variants={item} custom={i} initial="hidden" animate="show" className="flex items-center gap-2.5 text-sm text-text-secondary">
            <Check className="w-4 h-4 text-success shrink-0" />
            {c}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// 4 — Books Meeting: calendar slot confirming
export function StageBooksMeeting() {
  const days = ['M', 'T', 'W', 'T', 'F'];
  return (
    <div className="flex flex-col h-full justify-center gap-5">
      <div className="grid grid-cols-5 gap-2">
        {days.map((d, i) => (
          <motion.div
            key={i}
            variants={item}
            custom={i}
            initial="hidden"
            animate="show"
            className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
              i === 3 ? 'bg-accent text-white' : 'bg-white/[0.05] text-text-tertiary'
            }`}
          >
            {d}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="flex items-center gap-3 bg-success/10 border border-success/20 rounded-xl px-4 py-3"
      >
        <CalendarCheck2 className="w-5 h-5 text-success shrink-0" />
        <div>
          <p className="text-sm text-white font-medium">Thu, 2:30 PM booked</p>
          <p className="text-xs text-text-tertiary">Confirmation sent automatically</p>
        </div>
      </motion.div>
    </div>
  );
}

// 5 — CRM Updates: record auto-populating
export function StageCRMUpdates() {
  const fields = [
    ['Contact', 'Marcus Chen'],
    ['Stage', 'Qualified'],
    ['Deal size', '$48,000'],
    ['Next step', 'Demo scheduled'],
  ];
  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex items-center gap-2 mb-4">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}>
          <RefreshCw className="w-3.5 h-3.5 text-accent" />
        </motion.div>
        <span className="text-mono-label text-[10px] text-accent">Syncing record</span>
      </div>
      <div className="divide-y divide-white/[0.06] border-t border-b border-white/[0.06]">
        {fields.map((f, i) => (
          <motion.div key={f[0]} variants={item} custom={i} initial="hidden" animate="show" className="flex items-center justify-between py-2.5 text-sm">
            <span className="text-text-tertiary">{f[0]}</span>
            <span className="text-white font-medium">{f[1]}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 6 — Analytics Updates: dashboard bars growing
export function StageAnalyticsUpdates() {
  const bars = [40, 65, 50, 85, 60, 95];
  return (
    <div className="flex flex-col h-full justify-center gap-5">
      <div className="flex items-baseline gap-2">
        <TrendingUp className="w-4 h-4 text-success" />
        <Counter end={94.2} decimals={1} suffix="%" className="text-2xl font-bold text-white" />
        <span className="text-xs text-text-tertiary">conversion this week</span>
      </div>
      <div className="flex items-end gap-2 h-24">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 rounded-t-md bg-gradient-to-t from-accent/40 to-accent"
          />
        ))}
      </div>
    </div>
  );
}
