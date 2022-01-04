import React from "react";
import logo from "images/logo.png";
import { FiLogOut, FiMenu } from "react-icons/fi";
import PropTypes from "prop-types";

const Navbar = ({ open, onToggle }) => {
  const handleLogOut = () => {
    // handle logout here
  };

  return (
    <nav className="px-4 py-3 text-white bg-gray-800">
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
        <button
          onClick={() => handleLogOut()}
          className="items-center hidden px-2 py-1 text-sm border rounded-lg md:flex"
        >
          <FiLogOut className="mr-1" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Navbar;
