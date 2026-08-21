import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Sparkles } from 'lucide-react';
import DemoWaveform from './DemoWaveform';
import DemoConversation from './DemoConversation';
import DemoInput from './DemoInput';
import { useCallSimulator } from './useCallSimulator';

const scenarios = {
  sales: {
    title: 'Sales Outreach',
    opener: "Hi there! I'm calling from LeadNex AI. We help companies automate their sales calls and increase conversion rates by up to 65%. Do you have a moment?",
  },
  support: {
    title: 'Customer Support',
    opener: "Thank you for calling LeadNex support. I'm your AI assistant. How can I help you today?",
  },
  appointment: {
    title: 'Appointment Booking',
    opener: "Hi! I'm calling from Dr. Smith's office to confirm your upcoming appointment. Is this a good time?",
  },
  realestate: {
    title: 'Real Estate',
    opener: "Good afternoon! I'm calling regarding your inquiry about the 3-bedroom home at 245 Oak Street. Are you still interested in scheduling a viewing?",
  },
};

const scenarioKeys = Object.keys(scenarios);

export default function DemoPhone() {
  const [activeScenario, setActiveScenario] = useState('sales');
  const [isMuted, setIsMuted] = useState(false);
  const scenario = scenarios[activeScenario];
  const sim = useCallSimulator();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [sim.messages, sim.isThinking]);

  const startCall = () => {
    sim.start([{ role: 'ai', text: scenario.opener }]);
  };

  const switchScenario = (key) => {
    setActiveScenario(key);
    sim.reset();
  };

  const isLive = sim.status === 'live';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Scenario tabs */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 justify-center">
        {scenarioKeys.map((key) => (
          <button
            key={key}
            onClick={() => switchScenario(key)}
            className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeScenario === key
                ? 'bg-accent text-white'
                : 'bg-white/5 text-text-secondary hover:text-white hover:bg-white/10'
            }`}
          >
            {scenarios[key].title}
          </button>
        ))}
      </div>

      {/* Phone UI */}
      <div className="glass rounded-2xl sm:rounded-3xl overflow-hidden">
        {/* Top bar */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <div className="text-xs sm:text-sm font-semibold text-white">{scenario.title}</div>
            <div className="text-[10px] sm:text-xs text-text-secondary flex items-center gap-1.5">
              {sim.status === 'idle' && 'Ready to start'}
              {sim.status === 'live' && (
                <>
                  <Sparkles className="w-3 h-3 text-accent" /> Live · {sim.formattedTime}
                </>
              )}
              {sim.status === 'ended' && 'Call ended'}
            </div>
          </div>
          <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-text-secondary/30'}`} />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Waveform */}
          <div className="mb-4">
            <DemoWaveform active={isLive && !sim.isThinking} />
          </div>

          {/* Conversation */}
          <DemoConversation messages={sim.messages} isThinking={sim.isThinking} scrollRef={scrollRef} />

          {/* Live text input — talk to the simulated agent */}
          <div className="mt-4">
            <DemoInput onSend={sim.sendUserMessage} disabled={!isLive} />
          </div>
        </div>

        {/* Controls */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/[0.06] flex items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
              isMuted ? 'bg-danger/20 text-danger' : 'bg-white/5 text-text-secondary hover:bg-white/10'
            }`}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Mic className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {!isLive ? (
            <button
              onClick={startCall}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-accent to-accent-secondary flex items-center justify-center text-white hover:shadow-lg hover:shadow-accent/30 transition-all cursor-pointer shrink-0"
              aria-label="Start call"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          ) : (
            <button
              onClick={sim.end}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-danger flex items-center justify-center text-white hover:bg-danger/80 transition-all cursor-pointer shrink-0"
              aria-label="End call"
            >
              <PhoneOff className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          <button
            onClick={sim.reset}
            className="px-3.5 sm:px-4 h-10 sm:h-12 rounded-full bg-white/5 text-text-secondary text-xs font-medium flex items-center justify-center hover:bg-white/10 hover:text-white transition-all cursor-pointer shrink-0"
          >
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
}
