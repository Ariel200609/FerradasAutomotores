import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-gray-900 border-t border-gray-800 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center mb-4">
            <img src="../public/logoFerrades.jpg" alt="Ferradas Automotores Logo" className="h-8 w-auto mr-3" />
            <span className="text-xl font-bold">FERRADAS AUTOMOTORES</span>
          </div>
          <p className="text-gray-400 mb-4 leading-relaxed">
            Tu concesionaria de confianza con más de 5 años de experiencia en el mercado automotriz. Calidad, confianza y servicio excepcional.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
          <ul className="space-y-2">
            <li><a href="#inicio" className="text-gray-400 hover:text-red-600 transition-colors">Inicio</a></li>
            <li><a href="#vehiculos" className="text-gray-400 hover:text-red-600 transition-colors">Vehículos</a></li>
            <li><a href="#servicios" className="text-gray-400 hover:text-red-600 transition-colors">Servicios</a></li>
            <li><a href="#contacto" className="text-gray-400 hover:text-red-600 transition-colors">Contacto</a></li>
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
      <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-gray-400">© 2024 Ferradas Automotores. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer; 