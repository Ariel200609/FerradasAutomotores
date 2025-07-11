// VehiclesSection.tsx
// Sección principal de vehículos de la landing page de Ferradas Automotores.
// Permite buscar y filtrar vehículos por marca, modelo y condición (nuevo/usado).
// Muestra un grid/carrusel de vehículos usando VehicleGrid y maneja el estado de búsqueda y filtro.
// Incluye función de formateo de precio (actualmente no usada en el render).

import React, { useState } from "react";
import { Search } from "lucide-react";
import VehicleGrid from "./VehicleGrid";

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

const vehicles: Vehicle[] = [
  {
    id: 2,
    brand: "Volkswagen",
    model: "Amarok V6",
    year: 2025,
    images: [
      "/FerradasAutomotores/AmarokV6.jpg"
    ],
    condition: "new",
    fuel: "Diesel",
  },
  {
    id: 3,
    brand: "Ford",
    model: "Focus",
    year: 2021,
    images: [
      "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    condition: "used",
    mileage: 25000,
    fuel: "Gasolina",
  },
  {
    id: 4,
    brand: "Chevrolet",
    model: "Onix",
    year: 2024,
    images: [
      "/FerradasAutomotores/Onix-RS.jpg"
    ],
    condition: "new",
    fuel: "Flex",
  },
  {
    id: 5,
    brand: "Fiat",
    model: "Fastback 270",
    year: 2025,
    images: [
      "/FerradasAutomotores/Fastback/PortadaFiat.jpg"
    ],
    condition: "new",
    fuel: "Gasolina",
  },
  {
    id: 6,
    brand: "Ford",
    model: "Maverik Lariat Híbrida ",
    year: 2024,
    mileage: 25000,
    images: [
      "/FerradasAutomotores/Maverik/PortadaMaverik.jpg",
      "/FerradasAutomotores/Maverik/AtrasMaverik.jpg",
      "/FerradasAutomotores/Maverik/DelanteMaverik.jpg",
      "/FerradasAutomotores/Maverik/InteriorMaverik.jpg"  
    ],
    condition: "used",
    fuel: "Naftera-Eléctrica",
  },
  // Volkswagen T-cross Highline
  {
    id: 7,
    brand: "Volkswagen",
    model: "T-cross Highline",
    year: 2020,
    mileage: 70000,
    images: [
      "/FerradasAutomotores/t-cross/dalanteT-cross.jpg",
      "/FerradasAutomotores/t-cross/costadoT-cross.jpg",
      "/FerradasAutomotores/t-cross/atrasT-cross.jpg",
      "/FerradasAutomotores/t-cross/interiorT-cross.jpg",
      "/FerradasAutomotores/t-cross/costadotT-cross.jpg",
      "/FerradasAutomotores/t-cross/interior2T-cross.jpg"
    ],
    condition: "used",
    fuel: "Naftero",
  },
];

const VehiclesSection: React.FC = () => {
  const [filterCondition, setFilterCondition] = useState<"all" | "new" | "used">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrado de vehículos según búsqueda y condición
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesCondition =
      filterCondition === "all" || vehicle.condition === filterCondition;
    const matchesSearch =
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCondition && matchesSearch;
  });

  // [NO USADO] Función para formatear precio, no utilizada actualmente
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="VehiclesSection" className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-1 py-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Nuestros <span className="text-red-600">Vehículos</span>
          </h2>
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
        <VehicleGrid vehicles={filteredVehicles} />
      </div>
    </section>
  );
};

export default VehiclesSection; 