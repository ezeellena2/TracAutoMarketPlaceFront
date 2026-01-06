/**
 * DTOs públicos del Marketplace
 * Alineados con el backend TracAuto (endpoints públicos)
 */

// ==================== Marketplace Público DTOs ====================

/**
 * Estados posibles de una publicación en el marketplace
 */
export enum EstadoPublicacion {
  Borrador = 1,
  Publicado = 2,
  Pausado = 3,
  Vendido = 4,
}

/**
 * DTO de vehículo publicado en el marketplace (vista pública)
 * Solo incluye información visible para usuarios no autenticados
 */
export interface VehiculoPublicadoDto {
  /** ID de la publicación */
  publicacionId: string;
  /** Patente del vehículo */
  patente: string;
  /** Marca del vehículo */
  marca: string | null;
  /** Modelo del vehículo */
  modelo: string | null;
  /** Año de fabricación */
  anio: number | null;
  /** Precio de venta */
  precio: number | null;
  /** Moneda del precio (ARS, USD, etc) */
  moneda: string;
  /** Kilometraje */
  kilometraje: number;
  /** Descripción de la publicación */
  descripcion: string | null;
  /** Estado de la publicación */
  estado: EstadoPublicacion;
  /** Fecha de publicación (ISO 8601) */
  fechaPublicacion: string;
  /** URL de imagen principal (opcional) */
  imagenUrl: string | null;
  /** Nombre de la concesionaria (público) */
  concesionariaNombre: string;
  /** Ubicación (ciudad/provincia) */
  ubicacion: string | null;
}

/**
 * DTO de detalle de vehículo publicado (vista pública)
 * Información extendida para la página de detalle
 */
export interface VehiculoDetallePublicoDto extends VehiculoPublicadoDto {
  /** Lista de URLs de imágenes adicionales */
  imagenes: string[];
  /** Información de contacto de la concesionaria */
  contacto: {
    telefono: string | null;
    email: string | null;
    whatsapp: string | null;
  };
}

// ==================== Paginación ====================

/**
 * Respuesta paginada genérica
 */
export interface ListaPaginada<T> {
  items: T[];
  paginaActual: number;
  tamanoPagina: number;
  totalPaginas: number;
  totalRegistros: number;
}

/**
 * Parámetros de paginación para queries
 */
export interface PaginacionParams {
  numeroPagina?: number;
  tamanoPagina?: number;
}

// ==================== Filtros de búsqueda ====================

/**
 * Filtros de búsqueda para el catálogo de vehículos
 */
export interface FiltrosVehiculo extends PaginacionParams {
  /** Filtro por marca */
  marca?: string;
  /** Filtro por modelo */
  modelo?: string;
  /** Año mínimo */
  anioDesde?: number;
  /** Año máximo */
  anioHasta?: number;
  /** Precio mínimo */
  precioDesde?: number;
  /** Precio máximo */
  precioHasta?: number;
  /** Kilometraje máximo */
  kilometrajeHasta?: number;
  /** Ordenar por campo */
  ordenarPor?: 'precio' | 'anio' | 'kilometraje' | 'fechaPublicacion';
  /** Orden descendente */
  descendente?: boolean;
}

// ==================== Error Response ====================

/**
 * Formato de error del backend (ProblemDetails RFC 7807)
 */
export interface ProblemDetails {
  type?: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  code?: string;
  [key: string]: unknown;
}
