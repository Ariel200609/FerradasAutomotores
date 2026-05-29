// AboutSection.tsx
// Sección "Sobre Nosotros" — historia, valores y logros de Ferradas Automotores.

import React from "react";
import { MapPin, Shield, Users, Car } from "lucide-react";

const stats = [
  { value: "5+", label: "Años de experiencia", icon: Shield },
  { value: "500+", label: "Vehículos vendidos", icon: Car },
  { value: "98%", label: "Clientes satisfechos", icon: Users },
  { value: "2", label: "Sucursales en la región", icon: MapPin },
];

const AboutSection: React.FC = () => (
  <section id="about" className="py-20 sm:py-28 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Imagen */}
        <div className="lg:col-span-5 relative order-2 lg:order-1">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/10 ring-1 ring-gray-200">
            <img
              src="/InicioPrincipal1.webp"
              alt="Showroom Ferradas Automotores en Laguna Alsina"
              className="w-full aspect-[4/5] sm:aspect-[5/6] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-1">
                Desde Laguna Alsina
              </p>
              <p className="text-white text-lg sm:text-xl font-bold">
                Tu concesionaria de confianza
              </p>
            </div>
          </div>

          <div className="absolute -bottom-5 -right-2 sm:-right-5 bg-red-600 rounded-2xl px-6 py-5 shadow-xl shadow-red-900/30 ring-4 ring-white">
            <div className="text-center">
              <div className="text-4xl font-bold text-white leading-none">5+</div>
              <div className="text-red-100 text-sm font-semibold mt-1">Años</div>
            </div>
          </div>

          <div
            className="absolute -top-4 -left-4 h-24 w-24 rounded-2xl border-2 border-red-600/20 pointer-events-none hidden sm:block"
            aria-hidden
          />
        </div>

        {/* Contenido */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <span className="text-red-600 font-semibold tracking-widest uppercase text-xs sm:text-sm">
            Nuestra historia
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Ferradas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">
              Automotores
            </span>
          </h2>

          <div className="mt-6 space-y-5 text-gray-600 leading-relaxed text-base sm:text-lg">
            <p>
              Con más de <strong className="text-gray-900 font-semibold">5 años</strong> en el
              mercado automotriz, nos consolidamos como una de las concesionarias más
              confiables de la región. Nacimos en{" "}
              <strong className="text-gray-900 font-semibold">Laguna Alsina (Bonifacio)</strong>{" "}
              con un objetivo claro: que comprar un auto sea simple, transparente y humano.
            </p>
            <p>
              Hoy atendemos desde dos sucursales — Bonifacio y Salliqueló — con un equipo
              que te acompaña en cada paso. Cada vehículo en nuestro showroom pasa por
              rigurosos controles de calidad antes de llegar a tus manos.
            </p>
          </div>

          <blockquote className="mt-8 border-l-4 border-red-600 pl-5 py-1">
            <p className="text-gray-800 italic text-base sm:text-lg">
              "Nuestra misión es superar las expectativas de cada cliente, con un servicio
              personalizado y vehículos que realmente valen la pena."
            </p>
          </blockquote>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-start gap-3 sm:gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-5 hover:border-red-200 hover:bg-red-50/50 transition-colors duration-300"
              >
                <div className="shrink-0 h-10 w-10 rounded-xl bg-red-600/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-red-600" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 leading-none">
                    {value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1 leading-snug">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
