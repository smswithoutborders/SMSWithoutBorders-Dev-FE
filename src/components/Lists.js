import React from "react";
import PropTypes from "prop-types";

export const SummaryList = ({ list }) => {
  return (
    <div className="inline-flex w-full gap-4 mb-10 overflow-x-auto">
      {Object.keys(list).map((item) => (
        <div
          key={item}
          className={`p-4 bg-gray-700 rounded-md w-[250px] md:w-1/${
            list.length
          } flex-none cursor-move ${item === "total" && "order-first"}`}
        >
          <h3 className="mt-0 text-base font-medium capitalize">{item}</h3>
          <span className="text-3xl font-light">{list[item] ?? "N/A"}</span>
        </div>
      ))}
    </div>
  );
};

SummaryList.propTypes = {
  list: PropTypes.object.isRequired,
};
