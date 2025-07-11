// App.tsx
// Componente raíz de la aplicación Ferradas Automotores.
// Configura el Router y renderiza las rutas principales usando AppRoutes.
// Puede incluir lógica global de contexto, temas, etc. en el futuro.

import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
