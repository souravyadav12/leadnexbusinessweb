import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarCheck2, PhoneCall, TrendingUp } from 'lucide-react';

const events = [
  { icon: PhoneCall, text: 'New call from Austin, TX', accent: 'text-accent' },
  { icon: CalendarCheck2, text: 'Meeting booked with Sarah K.', accent: 'text-success' },
  { icon: TrendingUp, text: 'Lead qualified · 94% match', accent: 'text-accent-secondary' },
];

export default function HeroNotifications() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    let i = 0;
    let hideTimeout;
    const show = () => {
      setActive(events[i % events.length]);
      i += 1;
      hideTimeout = setTimeout(() => setActive(null), 3000);
    };
    show();
    const id = setInterval(show, 4600);
    return () => {
      clearInterval(id);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div className="absolute left-2 sm:-left-10 top-1/2 -translate-y-1/2 z-20 pointer-events-none" aria-live="polite">
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, x: -16, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -16, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="glass rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 flex items-center gap-2 sm:gap-2.5 shadow-2xl shadow-black/40 max-w-[170px] sm:max-w-[190px]"
          >
            <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 ${active.accent}`}>
              <active.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </span>
            <span className="text-[10px] sm:text-[11px] text-white leading-tight">{active.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
