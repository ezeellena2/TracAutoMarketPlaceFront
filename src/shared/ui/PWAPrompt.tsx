import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Componente que muestra un prompt para instalar la PWA
 * Solo se muestra si la PWA es instalable y el usuario no la ha descartado
 */
export function PWAPrompt() {
  const [promptEvento, setPromptEvento] = useState<BeforeInstallPromptEvent | null>(null);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya descartó el prompt
    const descartado = localStorage.getItem('pwa-prompt-descartado');
    if (descartado) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setPromptEvento(e as BeforeInstallPromptEvent);
      setMostrar(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstalar = async () => {
    if (!promptEvento) return;

    await promptEvento.prompt();
    const { outcome } = await promptEvento.userChoice;

    if (outcome === 'accepted') {
      setMostrar(false);
    }
  };

  const handleDescartar = () => {
    setMostrar(false);
    localStorage.setItem('pwa-prompt-descartado', 'true');
  };

  if (!mostrar) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 animate-slide-up">
      <div className="bg-surface border border-border rounded-lg shadow-xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text">Instalar Marketplace</h3>
            <p className="text-sm text-text-muted mt-1">
              Agregá la app a tu pantalla de inicio para acceso rápido
            </p>
          </div>
          <button
            onClick={handleDescartar}
            className="text-text-muted hover:text-text"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleDescartar}
            className="flex-1 px-4 py-2 text-sm text-text-muted hover:text-text border border-border rounded-lg transition-colors"
          >
            Ahora no
          </button>
          <button
            onClick={handleInstalar}
            className="flex-1 px-4 py-2 text-sm text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
          >
            Instalar
          </button>
        </div>
      </div>
    </div>
  );
}
