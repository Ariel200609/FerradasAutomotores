// ServicesSection.tsx
// Sección de servicios — layout interactivo tipo lista + panel destacado.

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Car,
  BadgeCheck,
  CreditCard,
  Users,
  Shield,
  ArrowLeftRight,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const services: Service[] = [
  {
    title: "Vehículos 0 KM",
    description:
      "Amplia variedad de vehículos nuevos de las mejores marcas. Garantía oficial, entrega inmediata y financiamiento disponible para que estrenes hoy.",
    icon: Car,
    color: "bg-red-600",
  },
  {
    title: "Vehículos Usados",
    description:
      "Unidades seleccionadas con historial verificado y controles de calidad rigurosos. Cada vehículo pasa por una inspección completa antes de llegar al showroom.",
    icon: BadgeCheck,
    color: "bg-gray-900",
  },
  {
    title: "Financiamiento",
    description:
      "Planes flexibles adaptados a tu presupuesto, con las mejores tasas del mercado. Te ayudamos a encontrar la cuota que mejor se ajuste a vos.",
    icon: CreditCard,
    color: "bg-red-700",
  },
  {
    title: "Asesoramiento",
    description:
      "Nuestro equipo te acompaña en cada paso para encontrar el vehículo perfecto según tus necesidades, uso y presupuesto.",
    icon: Users,
    color: "bg-gray-800",
  },
  {
    title: "Garantía",
    description:
      "Todos nuestros vehículos incluyen garantía para tu total tranquilidad. Comprá con la confianza de una concesionaria que respalda cada venta.",
    icon: Shield,
    color: "bg-red-600",
  },
  {
    title: "Toma de Usado",
    description:
      "Evaluamos tu vehículo actual al mejor precio del mercado para que el cambio por uno nuevo sea simple, rápido y sin sorpresas.",
    icon: ArrowLeftRight,
    color: "bg-gray-900",
  },
];

const ServicesSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const current = services[active];
  const Icon = current.icon;

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url(/inicioPrincipal4.webp)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Capas de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-red-950/80 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent pointer-events-none" />
      <div
        className="absolute top-1/3 -left-40 h-80 w-80 rounded-full bg-red-600/15 blur-[100px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 -right-32 h-72 w-72 rounded-full bg-red-800/10 blur-[90px] pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 sm:mb-16">
          <span className="text-red-400 font-semibold tracking-widest uppercase text-xs sm:text-sm">
            Servicios
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white leading-tight">
            Más que una venta,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              una experiencia
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-300 leading-relaxed">
            Elegí un servicio para conocer cómo te acompañamos en cada etapa de
            tu compra.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Lista interactiva */}
          <div className="flex flex-col divide-y divide-white/10 border-t border-white/10 rounded-2xl bg-white/[0.03] backdrop-blur-sm px-2 sm:px-4">
            {services.map((service, index) => {
              const isActive = index === active;
              const ItemIcon = service.icon;

              return (
                <button
                  key={service.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`
                    group w-full text-left py-5 sm:py-6 flex items-center gap-4 sm:gap-5
                    transition-all duration-300 outline-none rounded-xl px-2
                    focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black
                    ${isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"}
                  `}
                >
                  <span
                    className={`
                      text-sm font-bold tabular-nums shrink-0 w-8
                      transition-colors duration-300
                      ${isActive ? "text-red-400" : "text-gray-500 group-hover:text-red-400/70"}
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <ItemIcon
                    className={`h-5 w-5 shrink-0 transition-colors duration-300 ${
                      isActive
                        ? "text-red-400"
                        : "text-gray-500 group-hover:text-red-400/70"
                    }`}
                    strokeWidth={1.75}
                  />

                  <span
                    className={`flex-1 text-lg sm:text-xl font-semibold transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {service.title}
                  </span>

                  <ChevronRight
                    className={`
                      h-5 w-5 shrink-0 transition-all duration-300
                      ${isActive ? "text-red-400 translate-x-1 opacity-100" : "text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-red-400/70"}
                    `}
                  />
                </button>
              );
            })}
          </div>

          {/* Panel visual — desktop */}
          <div className="hidden lg:block relative sticky top-28">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col justify-end p-10"
                >
                  <div
                    className={`absolute inset-0 ${current.color}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  <div className="relative z-10">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 mb-6">
                      <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">
                      {current.title}
                    </h3>
                    <p className="text-white/85 text-lg leading-relaxed max-w-md">
                      {current.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-2 mt-5 justify-center">
              {services.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Ver servicio ${index + 1}`}
                  onClick={() => setActive(index)}
                  className={`
                    h-1.5 rounded-full transition-all duration-300
                    ${index === active ? "w-8 bg-red-500" : "w-1.5 bg-white/20 hover:bg-white/40"}
                  `}
                />
              ))}
            </div>
          </div>

          {/* Panel — mobile */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl p-6 sm:p-8 text-white shadow-xl ring-1 ring-white/10 ${current.color}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-white/15 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold">{current.title}</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600/60 to-transparent pointer-events-none" />

      <style>{`
        @media (max-width: 768px) {
          #services {
            background-attachment: scroll !important;
            background-size: cover !important;
            background-position: center top !important;
            background-image: url('/inicioPrincipal4-mobile.webp') !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
