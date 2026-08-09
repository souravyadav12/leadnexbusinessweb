import { motion, useTransform, useSpring } from 'framer-motion';
import { SPRING } from '../../config';
import { useSharedMouse } from '../MouseProvider';

/**
 * A soft radial light that trails the pointer across the whole viewport,
 * reading via the shared MouseProvider (no listener of its own). Only a
 * gentle offset from center — this should feel like the scene subtly
 * leaning toward the cursor, not a spotlight follow-cam.
 */
export default function MouseReactiveLighting({
  color = 'rgba(91,124,250,0.05)',
  size = 900,
  strength = 60, // max px offset from center
}) {
  const { mx, my, reducedMotion } = useSharedMouse();
  const sx = useSpring(mx, SPRING.lazy);
  const sy = useSpring(my, SPRING.lazy);
  const x = useTransform(sx, (v) => `calc(50% + ${v * strength}px)`);
  const y = useTransform(sy, (v) => `calc(35% + ${v * strength}px)`);

  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: `radial-gradient(${size}px circle at 50% 35%, ${color}, transparent 60%)` }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: useTransform([x, y], ([px, py]) => `radial-gradient(${size}px circle at ${px} ${py}, ${color}, transparent 60%)`),
      }}
    />
  );
}
