import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";
import { useParams } from "react-router-dom";

import Images from "Images";
import tw from "tailwind-styled-components";

// import Header from "DetailPage/Header";
import Footers from "components/MainPage/Footers";

import CustomerStory from "DetailPage/CustomerStory";
// import Overview from "DetailPage/Overview";
// import ProductsSection from "DetailPage/ProductSection";
import Pricing from "components/MainPage/Pricing";

import GridThree from "components/devicecampaign/GridThree";
import BulkSMSFeatures from "components/devicecampaign/CustomerAngagement";
import ReadyStartted from "components/devicecampaign/ReadyStartted";
import Overview from "components/devicecampaign/Overview";
import DeviceHeader from "components/devicecampaign/DeviceHeader";

const DeviceCampaignPage = () => {
  // const { id } = useParams();
  // const content = contentMapping[id];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // if (!content) {
  //     return <div>Content not found</div>;
  //   }

  return (
    <>
      <BgImg src={Images.HeroBackground} alt="Hero Background Image" />
      <Navbar />
      {/* 
      <Header1
     title={content.title}
     description={content.description}

  /> */}

      <DeviceHeader />
      <GridThree />

      <BulkSMSFeatures />
      <ReadyStartted />
      <CustomerStory />
      <Overview />
      {/* <ProductsSection /> */}
      <Pricing />
      <Footers />
    </>
  );
};
const BgImg = tw.img`absolute inset-0 w-full h-full object-cover z-0`;
export default DeviceCampaignPage;
