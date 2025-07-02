import React from "react";

const StatsSection: React.FC = () => (
  <section className="py-16 bg-gradient-to-r from-black via-gray-900 to-gray-800 backdrop-blur-sm z-50 border-b border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
          <div className="text-gray-300">Vehículos Vendidos</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-red-600 mb-2">5+</div>
          <div className="text-gray-300">Años de Experiencia</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
          <div className="text-gray-300">Clientes Satisfechos</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-red-600 mb-2">20+</div>
          <div className="text-gray-300">Marcas Disponibles</div>
        </div>
      </div>
    </div>
  </section>
);

export default StatsSection; 