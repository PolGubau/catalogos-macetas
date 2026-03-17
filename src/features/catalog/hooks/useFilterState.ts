import { useEffect, useState } from 'react';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import type { ProductFilters } from '../domains/catalog';

/**
 * useFilterState Hook
 * 
 * Manages local filter state with debouncing for search input.
 * Follows Single Responsibility Principle - only handles filter state management.
 * Separates concerns: debouncing, state sync, and state updates.
 */
export function useFilterState(
  externalFilters: ProductFilters,
  onFiltersChange: (filters: ProductFilters) => void
) {
  // Local state for search input to enable debouncing
  const [searchInput, setSearchInput] = useState(externalFilters.search || '');
  const debouncedSearch = useDebounce(searchInput, 500);

  // Sync local state with external filter changes (e.g., when clearing filters)
  // biome-ignore lint/correctness/useExhaustiveDependencies: Only sync when external search changes
  useEffect(() => {
    if (
      externalFilters.search !== searchInput &&
      externalFilters.search !== debouncedSearch
    ) {
      setSearchInput(externalFilters.search || '');
    }
  }, [externalFilters.search]);

  // Update filters when debounced search changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: Only update when debounced value changes
  useEffect(() => {
    if (debouncedSearch !== externalFilters.search) {
      onFiltersChange({
        ...externalFilters,
        search: debouncedSearch || undefined,
      });
    }
  }, [debouncedSearch]);

  return {
    searchInput,
    setSearchInput,
    debouncedSearch,
  };
}

