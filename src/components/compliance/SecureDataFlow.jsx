import { motion } from 'framer-motion';
import { Phone, Lock, ShieldCheck, Server } from 'lucide-react';

const nodes = [
  { icon: Phone, label: 'Call captured', x: 60 },
  { icon: Lock, label: 'Encrypted in transit', x: 260 },
  { icon: ShieldCheck, label: 'Policy checked', x: 460 },
  { icon: Server, label: 'Stored (AES-256)', x: 660 },
];

const particleCount = 4;

export default function SecureDataFlow() {
  return (
    <div className="relative w-full rounded-2xl glass p-6 lg:p-10 overflow-hidden">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Every conversation, secured end to end</h3>
        <p className="text-sm text-text-secondary mt-1 max-w-xl">
          Watch how a single call moves through encryption, policy checks, and secure storage — automatically, on every interaction.
        </p>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 720 160" className="w-full min-w-[600px] h-[160px]" role="img" aria-label="Diagram showing a call flowing through encryption, compliance checks, and secure storage">
          {/* base line */}
          <line x1="60" y1="80" x2="660" y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

          {/* animated particles traveling along the line */}
          {Array.from({ length: particleCount }).map((_, i) => (
            <motion.circle
              key={i}
              r="4"
              fill="var(--color-accent)"
              initial={{ cx: 60, cy: 80, opacity: 0 }}
              animate={{ cx: [60, 660], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                delay: i * (3.2 / particleCount),
                ease: 'linear',
              }}
              cy={80}
            />
          ))}

          {nodes.map((node, i) => (
            <g key={node.label} transform={`translate(${node.x}, 80)`}>
              <motion.circle
                r="26"
                fill="rgba(91,124,250,0.08)"
                stroke="rgba(91,124,250,0.35)"
                strokeWidth="1.5"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
              />
            </g>
          ))}
        </svg>

        {/* Icon + label overlay, positioned to match SVG node x-coordinates proportionally */}
        <div className="absolute inset-0 flex items-center justify-between px-[4.5%]">
          {nodes.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 w-24 -translate-y-1">
              <div className="w-10 h-10 rounded-full bg-bg-card border border-accent/30 flex items-center justify-center">
                <Icon className="w-4 h-4 text-accent" />
              </div>
              <span className="text-[10px] text-text-secondary text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
