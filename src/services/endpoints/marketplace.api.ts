import { publicApiClient } from '../http/publicApiClient';
import type {
  PublicacionPublicaDto,
  PublicacionPublicaDetalleDto,
  ListaPaginada,
  FiltrosVehiculo,
  ConcesionariaDto,
} from '@/shared/types/api';

const BASE_URL = 'marketplace';

/**
 * API pública del Marketplace de vehículos
 * Endpoints sin autenticación para usuarios públicos
 * 
 * Rutas backend:
 * - GET /api/public/v1/marketplace/vehiculos
 * - GET /api/public/v1/marketplace/vehiculos/{id}
 */
export const marketplaceApi = {
  /**
   * Obtiene la lista paginada de vehículos publicados
   * GET /api/public/v1/marketplace/vehiculos
   */
  obtenerVehiculos: async (
    filtros?: FiltrosVehiculo
  ): Promise<ListaPaginada<PublicacionPublicaDto>> => {
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
    if (filtros?.concesionariaId) {
      params.append('concesionariaId', filtros.concesionariaId);
    }
    // Backend usa anioMinimo/anioMaximo
    if (filtros?.anioDesde) {
      params.append('anioMinimo', filtros.anioDesde.toString());
    }
    if (filtros?.anioHasta) {
      params.append('anioMaximo', filtros.anioHasta.toString());
    }
    // Backend usa precioMinimo/precioMaximo
    if (filtros?.precioDesde) {
      params.append('precioMinimo', filtros.precioDesde.toString());
    }
    if (filtros?.precioHasta) {
      params.append('precioMaximo', filtros.precioHasta.toString());
    }
    // Backend usa 'ordenar' con valores: precio_asc, precio_desc, fecha_desc, km_asc, anio_desc
    if (filtros?.ordenarPor) {
      const ordenBackend = mapearOrdenamiento(filtros.ordenarPor, filtros.descendente);
      if (ordenBackend) {
        params.append('ordenar', ordenBackend);
      }
    }

    const query = params.toString();
    const url = query ? `${BASE_URL}/vehiculos?${query}` : `${BASE_URL}/vehiculos`;

    const response = await publicApiClient.get<ListaPaginada<PublicacionPublicaDto>>(url);
    return response.data;
  },

  /**
   * Obtiene el detalle de un vehículo publicado
   * GET /api/public/v1/marketplace/vehiculos/{id}
   */
  obtenerVehiculoPorId: async (
    publicacionId: string
  ): Promise<PublicacionPublicaDetalleDto> => {
    const response = await publicApiClient.get<PublicacionPublicaDetalleDto>(
      `${BASE_URL}/vehiculos/${publicacionId}`
    );
    return response.data;
  },

  /**
   * Obtiene la lista de concesionarias disponibles
   * GET /api/public/v1/marketplace/concesionarias
   */
  obtenerConcesionarias: async (): Promise<ConcesionariaDto[]> => {
    const response = await publicApiClient.get<ListaPaginada<ConcesionariaDto>>(
      `${BASE_URL}/concesionarias?tamanoPagina=50` // Traer suficientes opciones
    );
    return response.data.items;
  },
};

/**
 * Mapea ordenamiento del frontend al formato del backend
 */
function mapearOrdenamiento(
  campo: string,
  descendente?: boolean
): string | null {
  switch (campo) {
    case 'precio':
      return descendente ? 'precio_desc' : 'precio_asc';
    case 'anio':
      return 'anio_desc'; // Backend solo soporta desc para año
    case 'kilometraje':
      return 'km_asc'; // Backend solo soporta asc para km
    case 'fechaPublicacion':
      return 'fecha_desc';
    default:
      return null;
  }
}
