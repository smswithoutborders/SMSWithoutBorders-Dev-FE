import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import clsx from "clsx";
import logo from "images/logo.png";

const LoadingContainer = styled.div.attrs(({ className, light }) => ({
  className: clsx(
    "grid place-items-center mx-auto w-full",
    light ? "text-gray-300" : "text-gray-600",
    className
  ),
}))``;

const Spinner = styled.div.attrs(({ className, light }) => ({
  className: clsx(
    "animate-spin rounded-full h-16 w-16 border-b-2 mb-4",
    light ? " border-gray-300" : " border-gray-600",
    className
  ),
}))``;

export const Loader = ({ message, light }) => {
  return (
    <LoadingContainer className="h-screen" light={light}>
      <div>
        <Spinner className="mx-auto" light={light} />
        <p className="mt-2">{message || "processing please wait"} </p>
      </div>
    </LoadingContainer>
  );
};

export const InlineLoader = ({ message, className, light }) => {
  return (
    <LoadingContainer className={clsx("h-80", className)} light={light}>
      <div>
        <Spinner className="mx-auto" light={light} />
        <p className="mt-2">{message || "processing please wait"} </p>
      </div>
    </LoadingContainer>
  );
};

export const SplashScreen = () => {
  return (
    <LoadingContainer className="h-screen">
      <div className="flex items-center text-xl animate-pulse">
        <img className="w-12 h-12 mr-3 md:w-20 md:h-20" src={logo} alt="logo" />
        <h1 className="text-2xl font-black md:text-4xl">SMSWithoutBorders</h1>
      </div>
    </LoadingContainer>
  );
};

Loader.propTypes = {
  message: PropTypes.string,
};

InlineLoader.propTypes = {
  message: PropTypes.string,
};
