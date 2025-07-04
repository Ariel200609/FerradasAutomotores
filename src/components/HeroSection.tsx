import React, { useEffect, useState } from "react";

const carouselItems = [
  {
    image: "../public/inicioPrincipal1.jpg",
    slogan: true,
    text: "Descubre nuestra amplia selección de vehículos nuevos y usados. Calidad garantizada, precios competitivos y financiamiento personalizado."
  },
  {
    image: "../public/inicioPrincipal2.jpg",
    slogan: false,
    text: "Innovación y estilo para tu próxima aventura."
  },
  {
    image: "../public/inicioPrincipal4.jpg",
    slogan: false,
    text: "Confort y tecnología en cada detalle."
  }
];

const HeroSection: React.FC = () => {
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const imageCount = carouselItems.length;

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

  // Carrusel automático con duración variable
  useEffect(() => {
    const duration = currentImage === 0 ? 7000 : 5000;
    const interval = setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % imageCount);
    }, duration);
    return () => clearTimeout(interval);
  }, [currentImage, imageCount]);

  // Navegación manual
  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + imageCount) % imageCount);
  };
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % imageCount);
  };

  const currentItem = carouselItems[currentImage];

  return (
    <section id="inicio" className="pt-16 relative overflow-hidden bg-white">
      <div className="relative w-full h-[500px] md:h-[600px]">
        <img
          src={currentItem.image}
          alt="Luxury Cars"
          className="w-full h-full object-cover absolute inset-0"
        />
        {/* Overlay gradiente sutil */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0)_80%)]"></div>
        {/* Flechas de navegación */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 focus:outline-none"
          aria-label="Anterior"
        >
          &#8592;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 focus:outline-none"
          aria-label="Siguiente"
        >
          &#8594;
        </button>
        {/* Contenido centrado verticalmente */}
        <div className={`relative z-30 flex flex-col h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${currentItem.slogan ? 'justify-center items-start pl-4 md:pl-12' : 'justify-end items-start pb-12'}`}>
          <div className="max-w-3xl w-full">
            {currentItem.slogan ? (
              <>
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
                <p
                  className={`text-xl md:text-2xl text-gray-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] mb-8 leading-relaxed transition-all duration-700 ease-out transform ${showParagraph ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}
                >
                  {currentItem.text}
                </p>
              </>
            ) : (
              <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] transition-all duration-700 text-left">
                {currentItem.text}
              </h2>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 