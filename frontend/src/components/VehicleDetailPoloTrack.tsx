// VehicleDetailPoloTrack.tsx
// Vista de detalle para Volkswagen Polo Track (2025)
// Muestra un slider de imágenes, especificaciones técnicas y botón para volver a la página principal.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const poloTrackImages = [
  "/polo track/IMG-20250720-WA0098.jpg",
  "/polo track/IMG-20250720-WA0099.jpg",
  "/polo track/IMG-20250720-WA0100.jpg",
  "/polo track/IMG-20250720-WA0101.jpg",
  "/polo track/IMG-20250720-WA0102.jpg",
  "/polo track/IMG-20250720-WA0103.jpg",
  "/polo track/IMG-20250720-WA0104.jpg",
  "/polo track/IMG-20250720-WA0105.jpg",
  "/polo track/IMG-20250720-WA0106.jpg"
];

const poloTrackSpecs = [
  { label: "Año", value: "2025" },
  { label: "Motor", value: "1.0 Nafta" },
  { label: "Transmisión", value: "Manual" },
  { label: "Color", value: "Plata Pirit" },
  { label: "Puertas", value: "5" },
  { label: "Tracción", value: "Delantera" },
  { label: "Kilometraje", value: "0 km" },
];

const VehicleDetailPoloTrack: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const prev = () => setCurrent((c) => (c === 0 ? poloTrackImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === poloTrackImages.length - 1 ? 0 : c + 1));
  return (
    <section className="relative min-h-screen w-full bg-white flex flex-col justify-center items-center overflow-x-hidden">
      {/* Imagen de fondo en desktop */}
      <div className="hidden lg:block fixed inset-0 z-0">
        <img
          src={poloTrackImages[current]}
          alt="Volkswagen Polo Track"
          className="w-full h-full object-cover object-center opacity-40 blur-sm"
        />
      </div>
      {/* Slider principal */}
      <div className="relative w-full max-w-5xl h-[420px] md:h-[520px] flex items-center justify-center mx-auto mt-20 bg-gray-100 rounded-2xl shadow-lg z-10 lg:bg-white/80 lg:backdrop-blur-md lg:shadow-2xl lg:mt-32">
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Anterior">{'<'}</button>
        <img src={poloTrackImages[current]} alt="Volkswagen Polo Track" className="object-contain h-full w-full rounded-2xl" loading="lazy" />
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Siguiente">{'>'}</button>
        {/* Título superpuesto */}
        <div className="absolute left-8 bottom-8 z-30 bg-white/80 px-4 py-2 rounded-xl shadow">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 drop-shadow-none">Volkswagen <span className="text-red-600">Polo Track</span></h1>
        </div>
      </div>
      {/* Especificaciones técnicas */}
      <div className="w-full max-w-5xl bg-white rounded-2xl mt-8 p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-lg border border-gray-100 z-10 lg:bg-white/80 lg:backdrop-blur-md lg:shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {poloTrackSpecs.map((spec) => (
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

export default VehicleDetailPoloTrack; 