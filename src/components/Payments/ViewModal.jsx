import React from "react";
import tw from "tailwind-styled-components";
import Model from "../Model";
import moment from "moment";
import Images from "Images";

const ViewModel = ({ setOpenViewModel, selectedItem }) => {
  const getNetwork = (selectedItem) => {
    if (selectedItem === "MTN") {
      return (
        <div className="">
          <img
            className="w-10 h-10 rounded-md"
            src={Images.MTN_NETWORK}
            alt="MTN_CODE"
          />
        </div>
      );
    } else if (selectedItem === "VODA") {
      return (
        <div className="">
          <img
            className="w-10 h-10 rounded-md"
            src={Images.TELECEL_NETWORK}
            alt="MTN_CODE"
          />
        </div>
      );
    } else {
      return (
        <div className="">
          <img
            className="w-10 h-10 rounded-md"
            src={Images.NETWORK_AT}
            alt="MTN_CODE"
          />
        </div>
      );
    }
  };

  const getPaymentType = (payment_type) => {
    if (payment_type === "TOPUP") {
      return <TopUpBadge>TOPUP</TopUpBadge>
    } else if(payment_type ==="PACKAGE") {
      return <PackageBadge>PACKAGE</PackageBadge>
    }
  };
  const getPlanType = (planType) => {
    if (planType === "SILVER") {
      return <SilverBadge>SILVER</SilverBadge>
    } else if(planType ==="BRONZE") {
      return <BronzeBadge>PACKAGE</BronzeBadge>
    }
    else if(planType==="GOLD"){
      return <GoldBadge>GOLD</GoldBadge>
    }
    else if(planType==="FREE"){
      return <FreeBadge>FREE</FreeBadge>
    }else{
      <p>N/A</p>
    }
  };
  
  return (
    <Model width={"w-11/12 max-w-2xl"} setOpenModel={setOpenViewModel}>
      <Wrapper>
        <Title>View Details</Title>
        <SingleItem name={"User Name"} value={selectedItem?.name} />
        <SingleItem name={"Phone Number"} value={selectedItem?.msisdn} />
        <SingleItem
          name={"Total Amount"}
          value={selectedItem?.amount + " GHc"}
        />
        <SingleItem
          name={"Network"}
          value={getNetwork(selectedItem.network) || "N/A"}
        />
        <SingleItem
          name={"Payment Type"}
          value={getPaymentType(selectedItem.payment_type) || "N/A"}
        />
        <SingleItem
          name={"Plan Type"}
          value={getPlanType(selectedItem.plan_type) || "N/A"}
        />
        <SingleItem name={"Refrence Id"} value={selectedItem?.transaction_id} />

        <SingleItem
          name={"Date"}
          value={moment(selectedItem?.payment_date).format("DD-MM-YYYY hh:mm A")}
        />
      </Wrapper>
    </Model>
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
const Title = tw.h2`text-lg md:text-xl mb-6 text-gray-700 font-medium text-left`;
const Name = tw.p`text-sm text-gray-500  w-40`;
const Value = tw.p`text-sm text-gray-800 font-medium max-w-xs `;
const LinkValue = tw.a`text-sm text-blue-500 max-w-xs truncate cursor-pointer`;
const TopUpBadge = tw.div`bg-purple-100 text-purple-700 text-xs border-purple-300 border w-24 h-7 flex items-center justify-center rounded`;
const PackageBadge = tw.div`bg-orange-100 text-orange-700 text-xs border-orange-300 border w-24 h-7 flex items-center justify-center rounded`;
const BronzeBadge = tw.div`bg-yellow-100 text-yellow-700 text-xs border-yellow-300 border w-24 h-7 flex items-center justify-center rounded`;
const SilverBadge = tw.div`bg-gray-100 text-gray-700 text-xs border-gray-300 border w-24 h-7 flex items-center justify-center rounded`;
const GoldBadge = tw.div`bg-yellow-200 text-yellow-800 text-xs border-yellow-400 border w-24 h-7 flex items-center justify-center rounded`;
const FreeBadge = tw.div`bg-green-100 text-green-700 text-xs border-green-300 border w-24 h-7 flex items-center justify-center rounded`;

export default ViewModel;
