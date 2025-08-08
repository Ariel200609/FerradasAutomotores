// App.tsx
// Componente raíz de la aplicación Ferradas Automotores.
// Configura el Router y renderiza las rutas principales usando AppRoutes.
// Puede incluir lógica global de contexto, temas, etc. en el futuro.

import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import SplashScreen from "./components/SplashScreen";

const App: React.FC = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <BrowserRouter>
      {!splashDone && (
        <SplashScreen onFinish={() => setSplashDone(true)} />
      )}
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
