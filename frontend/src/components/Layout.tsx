import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingSocialButtons from "./FloatingSocialButtons";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
    <FloatingSocialButtons />
  </>
);

export default Layout; 