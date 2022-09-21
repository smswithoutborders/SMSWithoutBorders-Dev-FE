import React from "react";
import { Button } from "./shared";
import PropTypes from "prop-types";

export const Error = ({ callBack = () => null }) => {
  return (
    <div className="max-w-screen-xl p-6 mx-auto mt-20 prose prose-invert">
      <h2>An error occured</h2>
      <p className="">
        We are terribly sorry. If the error persists, please
        contact support
      </p>
      <Button onClick={() => callBack()}>try again</Button>
    </div>
  );
};

Error.propTypes = {
  callBack: PropTypes.func.isRequired,
};
