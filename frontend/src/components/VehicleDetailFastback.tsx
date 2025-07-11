// VehicleDetailFastback.tsx
// Vista de detalle para el modelo Fiat Fastback.
// Muestra un slider de imágenes, especificaciones técnicas y botón para volver a la página principal.
// Utiliza hooks para manejar el slider y navegación con React Router.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fastbackImages = [
  "/FerradasAutomotores/Fastback/PortadaFiat.jpg"
  // Agrega más imágenes si tienes
];

const fastbackSpecs = [
  { label: "Año", value: "2023" },
  { label: "Motor", value: "Turbo" },
  { label: "Transmisión", value: "Automática" },
  { label: "Potencia", value: "175 CV" },
  { label: "Color", value: "A elección" },
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
      <div className="relative w-full max-w-5xl h-[420px] md:h-[520px] flex items-center justify-center mx-auto mt-20 bg-gray-100 rounded-2xl shadow-lg">
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Anterior">{'<'}</button>
        <img src={fastbackImages[current]} alt="Fiat Fastback" className="object-contain h-full w-full rounded-2xl" loading="lazy" />
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Siguiente">{'>'}</button>
        {/* Título superpuesto */}
        <div className="absolute left-8 bottom-8 z-30 bg-white/80 px-8 py-4 rounded-xl shadow">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-none">Fiat <span className="text-red-600">Fastback</span></h1>
        </div>
      </div>
      {/* Especificaciones técnicas */}
      <div className="w-full max-w-5xl bg-white rounded-2xl mt-8 p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-lg border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {fastbackSpecs.map((spec) => (
            <div key={spec.label} className="flex flex-col items-center">
              <span className="text-gray-500 text-sm">{spec.label}</span>
              <span className="text-lg font-bold text-gray-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="mt-8 px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold text-lg shadow transition-all" onClick={() => navigate("/")}>← Volver a la página principal</button>
    </section>
  );
};

export default VehicleDetailFastback; 