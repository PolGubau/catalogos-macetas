# Arquitectura del Proyecto - Clean Architecture & SOLID

Este documento describe la arquitectura mejorada del proyecto siguiendo los principios de Clean Architecture y SOLID.

## 📁 Estructura de Carpetas

```
src/
├── shared/                    # Código compartido entre features
│   ├── ui/                   # Componentes UI reutilizables
│   │   ├── search-input.tsx
│   │   ├── select-field.tsx
│   │   ├── number-field.tsx
│   │   ├── number-range-field.tsx
│   │   ├── toggle-button.tsx
│   │   └── index.ts
│   ├── hooks/                # Hooks compartidos
│   │   ├── useDebounce.ts
│   │   └── useRangeValidation.ts
│   └── lib/                  # Utilidades y helpers
│
├── features/                  # Features del dominio
│   └── catalog/
│       ├── domains/          # Modelos y tipos del dominio
│       │   └── catalog.ts
│       ├── hooks/            # Hooks específicos del feature
│       │   ├── useProducts.ts
│       │   ├── useFilterOptions.ts
│       │   └── useFilterState.ts
│       └── ui/               # Componentes UI del feature
│           ├── components/   # Componentes específicos
│           │   ├── primary-filters.tsx
│           │   ├── advanced-filters.tsx
│           │   ├── filter-footer.tsx
│           │   └── index.ts
│           ├── filters.tsx   # Componente orquestador
│           ├── table.tsx
│           └── product-card.tsx
│
└── app/                      # Configuración de la aplicación
    ├── pages/
    └── router/
```

## 🎯 Principios SOLID Aplicados

### 1. **S**ingle Responsibility Principle (SRP)
Cada componente y hook tiene una única responsabilidad:

- **SearchInput**: Solo maneja la UI del input de búsqueda
- **SelectField**: Solo maneja la UI de un select
- **NumberField**: Solo maneja la UI de un input numérico
- **useRangeValidation**: Solo valida rangos min/max
- **useFilterState**: Solo maneja el estado de filtros con debouncing
- **PrimaryFilters**: Solo renderiza filtros primarios
- **AdvancedFilters**: Solo renderiza filtros avanzados
- **FilterFooter**: Solo renderiza el footer con contador y botón limpiar

### 2. **O**pen/Closed Principle (OCP)
Los componentes son extensibles sin modificación:

```tsx
// Extensible a través de props
<SearchInput
  value={value}
  onChange={onChange}
  placeholder="Custom placeholder"
  className="custom-class"
/>
```

### 3. **L**iskov Substitution Principle (LSP)
Los componentes son intercambiables:

```tsx
// SelectField acepta tanto arrays simples como objetos
<SelectField options={['A', 'B', 'C']} />
<SelectField options={[{value: 'a', label: 'A'}]} />
```

### 4. **I**nterface Segregation Principle (ISP)
Interfaces específicas y mínimas:

```tsx
// Cada componente solo recibe las props que necesita
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  // ... solo lo necesario
}
```

### 5. **D**ependency Inversion Principle (DIP)
Dependemos de abstracciones, no de implementaciones:

```tsx
// CatalogFilters depende de hooks abstractos
const { validateMinValue } = useRangeValidation();
const { searchInput, setSearchInput } = useFilterState();
```

## 🏗️ Capas de la Arquitectura

### Capa de Presentación (UI)
- **Componentes Atómicos** (`shared/ui`): Componentes reutilizables sin lógica de negocio
- **Componentes de Feature** (`features/*/ui`): Componentes específicos del dominio

### Capa de Lógica de Negocio
- **Hooks Compartidos** (`shared/hooks`): Lógica reutilizable
- **Hooks de Feature** (`features/*/hooks`): Lógica específica del dominio

### Capa de Dominio
- **Modelos** (`features/*/domains`): Tipos e interfaces del dominio

## 🔄 Flujo de Datos

```
Usuario → UI Component → Hook → Estado → UI Component → Usuario
```

Ejemplo con filtros:
1. Usuario escribe en SearchInput
2. SearchInput llama a `onChange`
3. `useFilterState` maneja el debouncing
4. Estado actualizado se propaga
5. UI se re-renderiza con nuevos datos

## ✨ Beneficios de esta Arquitectura

### Mantenibilidad
- Código organizado y fácil de encontrar
- Responsabilidades claras
- Fácil de entender y modificar

### Reusabilidad
- Componentes UI compartidos entre features
- Hooks reutilizables
- Lógica desacoplada

### Testabilidad
- Componentes pequeños y enfocados
- Lógica separada de la UI
- Fácil de mockear y testear

### Escalabilidad
- Fácil agregar nuevos features
- Fácil agregar nuevos componentes
- Estructura predecible

## 📝 Convenciones de Código

### Nomenclatura
- **Componentes**: PascalCase (`SearchInput`, `PrimaryFilters`)
- **Hooks**: camelCase con prefijo `use` (`useFilterState`, `useRangeValidation`)
- **Archivos**: kebab-case (`search-input.tsx`, `use-filter-state.ts`)

### Estructura de Componentes
```tsx
// 1. Imports
import { ... } from '...';

// 2. Types/Interfaces
interface ComponentProps {
  ...
}

// 3. Component con JSDoc
/**
 * Component Description
 * 
 * Explains what it does and SOLID principles applied.
 */
export function Component({ ... }: ComponentProps) {
  // 4. Hooks
  // 5. Handlers
  // 6. Render
  return (...);
}
```

## 🚀 Próximos Pasos

1. Agregar tests unitarios para componentes y hooks
2. Implementar Storybook para documentar componentes
3. Agregar validación de formularios con Zod
4. Implementar error boundaries
5. Agregar logging y monitoreo

