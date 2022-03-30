import React, { useState } from "react";
import logo from "images/logo.png";
import { FiGrid, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { NavLink } from "./NavLink";
import { useSelector } from "react-redux";
import { authSelector } from "features";
import { BsPersonCircle } from "react-icons/bs";

const MainNavbar = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector(authSelector);

  function toggleMenu() {
    setOpen(!open);
  }

  const SharedLinks = () => (
    <div className="xl:flex">
      <a
        className="block p-4 outline-none appearance-none"
        onClick={() => toggleMenu()}
        key="documentation"
        href="https://smswithoutborders.github.io/docs/developers/introduction"
        target="_blank"
        rel="noreferrer"
      >
        <span className="ml-2">Documentation</span>
      </a>
      <a
        className="block p-4 outline-none appearance-none"
        onClick={() => toggleMenu()}
        key="Github"
        href="https://github.com/orgs/smswithoutborders/"
        target="_blank"
        rel="noreferrer"
      >
        <span className="ml-2">GitHub</span>
      </a>
    </div>
  );
  const ActionLinks = () => (
    <div className="xl:flex">
      {user.uid ? (
        <div className="flex flex-row items-center justify-between px-6 lg:px-0">
          <div className="flex items-center">
            <BsPersonCircle size={20} />
            <p className="ml-2 text-sm">{user?.email}</p>
          </div>
          <NavLink
            className="font-normal"
            onClick={() => toggleMenu()}
            key="dashboard"
            to="/dashboard"
          >
            <FiGrid size={20} />
            <span className="ml-2">Dashboard</span>
          </NavLink>
        </div>
      ) : (
        <div className="flex justify-center p-6 space-x-2 lg:p-4">
          <Link
            className="px-8 py-2 font-medium border border-gray-300 rounded-2xl hover:border-blue-600"
            onClick={() => toggleMenu()}
            key="login"
            to="/login"
          >
            <span className="ml-2">login</span>
          </Link>

          <Link
            className="px-8 py-2 font-medium text-white bg-blue-800 border-none rounded-2xl"
            onClick={() => toggleMenu()}
            key="signup"
            to="/signup"
          >
            <span className="ml-2">signup</span>
          </Link>
        </div>
      )}
    </div>
  );

  const Logo = () => (
    <Link to="/" className="flex items-center xl:ml-4">
      <img src={logo} alt="logo" className="w-8 h-8 mr-3" />
      <p className="">
        <span className="font-bold">SMSWithoutBorders</span> |
        <span className="font-normal"> Developers</span>
      </p>
    </Link>
  );

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="items-center justify-between hidden xl:flex">
        <Logo />
        <SharedLinks />
        <ActionLinks />
      </nav>
      <div className="xl:hidden">
        <div className="flex items-center justify-between p-4">
          <Logo />
          <button className="appearance-none" onClick={() => toggleMenu()}>
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {open && (
          <Transition
            show={open}
            appear={true}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="flex flex-col w-full h-screen"
          >
            <SharedLinks />
            <ActionLinks />
          </Transition>
        )}
      </div>
    </div>
  );
};

export default MainNavbar;
