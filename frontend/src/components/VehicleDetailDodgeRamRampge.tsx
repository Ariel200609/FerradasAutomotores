// VehicleDetailEcosport.tsx
// Vista de detalle para Ford Ecosport XLS (2010)
// Muestra un slider de imágenes, especificaciones técnicas y botón para volver a la página principal.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ecosportImages = [
    "/DodgeRamRampage/r(1).jpg",
    "/DodgeRamRampage/r(2).jpg",
    "/DodgeRamRampage/r(3).jpg",
    "/DodgeRamRampage/r(4).jpg",
    "/DodgeRamRampage/r(5).jpg",
    "/DodgeRamRampage/r(6).jpg",
    "/DodgeRamRampage/r(7).jpg",
    "/DodgeRamRampage/r(8).jpg",
    "/DodgeRamRampage/r(9).jpg",
    "/DodgeRamRampage/r(10).jpg",
];

const ecosportSpecs = [
  { label: "Año", value: "2025" },
  { label: "Motor", value: "Nafta" },
  { label: "Transmisión", value: "Automática" },
  { label: "Color", value: "Gris" },
  { label: "Puertas", value: "4" },
  { label: "Tracción", value: "Integral" },
  { label: "Kilometraje", value: "0 km" },
];

const VehicleDetailDodgeRamRampage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const prev = () => setCurrent((c) => (c === 0 ? ecosportImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === ecosportImages.length - 1 ? 0 : c + 1));
  return (
    <section className="relative min-h-screen w-full bg-white flex flex-col justify-center items-center overflow-x-hidden">
      {/* Imagen de fondo en desktop */}
      <div className="hidden lg:block fixed inset-0 z-0">
        <img
          src={ecosportImages[current]}
          alt="Ford Ecosport"
          className="w-full h-full object-cover object-center opacity-40 blur-sm"
        />
      </div>
      {/* Slider principal */}
      <div className="relative w-full max-w-5xl h-[420px] md:h-[520px] flex items-center justify-center mx-auto mt-20 bg-gray-100 rounded-2xl shadow-lg z-10 lg:bg-white/80 lg:backdrop-blur-md lg:shadow-2xl lg:mt-32">
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Anterior">{'<'}</button>
        <img src={ecosportImages[current]} alt="Ford Ecosport" className="object-contain h-full w-full rounded-2xl" loading="lazy" />
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Siguiente">{'>'}</button>
        {/* Título superpuesto */}
        <div className="absolute left-8 bottom-8 z-30 bg-white/80 px-4 py-2 rounded-xl shadow">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 drop-shadow-none">Dodge <span className="text-red-600">Ram Rampage</span></h1>
        </div>
      </div>
      {/* Especificaciones técnicas */}
      <div className="w-full max-w-5xl bg-white rounded-2xl mt-8 p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-lg border border-gray-100 z-10 lg:bg-white/80 lg:backdrop-blur-md lg:shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {ecosportSpecs.map((spec) => (
            <div key={spec.label} className="flex flex-col items-center">
              <span className="text-gray-500 text-sm">{spec.label}</span>
              <span className="text-lg font-bold text-gray-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="mt-8 px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold text-lg shadow transition-all z-10" onClick={() => navigate("/")}>← Volver a la página principal</button>
    </section>
  );
};

export default VehicleDetailDodgeRamRampage; 