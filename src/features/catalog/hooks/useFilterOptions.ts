import { useQuery } from "@tanstack/react-query";
import { mockProducts } from "../mocks/mockProducts";

// Use environment variable to determine if we should use mock data
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";

interface FilterOptions {
	categories: string[];
	empresas: string[];
}

export const useFilterOptions = () => {
	return useQuery({
		queryKey: ["filter-options"],
		queryFn: async (): Promise<FilterOptions> => {
			// Use mock data for development
			if (USE_MOCK_DATA) {
				// Extract unique categories and empresas from all mock products
				const categories = Array.from(
					new Set(mockProducts.map((p) => p.categoria))
				).sort();
				const empresas = Array.from(
					new Set(mockProducts.map((p) => p.empresa))
				).sort();

				return { categories, empresas };
			}

			// Real API call to get all filter options
			const response = await fetch("/api/products/filter-options");

			if (!response.ok) {
				throw new Error("Error al cargar las opciones de filtro");
			}

			return response.json();
		},
		staleTime: 5 * 60 * 1000, // Cache for 5 minutes
	});
};

