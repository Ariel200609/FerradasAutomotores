import React, { useRef, useState } from "react";

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
          <button className="mt-3 px-4 py-1 border border-gray-400 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition-all duration-200 shadow-md">Ver modelo</button>
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
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-sm rounded-full p-1 hover:bg-gray-100 focus:outline-none text-gray-700 text-lg"
        aria-label="Anterior"
        style={{ width: 32, height: 32 }}
      >
        &#8592;
      </button>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-2 py-4 px-8 scrollbar-none"
        style={{ scrollBehavior: 'smooth' }}
      >
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-sm rounded-full p-1 hover:bg-gray-100 focus:outline-none text-gray-700 text-lg"
        aria-label="Siguiente"
        style={{ width: 32, height: 32 }}
      >
        &#8594;
      </button>
    </div>
  );
};

export default VehicleGrid; 