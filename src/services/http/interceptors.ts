import { AxiosInstance, AxiosError } from 'axios';
import i18n from '@/shared/i18n';
import { ProblemDetails } from '@/shared/types/api';

/**
 * Respuesta de error del API
 */
type ApiErrorResponse = ProblemDetails | { message?: string };

/**
 * Traduce un código de error usando i18n
 */
function traducirCodigoError(codigo: string): string {
  const key = `errors.${codigo}`;
  const traduccion = i18n.t(key);
  // Si no hay traducción, devolver el código original
  return traduccion === key ? codigo : traduccion;
}

/**
 * Extrae mensaje de error legible del response del backend
 * Prioriza: detail > code traducido > mensaje por defecto
 */
function extraerMensajeError(data: ApiErrorResponse | undefined, status: number): string {
  if (!data) {
    return obtenerMensajePorDefecto(status);
  }

  // ProblemDetails: priorizar 'detail' si existe
  if ('detail' in data && data.detail && typeof data.detail === 'string') {
    return data.detail;
  }

  // Si tiene código explícito, intentar traducirlo
  if ('code' in data && data.code) {
    const traducido = traducirCodigoError(data.code as string);
    if (traducido !== data.code) {
      return traducido;
    }
  }

  // Mensaje genérico
  if ('message' in data && typeof data.message === 'string') {
    return data.message;
  }

  return obtenerMensajePorDefecto(status);
}

/**
 * Mensajes por defecto según código HTTP (usando i18n)
 */
function obtenerMensajePorDefecto(status: number): string {
  switch (status) {
    case 400: return i18n.t('errors.badRequest');
    case 404: return i18n.t('errors.notFound');
    case 429: return i18n.t('errors.tooManyRequests');
    case 500: return i18n.t('errors.serverError');
    case 503: return i18n.t('errors.serviceUnavailable');
    default: return i18n.t('errors.unexpected');
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
      const data = error.response?.data as ProblemDetails | undefined;

      // Log mínimo (sin datos sensibles, con traceId si existe)
      console.warn('[API Error]', { 
        status, 
        url: error.config?.url,
        traceId: data?.traceId 
      });

      // Timeout o error de red
      if (error.code === 'ECONNABORTED' || !error.response) {
        const mensaje = error.code === 'ECONNABORTED'
          ? i18n.t('errors.timeout')
          : i18n.t('errors.network');

        const err = new Error(mensaje);
        (err as ErrorConMetadata).codigo = 'ERROR_CONEXION';
        (err as ErrorConMetadata).status = 0;
        return Promise.reject(err);
      }

      // Extraer mensaje de error del backend
      const mensaje = extraerMensajeError(data, status);
      const err = new Error(mensaje);
      (err as ErrorConMetadata).codigo = data?.code || `HTTP_${status}`;
      (err as ErrorConMetadata).status = status;
      (err as ErrorConMetadata).traceId = data?.traceId;
      (err as ErrorConMetadata).timestamp = data?.timestamp;

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
  traceId?: string;
  timestamp?: string;
}
