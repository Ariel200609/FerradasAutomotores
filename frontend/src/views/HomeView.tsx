// HomeView.tsx
// Vista principal de la landing page de Ferradas Automotores.
// Utiliza React Router para definir rutas y React.lazy + Suspense para lazy loading de las secciones principales.
// Cada sección se carga solo cuando entra en el DOM, mejorando el rendimiento.

import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load de secciones principales (bloques grandes de la landing)
const HeroSection = React.lazy(() => import("../components/HeroSection"));
const StatsSection = React.lazy(() => import("../components/BrandsSection"));
const VehiclesSection = React.lazy(() => import("../components/VehiclesSection"));
const ServicesSection = React.lazy(() => import("../components/ServicesSection"));
const AboutSection = React.lazy(() => import("../components/AboutSection"));
const TestimonialsSection = React.lazy(() => import("../components/TestimonialsSection"));
const ContactSection = React.lazy(() => import("../components/ContactSection"));

// [NO USADO] Estos imports no se usan en la vista principal, pero pueden ser útiles para futuras rutas o lógica:
import { Star, CheckCircle } from "lucide-react";
import BrandsSection from "../components/BrandsSection";

// Loader simple que se muestra mientras se carga cada sección
const Loader = () => <div className="w-full text-center py-12 text-gray-400">Loading...</div>;

// Definición de rutas de la landing page
const HomeView: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <>
          {/* Cada sección se carga de forma diferida (lazy) y muestra un loader mientras se importa */}
          <Suspense fallback={<Loader />}><HeroSection /></Suspense>
          <Suspense fallback={<Loader />}><BrandsSection /></Suspense>
          <Suspense fallback={<Loader />}><VehiclesSection /></Suspense>
          <Suspense fallback={<Loader />}><ServicesSection /></Suspense>
          <Suspense fallback={<Loader />}><AboutSection /></Suspense>
          <Suspense fallback={<Loader />}><TestimonialsSection /></Suspense>
          <Suspense fallback={<Loader />}><ContactSection /></Suspense>
        </>
      }
    />
  </Routes>
);

export default HomeView; 