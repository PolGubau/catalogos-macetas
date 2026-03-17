import { Field } from '@base-ui-components/react/field';
import type { ChangeEvent } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: string[] | SelectOption[];
  label: string;
  placeholder?: string;
  className?: string;
}

/**
 * SelectField Component
 * 
 * A reusable select dropdown field.
 * Follows Single Responsibility Principle - only handles select input UI.
 * Supports both simple string arrays and option objects.
 */
export function SelectField({
  value,
  onChange,
  options,
  label,
  placeholder = 'Todas',
  className = '',
}: SelectFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  return (
    <Field.Root className={`flex flex-col gap-1.5 ${className}`.trim()}>
      <Field.Label className="text-xs font-semibold text-foreground">
        {label}
      </Field.Label>
      <select
        value={value}
        onChange={handleChange}
        className="px-3 py-2 text-sm rounded-lg border-2 border-input bg-background text-foreground cursor-pointer focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-8"
      >
        <option value="">{placeholder}</option>
        {normalizedOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field.Root>
  );
}

