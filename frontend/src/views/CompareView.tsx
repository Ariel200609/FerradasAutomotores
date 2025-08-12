import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { vehicles, Vehicle } from "../data/vehicles";
import SEO from "../components/SEO";

const formatNumber = (n?: number) =>
  typeof n === "number" ? new Intl.NumberFormat("es-AR").format(n) : "-";

const VehicleCard: React.FC<{ vehicle?: Vehicle; title: string }> = ({ vehicle, title }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 border border-gray-100">
      <h3 className="text-gray-800 font-semibold mb-3">{title}</h3>
      {vehicle ? (
        <div className="space-y-3">
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={vehicle.images?.[0]}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <span className="text-gray-500">Marca</span>
            <span className="font-medium">{vehicle.brand}</span>
            <span className="text-gray-500">Modelo</span>
            <span className="font-medium">{vehicle.model}</span>
            <span className="text-gray-500">Año</span>
            <span className="font-medium">{vehicle.year}</span>
            <span className="text-gray-500">Condición</span>
            <span className="font-medium capitalize">{vehicle.condition}</span>
            <span className="text-gray-500">Combustible</span>
            <span className="font-medium">{vehicle.fuel}</span>
            <span className="text-gray-500">Kilometraje</span>
            <span className="font-medium">{formatNumber(vehicle.mileage)} km</span>
            <span className="text-gray-500">Precio</span>
            <span className="font-medium">{vehicle.priceUsd ? `US$ ${formatNumber(vehicle.priceUsd)}` : '-'}</span>
            <span className="text-gray-500">Transmisión</span>
            <span className="font-medium">{vehicle.transmission || '-'}</span>
            <span className="text-gray-500">Tracción</span>
            <span className="font-medium">{vehicle.drivetrain || '-'}</span>
            <span className="text-gray-500">Carrocería</span>
            <span className="font-medium">{vehicle.bodyType || '-'}</span>
            <span className="text-gray-500">Motor</span>
            <span className="font-medium">{vehicle.engine || '-'}</span>
            <span className="text-gray-500">Potencia</span>
            <span className="font-medium">{vehicle.powerHp ? `${formatNumber(vehicle.powerHp)} hp` : '-'}</span>
            <span className="text-gray-500">Torque</span>
            <span className="font-medium">{vehicle.torqueNm ? `${formatNumber(vehicle.torqueNm)} Nm` : '-'}</span>
            <span className="text-gray-500">Puertas</span>
            <span className="font-medium">{vehicle.doors ?? '-'}</span>
            <span className="text-gray-500">Color</span>
            <span className="font-medium">{vehicle.color || '-'}</span>
          </div>
        </div>
      ) : (
        <div className="text-gray-400 text-sm">Seleccioná un vehículo</div>
      )}
    </div>
  );
};

const CompareView: React.FC = () => {
  const options = useMemo(
    () => vehicles.map((v) => ({ value: v.id, label: `${v.brand} ${v.model} (${v.year})` })),
    []
  );
  const [leftId, setLeftId] = useState<number | "">("");
  const [rightId, setRightId] = useState<number | "">("");

  const left = useMemo(() => vehicles.find((v) => v.id === leftId), [leftId]);
  const right = useMemo(() => vehicles.find((v) => v.id === rightId), [rightId]);

  return (
    <section className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <SEO
        title="Comparador de Vehículos | Ferradas Automotores"
        description="Compará lado a lado las especificaciones de dos vehículos: marca, modelo, año, combustible y más."
        canonical="https://ferradasautomotores.com/comparar"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-red-600 hover:underline">
            <span>←</span>
            <span>Volver al inicio</span>
          </Link>
        </div>
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Compará <span className="text-red-600">Vehículos</span>
          </h1>
          <p className="text-gray-500 mt-2">Elegí dos modelos y mirá sus diferencias.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-4 md:p-6 border border-gray-100">
            <label className="block text-sm text-gray-600 mb-2">Vehículo 1</label>
            <select
              className="w-full border rounded-lg px-3 py-2 text-sm"
              value={leftId}
              onChange={(e) => setLeftId(e.target.value ? Number(e.target.value) : "")}
            >
              <option value="">Seleccionar…</option>
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white rounded-xl shadow p-4 md:p-6 border border-gray-100">
            <label className="block text-sm text-gray-600 mb-2">Vehículo 2</label>
            <select
              className="w-full border rounded-lg px-3 py-2 text-sm"
              value={rightId}
              onChange={(e) => setRightId(e.target.value ? Number(e.target.value) : "")}
            >
              <option value="">Seleccionar…</option>
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <VehicleCard vehicle={left} title="Vehículo 1" />
          <VehicleCard vehicle={right} title="Vehículo 2" />
        </div>

        {left && right && (
          <div className="mt-8 bg-white rounded-xl shadow p-4 md:p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Diferencias clave</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <li>
                <span className="text-gray-500">Año</span>
                <div className="mt-1 flex gap-3">
                  <span className="px-2 py-1 rounded bg-gray-100">{left.year}</span>
                  <span className="px-2 py-1 rounded bg-gray-100">{right.year}</span>
                </div>
              </li>
              <li>
                <span className="text-gray-500">Kilometraje</span>
                <div className="mt-1 flex gap-3">
                  <span className="px-2 py-1 rounded bg-gray-100">{formatNumber(left.mileage)} km</span>
                  <span className="px-2 py-1 rounded bg-gray-100">{formatNumber(right.mileage)} km</span>
                </div>
              </li>
              <li>
                <span className="text-gray-500">Combustible</span>
                <div className="mt-1 flex gap-3">
                  <span className="px-2 py-1 rounded bg-gray-100">{left.fuel}</span>
                  <span className="px-2 py-1 rounded bg-gray-100">{right.fuel}</span>
                </div>
              </li>
              <li>
                <span className="text-gray-500">Condición</span>
                <div className="mt-1 flex gap-3">
                  <span className="px-2 py-1 rounded bg-gray-100 capitalize">{left.condition}</span>
                  <span className="px-2 py-1 rounded bg-gray-100 capitalize">{right.condition}</span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompareView;


