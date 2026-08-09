import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const lines = [
  { role: 'ai', text: "Hi, I'm calling about your inquiry — is now a good time?" },
  { role: 'user', text: 'Sure, go ahead.' },
  { role: 'ai', text: 'Great — I can get you booked in for Thursday at 2 PM.' },
  { role: 'user', text: "That works, let's do it." },
  { role: 'ai', text: "Perfect, you're all set. Sending a calendar invite now." },
];

export default function HeroTranscript() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % lines.length), 2600);
    return () => clearInterval(id);
  }, []);

  const line = lines[index];

  return (
    <div className="min-h-[3.25rem]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="flex gap-2"
        >
          <span
            className={`text-[9px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 h-fit ${
              line.role === 'ai' ? 'bg-accent/20 text-accent' : 'bg-accent-secondary/20 text-accent-secondary'
            }`}
          >
            {line.role === 'ai' ? 'AI' : 'User'}
          </span>
          <p className="text-xs text-text-secondary leading-relaxed">{line.text}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
