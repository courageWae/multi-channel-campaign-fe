import Footers from "components/MainPage/Footers";
import Pricing from "components/MainPage/Pricing";
import Navbar from "components/Navbar";
import Images from "Images";
import React from "react";
import Benefits from "SolutionsComponents/Education/Benefits";
import Features from "SolutionsComponents/Education/Features";
import Header from "SolutionsComponents/Education/Header";
import Operations from "SolutionsComponents/Education/Operations";
import tw from "tailwind-styled-components";

const EducationPage = () => {
  return (
    <>
      <BgImg src={Images.HeroBackground} alt="Hero Background Image" />
      <Navbar />
      <Header/>
      <Benefits/>
      <Operations/>
      <Features/>
      <Pricing />
      <Footers />
    </>
  );
};
const BgImg = tw.img`absolute inset-0 w-full h-full object-cover z-0`;

export default EducationPage;
