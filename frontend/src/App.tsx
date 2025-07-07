import React from "react";
import Layout from "./components/Layout";
import HomeView from "./views/HomeView";
import ContactView from "./views/ContactView";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Layout>
        <HomeView />
      </Layout>
    </div>
  );
}

export default App;
