import { useQuery } from "@tanstack/react-query";
import type { ProductFilters, ProductsResponse } from "../domains/catalog";
import { getMockProductsResponse } from "../mocks/mockProducts";

interface UseProductsParams {
	filters: ProductFilters;
	page: number;
	size: number;
}

// Set to true to use mock data, false to use real API
const USE_MOCK_DATA = true;

export const useProducts = ({ filters, page, size }: UseProductsParams) => {
	return useQuery({
		queryKey: ["products", filters, page, size],
		queryFn: async (): Promise<ProductsResponse> => {
			// Use mock data for development
			if (USE_MOCK_DATA) {
				// Simulate network delay
				await new Promise((resolve) => setTimeout(resolve, 500));
				return getMockProductsResponse(page, size, filters);
			}

			// Real API call
			const params = new URLSearchParams();

			// Add pagination params
			params.set("page", String(page));
			params.set("size", String(size));

			// Add filter params
			if (filters.search) params.set("search", filters.search);
			if (filters.minPrice !== undefined)
				params.set("minPrice", String(filters.minPrice));
			if (filters.maxPrice !== undefined)
				params.set("maxPrice", String(filters.maxPrice));
			if (filters.categoria) params.set("categoria", filters.categoria);
			if (filters.empresa) params.set("empresa", filters.empresa);

			const response = await fetch(`/api/products?${params.toString()}`);

			if (!response.ok) {
				throw new Error("Error al cargar los productos");
			}

			return response.json();
		},
	});
};
