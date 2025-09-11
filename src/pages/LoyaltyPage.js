import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";

import Images from "Images";
import tw from "tailwind-styled-components";

import Footers from "components/MainPage/Footers";

import CustomerStory from "DetailPage/CustomerStory";
import ProductsSection from "DetailPage/ProductSection";
import Pricing from "components/MainPage/Pricing";
import LoyaltyHeader from "components/LoyaltyCampaign/LoyaltyHeader";
import GridThree from "components/LoyaltyCampaign/gridThree";
import BulkSMSFeatures from "components/LoyaltyCampaign/CustomerAngagement";
import ReadyStartted from "components/LoyaltyCampaign/ReadyStartted";
import Overview from "components/LoyaltyCampaign/Overview";
const LoyaltyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BgImg src={Images.HeroBackground} alt="Hero Background Image" />
      <Navbar />

      <LoyaltyHeader />
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
export default LoyaltyPage;
