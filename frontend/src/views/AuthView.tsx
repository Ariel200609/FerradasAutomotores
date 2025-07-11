// AuthView.tsx
// Vista de autenticación para login y registro de usuarios en Ferradas Automotores.
// (Actualmente solo estructura, sin lógica de autenticación implementada.)
// Pensado para futuras expansiones de login, registro y recuperación de contraseña.

import React from "react";

const AuthView: React.FC = () => {
  // [NO USADO] Aquí se podría agregar lógica de autenticación, manejo de formularios, etc.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Iniciar Sesión</h2>
        {/* Aquí iría el formulario de login/registro */}
        <div className="text-gray-500 text-center">Funcionalidad en desarrollo...</div>
      </div>
    </div>
  );
};

export default AuthView; 