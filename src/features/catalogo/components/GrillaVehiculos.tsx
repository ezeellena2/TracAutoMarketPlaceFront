import type { PublicacionPublicaDto } from '@/shared/types';
import { TarjetaVehiculo } from './TarjetaVehiculo';

interface GrillaVehiculosProps {
  vehiculos: PublicacionPublicaDto[];
}

/**
 * Render a responsive grid of vehicle cards.
 *
 * Each item in `vehiculos` is rendered as a TarjetaVehiculo and keyed by its `id`.
 *
 * @param vehiculos - The list of vehicle publications to display as cards
 * @returns A container `div` with a responsive grid layout containing the vehicle cards
 */
export function GrillaVehiculos({ vehiculos }: GrillaVehiculosProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {vehiculos.map((vehiculo) => (
        <TarjetaVehiculo key={vehiculo.id} vehiculo={vehiculo} />
      ))}
    </div>
  );
}