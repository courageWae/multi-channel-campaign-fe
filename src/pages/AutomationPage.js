import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";

import Images from "Images";
import tw from "tailwind-styled-components";

import Header from "DetailPage/Header";
import Footers from "components/MainPage/Footers";
import CustomerStory from "DetailPage/CustomerStory";
import ProductsSection from "DetailPage/ProductSection";
import Pricing from "components/MainPage/Pricing";
import AutomationHeader from "components/AutomationPage/AutomationHeader";
import GridThree from "components/AutomationPage/gridThreex";
import BulkSMSFeatures from "components/AutomationPage/CustomerAngagementx";
import ReadyStartted from "components/AutomationPage/ReadyStarttedx";
import Overview from "components/AutomationPage/Overeviewx";
const AutomationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BgImg src={Images.HeroBackground} alt="Hero Background Image" />
      <Navbar />

      <AutomationHeader />
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
export default AutomationPage;
