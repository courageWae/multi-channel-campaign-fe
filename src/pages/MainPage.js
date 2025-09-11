import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";
import Hero from "components/MainPage/Hero";
import Features from "components/MainPage/Features";
import About from "components/MainPage/About";
import Services from "components/MainPage/Services";
import Footer from "components/MainPage/Footer";
import Footers from "components/MainPage/Footers";
import Images from "Images";
import tw from "tailwind-styled-components";
import Pricing from "components/MainPage/Pricing";
// import Header from "components/headers/light";
const MainPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BgImg src={Images.HeroBackground} alt="Hero Background Image" />
      <Navbar />

      <Hero />
      <Features />
      <About />
      <Services />
      {/* <Pricing /> */}
      <Footer />
      <Footers />
    </>
  );
};
const BgImg = tw.img`absolute inset-0 w-full h-full object-cover z-0 opacity-60`;
export default MainPage;
