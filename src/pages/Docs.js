import React, { Fragment } from "react";
import { Button, TabBar, Loader } from "components";
import { useGetDocsQuery } from "services/api";
import { FiRefreshCcw } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

const Docs = () => {
  const {
    data = "",
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetDocsQuery();
  // generate credentials

  if (isLoading || isFetching) {
    return <Loader message="fetching docs ..." />;
  }

  if (isError) {
    return (
      <div className="p-6 prose">
        <h3>An error occured</h3>
        <p className="">
          Sorry we could not get the latest docs. If error persists, please
          contact support
        </p>
        <Button onClick={() => refetch()}>reload</Button>
      </div>
    );
  }

  return (
    <Fragment>
      <TabBar title="Docs">
        <Button onClick={() => refetch()}>
          <FiRefreshCcw className="mr-2" />
          refresh
        </Button>
      </TabBar>
      <div className="p-6 prose max-w-max">
        <ReactMarkdown>{data}</ReactMarkdown>
      </div>
    </Fragment>
  );
};

export default Docs;
