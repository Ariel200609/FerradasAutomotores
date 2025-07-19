// VehicleGrid.tsx
// Componente que muestra un carrusel horizontal de tarjetas de vehículos.
// Permite navegar entre vehículos con botones de scroll y ver detalles de cada modelo.
// Utiliza VehicleCard para cada vehículo y hooks para manejar el scroll horizontal.

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

// Tarjeta individual de vehículo
const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  // Flags para identificar el modelo y navegar a la ruta correspondiente
  const isTcross = vehicle.model.toLowerCase().includes("t-cross");
  const isMaverik = vehicle.model.toLowerCase().includes("maverik");
  const isAmarok = vehicle.model.toLowerCase().includes("amarok");
  const isFocus = vehicle.model.toLowerCase().includes("focus");
  const isOnix = vehicle.model.toLowerCase().includes("onix");
  const isGolf = vehicle.model.toLowerCase().includes("golf");
  const isFastback = vehicle.model.toLowerCase().includes("fastback");
  const isHilux = vehicle.model.toLowerCase().includes("hilux");
  return (
    <div
      className={`min-w-[220px] max-w-[220px] bg-transparent mx-2 flex-shrink-0 transition-all duration-300 relative group ${hovered ? 'z-20' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ minHeight: 220 }}
    >
      <div className="relative w-full h-36 overflow-visible flex items-end justify-center">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className={`object-contain w-full h-full transition-all duration-300 ${hovered ? 'scale-110 drop-shadow-2xl' : ''}`}
          loading="lazy"
        />
      </div>
      {hovered && (
        <div className="flex justify-center mt-2">
          <button
            className="px-6 py-2 bg-white border border-gray-300 rounded-md text-sm font-semibold text-gray-800 shadow-lg transition-all duration-200"
            onClick={() => {
              if (isTcross) navigate('/vehiculo/t-cross');
              else if (isMaverik) navigate('/vehiculo/maverik');
              else if (isAmarok) navigate('/vehiculo/amarok');
              else if (isFocus) navigate('/vehiculo/focus');
              else if (isOnix) navigate('/vehiculo/onix');
              else if (isGolf) navigate('/vehiculo/golf');
              else if (isFastback) navigate('/vehiculo/fastback');
              else if (isHilux) navigate('/vehiculo/hilux');
              else alert('Próximamente detalle para este modelo');
            }}
          >
            Ver modelo
          </button>
        </div>
      )}
      <div className="text-center mt-2">
        <div className={`text-base font-semibold transition-all duration-300 ${hovered ? 'text-red-600' : 'text-gray-800'} truncate`}>{vehicle.brand} {vehicle.model}</div>
        <div className="text-xs text-gray-500">Año: {vehicle.year}</div>
      </div>
    </div>
  );
};

// Grid/carrusel horizontal de vehículos
const VehicleGrid: React.FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Función para hacer scroll horizontal
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex items-center w-full">
      <button
        onClick={() => scroll("left")}
        className="z-20 bg-transparent focus:outline-none text-gray-800 text-3xl font-bold flex items-center justify-center mr-2"
        aria-label="Anterior"
        style={{ width: 26, height: 26 }}
      >
        {'<'}
      </button>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-2 py-4 px-8 scrollbar-none" 
        style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="z-20 bg-transparent focus:outline-none text-gray-800 text-3xl font-bold flex items-center justify-center ml-2"
        aria-label="Siguiente"
        style={{ width: 36, height: 36 }}
      >
        {'>'}
      </button>
    </div>
  );
};

export default VehicleGrid; 