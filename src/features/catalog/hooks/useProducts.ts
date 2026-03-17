import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../../../lib/api";
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
			if (filters.color) params.set("color", filters.color);
			if (filters.origenPdf) params.set("origenPdf", filters.origenPdf);
			if (filters.minAncho !== undefined)
				params.set("minAncho", String(filters.minAncho));
			if (filters.maxAncho !== undefined)
				params.set("maxAncho", String(filters.maxAncho));
			if (filters.minLargo !== undefined)
				params.set("minLargo", String(filters.minLargo));
			if (filters.maxLargo !== undefined)
				params.set("maxLargo", String(filters.maxLargo));
			if (filters.minPeso !== undefined)
				params.set("minPeso", String(filters.minPeso));
			if (filters.maxPeso !== undefined)
				params.set("maxPeso", String(filters.maxPeso));
			if (filters.minVolumen !== undefined)
				params.set("minVolumen", String(filters.minVolumen));
			if (filters.maxVolumen !== undefined)
				params.set("maxVolumen", String(filters.maxVolumen));

			// Build API URL (uses proxy in dev, full URL in production)
			const apiUrl = getApiUrl(`/api/products?${params.toString()}`);

			const response = await fetch(apiUrl);

			if (!response.ok) {
				throw new Error("Error al cargar los productos");
			}

			return response.json();
		},
		placeholderData: (previousData) => previousData,
	});
};
