import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ badge, title, description, children, accentColor = 'indigo' }) {
  const accentGlows = {
    indigo: 'hover:border-indigo-500/40 hover:shadow-indigo-500/10',
    emerald: 'hover:border-emerald-500/40 hover:shadow-emerald-500/10',
    purple: 'hover:border-purple-500/40 hover:shadow-purple-500/10',
    blue: 'hover:border-blue-500/40 hover:shadow-blue-500/10',
    pink: 'hover:border-pink-500/40 hover:shadow-pink-500/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`h-full w-full p-6 sm:p-8 rounded-2xl bg-[#0b0d14]/80 backdrop-blur-xl border border-white/10 ${accentGlows[accentColor]} transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden`}
    >
      {/* Background Micro Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-500 pointer-events-none" />

      <div>
        {badge && (
          <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md mb-4 inline-block">
            {badge}
          </span>
        )}

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-indigo-200 transition-colors">
          {title}
        </h3>

        <p className="mt-3 text-sm text-gray-400 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {children}
    </motion.div>
  );
}