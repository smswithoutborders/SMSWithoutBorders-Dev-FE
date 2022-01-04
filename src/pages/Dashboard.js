import React, { Fragment, useState } from "react";
import { Navbar, SideNav } from "components";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Navbar open={open} onToggle={() => setOpen(!open)} />
      <div className="flex h-screen overflow-auto bg-gray-50">
        <SideNav open={open} />
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Dashboard;
