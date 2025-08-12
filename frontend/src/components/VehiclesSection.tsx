// VehiclesSection.tsx
// Sección principal de vehículos de la landing page de Ferradas Automotores.
// Permite buscar y filtrar vehículos por marca, modelo y condición (nuevo/usado).
// Muestra un grid/carrusel de vehículos usando VehicleGrid y maneja el estado de búsqueda y filtro.
// Incluye función de formateo de precio (actualmente no usada en el render).

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VehicleGrid from "./VehicleGrid";
import SearchAndFilter from "./SearchAndFilter";
import { vehicles, type Vehicle } from "../data/vehicles";

// Fuente de datos movida a src/data/vehicles.ts para reutilización

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

  // Acciones auxiliares
  const clearFilters = () => {
    setFilterCondition("all");
    setSearchTerm("");
    try {
      localStorage.removeItem("filterCondition");
      localStorage.removeItem("searchTerm");
    } catch {}
  };

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
        {/* Barra de acciones en una fila: Resultados, Limpiar, Comparar, Consultar, Ver todos */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
          <p className="text-sm text-gray-600">
            Resultados: <span className="font-semibold text-gray-900">{filteredVehicles.length}</span>
          </p>
          <div className="flex flex-wrap gap-3 md:ml-auto">
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm"
            >
              Limpiar filtros
            </button>
            <Link
              to="/comparar"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white shadow hover:bg-red-700 transition-colors text-sm md:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M3 7h18M3 12h18M3 17h18" />
              </svg>
              <span>Comparar vehículos</span>
            </Link>
            <Link
              to="/consultar"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition-colors text-sm md:text-base"
            >
              Consultar por un vehículo
            </Link>
          </div>
        </div>
        <div className="text-right text-xs text-gray-500 pr-2 mb-2">
          <Link to="/vehiculos" className="hover:underline text-gray-700">
            Ver todos los vehículos →
          </Link>
        </div>
        {/* Hint de scroll horizontal */}
        <div className="text-right text-xs text-gray-500 pr-2">Deslizá para ver más →</div>
        {/* Vehicle Grid */}
        <VehicleGrid vehicles={filteredVehicles} />
      </div>
    </section>
  );
};

export default VehiclesSection; 