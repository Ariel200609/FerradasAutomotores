// HeroSection.tsx
// Sección principal (hero) de la landing page de Ferradas Automotores.
// Muestra un carrusel de imágenes con eslogan animado y texto destacado.
// Utiliza hooks para animaciones y cambio automático de imagen.

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

// Array de imágenes y textos del carrusel principal
const carouselItems = [
  {
    image: "/InicioPrincipal1.webp",
    slogan: true,
    text: "Descubre nuestra amplia selección de vehículos nuevos y usados. Calidad garantizada, precios competitivos y financiamiento personalizado."
  },
  {
    image: "/imagenprincipal3.webp",
    slogan: false,
    text: "Innovación y estilo para tu próxima aventura."
  },
  {
    image: "/imagenprincipal4.webp",
    slogan: false,
    text: "Brindamos comodidad al cliente"
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
  const [fade, setFade] = useState(true); // Para animación fade
  const [isMobile, setIsMobile] = useState(false);
  const imageCount = carouselItems.length;
  const timeoutRef = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const dragDelta = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pre-cargar imágenes para evitar que falte la 3ra en móviles
  useEffect(() => {
    carouselItems.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  // Swipe handlers mejorados para móvil - optimizados con useCallback
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    dragDelta.current = 0;
    // Pausar el carrusel automático al tocar
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
  }, []);
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (dragStartX.current !== null) {
      dragDelta.current = e.touches[0].clientX - dragStartX.current;
      if (Math.abs(dragDelta.current) > 10) {
        e.preventDefault();
      }
    }
  }, []);
  
  const handleTouchEnd = useCallback(() => {
    const threshold = isMobile ? 30 : 50; // Umbral más bajo en móvil
    if (dragDelta.current > threshold) {
      triggerFade((prev) => (prev - 1 + imageCount) % imageCount);
    } else if (dragDelta.current < -threshold) {
      triggerFade((prev) => (prev + 1) % imageCount);
    }
    dragStartX.current = null;
    dragDelta.current = 0;
  }, [isMobile, imageCount]);
  // Mouse drag for desktop - optimizados con useCallback
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, []);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragStartX.current !== null) {
      dragDelta.current = e.clientX - dragStartX.current;
    }
  }, []);
  
  const handleMouseUp = useCallback(() => {
    if (dragDelta.current > 50) {
      triggerFade((prev) => (prev - 1 + imageCount) % imageCount);
    } else if (dragDelta.current < -50) {
      triggerFade((prev) => (prev + 1) % imageCount);
    }
    dragStartX.current = null;
    dragDelta.current = 0;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [imageCount]);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
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

  // Carrusel automático con fade
  useEffect(() => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    // Duración más larga para mejor visualización
    const duration = isMobile 
      ? (currentImage === 0 ? 6000 : 5000)  // Móvil: 6s primera, 5s otras
      : (currentImage === 0 ? 8000 : 6000); // Desktop: 8s primera, 6s otras
    timeoutRef.current = window.setTimeout(() => {
      triggerFade((prev) => (prev + 1) % imageCount);
    }, duration);
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line
  }, [currentImage, imageCount, isMobile]);

  // Función para animar el fade - optimizada con useCallback
  const triggerFade = useCallback((getNextIndex: (prev: number) => number) => {
    setFade(false);
    const fadeDuration = isMobile ? 300 : 500; // Más rápido en móvil
    setTimeout(() => {
      setCurrentImage(getNextIndex);
      setFade(true);
    }, fadeDuration);
  }, [isMobile]);

  const currentItem = useMemo(() => carouselItems[currentImage], [currentImage]);
  
  // Debug: verificar que se estén cargando las 3 imágenes
  console.log('HeroSection Debug:', {
    currentImage,
    imageCount,
    currentItemImage: currentItem.image,
    allImages: carouselItems.map(item => item.image)
  });

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
        {/* Imagen de fondo del carrusel con fade */}
        <img
          src={currentItem.image}
          alt="Luxury Cars"
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
          loading="eager"
          decoding="async"
          onError={(e) => {
            // Fallback por si alguna imagen falla en móviles
            const fallbackMap: Record<string, string> = {
              '/imagenprincipal4.webp': '/inicioPrincipal4.webp'
            };
            const currentSrc = currentItem.image;
            const fallback = fallbackMap[currentSrc];
            if (fallback && e.currentTarget.src.indexOf(fallback) === -1) {
              e.currentTarget.src = fallback;
            }
          }}
        />
        
        {/* Preload de la siguiente imagen para mejor rendimiento */}
        {carouselItems.map((item, idx) => {
          if (idx !== currentImage) {
            return (
              <link
                key={idx}
                rel="preload"
                as="image"
                href={item.image}
                type="image/webp"
              />
            );
          }
          return null;
        })}
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
              onClick={() => triggerFade(() => idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-white focus:outline-none ${currentImage === idx ? 'bg-white shadow-lg scale-125' : 'bg-white/40'}`}
              aria-label={`Ir a la imagen ${idx + 1}`}
              style={{ boxShadow: currentImage === idx ? '0 0 0 2px #e11d48' : undefined }}
            />
          ))}
        </div>
        
        {/* Indicador de imagen actual */}
        <div className="absolute top-6 right-6 z-40 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentImage + 1} / {imageCount}
        </div>
        
        {/* Indicador de swipe para móvil */}
        {isMobile && (
          <div className="absolute top-6 left-6 z-40 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
            ← Desliza →
          </div>
        )}
        

      </div>
    </section>
  );
};

export default HeroSection; 