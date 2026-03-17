import type { ReactNode } from 'react';

interface ToggleButtonProps {
  isActive: boolean;
  onClick: () => void;
  activeLabel: string;
  inactiveLabel: string;
  activeIcon?: ReactNode;
  inactiveIcon?: ReactNode;
  className?: string;
}

/**
 * ToggleButton Component
 * 
 * A reusable toggle button with icons and labels.
 * Follows Single Responsibility Principle - only handles toggle button UI.
 */
export function ToggleButton({
  isActive,
  onClick,
  activeLabel,
  inactiveLabel,
  activeIcon,
  inactiveIcon,
  className = '',
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-3 py-2 text-sm font-semibold rounded-lg border-2 border-primary/20 bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 flex items-center justify-center gap-2 ${className}`.trim()}
    >
      {isActive ? activeIcon : inactiveIcon}
      {isActive ? activeLabel : inactiveLabel}
    </button>
  );
}

