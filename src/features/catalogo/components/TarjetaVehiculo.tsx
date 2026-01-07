import { useNavigate } from 'react-router-dom';
import { Calendar, Gauge, Star } from 'lucide-react';
import { Card, CardImage, CardContent } from '@/shared/ui';
import type { PublicacionPublicaDto } from '@/shared/types';
import { formatearPrecio, formatearKilometraje } from '../utils/formatters';

interface TarjetaVehiculoProps {
  vehiculo: PublicacionPublicaDto;
}

export function TarjetaVehiculo({ vehiculo }: TarjetaVehiculoProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vehiculo/${vehiculo.id}`);
  };

  const titulo = [vehiculo.marca, vehiculo.modelo].filter(Boolean).join(' ') || 'Vehículo';

  return (
    <Card hover onClick={handleClick} className="h-full flex flex-col">
      <div className="relative">
        <CardImage
          src={vehiculo.imagenPortadaUrl}
          alt={titulo}
          className="h-48 sm:h-52"
        />
        {vehiculo.destacado && (
          <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" />
            Destacado
          </span>
        )}
      </div>
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

        {/* Concesionaria */}
        <p className="text-xs text-text-muted mt-auto pt-2 border-t border-border">
          {vehiculo.vendedor.nombre}
        </p>
      </CardContent>
    </Card>
  );
}
