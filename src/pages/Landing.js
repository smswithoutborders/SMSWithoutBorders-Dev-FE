import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="min-h-screen px-8 py-20 prose  md:p-20">
      <div className="col-span-full lg:col-span-1">
        <h1 className="my-0 text-3xl lg:text-6xl">SMSWithoutBorders</h1>
        <h2 className="my-4 lg:text-5xl">for Developers</h2>

        <p className="my-12 font-light lg:text-2xl">
          Modern tools and resources to help you build experiences that people
          love, faster and easier.
        </p>

        <Link
          className="px-12 py-4 font-medium text-white no-underline bg-blue-800 border-none rounded-3xl"
          key="signup"
          to="/signup"
        >
          <span className="ml-2">signup</span>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
