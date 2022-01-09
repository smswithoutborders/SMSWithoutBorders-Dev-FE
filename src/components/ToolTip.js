import React from "react";
import PropTypes from "prop-types";

// credit to @Alex Suarez on dev.to
export const ToolTip = ({ text, children }) => {
  const tipRef = React.createRef(null);
  function handleMouseEnter() {
    tipRef.current.classList.remove("hidden");
  }
  function handleMouseLeave() {
    tipRef.current.classList.add("hidden");
  }
  return (
    <div
      className="relative flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <small
        className="absolute z-10 hidden px-2 ml-2 text-white bg-gray-500 rounded left-4"
        ref={tipRef}
      >
        {text}
      </small>
    </div>
  );
};

ToolTip.propTypes = {
  text: PropTypes.string.isRequired,
};
