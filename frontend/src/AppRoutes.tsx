import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./views/HomeView";
import VehicleDetail from "./components/VehicleDetail";
import VehicleDetailMaverik from "./components/VehicleDetailMaverik";
import VehicleDetailAmarok from "./components/VehicleDetailAmarok";
import VehicleDetailFocus from "./components/VehicleDetailFocus";
import VehicleDetailOnix from "./components/VehicleDetailOnix";
import VehicleDetailFastback from "./components/VehicleDetailFastback";
import Layout from "./components/Layout";

const AppRoutes: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/vehiculo/t-cross" element={<VehicleDetail />} />
      <Route path="/vehiculo/maverik" element={<VehicleDetailMaverik />} />
      <Route path="/vehiculo/amarok" element={<VehicleDetailAmarok />} />
      <Route path="/vehiculo/focus" element={<VehicleDetailFocus />} />
      <Route path="/vehiculo/onix" element={<VehicleDetailOnix />} />
      <Route path="/vehiculo/fastback" element={<VehicleDetailFastback />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Layout>
);

export default AppRoutes; 