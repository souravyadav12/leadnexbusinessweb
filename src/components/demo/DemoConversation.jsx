import { motion, AnimatePresence } from 'framer-motion';

export default function DemoConversation({ messages, visibleCount, isThinking, scrollRef }) {
  const visible = visibleCount != null ? messages.slice(0, visibleCount) : messages;

  return (
    <div
      ref={scrollRef}
      className="space-y-3 min-h-[200px] max-h-[280px] overflow-y-auto px-1 scrollbar-thin"
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        {visible.map((msg, i) => (
          <motion.div
            key={`${msg.role}-${i}`}
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'ai'
                  ? 'bg-accent/10 text-white border border-accent/20 rounded-tl-sm'
                  : 'bg-white/5 text-text-secondary border border-white/10 rounded-tr-sm'
              }`}
            >
              <span className={`text-[10px] font-semibold block mb-1 ${msg.role === 'ai' ? 'text-accent' : 'text-accent-secondary'}`}>
                {msg.role === 'ai' ? 'LeadNex AI' : 'Customer'}
              </span>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isThinking && (
          <motion.div
            key="thinking"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-start"
          >
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-accent/10 border border-accent/20 flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-accent"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
