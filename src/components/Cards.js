import React, { Fragment, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button } from "./shared";
import { FiX } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

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
        "shadow-md rounded-lg bg-gray-700 text-gray-300 p-4",
        open ? "order-first col-span-full" : "col-span-full lg:col-span-3"
      )}
    >
      {open ? (
        <Fragment>
          <div className="flex items-center justify-between">
            <h3 className="my-0 text-gray-300">{label}</h3>
            <FiX
              size={20}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="">
            <p>{description}</p>
            <div className="flex items-center justify-between text-sm md:text-base">
              <a
                className="flex items-center text-gray-300 no-underline outline-none appearance-none"
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
          <h3 className="mt-0 text-gray-300">{label}</h3>
          <p className="truncate">{description}</p>
          <div className="grid grid-cols-3 gap-0 mb-2 text-sm justify-items-start">
            <button className="col-span-1" onClick={() => setOpen(!open)}>
              Summary
            </button>

            <Link
              to={name}
              className="col-span-1 text-gray-300 no-underline appearance-none"
              onClick={() => setOpen(!open)}
            >
              Telemetry
            </Link>

            {subscribed ? (
              <button
                className="col-span-1"
                onClick={() => handleUnSubscription(name)}
              >
                Unsubscribe
              </button>
            ) : (
              <button
                className="col-span-1"
                onClick={() => handleSubscription(name)}
              >
                Subscribe
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
