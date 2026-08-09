import { motion, useTransform } from 'framer-motion';
import { usePointerSpring } from '../hooks/usePointerSpring';
import { SPRING } from '../config';
import { cn } from '../../utils/cn';

/**
 * Wraps children in a relatively-positioned container with a radial light
 * that follows the pointer, fading in on hover. Purely decorative overlay —
 * doesn't affect layout or intercept pointer events.
 */
export default function Spotlight({
  children,
  className,
  size = 280,
  color = 'rgba(255,255,255,0.08)',
  spring = SPRING.tilt,
}) {
  const { ref, x, y, onPointerMove, onPointerLeave } = usePointerSpring({ mode: 'element', spring });
  const glowX = useTransform(x, (v) => `${v * 100}%`);
  const glowY = useTransform(y, (v) => `${v * 100}%`);
  const background = useTransform([glowX, glowY], ([gx, gy]) => `radial-gradient(${size}px circle at ${gx} ${gy}, ${color}, transparent 70%)`);

  return (
    <div
      ref={ref}
      onMouseMove={onPointerMove}
      onMouseLeave={onPointerLeave}
      className={cn('group relative', className)}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background }}
      />
      {children}
    </div>
  );
}
