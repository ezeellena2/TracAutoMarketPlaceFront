import { useNavigate } from 'react-router-dom';
import { Calendar, Gauge, MapPin } from 'lucide-react';
import { Card, CardImage, CardContent } from '@/shared/ui';
import type { VehiculoPublicadoDto } from '@/shared/types';
import { formatearPrecio, formatearKilometraje } from '../utils/formatters';

interface TarjetaVehiculoProps {
  vehiculo: VehiculoPublicadoDto;
}

export function TarjetaVehiculo({ vehiculo }: TarjetaVehiculoProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vehiculo/${vehiculo.publicacionId}`);
  };

  const titulo = [vehiculo.marca, vehiculo.modelo].filter(Boolean).join(' ') || vehiculo.patente;

  return (
    <Card hover onClick={handleClick} className="h-full flex flex-col">
      <CardImage
        src={vehiculo.imagenUrl}
        alt={titulo}
        className="h-48 sm:h-52"
      />
      <CardContent className="flex-1 flex flex-col">
        {/* Título */}
        <h3 className="font-semibold text-text text-lg mb-1 line-clamp-1">
          {titulo}
        </h3>

        {/* Precio */}
        <p className="text-primary font-bold text-xl mb-3">
          {formatearPrecio(vehiculo.precio, vehiculo.moneda)}
        </p>

        {/* Detalles */}
        <div className="flex flex-wrap gap-3 text-sm text-text-muted mb-3">
          {vehiculo.anio && (
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {vehiculo.anio}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Gauge className="w-4 h-4" />
            {formatearKilometraje(vehiculo.kilometraje)}
          </span>
        </div>

        {/* Ubicación */}
        {vehiculo.ubicacion && (
          <p className="flex items-center gap-1 text-sm text-text-muted mt-auto">
            <MapPin className="w-4 h-4" />
            {vehiculo.ubicacion}
          </p>
        )}

        {/* Concesionaria */}
        <p className="text-xs text-text-muted mt-2 pt-2 border-t border-border">
          {vehiculo.concesionariaNombre}
        </p>
      </CardContent>
    </Card>
  );
}
