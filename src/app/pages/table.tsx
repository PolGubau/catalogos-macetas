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
      <div className="page-container">
        <div className="loading-container">
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (isError && !data) {
    return (
      <div className="page-container">
        <div className="error-container">
          <p>Error al cargar los productos: {error?.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="page-container">
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
