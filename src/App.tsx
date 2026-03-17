import { Router } from './app/router/router';
import { ThemeProvider } from './shared/hooks/useTheme';

function App() {
  return (
    <ThemeProvider>
      <div className="root">

        <Router />
      </div>/
    </ThemeProvider>
  );
}

export default App;

