# Catálogo de Macetas - Implementación con Paginación del Servidor

## 📋 Descripción

Tabla interactiva para el catálogo de macetas con filtros avanzados y **paginación del servidor**. La implementación está completamente adaptada para trabajar con la estructura de respuesta del backend.

## 🏗️ Arquitectura

### Tecnologías Utilizadas

- **TanStack Table v8** - Gestión de tabla con ordenamiento
- **TanStack Query v5** - Fetching de datos y cache
- **Base UI** - Componentes primitivos accesibles (Field, NumberField)
- **React Router v7** - Gestión de URL search params
- **TypeScript** - Tipado estático

### Estructura del Proyecto

```
src/features/catalog/
├── domains/
│   └── catalog.ts          # Tipos e interfaces
├── hooks/
│   └── useProducts.ts      # Hook de React Query
├── mocks/
│   └── mockProducts.ts     # Datos mock para desarrollo
└── ui/
    ├── table.tsx           # Componente principal de tabla
    └── filters.tsx         # Componente de filtros
```

## 🔌 Integración con el Backend

### Estructura de Respuesta Esperada

```typescript
{
  "content": [
    {
      "id": 1,
      "referencia": "REF-001",
      "nombre": "Mesa",
      "descripcion": "Madera",
      "peso": 10,
      "volumen": 20,
      "color": "negro",
      "ancho": 100,
      "largo": 200,
      "alto": 75,
      "precio": 49.99,
      "empresa": "Ikea",
      "categoria": "hogar",
      "origenPdf": "catalogo.pdf"
    }
  ],
  "pagination": {
    "page": 0,
    "size": 20,
    "totalElements": 1,
    "totalPages": 1,
    "numberOfElements": 1,
    "first": true,
    "last": true,
    "empty": false
  }
}
```

### Parámetros de la API

La tabla envía los siguientes parámetros al backend:

**Paginación:**
- `page` - Número de página (0-indexed)
- `size` - Tamaño de página (10, 20, 30, 40, 50)

**Filtros:**
- `search` - Búsqueda general
- `minPrice` - Precio mínimo
- `maxPrice` - Precio máximo
- `categoria` - Categoría seleccionada
- `empresa` - Empresa seleccionada

**Ejemplo de URL:**
```
/api/products?page=0&size=20&search=maceta&minPrice=10&maxPrice=50&categoria=Terracota
```

## 🎯 Funcionalidades

### ✨ Características Principales

1. **Paginación del Servidor**
   - Navegación entre páginas
   - Tamaño de página configurable
   - Información de paginación en tiempo real

2. **Filtros Avanzados**
   - Búsqueda general (nombre, referencia, descripción)
   - Rango de precios con controles numéricos
   - Filtro por categoría
   - Filtro por empresa

3. **URL Search Params**
   - Todos los filtros y paginación se sincronizan con la URL
   - URLs compartibles
   - Navegación del navegador funcional (back/forward)

4. **Estados de UI**
   - Loading state durante la carga
   - Error state con mensajes descriptivos
   - Empty state cuando no hay resultados

5. **Ordenamiento**
   - Click en headers para ordenar (lado cliente)
   - Indicadores visuales de ordenamiento

## 🚀 Uso

### Configuración Inicial

El proyecto ya está configurado con:
- QueryClient en `src/main.tsx`
- Router en `src/app/router/router.tsx`
- Estilos en `src/index.css`

### Cambiar entre Mock y API Real

En `src/features/catalog/hooks/useProducts.ts`:

```typescript
// Set to true to use mock data, false to use real API
const USE_MOCK_DATA = true; // Cambiar a false para usar API real
```

### Configurar la URL del Backend

Cuando `USE_MOCK_DATA = false`, la tabla hará peticiones a:

```typescript
const response = await fetch(`/api/products?${params.toString()}`);
```

Para cambiar la URL base, modifica el hook o configura un proxy en `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
```

## 📊 Componentes

### `CatalogTable`

Componente principal que renderiza la tabla.

**Props:**
```typescript
interface CatalogTableProps {
  data: Product[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}
```

### `CatalogFilters`

Componente de filtros integrado.

**Props:**
```typescript
interface FiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  categories: string[];
  empresas: string[];
}
```

### `useProducts`

Hook de React Query para obtener productos.

**Parámetros:**
```typescript
interface UseProductsParams {
  filters: ProductFilters;
  page: number;
  size: number;
}
```

## 🎨 Personalización

Los estilos están en `src/index.css` con variables CSS que soportan modo claro y oscuro:

- `--accent` - Color de acento
- `--border` - Color de bordes
- `--bg` - Color de fondo
- `--text` - Color de texto
- `--text-h` - Color de encabezados

## 📝 Notas Importantes

1. **Paginación del Servidor**: La tabla NO filtra ni pagina en el cliente. Todo se hace en el servidor.

2. **Reset de Página**: Cuando se cambian los filtros o el tamaño de página, automáticamente se vuelve a la página 0.

3. **Cache de React Query**: Los datos se cachean por 5 minutos. Cambiar en `src/main.tsx` si es necesario.

4. **Datos Mock**: Incluye 8 productos de ejemplo para desarrollo local.

