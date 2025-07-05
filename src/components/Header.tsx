import React from "react";

const Header: React.FC = () => (
  <nav className="fixed top-0 w-full bg-gradient-to-r from-black via-gray-900 to-gray-800 backdrop-blur-sm z-50 border-b border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <img
            src="../public/logoFerrades.jpg"
            alt="Ferradas Automotores Logo"
            className="h-8 w-auto mr-3"
          />
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#inicio" className="hover:text-red-600 transition-colors duration-300">Inicio</a>
          <a href="#vehiculos" className="hover:text-red-600 transition-colors duration-300">Vehículos</a>
          <a href="#servicios" className="hover:text-red-600 transition-colors duration-300">Servicios</a>
          <a href="#nosotros" className="hover:text-red-600 transition-colors duration-300">Nosotros</a>
          <a href="#contacto" className="hover:text-red-600 transition-colors duration-300">Contacto</a>
        </div>
      </div>
    </div>
  </nav>
);

export default Header; 