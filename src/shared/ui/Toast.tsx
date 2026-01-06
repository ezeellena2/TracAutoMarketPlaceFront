import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useToastStore, type TipoToast } from '@/store';

const iconosPorTipo: Record<TipoToast, React.ReactNode> = {
  exito: <CheckCircle className="w-5 h-5 text-success" />,
  error: <AlertCircle className="w-5 h-5 text-error" />,
  info: <Info className="w-5 h-5 text-primary" />,
  advertencia: <AlertTriangle className="w-5 h-5 text-warning" />,
};

const estilosPorTipo: Record<TipoToast, string> = {
  exito: 'border-success bg-green-50',
  error: 'border-error bg-red-50',
  info: 'border-primary bg-blue-50',
  advertencia: 'border-warning bg-yellow-50',
};

export function ToastContainer() {
  const { toasts, removerToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-slide-up ${estilosPorTipo[toast.tipo]}`}
        >
          {iconosPorTipo[toast.tipo]}
          <p className="flex-1 text-sm text-text">{toast.mensaje}</p>
          <button
            onClick={() => removerToast(toast.id)}
            className="text-text-muted hover:text-text transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
