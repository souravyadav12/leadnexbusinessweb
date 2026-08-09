import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { SPRING } from '../../motion/config';
import { useReducedMotion } from '../../motion/hooks/useReducedMotion';
import { useRipple } from '../../motion/hooks/useRipple';
import Ripple from '../../motion/components/Ripple';

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconRight,
  loading = false,
  disabled = false,
  className,
  onClick,
  ...props
}) {
  const ref = useRef(null);
  const isDisabled = disabled || loading;
  const reducedMotion = useReducedMotion();
  const { ripples, onPointerDown } = useRipple();

  // Same SPRING.magnetic physics as MagneticButton elsewhere in the app —
  // previously this used a hand-rolled 200/15/0.4 spring via raw CSS custom
  // properties, which made primary CTAs feel subtly "off" next to every
  // other magnetic element. Unified here.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, SPRING.magnetic);
  const y = useSpring(my, SPRING.magnetic);

  const handlePointerDown = (e) => {
    if (isDisabled) return;
    onPointerDown(e);
  };

  const handleMouseMove = (e) => {
    if (isDisabled || reducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.12);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.22);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const base =
    'group relative inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-[box-shadow,background,border,color] duration-300 ease-[var(--ease-out)] cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed will-change-transform';

  const variants = {
    primary: 'bg-accent text-white hover:shadow-[var(--shadow-glow-accent)] active:scale-[0.97]',
    secondary:
      'glass border border-white/12 text-white hover:bg-white/[0.08] hover:border-white/25 active:scale-[0.97]',
    ghost: 'text-text-secondary hover:text-white hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs tracking-wide',
    md: 'px-6 py-3 text-sm tracking-wide',
    lg: 'px-8 py-4 text-sm tracking-wide',
  };

  return (
    <motion.button
      ref={ref}
      data-cursor={isDisabled ? 'hide' : 'link'}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onClick={onClick}
      whileTap={isDisabled ? undefined : { scale: 0.96 }}
      style={{ x, y }}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <Ripple ripples={ripples} color={variant === 'primary' ? 'rgba(255,255,255,0.3)' : 'rgba(91,124,250,0.25)'} />

      {loading && <Loader2 className="w-4 h-4 animate-spin-loading flex-shrink-0" aria-hidden="true" />}
      <span className={cn('inline-flex items-center gap-2 transition-opacity duration-200', loading && 'opacity-0 absolute')}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
        {iconRight && (
          <span className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
            {iconRight}
          </span>
        )}
      </span>
    </motion.button>
  );
}
