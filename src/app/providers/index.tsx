import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, OfflineIndicator } from '@/shared/ui';

/**
 * Función de retry inteligente para React Query.
 * - No reintenta errores 4xx (son definitivos: validación, not found, forbidden)
 * - Reintenta hasta 3 veces para errores 5xx, de red o timeout
 * - Usa backoff exponencial: 1s, 2s, 4s
 */
function shouldRetry(failureCount: number, error: unknown): boolean {
  // Máximo 3 reintentos
  if (failureCount >= 3) return false;
  
  // Extraer status del error
  const status = (error as { status?: number })?.status;
  
  // No reintentar errores 4xx (son definitivos)
  if (status && status >= 400 && status < 500) {
    return false;
  }
  
  // Reintentar errores 5xx, de red o desconocidos
  return true;
}

/**
 * Delay con backoff exponencial para retries
 */
function retryDelay(attemptIndex: number): number {
  return Math.min(1000 * Math.pow(2, attemptIndex), 30000);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: shouldRetry,
      retryDelay: retryDelay,
      refetchOnWindowFocus: false,
    },
  },
});

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer />
      <OfflineIndicator />
    </QueryClientProvider>
  );
}
