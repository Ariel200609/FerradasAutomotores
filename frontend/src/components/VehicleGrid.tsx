import React, { useState } from "react";

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  images: string[];
  condition: "new" | "used";
  mileage?: number;
  fuel: string;
}

interface Props {
  vehicles: Vehicle[];
}

const VehicleGrid: React.FC<Props> = ({ vehicles }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {vehicles.map((vehicle) => (
      <VehicleCard key={vehicle.id} vehicle={vehicle} />
    ))}
  </div>
);

// Componente de tarjeta individual con carrusel
const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  const [current, setCurrent] = useState(0);
  const total = vehicle.images.length;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c === total - 1 ? 0 : c + 1));
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-red-600/20 transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        <img
          src={vehicle.images[current]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-64 object-cover"
        />
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-red-600 z-10"
              aria-label="Anterior"
            >
              &#8592;
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-red-600 z-10"
              aria-label="Siguiente"
            >
              &#8594;
            </button>
          </>
        )}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              vehicle.condition === "new"
                ? "bg-green-600 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {vehicle.condition === "new" ? "0 KM" : "Usado"}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">
          {vehicle.brand} {vehicle.model}
        </h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400">Año: {vehicle.year}</span>
          <span className="text-gray-400">
            Combustible: {vehicle.fuel}
          </span>
        </div>
        {vehicle.mileage && (
          <div className="mb-4">
            <span className="text-gray-400">
              Kilometraje: {vehicle.mileage.toLocaleString()} km
            </span>
          </div>
        )}
        {/* Sin precio ni botón de detalles */}
      </div>
    </div>
  );
};

export default VehicleGrid; 