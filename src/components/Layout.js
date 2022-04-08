import React from "react";
import { MainNavbar, Footer } from "components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      <MainNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
