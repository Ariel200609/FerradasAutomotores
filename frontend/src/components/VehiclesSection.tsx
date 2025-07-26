// VehiclesSection.tsx
// Sección principal de vehículos de la landing page de Ferradas Automotores.
// Permite buscar y filtrar vehículos por marca, modelo y condición (nuevo/usado).
// Muestra un grid/carrusel de vehículos usando VehicleGrid y maneja el estado de búsqueda y filtro.
// Incluye función de formateo de precio (actualmente no usada en el render).

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import VehicleGrid from "./VehicleGrid";
import SearchAndFilter from "./SearchAndFilter";

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
  // Ford Focus Guia
  {
    id: 3,
    brand: "Ford",
    model: "Focus Guia",
    year: 2013,
    images: [
      "/FerradasAutomotores/focus/IMG-20250718-WA0113.jpg",
    ],
    condition: "used",
    mileage: 200000,
    fuel: "Nafta",
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
    ],
    condition: "used",
    fuel: "Naftero",
  },
  // Toyota Hilux
  {
    id: 8,
    brand: "Toyota",
    model: "Hilux SRX",
    year: 2019,
    images: [
      "/FerradasAutomotores/HiluxBlack/Hilux(1).jpg",
    ],
    condition: "used",
    mileage: 130000,
    fuel: "Diesel",
  },
  // Volkswagen Amarok Highline Gris
  {
    id: 9,
    brand: "Volkswagen",
    model: "Amarok Highline",
    year: 2021,
    images: [
      "/FerradasAutomotores/AmarokGris/Amarok(2).jpg",
    ],
    condition: "used",
    mileage: 100000,
    fuel: "Diesel",
  },
  // Toyota Hilux SRV
  {
    id: 10,
    brand: "Toyota",
    model: "Hilux SRV",
    year: 2021,
    images: [
      "/FerradasAutomotores/HiluxSRV/srv(7).jpg",
    ],
    condition: "used",
    mileage: 180000,
    fuel: "Diesel",
  },
  // Ford Ranger Raptor
  {
    id: 11,
    brand: "Ford",
    model: "Ranger Raptor",
    year: 2024,
    images: [
      "/FerradasAutomotores/Raptor/raptor(1).jpg",
    ],
    condition: "used",
    mileage: 25000,
    fuel: "Nafta",
  },
  // Ford Ecosport XLS
  {
    id: 12,
    brand: "Ford",
    model: "Ecosport XLS",
    year: 2010,
    images: [
      "/FerradasAutomotores/ecosport/ecosport(1).jpg",
    ],
    condition: "used",
    mileage: 200000,
    fuel: "Nafta",
  },
  // Volkswagen UP
  {
    id: 13,
    brand: "Volkswagen",
    model: "UP",
    year: 2017,
    images: [
      "/FerradasAutomotores/up/up(1).jpg",
    ],
    condition: "used",
    mileage: 100,
    fuel: "Nafta",
  },
  // Volkswagen Amarok V6
  {
    id: 14,
    brand: "Volkswagen",
    model: "Amarok V6",
    year: 2022,
    images: [
      "/FerradasAutomotores/amarokv6/IMG-20250719-WA0002.jpg",
    ],
    condition: "used",
    mileage: 90000,
    fuel: "Diesel",
  },
  // Nissan Frontier S
  {
    id: 15,
    brand: "Nissan",
    model: "Frontier",
    year: 2021,
    images: [
      "/FerradasAutomotores/frontier/IMG-20250719-WA0020.jpg",
    ],
    condition: "used",
    mileage: 180000,
    fuel: "Diesel",
  },
  // Toyota Hilux SRX Gris
  {
    id: 16,
    brand: "Toyota",
    model: "Hilux SRX Gris",
    year: 2017,
    images: [
      "/FerradasAutomotores/srxgris/IMG-20250719-WA0025.jpg",
    ],
    condition: "used",
    mileage: 230000,
    fuel: "Diesel",
  },
  // Renault Duster Oroch Outsider
  {
    id: 17,
    brand: "Renault",
    model: "Duster Oroch Outsider",
    year: 2017,
    images: [
      "/FerradasAutomotores/oroch/IMG-20250719-WA0039.jpg",

    ],
    condition: "used",
    mileage: 230000,
    fuel: "Nafta",
  },
  // Peugeot 307 XS Cuero
  {
    id: 18,
    brand: "Peugeot",
    model: "307 XS Cuero",
    year: 2011,
    images: [
      "/FerradasAutomotores/307/IMG-20250719-WA0049.jpg",

    ],
    condition: "used",
    mileage: 125000,
    fuel: "Nafta",
  },
  // Ford Mustang GT
  {
    id: 19,
    brand: "Ford",
    model: "Mustang GT",
    year: 2023,
    images: [
      "/FerradasAutomotores/mustang/IMG-20250719-WA0073.jpg",
    ],
    condition: "used",
    mileage: 15000,
    fuel: "Nafta",
  },
  // Volkswagen Amarok Highline G2
  {
    id: 20,
    brand: "Volkswagen",
    model: "Amarok Highline G2",
    year: 2025,
    images: [
      "/FerradasAutomotores/higlineG2/IMG-20250720-WA0053.jpg",
    ],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  // Volkswagen Amarok Highline Black Style G2
  {
    id: 21,
    brand: "Volkswagen",
    model: "Amarok Black Style G2",
    year: 2025,
    images: [
      "/FerradasAutomotores/higline black style G2/IMG-20250720-WA0057.jpg",
    ],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  // Volkswagen Amarok Comfortline G2
  {
    id: 22,
    brand: "Volkswagen",
    model: "Amarok Comfortline G2",
    year: 2025,
    images: [
      "/FerradasAutomotores/comfortline G2/IMG-20250720-WA0068.jpg",
     
    ],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  // Volkswagen T-Cross Bitono
  {
    id: 23,
    brand: "Volkswagen",
    model: "T-Cross Bitono",
    year: 2025,
    images: [
      "/FerradasAutomotores/t-cross bitono/IMG-20250720-WA0078.jpg",
      
    ],
    condition: "new",
    mileage: 0,
    fuel: "Nafta",
  },
  // Volkswagen Taos
  {
    id: 24,
    brand: "Volkswagen",
    model: "Taos",
    year: 2025,
    images: [
      "/FerradasAutomotores/taos/IMG-20250720-WA0088.jpg",
      
    ],
    condition: "new",
    mileage: 0,
    fuel: "Nafta",
  },
  // Volkswagen Polo Track
  {
    id: 25,
    brand: "Volkswagen",
    model: "Polo Track",
    year: 2025,
    images: [
      "/FerradasAutomotores/polo track/IMG-20250720-WA0098.jpg",
      
    ],
    condition: "new",
    mileage: 0,
    fuel: "Nafta",
  },
  // Hilux srx 4x4 AT
  {
    id: 26,
    brand: "Toyota",
    model: "Hilux SRX 4x4 AT",
    year: 2025,
    images: [
      "/FerradasAutomotores/ToyotaHiluxsrx4x4AT/t(2).jpg",
    ],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  // Hilux SRV Red
  {
    id: 27,
    brand: "Toyota",
    model: "Hilux SRV Roja",
    year: 2025,
    images: [
      "/FerradasAutomotores/hiluxsrvred/red(1).jpg",
    ],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  // hilux sr 4x4 mt
  {
    id: 28,
    brand: "Toyota",
    model: "hilux sr 4x4 mt",
    year: 2025,
    images: [
      "/FerradasAutomotores/ToyotaHiluxSr4x4MT/b(1).jpg",
    ],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  }
];

const VehiclesSection: React.FC = () => {
  // Leer estado inicial de localStorage
  const [filterCondition, setFilterCondition] = useState<"all" | "new" | "used">(() => {
    return (localStorage.getItem("filterCondition") as "all" | "new" | "used") || "all";
  });
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("searchTerm") || "";
  });

  // Guardar en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("filterCondition", filterCondition);
  }, [filterCondition]);
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  // Ordenar para que Mustang y Raptor estén primero en el grid
  const orderedVehicles = [
    vehicles.find(v => v && v.model.toLowerCase().includes("mustang")),
    vehicles.find(v => v && v.model.toLowerCase().includes("raptor")),
    ...vehicles.filter(v =>
      v && !v.model.toLowerCase().includes("mustang") &&
      !v.model.toLowerCase().includes("raptor")
    )
  ].filter(Boolean);

  // Filtrar para que el Onix no se muestre
  const visibleVehicles = orderedVehicles.filter(
    (vehicle): vehicle is Vehicle => !!vehicle && !vehicle.model.toLowerCase().includes("onix")
  );

  // Filtrado de vehículos según búsqueda y condición
  const filteredVehicles = visibleVehicles.filter((vehicle) => {
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
        {/* Search and Filter mejorado */}
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
        />
        {/* Vehicle Grid */}
        <VehicleGrid vehicles={filteredVehicles} />
      </div>
    </section>
  );
};

export default VehiclesSection; 