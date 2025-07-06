import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const onixImages = [
  "/FerradasAutomotores/Onix-RS.jpg"
  // Agrega más imágenes si tienes
];

const onixSpecs = [
  { label: "Año", value: "2024" },
  { label: "Motor", value: "Flex" },
  { label: "Transmisión", value: "Manual" },
  { label: "Potencia", value: "116 CV" },
  { label: "Color", value: "A elección" },
  { label: "Puertas", value: "4" },
  { label: "Tracción", value: "Delantera" },
  { label: "Kilometraje", value: "0 km" },
];

const VehicleDetailOnix: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const prev = () => setCurrent((c) => (c === 0 ? onixImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === onixImages.length - 1 ? 0 : c + 1));
  return (
    <section className="relative min-h-screen w-full bg-white flex flex-col justify-center items-center overflow-x-hidden">
      <div className="relative w-full max-w-5xl h-[420px] md:h-[520px] flex items-center justify-center mx-auto mt-20 bg-gray-100 rounded-2xl shadow-lg">
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Anterior">{'<'}</button>
        <img src={onixImages[current]} alt="Chevrolet Onix" className="object-contain h-full w-full rounded-2xl" />
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition" aria-label="Siguiente">{'>'}</button>
        <div className="absolute left-8 bottom-8 z-30 bg-white/80 px-8 py-4 rounded-xl shadow">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-none">Chevrolet <span className="text-red-600">Onix</span></h1>
        </div>
      </div>
      <div className="w-full max-w-5xl bg-white rounded-2xl mt-8 p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-lg border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {onixSpecs.map((spec) => (
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

export default VehicleDetailOnix; 