import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Vehicle } from "../data/vehicles";

interface DynamicVehicleDetailProps {
  vehicle?: Vehicle;
}

const DynamicVehicleDetail: React.FC<DynamicVehicleDetailProps> = ({ vehicle: propVehicle }) => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [vehicle, setVehicle] = useState<Vehicle | null>(propVehicle || null);

  useEffect(() => {
    if (!propVehicle && vehicleId) {
      // Buscar vehículo en localStorage (para vehículos nuevos)
      const savedVehicles = JSON.parse(localStorage.getItem('newVehicles') || '[]');
      const foundVehicle = savedVehicles.find((v: Vehicle) => v.id.toString() === vehicleId);
      
      if (foundVehicle) {
        setVehicle(foundVehicle);
      } else {
        // Si no se encuentra, redirigir a vehículos
        navigate('/vehiculos');
      }
    }
  }, [vehicleId, propVehicle, navigate]);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando vehículo...</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
  };

  // Generar especificaciones dinámicamente
  const getSpecs = () => {
    const specs = [
      { label: "Año", value: vehicle.year.toString() },
      { label: "Condición", value: vehicle.condition === 'new' ? '0 KM' : 'Usado' },
      { label: "Combustible", value: vehicle.fuel },
    ];

    if (vehicle.mileage && vehicle.condition === 'used') {
      specs.push({ label: "Kilometraje", value: `${vehicle.mileage.toLocaleString()} km` });
    }

    if (vehicle.engine) {
      specs.push({ label: "Motor", value: vehicle.engine });
    }

    if (vehicle.transmission) {
      specs.push({ label: "Transmisión", value: vehicle.transmission });
    }

    if (vehicle.drivetrain) {
      specs.push({ label: "Tracción", value: vehicle.drivetrain });
    }

    if (vehicle.powerHp) {
      specs.push({ label: "Potencia", value: `${vehicle.powerHp} HP` });
    }

    if (vehicle.torqueNm) {
      specs.push({ label: "Torque", value: `${vehicle.torqueNm} Nm` });
    }

    if (vehicle.color) {
      specs.push({ label: "Color", value: vehicle.color });
    }

    if (vehicle.doors) {
      specs.push({ label: "Puertas", value: vehicle.doors.toString() });
    }

    if (vehicle.bodyType) {
      specs.push({ label: "Tipo", value: vehicle.bodyType });
    }

    if (vehicle.priceUsd) {
      specs.push({ label: "Precio", value: `USD $${vehicle.priceUsd.toLocaleString()}` });
    }

    return specs;
  };

  const specs = getSpecs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con botón de regreso */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Título del vehículo */}
          <div className="px-6 py-4 border-b bg-gradient-to-r from-red-600 to-red-700">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="text-red-100 mt-1">
              Año {vehicle.year} • {vehicle.condition === 'new' ? 'Nuevo (0 KM)' : 'Usado'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Galería de imágenes */}
            <div className="space-y-4">
              <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                {vehicle.images.length > 0 ? (
                  <>
                    <img
                      src={vehicle.images[currentImageIndex]}
                      alt={`${vehicle.brand} ${vehicle.model} - Imagen ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-car.jpg'; // Imagen de fallback
                      }}
                    />
                    
                    {vehicle.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight size={24} />
                        </button>
                        
                        {/* Indicadores */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {vehicle.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-3 h-3 rounded-full transition-colors ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🚗</div>
                      <p>Sin imágenes disponibles</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {vehicle.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {vehicle.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-red-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-car.jpg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Especificaciones */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Especificaciones Técnicas
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {specs.map((spec, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 font-medium">
                        {spec.label}
                      </div>
                      <div className="text-lg font-semibold text-gray-900 mt-1">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-4 pt-6 border-t">
                <button
                  onClick={() => navigate(`/consultar?vehiculoId=${vehicle.id}`)}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
                >
                  💬 Consultar por WhatsApp
                </button>
                
                <button
                  onClick={() => navigate('/comparar')}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  ⚖️ Comparar con otros vehículos
                </button>
              </div>

              {/* Información adicional */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h3 className="font-semibold text-red-900 mb-2">
                  🏆 ¿Por qué elegir Ferradas Automotores?
                </h3>
                <ul className="text-red-800 space-y-1 text-sm">
                  <li>✅ Más de 5 años de experiencia</li>
                  <li>✅ Garantía en todos nuestros vehículos</li>
                  <li>✅ Financiamiento disponible</li>
                  <li>✅ Asesoramiento personalizado</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicVehicleDetail;
