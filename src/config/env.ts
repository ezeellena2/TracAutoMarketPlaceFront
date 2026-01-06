/**
 * Configuración de entorno centralizada
 * Lee las variables de entorno de Vite y las expone de forma tipada
 */

export const env = {
  /** URL base del API */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5200/api',

  /** Versión del API */
  apiVersion: import.meta.env.VITE_API_VERSION || 'v1',

  /** Timeout para requests en ms */
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
} as const;

/**
 * Construye la URL completa del API público para un path dado
 * @param path - Path del endpoint (ej: 'marketplace/vehicles')
 * @returns URL completa (ej: 'http://localhost:5200/api/public/v1/marketplace/vehicles')
 */
export function buildPublicApiUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${env.apiBaseUrl}/public/${env.apiVersion}/${cleanPath}`;
}

export default env;
