import React, { useState, Fragment } from "react";
import { TabBar, Loader, ClipBoard, ToggleButton, Button } from "components";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, credentialsSelector, saveCredentials } from "features";
import { useNewCredentialsMutation } from "services/api";
import toast from "react-hot-toast";

const Credentials = () => {
  const [showAuthID, setShowAuthID] = useState(false);
  const [showAuthKey, setShowAuthKey] = useState(false);
  const credentials = useSelector(credentialsSelector);
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const [newCredentials, { isLoading }] = useNewCredentialsMutation();

  // toggle key visibility
  function toggleAuthID() {
    setShowAuthID(!showAuthID);
  }
  function toggleAuthKey() {
    setShowAuthKey(!showAuthKey);
  }

  // generate credentials
  async function handleCredGeneration() {
    try {
      const newCreds = await newCredentials(auth).unwrap();
      dispatch(saveCredentials(newCreds));
    } catch (error) {
      switch (error.status) {
        case 400:
          toast.error("An error occured. Please contact support");
          break;
        case 401:
          toast.error(
            "Sorry you are not authorized to use this service. Please contact support"
          );
          break;
        case 409:
          toast.error(
            "There is a possible duplicate of this account please contact support"
          );
          break;

        case 429:
          toast.error(
            "Too many failed attempts please wait a while and try again"
          );
          break;
        case 500:
          toast.error("A critical error occured. Please contact support");
          break;
        case "FETCH_ERROR":
          toast.error("An error occured, please check your network try again");
          break;
        default:
          toast.error("An error occured, please try again");
      }
    }
  }

  if (isLoading) return <Loader message="Processing please wait ..." />;
  return (
    <div className="flex-1 w-full">
      <TabBar title="Credentials">
        {!credentials.authKey ? (
          <Button onClick={() => handleCredGeneration()}>new</Button>
        ) : (
          <Button onClick={() => handleCredGeneration()}>
            regenerate keys
          </Button>
        )}
      </TabBar>
      <div className="p-6 prose">
        <h2>OpenAPI Credentials</h2>
        <p>
          Use this key in your application by passing it with key=API_KEY
          parameter.
        </p>
        {credentials.authKey ? (
          <Fragment>
            <div className="my-2">
              <h4>Auth ID</h4>
              <div className="grid grid-cols-8">
                <div className="col-span-7">
                  <p className="my-0 text-base break-words">
                    {showAuthID
                      ? credentials.authID
                      : "xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxx"}
                  </p>
                  <small className="text-gray-500 break-words">
                    Use this key in your application by passing it with
                    auth_id="Auth ID" parameter.
                  </small>
                </div>
                <div className="flex items-start col-span-1 p-1.5">
                  <ToggleButton
                    className="mr-3"
                    value={showAuthID}
                    toggleFunc={toggleAuthID}
                  />
                  <ClipBoard
                    size={16}
                    text="Auth ID"
                    value={credentials.authID}
                  />
                </div>
              </div>
            </div>

            <div className="my-2">
              <h4>Auth Key</h4>
              <div className="grid grid-cols-8">
                <div className="col-span-7">
                  <p className="my-0 text-base break-words">
                    {showAuthKey
                      ? credentials.authKey
                      : "xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxx"}
                  </p>
                  <small className="text-gray-500 break-words">
                    Use this key in your application by passing it with
                    auth_key="Auth Key" parameter.
                  </small>
                </div>
                <div className="flex items-start col-span-1 p-1.5">
                  <ToggleButton
                    className="mr-3"
                    value={showAuthKey}
                    toggleFunc={toggleAuthKey}
                  />
                  <ClipBoard
                    size={16}
                    text="Auth Key"
                    value={credentials.authKey}
                  />
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <h3>Generate Keys</h3>
            <p>Select new to generate your developer keys</p>
            <Button onClick={() => handleCredGeneration()}>new</Button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Credentials;
