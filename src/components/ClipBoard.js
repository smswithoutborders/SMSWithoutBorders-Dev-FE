import React from "react";
import PropTypes from "prop-types";
import { FiCopy } from "react-icons/fi";
import { ToolTip } from "./ToolTip";
import toast from "react-hot-toast";

export const ClipBoard = ({ size, value, text }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success(`${text} copied to clipboard`);
  };
  return (
    <div
      className="items-center justify-center inline-block cursor-pointer align-center"
      onClick={handleCopy}
    >
      <ToolTip text={`copy ${text}`}>
        <FiCopy size={size || 18} />
      </ToolTip>
    </div>
  );
};

ClipBoard.propTypes = {
  size: PropTypes.number,
  text: PropTypes.string,
  value: PropTypes.string,
};
