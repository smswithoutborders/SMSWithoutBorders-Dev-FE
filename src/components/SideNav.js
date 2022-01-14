import React, { useState } from "react";
import styled from "styled-components";
import clsx from "clsx";
import PropTypes from "prop-types";
import { FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";

//use transient prop isactive
export const SideNavItem = styled(Link).attrs(({ $isactive }) => ({
  className: clsx(
    "w-full px-4 py-3 flex items-center",
    $isactive && "bg-blue-800 text-white"
  ),
}))``;

const SideNav = ({ open, className }) => {
  const [active, setActive] = useState(0);
  return (
    <nav
      className={clsx(
        "hidden h-screen bg-white lg:block w-full",
        !open && "lg:hidden",
        className
      )}
    >
      <SideNavItem
        to="credentials"
        $isactive={active === 0}
        onClick={() => setActive(0)}
      >
        <FiShield size={20} className="mr-2" />
        <span className="">Credentials</span>
      </SideNavItem>
    </nav>
  );
};

SideNav.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default SideNav;
