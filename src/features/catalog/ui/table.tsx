import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import type { Pagination, Product, ProductFilters } from '../domains/catalog';
import { useFilterOptions } from '../hooks/useFilterOptions';
import { CatalogFilters } from './filters';

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

  // Parse filters from URL search params
  const filters = useMemo<ProductFilters>(() => {
    return {
      search: searchParams.get('search') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      categoria: searchParams.get('categoria') || undefined,
      empresa: searchParams.get('empresa') || undefined,
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

    // Reset to page 0 when filters change
    params.set('page', '0');

    setSearchParams(params);
  };

  // Extract unique categories and empresas
  const categories = useMemo(() => {
    return Array.from(new Set(data.map((p) => p.categoria))).sort();
  }, [data]);

  const empresas = useMemo(() => {
    return Array.from(new Set(data.map((p) => p.empresa))).sort();
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
        cell: (info) => `€${Number(info.getValue()).toFixed(2)}`,
      },
      {
        accessorKey: 'color',
        header: 'Color',
        cell: (info) => info.getValue() || '-',
      },
      {
        accessorKey: 'ancho',
        header: 'Ancho',
        cell: (info) => (info.getValue() ? `${info.getValue()} cm` : '-'),
      },
      {
        accessorKey: 'largo',
        header: 'Largo',
        cell: (info) => (info.getValue() ? `${info.getValue()} cm` : '-'),
      },
      {
        accessorKey: 'alto',
        header: 'Alto',
        cell: (info) => (info.getValue() ? `${info.getValue()} cm` : '-'),
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
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Header with improved hierarchy */}
      <header className="space-y-3 animate-in slide-in-from-top-4 duration-700">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Catálogo de Macetas
            </h1>
            <p className="text-base text-muted-foreground font-medium">
              Explora nuestra colección completa
            </p>
          </div>
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
      <div className="animate-in slide-in-from-top-6 duration-700 delay-100">
        <CatalogFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          categories={categories}
          empresas={empresas}
        />
      </div>

      {/* Table */}
      <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-sm animate-in slide-in-from-bottom-8 duration-700 delay-200">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card px-12 py-8 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
              </div>
              <p className="text-base font-semibold text-foreground">Cargando datos...</p>
              <p className="text-xs text-muted-foreground">Por favor espera</p>
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className={`w-full border-collapse text-sm transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
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
                  <svg
                    className="w-8 h-8 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
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
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.first}
            className="p-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Ir a la página anterior"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
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
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onPageChange(pagination.totalPages - 1)}
            disabled={pagination.last}
            className="p-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Ir a la última página"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};
