import React from 'react';
import { motion } from 'framer-motion';

export default function SecurityCard({ icon: Icon, code, title, description, status, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -2 }}
      className="group rounded-2xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-md p-5 flex flex-col justify-between shadow-lg hover:shadow-accent/5 hover:border-accent/30 hover:bg-white/[0.03] transition-all duration-300 relative overflow-hidden"
    >
      {/* Background radial glow on hover */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-accent/[0.02] rounded-full blur-2xl group-hover:bg-accent/[0.04] transition-all duration-500 pointer-events-none" />

      <div>
        {/* Top metadata row */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-[9px] font-mono text-text-tertiary tracking-widest uppercase">
            {code}
          </span>
          <span className="text-[8px] font-mono font-semibold tracking-wider text-accent border border-accent/20 bg-accent/5 px-2 py-0.5 rounded uppercase">
            {status}
          </span>
        </div>

        {/* Icon + Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/5 border border-accent/15 flex items-center justify-center text-accent group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300 shrink-0">
            <Icon className="w-4.5 h-4.5" />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-none group-hover:text-accent transition-colors duration-300">
            {title}
          </h4>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mt-4 font-normal">
        {description}
      </p>
    </motion.div>
  );
}
