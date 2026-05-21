// VehicleDetailFastback.tsx
// Vista de detalle para el modelo Fiat Fastback.
// Muestra un slider de imágenes, especificaciones técnicas y botón para volver a la página principal.
// Utiliza hooks para manejar el slider y navegación con React Router.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fastbackImages = [
  "/FiatFasback/f(1).jpg",
  "/FiatFasback/f(2).jpg",
  "/FiatFasback/f(3).jpg",
  "/FiatFasback/f(4).jpg",
  "/FiatFasback/f(5).jpg",
  "/FiatFasback/f(6).jpg",
  "/FiatFasback/f(7).jpg",
  "/FiatFasback/f(8).jpg",
  "/FiatFasback/f(9).jpg",
  // Agrega más imágenes si tienes
];

const fastbackSpecs = [
  { label: "Año", value: "2025" },
  { label: "Motor", value: "1.3 Turbo" },
  { label: "Transmisión", value: "Automática" },
  { label: "Color", value: "Gris Oscuro" },
  { label: "Puertas", value: "5" },
  { label: "Tracción", value: "Delantera" },
  { label: "Kilometraje", value: "0 km" },
];

const VehicleDetailFastback: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  // Funciones para navegar el slider de imágenes
  const prev = () => setCurrent((c) => (c === 0 ? fastbackImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === fastbackImages.length - 1 ? 0 : c + 1));
  return (
    <section className="relative min-h-screen w-full bg-white flex flex-col justify-center items-center overflow-x-hidden">
      {/* Imagen de fondo en desktop */}
      <div className="hidden lg:block fixed inset-0 z-0">
        <img
          src={fastbackImages[current]}
          alt="Fiat Fastback"
          className="w-full h-full object-cover object-center opacity-40 blur-sm"
        />
      </div>
      {/* Slider principal */}
      <div className="relative w-full max-w-5xl h-[420px] md:h-[520px] flex items-center justify-center mx-auto mt-20 bg-gray-100 rounded-2xl shadow-lg z-10 lg:bg-white/80 lg:backdrop-blur-md lg:shadow-2xl lg:mt-32">
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Anterior">{'<'}</button>
        <img src={fastbackImages[current]} alt="Fiat Fastback" className="object-contain h-full w-full rounded-2xl" loading="lazy" />
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Siguiente">{'>'}</button>
        {/* Título superpuesto */}
        <div className="absolute left-8 bottom-8 z-30 bg-white/80 px-4 py-2 rounded-xl shadow">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 drop-shadow-none">Fiat <span className="text-red-600">Fastback</span></h1>
        </div>
      </div>
      {/* Especificaciones técnicas */}
      <div className="w-full max-w-5xl bg-white rounded-2xl mt-8 p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-lg border border-gray-100 z-10 lg:bg-white/80 lg:backdrop-blur-md lg:shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {fastbackSpecs.map((spec) => (
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

export default VehicleDetailFastback; 