import React from "react";
import {
  TabBar,
  Error,
  Loader,
  useTitle,
  Table,
  SummaryList,
} from "components";
import { useGetMetricsQuery } from "services";
import { authSelector, credentialsSelector } from "features";
import { useSelector } from "react-redux";

const OpenAPI = () => {
  useTitle("OpenAPI");
  const creds = useSelector(credentialsSelector);
  const auth = useSelector(authSelector);
  const {
    data: metrics = [],
    isFetching,
    isError,
    refetch,
  } = useGetMetricsQuery({
    uid: auth?.uid,
    authID: creds.authID,
    product: "openapi",
  });

  if (isFetching) return <Loader light />;
  else if (isError) return <Error callBack={refetch} />;

  return (
    <div className="flex-1 w-full text-gray-300">
      <TabBar title="openapi" />
      <div className="max-w-full p-6 prose prose-invert">
        <h2>OpenAPI</h2>
        <p>Usage metrics overview</p>

        <SummaryList list={metrics.summary} />
        <Table data={metrics.data} refresh={refetch} />
      </div>
    </div>
  );
};

export default OpenAPI;
