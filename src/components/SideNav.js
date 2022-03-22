import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { FiShield } from "react-icons/fi";
import { NavLink } from "./NavLink";

const SideNav = ({ open, className }) => {
  return (
    <nav
      className={clsx(
        "hidden h-screen bg-white lg:block w-full",
        !open && "lg:hidden",
        className
      )}
    >
      <NavLink to="credentials">
        <FiShield size={20} className="mr-2" />
        <span className="">Credentials</span>
      </NavLink>
    </nav>
  );
};

SideNav.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default SideNav;
