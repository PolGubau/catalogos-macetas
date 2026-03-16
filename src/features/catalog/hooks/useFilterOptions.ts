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
				categories: [
					"árido",
					"malla",
					"arcilla",
					"set",
					"abono",
					"valla",
					"césped",
					"lama",
					"jardinera",
					"traviesa",
					"revestimiento",
					"corteza",
					"tutor",
					"accesorio",
					"geocelda",
					"cinta",
					"losa natural",
					"plato",
					"herraje",
					"soporte",
					"arena",
					"maceta",
					"manta",
					"semilla",
					"ocultación",
					"fijación",
					"poste",
					"madera tratada",
					"roca",
					"remate",
					"rastreles",
					"paso japonés",
					"losa porcelánica",
					"gavión",
					"decoración",
					"placa estabilizadora",
					"barrera",
					"perfil",
					"adhesivo",
					"sustrato",
					"pizarra",
					"tarima",
					"herramienta",
				],
				empresas: ["Jardí Pond", "Arribas Center"],
			};
		},
		staleTime: 5 * 60 * 1000, // Cache for 5 minutes
	});
};
