import { AppProviders } from '@/app/providers';
import { AppRouter } from '@/app/routes';
import { PWAPrompt } from '@/shared/ui';

export function App() {
  return (
    <AppProviders>
      <AppRouter />
      <PWAPrompt />
    </AppProviders>
  );
}

export default App;
