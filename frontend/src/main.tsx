// main.tsx
// Punto de entrada principal de la aplicación Ferradas Automotores (frontend).
// Renderiza el componente App en el elemento root del DOM.
// Incluye import de estilos globales y configuración de React StrictMode.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
