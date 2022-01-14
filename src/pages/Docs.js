import React from "react";
import { TabBar, Loader } from "components";
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
        <button
          className="px-6 py-1 text-white bg-indigo-500 rounded-md"
          onClick={() => refetch()}
        >
          reload
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full">
      <TabBar title="Docs">
        <button
          className="flex items-center px-6 py-1 text-white bg-indigo-500 rounded-md"
          onClick={() => refetch()}
        >
          <FiRefreshCcw className="mr-2" />
          refresh
        </button>
      </TabBar>
      <div className="p-6 prose max-w-max">
        <ReactMarkdown>{data}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Docs;
