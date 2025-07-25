import React from "react";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { useState, useEffect } from "react";
import { testimonios } from '../data/testimonios';

const clients = testimonios.map(t => ({
  ...t,
  image: `${import.meta.env.BASE_URL}${t.image}`,
}));

const ClientCard: React.FC<{ client: typeof clients[0] }> = ({ client }) => {
  if (!client.text) {
    return (
      <div className="w-full min-w-0 max-w-full md:min-w-[300px] md:max-w-[300px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex items-center justify-center mx-auto" style={{ minHeight: 320 }}>
        <img
          src={client.image}
          alt={client.name}
          className="object-cover w-full h-full"
          onError={e => (e.currentTarget.style.opacity = '0.3')}
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <div className="w-full min-w-0 max-w-full md:min-w-[300px] md:max-w-[300px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col items-center p-6 mx-auto" style={{ minHeight: 320 }}>
      <div className="relative w-full h-40 flex items-end justify-center mb-3">
        <img
          src={client.image}
          alt={client.name}
          className="object-contain w-full h-full"
          onError={e => (e.currentTarget.style.opacity = '0.3')}
          loading="lazy"
        />
      </div>
      <div className="font-semibold text-gray-900 text-lg mb-2 text-center w-full truncate">{client.name}</div>
      {/* Se eliminó el rating y las estrellas */}
      <p className="text-gray-700 leading-relaxed text-center text-base">"{client.text}"</p>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            MÁS DE 100 <span className="text-red-600">CLIENTES</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-2">
            La satisfacción de nuestros clientes es nuestra mayor recompensa.
          </p>
        </div>
        {/* Flechas de navegación SIEMPRE visibles */}
        <div className="relative">
          <div className="swiper-button-prev !text-black !left-0" />
          <div className="swiper-button-next !text-black !right-0" />
          <Swiper
            modules={[EffectCoverflow, FreeMode, Navigation]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            effect={isDesktop ? "coverflow" : "slide"}
            grabCursor={true}
            centeredSlides={isDesktop}
            slidesPerView={1}
            coverflowEffect={isDesktop ? {
              rotate: 30,
              stretch: 0,
              depth: 400,
              modifier: 2.5,
              slideShadows: true,
            } : {}}
            breakpoints={{
              0: { slidesPerView: 1 }, // Móvil chico: solo 1 slide
              640: { slidesPerView: 1.3 }, // Móvil grande: bordes
              768: { slidesPerView: 2.2 }, // Tablet
              1024: { slidesPerView: 3 }, // Desktop: 3 slides visibles
            }}
            className="w-full max-w-[95vw] px-2"
            style={window.innerWidth < 640 ? { paddingLeft: 0, paddingRight: 0 } : { paddingLeft: '5vw', paddingRight: '5vw' }}
          >
            {clients.map((client, idx) => (
              <SwiperSlide key={idx} className="flex justify-center">
                <ClientCard client={client} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 