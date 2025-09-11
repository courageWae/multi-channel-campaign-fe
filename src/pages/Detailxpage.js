import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";
import { useParams } from "react-router-dom";

import Images from "Images";
import tw from "tailwind-styled-components";

// import Header from "DetailPage/Header";
import Footers from "components/MainPage/Footers";
import BulkSMSFeatures from "DetailPage/CustomerAngagement";
// import GridThree from "DetailPage/gridThree";
// import ReadyStartted from "DetailPage/ReadyStartted";
import CustomerStory from "DetailPage/CustomerStory";
// import Overview from "DetailPage/Overview";
// import ProductsSection from "DetailPage/ProductSection";
import Pricing from "components/MainPage/Pricing";
import Header1 from "components/detailxpage/Header1";
import GridThreex from "components/detailxpage/gridThreex";
import Overviewx from "components/detailxpage/Overeviewx";
import ReadyStarttedx from "components/detailxpage/ReadyStarttedx";
// import { contentMapping } from "components/detailxpage/content";

const Detailxpage = () => {
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
      <Header1 />
      <GridThreex />
      <BulkSMSFeatures />
      <ReadyStarttedx />
      <CustomerStory />
      <Overviewx />
      {/* <ProductsSection /> */}
      <Pricing />
      <Footers />
    </>
  );
};
const BgImg = tw.img`absolute inset-0 w-full h-full object-cover z-0`;
export default Detailxpage;
