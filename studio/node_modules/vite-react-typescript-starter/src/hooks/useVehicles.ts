// src/hooks/useVehicles.ts
// Muestra los datos estáticos inmediatamente.
// Cuando Sanity responde, los datos nuevos aparecen al principio.

import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { vehicles as staticVehicles } from '../data/vehicles'

export type SanityVehicle = {
  _id: string
  brand: string
  model: string
  year: number
  condition: 'new' | 'used'
  fuel: string
  mileage?: number
  priceUsd?: number
  images: any[]
  slug: { current: string }
  engine?: string
  transmission?: string
  drivetrain?: string
  powerHp?: number
  torqueNm?: number
  doors?: number
  color?: string
  description?: string
  id?: number
}

const VEHICLES_QUERY = `*[_type == "vehicle"] | order(_createdAt desc) {
  _id, brand, model, year, condition, fuel, mileage, priceUsd,
  images, slug, engine, transmission, drivetrain, powerHp,
  torqueNm, doors, color, description
}`

// Convertir datos estáticos al formato SanityVehicle
const formattedStatic: SanityVehicle[] = staticVehicles.map(v => ({
  ...v,
  _id: `static-${v.id}`,
  slug: { current: `static-${v.id}` }
}))

export function useVehicles() {
  // Iniciar con datos estáticos para que la página nunca aparezca vacía
  const [vehicles, setVehicles] = useState<SanityVehicle[]>(formattedStatic)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    client
      .fetch<SanityVehicle[]>(VEHICLES_QUERY)
      .then((sanityData) => {
        if (sanityData && sanityData.length > 0) {
          // Los de Sanity primero (más recientes), luego los estáticos
          setVehicles([...sanityData, ...formattedStatic])
        }
        // Si Sanity devuelve vacío, mantenemos los estáticos ya cargados
      })
      .catch((err) => {
        console.warn('Sanity no disponible, usando datos locales:', err)
        setError('Usando datos locales.')
      })
  }, [])

  return { vehicles, loading, error }
}

export function useVehicleBySlug(slug: string) {
  const [vehicle, setVehicle] = useState<SanityVehicle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    // Si es un vehículo estático, buscarlo localmente
    if (slug.startsWith('static-')) {
      const id = parseInt(slug.replace('static-', ''))
      const found = formattedStatic.find(v => v.id === id)
      setVehicle(found || null)
      setLoading(false)
      return
    }

    // Si no, buscarlo en Sanity
    client
      .fetch<SanityVehicle>(
        `*[_type == "vehicle" && slug.current == $slug][0]{
          _id, brand, model, year, condition, fuel, mileage, priceUsd,
          images, slug, engine, transmission, drivetrain, powerHp,
          torqueNm, doors, color, description
        }`,
        { slug }
      )
      .then((data) => {
        setVehicle(data || null)
        setLoading(false)
      })
      .catch(() => {
        setVehicle(null)
        setLoading(false)
      })
  }, [slug])

  return { vehicle, loading }
}
