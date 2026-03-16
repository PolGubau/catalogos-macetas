export interface Product {
	id: number;
	referencia: string;
	nombre: string;
	descripcion: string;
	peso: number;
	volumen: number;
	color: string;
	ancho: number;
	largo: number;
	alto: number;
	precio: number;
	empresa: string;
	categoria: string;
	origenPdf: string;
}

export interface ProductFilters {
	search?: string;
	minPrice?: number;
	maxPrice?: number;
	categoria?: string;
	empresa?: string;
}

export interface Pagination {
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
	numberOfElements: number;
	first: boolean;
	last: boolean;
	empty: boolean;
}

export interface ProductsResponse {
	content: Product[];
	pagination: Pagination;
}
