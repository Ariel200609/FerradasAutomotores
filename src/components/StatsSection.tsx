import React from "react";

const StatsSection: React.FC = () => (
  <section className="py-8 bg-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
          <div className="text-black">Vehículos Vendidos</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-red-600 mb-2">5+</div>
          <div className="text-black">Años de Experiencia</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
          <div className="text-black">Clientes Satisfechos</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-red-600 mb-2">20+</div>
          <div className="text-black">Marcas Disponibles</div>
        </div>
      </div>
    </div>
  </section>
);

export default StatsSection; 