import React from "react";
import { TabBar, Button, Loader, useTitle, Table } from "components";
import { useGetMetricsQuery } from "services";

const OpenAPI = () => {
  useTitle("OpenAPI");

  const {
    data: metrics = [],
    isFetching,
    isError,
    refetch,
  } = useGetMetricsQuery();

  if (isFetching) return <Loader />;
  else if (isError) {
    return (
      <div className="max-w-screen-xl p-6 mx-auto prose">
        <h3>An error occured</h3>
        <p className="">
          Sorry, an error occured while loading metrics. If error persists,
          please contact support
        </p>
        <Button onClick={() => refetch()}>try again</Button>
      </div>
    );
  }
  return (
    <div className="flex-1 w-full">
      <TabBar title="openapi" />
      <div className="max-w-full p-6 prose">
        <h2>OpenAPI</h2>
        <p>Usage metrics overview</p>
        <div className="grid grid-cols-12 gap-4 mb-10">
          <div className="p-4 bg-white border border-gray-300 rounded-md col-span-full md:col-span-3">
            <h3 className="mt-0 text-base font-medium text-blue-800">Total</h3>
            <span className="text-4xl font-light">300</span>
          </div>
          <div className="p-4 bg-white border border-gray-300 rounded-md col-span-full md:col-span-3">
            <h3 className="mt-0 text-base font-medium text-blue-800">
              Successful
            </h3>
            <span className="text-4xl font-light">250</span>
          </div>
          <div className="p-4 bg-white border border-gray-300 rounded-md col-span-full md:col-span-3">
            <h3 className="mt-0 text-base font-medium text-blue-800">Failed</h3>
            <span className="text-4xl font-light">20</span>
          </div>
          <div className="p-4 bg-white border border-gray-300 rounded-md col-span-full md:col-span-3">
            <h3 className="mt-0 text-base font-medium text-blue-800">
              Pending
            </h3>
            <span className="text-4xl font-light">40</span>
          </div>
        </div>

        <Table data={metrics} refresh={refetch} />
      </div>
    </div>
  );
};

export default OpenAPI;
