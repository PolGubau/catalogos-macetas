import type { Product } from '../domains/catalog';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(product.precio));

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 hover:bg-accent/50 transition-all duration-200 animate-in fade-in slide-in-from-left-4"
      style={{ animationDelay: `${index * 30}ms`, animationDuration: '400ms' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-base line-clamp-2 mb-1" title={product.nombre}>
            {product.nombre}
          </h3>
          <p className="text-xs text-muted-foreground font-mono" title={product.referencia}>
            {product.referencia}
          </p>
        </div>
        <div className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-sm font-bold text-primary whitespace-nowrap">
            {formattedPrice}
          </span>
        </div>
      </div>

      {/* Description */}
      {product.descripcion && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3" title={product.descripcion}>
          {product.descripcion}
        </p>
      )}

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {/* Categoria */}
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/50">
          <svg className="w-4 h-4 text-muted-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Categoría</p>
            <p className="text-sm font-medium text-foreground truncate" title={product.categoria}>
              {product.categoria}
            </p>
          </div>
        </div>

        {/* Empresa */}
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/50">
          <svg className="w-4 h-4 text-muted-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Empresa</p>
            <p className="text-sm font-medium text-foreground truncate" title={product.empresa}>
              {product.empresa}
            </p>
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        {product.ancho && (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/50 text-xs">
            <span className="text-muted-foreground">Ancho:</span>
            <span className="font-medium text-foreground">{(Number(product.ancho) / 10).toFixed(1)} cm</span>
          </div>
        )}
        {product.largo && (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/50 text-xs">
            <span className="text-muted-foreground">Largo:</span>
            <span className="font-medium text-foreground">{(Number(product.largo) / 10).toFixed(1)} cm</span>
          </div>
        )}
        {product.alto && (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/50 text-xs">
            <span className="text-muted-foreground">Alto:</span>
            <span className="font-medium text-foreground">{(Number(product.alto) / 10).toFixed(1)} cm</span>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
        {product.color && (
          <div className="inline-flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-muted border border-border" />
            <span>{product.color}</span>
          </div>
        )}
        {product.peso && (
          <div className="inline-flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <span>{product.peso}</span>
          </div>
        )}
        {product.volumen && (
          <div className="inline-flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>{product.volumen}</span>
          </div>
        )}
        {product.origenPdf && (
          <div className="inline-flex items-center gap-1 ml-auto">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="truncate max-w-[100px]" title={product.origenPdf}>{product.origenPdf}</span>
          </div>
        )}
      </div>
    </div>
  );
}

