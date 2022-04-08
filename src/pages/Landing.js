import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

export const Landing = () => {
  return (
    <div className="w-full h-full overflow-hidden lg:py-20">
      <div className="container grid max-w-screen-xl grid-cols-2 gap-4 mx-auto prose text-white xl:place-items-center">
        <div className="p-8 pt-16 md:pl-16 col-span-full lg:col-span-1">
          <h1 className="my-4 text-2xl font-medium text-white">
            <span className="text-blue-800">SW/OB</span>
            <span className="font-light text-white"> for</span> Developers
          </h1>
          <h1 className="my-0 text-white lg:text-6xl">Stay Connected</h1>

          <p className="my-12 font-light lg:text-xl">
            Modern tools and resources to help you build experiences that people
            love, faster and easier.
          </p>

          <Link
            className="inline-flex items-center justify-center flex-1 px-12 py-3 text-lg text-white no-underline bg-blue-800 appearance-none group rounded-3xl"
            to="signup"
          >
            <span className="mr-2 group-hover:mr-4">Sign Up</span>
            <BsArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 px-4 py-10 md:py-20 col-span-full lg:col-span-1 lg:mb-28">
          <div className="col-span-2 p-8 text-white shadow-xl bg-gradient-to-br from-blue-800 to-black lg:py-16 rounded-2xl">
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
          <div className="col-span-1 border border-gray-800 shadow-xl rounded-2xl"></div>
          <div className="col-span-1 border border-gray-800 shadow-xl rounded-2xl"></div>
          <div className="col-span-2 p-8 text-white shadow-xl bg-gradient-to-br from-blue-800 to-black rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
