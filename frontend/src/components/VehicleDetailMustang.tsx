// VehicleDetailMustang.tsx
// Vista de detalle para Ford Mustang GT (2023)
// Muestra un slider de imágenes, especificaciones técnicas y botón para volver a la página principal.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const mustangImages = [
  "/FerradasAutomotores/mustang/IMG-20250719-WA0073.jpg",
  "/FerradasAutomotores/mustang/IMG-20250719-WA0072.jpg",
  "/FerradasAutomotores/mustang/IMG-20250719-WA0071.jpg",
  "/FerradasAutomotores/mustang/IMG-20250719-WA0070.jpg",
  "/FerradasAutomotores/mustang/IMG-20250719-WA0069.jpg",
  "/FerradasAutomotores/mustang/IMG-20250719-WA0068.jpg",
  "/FerradasAutomotores/mustang/IMG-20250719-WA0067.jpg",
  "/FerradasAutomotores/mustang/IMG-20250719-WA0066.jpg",
  "/FerradasAutomotores/mustang/IMG-20250719-WA0065.jpg",
  "/FerradasAutomotores/mustang/IMG-20250719-WA0064.jpg",
  "/FerradasAutomotores/mustang/IMG-20250719-WA0063.jpg",
  "/FerradasAutomotores/mustang/IMG-20250719-WA0062.jpg",
  "/FerradasAutomotores/mustang/IMG-20250719-WA0061.jpg",
  "/FerradasAutomotores/mustang/IMG-20250719-WA0060.jpg",
  "/FerradasAutomotores/mustang/IMG-20250718-WA0096.jpg"
];

const mustangSpecs = [
  { label: "Año", value: "2023" },
  { label: "Motor", value: "5.0 Nafta" },
  { label: "Transmisión", value: "Automática" },
  { label: "Potencia", value: "500 CV" },
  { label: "Color", value: "Negro perlado" },
  { label: "Puertas", value: "3" },
  { label: "Tracción", value: "Trasera" },
  { label: "Kilometraje", value: "15.000 km" },
];

const VehicleDetailMustang: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const prev = () => setCurrent((c) => (c === 0 ? mustangImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === mustangImages.length - 1 ? 0 : c + 1));
  return (
    <section className="relative min-h-screen w-full bg-white flex flex-col justify-center items-center overflow-x-hidden">
      <div className="relative w-full max-w-5xl h-[420px] md:h-[520px] flex items-center justify-center mx-auto mt-20 bg-gray-100 rounded-2xl shadow-lg">
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Anterior">{'<'}</button>
        <img src={mustangImages[current]} alt="Ford Mustang GT" className="object-contain h-full w-full rounded-2xl" loading="lazy" />
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Siguiente">{'>'}</button>
        {/* Título superpuesto */}
        <div className="absolute left-8 bottom-8 z-30 bg-white/80 px-4 py-2 rounded-xl shadow">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 drop-shadow-none">Ford <span className="text-red-600">Mustang GT</span></h1>
        </div>
      </div>
      {/* Especificaciones técnicas */}
      <div className="w-full max-w-5xl bg-white rounded-2xl mt-8 p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-lg border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {mustangSpecs.map((spec) => (
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

export default VehicleDetailMustang; 