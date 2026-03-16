import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import type { ProductFilters } from '../../features/catalog/domains/catalog';
import { useProducts } from '../../features/catalog/hooks/useProducts';
import { CatalogTable } from '../../features/catalog/ui/table';

export const TablePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse filters and pagination from URL
  const filters = useMemo<ProductFilters>(() => {
    return {
      search: searchParams.get('search') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      categoria: searchParams.get('categoria') || undefined,
      empresa: searchParams.get('empresa') || undefined,
    };
  }, [searchParams]);

  const page = useMemo(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? Number(pageParam) : 0;
  }, [searchParams]);

  const size = useMemo(() => {
    const sizeParam = searchParams.get('size');
    return sizeParam ? Number(sizeParam) : 20;
  }, [searchParams]);

  // Fetch products from API
  const { data, isLoading, isError, error, isFetching } = useProducts({ filters, page, size });

  // Handle page change
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    setSearchParams(params);
  };

  // Handle page size change
  const handlePageSizeChange = (newSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('size', String(newSize));
    params.set('page', '0'); // Reset to first page when changing size
    setSearchParams(params);
  };

  // Show full loading only on initial load (no data yet)
  if (isLoading && !data) {
    return (
      <div className="container mx-auto max-w-7xl p-6">
        <div className="flex items-center justify-center min-h-[400px] animate-in fade-in duration-500">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-base text-muted-foreground animate-pulse">Cargando productos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError && !data) {
    return (
      <div className="container mx-auto max-w-7xl p-6">
        <div className="flex items-center justify-center min-h-[400px] animate-in fade-in zoom-in-95 duration-500">
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 animate-in shake">
            <p className="text-base text-destructive font-medium">Error al cargar los productos: {error?.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <CatalogTable
        data={data.content}
        pagination={data.pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isFetching}
      />
    </div>
  );
};
