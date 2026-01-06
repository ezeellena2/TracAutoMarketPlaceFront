import { useState } from 'react';
import { Search } from 'lucide-react';
import { SpinnerPantalla, EstadoVacio, EstadoError } from '@/shared/ui';
import { useVehiculos } from '../hooks/useVehiculos';
import { GrillaVehiculos } from '../components/GrillaVehiculos';
import type { FiltrosVehiculo } from '@/shared/types';

export function CatalogoPage() {
  const [filtros, setFiltros] = useState<FiltrosVehiculo>({
    numeroPagina: 1,
    tamanoPagina: 12,
  });

  const { data, isLoading, isError, error, refetch } = useVehiculos(filtros);

  // Estado de carga
  if (isLoading) {
    return <SpinnerPantalla />;
  }

  // Estado de error
  if (isError) {
    return (
      <div className="container-app py-8">
        <EstadoError
          mensaje={error instanceof Error ? error.message : 'Error al cargar los vehículos'}
          onReintentar={() => refetch()}
        />
      </div>
    );
  }

  const vehiculos = data?.items || [];
  const totalRegistros = data?.totalRegistros || 0;

  return (
    <div className="container-app py-6 sm:py-8">
      {/* Encabezado */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
          Vehículos en venta
        </h1>
        <p className="text-text-muted">
          {totalRegistros > 0
            ? `${totalRegistros} vehículo${totalRegistros !== 1 ? 's' : ''} disponible${totalRegistros !== 1 ? 's' : ''}`
            : 'Explorá nuestro catálogo de vehículos'}
        </p>
      </div>

      {/* Barra de búsqueda (preparada para filtros futuros) */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar por marca o modelo..."
            className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-text placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            onChange={(e) => {
              const valor = e.target.value.trim();
              setFiltros((prev) => ({
                ...prev,
                marca: valor || undefined,
                numeroPagina: 1,
              }));
            }}
          />
        </div>
      </div>

      {/* Listado o estado vacío */}
      {vehiculos.length > 0 ? (
        <>
          <GrillaVehiculos vehiculos={vehiculos} />

          {/* Paginación simple */}
          {data && data.totalPaginas > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setFiltros((prev) => ({
                  ...prev,
                  numeroPagina: Math.max(1, (prev.numeroPagina || 1) - 1),
                }))}
                disabled={filtros.numeroPagina === 1}
                className="px-4 py-2 border border-border rounded-lg text-text-muted hover:text-text hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              <span className="px-4 py-2 text-text-muted">
                Página {data.paginaActual} de {data.totalPaginas}
              </span>
              <button
                onClick={() => setFiltros((prev) => ({
                  ...prev,
                  numeroPagina: Math.min(data.totalPaginas, (prev.numeroPagina || 1) + 1),
                }))}
                disabled={filtros.numeroPagina === data.totalPaginas}
                className="px-4 py-2 border border-border rounded-lg text-text-muted hover:text-text hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      ) : (
        <EstadoVacio
          titulo="No hay vehículos disponibles"
          descripcion="Por el momento no hay vehículos publicados. Volvé pronto para ver las nuevas publicaciones."
        />
      )}
    </div>
  );
}
