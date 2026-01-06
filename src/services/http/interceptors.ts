import { AxiosInstance, AxiosError } from 'axios';
import { ProblemDetails } from '@/shared/types/api';

/**
 * Respuesta de error del API
 */
type ApiErrorResponse = ProblemDetails | { message?: string };

/**
 * Extrae mensaje de error legible del response del backend
 * Prioriza: detail > code > mensaje por defecto
 */
function extraerMensajeError(data: ApiErrorResponse | undefined, status: number): string {
  if (!data) {
    return obtenerMensajePorDefecto(status);
  }

  // ProblemDetails: priorizar 'detail' si existe
  if ('detail' in data && data.detail && typeof data.detail === 'string') {
    return data.detail;
  }

  // Si tiene código explícito
  if ('code' in data && data.code) {
    return traducirCodigoError(data.code as string);
  }

  // Mensaje genérico
  if ('message' in data && typeof data.message === 'string') {
    return data.message;
  }

  return obtenerMensajePorDefecto(status);
}

/**
 * Traduce códigos de error conocidos a mensajes en español
 */
function traducirCodigoError(codigo: string): string {
  const traducciones: Record<string, string> = {
    'Marketplace.PublicacionNoEncontrada': 'La publicación no fue encontrada',
    'Marketplace.VehiculoNoPublicado': 'El vehículo no está disponible',
    'General.ErrorInterno': 'Ha ocurrido un error interno',
    'Seguridad.OperacionCancelada': 'La operación fue cancelada',
  };

  return traducciones[codigo] || codigo;
}

/**
 * Mensajes por defecto según código HTTP
 */
function obtenerMensajePorDefecto(status: number): string {
  switch (status) {
    case 400: return 'Solicitud inválida';
    case 404: return 'Recurso no encontrado';
    case 429: return 'Demasiadas solicitudes. Intente nuevamente en unos momentos';
    case 500: return 'Error interno del servidor';
    case 503: return 'Servicio no disponible temporalmente';
    default: return 'Ha ocurrido un error de conexión';
  }
}

/**
 * Configura los interceptores de request y response
 */
export function configurarInterceptores(client: AxiosInstance): void {
  // Request interceptor - logging mínimo
  client.interceptors.request.use(
    (config) => {
      // Log solo en desarrollo
      if (import.meta.env.DEV) {
        console.debug('[API Request]', config.method?.toUpperCase(), config.url);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - manejo de errores centralizado
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorResponse>) => {
      const status = error.response?.status || 0;

      // Log mínimo (sin datos sensibles)
      console.warn('[API Error]', { status, url: error.config?.url });

      // Timeout o error de red
      if (error.code === 'ECONNABORTED' || !error.response) {
        const mensaje = error.code === 'ECONNABORTED'
          ? 'La solicitud tardó demasiado. Intente nuevamente'
          : 'Error de conexión. Verifique su conexión a internet';

        const err = new Error(mensaje);
        (err as ErrorConMetadata).codigo = 'ERROR_CONEXION';
        (err as ErrorConMetadata).status = 0;
        return Promise.reject(err);
      }

      // Extraer mensaje de error del backend
      const mensaje = extraerMensajeError(error.response?.data, status);
      const err = new Error(mensaje);
      (err as ErrorConMetadata).codigo = (error.response?.data as ProblemDetails)?.code || `HTTP_${status}`;
      (err as ErrorConMetadata).status = status;

      return Promise.reject(err);
    }
  );
}

/**
 * Tipo de error con metadata adicional
 */
export interface ErrorConMetadata extends Error {
  codigo?: string;
  status?: number;
}
