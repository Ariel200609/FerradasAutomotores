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

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
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
          {/* Información de contacto */}
          <div className="space-y-8">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-red-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl  text-gray-300 font-semibold mb-2">Nuestra Ubicación</h3>
                <p className="text-gray-300 leading-relaxed">Av. Principal 1234, Ciudad Automotriz<br />Zona Norte, Buenos Aires</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-red-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl text-gray-300 font-semibold mb-2">Teléfono</h3>
                <p className="text-gray-300">+54 11 1234-5678</p>
                <p className="text-gray-300">+54 9 11 9876-5432 (WhatsApp)</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-red-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl text-gray-300 font-semibold mb-2">Email</h3>
                <p className="text-gray-300">info@ferradasautomotores.com</p>
                <p className="text-gray-300">ventas@ferradasautomotores.com</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-red-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl text-gray-300  font-semibold mb-2">Horarios de Atención</h3>
                <p className="text-gray-300">Lunes a Viernes: 9:00 - 18:00</p>
                <p className="text-gray-300">Sábados: 9:00 - 15:00</p>
                <p className="text-gray-300">Domingos: Cerrado</p>
              </div>
            </div>
          </div>
          {/* Bloque de sucursales */}
          <div className="w-full bg-gray-900 rounded-xl shadow-lg p-6 mt-8 mb-8 flex flex-col items-center overflow-hidden pb-8">
            <h3 className="text-2xl font-bold text-center text-red-500 tracking-wider uppercase mb-6">SUCURSALES DONDE NOS PODES VISITAR!</h3>
            <div className="w-full flex flex-col md:flex-row gap-6 items-center justify-center">
              {/* Bonifacio (Laguna Alsina) */}
              <div className="flex-1 w-full h-80 max-w-xs md:max-w-full mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-2 text-center text-white">Bonifacio (Laguna Alsina)</h3>
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
              </div>
              {/* Salliqueló */}
              <div className="flex-1 w-full h-80 max-w-xs md:max-w-full">
                <h3 className="text-lg font-semibold mb-2 text-center text-white">Salliqueló</h3>
                <iframe
                  title="Mapa Salliqueló"
                  src="https://www.google.com/maps?q=-36.7514444,-62.9590278&z=15&output=embed"
                  width="100%"
                  height="85%"
                  className="rounded-lg border-2 border-gray-700 shadow-lg min-h-[250px]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 