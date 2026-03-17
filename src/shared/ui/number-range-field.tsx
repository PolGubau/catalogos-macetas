import { NumberField } from './number-field';

interface NumberRangeFieldProps {
  minValue: number | null;
  maxValue: number | null;
  onMinChange: (value: number | null) => void;
  onMaxChange: (value: number | null) => void;
  minLabel: string;
  maxLabel: string;
  placeholder?: string;
  step?: number;
  className?: string;
}

/**
 * NumberRangeField Component
 * 
 * A reusable component for min/max number range inputs.
 * Follows Single Responsibility Principle - only handles range input UI.
 * Composes two NumberField components.
 */
export function NumberRangeField({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minLabel,
  maxLabel,
  placeholder = '0.00',
  step = 0.01,
  className = '',
}: NumberRangeFieldProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`.trim()}>
      <NumberField
        value={minValue}
        onChange={onMinChange}
        label={minLabel}
        placeholder={placeholder}
        step={step}
      />
      <NumberField
        value={maxValue}
        onChange={onMaxChange}
        label={maxLabel}
        placeholder={placeholder}
        step={step}
      />
    </div>
  );
}

