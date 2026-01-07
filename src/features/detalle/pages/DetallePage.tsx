import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Gauge, Phone, Mail, Building2, Star } from 'lucide-react';
import { SpinnerPantalla, EstadoError, Card, CardContent } from '@/shared/ui';
import { useVehiculoDetalle } from '@/features/catalogo';
import { formatearPrecio, formatearKilometraje, formatearFecha } from '@/features/catalogo/utils/formatters';

/**
 * Render the vehicle detail page for the vehicle id extracted from the route parameters.
 *
 * Displays a loading spinner while fetching, an error state with retry on failure, and the full
 * vehicle details (images, description, specs, price, publication date, and contact info)
 * when data is available.
 *
 * @returns The component's JSX element rendering the vehicle detail page and its loading/error states.
 */
export function DetallePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: vehiculo, isLoading, isError, error, refetch } = useVehiculoDetalle(id);

  // Estado de carga
  if (isLoading) {
    return <SpinnerPantalla />;
  }

  // Estado de error
  if (isError || !vehiculo) {
    return (
      <div className="container-app py-8">
        <EstadoError
          mensaje={error instanceof Error ? error.message : 'Vehículo no encontrado'}
          onReintentar={() => refetch()}
        />
      </div>
    );
  }

  const titulo = [vehiculo.marca, vehiculo.modelo].filter(Boolean).join(' ') || 'Vehículo';

  // Verificar si hay información de contacto disponible
  const tieneContacto = vehiculo.contacto && (
    vehiculo.contacto.telefono || vehiculo.contacto.email
  );

  return (
    <div className="container-app py-6 sm:py-8">
      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-muted hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al catálogo
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Imagen principal */}
          <Card>
            <div className="aspect-video bg-gray-100 relative overflow-hidden rounded-t-xl">
              {vehiculo.imagenPortadaUrl ? (
                <img
                  src={vehiculo.imagenPortadaUrl}
                  alt={titulo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-text-muted">
                  Sin imagen
                </div>
              )}
              {vehiculo.destacado && (
                <span className="absolute top-4 right-4 bg-primary text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Destacado
                </span>
              )}
            </div>

            {/* Galería de imágenes adicionales */}
            {vehiculo.imagenesUrls && vehiculo.imagenesUrls.length > 0 && (
              <div className="p-4 border-t border-border">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {vehiculo.imagenesUrls.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${titulo} - imagen ${idx + 1}`}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Descripción */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-lg text-text mb-4">Descripción</h2>
              <p className="text-text-muted whitespace-pre-line">
                {vehiculo.descripcion || 'Sin descripción disponible.'}
              </p>
            </CardContent>
          </Card>

          {/* Detalles del vehículo */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-lg text-text mb-4">Características</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {vehiculo.anio && (
                  <div className="flex items-center gap-2 text-text-muted">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-text-muted">Año</p>
                      <p className="font-medium text-text">{vehiculo.anio}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 text-text-muted">
                  <Gauge className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-text-muted">Kilometraje</p>
                    <p className="font-medium text-text">{formatearKilometraje(vehiculo.kilometraje)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna lateral */}
        <div className="space-y-6">
          {/* Precio y título */}
          <Card>
            <CardContent>
              <h1 className="text-2xl font-bold text-text mb-2">{titulo}</h1>
              <p className="text-3xl font-bold text-primary mt-4">
                {formatearPrecio(vehiculo.precio, vehiculo.moneda)}
              </p>
              <p className="text-xs text-text-muted mt-2">
                Publicado el {formatearFecha(vehiculo.fechaPublicacion)}
              </p>
            </CardContent>
          </Card>

          {/* Datos de contacto */}
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-text">{vehiculo.vendedor.nombre}</h2>
              </div>

              <div className="space-y-3">
                {vehiculo.contacto?.telefono && (
                  <a
                    href={`tel:${vehiculo.contacto.telefono}`}
                    className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-text">{vehiculo.contacto.telefono}</span>
                  </a>
                )}

                {vehiculo.contacto?.email && (
                  <a
                    href={`mailto:${vehiculo.contacto.email}`}
                    className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-text truncate">{vehiculo.contacto.email}</span>
                  </a>
                )}

                {!tieneContacto && (
                  <p className="text-text-muted text-sm text-center py-4">
                    Información de contacto no disponible
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}