// Footer.tsx
// Pie de página de la landing page de Ferradas Automotores.
// Incluye enlaces rápidos de navegación, servicios ofrecidos y derechos de autor.
// Utiliza estilos responsivos y estructura en columnas para desktop y mobile.

import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-gray-900 border-t border-gray-800 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center mb-4">
            <img src="/LogoFerradas.jpg" alt="Ferradas Automotores Logo" className="h-8 w-auto mr-3" />
            <span className="text-xl font-bold">FERRADAS AUTOMOTORES</span>
          </div>
          <p className="text-gray-400 mb-4 leading-relaxed">
            Tu concesionaria de confianza con más de 5 años de experiencia en el mercado automotriz. Calidad, confianza y servicio excepcional.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
          <ul className="space-y-2">
            <li><a href="#HeroSection" className="text-gray-400 hover:text-red-600 transition-colors">Home</a></li>
            <li><a href="#VehiclesSection" className="text-gray-400 hover:text-red-600 transition-colors">Vehicles</a></li>
            <li><a href="#services" className="text-gray-400 hover:text-red-600 transition-colors">Services</a></li>
            <li><a href="#contact" className="text-gray-400 hover:text-red-600 transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Servicios</h4>
          <ul className="space-y-2">
            <li className="text-gray-400">Vehículos 0 KM</li>
            <li className="text-gray-400">Vehículos Usados</li>
            <li className="text-gray-400">Financiamiento</li>
            <li className="text-gray-400">Toma de Usado</li>
          </ul>
        </div>
      </div>
      {/* Derechos de autor y leyenda final */}
      <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-gray-400">© 2024 Ferradas Automotores. Todos los derechos reservados.</p>
        <p className="mt-2 text-gray-500/80 text-sm">
          Creado por :{' '}
          <a
            href="https://instagram.com/developerariel_"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-red-500 transition-colors"
            aria-label="Ir al Instagram de developerariel_"
          >
            {"<byAriel>"}
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer; 