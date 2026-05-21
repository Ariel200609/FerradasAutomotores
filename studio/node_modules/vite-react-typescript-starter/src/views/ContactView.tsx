// ContactView.tsx
// Vista dedicada al contacto en Ferradas Automotores.
// Reutiliza el componente ContactSection para mostrar el formulario y la información de contacto.
// Pensado para usarse como página independiente si se navega a /contact.

import React from 'react';
import SEO from '../components/SEO';
import ContactSection from '../components/ContactSection';

const ContactView: React.FC = () => {
  return (
    <>
      <SEO
        title="Contacto | Ferradas Automotores"
        description="Contactate con Ferradas Automotores para consultas, financiación, toma de usados y más. Respondemos rápido."
        canonical="https://ferradasautomotores.com/#contact"
      />
      <ContactSection />
    </>
  );
};

export default ContactView; 