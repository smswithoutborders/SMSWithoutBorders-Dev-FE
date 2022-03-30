import React, { Fragment } from "react";
import { MainNavbar } from "components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Fragment>
      <MainNavbar />
      <Outlet />
    </Fragment>
  );
};

export default Layout;
