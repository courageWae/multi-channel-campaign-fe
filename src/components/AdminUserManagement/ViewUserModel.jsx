import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Model from "../Model";
import moment from "moment";
import permissionsArr from "./UserPermissions";
import { FaRegCheckCircle } from "react-icons/fa";

const ViewUserModel = ({ setOpenViewModel, selectedData }) => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (selectedData?.permissions && selectedData?.type) {
      const activeUserPermissions = permissionsArr.find(
        (item) => item.type === selectedData.type
      );

      if (activeUserPermissions) {
        const per = selectedData.permissions.split(",");

        const newPermissionsValue = per
          .map((permission) => {
            const temp = activeUserPermissions.permissions.find(
              (item) => item.value === permission
            );
            return temp ? temp.name : null;
          })
          .filter((item) => item);

        setPermissions(
          newPermissionsValue.length > 0 ? newPermissionsValue : ["N/A"]
        );
      } else {
        setPermissions(["N/A"]);
      }
    } else {
      setPermissions(["N/A"]);
    }
  }, [selectedData]);

  return (
    <Model width={"w-11/12 max-w-4xl"} setOpenModel={setOpenViewModel}>
      <Wrapper>
        <Title>User Details</Title>
        <DetailsContainer>
          <SingleItem name="Name" value={selectedData?.name || "N/A"} />
          <SingleItem name="User Id" value={selectedData?.id || "N/A"} />
          <SingleItem
            name="Phone Number"
            value={selectedData?.phone || "N/A"}
          />
          <SingleItem name="Email" value={selectedData?.email || "N/A"} />
          <SingleItem name="Permissions" value={permissions} isList />
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
                ? moment(selectedData?.created_at).format("DD-MM-YYYY hh:mm A")
                : "N/A"
            }
          />
        </DetailsContainer>
      </Wrapper>
    </Model>
  );
};

const SingleItem = ({ name, value, link, url, isList }) => (
  <DetailCard className={`${name === "Permissions" ? "items-start" : ""} ${name === "Created Date" ? "h-14" :""}`}>
    <Name>{`${name}:`}</Name>
    <div className="flex items-start">
      <ValueContainer>
        {isList && Array.isArray(value) ? (
          value.map((val, index) => (
            <>
            <Value key={index}>
              <div className="flex items-center gap-3">
                <FaRegCheckCircle className="text-orange-500 text-md" />
                <p>{val}</p>
              </div>
            </Value>
              <div className="w-full h-0.5 bg-gray-100 my-2"></div>
            </>
          ))
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

const Wrapper = tw.div`p-6 bg-white rounded-lg shadow-lg`;
const Title = tw.h2`text-2xl font-bold text-gray-800 mb-8 text-center`;
const DetailsContainer = tw.div`grid grid-cols-1 md:grid-cols-2 gap-4`;

// const DetailCard = tw.div`bg-gray-50 p-4 rounded-lg shadow-md flex items-center justify-between border border-gray-100`;
const Name = tw.p`text-sm md:text-md text-gray-600 font-medium w-40`;
const Value = tw.p`text-sm md:text-md text-gray-700 font-semibold truncate`;
const LinkValue = tw.a`text-sm md:text-md text-blue-600 font-semibold underline truncate cursor-pointer`;
const ValueContainer = tw.div`ml-2 flex flex-col`;
const DetailCard = tw.div`bg-gray-50 p-4 rounded-lg shadow-md flex items-center justify-between border border-gray-100`;


export default ViewUserModel;
