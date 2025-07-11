// AppRoutes.tsx
// Define las rutas principales de la aplicación frontend de Ferradas Automotores.
// Utiliza React Router para enrutar entre Home, Contacto, Autenticación y detalle de vehículos.
// Envuelve las rutas en el componente Layout para mantener la estructura general.

import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Lazy load de vistas principales
const HomeView = React.lazy(() => import("./views/HomeView"));
const ContactView = React.lazy(() => import("./views/ContactView"));
const AuthView = React.lazy(() => import("./views/AuthView"));

// Import de componentes de detalle de vehículos
import VehicleDetail from "./components/VehicleDetail";
import VehicleDetailMaverik from "./components/VehicleDetailMaverik";
import VehicleDetailAmarok from "./components/VehicleDetailAmarok";
import VehicleDetailFocus from "./components/VehicleDetailFocus";
import VehicleDetailOnix from "./components/VehicleDetailOnix";
import VehicleDetailFastback from "./components/VehicleDetailFastback";

// Loader simple para fallback
const Loader = () => <div className="w-full text-center py-12 text-gray-400">Cargando...</div>;

const AppRoutes: React.FC = () => (
  <Layout>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/contact" element={<ContactView />} />
        <Route path="/auth" element={<AuthView />} />
        {/* Rutas individuales para cada modelo de vehículo */}
        <Route path="/vehiculo/t-cross" element={<VehicleDetail />} />
        <Route path="/vehiculo/maverik" element={<VehicleDetailMaverik />} />
        <Route path="/vehiculo/amarok" element={<VehicleDetailAmarok />} />
        <Route path="/vehiculo/focus" element={<VehicleDetailFocus />} />
        <Route path="/vehiculo/onix" element={<VehicleDetailOnix />} />
        <Route path="/vehiculo/fastback" element={<VehicleDetailFastback />} />
        {/* Ruta catch-all para 404: redirige a Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </Layout>
);

export default AppRoutes; 