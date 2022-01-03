import React from "react";
import PropTypes from "prop-types";

// credit to @Alex Suarez on dev.to
export const ToolTip = ({ text, children }) => {
  const tipRef = React.createRef(null);
  function handleMouseEnter() {
    tipRef.current.style.opacity = 1;
  }
  function handleMouseLeave() {
    tipRef.current.style.opacity = 0;
  }
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className="flex items-center px-2 py-1 ml-2 text-white bg-gray-500 rounded opacity-0"
        ref={tipRef}
      >
        <div
          className="absolute w-3 h-3 ml-2 transform rotate-45 bg-gray-500 left-4"
        />
        <small className="z-10 w-full">{text}</small>
      </div>
    </div>
  );
};

ToolTip.propTypes = {
  text: PropTypes.string.isRequired,
};
