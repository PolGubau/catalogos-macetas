import { NumberRangeField, SelectField } from '../../../../shared/ui';
import type { ProductFilters } from '../../domains/catalog';

interface AdvancedFiltersProps {
  filters: ProductFilters;
  onRangeChange: (
    minKey: keyof ProductFilters,
    maxKey: keyof ProductFilters,
    minValue: number | null,
    maxValue: number | null
  ) => void;
  onFilterChange: (key: keyof ProductFilters, value: string) => void;
  colores: string[];
  origenesPdf: string[];
}

/**
 * AdvancedFilters Component
 * 
 * Displays advanced filter controls (price, dimensions, color, origin).
 * Follows Single Responsibility Principle - only handles advanced filter UI.
 * Follows Open/Closed Principle - extensible through props.
 */
export function AdvancedFilters({
  filters,
  onRangeChange,
  onFilterChange,
  colores,
  origenesPdf,
}: AdvancedFiltersProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-border animate-in fade-in slide-in-from-top-4 duration-300">
      {/* Fila 1: Precio, Color, Origen PDF */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Price Range */}
        <NumberRangeField
          minValue={filters.minPrice ?? null}
          maxValue={filters.maxPrice ?? null}
          onMinChange={(value) =>
            onRangeChange('minPrice', 'maxPrice', value, filters.maxPrice ?? null)
          }
          onMaxChange={(value) =>
            onRangeChange('minPrice', 'maxPrice', filters.minPrice ?? null, value)
          }
          minLabel="Precio mín (€)"
          maxLabel="Precio máx (€)"
          className="md:col-span-2"
        />

        {/* Color */}
        <SelectField
          value={filters.color || ''}
          onChange={(value) => onFilterChange('color', value)}
          options={colores}
          label="Color"
          placeholder="Todos"
        />

        {/* Origen PDF */}
        <SelectField
          value={filters.origenPdf || ''}
          onChange={(value) => onFilterChange('origenPdf', value)}
          options={origenesPdf}
          label="Origen PDF"
          placeholder="Todos"
        />
      </div>

      {/* Fila 2: Dimensiones (Ancho, Largo, Peso, Volumen) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ancho Range */}
        <NumberRangeField
          minValue={filters.minAncho ?? null}
          maxValue={filters.maxAncho ?? null}
          onMinChange={(value) =>
            onRangeChange('minAncho', 'maxAncho', value, filters.maxAncho ?? null)
          }
          onMaxChange={(value) =>
            onRangeChange('minAncho', 'maxAncho', filters.minAncho ?? null, value)
          }
          minLabel="Ancho mín (cm)"
          maxLabel="Ancho máx (cm)"
          placeholder="0.0"
          step={0.1}
        />

        {/* Largo Range */}
        <NumberRangeField
          minValue={filters.minLargo ?? null}
          maxValue={filters.maxLargo ?? null}
          onMinChange={(value) =>
            onRangeChange('minLargo', 'maxLargo', value, filters.maxLargo ?? null)
          }
          onMaxChange={(value) =>
            onRangeChange('minLargo', 'maxLargo', filters.minLargo ?? null, value)
          }
          minLabel="Largo mín (cm)"
          maxLabel="Largo máx (cm)"
          placeholder="0.0"
          step={0.1}
        />

        {/* Peso Range */}
        <NumberRangeField
          minValue={filters.minPeso ?? null}
          maxValue={filters.maxPeso ?? null}
          onMinChange={(value) =>
            onRangeChange('minPeso', 'maxPeso', value, filters.maxPeso ?? null)
          }
          onMaxChange={(value) =>
            onRangeChange('minPeso', 'maxPeso', filters.minPeso ?? null, value)
          }
          minLabel="Peso mín (kg)"
          maxLabel="Peso máx (kg)"
          placeholder="0.00"
          step={0.01}
        />

        {/* Volumen Range */}
        <NumberRangeField
          minValue={filters.minVolumen ?? null}
          maxValue={filters.maxVolumen ?? null}
          onMinChange={(value) =>
            onRangeChange('minVolumen', 'maxVolumen', value, filters.maxVolumen ?? null)
          }
          onMaxChange={(value) =>
            onRangeChange('minVolumen', 'maxVolumen', filters.minVolumen ?? null, value)
          }
          minLabel="Volumen mín (L)"
          maxLabel="Volumen máx (L)"
          placeholder="0.0"
          step={0.1}
        />
      </div>
    </div>
  );
}

