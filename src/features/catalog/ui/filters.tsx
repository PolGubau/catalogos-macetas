import { useState } from 'react';
import { useRangeValidation } from '../../../shared/hooks/useRangeValidation';
import type { ProductFilters } from '../domains/catalog';
import { useFilterState } from '../hooks/useFilterState';
import { AdvancedFilters } from './components/advanced-filters';
import { FilterFooter } from './components/filter-footer';
import { PrimaryFilters } from './components/primary-filters';

interface FiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  categories: string[];
  empresas: string[];
  colores: string[];
  origenesPdf: string[];
}

/**
 * CatalogFilters Component
 *
 * Main filter component that orchestrates all filter sub-components.
 * Follows Single Responsibility Principle - only handles filter orchestration.
 * Follows Open/Closed Principle - extensible through composition.
 * Follows Dependency Inversion Principle - depends on abstractions (hooks, components).
 */
export const CatalogFilters = ({
  filters,
  onFiltersChange,
  categories,
  empresas,
  colores,
  origenesPdf,
}: FiltersProps) => {
  // State for showing/hiding advanced filters
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Custom hooks for business logic
  const { searchInput, setSearchInput, debouncedSearch } = useFilterState(
    filters,
    onFiltersChange
  );
  const { validateMinValue, validateMaxValue } = useRangeValidation();

  // Handler for simple filter changes (select fields)
  const handleFilterChange = (key: keyof ProductFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value || undefined });
  };

  // Handler for range filter changes with validation
  const handleRangeChange = (
    minKey: keyof ProductFilters,
    maxKey: keyof ProductFilters,
    minValue: number | null,
    maxValue: number | null
  ) => {
    let newFilters = { ...filters };

    // Determine which value changed and validate accordingly
    if (minValue !== filters[minKey]) {
      const validated = validateMinValue(
        minValue,
        filters[maxKey] as number | undefined
      );
      newFilters = { ...newFilters, [minKey]: validated.min, [maxKey]: validated.max };
    } else if (maxValue !== filters[maxKey]) {
      const validated = validateMaxValue(
        maxValue,
        filters[minKey] as number | undefined
      );
      newFilters = { ...newFilters, [minKey]: validated.min, [maxKey]: validated.max };
    }

    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    onFiltersChange({});
  };

  const handleToggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  return (
    <div className="rounded-xl border border-border bg-linear-to-br from-card to-card/50 p-6 shadow-lg backdrop-blur-sm">
      {/* Primary Filters */}
      <PrimaryFilters
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        isSearchLoading={searchInput !== debouncedSearch}
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={categories}
        empresas={empresas}
        showAdvancedFilters={showAdvancedFilters}
        onToggleAdvancedFilters={handleToggleAdvancedFilters}
      />

      {/* Advanced Filters - Collapsible */}
      {showAdvancedFilters && (
        <AdvancedFilters
          filters={filters}
          onRangeChange={handleRangeChange}
          onFilterChange={handleFilterChange}
          colores={colores}
          origenesPdf={origenesPdf}
        />
      )}

      {/* Footer */}
      <FilterFooter filters={filters} onClearFilters={handleClearFilters} />
    </div>
  );
};

