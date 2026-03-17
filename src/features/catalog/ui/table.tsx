import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, FileDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ThemeToggle } from '../../../components/ThemeToggle';
import { getApiUrl } from '../../../lib/api';
import type { Pagination, Product, ProductFilters } from '../domains/catalog';
import { useFilterOptions } from '../hooks/useFilterOptions';
import { CatalogFilters } from './filters';

// Helper function to download file from URL
const downloadFile = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

interface CatalogTableProps {
  data: Product[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  isLoading?: boolean;
}

export const CatalogTable = ({ data, pagination, onPageChange, onPageSizeChange, isLoading = false }: CatalogTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isExporting, setIsExporting] = useState(false);

  // Parse filters from URL search params
  const filters = useMemo<ProductFilters>(() => {
    return {
      search: searchParams.get('search') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      categoria: searchParams.get('categoria') || undefined,
      empresa: searchParams.get('empresa') || undefined,
      color: searchParams.get('color') || undefined,
      origenPdf: searchParams.get('origenPdf') || undefined,
      minAncho: searchParams.get('minAncho') ? Number(searchParams.get('minAncho')) : undefined,
      maxAncho: searchParams.get('maxAncho') ? Number(searchParams.get('maxAncho')) : undefined,
      minLargo: searchParams.get('minLargo') ? Number(searchParams.get('minLargo')) : undefined,
      maxLargo: searchParams.get('maxLargo') ? Number(searchParams.get('maxLargo')) : undefined,
      minPeso: searchParams.get('minPeso') ? Number(searchParams.get('minPeso')) : undefined,
      maxPeso: searchParams.get('maxPeso') ? Number(searchParams.get('maxPeso')) : undefined,
      minVolumen: searchParams.get('minVolumen') ? Number(searchParams.get('minVolumen')) : undefined,
      maxVolumen: searchParams.get('maxVolumen') ? Number(searchParams.get('maxVolumen')) : undefined,
    };
  }, [searchParams]);

  // Update URL when filters change
  const handleFiltersChange = (newFilters: ProductFilters) => {
    const params = new URLSearchParams();

    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.minPrice !== undefined) params.set('minPrice', String(newFilters.minPrice));
    if (newFilters.maxPrice !== undefined) params.set('maxPrice', String(newFilters.maxPrice));
    if (newFilters.categoria) params.set('categoria', newFilters.categoria);
    if (newFilters.empresa) params.set('empresa', newFilters.empresa);
    if (newFilters.color) params.set('color', newFilters.color);
    if (newFilters.origenPdf) params.set('origenPdf', newFilters.origenPdf);
    if (newFilters.minAncho !== undefined) params.set('minAncho', String(newFilters.minAncho));
    if (newFilters.maxAncho !== undefined) params.set('maxAncho', String(newFilters.maxAncho));
    if (newFilters.minLargo !== undefined) params.set('minLargo', String(newFilters.minLargo));
    if (newFilters.maxLargo !== undefined) params.set('maxLargo', String(newFilters.maxLargo));
    if (newFilters.minPeso !== undefined) params.set('minPeso', String(newFilters.minPeso));
    if (newFilters.maxPeso !== undefined) params.set('maxPeso', String(newFilters.maxPeso));
    if (newFilters.minVolumen !== undefined) params.set('minVolumen', String(newFilters.minVolumen));
    if (newFilters.maxVolumen !== undefined) params.set('maxVolumen', String(newFilters.maxVolumen));

    // Reset to page 0 when filters change
    params.set('page', '0');

    setSearchParams(params);
  };

  // Export filtered data (current view)
  const handleExportFiltered = async () => {
    setIsExporting(true);
    try {
      // Build query params with current filters
      const params = new URLSearchParams();
      if (filters.search) params.set('search', filters.search);
      if (filters.minPrice !== undefined) params.set('minPrice', String(filters.minPrice));
      if (filters.maxPrice !== undefined) params.set('maxPrice', String(filters.maxPrice));
      if (filters.categoria) params.set('categoria', filters.categoria);
      if (filters.empresa) params.set('empresa', filters.empresa);
      if (filters.color) params.set('color', filters.color);
      if (filters.origenPdf) params.set('origenPdf', filters.origenPdf);
      if (filters.minAncho !== undefined) params.set('minAncho', String(filters.minAncho));
      if (filters.maxAncho !== undefined) params.set('maxAncho', String(filters.maxAncho));
      if (filters.minLargo !== undefined) params.set('minLargo', String(filters.minLargo));
      if (filters.maxLargo !== undefined) params.set('maxLargo', String(filters.maxLargo));
      if (filters.minPeso !== undefined) params.set('minPeso', String(filters.minPeso));
      if (filters.maxPeso !== undefined) params.set('maxPeso', String(filters.maxPeso));
      if (filters.minVolumen !== undefined) params.set('minVolumen', String(filters.minVolumen));
      if (filters.maxVolumen !== undefined) params.set('maxVolumen', String(filters.maxVolumen));

      // Use backend export endpoint
      const apiUrl = getApiUrl(`/api/products/export?format=csv&${params.toString()}`);

      const timestamp = new Date().toISOString().split('T')[0];
      const filterInfo = Object.values(filters).filter(Boolean).length > 0 ? '_filtrado' : '';
      downloadFile(apiUrl, `catalogo_macetas${filterInfo}_${timestamp}.csv`);
    } catch (error) {
      console.error('Error al exportar:', error);
      alert('Error al exportar los datos. Por favor, inténtalo de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  // Export all data (without filters)
  const handleExportAll = async () => {
    setIsExporting(true);
    try {
      // Use backend export endpoint without filters
      const apiUrl = getApiUrl('/api/products/export?format=csv');

      const timestamp = new Date().toISOString().split('T')[0];
      downloadFile(apiUrl, `catalogo_macetas_completo_${timestamp}.csv`);
    } catch (error) {
      console.error('Error al exportar todos los datos:', error);
      alert('Error al exportar todos los datos. Por favor, inténtalo de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  // Get filter options from the hook
  const { data: filterOptions } = useFilterOptions();

  // Extract unique categories and empresas from filter options or fallback to current data
  const categories = useMemo(() => {
    return filterOptions?.categories || Array.from(new Set(data.map((p) => p.categoria))).sort();
  }, [filterOptions, data]);

  const empresas = useMemo(() => {
    return filterOptions?.empresas || Array.from(new Set(data.map((p) => p.empresa))).sort();
  }, [filterOptions, data]);

  const colores = useMemo(() => {
    return Array.from(new Set(data.map((p) => p.color).filter(Boolean))).sort();
  }, [data]);

  const origenesPdf = useMemo(() => {
    return Array.from(new Set(data.map((p) => p.origenPdf).filter(Boolean))).sort();
  }, [data]);

  // Define columns
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'referencia',
        header: 'Referencia',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'descripcion',
        header: 'Descripción',
        cell: (info) => info.getValue() || '-',
      },
      {
        accessorKey: 'categoria',
        header: 'Categoría',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'empresa',
        header: 'Empresa',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'precio',
        header: 'Precio',
        cell: (info) => {
          const formattedPrice = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
          }).format(Number(info.getValue()));
          return (
            <span className="text-sm text-foreground font-semibold">{formattedPrice}</span>
          )
        },
      },
      {
        accessorKey: 'color',
        header: 'Color',
        cell: (info) => info.getValue() || '-',
      },
      {
        accessorKey: 'ancho',
        header: 'Ancho',
        cell: (info) => (info.getValue() ? `${(Number(info.getValue()) / 10).toFixed(1)} cm` : '-'),
      },
      {
        accessorKey: 'largo',
        header: 'Largo',
        cell: (info) => (info.getValue() ? `${(Number(info.getValue()) / 10).toFixed(1)} cm` : '-'),
      },
      {
        accessorKey: 'alto',
        header: 'Alto',
        cell: (info) => (info.getValue() ? `${(Number(info.getValue()) / 10).toFixed(1)} cm` : '-'),
      },
      {
        accessorKey: 'peso',
        header: 'Peso',
        cell: (info) => info.getValue() || '-',
      },
      {
        accessorKey: 'volumen',
        header: 'Volumen',
        cell: (info) => info.getValue() || '-',
      },
      {
        accessorKey: 'origenPdf',
        header: 'Fuente',
        cell: (info) => info.getValue() || '-',
      },
    ],
    []
  );

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true, // Server-side pagination
    pageCount: pagination.totalPages,
  });

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-500">
      {/* Header with improved hierarchy */}
      <header className="max-w-7xl mx-auto space-y-2 animate-in slide-in-from-top-4 duration-700">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Catálogo de Macetas
            </h1>
            <p className="text-base text-muted-foreground font-medium">
              Explora nuestra colección completa
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Export Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportFiltered}
                disabled={isExporting || data.length === 0}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg border-2 border-primary/20 bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/20"
                aria-label="Exportar datos filtrados a CSV"
              >
                <FileDown className="w-4 h-4" />
                {isExporting ? 'Exportando...' : 'Exportar filtrados'}
              </button>

              <button
                type="button"
                onClick={handleExportAll}
                disabled={isExporting}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 focus:outline-none focus:ring-4 focus:ring-primary/20"
                aria-label="Exportar todos los datos a CSV"
              >
                <Download className="w-4 h-4" />
                {isExporting ? 'Exportando...' : 'Exportar todo'}
              </button>
            </div>

            {/* Product Counter */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex flex-col items-end">
                <span className="text-2xl font-bold text-primary tabular-nums">
                  {pagination.totalElements}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Productos
                </span>
              </div>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
        {pagination.numberOfElements > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Mostrando {pagination.numberOfElements} resultados
            </span>
            {pagination.totalPages > 1 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border">
                Página {pagination.page + 1} de {pagination.totalPages}
              </span>
            )}
          </div>
        )}
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto animate-in slide-in-from-top-6 duration-700 delay-100">
        <CatalogFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          categories={categories}
          empresas={empresas}
          colores={colores}
          origenesPdf={origenesPdf}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm animate-in slide-in-from-bottom-8 duration-700 delay-200">
        {/* Loading indicator - subtle progress bar at top */}
        {isLoading && (
          <div className="h-1 w-full bg-muted overflow-hidden">
            <div className="h-full bg-primary animate-[shimmer_1s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]"
              style={{ animation: 'shimmer 1s ease-in-out infinite' }} />
          </div>
        )}
        <div className="relative overflow-x-auto">
          <table className={`w-full border-collapse text-sm transition-opacity duration-150 ${isLoading ? 'opacity-60' : 'opacity-100'}`}>
            <thead className="bg-muted/80 sticky top-0 z-10 backdrop-blur-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b-2 border-border">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left font-semibold text-foreground whitespace-nowrap first:pl-8 last:pr-8"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? 'group flex items-center gap-2 cursor-pointer select-none hover:text-primary transition-all duration-200'
                              : 'flex items-center gap-2'
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          role={header.column.getCanSort() ? 'button' : undefined}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                          aria-label={header.column.getCanSort() ? `Ordenar por ${header.column.columnDef.header}` : undefined}
                        >
                          <span className="font-semibold text-xs uppercase tracking-wider">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                          {header.column.getCanSort() && (
                            <span className="text-muted-foreground group-hover:text-primary transition-colors">
                              {{
                                asc: '↑',
                                desc: '↓',
                              }[header.column.getIsSorted() as string] ?? '⇅'}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border/50">
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className="group border-b border-border/50 hover:bg-accent/50 transition-all duration-200 animate-in fade-in slide-in-from-left-4 cursor-pointer"
                  style={{ animationDelay: `${index * 30}ms`, animationDuration: '400ms' }}
                  tabIndex={0}
                  aria-rowindex={index + 1}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td
                      key={cell.id}
                      className={`px-6 py-4 text-foreground/90 group-hover:text-foreground transition-colors first:pl-8 last:pr-8 ${cellIndex === 0 ? 'font-medium' : ''
                        }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {pagination.empty && (
            <div className="py-16 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">No se encontraron productos</h3>
                  <p className="text-sm text-muted-foreground">
                    Intenta ajustar los filtros o buscar con otros términos
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Pagination */}
      <nav
        className="flex items-center justify-between gap-4 flex-wrap border-t border-border bg-gradient-to-r from-muted/30 to-muted/10 px-6 py-5 rounded-b-lg animate-in slide-in-from-bottom-4 duration-500 delay-300"
        aria-label="Paginación de tabla"
      >
        <div className="flex items-center gap-2">
          <label htmlFor="page-size" className="text-sm font-medium text-muted-foreground">
            Filas por página:
          </label>
          <select
            id="page-size"
            value={pagination.size}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
            }}
            className="px-3 py-2 text-sm font-medium rounded-md border border-border bg-background cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Seleccionar número de filas por página"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(0)}
            disabled={pagination.first}
            className="p-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Ir a la primera página"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.first}
            className="p-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Ir a la página anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-4 py-2 text-sm font-medium text-foreground bg-primary/10 border border-primary/20 rounded-md tabular-nums">
            <span className="sr-only">Página</span>
            {pagination.page + 1}
            <span className="mx-1 text-muted-foreground">/</span>
            {pagination.totalPages}
          </span>

          <button
            type="button"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.last}
            className="p-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Ir a la página siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onPageChange(pagination.totalPages - 1)}
            disabled={pagination.last}
            className="p-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Ir a la última página"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </div>
  );
};
