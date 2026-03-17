import { Download, FileDown, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';
import { Drawer } from './ui/drawer';

interface ExportDrawerProps {
  onExportFiltered: () => Promise<void>;
  onExportAll: () => Promise<void>;
  hasFilters: boolean;
  isExporting: boolean;
}

export function ExportDrawer({ onExportFiltered, onExportAll, hasFilters, isExporting }: ExportDrawerProps) {
  const [open, setOpen] = useState(false);

  const handleExport = async (exportFn: () => Promise<void>) => {
    await exportFn();
    setOpen(false);
  };

  return (
    <>
      {/* Export Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={isExporting}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 focus:outline-none focus:ring-4 focus:ring-primary/20"
        aria-label="Abrir opciones de exportación"
        title="Exportar datos"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">{isExporting ? 'Exportando...' : 'Exportar'}</span>
      </button>

      {/* Drawer */}
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Content position="bottom" showHandle>
            {/* Header */}
            <Drawer.Header>
              <div className="flex items-center gap-3 max-w-2xl mx-auto w-full">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileSpreadsheet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <Drawer.Title>Exportar Datos</Drawer.Title>
                  <Drawer.Description>Selecciona qué datos deseas exportar</Drawer.Description>
                </div>
              </div>
              <Drawer.Close>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Drawer.Close>
            </Drawer.Header>

            {/* Content */}
            <Drawer.Body>
              <div className="space-y-4 max-w-2xl mx-auto">
                <p className="text-sm text-muted-foreground mb-6">
                  Exporta los datos del catálogo en formato CSV para usar en Excel, Google Sheets u otras aplicaciones.
                </p>

                <div className="grid gap-4">
                  {/* Export Filtered */}
                  <button
                    type="button"
                    onClick={() => handleExport(onExportFiltered)}
                    disabled={isExporting}
                    className="group relative flex items-start gap-4 p-6 rounded-xl border-2 border-border hover:border-primary/50 bg-card hover:bg-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                  >
                    <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <FileDown className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-foreground mb-1">
                        Exportar Resultados Filtrados
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {hasFilters
                          ? 'Exporta solo los productos que coinciden con los filtros actuales'
                          : 'Exporta todos los productos (no hay filtros activos)'}
                      </p>
                      {hasFilters && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/10 text-xs font-medium text-primary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          Filtros activos
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  {/* Export All */}
                  <button
                    type="button"
                    onClick={() => handleExport(onExportAll)}
                    disabled={isExporting}
                    className="group relative flex items-start gap-4 p-6 rounded-xl border-2 border-border hover:border-primary/50 bg-card hover:bg-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                  >
                    <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Download className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-foreground mb-1">
                        Exportar Catálogo Completo
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Exporta todos los productos del catálogo sin aplicar ningún filtro
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Info */}
                <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Formato CSV</p>
                      <p>Los archivos se descargarán en formato CSV, compatible con Excel, Google Sheets y otras aplicaciones de hojas de cálculo.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

