import React, { Fragment } from "react";
import logo from "images/logo.png";
import PropTypes from "prop-types";
import {
  FiLogOut,
  FiMenu,
  FiX,
  FiShield,
  FiGrid,
  FiFile,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, logout } from "features";
import { clearCache } from "services/storage";
import { Button } from "./shared";
import { NavLink, ExternalLink } from "./NavLinks";
import toast from "react-hot-toast";

const DesktopNav = ({ onToggle, user, handleLogOut }) => {
  return (
    <nav className="sticky top-0 hidden p-4 text-sm text-gray-300 bg-gradient-to-r from-black to-slate-900 md:block">
      <div className="flex flex-row flex-wrap items-center justify-between">
        <div className="flex items-center">
          <FiMenu
            size={20}
            className="mr-4 cursor-pointer"
            onClick={() => onToggle()}
          />
          <img src={logo} alt="logo" className="inline-block w-5 h-5 mr-2" />
          <span className="font-bold">SMSWithoutBorders</span>
          <span> &nbsp; | &nbsp;</span>
          <span className="font-normal tracking-widest"> DEVELOPER</span>
        </div>
        <div className="items-center hidden md:flex">
          <ExternalLink
            onClick={() => onToggle()}
            key="documentation"
            href="https://smswithoutborders.github.io/docs/developers/introduction"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-0 font-normal"
          >
            Docs
          </ExternalLink>
          <div className="flex items-center justify-center mr-2 bg-gray-100 rounded-full w-7 h-7">
            <p className="font-bold text-center text-gray-800">
              {user?.email.charAt(0)}
            </p>
          </div>
          <p className="mr-4 text-sm text-gray-300">{user?.email}</p>
          <button
            onClick={() => handleLogOut()}
            className="flex items-center px-2 py-1 text-sm border rounded-lg"
          >
            <FiLogOut className="mr-1 align-middle" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// all parameters are  gotten from the parent Dashboard component

const MobileNav = ({ open, onToggle, user, handleLogOut }) => {
  return (
    <Fragment>
      <nav className="sticky top-0 z-50 px-4 py-5 text-sm text-gray-300 bg-gray-800 md:hidden">
        <div className="flex">
          {!open ? (
            <FiX
              size={20}
              className="mr-4 cursor-pointer"
              onClick={() => onToggle()}
            />
          ) : (
            <FiMenu
              size={20}
              className="mr-4 cursor-pointer"
              onClick={() => onToggle()}
            />
          )}
          <img src={logo} alt="logo" className="inline-block w-5 h-5" />
          <span className="ml-2 font-bold">SMSWithoutBorders</span>
          <span> &nbsp; | &nbsp;</span>
          <span className="ml-1 font-normal tracking-widest text-light">
            DEVELOPER
          </span>
        </div>
      </nav>

      {!open && (
        <div className="absolute z-50 flex flex-col w-full h-full bg-white lg:hidden">
          <div className="">
            <NavLink to="products" onClick={() => onToggle()}>
              <FiGrid size={20} className="mr-2" />
              <span className="">Products</span>
            </NavLink>
            <NavLink to="credentials" onClick={() => onToggle()}>
              <FiShield size={20} className="mr-2" />
              <span className="">Credentials</span>
            </NavLink>
            <ExternalLink
              onClick={() => onToggle()}
              key="documentation"
              href="https://smswithoutborders.github.io/docs/developers/introduction"
              target="_blank"
              rel="noreferrer"
              className="font-normal"
            >
              <FiFile size={20} className="mr-2" />
              <span className="">Docs</span>
            </ExternalLink>
          </div>

          <div className="flex items-center justify-between px-4 py-5 bg-gray-100">
            <div className="flex items-center">
              <div className="flex items-center justify-center mr-2 bg-white rounded-full w-7 h-7">
                <p className="font-bold text-center text-gray-800">
                  {user?.email.charAt(0)}
                </p>
              </div>
              <p className="mr-4 text-sm">{user?.email}</p>
            </div>
            <Button
              onClick={() => handleLogOut()}
              className="text-sm rounded-lg"
            >
              <FiLogOut className="mr-1 align-middle" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const Navbar = ({ open, onToggle }) => {
  const dispatch = useDispatch();
  const user = useSelector(authSelector);
  const handleLogOut = () => {
    dispatch(logout());
    clearCache();
    toast.success("Logout successful");
  };

  return (
    <Fragment>
      <DesktopNav
        open={open}
        onToggle={onToggle}
        user={user}
        handleLogOut={handleLogOut}
      />

      <MobileNav
        open={open}
        onToggle={onToggle}
        user={user}
        handleLogOut={handleLogOut}
      />
    </Fragment>
  );
};

Navbar.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Navbar;
