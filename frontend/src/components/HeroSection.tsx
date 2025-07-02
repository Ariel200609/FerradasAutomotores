import React from "react";

const HeroSection: React.FC = () => (
  <section id="inicio" className="pt-16 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
    <div className="absolute inset-0">
      <img
        src="../public/iniciopaginaFerradas.jpg"
        alt="Luxury Cars"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-white">TU PRÓXIMO</span>
          <br />
          <span className="text-red-600">VEHÍCULO</span>
          <br />
          <span className="text-white">TE ESPERA</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Descubre nuestra amplia selección de vehículos nuevos y usados. Calidad garantizada, precios competitivos y financiamiento personalizado.
        </p>
      </div>
    </div>
  </section>
);

export default HeroSection; 