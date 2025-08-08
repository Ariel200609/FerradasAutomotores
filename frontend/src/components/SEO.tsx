import React from 'react';
import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
};

const defaultTitle = 'Ferradas Automotores | Autos 0km y Usados en Bahía Blanca';
const defaultDescription = 'Concesionaria líder en Bahía Blanca. Venta de autos 0km y usados, financiación, toma de usados y atención personalizada.';
const siteUrl = 'https://ferradasautomotores.com';

const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalCanonical = canonical || siteUrl;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalCanonical} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalCanonical} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
    </Helmet>
  );
};

export default SEO;