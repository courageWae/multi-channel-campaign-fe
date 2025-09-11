import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";

import Images from "Images";
import tw from "tailwind-styled-components";

import Header from "DetailPage/Header";
import Footers from "components/MainPage/Footers";
import BulkSMSFeatures from "DetailPage/CustomerAngagement";
import GridThree from "DetailPage/gridThree";
import ReadyStartted from "DetailPage/ReadyStartted";
import CustomerStory from "DetailPage/CustomerStory";
import Overview from "DetailPage/Overview";
import ProductsSection from "DetailPage/ProductSection";
import Pricing from "components/MainPage/Pricing";
const MainPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BgImg src={Images.HeroBackground} alt="Hero Background Image" />
      <Navbar />

      <Header />
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
export default MainPage;
