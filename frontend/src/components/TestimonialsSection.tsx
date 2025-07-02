import React from "react";
import { Star } from "lucide-react";

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

const TestimonialsSection: React.FC = () => (
  <section className="py-20 bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Nuestros <span className="text-red-600">Clientes</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          La satisfacción de nuestros clientes es nuestra mayor recompensa. Escucha sus experiencias con Ferradas Automotores.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-black rounded-xl p-8 border border-gray-800">
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
              ))}
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
            <div className="font-semibold text-white">{testimonial.name}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection; 