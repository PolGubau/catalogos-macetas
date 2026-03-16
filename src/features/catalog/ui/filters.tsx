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
    <div className="rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <h2 className="text-lg font-semibold text-foreground">Filtros de búsqueda</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {/* Search Filter */}
        <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500">
          <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Búsqueda general
          </Field.Label>
          <div className="relative">
            <Field.Control
              type="text"
              placeholder="Buscar por nombre, referencia, descripción..."
              value={filters.search || ''}
              onChange={handleSearchChange}
              className="w-full px-4 py-2.5 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 hover:border-primary/50"
            />
          </div>
        </Field.Root>

        {/* Category Filter */}
        <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-75">
          <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Categoría
          </Field.Label>
          <select
            value={filters.categoria || ''}
            onChange={handleCategoryChange}
            className="px-4 py-2.5 text-sm rounded-lg border-2 border-input bg-background text-foreground cursor-pointer focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 hover:border-primary/50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-10"
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
        <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-150">
          <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Empresa
          </Field.Label>
          <select
            value={filters.empresa || ''}
            onChange={handleEmpresaChange}
            className="px-4 py-2.5 text-sm rounded-lg border-2 border-input bg-background text-foreground cursor-pointer focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 hover:border-primary/50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-10"
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
        <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-200">
          <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Precio mínimo
          </Field.Label>
          <NumberField.Root
            value={filters.minPrice ?? null}
            onValueChange={handleMinPriceChange}
            min={0}
            step={0.01}
          >
            <NumberField.Group className="flex gap-2">
              <NumberField.Decrement className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                −
              </NumberField.Decrement>
              <NumberField.Input
                className="flex-1 px-4 py-2.5 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 hover:border-primary/50 text-center tabular-nums"
                placeholder="0.00"
              />
              <NumberField.Increment className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                +
              </NumberField.Increment>
            </NumberField.Group>
          </NumberField.Root>
        </Field.Root>

        {/* Max Price Filter */}
        <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-300">
          <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Precio máximo
          </Field.Label>
          <NumberField.Root
            value={filters.maxPrice ?? null}
            onValueChange={handleMaxPriceChange}
            min={0}
            step={0.01}
          >
            <NumberField.Group className="flex gap-2">
              <NumberField.Decrement className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                −
              </NumberField.Decrement>
              <NumberField.Input
                className="flex-1 px-4 py-2.5 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 hover:border-primary/50 text-center tabular-nums"
                placeholder="0.00"
              />
              <NumberField.Increment className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                +
              </NumberField.Increment>
            </NumberField.Group>
          </NumberField.Root>
        </Field.Root>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          {Object.values(filters).filter(Boolean).length > 0
            ? `${Object.values(filters).filter(Boolean).length} filtro(s) activo(s)`
            : 'Sin filtros aplicados'}
        </p>
        <button
          type="button"
          onClick={handleClearFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 focus:outline-none focus:ring-4 focus:ring-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

