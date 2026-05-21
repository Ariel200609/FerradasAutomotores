import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useVehicleBySlug } from '../hooks/useVehicles'
import { urlFor } from '../lib/sanity'
import SEO from './SEO'
import {
  ChevronRight,
  ArrowLeft,
  Fuel,
  Gauge,
  Settings,
  Cog,
  Zap,
  Palette,
  DoorOpen,
} from 'lucide-react'

const specIconMap: Record<string, React.ElementType> = {
  Combustible: Fuel,
  Kilometraje: Gauge,
  Transmisión: Settings,
  Tracción: Cog,
  Motor: Cog,
  Potencia: Zap,
  Color: Palette,
  Puertas: DoorOpen,
}

const VehicleDetailDynamic: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { vehicle, loading } = useVehicleBySlug(slug || '')
  const [currentImage, setCurrentImage] = React.useState(0)

  /* ───────── Loading skeleton ───────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-vehicles-page pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Image skeleton */}
            <div className="skeleton rounded-2xl aspect-[4/3]" />

            {/* Info skeletons */}
            <div className="flex flex-col gap-4">
              <div className="skeleton rounded-xl h-10 w-3/4" />
              <div className="skeleton rounded-xl h-6 w-1/3" />
              <div className="grid grid-cols-2 gap-3 mt-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="skeleton rounded-xl h-20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ───────── Not found ───────── */
  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-vehicles-page">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-2">Vehículo no encontrado</p>
          <p className="text-gray-500 mb-6">Es posible que este vehículo ya no esté disponible.</p>
          <Link
            to="/vehiculos"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Ver todos los vehículos
          </Link>
        </div>
      </div>
    )
  }

  /* ───────── Image URLs ───────── */
  const imageUrls: string[] = vehicle.images?.length
    ? vehicle.images.map((img: any) => {
        if (img && (img._type === 'image' || img.asset)) {
          return urlFor(img).width(1200).url();
        }
        if (typeof img === 'string') {
          return img;
        }
        return '/placeholder-car.jpg';
      })
    : ['/placeholder-car.jpg']

  /* ───────── WhatsApp ───────── */
  const whatsappMsg = encodeURIComponent(
    `Hola! Me interesa el ${vehicle.brand} ${vehicle.model} ${vehicle.year}. ¿Podría darme más información?`
  )

  /* ───────── Specs list ───────── */
  const specs = [
    { label: 'Combustible', value: vehicle.fuel },
    vehicle.condition === 'used' && vehicle.mileage != null
      ? { label: 'Kilometraje', value: `${vehicle.mileage.toLocaleString()} km` }
      : null,
    vehicle.transmission ? { label: 'Transmisión', value: vehicle.transmission } : null,
    vehicle.drivetrain ? { label: 'Tracción', value: vehicle.drivetrain } : null,
    vehicle.engine ? { label: 'Motor', value: vehicle.engine } : null,
    vehicle.powerHp ? { label: 'Potencia', value: `${vehicle.powerHp} HP` } : null,
    vehicle.color ? { label: 'Color', value: vehicle.color } : null,
    vehicle.doors ? { label: 'Puertas', value: `${vehicle.doors}` } : null,
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="min-h-screen bg-vehicles-page pt-20 pb-16">
      <SEO
        title={`${vehicle.brand} ${vehicle.model} ${vehicle.year} | Ferradas Automotores`}
        description={
          vehicle.description ||
          `${vehicle.brand} ${vehicle.model} ${vehicle.year} - ${
            vehicle.condition === 'new' ? '0 KM' : `${vehicle.mileage?.toLocaleString()} km`
          }. Consultá en Ferradas Automotores.`
        }
        canonical={`https://ferradasautomotores.com/vehiculo/${slug}`}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Breadcrumb ── */}
        <nav className="mb-6 sm:mb-8 flex items-center gap-1.5 text-sm text-gray-400 flex-wrap">
          <Link to="/" className="hover:text-red-600 transition">
            Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/vehiculos" className="hover:text-red-600 transition">
            Vehículos
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">
            {vehicle.brand} {vehicle.model}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* ══════════ Image gallery ══════════ */}
          <div className="animate-fade-in-up">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-100">
              <img
                key={currentImage}
                src={imageUrls[currentImage]}
                alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
                className="w-full h-full object-cover animate-fade-in"
              />

              {/* Condition badge */}
              {vehicle.condition === 'new' ? (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-600 to-red-500 shadow-lg badge-glow">
                  0 KM
                </span>
              ) : (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white glass-dark shadow-lg">
                  Usado
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {imageUrls.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-none">
                {imageUrls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`flex-shrink-0 w-16 h-14 sm:w-20 sm:h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                      currentImage === idx
                        ? 'ring-2 ring-red-600 ring-offset-2'
                        : 'ring-0 hover:ring-2 hover:ring-red-400 hover:ring-offset-2 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ══════════ Vehicle info ══════════ */}
          <div className="flex flex-col gap-6 animate-fade-in-up stagger-2">
            {/* Title + price */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="text-base sm:text-lg text-gray-400 font-medium mt-1">Año {vehicle.year}</p>
              {vehicle.priceUsd && (
                <p className="text-2xl sm:text-3xl font-extrabold text-red-600 mt-2 sm:mt-3">
                  USD {vehicle.priceUsd.toLocaleString()}
                </p>
              )}
            </div>

            {/* ── Specs grid ── */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {specs.map((spec, idx) => {
                const Icon = specIconMap[spec.label] || Cog
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-100 transition-all duration-200"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="text-red-500 w-4 h-4" />
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        {spec.label}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-gray-800">{spec.value}</p>
                  </div>
                )
              })}
            </div>

            {/* ── Description ── */}
            {vehicle.description && (
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 border-l-4 border-l-red-500">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Descripción</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{vehicle.description}</p>
              </div>
            )}

            {/* ── CTA buttons ── */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <a
                href={`https://wa.me/5492923695246?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
              <button
                onClick={() => navigate(`/consultar?vehiculoId=${vehicle._id}`)}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold py-4 px-6 rounded-xl transition-all hover:-translate-y-0.5 bg-white"
              >
                Enviar consulta
              </button>
            </div>

            {/* Back link */}
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-400 hover:text-red-600 transition inline-flex items-center gap-1 self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              Ver todos los vehículos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleDetailDynamic
