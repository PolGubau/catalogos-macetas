# Configuración de la API

## 🌐 Backend URL

La aplicación está conectada al backend en:

```
https://alex-back-l4uhvp-a22dbf-185-250-36-170.traefik.me
```

## 🔌 Cómo Funciona el Proxy

### Flujo de Peticiones

1. **Frontend hace petición:** `/api/products?page=0&size=20`
2. **Vite Proxy redirige a:** `https://alex-back-l4uhvp-a22dbf-185-250-36-170.traefik.me/api/products?page=0&size=20`
3. **Backend responde** con la estructura esperada

### Configuración del Proxy

**Archivo:** `vite.config.ts`

```typescript
server: {
  proxy: {
    "/api": {
      target: "https://alex-back-l4uhvp-a22dbf-185-250-36-170.traefik.me",
      changeOrigin: true,
      secure: false,
    },
  },
}
```

## 📡 Endpoint

### GET /api/products

**Parámetros:**
- `page` - Número de página (0-indexed)
- `size` - Tamaño de página (10, 20, 30, 40, 50)
- `search` - Búsqueda general (opcional)
- `minPrice` - Precio mínimo (opcional)
- `maxPrice` - Precio máximo (opcional)
- `categoria` - Categoría (opcional)
- `empresa` - Empresa (opcional)

**Ejemplo:**
```
GET /api/products?page=0&size=20&search=maceta&categoria=Terracota
```

**Respuesta esperada:**
```json
{
  "content": [
    {
      "id": 1,
      "referencia": "REF-001",
      "nombre": "Maceta",
      "descripcion": "Descripción",
      "peso": 100,
      "volumen": 200,
      "color": "negro",
      "ancho": 30,
      "largo": 30,
      "alto": 35,
      "precio": 24.99,
      "empresa": "Empresa",
      "categoria": "Categoria",
      "origenPdf": "catalogo.pdf"
    }
  ],
  "pagination": {
    "page": 0,
    "size": 20,
    "totalElements": 100,
    "totalPages": 5,
    "numberOfElements": 20,
    "first": true,
    "last": false,
    "empty": false
  }
}
```

## 🔧 Cambiar la URL del Backend

Si necesitas cambiar la URL del backend:

1. **Edita `.env`:**
   ```bash
   VITE_API_BASE_URL=https://nueva-url-backend.com
   ```

2. **Reinicia Vite:**
   ```bash
   # Detén el servidor (Ctrl+C)
   pnpm dev
   ```

## 🐛 Debugging

### Ver peticiones en el navegador

1. Abre DevTools (F12)
2. Ve a la pestaña "Network"
3. Filtra por "Fetch/XHR"
4. Busca peticiones a `/api/products`

### Logs del proxy en consola

Vite muestra en la terminal cuando redirige peticiones:

```
[vite] http proxy: /api/products -> https://alex-back-l4uhvp-a22dbf-185-250-36-170.traefik.me/api/products
```

## ⚠️ Notas Importantes

1. **CORS:** El backend debe tener CORS configurado para aceptar peticiones desde `http://localhost:5173` (desarrollo)

2. **HTTPS:** El backend usa HTTPS, el proxy está configurado con `secure: false` para desarrollo

3. **Reiniciar Vite:** Siempre que cambies variables de entorno (`.env`), debes reiniciar el servidor de Vite

4. **Producción:** En producción, configura la variable de entorno `VITE_API_BASE_URL` en tu servidor de hosting

