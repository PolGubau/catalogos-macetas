import type { Product, ProductsResponse } from '../domains/catalog';

export const mockProducts: Product[] = [
  {
    id: 1,
    referencia: 'MAC-001',
    nombre: 'Maceta Terracota Grande',
    descripcion: 'Maceta de terracota de alta calidad',
    peso: 2500,
    volumen: 15000,
    color: 'Terracota',
    ancho: 30,
    largo: 30,
    alto: 35,
    precio: 24.99,
    empresa: 'Ceramicas del Sur',
    categoria: 'Terracota',
    origenPdf: 'catalogo_2024.pdf',
  },
  {
    id: 2,
    referencia: 'MAC-002',
    nombre: 'Maceta Plástico Moderna',
    descripcion: 'Maceta de plástico resistente a UV',
    peso: 800,
    volumen: 8000,
    color: 'Negro',
    ancho: 25,
    largo: 25,
    alto: 28,
    precio: 12.50,
    empresa: 'PlastiGarden',
    categoria: 'Plástico',
    origenPdf: 'catalogo_2024.pdf',
  },
  {
    id: 3,
    referencia: 'MAC-003',
    nombre: 'Maceta Cerámica Decorativa',
    descripcion: 'Maceta de cerámica con diseño artesanal',
    peso: 3200,
    volumen: 12000,
    color: 'Azul',
    ancho: 28,
    largo: 28,
    alto: 32,
    precio: 45.00,
    empresa: 'Ceramicas del Sur',
    categoria: 'Cerámica',
    origenPdf: 'catalogo_premium.pdf',
  },
  {
    id: 4,
    referencia: 'MAC-004',
    nombre: 'Maceta Fibra de Vidrio',
    descripcion: 'Maceta ligera de fibra de vidrio',
    peso: 1500,
    volumen: 20000,
    color: 'Blanco',
    ancho: 35,
    largo: 35,
    alto: 40,
    precio: 89.99,
    empresa: 'ModernPots',
    categoria: 'Fibra de Vidrio',
    origenPdf: 'catalogo_premium.pdf',
  },
  {
    id: 5,
    referencia: 'MAC-005',
    nombre: 'Maceta Plástico Pequeña',
    descripcion: 'Maceta ideal para plantas pequeñas',
    peso: 300,
    volumen: 3000,
    color: 'Verde',
    ancho: 15,
    largo: 15,
    alto: 18,
    precio: 5.99,
    empresa: 'PlastiGarden',
    categoria: 'Plástico',
    origenPdf: 'catalogo_2024.pdf',
  },
  {
    id: 6,
    referencia: 'MAC-006',
    nombre: 'Maceta Barro Artesanal',
    descripcion: 'Maceta de barro hecha a mano',
    peso: 2800,
    volumen: 14000,
    color: 'Marrón',
    ancho: 32,
    largo: 32,
    alto: 38,
    precio: 35.50,
    empresa: 'Ceramicas del Sur',
    categoria: 'Barro',
    origenPdf: 'catalogo_2024.pdf',
  },
  {
    id: 7,
    referencia: 'MAC-007',
    nombre: 'Maceta Plástico Colgante',
    descripcion: 'Maceta colgante con cadena incluida',
    peso: 600,
    volumen: 5000,
    color: 'Blanco',
    ancho: 20,
    largo: 20,
    alto: 15,
    precio: 15.99,
    empresa: 'PlastiGarden',
    categoria: 'Plástico',
    origenPdf: 'catalogo_2024.pdf',
  },
  {
    id: 8,
    referencia: 'MAC-008',
    nombre: 'Maceta Cerámica Esmaltada',
    descripcion: 'Maceta de cerámica con acabado esmaltado',
    peso: 3500,
    volumen: 18000,
    color: 'Verde',
    ancho: 35,
    largo: 35,
    alto: 42,
    precio: 52.00,
    empresa: 'Ceramicas del Sur',
    categoria: 'Cerámica',
    origenPdf: 'catalogo_premium.pdf',
  },
];

export const getMockProductsResponse = (
  page: number = 0,
  size: number = 20,
  filters?: {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    categoria?: string;
    empresa?: string;
  }
): ProductsResponse => {
  let filteredProducts = [...mockProducts];

  // Apply filters
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.nombre.toLowerCase().includes(searchLower) ||
        p.referencia.toLowerCase().includes(searchLower) ||
        p.descripcion.toLowerCase().includes(searchLower)
    );
  }

  if (filters?.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter((p) => p.precio >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter((p) => p.precio <= filters.maxPrice!);
  }

  if (filters?.categoria) {
    filteredProducts = filteredProducts.filter((p) => p.categoria === filters.categoria);
  }

  if (filters?.empresa) {
    filteredProducts = filteredProducts.filter((p) => p.empresa === filters.empresa);
  }

  // Calculate pagination
  const totalElements = filteredProducts.length;
  const totalPages = Math.ceil(totalElements / size);
  const start = page * size;
  const end = start + size;
  const content = filteredProducts.slice(start, end);

  return {
    content,
    pagination: {
      page,
      size,
      totalElements,
      totalPages: totalPages || 1,
      numberOfElements: content.length,
      first: page === 0,
      last: page >= totalPages - 1,
      empty: content.length === 0,
    },
  };
};

