import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Globe, MessageCircle, BookOpen, Video, ArrowUpRight, Check } from 'lucide-react';
import Background from '../../motion/background/Background';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'AI Voice Agent', href: '#features' },
      { label: 'Inbound Calls', href: '#demo' },
      { label: 'Outbound Calls', href: '#demo' },
      { label: 'Voice Cloning', href: '#features' },
      { label: 'Analytics', href: '#compliance' },
      { label: 'Integrations', href: '#features' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Sales Teams', href: '#workflow' },
      { label: 'Support Centers', href: '#demo' },
      { label: 'Healthcare' },
      { label: 'Real Estate' },
      { label: 'Insurance' },
      { label: 'Financial Services' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation' },
      { label: 'API Reference' },
      { label: 'Blog' },
      { label: 'Case Studies', href: '#testimonials' },
      { label: 'Webinars' },
      { label: 'Community' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us' },
      { label: 'Careers' },
      { label: 'Press' },
      { label: 'Contact', href: '#contact' },
      { label: 'Partners' },
      { label: 'Security', href: '#compliance' },
    ],
  },
];

const socialIcons = [
  { Icon: Globe, label: 'Website' },
  { Icon: MessageCircle, label: 'Community' },
  { Icon: BookOpen, label: 'Blog' },
  { Icon: Video, label: 'Tutorials' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError(true);
      return;
    }
    setError(false);
    setSubscribed(true);
  };

  return (
    <footer className="relative bg-bg-primary border-t border-white/5 overflow-hidden" role="contentinfo">
      <Background preset="minimal" />

      {/* Editorial masthead line */}
      <div className="section-padding relative pt-16 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/[0.06]"
        >
          <div>
            <span className="text-mono-label text-[10px] text-accent">LeadNex AI · Est. 2023</span>
            <h2 className="text-display text-3xl sm:text-4xl lg:text-5xl text-white mt-3 max-w-xl">
              Let's put your calls <span className="gradient-text">on autopilot.</span>
            </h2>
          </div>
          <a
            href="#pricing"
            data-cursor="link"
            className="group inline-flex items-center gap-2 self-start lg:self-auto text-white text-sm font-semibold border-b border-white/20 pb-1 hover:border-accent transition-colors"
          >
            Start your free trial
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>

      <div className="section-padding py-14 lg:py-16 relative">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand col */}
          <div className="col-span-2">
            <a href="#hero" className="flex items-center gap-2 mb-4" aria-label="LeadNex AI — back to top">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white tracking-tight">
                LeadNex<span className="text-accent">.Ai</span>
              </span>
            </a>
            <p className="text-text-secondary text-sm mb-6 max-w-xs">
              Enterprise AI calling agents that handle millions of conversations with human-like precision.
            </p>
            {/* Newsletter */}
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-success"
                  role="status"
                  aria-live="polite"
                >
                  <Check className="w-4 h-4" /> Subscribed — thanks for joining!
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubscribe}
                  noValidate
                  className="flex gap-2"
                >
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (error) setError(false); }}
                      placeholder="Enter your email"
                      aria-label="Email for newsletter"
                      aria-invalid={error || undefined}
                      className={`w-full px-4 py-2.5 bg-bg-card border rounded-xl text-sm text-white placeholder:text-text-secondary focus:outline-none transition-colors ${
                        error ? 'border-danger/60 focus:border-danger' : 'border-white/10 focus:border-accent/50'
                      }`}
                    />
                    {error && (
                      <p className="text-xs text-danger mt-1.5">Enter a valid email address.</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gradient-to-r from-accent to-accent-secondary text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/20 transition-all cursor-pointer shrink-0 self-start"
                  >
                    Subscribe
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socialIcons.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-mono-label text-[10px] text-text-tertiary mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-text-secondary hover:text-white transition-colors"
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="text-sm text-text-secondary/40 cursor-default select-none">
                        {label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} LeadNex AI, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-text-secondary/40 cursor-default select-none">Privacy Policy</span>
            <span className="text-sm text-text-secondary/40 cursor-default select-none">Terms of Service</span>
            <span className="text-sm text-text-secondary/40 cursor-default select-none">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
