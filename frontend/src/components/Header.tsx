import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "#HeroSection", label: "Home" },
    { href: "#VehiclesSection", label: "Vehicles" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About Us" },
    { href: "#contact", label: "Contact" },
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
            {/* Instagram icon link */}
            <a
              href="https://www.instagram.com/ferradas_automotores/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center"
              aria-label="Instagram Ferradas Automotores"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white hover:text-red-600 transition-colors duration-300">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1.5" strokeWidth="2"/>
              </svg>
            </a>
            {/* WhatsApp icon link */}
            <a
              href="https://wa.me/5492923659973"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center"
              aria-label="WhatsApp Ferradas Automotores"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-green-500 hover:text-green-600 transition-colors duration-300">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.01L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.24-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3s.98 2.67 1.12 2.85c.14.18 1.93 2.95 4.68 4.02.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z"/>
              </svg>
            </a>
          </div>
          {/* Menú hamburguesa móvil */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white text-3xl font-bold focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
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
            {/* Instagram icon link for mobile */}
            <a
              href="https://www.instagram.com/ferradas_automotores/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label="Instagram Ferradas Automotores"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white hover:text-red-600 transition-colors duration-300">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1.5" strokeWidth="2"/>
              </svg>
            </a>
            {/* WhatsApp icon link for mobile */}
            <a
              href="https://wa.me/5492923659973"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label="WhatsApp Ferradas Automotores"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="text-green-500 hover:text-green-600 transition-colors duration-300">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.01L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.24-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3s.98 2.67 1.12 2.85c.14.18 1.93 2.95 4.68 4.02.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
