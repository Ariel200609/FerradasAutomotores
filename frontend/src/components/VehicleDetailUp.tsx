// VehicleDetailUp.tsx
// Vista de detalle para Volkswagen UP (2017)
// Muestra un slider de imágenes, especificaciones técnicas y botón para volver a la página principal.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const upImages = [
  "/FerradasAutomotores/up/up(1).jpg",
  "/FerradasAutomotores/up/up(2).jpg",
  "/FerradasAutomotores/up/up(3).jpg",
  "/FerradasAutomotores/up/up(4).jpg",
  "/FerradasAutomotores/up/up(5).jpg",
  "/FerradasAutomotores/up/up(6).jpg",
  "/FerradasAutomotores/up/up(7).jpg",
  "/FerradasAutomotores/up/up(8).jpg",
  "/FerradasAutomotores/up/up(9).jpg",
  "/FerradasAutomotores/up/up(10).jpg",
  "/FerradasAutomotores/up/up(11).jpg",
  "/FerradasAutomotores/up/up(12).jpg",
  "/FerradasAutomotores/up/up(13).jpg",
  "/FerradasAutomotores/up/up(14).jpg"
];

const upSpecs = [
  { label: "Año", value: "2017" },
  { label: "Motor", value: "1.0 Nafta" },
  { label: "Transmisión", value: "Manual" },
  { label: "Color", value: "Rojo" },
  { label: "Puertas", value: "5" },
  { label: "Tracción", value: "4x2" },
  { label: "Kilometraje", value: "100 km" },
];

const VehicleDetailUp: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const prev = () => setCurrent((c) => (c === 0 ? upImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === upImages.length - 1 ? 0 : c + 1));
  return (
    <section className="relative min-h-screen w-full bg-white flex flex-col justify-center items-center overflow-x-hidden">
      {/* Imagen de fondo en desktop */}
      <div className="hidden lg:block fixed inset-0 z-0">
        <img
          src={upImages[current]}
          alt="Volkswagen UP"
          className="w-full h-full object-cover object-center opacity-40 blur-sm"
        />
      </div>
      {/* Slider principal */}
      <div className="relative w-full max-w-5xl h-[420px] md:h-[520px] flex items-center justify-center mx-auto mt-20 bg-gray-100 rounded-2xl shadow-lg z-10 lg:bg-white/80 lg:backdrop-blur-md lg:shadow-2xl lg:mt-32">
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Anterior">{'<'}</button>
        <img src={upImages[current]} alt="Volkswagen UP" className="object-contain h-full w-full rounded-2xl" loading="lazy" />
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Siguiente">{'>'}</button>
        {/* Título superpuesto */}
        <div className="absolute left-8 bottom-8 z-30 bg-white/80 px-4 py-2 rounded-xl shadow">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 drop-shadow-none">Volkswagen <span className="text-red-600">UP</span></h1>
        </div>
      </div>
      {/* Especificaciones técnicas */}
      <div className="w-full max-w-5xl bg-white rounded-2xl mt-8 p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-lg border border-gray-100 z-10 lg:bg-white/80 lg:backdrop-blur-md lg:shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {upSpecs.map((spec) => (
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

export default VehicleDetailUp; 