import React, { useEffect, useMemo, useState } from "react";
import { vehicles as allVehicles, type Vehicle } from "../data/vehicles";
import SEO from "../components/SEO";
import SearchAndFilter from "../components/SearchAndFilter";
import { Link, useNavigate } from "react-router-dom";

const VehiclesView: React.FC = () => {
  const navigate = useNavigate();

  // Filtros (mismo comportamiento que en VehiclesSection)
  const [filterCondition, setFilterCondition] = useState<"all" | "new" | "used">(() => {
    return (localStorage.getItem("filterCondition") as "all" | "new" | "used") || "all";
  });
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("searchTerm") || "";
  });

  useEffect(() => {
    localStorage.setItem("filterCondition", filterCondition);
  }, [filterCondition]);
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  const filteredVehicles = useMemo(() => {
    return allVehicles.filter((v) => {
      const matchesCondition = filterCondition === "all" || v.condition === filterCondition;
      const matchesSearch =
        v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.model.toLowerCase().includes(searchTerm.toLowerCase());
      const notOnix = !v.model.toLowerCase().includes("onix");
      return matchesCondition && matchesSearch && notOnix;
    });
  }, [filterCondition, searchTerm]);

  const clearFilters = () => {
    setFilterCondition("all");
    setSearchTerm("");
    try {
      localStorage.removeItem("filterCondition");
      localStorage.removeItem("searchTerm");
    } catch {}
  };

  return (
    <section className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <SEO
        title="Todos los Vehículos | Ferradas Automotores"
        description="Explorá todo nuestro inventario de vehículos 0km y usados. Filtrá por condición y buscá por marca o modelo."
        canonical="https://ferradasautomotores.com/vehiculos"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-red-600 hover:underline">
            <span>←</span>
            <span>Volver al inicio</span>
          </Link>
        </div>

        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Todos los <span className="text-red-600">Vehículos</span>
          </h1>
        </header>

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
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
              to="/consultar"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition-colors text-sm md:text-base"
            >
              Consultar por un vehículo
            </Link>
          </div>
        </div>

        {/* Grid responsive: más compacto en móvil */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
              <div className="relative w-full h-40 sm:h-52 bg-gray-100">
                <img
                  src={vehicle.images[0]}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow ${vehicle.condition === 'new' ? 'bg-red-600 text-white' : 'bg-gray-800 text-white'}`}>
                  {vehicle.condition === 'new' ? '0 KM' : 'Usado'}
                </span>
              </div>
              <div className="p-3 sm:p-4 flex-1 flex flex-col">
                <div className="mb-1 sm:mb-2">
                  <div className="text-sm sm:text-lg font-bold text-gray-900 truncate">{vehicle.brand} {vehicle.model}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Año: {vehicle.year}</div>
                </div>
                <div className="mt-auto flex gap-2">
                  <button
                    className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold transition-all duration-200 shadow-md bg-green-600 text-white hover:bg-green-700 text-xs sm:text-sm flex-1"
                    onClick={() => navigate(`/consultar?vehiculoId=${vehicle.id}`)}
                  >
                    Consultar
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

export default VehiclesView;


