import axios, { AxiosInstance } from 'axios';
import { env, buildPublicApiUrl } from '@/config/env';
import { configurarInterceptores } from './interceptors';

/**
 * Cliente HTTP configurado para el API público de TracAuto Marketplace
 * No requiere autenticación
 */
const publicApiClient: AxiosInstance = axios.create({
  baseURL: `${env.apiBaseUrl}/public/${env.apiVersion}`,
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': 'es', // Siempre español para errores
  },
});

// Configurar interceptores de manejo de errores
configurarInterceptores(publicApiClient);

export { publicApiClient, buildPublicApiUrl };
export default publicApiClient;
