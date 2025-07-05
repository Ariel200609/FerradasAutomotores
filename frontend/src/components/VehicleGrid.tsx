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

const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const isTcross = vehicle.model.toLowerCase().includes("t-cross");
  return (
    <div
      className={`min-w-[220px] max-w-[220px] bg-white border border-gray-200 rounded-xl overflow-visible shadow-sm mx-2 flex-shrink-0 transition-all duration-300 relative group ${hovered ? 'z-20' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ minHeight: 260 }}
    >
      <div className={`relative w-full h-36 flex items-center justify-center bg-gray-50 transition-all duration-300 ${hovered ? 'scale-110 shadow-2xl' : ''}`}>
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="object-contain h-32 w-full transition-all duration-300"
        />
      </div>
      <div className="p-3 text-center">
        <div className={`text-base font-semibold transition-all duration-300 ${hovered ? 'text-red-600' : 'text-gray-800'} truncate`}>{vehicle.brand} {vehicle.model}</div>
        <div className="text-xs text-gray-500">Año: {vehicle.year}</div>
        {hovered && (
          <button
            className="mt-3 px-4 py-1 border border-gray-400 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition-all duration-200 shadow-md"
            onClick={() => isTcross ? navigate('/vehiculo/t-cross') : alert('Próximamente detalle para este modelo')}
          >
            Ver modelo
          </button>
        )}
      </div>
    </div>
  );
};

const VehicleGrid: React.FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
        className="flex overflow-x-auto gap-2 py-4 px-8 scrollbar-none" style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
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