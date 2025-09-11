import React, { useEffect } from "react";
import Navbar from "components/Navbar";

import Images from "Images";
import tw from "tailwind-styled-components";

// import Header from "DeviceCampaignManagement/Header";
import Footers from "components/MainPage/Footers";
import GridThree from "DeviceCampaignManagement/gridThree";
import Overview from "DetailPage/Overview";
import Pricing from "components/MainPage/Pricing";
import Features from "DeviceCampaignManagement/CustomerEngagement";
import GetStarted from "DeviceCampaignManagement/GetStarted";
import UseCases from "DeviceCampaignManagement/UseCases";
import Header from "DeviceCampaignManagement/Header";
const DeviceCampaignManagement = () => {

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
export default DeviceCampaignManagement;
