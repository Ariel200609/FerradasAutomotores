import React from 'react';
import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  schema?: string;
};

const defaultTitle = 'Ferradas Automotores | Autos 0km y Usados en Laguna Alsina (Bonifacio)';
const defaultDescription = 'Concesionaria en Laguna Alsina (Bonifacio). Venta de 0km y usados, financiación, permuta y atención personalizada.';
const siteUrl = 'https://ferradasautomotores.com';
const defaultImage = `${siteUrl}/LogoFerradas.jpg`;

const SEO: React.FC<SEOProps> = ({ title, description, canonical, image, schema }) => {
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalCanonical = canonical || siteUrl;
  const finalImage = image || defaultImage;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalCanonical} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      {schema && (
        <script type="application/ld+json">
          {schema}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;