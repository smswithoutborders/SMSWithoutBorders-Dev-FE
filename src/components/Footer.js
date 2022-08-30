import React from "react";
import PropTypes from "prop-types";
import logo from "images/logo.png";
import { FiMail } from "react-icons/fi";
import { ExternalLink } from "./NavLinks";
import { GoMarkGithub } from "react-icons/go";

const Footer = ({ dark, fullWidth }) => {
  return (
    <footer
      className={`px-6 mx-auto text-sm md:bg-transparent ${
        dark ? "text-gray-600" : "text-gray-300"
      }`}
    >
      <div
        className={`flex flex-col  mx-auto lg:justify-between lg:flex-row ${
          fullWidth ? "max-w-screen" : "max-w-screen-xl"
        }`}
      >
        <a
          href="https://smswithoutborders.com"
          className="flex items-center p-4"
        >
          <img src={logo} alt="logo" className="w-5 h-5 mr-3" />
          <p className="text-[0.95rem]">
            <span className="font-bold">SMSWithoutBorders</span>
          </p>
        </a>
        <ExternalLink href="mailto:developers@smswithoutborders.com">
          <FiMail size={20} />
          <span className="ml-2">developers@smswithoutborders.com</span>
        </ExternalLink>
        <ExternalLink
          key="github"
          href="https://github.com/smswithoutborders"
          target="_blank"
        >
          <GoMarkGithub size={20} />
          <span className="ml-2">smswithoutborders</span>
        </ExternalLink>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  dark: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default Footer;
