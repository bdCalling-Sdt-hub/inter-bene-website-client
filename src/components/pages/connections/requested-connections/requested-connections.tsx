"use client";
import React from "react";
import RequestedConnectionCard from "./requested-connection-card";
import { useGetConnectionRequestsQuery } from "@/redux/features/connections/connectionsApi";
import { IConnectionRequest } from "@/types/connection.types";

const RequestedConnections: React.FC = () => {
  const { data: responseData, isLoading } = useGetConnectionRequestsQuery(undefined);
  const connectionsRequestData = responseData?.data?.attributes?.results;
  const requestCount = responseData?.data?.attributes?.requestCount;
  let content = null;
  if(isLoading){
    content = <p>Loading...</p>;
  }else if(!isLoading && connectionsRequestData?.length === 0){
    content = <p className="text-xl">No requests found</p>;
  }else if(!isLoading && connectionsRequestData?.length > 0){
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {connectionsRequestData?.map((request: IConnectionRequest) => (
          <RequestedConnectionCard
            key={request?._id}
            request={request}
          />
        ))}
      </div>
    );
  }
  return (
    <section>
      {/* Header Section */}
      <div className="w-full flex items-center justify-between px-2 mb-5">
        <div className="flex items-center gap-4">
          <h1 className="text-xl md:text-2xl font-semibold">Requests</h1>
          <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white">
            <h1 className="text-sm font-semibold">{requestCount}</h1>
          </div>
        </div>
        <button className="text-primary hover:underline">Show more</button>
      </div>
      {/* Content Section */}
      {content}
    </section>
  );
};

export default RequestedConnections;
