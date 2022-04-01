import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

export const Landing = () => {
  return (
    <div className="prose lg:grid lg:grid-cols-2 lg:max-w-full">
      <div className="px-8 py-20 col-span-full lg:col-span-1 md:p-20">
        <h2 className="my-4 font-medium">
          <span className="text-blue-800">SW/OB</span>{" "}
          <span className="font-light"> for</span> Developers
        </h2>
        <h1 className="my-0 lg:text-6xl">Stay Connected</h1>

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

      <div className="grid grid-cols-3 gap-4 px-4 py-10 md:py-20 col-span-full lg:col-span-1">
        <div className="col-span-2 p-8 text-white bg-blue-800 shadow-lg lg:py-16 rounded-2xl">
          <span className="font-light">Tutorial</span>
          <h2 className="my-4 text-white">How to create an account</h2>
          <a
            className="flex items-center justify-between font-light text-white no-underline"
            href="https://smswithoutborders.github.io/docs/developers/getting-started"
            target="_blank"
            rel="noreferrer"
          >
            <span className="mr-2">learn more </span>
            <BsArrowRight size={20} />
          </a>
        </div>
        <div className="col-span-1 shadow-lg bg-slate-800 rounded-2xl"></div>
        <div className="col-span-1 shadow-lg bg-slate-800 rounded-2xl"></div>
        <div className="col-span-2 p-8 text-white bg-blue-800 shadow-lg rounded-2xl"></div>
      </div>
    </div>
  );
};

export default Landing;
