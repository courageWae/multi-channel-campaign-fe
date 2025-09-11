import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustrationFullForm.js";
import ContactDetails from "components/cards/ThreeColContactDetails.js";
import styled from "styled-components";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Config from "Config";
import IframePopup from "./IframePopup";
const Address = tw.span`leading-relaxed`;
const AddressLine = tw.span`block`;
const Email = tw.span`text-sm mt-6 block text-gray-500`;
const Phone = tw.span`text-sm mt-0 block text-gray-500`;

const MaxWidth = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
`;

export default () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [activeNavLink, setActiveNavLink] = useState(""); // Store active nav link state

  // Function to handle Product link click in Footer and update Navbar state
  const handleProductLinkClick = () => {
    setActiveNavLink("Products"); // Set active link in Navbar
    setIsSubMenuOpen(true); // Open the Products dropdown
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [user, setUser] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [formVal, setFormVal] = useState({
    email: "",
    name: "",
    subject: "",
    message: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setisLoading(true);
      console.log("submit", formVal);
      const res = await axios.post(`${Config.nodeApiUrl}/sendMail`, formVal, {
        headers: {
          for: "web",
        },
      });
      console.log(res);
      toast.success(res?.data?.msg || "Success");
      setisLoading(false);

      setFormVal({
        email: "",
        name: "",
        subject: "",
        message: "",
        mobile: "",
      });
    } catch (err) {
      toast.error("Something went wrong!");

      setisLoading(false);
    }
  };
  return (
    <AnimationRevealPage>
      <Header
        roundedHeaderButton={true}
        user={user}
        isSubMenuOpen={isSubMenuOpen}
        activeNavLink={activeNavLink}
        setActiveNavLink={setActiveNavLink}
        setIsSubMenuOpen={setIsSubMenuOpen}
      />
      <IframePopup />
      <MaxWidth>
        <ContactUsForm
          formVal={formVal}
          changeHandler={changeHandler}
          submitHandler={submitHandler}
          isLoading={isLoading}
        />
      </MaxWidth>
      <Footer onProductLinkClick={handleProductLinkClick} />
    </AnimationRevealPage>
  );
};
