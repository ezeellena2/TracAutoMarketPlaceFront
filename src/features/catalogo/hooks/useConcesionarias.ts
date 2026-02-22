import { useQuery } from '@tanstack/react-query';
import { marketplaceApi } from '@/services/endpoints/marketplace.api';

/**
 * Hook para obtener la lista de concesionarias disponibles
 */
export function useConcesionarias() {
    return useQuery({
        queryKey: ['concesionarias'],
        queryFn: () => marketplaceApi.obtenerConcesionarias(),
    });
}
