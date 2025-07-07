import React from "react";
import { Routes, Route } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import VehiclesSection from "../components/VehiclesSection";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import VehicleDetail from "../components/VehicleDetail";
import { Star, CheckCircle } from "lucide-react";
import Footer from "../components/Footer";

const testimonials = [
  {
    name: "Carlos Rodriguez",
    text: "Excelente atención y gran variedad de vehículos. Encontré exactamente lo que buscaba.",
    rating: 5,
  },
  {
    name: "Maria Silva",
    text: "Muy profesionales, me ayudaron con el financiamiento y todo el proceso fue muy fácil.",
    rating: 5,
  },
  {
    name: "João Santos",
    text: "Recomiendo totalmente Ferradas Automotores. Calidad y confianza garantizada.",
    rating: 5,
  },
];

const HomeView: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <>
          <HeroSection />
          <StatsSection />
          <VehiclesSection />
          <ServicesSection />
          <AboutSection />
          <TestimonialsSection />
          <ContactSection />
        </>
      }
    />
    <Route path="/vehiculo/t-cross" element={<VehicleDetail />} />
  </Routes>
);

export default HomeView; 