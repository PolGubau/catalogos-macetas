import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-muted border border-border">
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`
          inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md
          transition-all duration-200
          ${theme === 'light'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          }
        `}
        aria-label="Modo claro"
        title="Modo claro"
      >
        <Sun className="w-4 h-4" />
        <span className="hidden sm:inline">Claro</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`
          inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md
          transition-all duration-200
          ${theme === 'dark'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          }
        `}
        aria-label="Modo oscuro"
        title="Modo oscuro"
      >
        <Moon className="w-4 h-4" />
        <span className="hidden sm:inline">Oscuro</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme('system')}
        className={`
          inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md
          transition-all duration-200
          ${theme === 'system'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          }
        `}
        aria-label="Modo sistema"
        title="Modo sistema"
      >
        <Monitor className="w-4 h-4" />
        <span className="hidden sm:inline">Sistema</span>
      </button>
    </div>
  );
}

