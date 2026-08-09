import { motion, useTransform } from 'framer-motion';
import { usePointerSpring } from '../hooks/usePointerSpring';
import { SPRING } from '../config';
import { cn } from '../../utils/cn';

/**
 * 3D pointer-follow tilt for cards. Set `glow` to layer in a matching
 * radial highlight (equivalent to composing with <Spotlight>, inlined here
 * since tilt and glow share the same pointer position and are almost
 * always used together).
 */
export default function Tilt({ children, className, intensity = 8, glow = true, cursorTag = 'card', ...rest }) {
  const { ref, x, y, onPointerMove, onPointerLeave } = usePointerSpring({ mode: 'element', spring: SPRING.tilt });

  const rotateX = useTransform(y, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(x, [0, 1], [-intensity, intensity]);
  const glowX = useTransform(x, (v) => `${v * 100}%`);
  const glowY = useTransform(y, (v) => `${v * 100}%`);
  const glowBg = useTransform([glowX, glowY], ([gx, gy]) => `radial-gradient(280px circle at ${gx} ${gy}, rgba(255,255,255,0.08), transparent 70%)`);

  return (
    <motion.div
      ref={ref}
      data-cursor={cursorTag}
      onMouseMove={onPointerMove}
      onMouseLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn('group relative will-change-transform', className)}
      {...rest}
    >
      {glow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: glowBg }}
        />
      )}
      {children}
    </motion.div>
  );
}
