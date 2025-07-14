// ServicesSection.tsx
// Sección de servicios de la landing page de Ferradas Automotores.
// Muestra los principales servicios ofrecidos: 0KM, usados, financiamiento, asesoramiento, garantía y toma de usado.
// Utiliza íconos y estilos destacados para cada bloque de servicio.

import React from "react";
import { CheckCircle } from "lucide-react";

const ServicesSection: React.FC = () => (
  <section
    id="services"
    className="border-y border-gray-200 relative"
    style={{
      backgroundImage: 'url(/FerradasAutomotores/inicioPrincipal4.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-2 py-16">
        <h2 className="text-4xl md:text-3xl font-bold mb-6 text-white">
          EXPERIENCIA DE COMPRA COMPLETA,<br />
          CON SERVICIOS QUE VAN MÁS ALLÁ DE LA VENTA.
        </h2>
      </div>
      {/* Grid de servicios destacados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-black/80 rounded-xl p-8 text-center hover:bg-gray-800/90 transition-all duration-300 border border-gray-800">
          <div className="h-16 w-16 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">0KM</span>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white transition-colors duration-300 hover:text-red-600 cursor-pointer">Vehículos 0 KM</h3>
          <p className="text-gray-300 leading-relaxed">
            Amplia variedad de vehículos nuevos de las mejores marcas, con garantía oficial y financiamiento disponible.
          </p>
        </div>
        <div className="bg-black/80 rounded-xl p-8 text-center hover:bg-gray-800/90 transition-all duration-300 border border-gray-800">
          <CheckCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4 text-white transition-colors duration-300 hover:text-red-600 cursor-pointer">Vehículos Usados</h3>
          <p className="text-gray-300 leading-relaxed">
            Vehículos usados seleccionados y certificados, con historial verificado y garantía extendida.
          </p>
        </div>
        <div className="bg-black/80 rounded-xl p-8 text-center hover:bg-gray-800/90 transition-all duration-300 border border-gray-800">
          <CheckCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4 text-white transition-colors duration-300 hover:text-red-600 cursor-pointer">Financiamiento</h3>
          <p className="text-gray-300 leading-relaxed">
            Planes de financiamiento flexibles adaptados a tu presupuesto, con las mejores tasas del mercado.
          </p>
        </div>
        <div className="bg-black/80 rounded-xl p-8 text-center hover:bg-gray-800/90 transition-all duration-300 border border-gray-800">
          <CheckCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4 text-white transition-colors duration-300 hover:text-red-600 cursor-pointer">Asesoramiento</h3>
          <p className="text-gray-300 leading-relaxed">
            Nuestro equipo experto te asesora para encontrar el vehículo perfecto según tus necesidades.
          </p>
        </div>
        <div className="bg-black/80 rounded-xl p-8 text-center hover:bg-gray-800/90 transition-all duration-300 border border-gray-800">
          <CheckCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4 text-white transition-colors duration-300 hover:text-red-600 cursor-pointer">Garantía</h3>
          <p className="text-gray-300 leading-relaxed">
            Todos nuestros vehículos incluyen garantía, para tu total tranquilidad y confianza.
          </p>
        </div>
        <div className="bg-black/80 rounded-xl p-8 text-center hover:bg-gray-800/90 transition-all duration-300 border border-gray-800">
          <div className="h-16 w-16 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">TOMA</span>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white transition-colors duration-300 hover:text-red-600 cursor-pointer">Toma de Usado</h3>
          <p className="text-gray-300 leading-relaxed">
            Evaluamos tu vehículo actual al mejor precio para facilitar el cambio por uno nuevo.
          </p>
        </div>
      </div>
    </div>
    {/* Overlay para mejorar contraste */}
    <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none" />
  </section>
);

export default ServicesSection; 