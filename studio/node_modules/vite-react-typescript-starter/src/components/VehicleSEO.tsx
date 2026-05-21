import React from 'react';
import { Helmet } from 'react-helmet-async';

export type VehicleSEOProps = {
  brand: string;
  model: string;
  year: number;
  fuelType?: string;
  mileageKm?: number;
  condition?: 'new' | 'used';
  images: string[];
  canonicalPath: string; // e.g., /vehiculo/amarok
};

const siteUrl = 'https://ferradasautomotores.com';

const VehicleSEO: React.FC<VehicleSEOProps> = ({
  brand,
  model,
  year,
  fuelType,
  mileageKm,
  condition,
  images,
  canonicalPath,
}) => {
  const title = `${brand} ${model} ${year} | Ferradas Automotores`;
  const description = `${brand} ${model} ${year}${mileageKm ? `, ${mileageKm.toLocaleString('es-AR')} km` : ''}${fuelType ? `, ${fuelType}` : ''}. Consultá disponibilidad, financiación y toma de usado.`;
  const canonical = `${siteUrl}${canonicalPath}`;
  const imageAbsolute = images?.[0] ? `${siteUrl}${images[0]}` : `${siteUrl}/LogoFerradas.jpg`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    brand,
    model,
    name: `${brand} ${model}`,
    url: canonical,
    vehicleModelDate: String(year),
    fuelType,
    mileageFromOdometer: mileageKm ? { '@type': 'QuantitativeValue', value: mileageKm, unitCode: 'KMT' } : undefined,
    vehicleCondition: condition === 'new' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
    image: images?.length ? images.map((p) => `${siteUrl}${p}`) : undefined,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageAbsolute} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default VehicleSEO;