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
  const isGolf = vehicle.model.toLowerCase().includes("golf");
  const isFastback = vehicle.model.toLowerCase().includes("fastback");
  const isHilux = vehicle.model.toLowerCase().includes("hilux");
  const isAmarokHighline = vehicle.model.toLowerCase().includes("amarok highline");
  const isHiluxSRV = vehicle.model.toLowerCase().includes("hilux srv");
  const isRaptor = vehicle.model.toLowerCase().includes("raptor");
  const isEcosport = vehicle.model.toLowerCase().includes("ecosport");
  const isUp = vehicle.model.toLowerCase().includes("up");
  const isAmarokV6 = vehicle.model.toLowerCase().includes("amarok v6");
  const isFrontier = vehicle.model.toLowerCase().includes("frontier");
  const isHiluxSRXGris = vehicle.model.toLowerCase().includes("hilux srx gris");
  const isOroch = vehicle.model.toLowerCase().includes("oroch");
  const is307 = vehicle.model.toLowerCase().includes("307");
  const isMustang = vehicle.model.toLowerCase().includes("mustang");
  const isAmarokHighlineG2 = vehicle.model.toLowerCase().includes("amarok highline g2");
  const isAmarokBlackStyleG2 = vehicle.model.toLowerCase().includes("black style g2");
  const isAmarokComfortlineG2 = vehicle.model.toLowerCase().includes("comfortline g2");
  const isTCrossBitono = vehicle.model.toLowerCase().includes("t-cross bitono");
  const isTaos = vehicle.model.toLowerCase().includes("taos");
  const isPoloTrack = vehicle.model.toLowerCase().includes("polo track");
  const isHiLux4x4AT = vehicle.model.toLowerCase().includes("hilux srx 4x4 at");
  const isHiluxRed = vehicle.model.toLowerCase().includes("hilux srv roja");
  const isHiluxSr4x4MT = vehicle.model.toLowerCase().includes("hilux sr 4x4 mt");
  const isHiluxDx = vehicle.model.toLowerCase().includes("hilux dx");
  const isHiluxDXcs = vehicle.model.toLowerCase().includes("hilux dx cs");
  const isHiluxsrx = vehicle.model.toLowerCase().includes("hilux srx 0km");
  const isBronco = vehicle.model.toLowerCase().includes("bronco");
  const isRanger = vehicle.model.toLowerCase().includes("ranger xs");
  const isRangerBlackEdition = vehicle.model.toLowerCase().includes("ranger black edition");
  const isRangerLimitedV6 = vehicle.model.toLowerCase().includes("ranger limited v6");
  const isToro270vulcano = vehicle.model.toLowerCase().includes("toro 270 vulcano");
  const isRamRampage = vehicle.model.toLowerCase().includes("ram rampage");

  return (
    <div
      className={`min-w-[90vw] max-w-[90vw] mx-auto bg-white flex-shrink-0 transition-all duration-300 relative group shadow-md border border-gray-100 rounded-2xl
      sm:min-w-[320px] sm:max-w-[320px] sm:mx-4 ${hovered ? 'shadow-2xl scale-105 z-20' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ minHeight: 340 }}
    >
      <div className="relative w-full h-48 overflow-hidden flex items-center justify-center rounded-t-2xl">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className={`object-cover w-full h-full transition-all duration-300 ${hovered ? 'scale-110' : ''}`}
          loading="lazy"
        />
        {/* Badge de condición */}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow ${vehicle.condition === 'new' ? 'bg-red-600 text-white' : 'bg-gray-800 text-white'}`}>{vehicle.condition === 'new' ? '0 KM' : 'Usado'}</span>
      </div>
      <div className="flex flex-col items-center justify-between p-5">
        <div className="text-center mb-2">
          <div className="text-xl font-bold text-gray-900 mb-1 truncate">{vehicle.brand} {vehicle.model}</div>
          <div className="text-sm text-gray-500">Año: {vehicle.year}</div>
        </div>
        <button
          className={`mt-2 px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md border-2 border-red-600 bg-white text-red-600 hover:bg-red-600 hover:text-white`}
          onClick={() => {
              if (isHiluxsrx) navigate('/vehiculo/hilux-srx-0km');
              else if (isRamRampage) navigate('/vehiculo/ram-rampage');
              else if (isRangerLimitedV6) navigate('/vehiculo/ranger-limited-v6');
              else if (isToro270vulcano) navigate('/vehiculo/toro-270-vulcano');
              else if (isRangerLimitedV6) navigate('/vehiculo/ranger-limited-v6');
              else if (isRangerBlackEdition) navigate('/vehiculo/ranger-black-edition');
              else if (isRanger) navigate('/vehiculo/ranger-xs');
              else if (isBronco) navigate('/vehiculo/bronco');
              else if (isHiluxDXcs) navigate('/vehiculo/hilux-dx-cs');
              else if (isHiluxDx) navigate('/vehiculo/hilux-dx');
              else if (isHiLux4x4AT) navigate('/vehiculo/hilux-4x4-at') ;
              else if (isHiluxSr4x4MT) navigate('/vehiculo/hilux-sr-4x4-mt');
              else if (isHiluxRed) navigate('/vehiculo/hilux-srv-roja');
              else if (isHiluxSRXGris) navigate('/vehiculo/hilux-srx-gris');
              else if (isHiluxSRV) navigate('/vehiculo/hiluxsrv');
              else if (isHilux) navigate('/vehiculo/hilux');
              else if (isTCrossBitono) navigate('/vehiculo/t-cross-bitono');
              else if (isTcross) navigate('/vehiculo/t-cross');
              else if (isMaverik) navigate('/vehiculo/maverik');
              else if (isAmarokV6) navigate('/vehiculo/amarokv6');
              else if (isAmarokComfortlineG2) navigate('/vehiculo/amarok-comfortline-g2');
              else if (isAmarokBlackStyleG2) navigate('/vehiculo/amarok-black-style-g2');
              else if (isAmarokHighlineG2) navigate('/vehiculo/amarok-highline-g2');
              else if (isAmarokHighline) navigate('/vehiculo/amarok-highline');
              else if (isAmarok) navigate('/vehiculo/amarok');
              else if (isFocus) navigate('/vehiculo/focus');
              else if (isGolf) navigate('/vehiculo/golf');
              else if (isFastback) navigate('/vehiculo/fastback');
              else if (isRaptor) navigate('/vehiculo/raptor');
              else if (isEcosport) navigate('/vehiculo/ecosport');
              else if (isUp) navigate('/vehiculo/up');
              else if (isFrontier) navigate('/vehiculo/frontier');
              else if (isOroch) navigate('/vehiculo/oroch');
              else if (is307) navigate('/vehiculo/307');
              else if (isMustang) navigate('/vehiculo/mustang');
              else if (isTaos) navigate('/vehiculo/taos');
              else if (isPoloTrack) navigate('/vehiculo/polo-track');
              else alert('Próximamente detalle para este modelo');
          }}
        >
          Ver modelo
        </button>
        <button
          className="mt-3 px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md bg-green-600 text-white hover:bg-green-700"
          onClick={() => navigate(`/consultar?vehiculoId=${vehicle.id}`)}
        >
          Consultar
        </button>
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
        className="flex overflow-x-auto gap-8 py-8 px-8 scrollbar-none" 
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