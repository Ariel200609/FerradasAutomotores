import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import VehicleDetail from "./components/VehicleDetail";
import Layout from "./components/Layout";

const AppRoutes: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/vehiculo/t-cross" element={<VehicleDetail />} />
    </Routes>
  </Layout>
);

export default AppRoutes; 