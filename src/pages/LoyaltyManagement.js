import React, { useEffect } from "react";
import Navbar from "components/Navbar";

import Images from "Images";
import tw from "tailwind-styled-components";

import Header from "LoyaltyManagement/Header";
import Footers from "components/MainPage/Footers";
import GridThree from "LoyaltyManagement/gridThree";
import Overview from "DetailPage/Overview";
import Pricing from "components/MainPage/Pricing";
import Features from "LoyaltyManagement/CustomerEngagement";
import GetStarted from "LoyaltyManagement/GetStarted";
import UseCases from "LoyaltyManagement/UseCases";
const LoyaltyManagement = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BgImg src={Images.HeroBackground} alt="Hero Background Image" />
      <Navbar />
      <Header/>
      <GridThree />
      <Features />
      <GetStarted />
      <UseCases />
      <Overview />
      <Pricing />
      <Footers />
    </>
  );
};
const BgImg = tw.img`absolute inset-0 w-full h-full object-cover z-0`;
export default LoyaltyManagement;
