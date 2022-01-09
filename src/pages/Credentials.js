import React, { useState, Fragment } from "react";
import { TabBar, Loader, ClipBoard, ToggleButton } from "components";

const Credentials = () => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUID, setShowUID] = useState(false);

  function toggleUID() {
    setShowUID(!showUID);
  }

  function handleCredGeneration() {
    setLoading(true);
    setTimeout(() => {
      setData(!data);
      setLoading(false);
    }, 1000);
  }

  if (loading) return <Loader message="Processing please wait ..." />;
  return (
    <div className="flex-1 w-full">
      <TabBar title="Credentials">
        {!data ? (
          <button
            className="px-6 py-1 text-white bg-indigo-500 rounded-md"
            onClick={() => handleCredGeneration()}
          >
            new
          </button>
        ) : (
          <button
            className="px-6 py-1 text-white bg-indigo-500 rounded-md"
            onClick={() => handleCredGeneration()}
          >
            regenerate keys
          </button>
        )}
      </TabBar>
      <div className="p-6 prose">
        <h2>OpenAPI Credentials</h2>
        <p>
          Use this key in your application by passing it with key=API_KEY
          parameter.
        </p>
        {data ? (
          <div className="my-2">
            <h4>User ID</h4>
            <div className="flex flex-col items-start md:flex-row">
              <div className="mr-3">
                <p className="my-0 break-words">
                  xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx
                </p>
                <small className="text-gray-500 break-words">
                  Use this key in your application by passing it with
                  user=UserID parameter.
                </small>
              </div>
              <div className="flex my-2 md:my-0 md:p-1.5">
                <ToggleButton
                  className="mr-3"
                  value={showUID}
                  toggleFunc={toggleUID}
                />
                <ClipBoard size={16} text="UserID" value="XXXXXXXXXsome" />
              </div>
            </div>
          </div>
        ) : (
          <Fragment>
            <h3>Generate Keys</h3>
            <p>Select new to generate your developer keys</p>
            <button
              className="px-8 py-1 text-white bg-indigo-500 rounded-md"
              onClick={() => handleCredGeneration()}
            >
              new
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Credentials;
