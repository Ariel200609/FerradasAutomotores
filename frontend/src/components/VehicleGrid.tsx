import React from "react";

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  condition: "new" | "used";
  mileage?: number;
  fuel: string;
}

interface Props {
  vehicles: Vehicle[];
  formatPrice: (price: number) => string;
}

const VehicleGrid: React.FC<Props> = ({ vehicles, formatPrice }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {vehicles.map((vehicle) => (
      <div
        key={vehicle.id}
        className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-red-600/20 transition-all duration-300 transform hover:-translate-y-2"
      >
        <div className="relative">
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-64 object-cover"
          />
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
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold text-red-600">
              {formatPrice(vehicle.price)}
            </span>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default VehicleGrid; 