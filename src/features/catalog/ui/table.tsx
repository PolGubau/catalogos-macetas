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
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>Catálogo de Macetas</h1>
        <p className="results-count">
          Mostrando {pagination.numberOfElements} de {pagination.totalElements} productos
          {pagination.totalPages > 1 && ` (Página ${pagination.page + 1} de ${pagination.totalPages})`}
        </p>
      </div>

      <CatalogFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        categories={categories}
        empresas={empresas}
      />

      <div className="table-container" style={{ position: 'relative' }}>
        {isLoading && (
          <div className="table-loading-overlay">
            <div className="table-loading-spinner">
              <p>Cargando...</p>
            </div>
          </div>
        )}
        <table className="catalog-table" style={{ opacity: isLoading ? 0.5 : 1, transition: 'opacity 0.2s' }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort() ? 'sortable-header' : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        role={header.column.getCanSort() ? 'button' : undefined}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {pagination.empty && (
          <div className="no-results">
            <p>No se encontraron productos con los filtros aplicados.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          type="button"
          onClick={() => onPageChange(0)}
          disabled={pagination.first}
          className="pagination-button"
        >
          {'<<'}
        </button>
        <button
          type="button"
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={pagination.first}
          className="pagination-button"
        >
          {'<'}
        </button>
        <span className="pagination-info">
          Página {pagination.page + 1} de {pagination.totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={pagination.last}
          className="pagination-button"
        >
          {'>'}
        </button>
        <button
          type="button"
          onClick={() => onPageChange(pagination.totalPages - 1)}
          disabled={pagination.last}
          className="pagination-button"
        >
          {'>>'}
        </button>
        <select
          value={pagination.size}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
          }}
          className="page-size-select"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
