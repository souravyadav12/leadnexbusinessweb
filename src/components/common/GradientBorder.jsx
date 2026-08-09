import { cn } from '../../utils/cn';
import Tilt from '../../motion/components/Tilt';

export default function GradientBorder({ children, className, hoverEffect = true }) {
  return (
    <Tilt
      intensity={hoverEffect ? 6 : 0}
      className={cn(
        'group rounded-2xl bg-bg-card overflow-hidden gradient-border',
        hoverEffect && 'transition-[box-shadow] duration-300 hover:-translate-y-1 glow-accent-hover',
        className
      )}
    >
      {children}
    </Tilt>
  );
}
