import React, { Fragment, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button } from "./shared";
import { FiX } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

export const ProductCard = ({
  name,
  label,
  subscribed,
  description,
  documentation,
  handleSubscription,
  handleUnSubscription,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={clsx(
        "shadow-md rounded-lg border border-gray-200 bg-white",
        open
          ? "order-first col-span-full px-6 lg:px-8"
          : "col-span-full lg:col-span-3 p-4"
      )}
    >
      {open ? (
        <Fragment>
          <div className="flex items-center justify-between">
            <h3 className="my-2">{label}</h3>
            <FiX
              size={28}
              className="text-gray-500 cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mb-8">
            <p>{description}</p>

            <div className="flex items-center justify-between">
              <a
                className="flex items-center text-blue-800 no-underline outline-none appearance-none"
                href={documentation}
                target="_blank"
                rel="noreferrer"
              >
                <FiExternalLink size={20} />
                <span className="ml-2">Documentation</span>
              </a>
              {subscribed ? (
                <Button
                  outline
                  className="py-1"
                  onClick={() => handleUnSubscription(name)}
                >
                  unsubscribe
                </Button>
              ) : (
                <Button
                  className="py-1"
                  onClick={() => handleSubscription(name)}
                >
                  subscribe
                </Button>
              )}
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="">
          <h3 className="my-2">{label}</h3>
          <p className="truncate">{description}</p>
          <div className="grid grid-cols-2 gap-0">
            <button
              className="flex items-center text-sm text-blue-800 cols-span-1"
              onClick={() => setOpen(!open)}
            >
              <span className="mr-2">learn more </span>
              <BsArrowRight />
            </button>

            {subscribed ? (
              <button
                className="col-span-1 text-sm text-blue-800"
                onClick={() => handleUnSubscription(name)}
              >
                unsubscribe
              </button>
            ) : (
              <button
                className="col-span-1 text-sm text-blue-800"
                onClick={() => handleSubscription(name)}
              >
                subscribe
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  documentation: PropTypes.string.isRequired,
  subscribed: PropTypes.bool,
  handleSubscription: PropTypes.func.isRequired,
  handleUnSubscription: PropTypes.func.isRequired,
};
