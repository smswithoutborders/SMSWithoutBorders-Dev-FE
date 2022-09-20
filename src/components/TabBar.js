import React from "react";
import PropTypes from "prop-types";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TabBar = ({ title, children }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-4 py-3 md:px-6">
      <div className="flex items-center">
        <FiArrowLeftCircle
          size={22}
          className="mr-3 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="">{title || "title"}</h2>
      </div>
      {children}
    </div>
  );
};

TabBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TabBar;
