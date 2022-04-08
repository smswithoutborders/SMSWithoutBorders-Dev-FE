import React from "react";
import logo from "images/logo.png";
import { FiMail } from "react-icons/fi";
import { ExternalLink } from "./NavLinks";
import { GoMarkGithub } from "react-icons/go";

const Footer = () => {
  return (
    <footer className="flex flex-col px-6 text-white bg-gradient-to-br from-slate-900 to-black md:bg-ransparent md:justify-between lg:flex-row lg:mx-8">
      <a href="https://smswithoutborders.com" className="flex items-center p-4">
        <img src={logo} alt="logo" className="w-8 h-8 mr-3" />
        <p className="text-[0.95rem] md:text-base">
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
    </footer>
  );
};

export default Footer;
