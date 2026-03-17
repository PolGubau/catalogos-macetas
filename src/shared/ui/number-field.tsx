import { Field } from '@base-ui-components/react/field';
import { NumberField as BaseNumberField } from '@base-ui-components/react/number-field';

interface NumberFieldProps {
  value: number | null;
  onChange: (value: number | null) => void;
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

/**
 * NumberField Component
 * 
 * A reusable number input field with validation.
 * Follows Single Responsibility Principle - only handles number input UI.
 */
export function NumberField({
  value,
  onChange,
  label,
  placeholder = '0.00',
  min = 0,
  max,
  step = 0.01,
  className = '',
}: NumberFieldProps) {
  return (
    <Field.Root className={`flex flex-col gap-1.5 ${className}`.trim()}>
      <Field.Label className="text-xs font-semibold text-foreground">
        {label}
      </Field.Label>
      <BaseNumberField.Root
        value={value}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
      >
        <BaseNumberField.Input
          className="w-full px-3 py-2 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-center tabular-nums"
          placeholder={placeholder}
        />
      </BaseNumberField.Root>
    </Field.Root>
  );
}

