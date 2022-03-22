import React, { Fragment } from "react";
import logo from "images/logo.png";
import PropTypes from "prop-types";
import { FiLogOut, FiMenu, FiX, FiShield, FiFile } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, logout } from "features";
import { clearCache } from "services/storage";
import { Link } from "react-router-dom";
import { Button } from "./shared";
import { NavLink } from "./NavLink";
import toast from "react-hot-toast";

const DesktopNav = ({ open, onToggle, user, handleLogOut }) => {
  return (
    <nav className="hidden p-4 text-white bg-gray-800 md:block">
      <div className="flex flex-row flex-wrap items-center justify-between">
        <div className="flex items-center">
          <FiMenu
            size={20}
            className="mr-4 cursor-pointer"
            onClick={() => onToggle()}
          />
          <img src={logo} alt="logo" className="inline-block w-6 h-6 mx-auto" />
          <span className="ml-2 font-medium">SMSWithoutBorders</span>
          <span className="ml-1 tracking-wide text-light">Developer</span>
        </div>
        <div className="items-center hidden md:flex">
          <Link to="docs" className="mr-4 text-sm text-gray-300">
            Docs
          </Link>
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
      <nav className="px-4 py-5 text-white bg-gray-800 md:hidden">
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
          <img src={logo} alt="logo" className="inline-block w-6 h-6" />
          <span className="ml-2 font-medium">SMSWithoutBorders</span>
          <span className="ml-1 tracking-wide text-light">Developer</span>
        </div>
      </nav>

      {!open && (
        <div className="absolute z-50 flex flex-col w-full h-full bg-white lg:hidden">
          <div className="">
            <NavLink to="credentials" onClick={() => onToggle()}>
              <FiShield size={20} className="mr-2" />
              <span className="">Credentials</span>
            </NavLink>
            <NavLink to="docs" onClick={() => onToggle()}>
              <FiFile size={20} className="mr-2" />
              <span className="">Docs</span>
            </NavLink>
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
