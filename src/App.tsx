import React, { useState } from "react";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react";

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  condition: "new" | "used";
  mileage?: number;
  fuel: string;
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2024,
    price: 25000,
    image:
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800",
    condition: "new",
    fuel: "Gasolina",
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 22000,
    image:
      "https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800",
    condition: "new",
    fuel: "Gasolina",
  },
  {
    id: 3,
    brand: "Ford",
    model: "Focus",
    year: 2021,
    price: 18500,
    image:
      "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800",
    condition: "used",
    mileage: 25000,
    fuel: "Gasolina",
  },
  {
    id: 4,
    brand: "Chevrolet",
    model: "Onix",
    year: 2024,
    price: 20000,
    image:
      "https://images.pexels.com/photos/708764/pexels-photo-708764.jpeg?auto=compress&cs=tinysrgb&w=800",
    condition: "new",
    fuel: "Flex",
  },
  {
    id: 5,
    brand: "Volkswagen",
    model: "Golf",
    year: 2022,
    price: 24000,
    image:
      "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
    condition: "used",
    mileage: 15000,
    fuel: "Gasolina",
  },
  {
    id: 6,
    brand: "Nissan",
    model: "Sentra",
    year: 2024,
    price: 23500,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
    condition: "new",
    fuel: "Gasolina",
  },
];

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

function App() {
  const [filterCondition, setFilterCondition] = useState<
    "all" | "new" | "used"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesCondition =
      filterCondition === "all" || vehicle.condition === filterCondition;
    const matchesSearch =
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCondition && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gradient-to-r from-black via-gray-900 to-gray-800 backdrop-blur-sm z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="../public/logoFerrades.jpg"
                alt="Ferradas Automotores Logo"
                className="h-8 w-auto mr-3"
              />
              <span className="text-xl font-bold">FERRADAS AUTOMOTORES</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#inicio"
                className="hover:text-red-600 transition-colors duration-300"
              >
                Inicio
              </a>
              <a
                href="#vehiculos"
                className="hover:text-red-600 transition-colors duration-300"
              >
                Vehículos
              </a>
              <a
                href="#servicios"
                className="hover:text-red-600 transition-colors duration-300"
              >
                Servicios
              </a>
              <a
                href="#nosotros"
                className="hover:text-red-600 transition-colors duration-300"
              >
                Nosotros
              </a>
              <a
                href="#contacto"
                className="hover:text-red-600 transition-colors duration-300"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <img
            src="../public/iniciopaginaFerradas.jpg"
            alt="Luxury Cars"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">TU PRÓXIMO</span>
              <br />
              <span className="text-red-600">VEHÍCULO</span>
              <br />
              <span className="text-white">TE ESPERA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Descubre nuestra amplia selección de vehículos nuevos y usados.
              Calidad garantizada, precios competitivos y financiamiento
              personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  document.getElementById("vehiculos")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Ver Vehículos
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <button
                onClick={() =>
                  document.getElementById("contacto").scrollIntoView({ behavior: "smooth" })
                }
                className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Contactar Ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-black via-gray-900 to-gray-800 backdrop-blur-sm z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-300">Vehículos Vendidos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">5+</div>
              <div className="text-gray-300">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
              <div className="text-gray-300">Clientes Satisfechos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">20+</div>
              <div className="text-gray-300">Marcas Disponibles</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Section */}
      <section id="vehiculos" className="bg-gradient-to-r from-black via-gray-500 to-white backdrop-blur-sm z-50 border-b border-white-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Nuestros <span className="text-red-600">Vehículos</span>
            </h2>
            <p className="text-xl text-black-700 max-w-3xl mx-auto">
              Explora nuestra cuidadosa selección de vehículos nuevos y usados,
              todos inspeccionados y certificados para tu tranquilidad.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar marca o modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-gray-700 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 w-full md:w-80"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterCondition("all")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  filterCondition === "all"
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterCondition("new")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  filterCondition === "new"
                    ? "bg-red-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-700"
                }`}
              >
                0 KM
              </button>
              <button
                onClick={() => setFilterCondition("used")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  filterCondition === "used"
                    ? "bg-red-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Usados
              </button>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-red-600/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        vehicle.condition === "new"
                          ? "bg-green-600 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {vehicle.condition === "new" ? "0 KM" : "Usado"}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Año: {vehicle.year}</span>
                    <span className="text-gray-400">
                      Combustible: {vehicle.fuel}
                    </span>
                  </div>
                  {vehicle.mileage && (
                    <div className="mb-4">
                      <span className="text-gray-400">
                        Kilometraje: {vehicle.mileage.toLocaleString()} km
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-red-600">
                      {formatPrice(vehicle.price)}
                    </span>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="bg-gradient-to-r from-black via-gray-900 to-gray-800 backdrop-blur-sm z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestros <span className="text-red-600">Servicios</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ofrecemos una experiencia completa en la compra de tu vehículo,
              con servicios que van más allá de la venta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-gray-800">
              <div className="h-16 w-16 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">0KM</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Vehículos 0 KM</h3>
              <p className="text-gray-300 leading-relaxed">
                Amplia variedad de vehículos nuevos de las mejores marcas, con
                garantía oficial y financiamiento disponible.
              </p>
            </div>

            <div className="bg-black rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-gray-800">
              <Shield className="h-16 w-16 text-red-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Vehículos Usados</h3>
              <p className="text-gray-300 leading-relaxed">
                Vehículos usados seleccionados y certificados, con historial
                verificado y garantía extendida.
              </p>
            </div>

            <div className="bg-black rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-gray-800">
              <Award className="h-16 w-16 text-red-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Financiamiento</h3>
              <p className="text-gray-300 leading-relaxed">
                Planes de financiamiento flexibles adaptados a tu presupuesto,
                con las mejores tasas del mercado.
              </p>
            </div>

            <div className="bg-black rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-gray-800">
              <Users className="h-16 w-16 text-red-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Asesoramiento</h3>
              <p className="text-gray-300 leading-relaxed">
                Nuestro equipo experto te asesora para encontrar el vehículo
                perfecto según tus necesidades.
              </p>
            </div>

            <div className="bg-black rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-gray-800">
              <CheckCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Garantía</h3>
              <p className="text-gray-300 leading-relaxed">
                Todos nuestros vehículos incluyen garantía, para tu total
                tranquilidad y confianza.
              </p>
            </div>

            <div className="bg-black rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-gray-800">
              <div className="h-16 w-16 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">TOMA</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Toma de Usado</h3>
              <p className="text-gray-300 leading-relaxed">
                Evaluamos tu vehículo actual al mejor precio para facilitar el
                cambio por uno nuevo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="bg-gradient-to-r from-black via-gray-500 to-white backdrop-blur-sm z-50 border-b border-white-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Sobre <span className="text-red-600">Ferradas Automotores</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Con más de 5 años de experiencia en el mercado automotriz, nos
                hemos consolidado como una de las concesionarias más confiables
                de la región.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Nuestra misión es ofrecer vehículos de calidad superior, con un
                servicio personalizado que supere las expectativas de nuestros
                clientes. Cada vehículo en nuestro showroom pasa por rigurosos
                controles de calidad.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-red-600 mr-3" />
                  <span className="text-gray-300">
                    Más de 500 vehículos vendidos
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-red-600 mr-3" />
                  <span className="text-gray-300">
                    98% de satisfacción del cliente
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-red-600 mr-3" />
                  <span className="text-gray-300">
                    Garantía en todos nuestros vehículos
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-red-600 mr-3" />
                  <span className="text-gray-300">
                    Financiamiento personalizado
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="../public/Logo-ferradas.jpg"
                alt="Ferradas Automotores Showroom"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-red-600 rounded-xl p-6 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">5+</div>
                  <div className="text-red-100">Años</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestros{" "}
              <span className="text-red-600">Clientes</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mayor recompensa.
              Escucha sus experiencias con Ferradas Automotores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-black rounded-xl p-8 border border-gray-800"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="font-semibold text-white">
                  {testimonial.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-red-600">Contactanos</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Estamos aquí para ayudarte a encontrar tu vehículo ideal.
              Contáctanos y descubre por qué somos la mejor opción.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="flex items-start">
                <MapPin className="h-8 w-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Nuestra Ubicación
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Av. Principal 1234, Ciudad Automotriz
                    <br />
                    Zona Norte, Buenos Aires
                  </p>
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
                  <p className="text-gray-300">
                    ventas@ferradasautomotores.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-8 w-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Horarios de Atención
                  </h3>
                  <p className="text-gray-300">Lunes a Viernes: 9:00 - 18:00</p>
                  <p className="text-gray-300">Sábados: 9:00 - 15:00</p>
                  <p className="text-gray-300">Domingos: Cerrado</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h3>
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Tu teléfono"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="¿En qué vehículo estás interesado?"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 resize-none"
                  ></textarea>
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <img
                  src="../public/logoFerrades.jpg"
                  alt="Ferradas Automotores Logo"
                  className="h-8 w-auto mr-3"
                />
                <span className="text-xl font-bold">FERRADAS AUTOMOTORES</span>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Tu concesionaria de confianza con más de 5 años de experiencia
                en el mercado automotriz. Calidad, confianza y servicio
                excepcional.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#inicio"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#vehiculos"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    Vehículos
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    Servicios
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Vehículos 0 KM</li>
                <li className="text-gray-400">Vehículos Usados</li>
                <li className="text-gray-400">Financiamiento</li>
                <li className="text-gray-400">Toma de Usado</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Ferradas Automotores. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
