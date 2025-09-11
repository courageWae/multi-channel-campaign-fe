import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import Config from "../Config";
import "tailwindcss/tailwind.css";
import { RxCross1 } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Loading from "components/Loading";
import { Link } from "react-router-dom";

const PricingTable = () => {
  const [activeTab, setActiveTab] = useState("M");
  const [openSections, setOpenSections] = useState({});
  const [isPlanFetched, setIsPlanFetched] = useState(false);
  const [planData, setPlanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 770); // Large screens (lg and above)
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const changeTabHandler = (value) => setActiveTab(value);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getPlans = async () => {
    try {
      const res = await axios.get(`${Config.apiUrl}/plan/feature/view`);
      setPlanData(res?.data);
      setLoading(false);
      const initialOpenSections = {};
      res?.data?.data?.forEach((_, index) => {
        initialOpenSections[index] = true;
      });
      setOpenSections(initialOpenSections);
    } catch (error) {
      console.error("Error fetching plan data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPlanFetched) {
      setIsPlanFetched(true);
      getPlans();
    }
  }, [isPlanFetched]);

  return (
    <div className="h-screen px-4 pb-6 overflow-y-auto md:px-10">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loading />
        </div>
      ) : (
        <>
          <div className="sticky top-0 z-50 p-0 overflow-x-auto bg-white border-b border-gray-200">
            <h1 className="pt-8 text-2xl font-bold text-center text-black md:pt-12 md:text-3xl">
              Marketing Platform
            </h1>

            <Container>
              <PaymentOption>
                <Heading>Choose</Heading>
                <SubHeading>Payment Plan</SubHeading>
                <ButtonContainer>
                  <Button
                    onClick={() => changeTabHandler("Y")}
                    className={
                      activeTab === "Y"
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-700"
                    }
                  >
                    YEARLY
                  </Button>
                  <Button
                    onClick={() => changeTabHandler("M")}
                    className={
                      activeTab === "M"
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-700"
                    }
                  >
                    MONTHLY
                  </Button>
                </ButtonContainer>
                <DiscountText>
                  Get {planData.discount}% discount in the price when paying
                  annually
                </DiscountText>
              </PaymentOption>
              {isLargeScreen ? (
                planData?.plans?.map((plan) => (
                  <PlanCard key={plan.id} className="px-4 md:px-6">
                    <PlanTitle>{plan.name}</PlanTitle>
                    <PlanSubtitle>{plan.type}</PlanSubtitle>
                    <PlanPrice>
                      ₵ {activeTab === "Y" ? plan.discount_price : plan.price}
                      /month
                    </PlanPrice>
                    <Link to="/register">
                      <SignupButton>Sign Up</SignupButton>
                    </Link>
                  </PlanCard>
                ))
              ) : (
                <div className="grid w-full grid-cols-2">
                  {planData?.plans?.map((plan) => (
                    <PlanCard key={plan.id} className="px-4 md:px-6">
                      <PlanTitle>{plan.name}</PlanTitle>
                      <PlanSubtitle>{plan.type}</PlanSubtitle>
                      <PlanPrice>
                        ₵ {activeTab === "Y" ? plan.discount_price : plan.price}
                        /month
                      </PlanPrice>
                      <Link to="/register">
                        <SignupButton>Sign Up</SignupButton>
                      </Link>
                    </PlanCard>
                  ))}
                </div>
              )}
            </Container>
            <div className="absolute right-2 top-8 md:right-0">
              <RxCross1
                className="text-xl text-gray-500 transition duration-100 cursor-pointer md:text-2xl hover:text-black"
                onClick={() => navigate(-1)}
              />
            </div>
          </div>
          <ContainerDrop>
            <BorderContainer>
              {planData?.data?.map((category, catIndex) => (
                <React.Fragment key={catIndex}>
                  <Header onClick={() => toggleSection(catIndex)}>
                    <ToggleButton>{category.feature_category}</ToggleButton>
                    <Dropdown>
                      <ArrowIcon
                        className={openSections[catIndex] ? "rotate-180" : ""}
                      />
                    </Dropdown>
                  </Header>
                  <Content
                    className={`transition-max-height duration-200 ${
                      openSections[catIndex] ? "max-h-fit" : "max-h-0"
                    }`}
                  >
                    {openSections[catIndex] &&
                      category.features.map((feature, featureIndex) => (
                        <FeatureRow
                          key={feature.id}
                          className={`${
                            featureIndex % 2 ? "bg-gray-100" : "bg-white"
                          } px-2 md:px-4`}
                        >
                          <FeatureTitle
                            data-tooltip-id={`tooltip-${feature.id}`}
                            data-tooltip-content={feature.tool_tip}
                          >
                            {feature.name}
                          </FeatureTitle>
                          <Tooltip id={`tooltip-${feature.id}`} variant="info">
                            {feature.tool_tip}
                          </Tooltip>
                          {Object.keys(feature.plans).map((plan, planIndex) => (
                            <FeatureCell
                              key={plan}
                              className={`${
                                planIndex > 0
                                  ? "hidden md:flex justify-center"
                                  : "flex justify-end md:justify-center"
                              }`}
                            >
                              {feature.plans[plan] === "1" ? (
                                <FaCheck className="text-xl text-orange-500" />
                              ) : (
                                <RxCross1 className="text-xl text-rose-500" />
                              )}
                            </FeatureCell>
                          ))}
                        </FeatureRow>
                      ))}
                  </Content>
                </React.Fragment>
              ))}
            </BorderContainer>
          </ContainerDrop>
        </>
      )}
    </div>
  );
};

// Responsive Styled Components
const Container = tw.div`max-h-screen overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 pb-1`;
const PaymentOption = tw.div`flex flex-col items-center space-y-2 text-center font-sans`;
const Heading = tw.h2`font-medium text-black leading-tight text-base md:text-lg`;
const SubHeading = tw.h2`font-medium text-black leading-none text-base md:text-lg pb-2`;
const ButtonContainer = tw.div`rounded-full flex items-center p-1 md:p-2 border border-gray-600`;
const Button = tw.button`px-4 py-1 md:px-6 md:py-2 font-medium rounded-full text-xs md:text-sm`;
const DiscountText = tw.p`text-xs text-gray-500 mb-4 md:mb-5`;
const PlanCard = tw.div`flex flex-col items-center md:items-center lg:items-center mb-4 md:mb-6`;
const PlanTitle = tw.span`text-base md:text-lg font-medium`;
const PlanSubtitle = tw.span`text-xs font-medium mb-3 md:mb-4`;
const PlanPrice = tw.span`text-base md:text-lg font-medium mb-2`;
const SignupButton = tw.button`bg-black text-white py-1 px-4 md:py-2 md:px-6 rounded-full font-bold`;
const ContainerDrop = tw.div`overflow-x-auto mt-2`;
const BorderContainer = tw.div`border-b border-gray-200`;
const Header = tw.div`flex justify-between items-center border-b border-gray-200 px-2 md:px-4`;
const ToggleButton = tw.button`text-sm md:text-xl font-medium mb-3 md:mb-4`;
const Dropdown = tw.div`flex items-center cursor-pointer`;
const ArrowIcon = tw(
  RiArrowDropDownLine
)`inline-block w-8 h-8 md:w-12 md:h-12 transition-transform duration-200 ease-in-out`;
const Content = tw.div`transition-max-height duration-200 ease-in-out`;
const FeatureRow = tw.div`grid grid-cols-2 md:grid-cols-5 hover:bg-gray-200 h-16 md:h-20 rounded-lg text-gray-600 border-b border-dotted`;
const FeatureTitle = tw.p`text-xs md:text-sm font-small underline underline-offset-1 flex items-center pl-2 md:pl-4`;
const FeatureCell = tw.p`p-1 md:p-2 text-left items-center`;

export default PricingTable;
