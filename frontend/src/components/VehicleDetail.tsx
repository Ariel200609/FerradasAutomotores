import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const tCrossImages = [
  "/t-cross/dalanteT-cross.jpg",
  "/t-cross/costadoT-cross.jpg",
  "/t-cross/atrasT-cross.jpg",
  "/t-cross/interiorT-cross.jpg",
  "/t-cross/costadotT-cross.jpg",
  "/t-cross/interior2T-cross.jpg"
];

const tCrossSpecs = [
  { label: "Año", value: "2020" },
  { label: "Motor", value: "Naftero 1.6" },
  { label: "Transmisión", value: "Automática" },
  { label: "Potencia", value: "110 CV" },
  { label: "Color", value: "Gris Plata" },
  { label: "Puertas", value: "5" },
  { label: "Tracción", value: "Delantera" },
  { label: "Kilometraje", value: "70,000 km" },
];

const VehicleDetail: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const prev = () => setCurrent((c) => (c === 0 ? tCrossImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === tCrossImages.length - 1 ? 0 : c + 1));

  return (
    <section className="relative min-h-screen w-full bg-white flex flex-col justify-center items-center overflow-x-hidden">
      {/* Imagen principal tipo slider */}
      <div className="relative w-full max-w-5xl h-[420px] md:h-[520px] flex items-center justify-center mx-auto mt-20 bg-gray-100 rounded-2xl shadow-lg">
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition"
          aria-label="Anterior"
        >
          {'<'}
        </button>
        <img
          src={tCrossImages[current]}
          alt="T-cross"
          className="object-contain h-full w-full rounded-2xl"
        />
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-red-600 hover:text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow transition"
          aria-label="Siguiente"
        >
          {'>'}
        </button>
        {/* Título superpuesto */}
        <div className="absolute left-8 bottom-8 z-30 bg-white/80 px-8 py-4 rounded-xl shadow">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-none">
            Volkswagen <span className="text-red-600">T-cross Highline</span>
          </h1>
        </div>
      </div>
      {/* Especificaciones */}
      <div className="w-full max-w-5xl bg-white rounded-2xl mt-8 p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-lg border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {tCrossSpecs.map((spec) => (
            <div key={spec.label} className="flex flex-col items-center">
              <span className="text-gray-500 text-sm">{spec.label}</span>
              <span className="text-lg font-bold text-gray-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        className="mt-8 px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold text-lg shadow transition-all"
        onClick={() => navigate("/")}
      >
        ← Volver a la página principal
      </button>
    </section>
  );
};

export default VehicleDetail;
