import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

export default function FeatureGrid() {
  const [selectedLang, setSelectedLang] = useState('English');
  const [cloningState, setCloningState] = useState(true);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
      
      {/* HERO BENTO 1: Inbound & Outbound AI (Span 8 Columns) */}
      <div className="md:col-span-8">
        <FeatureCard
          badge="CORE VOICE ENGINE"
          title="Autonomous Inbound & Outbound Calling"
          description="Handle 10,000+ concurrent calls simultaneously. AI agents understand context, handle objections, and navigate complex phone trees with zero human lag."
          accentColor="indigo"
        >
          {/* Interactive Live Audio Visualizer Inside Card */}
          <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-gray-300">LIVE CALL #8492 — Active Outbound</span>
              </div>
              <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                Latency: 210ms
              </span>
            </div>

            {/* Audio Spectrum Wave Animation */}
            <div className="flex items-center justify-between gap-1 h-12 px-2">
              {[40, 75, 30, 95, 60, 100, 45, 80, 50, 90, 35, 70, 85, 40, 65, 95, 30, 80, 50, 75, 40].map((height, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [`${height * 0.2}%`, `${height}%`, `${height * 0.3}%`] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.04, ease: "easeInOut" }}
                  className="w-full bg-gradient-to-t from-indigo-600 via-indigo-400 to-purple-400 rounded-full opacity-80"
                />
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span>Agent Speech: Pitching Enterprise Tier</span>
              <span className="text-emerald-400 font-semibold">Sentiment: Positive (96%)</span>
            </div>
          </div>
        </FeatureCard>
      </div>

      {/* BENTO 2: Sub-300ms Latency Counter (Span 4 Columns) */}
      <div className="md:col-span-4">
        <FeatureCard
          badge="HUMAN-PARITY SPEED"
          title="Sub-300ms Latency"
          description="Feels like talking to a human. Zero awkward pauses or robotic delays."
          accentColor="emerald"
        >
          <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-emerald-950/30 to-black border border-emerald-500/20 flex flex-col items-center justify-center text-center">
            <div className="text-5xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 tracking-tight">
              230ms
            </div>
            <p className="text-xs text-emerald-400 font-mono mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Faster than human reaction time
            </p>
            <div className="w-full bg-white/5 rounded-full h-2 mt-4 overflow-hidden border border-white/10">
              <motion.div 
                animate={{ width: ['0%', '85%', '80%'] }} 
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                className="bg-emerald-500 h-full rounded-full" 
              />
            </div>
          </div>
        </FeatureCard>
      </div>

      {/* BENTO 3: Voice Cloning Widget (Span 4 Columns) */}
      <div className="md:col-span-4">
        <FeatureCard
          badge="BRAND IDENTITY"
          title="Instant Voice Cloning"
          description="Clone your top sales rep's voice in 60 seconds. Maintain brand consistency everywhere."
          accentColor="purple"
        >
          <div className="mt-6 p-4 rounded-xl bg-black/40 border border-purple-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300 font-medium">Voice DNA Profile</span>
              <button 
                onClick={() => setCloningState(!cloningState)}
                className="text-[10px] bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-1 rounded"
              >
                {cloningState ? 'Sample Active' : 'Play Sample'}
              </button>
            </div>
            
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center text-purple-300 text-xs font-bold">
                AI
              </div>
              <div className="flex-1">
                <div className="text-xs text-white font-semibold">Sarah (Sales VP Accent)</div>
                <div className="text-[10px] text-gray-400">Pitch Accent: US Executive</div>
              </div>
            </div>
          </div>
        </FeatureCard>
      </div>

      {/* BENTO 4: 30+ Multi-Language Engine (Span 4 Columns) */}
      <div className="md:col-span-4">
        <FeatureCard
          badge="GLOBAL REACH"
          title="30+ Native Languages"
          description="Detect customer language automatically and switch accents in real-time."
          accentColor="blue"
        >
          <div className="mt-6 p-4 rounded-xl bg-black/40 border border-blue-500/20">
            <div className="flex flex-wrap gap-2">
              {['English (US)', 'Spanish (ES)', 'German (DE)', 'French (FR)', 'Hindi (IN)', 'Japanese (JP)'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    selectedLang === lang
                      ? 'bg-blue-600 border-blue-400 text-white shadow-md shadow-blue-500/30 scale-105'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </FeatureCard>
      </div>

      {/* BENTO 5: 50+ Integrations Badge Grid (Span 4 Columns) */}
      <div className="md:col-span-4">
        <FeatureCard
          badge="CRM SYNC"
          title="50+ Native Integrations"
          description="Auto-log call notes, update lead statuses, and trigger calendar invites."
          accentColor="pink"
        >
          <div className="mt-6 p-4 rounded-xl bg-black/40 border border-pink-500/20 grid grid-cols-3 gap-2 text-center text-xs font-mono font-medium text-gray-300">
            {['HubSpot', 'Salesforce', 'Zapier', 'Make', 'Twilio', 'Calendar'].map((crm) => (
              <div key={crm} className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-pink-500/40 hover:bg-pink-500/10 transition">
                {crm}
              </div>
            ))}
          </div>
        </FeatureCard>
      </div>

      {/* HERO BENTO 6: Real-Time Analytics & Sentiment (Span 12 Columns) */}
      <div className="md:col-span-12">
        <FeatureCard
          badge="REVENUE INTELLIGENCE"
          title="Live Call Telemetry & Sentiment Analytics"
          description="Get granular insights into objection trends, win rates, talk-to-listen ratios, and customer sentiment metrics instantly after every call."
          accentColor="indigo"
        >
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Avg Call Duration', value: '3m 42s', change: '+14% vs Human reps' },
              { label: 'Booking Conversion', value: '42.8%', change: '3.2x Industry Standard' },
              { label: 'CRM Auto-Sync Speed', value: '1.2s', change: 'Zero manual entry' },
              { label: 'Compliance Score', value: '99.9%', change: 'SOC2 & HIPAA Ready' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10">
                <p className="text-xs text-gray-400 font-mono">{stat.label}</p>
                <p className="text-2xl font-bold font-mono text-white mt-1">{stat.value}</p>
                <p className="text-[11px] text-emerald-400 mt-1">{stat.change}</p>
              </div>
            ))}
          </div>
        </FeatureCard>
      </div>

    </div>
  );
}