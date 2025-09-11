import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../Config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { IoIosCheckmark } from "react-icons/io";
import { GoArrowRight } from "react-icons/go";
import Loading from "components/Loading";
import { IoArrowBackOutline } from "react-icons/io5";

const Pricing = () => {
  const [isPlanFetched, setIsPlanFetched] = useState(false);
  const [planData, setPlanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [isPricingPage, setIsPricingPage] = useState(false);

  useEffect(() => {
    const currentPricingPage = location.pathname.includes("/pricing");
    if (currentPricingPage) {
      setIsPricingPage(true);
    } else {
      setIsPricingPage(false);
    }
  }, [location]);
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

  const handleRedirectToSignUp = () => {
    navigate("/register");
  };

  const handleRedirectBack = ()=>{
    navigate("-1");
  }
  return (
    <div className="py-36">
      <div className="relative z-10 px-4 Container sm:px-6 lg:px-8">
        {isPricingPage && (
          <IoArrowBackOutline onClick={handleRedirectBack} className="text-3xl text-orange-500 cursor-pointer" />
        )}
        <div className="mb-20 text-center">
          <h2 className="text-[42px] font-bold text-gray-800 leading-tight">
            Pick a plan to <span className="text-orange-500">grow up</span> your
            brand!
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
                  ) : (
                    <Button type="button" onClick={handleRedirectToSignUp}>
                      Sign Up
                    </Button>
                  )}
                </div>
                <hr className="mt-6 border-t border-orange-500" />
                <div className="px-6">
                  <ul className="py-6 space-y-2">
                    {parseHTML(plan.key_features)}
                  </ul>
                  <FeatureLink to="/pricing-table">
                    See all features <GoArrowRight className="ml-2 mt-1.5" />
                  </FeatureLink>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Card = tw.div`bg-white shadow-lg rounded-xl border border-orange-600 py-6 relative`;
const Price = tw.p`mt-4 text-2xl font-semibold text-gray-900 text-center mt-20`;
const Button = tw.button`bg-orange-600 text-white py-1.5 px-6 rounded-full mt-1.5`;
const FeatureLink = tw(
  Link
)`mt-4 inline-block text-orange-500 absolute bottom-3 left-8 flex `;
const ListItem = tw.li`text-xs flex`;
const CorrectSign = tw.span`text-orange-500 `;

export default Pricing;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import tw from 'tailwind-styled-components';
// import { IoIosCheckmark } from "react-icons/io";
// import { GoArrowRight } from "react-icons/go";
// import Images from 'Images';
// import Features from './Features';
// const Pricing = () => {
//     const Card = tw.div`bg-white shadow-lg rounded-xl  border border-orange-600 py-6 relative`;
//     const Price = tw.p`mt-4 text-2xl font-semibold text-gray-900 text-center mt-20`;
//     const Button = tw.button`bg-orange-600 text-white py-1.5 px-6 rounded-full mt-1.5`;
//     const FeatureLink = tw(Link)`mt-4 inline-block text-orange-500 absolute bottom-3 left-8 flex `;
//     const ListItem = tw.li`text-xs flex`;
//     const CorrectSign = tw.span`text-orange-500 `;

//     return (
//         <><div className=" py-36">
//             <div className="relative z-10 px-4 Container sm:px-6 lg:px-8">
//                 <div className="mb-20 text-center ">
//                     <h2 className="text-[42px] font-bold text-gray-800 leading-tight">Pick a plan to <span className="text-orange-500 ">grow up</span> your brand!
//                     </h2>
//                     <h2 className="text-[20px] font-normal text-gray-500 leading-tight mt-4 ">A scalable solution where you pay for what you really need.
//                     </h2>

//                 </div>
//                 {/* <Features /> */}
//                 <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

//                     {/* Free Plan */}
//                     <Card>
//                         <h3 className="text-lg font-semibold text-center text-orange-500">Free</h3>
//                         <p className="text-xs text-center">Discover Sevo</p>
//                         <Price>₵0/month</Price>
//                         <div className='flex justify-center'>
//                             <Button>Sign Up</Button>
//                         </div>
//                         <hr className="mt-6 border-t border-orange-500" />
//                         <div className='px-6'>
//                             <ul className="py-6 space-y-2">
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> 300 emails/day</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Customizable email templates</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Drag & drop editor</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Transactional emails</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> SMS & WhatsApp campaigns</ListItem>
//                             </ul>

//                             <FeatureLink to="/pricing-table">See all features <GoArrowRight className='ml-2 mt-1.5' /></FeatureLink>
//                         </div>
//                     </Card>

//                     {/* Starter Plan */}
//                     <Card>
//                         <h3 className="text-lg font-semibold text-center text-orange-500">Silver</h3>
//                         <p className="text-xs text-center">Ideal for growing businesses</p>
//                         <Price>₵625/month</Price>
//                         <div className='flex justify-center'>
//                             <Button>Sign Up</Button>
//                         </div>
//                         <hr className="mt-6 border-t border-orange-500" />
//                         <div className='px-6'>
//                             <ul className="py-6 space-y-2 ">
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> From 5,000 emails/month</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> No daily sending limit</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> No Brevo logo (add-on)</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Basic reporting & analytics</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> 24/7 email support</ListItem>
//                             </ul>
//                             <FeatureLink to="/pricing-table">See all features <GoArrowRight className='ml-2 mt-1.5' /></FeatureLink>
//                         </div>
//                     </Card>

//                     {/* Business Plan */}
//                     <Card>
//                         <h3 className="text-lg font-semibold text-center text-orange-500">Gold</h3>
//                         <p className="text-xs text-center">Built for marketing managers</p>
//                         <Price>₵1,345/month</Price>
//                         <div className='flex justify-center'>
//                             <Button>Sign Up</Button>
//                         </div>
//                         <hr className="mt-6 border-t border-orange-500" />
//                         <div className='px-6'>
//                             <ul className="py-6 space-y-2 ">
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> From 5,000 emails/month</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Marketing automation</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Predictive sending</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Multi-user access</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Landing pages</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> A/B testing</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Advanced statistics</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Phone support</ListItem>
//                             </ul>
//                             <FeatureLink to="/pricing-table">See all features <GoArrowRight className='ml-2 mt-1.5' /></FeatureLink>
//                         </div>
//                     </Card>

//                     {/* Enterprise Plan */}
//                     <Card>
//                         <h3 className="text-lg font-semibold text-center text-orange-500">Enterprise</h3>
//                         <p className="text-xs text-center">Tailored solutions to fit your needs</p>
//                         <Price>₵1,500/month</Price>
//                         <div className='flex justify-center'>
//                             <Link to="/sales-contact">
//                                 <Button>Get a Demo</Button>
//                             </Link>
//                         </div>
//                         <hr className="mt-6 border-t border-orange-500" />
//                         <div className='px-6'>
//                             <ul className="py-6 space-y-2">
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Unlimited contacts</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Sub-account management</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Advanced integrations</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Exclusive features</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Tailored onboarding</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Personalized support</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Enterprise-grade security</ListItem>
//                             </ul>
//                             <FeatureLink to="/pricing-table">See all features <GoArrowRight className='ml-2 mt-1.5' /></FeatureLink>
//                         </div>
//                     </Card>
//                 </div>
//             </div>
//         </div></>
//     );
// };
// const BgImg = tw.img`absolute inset-0 w-full min-h-screen object-cover z-0`;
// export default Pricing;
