// AppRoutes.tsx
// Define las rutas principales de la aplicación frontend de Ferradas Automotores.
// Utiliza React Router para enrutar entre Home, Contacto y Autenticación.
// Envuelve las rutas en el componente Layout para mantener la estructura general.

import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Lazy load de vistas principales
const HomeView = React.lazy(() => import("./views/HomeView"));
const ContactView = React.lazy(() => import("./views/ContactView"));
const AuthView = React.lazy(() => import("./views/AuthView"));

// Loader simple para fallback
const Loader = () => <div className="w-full text-center py-12 text-gray-400">Cargando...</div>;

const AppRoutes: React.FC = () => (
  <Layout>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/contact" element={<ContactView />} />
        <Route path="/auth" element={<AuthView />} />
        {/* Ruta catch-all para 404: redirige a Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </Layout>
);

export default AppRoutes; 