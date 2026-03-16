import { useQuery } from "@tanstack/react-query";
import type { ProductFilters, ProductsResponse } from "../domains/catalog";

interface UseProductsParams {
	filters: ProductFilters;
	page: number;
	size: number;
}

export const useProducts = ({ filters, page, size }: UseProductsParams) => {
	return useQuery({
		queryKey: ["products", filters, page, size],
		queryFn: async (): Promise<ProductsResponse> => {
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
