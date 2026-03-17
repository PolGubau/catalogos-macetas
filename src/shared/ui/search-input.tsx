import { Field } from '@base-ui-components/react/field';
import type { ChangeEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  isLoading?: boolean;
  className?: string;
}

/**
 * SearchInput Component
 * 
 * A reusable search input field with loading indicator.
 * Follows Single Responsibility Principle - only handles search input UI.
 */
export function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar...',
  label = 'Búsqueda',
  isLoading = false,
  className = '',
}: SearchInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Field.Root className={`flex flex-col gap-1.5 ${className}`.trim()}>
      <Field.Label className="text-xs font-semibold text-foreground">
        {label}
      </Field.Label>
      <div className="relative">
        <Field.Control
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
        />
        {isLoading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </Field.Root>
  );
}

