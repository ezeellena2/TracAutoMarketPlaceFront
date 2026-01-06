import { publicApiClient } from '../http/publicApiClient';
import type {
  VehiculoPublicadoDto,
  VehiculoDetallePublicoDto,
  ListaPaginada,
  FiltrosVehiculo,
} from '@/shared/types/api';

const BASE_URL = 'marketplace';

/**
 * API pública del Marketplace de vehículos
 * Endpoints sin autenticación para usuarios públicos
 */
export const marketplaceApi = {
  /**
   * Obtiene la lista paginada de vehículos publicados
   * GET /api/public/v1/marketplace/vehicles
   */
  obtenerVehiculos: async (
    filtros?: FiltrosVehiculo
  ): Promise<ListaPaginada<VehiculoPublicadoDto>> => {
    const params = new URLSearchParams();

    if (filtros?.numeroPagina) {
      params.append('numeroPagina', filtros.numeroPagina.toString());
    }
    if (filtros?.tamanoPagina) {
      params.append('tamanoPagina', filtros.tamanoPagina.toString());
    }
    if (filtros?.marca) {
      params.append('marca', filtros.marca);
    }
    if (filtros?.modelo) {
      params.append('modelo', filtros.modelo);
    }
    if (filtros?.anioDesde) {
      params.append('anioDesde', filtros.anioDesde.toString());
    }
    if (filtros?.anioHasta) {
      params.append('anioHasta', filtros.anioHasta.toString());
    }
    if (filtros?.precioDesde) {
      params.append('precioDesde', filtros.precioDesde.toString());
    }
    if (filtros?.precioHasta) {
      params.append('precioHasta', filtros.precioHasta.toString());
    }
    if (filtros?.kilometrajeHasta) {
      params.append('kilometrajeHasta', filtros.kilometrajeHasta.toString());
    }
    if (filtros?.ordenarPor) {
      params.append('ordenarPor', filtros.ordenarPor);
    }
    if (filtros?.descendente !== undefined) {
      params.append('descendente', filtros.descendente.toString());
    }

    const query = params.toString();
    const url = query ? `${BASE_URL}/vehicles?${query}` : `${BASE_URL}/vehicles`;

    const response = await publicApiClient.get<ListaPaginada<VehiculoPublicadoDto>>(url);
    return response.data;
  },

  /**
   * Obtiene el detalle de un vehículo publicado
   * GET /api/public/v1/marketplace/vehicles/{id}
   */
  obtenerVehiculoPorId: async (
    publicacionId: string
  ): Promise<VehiculoDetallePublicoDto> => {
    const response = await publicApiClient.get<VehiculoDetallePublicoDto>(
      `${BASE_URL}/vehicles/${publicacionId}`
    );
    return response.data;
  },
};
