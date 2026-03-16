import { Field } from '@base-ui-components/react/field';
import { NumberField } from '@base-ui-components/react/number-field';
import type { ProductFilters } from '../domains/catalog';

interface FiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  categories: string[];
  empresas: string[];
}

export const CatalogFilters = ({
  filters,
  onFiltersChange,
  categories,
  empresas,
}: FiltersProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value || undefined });
  };

  const handleMinPriceChange = (value: number | null) => {
    onFiltersChange({ ...filters, minPrice: value ?? undefined });
  };

  const handleMaxPriceChange = (value: number | null) => {
    onFiltersChange({ ...filters, maxPrice: value ?? undefined });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, categoria: e.target.value || undefined });
  };

  const handleEmpresaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, empresa: e.target.value || undefined });
  };

  const handleClearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="filters-container">
      <div className="filters-grid">
        {/* Search Filter */}
        <Field.Root className="filter-field">
          <Field.Label className="filter-label">Búsqueda general</Field.Label>
          <Field.Control
            type="text"
            placeholder="Buscar por nombre, referencia, descripción..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="filter-input"
          />
        </Field.Root>

        {/* Category Filter */}
        <Field.Root className="filter-field">
          <Field.Label className="filter-label">Categoría</Field.Label>
          <select
            value={filters.categoria || ''}
            onChange={handleCategoryChange}
            className="filter-select"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </Field.Root>

        {/* Empresa Filter */}
        <Field.Root className="filter-field">
          <Field.Label className="filter-label">Empresa</Field.Label>
          <select
            value={filters.empresa || ''}
            onChange={handleEmpresaChange}
            className="filter-select"
          >
            <option value="">Todas las empresas</option>
            {empresas.map((emp) => (
              <option key={emp} value={emp}>
                {emp}
              </option>
            ))}
          </select>
        </Field.Root>

        {/* Min Price Filter */}
        <Field.Root className="filter-field">
          <Field.Label className="filter-label">Precio mínimo</Field.Label>
          <NumberField.Root
            value={filters.minPrice ?? null}
            onValueChange={handleMinPriceChange}
            min={0}
            step={0.01}
          >
            <NumberField.Group className="number-field-group">
              <NumberField.Decrement className="number-field-button">-</NumberField.Decrement>
              <NumberField.Input className="filter-input number-field-input" placeholder="0.00" />
              <NumberField.Increment className="number-field-button">+</NumberField.Increment>
            </NumberField.Group>
          </NumberField.Root>
        </Field.Root>

        {/* Max Price Filter */}
        <Field.Root className="filter-field">
          <Field.Label className="filter-label">Precio máximo</Field.Label>
          <NumberField.Root
            value={filters.maxPrice ?? null}
            onValueChange={handleMaxPriceChange}
            min={0}
            step={0.01}
          >
            <NumberField.Group className="number-field-group">
              <NumberField.Decrement className="number-field-button">-</NumberField.Decrement>
              <NumberField.Input className="filter-input number-field-input" placeholder="0.00" />
              <NumberField.Increment className="number-field-button">+</NumberField.Increment>
            </NumberField.Group>
          </NumberField.Root>
        </Field.Root>
      </div>

      <button type="button" onClick={handleClearFilters} className="clear-filters-button">
        Limpiar filtros
      </button>
    </div>
  );
};

