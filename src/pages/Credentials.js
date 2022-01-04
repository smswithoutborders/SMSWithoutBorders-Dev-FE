import React from "react";
import { TabBar } from "components";

const Credentials = () => {
  return (
    <div className="flex-grow">
      <TabBar title="Credentials">
        <button className="px-6 py-1 text-white bg-indigo-500 rounded-md">
          new
        </button>
      </TabBar>
      <div className="p-6 prose">
        <h2>OpenAPI Credentials</h2>
        <p>
          Use this key in your application by passing it with key=API_KEY
          parameter.
        </p>
        <h3>Generate Keys</h3>
        <p>Select new to generate your developer keys</p>
        <button className="px-8 py-1 text-white bg-indigo-500 rounded-md">
          new
        </button>
      </div>
    </div>
  );
};

export default Credentials;
