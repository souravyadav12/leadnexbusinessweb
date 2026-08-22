import React from 'react';
import { motion } from 'framer-motion';

export default function USPSection() {
  const comparisons = [
    { feature: 'Available 24/7/365 without shift gaps', traditional: 'No (High Overtime Cost)', leadnex: 'Yes (100% Uptime)' },
    { feature: 'Concurrent Call Scaling Capacity', traditional: 'Limited to Seat Count', leadnex: 'Unlimited (10,000+ Calls)' },
    { feature: 'Average Response Delay (Latency)', traditional: '3 - 15 Seconds', leadnex: 'Sub-300ms (Instant)' },
    { feature: 'Automatic CRM Logging & Transcript Sync', traditional: 'Manual (Prone to Error)', leadnex: 'Instant Real-time Sync' },
    { feature: 'Training & Onboarding Time', traditional: '3 - 6 Weeks', leadnex: 'Instant (Upload Playbook)' },
    { feature: 'Average Cost Per Completed Call', traditional: '$3.50 - $6.00 / call', leadnex: '< $0.10 / call' },
  ];

  return (
    <div className="w-full">
      {/* Section Sub-Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
          [ WHY ENTERPRISES SWITCH ]
        </span>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
          Traditional Call Centers vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">LeadNex AI</span>
        </h3>
        <p className="text-sm text-gray-400 mt-3">
          See why modern sales teams are replacing traditional offshore call centers with autonomous AI agents.
        </p>
      </div>

      {/* Interactive Glass Table Matrix */}
      <div className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0c12]/90 backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-gray-400">
              <th className="py-5 px-6 font-semibold">Capability / Metric</th>
              <th className="py-5 px-6 font-semibold text-gray-500">Traditional Call Centers</th>
              <th className="py-5 px-6 font-semibold text-indigo-400 bg-indigo-500/10 border-x border-indigo-500/20">
                LeadNex AI Agent
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {comparisons.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-medium text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  {row.feature}
                </td>
                <td className="py-4 px-6 text-gray-400 font-mono text-xs">
                  <span className="inline-flex items-center gap-1.5 text-rose-400/90 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20">
                    ✕ {row.traditional}
                  </span>
                </td>
                <td className="py-4 px-6 font-mono text-xs bg-indigo-500/[0.03] border-x border-indigo-500/10">
                  <span className="inline-flex items-center gap-1.5 text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/30 font-semibold shadow-sm">
                    ✓ {row.leadnex}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}