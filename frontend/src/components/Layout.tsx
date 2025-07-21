// Layout.tsx
// Componente de layout general para la landing page de Ferradas Automotores.
// Envuelve el contenido principal con el Header, Footer y FloatingSocialButtons.
// Permite reutilizar la estructura base en diferentes vistas o páginas.

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingSocialButtons from "./FloatingSocialButtons";
import { useLocation } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Detectar si estamos en un detail de vehículo
  const isVehicleDetail = location.pathname.startsWith("/vehiculo/");
  return (
    <>
      <Header />
      <main>{children}</main>
      {!isVehicleDetail && <Footer />}
      <FloatingSocialButtons />
    </>
  );
};

export default Layout; 