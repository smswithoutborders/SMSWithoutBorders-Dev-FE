import React from "react";
import clsx from "clsx";
import { FiEye, FiEyeOff } from "react-icons/fi";
import PropTypes from "prop-types";

export const ToggleButton = ({ value, toggleFunc, className }) => {
  return (
    <div
      className={clsx("flex items-center cursor-pointer", className)}
      onClick={() => toggleFunc(!value)}
    >
      {value ? <FiEyeOff size={16} /> : <FiEye size={16} />}
    </div>
  );
};

ToggleButton.propTypes = {
  value: PropTypes.bool.isRequired,
  toggleFunc: PropTypes.func.isRequired,
};
