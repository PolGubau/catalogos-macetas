import { RotateCcw } from 'lucide-react';
import type { ProductFilters } from '../../domains/catalog';

interface FilterFooterProps {
  filters: ProductFilters;
  onClearFilters: () => void;
}

/**
 * FilterFooter Component
 * 
 * Displays filter count and clear button.
 * Follows Single Responsibility Principle - only handles footer UI.
 */
export function FilterFooter({ filters, onClearFilters }: FilterFooterProps) {
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <footer className="flex items-center justify-between pt-3 border-t border-border">
      <p className="text-xs text-muted-foreground">
        {activeFiltersCount > 0
          ? `${activeFiltersCount} filtro(s) activo(s)`
          : 'Sin filtros aplicados'}
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
      >
        <RotateCcw className="w-3 h-3" />
        Limpiar
      </button>
    </footer>
  );
}

