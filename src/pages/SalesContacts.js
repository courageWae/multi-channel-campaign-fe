import React, {useEffect} from "react";
import Navbar from "components/Navbar";

import Images from "Images";
import tw from "tailwind-styled-components";

import SalesContact from "components/MainPage/SalesContact";
import Footers from "components/MainPage/Footers";

const SalesContacts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BgImg src={Images.HeroBackground} alt="Hero Background Image" />
      <Navbar />
      <SalesContact />
      <Footers />
    </>
  );
};
const BgImg = tw.img`absolute inset-0 w-full h-full object-cover z-0`;
export default SalesContacts;
