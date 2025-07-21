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
import VehicleDetailTCross from "./components/VehicleDetailTCross";
import VehicleDetailMaverik from "./components/VehicleDetailMaverik";
import VehicleDetailAmarok from "./components/VehicleDetailAmarok";
import VehicleDetailFocus from "./components/VehicleDetailFocus";
import VehicleDetailOnix from "./components/VehicleDetailOnix";
import VehicleDetailFastback from "./components/VehicleDetailFastback";
import VehicleDetailHilux from "./components/VehicleDetailHilux";
import VehicleDetailAmarokHighline from "./components/VehicleDetailAmarokHighline";
import VehicleDetailHiluxSRV from "./components/VehicleDetailHiluxSRV";
import VehicleDetailRaptor from "./components/VehicleDetailRaptor";
import VehicleDetailEcosport from "./components/VehicleDetailEcosport";
import VehicleDetailUp from "./components/VehicleDetailUp";
import VehicleDetailAmarokV6 from "./components/VehicleDetailAmarokV6";
import VehicleDetailFrontier from "./components/VehicleDetailFrontier";
import VehicleDetailHiluxSRXGris from "./components/VehicleDetailHiluxSRXGris";
import VehicleDetailOroch from "./components/VehicleDetailOroch";
import VehicleDetail307 from "./components/VehicleDetail307";
import VehicleDetailMustang from "./components/VehicleDetailMustang";
import VehicleDetailAmarokHighlineG2 from "./components/VehicleDetailAmarokHighlineG2";
import VehicleDetailAmarokBlackStyleG2 from "./components/VehicleDetailAmarokBlackStyleG2";
import VehicleDetailAmarokComfortlineG2 from "./components/VehicleDetailAmarokComfortlineG2";
import VehicleDetailTCrossBitono from "./components/VehicleDetailTCrossBitono";
import VehicleDetailTaos from "./components/VehicleDetailTaos";
import VehicleDetailPoloTrack from "./components/VehicleDetailPoloTrack";

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
        <Route path="/vehiculo/t-cross" element={<VehicleDetailTCross />} />
        <Route path="/vehiculo/maverik" element={<VehicleDetailMaverik />} />
        <Route path="/vehiculo/amarok" element={<VehicleDetailAmarok />} />
        <Route path="/vehiculo/amarok-highline" element={<VehicleDetailAmarokHighline />} />
        <Route path="/vehiculo/amarok-highline-g2" element={<VehicleDetailAmarokHighlineG2 />} />
        <Route path="/vehiculo/amarok-black-style-g2" element={<VehicleDetailAmarokBlackStyleG2 />} />
        <Route path="/vehiculo/amarok-comfortline-g2" element={<VehicleDetailAmarokComfortlineG2 />} />
        <Route path="/vehiculo/focus" element={<VehicleDetailFocus />} />
        <Route path="/vehiculo/onix" element={<VehicleDetailOnix />} />
        <Route path="/vehiculo/fastback" element={<VehicleDetailFastback />} />
        <Route path="/vehiculo/hilux" element={<VehicleDetailHilux />} />
        <Route path="/vehiculo/hiluxsrv" element={<VehicleDetailHiluxSRV />} />
        <Route path="/vehiculo/raptor" element={<VehicleDetailRaptor />} />
        <Route path="/vehiculo/ecosport" element={<VehicleDetailEcosport />} />
        <Route path="/vehiculo/up" element={<VehicleDetailUp />} />
        <Route path="/vehiculo/amarokv6" element={<VehicleDetailAmarokV6 />} />
        <Route path="/vehiculo/frontier" element={<VehicleDetailFrontier />} />
        <Route path="/vehiculo/hilux-srx-gris" element={<VehicleDetailHiluxSRXGris />} />
        <Route path="/vehiculo/oroch" element={<VehicleDetailOroch />} />
        <Route path="/vehiculo/307" element={<VehicleDetail307 />} />
        <Route path="/vehiculo/mustang" element={<VehicleDetailMustang />} />
        <Route path="/vehiculo/t-cross-bitono" element={<VehicleDetailTCrossBitono />} />
        <Route path="/vehiculo/taos" element={<VehicleDetailTaos />} />
        <Route path="/vehiculo/polo-track" element={<VehicleDetailPoloTrack />} />
        {/* Ruta catch-all para 404: redirige a Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </Layout>
);

export default AppRoutes; 