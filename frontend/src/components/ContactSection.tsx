// ContactSection.tsx
// Sección de contacto de la landing page de Ferradas Automotores.
// Incluye formulario de contacto, información de sucursales, horarios y mapas embebidos de Google Maps.
// Utiliza hooks de React para manejar el estado del formulario y feedback de envío.
// Implementa carga diferida de los mapas: solo se cargan los iframes cuando el usuario hace clic en 'Ver mapa'.

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { sendMessage } from "../controllers/messageController";

const ContactSection: React.FC = () => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState("");
  const [error, setError] = useState("");

  // Estados para carga diferida de mapas
  const [showMapBonifacio, setShowMapBonifacio] = useState(false);
  const [showMapSalliquelo, setShowMapSalliquelo] = useState(false);

  // Manejar el envío del formulario de contacto
  /* const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setExito("");
    setError("");
    try {
      await sendMessage({ nombre, email, telefono, mensaje });
      setExito("¡Mensaje enviado correctamente!");
      setNombre(""); setEmail(""); setTelefono(""); setMensaje("");
    } catch (err) {
      setError("Error al enviar el mensaje. Intenta nuevamente.");
    } finally {
      setEnviando(false);
    }
  };*/

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Ofrecen financiación?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, contamos con planes de financiación flexibles y tasas competitivas. Podés consultarnos por WhatsApp para recibir una propuesta personalizada."
        }
      },
      {
        "@type": "Question",
        "name": "¿Toman vehículos usados como parte de pago?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, tomamos tu usado para facilitar el cambio. Evaluamos el vehículo y te ofrecemos una cotización justa."
        }
      },
      {
        "@type": "Question",
        "name": "¿Dónde están ubicados?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Atendemos en Bonifacio (Laguna Alsina) y Salliqueló. Encontrás direcciones y mapas en esta sección."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es el horario de atención?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lunes a Viernes de 8 a 20 hs, sábados de 8 a 15 hs."
        }
      }
    ]
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-red-600">Contacto</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos aquí para ayudarte a encontrar tu vehículo ideal. Contáctanos y descubre por qué somos la mejor opción.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Información de contacto principal */}
          <div className="space-y-8">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-red-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl  text-gray-300 font-semibold mb-2">Nuestra Ubicación</h3>
                <p className="text-gray-300 leading-relaxed"> Acceso Libertad 570, Laguna Alsina<br />Rauch y Av. Stroeder Este, Salliqueló</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-red-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl text-gray-300 font-semibold mb-2">Teléfono</h3>
                <p className="text-gray-300">+54 9 2923 695246</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-red-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl text-gray-300 font-semibold mb-2">Email</h3>
                <p className="text-gray-300">info@ferradasautomotores.com</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-red-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl text-gray-300  font-semibold mb-2">Horarios de Atención</h3>
                <p className="text-gray-300">Lunes a Viernes: 8:00 - 20:00</p>
                <p className="text-gray-300">Sábados: 8:00 - 15:00</p>
                <p className="text-gray-300">Domingos: Cerrado</p>
              </div>
            </div>
          </div>
          {/* Bloque de sucursales con mapas embebidos y carga diferida */}
          <div className="w-full bg-gray-900 rounded-xl shadow-lg p-6 mt-8 mb-8 flex flex-col items-center overflow-hidden pb-8">
            <h3 className="text-2xl font-bold text-center text-red-500 tracking-wider uppercase mb-6">SUCURSALES DONDE NOS PODES VISITAR!</h3>
            <div className="w-full flex flex-col md:flex-row gap-6 items-center justify-center">
              {/* Bonifacio (Laguna Alsina) */}
              <div className="flex-1 w-full h-80 max-w-xs md:max-w-full mb-6 md:mb-0 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2 text-center text-white">Bonifacio (Laguna Alsina)</h3>
                {!showMapBonifacio ? (
                  <>
                    <img
                      src="https://maps.googleapis.com/maps/api/staticmap?center=-36.81375,-62.2423056&zoom=15&size=400x250&maptype=roadmap&markers=color:red%7C-36.81375,-62.2423056&key=AIzaSyD..." // Reemplaza por tu API Key si tienes, o usa una imagen local
                      alt="Mapa Bonifacio Laguna Alsina"
                      className="rounded-lg border-2 border-gray-700 shadow-lg min-h-[250px] w-full object-cover"
                      loading="lazy"
                    />
                    <button
                      className="mt-2 px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
                      onClick={() => setShowMapBonifacio(true)}
                    >
                      Ver mapa interactivo
                    </button>
                  </>
                ) : (
                  <iframe
                    title="Mapa Bonifacio Laguna Alsina"
                    src="https://www.google.com/maps?q=-36.81375,-62.2423056&z=15&output=embed"
                    width="100%"
                    height="85%"
                    className="rounded-lg border-2 border-gray-700 shadow-lg min-h-[250px]"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                )}
              </div>
              {/* Salliqueló */}
              <div className="flex-1 w-full h-80 max-w-xs md:max-w-full flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2 text-center text-white">Salliqueló</h3>
                {!showMapSalliquelo ? (
                  <>
                    <img
                      src="https://maps.googleapis.com/maps/api/staticmap?center=-36.758389,-62.957278&zoom=15&size=400x250&maptype=roadmap&markers=color:red%7C-36.758389,-62.957278&key=AIzaSyD..." // Reemplaza por tu API Key si tienes, o usa una imagen local
                      alt="Mapa Salliqueló"
                      className="rounded-lg border-2 border-gray-700 shadow-lg min-h-[250px] w-full object-cover"
                      loading="lazy"
                    />
                    <button
                      className="mt-2 px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
                      onClick={() => setShowMapSalliquelo(true)}
                    >
                      Ver mapa interactivo
                    </button>
                  </>
                ) : (
                  <iframe
                    title="Mapa Salliqueló"
                    src="https://www.google.com/maps?q=-36.758389,-62.957278&z=15&output=embed"
                    width="100%"
                    height="85%"
                    className="rounded-lg border-2 border-gray-700 shadow-lg min-h-[250px]"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
    </section>
  );
};

export default ContactSection; 