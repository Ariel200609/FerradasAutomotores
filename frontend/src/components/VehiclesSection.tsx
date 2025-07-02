import React, { useState } from "react";
import { Search } from "lucide-react";

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

const vehicles: Vehicle[] = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2024,
    price: 25000,
    image:
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800",
    condition: "new",
    fuel: "Gasolina",
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 22000,
    image:
      "https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800",
    condition: "new",
    fuel: "Gasolina",
  },
  {
    id: 3,
    brand: "Ford",
    model: "Focus",
    year: 2021,
    price: 18500,
    image:
      "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800",
    condition: "used",
    mileage: 25000,
    fuel: "Gasolina",
  },
  {
    id: 4,
    brand: "Chevrolet",
    model: "Onix",
    year: 2024,
    price: 20000,
    image:
      "https://images.pexels.com/photos/708764/pexels-photo-708764.jpeg?auto=compress&cs=tinysrgb&w=800",
    condition: "new",
    fuel: "Flex",
  },
  {
    id: 5,
    brand: "Volkswagen",
    model: "Golf",
    year: 2022,
    price: 24000,
    image:
      "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
    condition: "used",
    mileage: 15000,
    fuel: "Gasolina",
  },
  {
    id: 6,
    brand: "Nissan",
    model: "Sentra",
    year: 2024,
    price: 23500,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
    condition: "new",
    fuel: "Gasolina",
  },
];

const VehiclesSection: React.FC = () => {
  const [filterCondition, setFilterCondition] = useState<"all" | "new" | "used">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesCondition =
      filterCondition === "all" || vehicle.condition === filterCondition;
    const matchesSearch =
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCondition && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="vehiculos" className="bg-gradient-to-r from-black via-gray-500 to-white backdrop-blur-sm z-50 border-b border-white-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Nuestros <span className="text-red-600">Vehículos</span>
          </h2>
          <p className="text-xl text-black-700 max-w-3xl mx-auto">
            Explora nuestra cuidadosa selección de vehículos nuevos y usados,
            todos inspeccionados y certificados para tu tranquilidad.
          </p>
        </div>
        {/* Search and Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-gray-700 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 w-full md:w-80"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterCondition("all")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                filterCondition === "all"
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterCondition("new")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                filterCondition === "new"
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-700"
              }`}
            >
              0 KM
            </button>
            <button
              onClick={() => setFilterCondition("used")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                filterCondition === "used"
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Usados
            </button>
          </div>
        </div>
        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
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
      </div>
    </section>
  );
};

export default VehiclesSection; 