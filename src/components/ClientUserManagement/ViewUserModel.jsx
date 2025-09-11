import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Model from "../Model";
import moment from "moment";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Main User View Component
const ViewUserModel = ({ setOpenViewModel, selectedData }) => {

  return (
    <Model width={"w-11/12 max-w-4xl"} setOpenModel={setOpenViewModel}>
      <Wrapper>
        <Title>User Details</Title>
        <DetailsContainer>
          <SingleItem name="Name" value={selectedData?.name || "N/A"} />
          <SingleItem name="User Id" value={selectedData?.id || "N/A"} />
          <SingleItem
            name="Phone Number"
            value={selectedData?.phoneNumber || "N/A"}
          />
          <SingleItem name="Email" value={selectedData?.email || "N/A"} />
          <SingleItem name="Status" value={selectedData?.status} isList />

          {selectedData?.social_id && (
            <SingleItem name="Social Id" value={selectedData?.social_id} />
          )}
          {selectedData?.address && (
            <SingleItem name="Address" value={selectedData?.address} />
          )}
          {selectedData?.city && (
            <SingleItem name="City" value={selectedData?.city} />
          )}
          {selectedData?.state_name && (
            <SingleItem name="State" value={selectedData?.state_name} />
          )}
          {selectedData?.country && (
            <SingleItem name="Country" value={selectedData?.country} />
          )}
          <SingleItem
            name="Created Date"
            value={
              selectedData?.created_at
                ? moment(selectedData.created_at).format("DD-MM-YYYY hh:mm A")
                : "N/A"
            }
          />
        </DetailsContainer>
      </Wrapper>
    </Model>
  );
};

// Single Item Component
const SingleItem = ({ name, value, link, url }) => (
  <DetailCard>
    <Name>{`${name}:`}</Name>
    <div className="flex items-start">
      <ValueContainer>
        {name === "Status" ? (
          value === 1 ? (
            <span className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-green-700 rounded-md bg-green-50 ring-1 ring-inset ring-green-600/20">
              <FaCheckCircle className="text-md" /> Active
            </span>
          ) : value === 2 ? (
            <span className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-red-700 rounded-md bg-red-50 ring-1 ring-inset ring-red-600/20">
              <FaTimesCircle className="text-md" /> Inactive
            </span>
          ) : (
            <span className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-gray-700 rounded-md bg-gray-50 ring-1 ring-inset ring-gray-600/20">
              Unknown
            </span>
          )
        ) : link ? (
          <LinkValue href={url} target="_blank" title="Click to open">
            {value}
          </LinkValue>
        ) : (
          <Value>{value}</Value>
        )}
      </ValueContainer>
    </div>
  </DetailCard>
);

// Styled Components
const Wrapper = tw.div`p-6 bg-white rounded-lg shadow-lg`;
const Title = tw.h2`text-2xl font-bold text-gray-800 mb-8 text-center`;
const DetailsContainer = tw.div`grid grid-cols-1 md:grid-cols-2 gap-4`;

const DetailCard = tw.div`bg-gray-50 p-4 rounded-lg shadow-md flex items-center justify-between border border-gray-100`;
const Name = tw.p`text-sm md:text-md text-gray-600 font-medium w-40`;
const Value = tw.p`text-sm md:text-md text-gray-700 font-semibold truncate`;
const LinkValue = tw.a`text-sm md:text-md text-blue-600 font-semibold underline truncate cursor-pointer`;
const ValueContainer = tw.div`ml-2 flex flex-col`;

export default ViewUserModel;
