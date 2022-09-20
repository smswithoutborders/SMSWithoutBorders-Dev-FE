import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { FiGrid, FiShield } from "react-icons/fi";
import { SideNavLink } from "./NavLinks";

const SideNav = ({ open, className }) => {
  return (
    <nav
      className={clsx(
        "hidden min-h-screen bg-gray-700 lg:block w-full h-full col-span-2",
        !open && "lg:hidden",
        className
      )}
    >
      <SideNavLink to="products">
        <FiGrid size={20} className="mr-2" />
        <span className="">Products</span>
      </SideNavLink>
      <SideNavLink to="credentials">
        <FiShield size={20} className="mr-2" />
        <span className="">Credentials</span>
      </SideNavLink>
    </nav>
  );
};

SideNav.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default SideNav;
