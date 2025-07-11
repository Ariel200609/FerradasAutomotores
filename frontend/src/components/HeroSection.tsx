// HeroSection.tsx
// Sección principal (hero) de la landing page de Ferradas Automotores.
// Muestra un carrusel de imágenes con eslogan animado y texto destacado.
// Utiliza hooks para animaciones y cambio automático de imagen.

import React, { useEffect, useRef, useState } from "react";

// Array de imágenes y textos del carrusel principal
const carouselItems = [
  {
    image: "/FerradasAutomotores/InicioPrincipal1.jpg",
    slogan: true,
    text: "Descubre nuestra amplia selección de vehículos nuevos y usados. Calidad garantizada, precios competitivos y financiamiento personalizado."
  },
  {
    image: "/FerradasAutomotores/InicioPrincipal2.jpg",
    slogan: false,
    text: "Innovación y estilo para tu próxima aventura."
  },
  {
    image: "/FerradasAutomotores/inicioPrincipal4.jpg",
    slogan: false,
    text: "Confort y tecnología en cada detalle."
  }
];

const HeroSection: React.FC = () => {
  // Estados para animaciones del eslogan
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  // Estado para el índice de la imagen actual del carrusel
  const [currentImage, setCurrentImage] = useState(0);
  const imageCount = carouselItems.length;
  const timeoutRef = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const dragDelta = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    dragDelta.current = 0;
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX.current !== null) {
      dragDelta.current = e.touches[0].clientX - dragStartX.current;
      // Prevenir scroll horizontal nativo solo si se está arrastrando
      if (Math.abs(dragDelta.current) > 10) {
        e.preventDefault();
      }
    }
  };
  const handleTouchEnd = () => {
    if (dragDelta.current > 50) {
      setCurrentImage((prev) => (prev - 1 + imageCount) % imageCount);
    } else if (dragDelta.current < -50) {
      setCurrentImage((prev) => (prev + 1) % imageCount);
    }
    dragStartX.current = null;
    dragDelta.current = 0;
  };
  // Mouse drag for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (dragStartX.current !== null) {
      dragDelta.current = e.clientX - dragStartX.current;
    }
  };
  const handleMouseUp = () => {
    if (dragDelta.current > 50) {
      setCurrentImage((prev) => (prev - 1 + imageCount) % imageCount);
    } else if (dragDelta.current < -50) {
      setCurrentImage((prev) => (prev + 1) % imageCount);
    }
    dragStartX.current = null;
    dragDelta.current = 0;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Animación del eslogan solo para la imagen principal
  useEffect(() => {
    if (currentImage === 0) {
      setShowLine1(false);
      setShowLine2(false);
      setShowLine3(false);
      setShowParagraph(false);
      const timers = [
        setTimeout(() => setShowLine1(true), 300),
        setTimeout(() => setShowLine2(true), 1100),
        setTimeout(() => setShowLine3(true), 1900),
        setTimeout(() => setShowParagraph(true), 2700),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [currentImage]);

  // Carrusel automático con duración variable según la imagen
  useEffect(() => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    const duration = currentImage === 0 ? 7000 : 5000;
    timeoutRef.current = window.setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % imageCount);
    }, duration);
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [currentImage, imageCount]);

  // Item actual del carrusel
  const currentItem = carouselItems[currentImage];

  // [NO USADO] Log para debug, se puede eliminar en producción
  console.log("currentImage", currentImage);

  return (
    <section id="HeroSection" className="pt-16 relative overflow-hidden bg-white">
      <div
        className="relative w-full h-[500px] md:h-[600px] select-none touch-pan-y"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        style={{ cursor: 'grab' }}
      >
        {/* Imagen de fondo del carrusel */}
        <img
          src={currentItem.image}
          alt="Luxury Cars"
          className="w-full h-full object-cover absolute inset-0"
        />
        {/* Overlay gradiente sutil para mejorar contraste del texto */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0)_80%)]"></div>
        {/* Contenido centrado verticalmente */}
        <div className={`relative z-30 flex flex-col h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${currentItem.slogan ? 'justify-center items-start pl-4 md:pl-12' : 'justify-end items-start pb-12'}`}>
          <div className="max-w-3xl w-full">
            {currentItem.slogan ? (
              <>
                {/* Eslogan animado, línea por línea */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  <span className="sr-only">Eslogan</span>
                  <span className="flex flex-col gap-y-2">
                    <span
                      className={`text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] block transition-all duration-700 ease-out transform ${showLine1 ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}
                    >
                      TU PRÓXIMO
                    </span>
                    <span
                      className={`text-red-600 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] block transition-all duration-700 ease-out transform ${showLine2 ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}
                    >
                      VEHÍCULO
                    </span>
                    <span
                      className={`text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] block transition-all duration-700 ease-out transform ${showLine3 ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}
                    >
                      TE ESPERA
                    </span>
                  </span>
                </h1>
                {/* Párrafo animado */}
                <p
                  className={`text-xl md:text-2xl text-gray-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] mb-8 leading-relaxed transition-all duration-700 ease-out transform ${showParagraph ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}
                >
                  {currentItem.text}
                </p>
              </>
            ) : (
              // Texto alternativo para imágenes secundarias del carrusel
              <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] transition-all duration-700 text-left">
                {currentItem.text}
              </h2>
            )}
          </div>
        </div>
        {/* Puntitos indicadores minimalistas */}
        <div className="absolute bottom-6 left-1/2 z-40 flex gap-2 -translate-x-1/2">
          {carouselItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-white focus:outline-none ${currentImage === idx ? 'bg-white shadow-lg scale-125' : 'bg-white/40'}`}
              aria-label={`Ir a la imagen ${idx + 1}`}
              style={{ boxShadow: currentImage === idx ? '0 0 0 2px #e11d48' : undefined }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 