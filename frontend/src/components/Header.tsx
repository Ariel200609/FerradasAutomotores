import React, { useState, useRef, useEffect } from "react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#vehiculos", label: "Vehículos" },
    { href: "#servicios", label: "Servicios" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ];

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-black via-gray-900 to-gray-800 backdrop-blur-sm z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src="/FerradasAutomotores/LogoFerradas.jpg"
              alt="Ferradas Automotores Logo"
              className="h-8 w-auto mr-3"
            />
          </div>
          {/* Menú desktop */}
          <div className="hidden md:flex space-x-8">
            {links.map(link => (
              <a key={link.href} href={link.href} className="text-white hover:text-red-600 transition-colors duration-300">{link.label}</a>
            ))}
          </div>
          {/* Menú hamburguesa móvil */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white text-3xl font-bold focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <span className="text-white text-4xl font-bold">≡</span>
            </button>
          </div>
        </div>
        {/* Menú desplegable móvil */}
        <div
          ref={menuRef}
          className={`md:hidden absolute top-16 left-0 w-full bg-gray-900 bg-opacity-95 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
            menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-white text-lg font-semibold hover:text-red-600 transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
