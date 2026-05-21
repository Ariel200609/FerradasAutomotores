import React, { useEffect, useMemo, useState } from "react";
import { useVehicles } from "../hooks/useVehicles";
import SEO from "../components/SEO";
import SearchAndFilter from "../components/SearchAndFilter";
import { Link, useNavigate } from "react-router-dom";
import { urlFor } from "../lib/sanity";
import { getVehicleRoute } from "../utils/routeHelper";
import { ArrowLeft, Camera } from "lucide-react";

/* ─── Skeleton loader for the grid ─── */
const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
    <div className="skeleton w-full h-44 sm:h-52 rounded-none" />
    <div className="p-4 space-y-3">
      <div className="skeleton h-5 w-3/4" />
      <div className="skeleton h-4 w-1/3" />
      <div className="flex gap-2 mt-4">
        <div className="skeleton h-10 flex-1" />
        <div className="skeleton h-10 flex-1" />
      </div>
    </div>
  </div>
);

const VehiclesView: React.FC = () => {
  const navigate = useNavigate();
  const { vehicles: allVehicles, loading } = useVehicles();

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
    if (!allVehicles) return [];
    return allVehicles.filter((v) => {
      const matchesCondition = filterCondition === "all" || v.condition === filterCondition;
      const matchesSearch =
        v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.model.toLowerCase().includes(searchTerm.toLowerCase());
      const notOnix = !v.model.toLowerCase().includes("onix");
      return matchesCondition && matchesSearch && notOnix;
    });
  }, [allVehicles, filterCondition, searchTerm]);

  const clearFilters = () => {
    setFilterCondition("all");
    setSearchTerm("");
    try {
      localStorage.removeItem("filterCondition");
      localStorage.removeItem("searchTerm");
    } catch {}
  };

  /* ─── Loading state with skeletons ─── */
  if (loading) {
    return (
      <div className="bg-vehicles-page pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-vehicles-page pt-24 pb-16">
      <SEO
        title="Todos los Vehículos | Ferradas Automotores"
        description="Explorá todo nuestro inventario de vehículos 0km y usados. Filtrá por condición y buscá por marca o modelo."
        canonical="https://ferradasautomotores.com/vehiculos"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-600 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Volver al inicio</span>
          </Link>
        </div>

        {/* Page header */}
        <header className="text-center mb-8 animate-fade-in-up">
          <p className="text-red-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Catálogo completo
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Todos los{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Vehículos
            </span>
          </h1>
        </header>

        {/* Search and Filter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
        />

        {/* Results bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
          <p className="text-sm text-gray-500">
            Mostrando{" "}
            <span className="font-bold text-gray-900">{filteredVehicles.length}</span>{" "}
            vehículos
          </p>
          <div className="flex flex-wrap gap-2 sm:ml-auto">
            {(searchTerm || filterCondition !== "all") && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-white hover:border-gray-300 text-sm transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Limpiar
              </button>
            )}
            <Link
              to="/consultar"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-600 text-white shadow-sm hover:bg-green-700 transition-all duration-200 text-sm font-medium"
            >
              Consultar por un vehículo
            </Link>
          </div>
        </div>

        {/* Vehicle grid with staggered animation */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredVehicles.map((vehicle, index) => (
            <div
              key={vehicle._id}
              className={`card-premium bg-white rounded-2xl overflow-hidden flex flex-col animate-fade-in-up stagger-${Math.min(index + 1, 12)}`}
              style={{ border: '1px solid rgba(0,0,0,0.04)' }}
            >
              {/* Image */}
              <Link to={getVehicleRoute(vehicle)} className="block relative w-full h-44 sm:h-52 overflow-hidden bg-gray-100">
                <img
                  src={vehicle.images?.[0] ? urlFor(vehicle.images[0]).width(600).url() : '/placeholder-car.jpg'}
                  alt={`Vehículo ${vehicle.condition === 'new' ? '0km' : 'usado'} ${vehicle.brand} ${vehicle.model} ${vehicle.year} en venta`}
                  className="card-image w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 overlay-gradient-subtle pointer-events-none" />

                {/* Condition badge */}
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold ${
                    vehicle.condition === 'new'
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white badge-glow'
                      : 'glass-dark text-white'
                  }`}
                >
                  {vehicle.condition === 'new' ? '0 KM' : 'Usado'}
                </span>

                {/* Photo count */}
                {vehicle.images && vehicle.images.length > 1 && (
                  <span className="absolute bottom-2 right-2 glass-dark text-white text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    {vehicle.images.length}
                  </span>
                )}
              </Link>

              {/* Info */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <div className="text-sm sm:text-base font-extrabold text-gray-900 truncate leading-tight">
                    {vehicle.brand} {vehicle.model}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-0.5">
                    Año {vehicle.year}
                  </div>
                </div>

                {/* Price */}
                {(vehicle as any).priceUsd && (
                  <div className="text-base sm:text-lg font-extrabold text-red-600 mb-2">
                    USD ${(vehicle as any).priceUsd.toLocaleString()}
                  </div>
                )}

                {/* Buttons */}
                <div className="mt-auto flex gap-2">
                  <Link
                    to={getVehicleRoute(vehicle)}
                    className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-semibold transition-all duration-300 bg-gray-900 text-white hover:bg-red-600 text-[11px] sm:text-sm flex-1 text-center"
                  >
                    Ver detalle
                  </Link>
                  <button
                    className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-semibold transition-all duration-200 bg-green-600 text-white hover:bg-green-700 text-[11px] sm:text-sm flex-1"
                    onClick={() => navigate(`/consultar?vehiculoId=${vehicle._id}`)}
                  >
                    Consultar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredVehicles.length === 0 && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No encontramos vehículos
            </h3>
            <p className="text-gray-500 mb-6">
              Probá con otro término de búsqueda o limpiá los filtros.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-200 shadow-md"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehiclesView;
