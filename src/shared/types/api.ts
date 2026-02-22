/**
 * DTOs públicos del Marketplace
 * Alineados con el backend TracAuto (endpoints públicos)
 * Fuente: TracAuto.Application.Marketplace.Public.DTOs
 */

// ==================== Vendedor/Concesionaria ====================

/**
 * DTO para listar concesionarias en filtros
 */
export interface ConcesionariaDto {
  /** ID de la concesionaria */
  id: string;
  /** Nombre comercial */
  nombre: string;
}

/**
 * Información resumida del vendedor (concesionaria)
 * Fuente: VendedorResumenDto.cs
 */
export interface VendedorResumenDto {
  /** ID de la concesionaria */
  id: string;
  /** Nombre comercial */
  nombre: string;
  /** Slug para URLs (SEO) */
  slug: string | null;
}

/**
 * Información de contacto público
 * Fuente: ContactoPublicoDto.cs
 */
export interface ContactoPublicoDto {
  /** Nombre del contacto */
  nombre: string;
  /** Teléfono de contacto */
  telefono: string;
  /** Email de contacto */
  email: string;
}

// ==================== Publicaciones ====================

/**
 * DTO de publicación para listados del marketplace
 * Fuente: PublicacionPublicaDto.cs
 */
export interface PublicacionPublicaDto {
  /** ID de la publicación */
  id: string;
  /** Marca del vehículo */
  marca: string;
  /** Modelo del vehículo */
  modelo: string;
  /** Año del vehículo */
  anio: number | null;
  /** Precio de venta (null = consultar) */
  precio: number | null;
  /** Moneda del precio (ISO 4217) */
  moneda: string;
  /** Kilometraje reportado */
  kilometraje: number;
  /** Indica si es publicación destacada */
  destacado: boolean;
  /** Fecha de publicación (ISO 8601) */
  fechaPublicacion: string;
  /** URL de imagen de portada */
  imagenPortadaUrl: string | null;
  /** Información del vendedor */
  vendedor: VendedorResumenDto;
}

/**
 * DTO de detalle de publicación (página de detalle)
 * Fuente: PublicacionPublicaDetalleDto.cs
 */
export interface PublicacionPublicaDetalleDto {
  /** ID de la publicación */
  id: string;
  /** Marca del vehículo */
  marca: string;
  /** Modelo del vehículo */
  modelo: string;
  /** Año del vehículo */
  anio: number | null;
  /** Precio de venta (null = consultar) */
  precio: number | null;
  /** Moneda del precio (ISO 4217) */
  moneda: string;
  /** Kilometraje reportado */
  kilometraje: number;
  /** Descripción detallada */
  descripcion: string | null;
  /** Indica si es publicación destacada */
  destacado: boolean;
  /** Fecha de publicación (ISO 8601) */
  fechaPublicacion: string;
  /** URL de imagen de portada */
  imagenPortadaUrl: string | null;
  /** URLs de imágenes adicionales */
  imagenesUrls: string[];
  /** Información del vendedor */
  vendedor: VendedorResumenDto;
  /** Información de contacto */
  contacto: ContactoPublicoDto;
}

// ==================== Alias de compatibilidad ====================
// Para facilitar migración gradual del código existente

/** @deprecated Usar PublicacionPublicaDto */
export type VehiculoPublicadoDto = PublicacionPublicaDto;

/** @deprecated Usar PublicacionPublicaDetalleDto */
export type VehiculoDetallePublicoDto = PublicacionPublicaDetalleDto;

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
  /** Filtro por concesionaria */
  concesionariaId?: string;
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
 * Con extensiones TracAuto para correlación de errores
 */
export interface ProblemDetails {
  type?: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  // TracAuto extensions
  code?: string;
  traceId?: string;
  timestamp?: string;
  [key: string]: unknown;
}
