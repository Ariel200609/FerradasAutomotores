// ContactView.tsx
// Vista dedicada al contacto en Ferradas Automotores.
// Reutiliza el componente ContactSection para mostrar el formulario y la información de contacto.
// Pensado para usarse como página independiente si se navega a /contact.

import React from "react";
import ContactSection from "../components/ContactSection";

const ContactView: React.FC = () => {
  return <ContactSection />;
};

export default ContactView; 