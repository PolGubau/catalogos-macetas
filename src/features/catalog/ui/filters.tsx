import { Field } from '@base-ui-components/react/field';
import { NumberField } from '@base-ui-components/react/number-field';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import type { ProductFilters } from '../domains/catalog';

interface FiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  categories: string[];
  empresas: string[];
  colores: string[];
  origenesPdf: string[];
}

export const CatalogFilters = ({
  filters,
  onFiltersChange,
  categories,
  empresas,
  colores,
  origenesPdf,
}: FiltersProps) => {
  // Local state for search input to enable debouncing
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const debouncedSearch = useDebounce(searchInput, 500);

  // Sync local state with external filter changes (e.g., when clearing filters)
  useEffect(() => {
    if (filters.search !== searchInput && filters.search !== debouncedSearch) {
      setSearchInput(filters.search || '');
    }
  }, [filters.search]);

  // Update filters when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFiltersChange({ ...filters, search: debouncedSearch || undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleMinPriceChange = (value: number | null) => {
    const newFilters = { ...filters, minPrice: value ?? undefined };
    // If min is set and max is less than min, adjust max to equal min
    if (value !== null && (filters.maxPrice === undefined || filters.maxPrice < value)) {
      newFilters.maxPrice = value;
    }
    onFiltersChange(newFilters);
  };

  const handleMaxPriceChange = (value: number | null) => {
    const newFilters = { ...filters, maxPrice: value ?? undefined };
    // If max is set and min is greater than max, adjust min to equal max
    if (value !== null && filters.minPrice !== undefined && filters.minPrice > value) {
      newFilters.minPrice = value;
    }
    onFiltersChange(newFilters);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, categoria: e.target.value || undefined });
  };

  const handleEmpresaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, empresa: e.target.value || undefined });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, color: e.target.value || undefined });
  };

  const handleOrigenPdfChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, origenPdf: e.target.value || undefined });
  };

  const handleMinAnchoChange = (value: number | null) => {
    const newFilters = { ...filters, minAncho: value ?? undefined };
    if (value !== null && (filters.maxAncho === undefined || filters.maxAncho < value)) {
      newFilters.maxAncho = value;
    }
    onFiltersChange(newFilters);
  };

  const handleMaxAnchoChange = (value: number | null) => {
    const newFilters = { ...filters, maxAncho: value ?? undefined };
    if (value !== null && filters.minAncho !== undefined && filters.minAncho > value) {
      newFilters.minAncho = value;
    }
    onFiltersChange(newFilters);
  };

  const handleMinLargoChange = (value: number | null) => {
    const newFilters = { ...filters, minLargo: value ?? undefined };
    if (value !== null && (filters.maxLargo === undefined || filters.maxLargo < value)) {
      newFilters.maxLargo = value;
    }
    onFiltersChange(newFilters);
  };

  const handleMaxLargoChange = (value: number | null) => {
    const newFilters = { ...filters, maxLargo: value ?? undefined };
    if (value !== null && filters.minLargo !== undefined && filters.minLargo > value) {
      newFilters.minLargo = value;
    }
    onFiltersChange(newFilters);
  };

  const handleMinPesoChange = (value: number | null) => {
    const newFilters = { ...filters, minPeso: value ?? undefined };
    if (value !== null && (filters.maxPeso === undefined || filters.maxPeso < value)) {
      newFilters.maxPeso = value;
    }
    onFiltersChange(newFilters);
  };

  const handleMaxPesoChange = (value: number | null) => {
    const newFilters = { ...filters, maxPeso: value ?? undefined };
    if (value !== null && filters.minPeso !== undefined && filters.minPeso > value) {
      newFilters.minPeso = value;
    }
    onFiltersChange(newFilters);
  };

  const handleMinVolumenChange = (value: number | null) => {
    const newFilters = { ...filters, minVolumen: value ?? undefined };
    if (value !== null && (filters.maxVolumen === undefined || filters.maxVolumen < value)) {
      newFilters.maxVolumen = value;
    }
    onFiltersChange(newFilters);
  };

  const handleMaxVolumenChange = (value: number | null) => {
    const newFilters = { ...filters, maxVolumen: value ?? undefined };
    if (value !== null && filters.minVolumen !== undefined && filters.minVolumen > value) {
      newFilters.minVolumen = value;
    }
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-4 shadow-lg backdrop-blur-sm">
      {/* Filtros Primarios - Siempre visibles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        {/* Search Filter */}
        <Field.Root className="flex flex-col gap-1.5">
          <Field.Label className="text-xs font-semibold text-foreground">
            Búsqueda
          </Field.Label>
          <div className="relative">
            <Field.Control
              type="text"
              placeholder="Buscar..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
            />
            {searchInput !== debouncedSearch && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </Field.Root>

        {/* Category Filter */}
        <Field.Root className="flex flex-col gap-1.5">
          <Field.Label className="text-xs font-semibold text-foreground">
            Categoría
          </Field.Label>
          <select
            value={filters.categoria || ''}
            onChange={handleCategoryChange}
            className="px-3 py-2 text-sm rounded-lg border-2 border-input bg-background text-foreground cursor-pointer focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-8"
          >
            <option value="">Todas</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </Field.Root>

        {/* Empresa Filter */}
        <Field.Root className="flex flex-col gap-1.5">
          <Field.Label className="text-xs font-semibold text-foreground">
            Empresa
          </Field.Label>
          <select
            value={filters.empresa || ''}
            onChange={handleEmpresaChange}
            className="px-3 py-2 text-sm rounded-lg border-2 border-input bg-background text-foreground cursor-pointer focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-8"
          >
            <option value="">Todas</option>
            {empresas.map((emp) => (
              <option key={emp} value={emp}>
                {emp}
              </option>
            ))}
          </select>
        </Field.Root>

        {/* Botón para mostrar filtros avanzados */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="w-full px-3 py-2 text-sm font-semibold rounded-lg border-2 border-primary/20 bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAdvancedFilters ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
            {showAdvancedFilters ? 'Menos filtros' : 'Más filtros'}
          </button>
        </div>
      </div>

      {/* Filtros Avanzados - Colapsables */}
      {showAdvancedFilters && (
        <div className="space-y-3 pt-3 border-t border-border animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Precio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field.Root className="flex flex-col gap-1.5">
              <Field.Label className="text-xs font-semibold text-foreground">
                Precio mín (€)
              </Field.Label>
              <NumberField.Root
                value={filters.minPrice ?? null}
                onValueChange={handleMinPriceChange}
                min={0}
                step={0.01}
              >
                <NumberField.Input
                  className="w-full px-3 py-2 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-center tabular-nums"
                  placeholder="0.00"
                />
              </NumberField.Root>
            </Field.Root>

            <Field.Root className="flex flex-col gap-1.5">
              <Field.Label className="text-xs font-semibold text-foreground">
                Precio máx (€)
              </Field.Label>
              <NumberField.Root
                value={filters.maxPrice ?? null}
                onValueChange={handleMaxPriceChange}
                min={0}
                step={0.01}
              >
                <NumberField.Input
                  className="w-full px-3 py-2 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-center tabular-nums"
                  placeholder="0.00"
                />
              </NumberField.Root>
            </Field.Root>
          </div>

          {/* Color Filter */}
          <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-[350ms]">
            <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Color
            </Field.Label>
            <select
              value={filters.color || ''}
              onChange={handleColorChange}
              className="px-4 py-2.5 text-sm rounded-lg border-2 border-input bg-background text-foreground cursor-pointer focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 hover:border-primary/50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-10"
            >
              <option value="">Todos los colores</option>
              {colores.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </Field.Root>

          {/* Origen PDF Filter */}
          <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-[400ms]">
            <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Origen PDF
            </Field.Label>
            <select
              value={filters.origenPdf || ''}
              onChange={handleOrigenPdfChange}
              className="px-4 py-2.5 text-sm rounded-lg border-2 border-input bg-background text-foreground cursor-pointer focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 hover:border-primary/50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-10"
            >
              <option value="">Todos los orígenes</option>
              {origenesPdf.map((origen) => (
                <option key={origen} value={origen}>
                  {origen}
                </option>
              ))}
            </select>
          </Field.Root>
        </div>

      {/* Dimensiones y Medidas - Segunda fila */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {/* Min Ancho */}
        <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-[450ms]">
          <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Ancho mín (cm)
          </Field.Label>
          <NumberField.Root
            value={filters.minAncho ?? null}
            onValueChange={handleMinAnchoChange}
            min={0}
            step={0.1}
          >
            <NumberField.Group className="flex gap-2">
              <NumberField.Decrement className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                −
              </NumberField.Decrement>
              <NumberField.Input
                className="flex-1 px-4 py-2.5 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 hover:border-primary/50 text-center tabular-nums"
                placeholder="0.0"
              />
              <NumberField.Increment className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                +
              </NumberField.Increment>
            </NumberField.Group>
          </NumberField.Root>
        </Field.Root>

        {/* Max Ancho */}
        <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-[500ms]">
          <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Ancho máx (cm)
          </Field.Label>
          <NumberField.Root
            value={filters.maxAncho ?? null}
            onValueChange={handleMaxAnchoChange}
            min={0}
            step={0.1}
          >
            <NumberField.Group className="flex gap-2">
              <NumberField.Decrement className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                −
              </NumberField.Decrement>
              <NumberField.Input
                className="flex-1 px-4 py-2.5 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 hover:border-primary/50 text-center tabular-nums"
                placeholder="0.0"
              />
              <NumberField.Increment className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                +
              </NumberField.Increment>
            </NumberField.Group>
          </NumberField.Root>
        </Field.Root>

        {/* Min Largo */}
        <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-[550ms]">
          <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Largo mín (cm)
          </Field.Label>
          <NumberField.Root
            value={filters.minLargo ?? null}
            onValueChange={handleMinLargoChange}
            min={0}
            step={0.1}
          >
            <NumberField.Group className="flex gap-2">
              <NumberField.Decrement className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                −
              </NumberField.Decrement>
              <NumberField.Input
                className="flex-1 px-4 py-2.5 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 hover:border-primary/50 text-center tabular-nums"
                placeholder="0.0"
              />
              <NumberField.Increment className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                +
              </NumberField.Increment>
            </NumberField.Group>
          </NumberField.Root>
        </Field.Root>

        {/* Max Largo */}
        <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-[600ms]">
          <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Largo máx (cm)
          </Field.Label>
          <NumberField.Root
            value={filters.maxLargo ?? null}
            onValueChange={handleMaxLargoChange}
            min={0}
            step={0.1}
          >
            <NumberField.Group className="flex gap-2">
              <NumberField.Decrement className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                −
              </NumberField.Decrement>
              <NumberField.Input
                className="flex-1 px-4 py-2.5 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 hover:border-primary/50 text-center tabular-nums"
                placeholder="0.0"
              />
              <NumberField.Increment className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                +
              </NumberField.Increment>
            </NumberField.Group>
          </NumberField.Root>
        </Field.Root>

        {/* Min Peso */}
        <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-[650ms]">
          <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            Peso mín (kg)
          </Field.Label>
          <NumberField.Root
            value={filters.minPeso ?? null}
            onValueChange={handleMinPesoChange}
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

        {/* Max Peso */}
        <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-[700ms]">
          <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            Peso máx (kg)
          </Field.Label>
          <NumberField.Root
            value={filters.maxPeso ?? null}
            onValueChange={handleMaxPesoChange}
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

        {/* Min Volumen */}
        <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-[750ms]">
          <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Volumen mín (L)
          </Field.Label>
          <NumberField.Root
            value={filters.minVolumen ?? null}
            onValueChange={handleMinVolumenChange}
            min={0}
            step={0.1}
          >
            <NumberField.Group className="flex gap-2">
              <NumberField.Decrement className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                −
              </NumberField.Decrement>
              <NumberField.Input
                className="flex-1 px-4 py-2.5 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 hover:border-primary/50 text-center tabular-nums"
                placeholder="0.0"
              />
              <NumberField.Increment className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                +
              </NumberField.Increment>
            </NumberField.Group>
          </NumberField.Root>
        </Field.Root>

        {/* Max Volumen */}
        <Field.Root className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-[800ms]">
          <Field.Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Volumen máx (L)
          </Field.Label>
          <NumberField.Root
            value={filters.maxVolumen ?? null}
            onValueChange={handleMaxVolumenChange}
            min={0}
            step={0.1}
          >
            <NumberField.Group className="flex gap-2">
              <NumberField.Decrement className="px-3 py-2.5 text-sm font-bold rounded-lg border-2 border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/10">
                −
              </NumberField.Decrement>
              <NumberField.Input
                className="flex-1 px-4 py-2.5 text-sm rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 hover:border-primary/50 text-center tabular-nums"
                placeholder="0.0"
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

