import React from "react";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import VehiclesSection from "../components/VehiclesSection";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import TestimonialsSection from "../components/TestimonialsSection";
import { Star, CheckCircle } from "lucide-react";

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
  <>
    <HeroSection />
    <StatsSection />
    <VehiclesSection />
    <ServicesSection />
    <AboutSection />
    <TestimonialsSection />
  </>
);

export default HomeView; 