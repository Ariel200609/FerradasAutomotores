// HomeView.tsx
// Vista principal de la landing page de Ferradas Automotores.
// Utiliza React Router para definir rutas y React.lazy + Suspense para lazy loading de las secciones principales.
// Cada sección se carga solo cuando entra en el DOM, mejorando el rendimiento.

import React from 'react';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import VehiclesSection from '../components/VehiclesSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import BrandsSection from '../components/BrandsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

const HomeView: React.FC = () => {
  return (
    <>
      <SEO
        title="Ferradas Automotores | Autos 0km y Usados en Bahía Blanca"
        description="Concesionaria en Bahía Blanca: 0km, usados, financiación, toma de usados y atención personalizada. ¡Conocé nuestros vehículos!"
        canonical="https://ferradasautomotores.com/"
      />
      <HeroSection />
      <BrandsSection />
      <VehiclesSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
};

export default HomeView; 