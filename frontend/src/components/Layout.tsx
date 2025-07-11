// Layout.tsx
// Componente de layout general para la landing page de Ferradas Automotores.
// Envuelve el contenido principal con el Header, Footer y FloatingSocialButtons.
// Permite reutilizar la estructura base en diferentes vistas o páginas.

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingSocialButtons from "./FloatingSocialButtons";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
    <FloatingSocialButtons />
  </>
);

export default Layout; 