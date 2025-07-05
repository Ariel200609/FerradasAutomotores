import React from "react";
import { CheckCircle } from "lucide-react";

const ServicesSection: React.FC = () => (
  <section id="servicios" className="bg-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-2 py-16">
        <h2 className="text-4xl md:text-3xl font-bold mb-6 text-gray-900">
          EXPERENCIA DE COMPRA COMPLETA,
          <br/>
          CON SERVICIOS QUE VAN MÁS ALLÁ DE LA VENTA.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-black rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-gray-800">
          <div className="h-16 w-16 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">0KM</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Vehículos 0 KM</h3>
          <p className="text-gray-300 leading-relaxed">
            Amplia variedad de vehículos nuevos de las mejores marcas, con garantía oficial y financiamiento disponible.
          </p>
        </div>
        <div className="bg-black rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-gray-800">
          <CheckCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Vehículos Usados</h3>
          <p className="text-gray-300 leading-relaxed">
            Vehículos usados seleccionados y certificados, con historial verificado y garantía extendida.
          </p>
        </div>
        <div className="bg-black rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-gray-800">
          <CheckCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Financiamiento</h3>
          <p className="text-gray-300 leading-relaxed">
            Planes de financiamiento flexibles adaptados a tu presupuesto, con las mejores tasas del mercado.
          </p>
        </div>
        <div className="bg-black rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-gray-800">
          <CheckCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Asesoramiento</h3>
          <p className="text-gray-300 leading-relaxed">
            Nuestro equipo experto te asesora para encontrar el vehículo perfecto según tus necesidades.
          </p>
        </div>
        <div className="bg-black rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-gray-800">
          <CheckCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Garantía</h3>
          <p className="text-gray-300 leading-relaxed">
            Todos nuestros vehículos incluyen garantía, para tu total tranquilidad y confianza.
          </p>
        </div>
        <div className="bg-black rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-gray-800">
          <div className="h-16 w-16 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">TOMA</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Toma de Usado</h3>
          <p className="text-gray-300 leading-relaxed">
            Evaluamos tu vehículo actual al mejor precio para facilitar el cambio por uno nuevo.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ServicesSection; 