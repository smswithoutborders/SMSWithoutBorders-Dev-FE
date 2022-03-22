import React from "react";
import { TabBar, Loader, Button, useTitle } from "components";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, saveCredentials } from "features";
import { useNewCredentialsMutation } from "services/api";
import toast from "react-hot-toast";

const Projects = () => {
  useTitle("Projects");
  const [newCredentials, { isLoading }] = useNewCredentialsMutation();
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  async function handleCredGeneration() {
    try {
      const newCreds = await newCredentials(auth).unwrap();
      toast.success("Credentials generated");
      dispatch(saveCredentials(newCreds));
    } catch (error) {
      // we handle errors with middleware
    }
  }

  if (isLoading) return <Loader message="Processing please wait ..." />;
  return (
    <div className="flex-1 w-full">
      <TabBar title="Projects">
        <Button onClick={() => handleCredGeneration()}>refresh</Button>
      </TabBar>
      <div className="p-6 prose">
        <h2>Projects</h2>
        <p>
          Use this key in your application by passing it with key=API_KEY
          parameter.
        </p>
      </div>
    </div>
  );
};

export default Projects;
