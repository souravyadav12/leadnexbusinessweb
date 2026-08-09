import { motion } from 'framer-motion';

const logos = [
  'Acme Corp', 'TechFlow', 'Meridian', 'Quantum Health',
  'Apex Realty', 'NovaStar', 'Pinnacle', 'Vertex',
  'Catalyst', 'Horizon', 'Stellar', 'Prism',
];

const track = [...logos, ...logos];

export default function LogoCloud() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-20"
    >
      <p className="text-mono-label text-center text-xs text-text-tertiary mb-8">
        Trusted by industry-leading companies worldwide
      </p>
      <div
        className="relative overflow-hidden"
        style={{ maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}
      >
        <div className="flex w-max animate-marquee">
          {track.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center px-10 text-text-secondary/40 text-lg font-semibold tracking-wide hover:text-text-secondary/70 transition-colors whitespace-nowrap"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
