/**
 * Formatea un precio con símbolo de moneda
 */
export function formatearPrecio(precio: number | null, moneda: string): string {
  if (precio === null) {
    return 'Consultar';
  }

  const simbolos: Record<string, string> = {
    ARS: '$',
    USD: 'USD ',
    EUR: '€',
  };

  const simbolo = simbolos[moneda] || `${moneda} `;

  // Formatear con separadores de miles
  const precioFormateado = precio.toLocaleString('es-AR');

  return `${simbolo}${precioFormateado}`;
}

/**
 * Formatea el kilometraje
 */
export function formatearKilometraje(km: number): string {
  if (km === 0) {
    return '0 km';
  }

  return `${km.toLocaleString('es-AR')} km`;
}

/**
 * Formatea una fecha ISO a formato legible
 */
export function formatearFecha(fechaISO: string): string {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
