interface SpinnerProps {
  tamanio?: 'sm' | 'md' | 'lg';
  className?: string;
}

const tamanios = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function Spinner({ tamanio = 'md', className = '' }: SpinnerProps) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-border border-t-primary ${tamanios[tamanio]} ${className}`}
      role="status"
      aria-label="Cargando"
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

/**
 * Spinner centrado en pantalla completa
 */
export function SpinnerPantalla() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Spinner tamanio="lg" />
    </div>
  );
}
