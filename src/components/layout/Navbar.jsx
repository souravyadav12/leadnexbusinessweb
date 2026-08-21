import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkle } from 'lucide-react';
import Button from '../common/Button';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useSectionReadiness } from '../../utils/SectionReadinessManager';

const navLinks = [
  { number: '01', label: 'Demo', href: '#demo', id: 'demo' },
  { number: '02', label: 'How it Works', href: '#workflow', id: 'workflow' },
  { number: '03', label: 'Features', href: '#features', id: 'features' },
  { number: '04', label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
  { number: '05', label: 'Pricing', href: '#pricing', id: 'pricing' },
  { number: '06', label: 'Security', href: '#compliance', id: 'compliance' },
];

const sectionIds = navLinks.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const spyActiveId = useScrollSpy(sectionIds);
  const [manualActiveId, setManualActiveId] = useState(null);
  const { prefetchSection } = useSectionReadiness('navbar');

  const activeId = manualActiveId || spyActiveId;

  // Clear manual override when scroll spy matches or scrolls
  useEffect(() => {
    if (manualActiveId === spyActiveId) {
      setManualActiveId(null);
    }
  }, [spyActiveId, manualActiveId]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    setManualActiveId(id);
    prefetchSection(id);
    setMobileOpen(false);

    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [prefetchSection]);

  const handleNavHover = useCallback((id) => {
    prefetchSection(id);
  }, [prefetchSection]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none" role="banner">
      <div className={`transition-all duration-300 ${scrolled ? 'pt-3' : 'pt-5'}`}>
        <nav
          className={`pointer-events-auto mx-4 sm:mx-6 lg:mx-auto flex items-center justify-between transition-all duration-300 ${scrolled
              ? 'max-w-4xl glass-strong rounded-full h-14 px-5 shadow-2xl shadow-black/40'
              : 'max-w-6xl bg-transparent rounded-full h-16 px-6'
            }`}
          aria-label="Main navigation"
        >
          <AnimatePresence>
            {!scrolled && (
              <motion.a
                initial={{ opacity: 0, width: 0, marginRight: 0 }}
                animate={{ opacity: 1, width: 'auto', marginRight: 16 }}
                exit={{ opacity: 0, width: 0, marginRight: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                href="#"
                className="flex items-center gap-2 group shrink-0 overflow-hidden"
                aria-label="LeadNex AI Home"
              >
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/20 transition-transform duration-300 group-hover:rotate-12 flex-shrink-0">
                  <Sparkle className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-base font-semibold text-white tracking-tight whitespace-nowrap">
                  LeadNex<span className="text-accent">.Ai</span>
                </span>
              </motion.a>
            )}
          </AnimatePresence>

          <div className="hidden xl:flex items-center gap-1 mx-auto" role="menubar">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor="link"
                  onClick={(e) => handleNavClick(e, link.id)}
                  onMouseEnter={() => handleNavHover(link.id)}
                  onFocus={() => handleNavHover(link.id)}
                  className={`relative px-4 py-2 text-sm transition-colors duration-200 rounded-full ${isActive ? 'text-white font-medium' : 'text-text-secondary hover:text-white hover:bg-white/5'
                    }`}
                  role="menuitem"
                  aria-current={isActive ? 'true' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/15"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    <span className="text-[10px] font-mono opacity-50 text-accent group-hover:opacity-100 transition-opacity">
                      {link.number}
                    </span>
                    <span>{link.label}</span>
                  </span>
                </a>
              );
            })}
          </div>

          <AnimatePresence>
            {!scrolled && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="hidden xl:flex items-center gap-2 overflow-hidden flex-shrink-0"
              >
                <Button variant="ghost" size="sm">Sign In</Button>
                <Button variant="primary" size="sm" className="whitespace-nowrap">
                  Book a Demo
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="xl:hidden p-2 text-white pointer-events-auto ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto xl:hidden mx-4 mt-2 glass-strong rounded-3xl overflow-hidden max-h-[calc(100vh-100px)] overflow-y-auto"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-base transition-colors py-2.5 border-b border-white/5 last:border-0 flex items-center gap-2 ${isActive ? 'text-accent font-semibold' : 'text-text-secondary hover:text-white'
                      }`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    onMouseEnter={() => handleNavHover(link.id)}
                  >
                    <span className="text-xs font-mono text-accent">{link.number}</span>
                    <span>{link.label}</span>
                  </a>
                );
              })}
              <div className="pt-5 flex flex-col gap-3">
                <Button variant="secondary" size="md" className="w-full">Sign In</Button>
                <Button variant="primary" size="md" className="w-full">Book a Demo</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
