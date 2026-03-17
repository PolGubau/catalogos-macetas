# Deployment en Vercel

## 🚀 Configuración Inicial

### Solución de CORS con Vercel Rewrites

El archivo `vercel.json` está configurado con **rewrites** para evitar problemas de CORS:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://alex-back-l4uhvp-a22dbf-185-250-36-170.traefik.me/api/:path*"
    }
  ]
}
```

**Cómo funciona:**
- Las peticiones a `https://macetas.polgubau.com/api/products` se redirigen automáticamente a `https://alex-back-l4uhvp-a22dbf-185-250-36-170.traefik.me/api/products`
- Vercel actúa como proxy, evitando problemas de CORS
- El frontend siempre usa rutas relativas (`/api/...`)

**Pasos:**
1. Haz commit de `vercel.json`
2. Push a tu repositorio
3. Vercel detectará automáticamente la configuración
4. El deploy se hará con el proxy configurado

### Opción 2: Configurar en el Dashboard de Vercel

Si prefieres configurar las variables de entorno manualmente:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Añade una nueva variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://alex-back-l4uhvp-a22dbf-185-250-36-170.traefik.me`
   - **Environments**: Selecciona `Production`, `Preview`, y `Development`
5. Guarda los cambios
6. Redeploy el proyecto desde la pestaña **Deployments**

## 🔄 Cambiar la URL del Backend

### Si usas vercel.json:

1. Edita el archivo `vercel.json`
2. Cambia el valor de `VITE_API_BASE_URL`
3. Commit y push
4. Vercel hará un nuevo deploy automáticamente

### Si usas el Dashboard:

1. Ve a **Settings** → **Environment Variables**
2. Edita `VITE_API_BASE_URL`
3. Guarda los cambios
4. Ve a **Deployments** → Selecciona el último deployment → Click en los 3 puntos → **Redeploy**

## ✅ Verificar que Funciona

Después del deploy:

1. Abre la consola del navegador (F12)
2. Ve a la pestaña **Network**
3. Filtra por `products`
4. Verifica que las peticiones vayan a:
   ```
   https://alex-back-l4uhvp-a22dbf-185-250-36-170.traefik.me/api/products
   ```
   
   **NO** a:
   ```
   https://macetas.polgubau.com/api/products
   ```

## 🐛 Troubleshooting

### Las peticiones van al dominio del frontend

**Problema**: Las peticiones van a `https://macetas.polgubau.com/api/products` en lugar del backend.

**Solución**:
1. Verifica que la variable de entorno esté configurada en Vercel
2. Asegúrate de haber hecho un **redeploy** después de configurar la variable
3. Limpia la caché del navegador (Ctrl + Shift + R)

### La variable de entorno no se aplica

**Problema**: Cambias la variable pero sigue usando la URL antigua.

**Solución**:
- Las variables de entorno de Vite se embeben durante el **build**
- Debes hacer un **redeploy completo** (no solo un refresh)
- En Vercel: Deployments → Redeploy (no uses "Instant Rollback")

## 📝 Notas Importantes

- ⚠️ Las variables de entorno de Vite (`VITE_*`) se embeben en el código durante el build
- ⚠️ Cambiar una variable requiere un nuevo build/deploy
- ⚠️ Las variables **NO** se pueden cambiar en runtime
- ✅ El archivo `vercel.json` es la forma más simple de gestionar esto
- ✅ Puedes tener diferentes URLs para Production, Preview y Development

