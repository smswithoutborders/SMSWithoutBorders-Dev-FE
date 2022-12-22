import React, { useState, useEffect, useCallback } from "react";
import logo from "images/logo.png";
import { FiGrid, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { ExternalLink, NavLink } from "./NavLinks";
import { useSelector } from "react-redux";
import { authSelector } from "features";
import { BsPersonCircle } from "react-icons/bs";
import clsx from "clsx";

const MainNavbar = () => {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const user = useSelector(authSelector);

  function toggleMenu() {
    setOpen(!open);
  }
  const handleScroll = useCallback(() => {
    if (window.scrollY >= 80) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const SharedLinks = () => (
    <div className="lg:flex">
      <NavLink onClick={() => toggleMenu()} key="/" to="/">
        Home
      </NavLink>
      <ExternalLink
        onClick={() => toggleMenu()}
        key="documentation"
        href="https://smswithoutborders.github.io/docs/developers/account/"
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </ExternalLink>
      <ExternalLink
        onClick={() => toggleMenu()}
        key="Github"
        href="https://github.com/orgs/smswithoutborders/"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </ExternalLink>
    </div>
  );

  const ActionLinks = () => (
    <div className="lg:flex">
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
        <div className="flex flex-col justify-center lg:flex-row lg:space-x-2 lg:mr-4">
          <NavLink
            onClick={() => toggleMenu()}
            key="login"
            to="/login"
            className="flex-1"
          >
            login
          </NavLink>

          <Link
            onClick={() => toggleMenu()}
            key="signup"
            to="/signup"
            className="p-4 text-gray-300 bg-blue-800 border-none lg:px-6 lg:py-2 lg:m-4 lg:rounded-lg"
          >
            signup
          </Link>
        </div>
      )}
    </div>
  );

  const Logo = () => (
    <Link
      to="/"
      className="flex items-center lg:ml-4"
      onClick={() => toggleMenu()}
    >
      <img src={logo} alt="logo" className="w-5 h-5 mr-2" />
      <p className="text-[0.95rem]">
        <span className="font-bold">SMSWithoutBorders</span> |
        <span className="font-normal tracking-widest"> DEVELOPER</span>
      </p>
    </Link>
  );

  return (
    <div
      className={clsx(
        "sticky top-0 z-50 text-gray-300 shadow-3xl mx-auto md:text-sm",
        toggle
          ? "bg-gradient-to-tl md:bg-gradient-to-r from-black via-slate-900 to-slate-900"
          : "bg-transparent"
      )}
    >
      <nav className="justify-between hidden max-w-screen-xl mx-auto lg:flex">
        <Logo />
        <SharedLinks />
        <ActionLinks />
      </nav>
      <nav className="lg:hidden">
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
      </nav>
    </div>
  );
};

export default MainNavbar;
