import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { sendMessage } from "../controllers/messageController";

const ContactView: React.FC = () => {
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
    <section id="contacto" className="py-20 bg-black">
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
            <div className="flex items-start">
              <MapPin className="h-8 w-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Nuestra Ubicación</h3>
                <p className="text-gray-300 leading-relaxed">Av. Principal 1234, Ciudad Automotriz<br />Zona Norte, Buenos Aires</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-8 w-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Teléfono</h3>
                <p className="text-gray-300">+54 11 1234-5678</p>
                <p className="text-gray-300">+54 9 11 9876-5432 (WhatsApp)</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-8 w-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-300">info@ferradasautomotores.com</p>
                <p className="text-gray-300">ventas@ferradasautomotores.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-8 w-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Horarios de Atención</h3>
                <p className="text-gray-300">Lunes a Viernes: 9:00 - 18:00</p>
                <p className="text-gray-300">Sábados: 9:00 - 15:00</p>
                <p className="text-gray-300">Domingos: Cerrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactView; 