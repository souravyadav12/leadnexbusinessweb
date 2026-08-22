import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Sparkles, ChevronDown } from 'lucide-react';
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

const voiceModels = [
  { id: 'sarah', name: 'Sarah (Support Voice)' },
  { id: 'marcus', name: 'Marcus (Sales Voice)' },
  { id: 'rachel', name: 'Rachel (Executive Voice)' }
];

const scenarioKeys = Object.keys(scenarios);

export default function DemoPhone() {
  const [activeScenario, setActiveScenario] = useState('sales');
  const [voiceModel, setVoiceModel] = useState('sarah');
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
      className="w-full max-w-2xl mx-auto lg:mr-0"
    >
      {/* Scenario tabs */}
      <div className="flex overflow-x-auto md:flex-wrap items-center gap-2 mb-4 pb-1.5 md:pb-0 justify-start md:justify-center w-full scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-1 md:px-0">
        {scenarioKeys.map((key) => (
          <button
            key={key}
            onClick={() => switchScenario(key)}
            className={`px-3 py-1.5 text-[11px] sm:text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer shrink-0 border ${
              activeScenario === key
                ? 'bg-accent text-white border-accent/40 shadow-lg shadow-accent/15'
                : 'bg-white/5 text-text-secondary border-white/[0.04] hover:text-white hover:bg-white/10'
            }`}
          >
            {scenarios[key].title}
          </button>
        ))}
      </div>

      {/* Console Frame */}
      <div className="glass rounded-2xl border border-indigo-500/20 overflow-hidden shadow-2xl shadow-indigo-950/20">
        {/* Top Control Bar */}
        <div className="px-4 sm:px-6 py-4 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-text-secondary uppercase tracking-wider mb-1">Scenario</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {scenario.title}
            </div>
          </div>

          {/* Voice Model Dropdown */}
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-1.5">
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider shrink-0">Model:</span>
            <div className="relative flex items-center">
              <select
                value={voiceModel}
                onChange={(e) => setVoiceModel(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white/95 focus:outline-none pr-5 cursor-pointer appearance-none"
              >
                {voiceModels.map((m) => (
                  <option key={m.id} value={m.id} className="bg-bg-secondary text-white">
                    {m.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-text-secondary absolute right-0 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* WebRTC & Sentiment Status Tracker Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-black/40 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-ping' : 'bg-white/10'}`} />
            <span className="text-text-secondary text-[10px]">
              RTC Network: {isLive ? <span className="text-success font-semibold">CONNECTED · 210ms latency</span> : 'IDLE'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-text-secondary text-[10px]">
              Sentiment Analysis: <span className={isLive ? 'text-accent font-bold' : 'text-text-tertiary'}>
                {isLive ? (sim.messages.length > 1 ? 'Intent: High Interest (94%)' : 'Listening…') : 'STANDBY'}
              </span>
            </span>
          </div>
        </div>

        {/* Console Interactive Content */}
        <div className="p-4 sm:p-6">
          {/* Waveform Visualization area */}
          <div className="mb-4 bg-black/35 rounded-xl p-3.5 border border-white/[0.04] flex flex-col items-center justify-center min-h-[68px]">
            <span className="text-[9px] font-mono text-text-tertiary mb-1.5 uppercase tracking-widest">
              Live WebRTC Audio Channel
            </span>
            <DemoWaveform active={isLive && !sim.isThinking} />
          </div>

          {/* Conversation Feed */}
          <DemoConversation messages={sim.messages} isThinking={sim.isThinking} scrollRef={scrollRef} />

          {/* Prompt Buttons / Live Text input */}
          <div className="mt-4">
            <DemoInput onSend={sim.sendUserMessage} disabled={!isLive} />
          </div>
        </div>

        {/* Audio Console Bottom Buttons */}
        <div className="px-4 sm:px-6 py-4 border-t border-white/[0.06] flex items-center justify-center gap-4 bg-black/20">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 border ${
              isMuted 
                ? 'bg-danger/20 text-danger border-danger/30 shadow-lg shadow-danger/5' 
                : 'bg-white/5 text-text-secondary border-white/[0.06] hover:bg-white/10'
            }`}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {!isLive ? (
            <button
              onClick={startCall}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-accent to-accent-secondary flex items-center justify-center text-white hover:shadow-lg hover:shadow-accent/30 transition-all cursor-pointer shrink-0 shadow-lg shadow-accent/15 border border-accent/20"
              aria-label="Start call"
            >
              <Phone className="w-5 h-5 text-white" />
            </button>
          ) : (
            <button
              onClick={sim.end}
              className="w-14 h-14 rounded-full bg-danger flex items-center justify-center text-white hover:bg-danger/80 transition-all cursor-pointer shrink-0 shadow-lg shadow-danger/15 border border-danger/20"
              aria-label="End call"
            >
              <PhoneOff className="w-5 h-5 text-white" />
            </button>
          )}

          <button
            onClick={sim.reset}
            className="px-4 h-11 rounded-full bg-white/5 border border-white/[0.06] text-text-secondary text-xs font-mono font-semibold flex items-center justify-center hover:bg-white/10 hover:text-white transition-all cursor-pointer shrink-0"
          >
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
}
