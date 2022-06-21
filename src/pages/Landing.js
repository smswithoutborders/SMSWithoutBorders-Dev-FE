import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { PageAnimationWrapper } from "components";

export const Landing = () => {
  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-xl mx-auto prose prose-invert">
        <div className="grid min-h-screen place-items-center">
          <div className="p-8 text-center">
            <h1 className="leading-relaxed tracking-wide text-white lg:text-6xl">
              <span className="">SW/OB</span> for
              <span className="text-blue-800"> Developers</span>
            </h1>

            <p className="my-12 font-light lg:text-xl">
              Modern tools and resources to help you build experiences that
              people love, faster and easier.
            </p>

            <div className="flex flex-col justify-center max-w-md px-12 mx-auto mt-16 space-y-4 md:space-y-0 md:space-x-4 md:flex-row lg:justify-start md:px-0">
              <Link
                className="flex items-center justify-center flex-1 py-3 text-lg text-white no-underline bg-blue-800 appearance-none rounded-3xl"
                to="signup"
              >
                Sign Up
              </Link>

              <a
                href="#tutorials"
                className="inline-flex items-center justify-center flex-1 py-3 text-lg text-white no-underline border appearance-none rounded-3xl"
              >
                Tutorials
              </a>
            </div>
          </div>
        </div>

        <div className="p-8 mb-10 scroll-mt-8" id="tutorials">
          <h2 className="text-3xl font-black leading-relaxed tracking-wide text-center lg:text-5xl">
            Tutorials
          </h2>
          <p className="my-12 font-light text-center lg:text-xl">
            Quick guides and resources to help you start building
          </p>

          <div className="p-8 mb-8 text-white shadow-xl bg-gradient-to-br from-blue-800 to-black lg:py-16 rounded-2xl">
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

          <div className="p-8 border border-gray-800 shadow-xl rounded-2xl backdrop-blur-xl lg:py-16">
            <span className="font-light">Tutorial</span>
            <h2 className="my-4 text-white">Getting Started with OpenAPI</h2>
            <a
              className="flex items-center justify-between font-light text-white no-underline"
              href="https://smswithoutborders-openapi.readthedocs.io/en/latest/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="mr-2">learn more </span>
              <BsArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Landing;
