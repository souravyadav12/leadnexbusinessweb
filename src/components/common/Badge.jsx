import { cn } from '../../utils/cn';

const VARIANT_COLOR = {
  default: 'text-text-secondary',
  accent: 'text-accent',
  success: 'text-success',
};

/**
 * Bracketed mono tag — [ LIKE THIS ] — instead of the rounded-pill badge
 * every SaaS template ships. No fill, no border-radius, just a hairline
 * marker that reads as a spec-sheet label rather than a UI chrome element.
 */
export default function Badge({ children, variant = 'default', className, icon }) {
  return (
    <span className={cn('tag-bracket inline-flex items-center gap-2 text-[11px]', VARIANT_COLOR[variant], className)}>
      {icon}
      {children}
    </span>
  );
}
