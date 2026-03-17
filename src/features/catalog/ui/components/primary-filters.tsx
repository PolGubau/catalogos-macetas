import { ChevronDown, ChevronUp } from 'lucide-react';
import { SearchInput, SelectField, ToggleButton } from '../../../../shared/ui';
import type { ProductFilters } from '../../domains/catalog';

interface PrimaryFiltersProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  isSearchLoading: boolean;
  filters: ProductFilters;
  onFilterChange: (key: keyof ProductFilters, value: string) => void;
  categories: string[];
  empresas: string[];
  showAdvancedFilters: boolean;
  onToggleAdvancedFilters: () => void;
}

/**
 * PrimaryFilters Component
 * 
 * Displays the main filter controls (search, category, empresa, toggle).
 * Follows Single Responsibility Principle - only handles primary filter UI.
 * Follows Open/Closed Principle - extensible through props without modification.
 */
export function PrimaryFilters({
  searchInput,
  onSearchChange,
  isSearchLoading,
  filters,
  onFilterChange,
  categories,
  empresas,
  showAdvancedFilters,
  onToggleAdvancedFilters,
}: PrimaryFiltersProps) {
  return (
    <header className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
      {/* Search Filter - Ocupa 3 columnas */}
      <SearchInput
        value={searchInput}
        onChange={onSearchChange}
        isLoading={isSearchLoading}
        className="md:col-span-3"
      />

      {/* Category Filter */}
      <SelectField
        value={filters.categoria || ''}
        onChange={(value) => onFilterChange('categoria', value)}
        options={categories}
        label="Categoría"
        placeholder="Todas"
      />

      {/* Empresa Filter */}
      <SelectField
        value={filters.empresa || ''}
        onChange={(value) => onFilterChange('empresa', value)}
        options={empresas}
        label="Empresa"
        placeholder="Todas"
      />

      {/* Toggle Advanced Filters Button */}
      <div className="flex items-end">
        <ToggleButton
          isActive={showAdvancedFilters}
          onClick={onToggleAdvancedFilters}
          activeLabel="Menos filtros"
          inactiveLabel="Más filtros"
          activeIcon={<ChevronUp className="w-4 h-4" />}
          inactiveIcon={<ChevronDown className="w-4 h-4" />}
        />
      </div>
    </header>
  );
}

