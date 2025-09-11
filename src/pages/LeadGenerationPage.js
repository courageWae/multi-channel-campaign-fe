import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";

import Images from "Images";
import tw from "tailwind-styled-components";

import Footers from "components/MainPage/Footers";

import ProductsSection from "DetailPage/ProductSection";
import Pricing from "components/MainPage/Pricing";
import LeadHeader from "components/LeadGenerationPage/LeadHeader";
import GridThree from "components/LeadGenerationPage/gridThree";
import BulkSMSFeatures from "components/LeadGenerationPage/CustomerAngagement";
import ReadyStartted from "components/LeadGenerationPage/ReadyStartted";
import Overview from "components/LeadGenerationPage/Overview";
import CustomerStory from "DetailPage/CustomerStory";

const LeadGenerationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BgImg src={Images.HeroBackground} alt="Hero Background Image" />
      <Navbar />

      <LeadHeader />
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
export default LeadGenerationPage;
