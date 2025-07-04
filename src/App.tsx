import React from "react";
import Header from "./components/Header";
import HomeView from "./views/HomeView";
import ContactView from "./views/ContactView";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HomeView />
      <ContactView />
      <Footer />
    </div>
  );
}

export default App;
