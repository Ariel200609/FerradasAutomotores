// AboutSection.tsx
// Sección "Sobre Nosotros" de la landing page de Ferradas Automotores.
// Muestra información institucional, valores y logros destacados de la concesionaria.
// Utiliza íconos de lucide-react para resaltar características clave.

import React from "react";
import { CheckCircle } from "lucide-react";

const AboutSection: React.FC = () => (
  <section id="about" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-red-700">Ferradas Automotores</span>
          </h2>
          
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            Con más de 5 años de experiencia en el mercado automotriz, nos hemos consolidado como una de las concesionarias más confiables de la región.
          </p>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Nuestra misión es ofrecer vehículos de calidad superior, con un servicio personalizado que supere las expectativas de nuestros clientes. Cada vehículo en nuestro showroom pasa por rigurosos controles de calidad.
          </p>
          {/* Lista de logros y valores destacados */}
          <div className="space-y-4">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-red-600 mr-3" />
              <span className="text-gray-600">Más de 500 vehículos vendidos</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-red-600 mr-3" />
              <span className="text-gray-600">98% de satisfacción del cliente</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-red-600 mr-3" />
              <span className="text-gray-600">Garantía en todos nuestros vehículos</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-red-600 mr-3" />
              <span className="text-gray-600">Financiamiento personalizado</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="/InicioPrincipal1.webp"
            alt="Ferradas Automotores Showroom"
            className="rounded-xl shadow-2xl"
          />
          {/* Sello de años de experiencia */}
          <div className="absolute -bottom-6 -right-6 bg-red-600 rounded-xl p-6 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5+</div>
              <div className="text-red-100">Años</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection; 