import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Lock, ShieldCheck, Server } from 'lucide-react';

const nodes = [
  { icon: Phone, label: 'Call Captured', detail: 'Voice Session', status: 'INITIATED' },
  { icon: Lock, label: 'Encrypted in Transit', detail: 'TLS 1.3 Protocol', status: 'ENCRYPTED' },
  { icon: ShieldCheck, label: 'Policy Checked', detail: 'RBAC Controls', status: 'VERIFIED' },
  { icon: Server, label: 'Stored Securely', detail: 'AES-256 Standard', status: 'PROTECTED' },
];

export default function SecureDataFlow() {
  return (
    <div className="relative w-full rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 sm:p-6 lg:p-8 overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white">Every conversation, secured end to end</h3>
          <p className="text-xs text-text-secondary mt-1 max-w-xl leading-relaxed">
            Watch a conversation move through encryption, policy checks, and secure storage in real-time.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-mono text-success uppercase tracking-widest font-semibold">
            SECURE PIPELINE / ACTIVE
          </span>
        </div>
      </div>

      <div className="relative w-full py-4 sm:py-6">
        {/* Horizontal Connector Line (Desktop) */}
        <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-white/[0.04] -translate-y-1/2 hidden sm:block z-0" />
        {/* Vertical Connector Line (Mobile) */}
        <div className="absolute left-[24px] top-6 bottom-6 w-[2px] bg-white/[0.04] sm:hidden z-0" />

        {/* Animated flow particle (Desktop) */}
        <motion.div
          className="absolute top-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#5b7cfa] -translate-y-1/2 hidden sm:block z-0"
          animate={{ left: ['4%', '96%'] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
        />
        {/* Animated flow particle (Mobile) */}
        <motion.div
          className="absolute left-[24px] w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#5b7cfa] sm:hidden z-0"
          animate={{ top: ['4%', '96%'] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Grid nodes list */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-4 relative z-10">
          {nodes.map(({ icon: Icon, label, detail, status }) => (
            <div key={label} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-3">
              {/* Node Icon Frame */}
              <div className="w-12 h-12 rounded-xl bg-[#09090b] border border-accent/25 flex items-center justify-center shadow-lg shrink-0">
                <Icon className="w-4.5 h-4.5 text-accent" />
              </div>
              
              {/* Node Label Details */}
              <div className="flex-1 sm:flex-none">
                <span className="hidden sm:inline-block text-[9px] font-mono text-accent uppercase tracking-wider bg-accent/5 px-2 py-0.5 rounded border border-accent/10 mb-1">
                  {status}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-white leading-tight">
                  {label}
                </h4>
                <p className="text-[10px] sm:text-xs text-text-secondary leading-normal mt-0.5">
                  {detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
