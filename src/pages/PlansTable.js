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
import { useSelector } from "react-redux";
const PlansTable = () => {
  const user = useSelector((state) => state.UserReducer.user) || null;
  const [activeTab, setActiveTab] = useState("M");
  const [openSections, setOpenSections] = useState({});
  const [isPlanFetched, setIsPlanFetched] = useState(false);
  const [planData, setPlanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [planDuration, setPlanDuration] = useState(Config.planDuration.monthly);
  const [subExpired, setSubExpired] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [subData, setSubData] = useState([]);


  const navigate = useNavigate();

  const changeTabHandler = (value) => {
    setActiveTab(value)
    setPlanDuration(value === "M" ? Config.planDuration.monthly : Config.planDuration.yearly)
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user?.token) {
        const response = await axios.get(`${Config.apiUrl}/profile/get/info`, {
          headers: {
            "Content-Type": "application/json",
            Token: `${user.token}`,
          },
        });
        if (response?.data) {
          setSubData(response?.data);
          setSubExpired(response?.data?.subscription_expired);

          switch (response?.data?.plan_type) {
            case Config.Plans.Free:
              setCurrentPlan("Free");
              break;
            case Config.Plans.Bronze:
              setCurrentPlan("Bronze");
              break;
            case Config.Plans.Silver:
              setCurrentPlan("Silver");
              break;
            case Config.Plans.Gold:
              setCurrentPlan("Gold");
              break;
            default:
              setCurrentPlan(null);
          }
        }
      }
    };
    fetchData();
  }, [user?.token]);
  

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

  const isHigherPlan = (plan) => {
    const planOrder = ["Free", "Bronze", "Silver", "Gold"];
    return (
      planOrder.indexOf(plan.name) > planOrder.indexOf(currentPlan) && !subExpired
    );
  };

  const isLowerPlan = (plan) => {
    const planOrder = ["Free", "Bronze", "Silver", "Gold"];
    return (
      planOrder.indexOf(plan.name) < planOrder.indexOf(currentPlan) && !subExpired
    );
  };

  const handleBuyNowClick = (item) => {
    navigate("/plan-checkout", {
      state: {
        planDetails: item,
        from:"features",
        planDuration
      },
    });
  };

  return (
    <div className="px-10 pb-10">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loading />
        </div>
      ) : (
        <>
          <div className="sticky top-0 z-50 p-0 overflow-x-auto bg-white border-b border-gray-200">
            <h1 className="pt-12 text-3xl font-bold text-center text-black">
              Package Details
            </h1>

            <Container>
              <PaymentOption>
                <Heading>Choose</Heading>
                <SubHeading>Subscription Plan</SubHeading>
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
                  Get {planData.discount}% discount in the price when pay
                  annually
                </DiscountText>
              </PaymentOption>
              {planData?.plans?.map((plan) => (
                <PlanCard key={plan.id}>
                  <PlanTitle>{plan.name}</PlanTitle>
                  <PlanSubtitle>{plan.type}</PlanSubtitle>

                  <PlanPrice>
                    ₵ {activeTab === "Y" ? plan.discount_price : plan.price}
                    /month
                  </PlanPrice>
                  {plan.name === "Free" ? (
                    <Link to="#">
                      <SignupButton type="button" disabled className="text-gray-900 bg-white border border-gray-900">
                        Free Plan
                      </SignupButton>
                    </Link>
                  ) : (
                    <>
                      {isHigherPlan(plan) || subExpired ? (
                            <SignupButton
                              type="button"
                              onClick={() => handleBuyNowClick(plan)}
                            >
                              Buy Now
                            </SignupButton>
                          ) : isLowerPlan(plan) && !subExpired ? (
                            <SignupButton
                              className="text-gray-400 bg-gray-100 border border-gray-300"
                              disabled
                            >
                              Downgrade Disabled
                            </SignupButton>
                          ) : (
                            <SignupButton type="button" onClick={() => handleBuyNowClick(plan)}>
                              {currentPlan === plan.name ? "Active Plan" : "Buy Now"}
                            </SignupButton>
                          )}
                    </>
                  )}
                </PlanCard>
              ))}
            </Container>
            <div className="absolute right-0 top-8">
              <RxCross1
                className="text-2xl text-gray-500 transition duration-100 cursor-pointer md:text-4xl hover:text-black"
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
                    className={openSections[catIndex] ? "max-h-fit" : "max-h-0"}
                  >
                    {openSections[catIndex] &&
                      category.features.map((feature, featureIndex) => (
                        <FeatureRow
                          key={feature.id}
                          className={
                            featureIndex % 2 ? "bg-gray-100" : "bg-white"
                          }
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
                              className={
                                planIndex > 0
                                  ? "hidden md:flex justify-center"
                                  : "flex justify-end md:justify-center"
                              }
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

const Container = tw.div`grid md:grid-cols-5 mt-8 pb-1`;
const PaymentOption = tw.div`flex flex-col items-center space-y-2 text-center font-sans`;
const Heading = tw.h2`font-medium text-black leading-tight text-lg`;
const SubHeading = tw.h2`font-medium text-black leading-none text-lg pb-2`;
const ButtonContainer = tw.div`rounded-full flex items-center p-2 border border-gray-600`;
const Button = tw.button`px-6 py-2 font-medium rounded-full text-sm`;
const DiscountText = tw.p`text-xs text-gray-500 mb-5`;
const PlanCard = tw.div`flex flex-col items-end md:items-center mb-6 mt-4`;
const PlanTitle = tw.span`text-lg font-medium`;
const PlanSubtitle = tw.span`text-xs font-medium mb-4`;
const PlanPrice = tw.span`text-lg font-medium mb-2`;
const SignupButton = tw.button`bg-black text-white py-2 px-6 rounded-full font-bold`;
const DemoButton = tw.button`bg-black text-white py-2 px-6 rounded-full font-bold whitespace-nowrap`;
const ContainerDrop = tw.div`overflow-x-auto`;
const BorderContainer = tw.div`border-b border-gray-200`;
const Header = tw.div`flex justify-between items-center border-b border-gray-200`;
const ToggleButton = tw.button`p-2 text-2xl block font-medium font-sans mb-4`;
const Dropdown = tw.div`flex items-center cursor-pointer`;
const ArrowIcon = tw(
  RiArrowDropDownLine
)`inline-block w-12 h-12 transition-transform duration-200 ease-in-out`;
const Content = tw.div`transition-max-height duration-200 transition ease-in-out`;
const FeatureRow = tw.div`grid grid-cols-2 md:grid-cols-5 md:border-none hover:bg-gray-200 h-20 rounded-lg text-gray-600 border-b border-dotted`;
const FeatureTitle = tw.p`font-small underline underline-offset-1 flex items-center pl-4`;
const FeatureCell = tw.p`p-2 text-left block items-center`;

export default PlansTable;
