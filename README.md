# Catálogo de Macetas

Aplicación web para visualizar y filtrar productos del catálogo de macetas con paginación del servidor.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Build para producción
pnpm build
```

## 📝 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia el servidor de desarrollo

# Build
pnpm build            # Compila para producción
pnpm preview          # Preview del build de producción

# Linting
pnpm lint             # Ejecuta ESLint
```

## 🔧 Configuración del Backend

### API Backend

La aplicación está conectada a:
```
https://alex-back-l4uhvp-a22dbf-185-250-36-170.traefik.me
```

### Proxy de Vite

El proyecto usa un proxy que redirige `/api` al backend configurado.

**Para cambiar la URL del backend:**
1. Edita `VITE_API_BASE_URL` en `.env`
2. Reinicia el servidor de Vite (Ctrl+C y `pnpm dev`)

### Variables de Entorno

```bash
# URL del backend
VITE_API_BASE_URL=https://alex-back-l4uhvp-a22dbf-185-250-36-170.traefik.me
```

## 📚 Tecnologías

- **React 19** + **TypeScript**
- **Vite 8** - Build tool
- **TanStack Table v8** - Gestión de tabla
- **TanStack Query v5** - Fetching y cache de datos
- **Base UI** - Componentes primitivos accesibles
- **React Router v7** - Routing y URL params

## 📖 Documentación

- [`BACKEND_SETUP.md`](./BACKEND_SETUP.md) - Configuración del backend y proxy
- [Documentación original de Vite](#vite-template-info)

---

## Vite Template Info

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
