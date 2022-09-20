import React, { useState } from "react";
import { Footer, Navbar, SideNav } from "components";
import { Outlet } from "react-router-dom";
import clsx from "clsx";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-gray-800">
      <Navbar open={open} onToggle={() => setOpen(!open)} />
      <div className="grid h-full min-h-screen grid-cols-12 overflow-x-auto bg-gray-800">
        <SideNav open={open} />
        <div
          className={clsx(
            open ? "col-span-full lg:col-span-10" : "col-span-12"
          )}
        >
          <Outlet />
        </div>
      </div>
      <Footer fullWidth />
    </div>
  );
};

export default Dashboard;
