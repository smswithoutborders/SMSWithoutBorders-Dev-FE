import React, { Fragment, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button } from "./shared";
import { FiX } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";

export const ProductCard = ({
  title,
  subscribed,
  handleSubscription,
  handleUnSubscription,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={clsx(
        "shadow-md rounded-lg border border-gray-200",
        open
          ? "order-first col-span-full px-6 lg:px-8"
          : "col-span-full lg:col-span-3 p-4"
      )}
    >
      {open ? (
        <Fragment>
          <div className="flex items-center justify-between">
            <h3 className="my-2">{title}</h3>
            <FiX
              size={28}
              className="text-gray-500 cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mb-8">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores odit cumque esse provident saepe voluptatem
              consequatur, voluptate eum exercitationem eaque.
            </p>

            {subscribed ? (
              <Button
                outline
                className="py-1"
                onClick={() => handleUnSubscription(title)}
              >
                unsubscribe
              </Button>
            ) : (
              <Button
                className="py-1"
                onClick={() => handleSubscription(title)}
              >
                subscribe
              </Button>
            )}
          </div>
        </Fragment>
      ) : (
        <div className="">
          <h3 className="my-2">{title}</h3>
          <p>Lorem ipsum dolor sit.</p>

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
                onClick={() => handleUnSubscription(title)}
              >
                unsubscribe
              </button>
            ) : (
              <button
                className="col-span-1 text-sm text-blue-800"
                onClick={() => handleSubscription(title)}
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
  title: PropTypes.string.isRequired,
  handleSubscription: PropTypes.func.isRequired,
};
