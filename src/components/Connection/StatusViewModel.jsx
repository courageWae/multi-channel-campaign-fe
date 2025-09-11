import React from "react";
import tw from "tailwind-styled-components";
import Images from "../../Images";
import StatusNewModel from "../StatusNewModel";
import moment from "moment";

const StatusViewModel = ({ data, setStatusViewModel }) => {

  console.log(data);
  return (
    <StatusNewModel width={"w-11/12 max-w-md"} setOpenModel={setStatusViewModel} title="SMPP Status">
      <Wrapper>
        <SingleItem name={"Status"} value={data?.running} />
        <SingleItem name={"SMS Box Status"} value={data?.smsbox} />
        <SingleItem name={"SMSC Connection Status"} value={data.smsc} />
      </Wrapper>
    </StatusNewModel>
  );
};

const SingleItem = ({ name, value, link, url }) => (
  <div className="flex items-center py-2 border-b border-gray-100 ">
    <Name>{name}</Name> <p className="w-10">:</p>
    {link && (
      <LinkValue href={url} target="_blank" title="Click to open">
        {value}
      </LinkValue>
    )}
    {!link && <Value>{value}</Value>}
  </div>
);

const Wrapper = tw.div`px-4`;
const Title = tw.h2`text-lg md:text-xl mb-6 text-gray-700 font-medium text-center`;
const Name = tw.p`text-sm text-gray-500  w-40`;
const Value = tw.p`text-sm text-gray-800 font-medium max-w-xs word-break `;
const LinkValue = tw.a`text-sm text-blue-500 max-w-xs truncate cursor-pointer `;

const Status = tw.button`px-8 py-3 text-sm bg-blue-500 text-white rounded hover:bg-blue-600`;
const Restart = tw.button`px-8 py-3 text-sm bg-green-400 text-white-600 rounded hover:bg-green-200`;

const Box = tw.div`text-center text-gray-800 border border-gray-100 bg-gray-50 p-5`;
export default StatusViewModel;
