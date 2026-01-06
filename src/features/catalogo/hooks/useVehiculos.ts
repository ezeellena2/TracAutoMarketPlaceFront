import { useQuery } from '@tanstack/react-query';
import { marketplaceApi } from '@/services';
import type { FiltrosVehiculo } from '@/shared/types';

/**
 * Hook para obtener la lista de vehículos publicados
 */
export function useVehiculos(filtros?: FiltrosVehiculo) {
  return useQuery({
    queryKey: ['vehiculos', filtros],
    queryFn: () => marketplaceApi.obtenerVehiculos(filtros),
  });
}

/**
 * Hook para obtener el detalle de un vehículo
 */
export function useVehiculoDetalle(publicacionId: string | undefined) {
  return useQuery({
    queryKey: ['vehiculo', publicacionId],
    queryFn: () => marketplaceApi.obtenerVehiculoPorId(publicacionId!),
    enabled: !!publicacionId,
  });
}
