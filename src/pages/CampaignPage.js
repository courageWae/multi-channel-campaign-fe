import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";

import Images from "Images";
import tw from "tailwind-styled-components";

import Header from "DetailPage/Header";
import Footers from "components/MainPage/Footers";
import CustomerStory from "DetailPage/CustomerStory";
import ProductsSection from "DetailPage/ProductSection";
import Pricing from "components/MainPage/Pricing";
import CampaignHeader from "components/CampaignPerformance/CampaignHeader";
import GridThree from "components/CampaignPerformance/gridThree";
import BulkSMSFeatures from "components/CampaignPerformance/CustomerAngagement";
import ReadyStartted from "components/CampaignPerformance/ReadyStartted";
import Overview from "components/CampaignPerformance/Overview";
const CampaignPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BgImg src={Images.HeroBackground} alt="Hero Background Image" />
      <Navbar />

      <CampaignHeader />
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
export default CampaignPage;
