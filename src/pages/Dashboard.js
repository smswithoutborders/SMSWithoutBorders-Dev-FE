import React, { Fragment, useState } from "react";
import { Navbar, SideNav } from "components";
import { Outlet } from "react-router-dom";
import clsx from "clsx";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  return (
    <Fragment>
      <Navbar open={open} onToggle={() => setOpen(!open)} />
      <div className="grid h-screen grid-cols-12 bg-gray-50">
        <SideNav open={open} className="col-span-2" />
        <div
          className={clsx(
            open ? "col-span-full lg:col-span-10" : "col-span-12"
          )}
        >
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
