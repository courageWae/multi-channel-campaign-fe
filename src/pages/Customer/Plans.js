import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../Config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { IoIosCheckmark } from "react-icons/io";
import { GoArrowRight } from "react-icons/go";
import Loading from "components/Loading";
import {
  Container,
  Content,
  ContentHeader,
  HeaderSubTitle,
  HeaderTitle,
  Page,
} from "components/Styles/PageStyles";
import TopNavbar from "components/TopNavbar";
import { useSelector } from "react-redux";

const Plans = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const navigate = useNavigate();
  const [isPlanFetched, setIsPlanFetched] = useState(false);
  const [planData, setPlanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subData, setSubData] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [subExpired, setSubExpired] = useState(false);

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

  const getPlans = async () => {
    try {
      const res = await axios.get(`${Config.apiUrl}/plan/view`);
      setPlanData(res?.data?.data);
      setLoading(false);
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

  const parseHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const items = Array.from(doc.querySelectorAll("li")).map((item, index) => (
      <ListItem key={index}>
        <IoIosCheckmark className="mr-2 -mt-1 text-orange-500 w-7 h-7" />
        {item.textContent}
      </ListItem>
    ));
    return items;
  };

  const handleBuyNowClick = (plan) => {
    navigate("/plan-checkout", {
      state: {
        planDetails: plan,
        from:"plans",
        planDuration:Config.planDuration.monthly
      },
    });
  };  

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

  return (
    <Container>
      <Page>
        <TopNavbar />
        <Content>
          <div className="relative z-10 px-4 Container sm:px-6 lg:px-8">
            <div className="mb-20 text-center">
              <h2 className="text-[42px] font-bold text-gray-800 leading-tight">
                Pick a plan to <span className="text-orange-500">grow up</span>{" "}
                your brand!
              </h2>
              <h2 className="text-[20px] font-normal text-gray-500 leading-tight mt-4">
                A scalable solution where you pay for what you really need.
              </h2>
            </div>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loading />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {planData.map((plan) => (
                  <Card key={plan.id}>
                    <h3 className="text-lg font-semibold text-center text-orange-500">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-center">
                      {plan.plan_short_description}
                    </p>
                    <Price>₵{plan.price}/month</Price>
                    <div className="flex justify-center">
                      {plan.name === "Enterprise" ? (
                        <Link to="/sales-contact">
                          <Button>Get a Demo</Button>
                        </Link>
                      ) : plan.name !== "Free" ? (
                        <>
                          {isHigherPlan(plan) || subExpired ? (
                            <Button
                              type="button"
                              onClick={() => handleBuyNowClick(plan)}
                            >
                              Buy Now
                            </Button>
                          ) : isLowerPlan(plan) && !subExpired ? (
                            <Button
                              className="text-gray-400 bg-gray-100 border border-gray-300"
                              disabled
                            >
                              Downgrade Disabled
                            </Button>
                          ) : (
                            <Button type="button" onClick={() => handleBuyNowClick(plan)}>
                              {currentPlan === plan.name ? "Active Plan" : "Buy Now"}
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button className="text-orange-500 bg-white border border-orange-500">
                          Free Plan
                        </Button>
                      )}
                    </div>
                    <hr className="mt-6 border-t border-orange-500" />
                    <div className="px-6">
                      <ul className="py-6 space-y-2">
                        {parseHTML(plan.key_features)}
                      </ul>
                      <FeatureLink to="/plans-table">
                        See all features <GoArrowRight className="ml-2 mt-1.5" />
                      </FeatureLink>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Content>
      </Page>
    </Container>
  );
};

const Card = tw.div`bg-white shadow-lg rounded-xl border border-orange-600 py-6 relative`;
const Price = tw.p`mt-4 text-2xl font-semibold text-gray-900 text-center mt-20`;
const Button = tw.button`bg-orange-600 text-white py-1.5 px-6 rounded-full mt-1.5`;
const FeatureLink = tw(
  Link
)`mt-4 inline-block text-orange-500 absolute bottom-3 left-8 flex `;
const ListItem = tw.li`text-xs flex`;

export default Plans;
