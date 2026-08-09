import { motion } from 'framer-motion';
import { textUnitReveal, stagger } from '../variants';
import { VIEWPORT_ONCE } from '../config';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Splits text into words or characters and reveals each unit with a masked
 * upward stagger. Powers both "Character Animation" and "Word Animation"
 * presets via the `mode` prop — no separate implementations.
 */
export default function TextReveal({
  text,
  as = 'span',
  mode = 'words', // 'words' | 'chars'
  delay = 0,
  staggerStep = 0.045,
  className,
  once = true,
}) {
  const reducedMotion = useReducedMotion();
  const Tag = motion[as] ?? motion.span;
  const units = mode === 'chars' ? Array.from(text) : text.split(' ');

  if (reducedMotion) {
    return (
      <Tag className={className} style={{ display: 'inline-block' }}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      style={{ display: 'inline-block' }}
      variants={stagger(staggerStep, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ ...VIEWPORT_ONCE, once }}
    >
      {units.map((unit, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <motion.span variants={textUnitReveal} style={{ display: 'inline-block' }}>
            {unit === '' ? '\u00A0' : unit}
            {mode === 'words' && i !== units.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
