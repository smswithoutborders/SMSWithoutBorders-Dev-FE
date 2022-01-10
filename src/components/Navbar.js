import React from "react";
import logo from "images/logo.png";
import PropTypes from "prop-types";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, clearAuth } from "features";
import { clearCache } from "services/storage";

const Navbar = ({ open, onToggle }) => {
  const dispatch = useDispatch();
  const user = useSelector(authSelector);

  const handleLogOut = () => {
    dispatch(clearAuth());
    clearCache();
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
        <div className="items-center hidden md:flex">
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

Navbar.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Navbar;
