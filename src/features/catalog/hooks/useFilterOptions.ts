import { useQuery } from "@tanstack/react-query";

interface FilterOptions {
	categories: string[];
	empresas: string[];
}

export const useFilterOptions = () => {
	return useQuery({
		queryKey: ["filter-options"],
		queryFn: async (): Promise<FilterOptions> => {
			// TODO: Replace with real API call when backend endpoint is ready
			// const response = await fetch("/api/products/filter-options");
			// if (!response.ok) {
			//   throw new Error("Error al cargar las opciones de filtro");
			// }
			// return response.json();

			// Hardcoded filter options until backend endpoint is available
			return {
				categories: ["Macetas", "Jardinería", "Tiestos", "Contenedores"],
				empresas: ["Jardí Pond","Arribas Center"],
			};
		},
		staleTime: 5 * 60 * 1000, // Cache for 5 minutes
	});
};
