import { Monitor, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { Drawer } from './ui/drawer';

export function SettingsDrawer() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Settings Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-muted text-foreground hover:bg-muted/80 border border-border transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/20"
        aria-label="Abrir configuración"
        title="Configuración"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="hidden sm:inline">Ajustes</span>
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
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <Drawer.Title>Configuración</Drawer.Title>
                  <Drawer.Description>Personaliza tu experiencia</Drawer.Description>
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
              {/* Theme Section */}
              <section className="space-y-4 max-w-2xl mx-auto">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Apariencia</h3>
                  <p className="text-xs text-muted-foreground">Selecciona el tema de la aplicación</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Light Theme */}
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`
                      flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200
                      ${theme === 'light'
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }
                    `}
                  >
                    <div className="p-3 rounded-lg bg-linear-to-br from-yellow-100 to-orange-100 border border-yellow-200">
                      <Sun className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Claro</p>
                      <p className="text-xs text-muted-foreground">Tema claro</p>
                    </div>
                    {theme === 'light' && (
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </button>

                  {/* Dark Theme */}
                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`
                      flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200
                      ${theme === 'dark'
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }
                    `}
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600">
                      <Moon className="w-6 h-6 text-slate-300" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Oscuro</p>
                      <p className="text-xs text-muted-foreground">Tema oscuro</p>
                    </div>
                    {theme === 'dark' && (
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </button>

                  {/* System Theme */}
                  <button
                    type="button"
                    onClick={() => setTheme('system')}
                    className={`
                      flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200
                      ${theme === 'system'
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }
                    `}
                  >
                    <div className="p-3 rounded-lg bg-linear-to-br from-blue-100 to-purple-100 border border-blue-200">
                      <Monitor className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Sistema</p>
                      <p className="text-xs text-muted-foreground">Automático</p>
                    </div>
                    {theme === 'system' && (
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </button>
                </div>
              </section>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
