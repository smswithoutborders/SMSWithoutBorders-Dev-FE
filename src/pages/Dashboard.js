import React, { Fragment, useState } from "react";
import { Footer, Navbar, SideNav } from "components";
import { Outlet } from "react-router-dom";
import clsx from "clsx";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  return (
    <Fragment>
      <Navbar open={open} onToggle={() => setOpen(!open)} />
      <div className="grid h-full min-h-screen grid-cols-12 overflow-x-auto bg-gray-100">
        <SideNav
          open={open}
          className="h-full col-span-2 border-r border-gray-200"
        />
        <div
          className={clsx(
            open ? "col-span-full lg:col-span-10" : "col-span-12"
          )}
        >
          <Outlet />
        </div>
      </div>
      <Footer dark fullWidth />
    </Fragment>
  );
};

export default Dashboard;
