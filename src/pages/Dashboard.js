// import React, { useState } from "react";
// import Navbar from "components/Navbar";
// import { Link, useParams, useNavigate } from "react-router-dom";

// import {
//   Page,
//   Container,
//   Content,
//   ContentHeader,
//   HeaderTitle,
//   HeaderSubTitle,
// } from "../components/Styles/PageStyles";

// import Images from "Images";
// import tw from "tailwind-styled-components";
// import Sidebar from "components/SideNavbar";
// import TopNavbar from "components/TopNavbar";
// import DashboardHeader from "components/Dashboard/DashboardHeader";
// import StatisticsCards from "components/Dashboard/StatisticsChart";
// import TrafficChart from "components/Dashboard/TrafficChart";
// import RecentActivities from "components/Dashboard/RecentActivities";
// import OrderStatus from "components/Dashboard/OrderStatus";
// import StatCards from "components/Dashboard/StatCards";
// import Summary from "components/Dashboard/Summary";
// import Graph from "components/Dashboard/Graph";
// import {
//   FaCrown,
//   FaFacebook,
//   FaInstagram,
//   FaSms,
//   FaTelegram,
//   FaWhatsapp,
// } from "react-icons/fa";
// import { IoHeartCircleSharp, IoHeart } from "react-icons/io5";
// import { BsGraphUpArrow } from "react-icons/bs";
// import { FaWandMagicSparkles, FaChartBar } from "react-icons/fa6";
// import StatCard from "components/Dashboard/StatCard";
// import { MdEmail, MdGraphicEq, MdStackedBarChart } from "react-icons/md";
// import { SlGraph } from "react-icons/sl";
// import { ImParagraphLeft } from "react-icons/im";
// import { MdAutoGraph } from "react-icons/md";
// import { PiPlusCircleBold } from "react-icons/pi";
// import { useMutation, useQuery } from "react-query";
// import axios from "axios";
// import Config from "../Config";
// import { useSelector } from "react-redux";
// import { BiLogoTelegram } from "react-icons/bi";
// import Loading from "components/Loading";
// import NotFoundModel from "components/NotFoundModel";

// const Dashboard = () => {
//   const user = useSelector((state) => state.UserReducer.user);
//   const [openUploadModel, setOpenUploadModel] = useState(false);
//   const [gotInitialResp, setGotInitialResp] = useState(false);
//   const fetchFunction = async () =>
//     await axios.get(`${Config.apiUrl}/dashboard`, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Token: `${user.token}`,
//       },
//     });

//   const { isLoading, error, data, refetch, isRefetching } = useQuery(
//     "adminApi",
//     fetchFunction,
//     {
//       onSuccess: () => setGotInitialResp(true),
//       onError: () => setGotInitialResp(true),
//     }
//   );

//   return (
//     <>
//       <Container>
//         {/* <Sidebar /> */}
//         <Page>
//           <TopNavbar />
//           <Content>
//             <ContentHeader>
//               <div className="flex items-center justify-between">
//                 <HeaderTitle>Welcome, {user.name}</HeaderTitle>
//               </div>
//               <HeaderSubTitle>Manage your dashboard settings</HeaderSubTitle>
//             </ContentHeader>
//             {(isLoading || !gotInitialResp) && <Loading />}
//             {(error || !data) && !isLoading && gotInitialResp && (
//               <NotFoundModel />
//             )}
//             {!isLoading && gotInitialResp && (
//               <>
//                 <DashboardContainer>
//                   <MainContent>
//                     <div className="md:flex ">
//                       <Summary campaignData={data?.data?.data} />
//                       <Graph graphData={data?.data?.data} />
//                     </div>
//                     <div className="grid grid-cols-2 md:flex">
//                       <StatCard
//                         title="Facebook"
//                         value={data?.data?.data?.card[5]?.count}
//                         icon={FaFacebook}
//                         color="#667ADD"
//                       />
//                       <StatCard
//                         title="Instagram"
//                         value={data?.data?.data?.card[6]?.count}
//                         icon={FaInstagram}
//                         color="#e1306c"
//                       />
//                       <StatCard
//                         title="Whatsapp"
//                         value={data?.data?.data?.card[3]?.count}
//                         icon={FaWhatsapp}
//                         color="#4BA23C"
//                       />
//                       <StatCard
//                         title="Telegram"
//                         value={data?.data?.data?.card[4]?.count}
//                         icon={BiLogoTelegram}
//                         color="#667ADD"
//                       />
//                     </div>
//                   </MainContent>
//                   <SideContent>
//                     <TrafficChart cardData={data?.data?.data} />
//                   </SideContent>
//                 </DashboardContainer>
//                 <CardContainer>
//                   <StatCards
//                     title="SMS"
//                     value={data?.data?.data?.card[0]?.count}
//                     date="Jan 01 - Jan 10"
//                     color="#E0F7FA"
//                     icon={FaSms}
//                     iconcolor="#22c55e"
//                   />
//                   <StatCards
//                     title="Email"
//                     value={data?.data?.data?.card[1]?.count}
//                     date="Jan 01 - Jan 10"
//                     color="#FFFDE7"
//                     icon={MdEmail}
//                     iconcolor="#FFC700"
//                   />
//                   <StatCards
//                     title="Voice"
//                     value={data?.data?.data?.card[2]?.count}
//                     date="Jan 01 - Jan 10"
//                     color="#FBE9E7"
//                     icon={MdGraphicEq}
//                     iconcolor="#FF834B"
//                   />
//                 </CardContainer>
//                 <div className="flex flex-col p-2 space-y-4 bg-gray-100 md:flex-row md:space-y-0 md:space-x-4">
//                   <div className="w-full md:w-1/3">
//                     <RecentActivities
//                       ActivityData={data?.data?.data.socialMedia || []}
//                     />
//                   </div>
//                   <div className="w-full md:w-2/3">
//                     <OrderStatus ApiData={data?.data?.data} />
//                   </div>
//                 </div>
//               </>
//             )}
//           </Content>
//         </Page>
//       </Container>
//     </>
//   );
// };

// const DashboardContainer = tw.div`flex flex-wrap md:flex-nowrap`;
// const CardContainer = tw.div`flex flex-wrap md:flex-nowrap `;

// const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded`;

// const MainContent = tw.div`w-full md:w-[70%] p-2 `;
// const SideContent = tw.div`w-full md:w-[30%] p-2 `;
// export default Dashboard;

import React, { useEffect, useState } from "react";
import Navbar from "components/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  Page,
  Container,
  Content,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
} from "../components/Styles/PageStyles";

import Images from "Images";
import tw from "tailwind-styled-components";
import Sidebar from "components/SideNavbar";
import TopNavbar from "components/TopNavbar";
import DashboardHeader from "components/Dashboard/DashboardHeader";
import StatisticsCards from "components/Dashboard/StatisticsChart";
import TrafficChart from "components/Dashboard/TrafficChart";
import RecentActivities from "components/Dashboard/RecentActivities";
import OrderStatus from "components/Dashboard/OrderStatus";
import StatCards from "components/Dashboard/StatCards";
import Summary from "components/Dashboard/Summary";
import Graph from "components/Dashboard/Graph";
import {
  FaCrown,
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { IoHeartCircleSharp, IoHeart } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import {
  FaWandMagicSparkles,
  FaChartBar,
  FaMobileRetro,
  FaCommentSms,
} from "react-icons/fa6";
import StatCard from "components/Dashboard/StatCard";
import {
  MdEmail,
  MdGraphicEq,
  MdSettingsVoice,
  MdStackedBarChart,
} from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { ImParagraphLeft } from "react-icons/im";
import { MdAutoGraph } from "react-icons/md";
import { PiPlusCircleBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Config from "Config";
import Loading from "components/Loading";
import { Save_Dashboard_Info } from "Redux/actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserReducer.user);

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [cardData, setCardData] = useState({});
  const [pieData, setPieData] = useState({});
  const [campaigns, setCampaigns] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);
  const [graphData, setGraphData] = useState([null]);

  useEffect(() => {
    let isMounted = true; // To avoid memory leaks

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Config.apiUrl}/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Token: user?.token,
          },
        });

        const { data } = response;
        if (isMounted && data) {
          console.log("dashboardData", data);
          
          //* STORE THE PERMISSIONS
          dispatch(Save_Dashboard_Info(data?.data?.permissions));
          
          setDashboardData(data?.data);
          setCampaigns(data?.data?.campaigns || []);
          setSocialMedia(data?.data?.socialMedia || []);
          setGraphData(data?.data?.monthlyWiseData || []);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (user?.token) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [user?.token, dispatch]);

  useEffect(() => {
    if (dashboardData && dashboardData.card) {
      const cardMapping = {};

      dashboardData.card.forEach((item) => {
        cardMapping[item.name] = item;
      });

      setCardData(cardMapping);
    }
  }, [dashboardData]);

  useEffect(() => {
    if (dashboardData && dashboardData.pie) {
      const pieMapping = {};

      dashboardData.pie.forEach((item) => {
        pieMapping[item.name] = item;
      });

      setPieData(pieMapping);
    }
  }, [dashboardData]);

  console.log("pie data", pieData);

  return (
    <>
      <Container>
        {/* <Sidebar /> */}
        <Page>
          <TopNavbar />
          {loading ? (
            <Loading />
          ) : (
            <Content>
              <ContentHeader>
                <div className="flex items-center justify-between">
                  <HeaderTitle>Welcome, {user?.name || "User"}</HeaderTitle>
                  {/* <Button
                      className="rounded-xl"
                      type="button"
                      onClick={() => setOpenUploadModel(true)}
                    >
                      <PiPlusCircleBold size={18} />{" "}
                      <p className="font-semibold">Create</p>
                    </Button> */}
                </div>
                <HeaderSubTitle>Manage your dashboard settings</HeaderSubTitle>
                {/* <div className="flex items-center gap-4 mt-4">
                    <Link to="" className="flex items-center gap-1">
                      <p className="underline hover:text-topBar-purple">
                        Get started with contact groups
                      </p>
                      <img src={Images.ShareIcon} alt="Share" />
                    </Link>
                    <Link to="">
                      <p className="underline hover:text-topBar-purple">
                        Lists vs Segments
                      </p>
                    </Link>
                  </div> */}
              </ContentHeader>

              <DashboardContainer>
                <MainContent>
                  <div className="md:flex ">
                    <Summary
                      totalSocialMedia={dashboardData?.totalSocialMedia}
                      totalCampaigns={dashboardData?.totalCampaigns}
                    />
                    <Graph graphData={graphData} />
                  </div>
                  <div className="grid grid-cols-2 md:flex">
                    <StatCard
                      title="Facebook Campaigns"
                      value={cardData ? cardData["Facebook"].count : "0"}
                      icon={FaFacebookF}
                      color="#2462F2FF"
                    />
                    <StatCard
                      title="Instagram Campaigns"
                      value={cardData ? cardData["Instagram"].count : "0"}
                      icon={FaInstagram}
                      color="linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)"
                    />
                    <StatCard
                      title="Telegram Campaigns"
                      value={cardData ? cardData["Telegram"].count : "0"}
                      icon={FaTelegramPlane}
                      color="#31A8E0"
                    />

                    <StatCard
                      title="Whatsapp Campaigns"
                      value={cardData ? cardData["Whatsapp"].count : "0"}
                      color="#22c55e"
                      icon={FaWhatsapp}
                    />
                  </div>
                </MainContent>
                <SideContent>
                  <TrafficChart pieData={pieData} />
                </SideContent>
              </DashboardContainer>
              <CardContainer>
                <StatCards
                  title="Total SMS Campaigns"
                  value={cardData ? cardData["SMS"].count : "0"}
                  date=""
                  color="#EDE7F6"
                  icon={FaCommentSms}
                  iconcolor="#9315FF"
                />
                <StatCards
                  title="Total Email Campaigns"
                  value={cardData ? cardData["Email"].count : "0"}
                  date=""
                  color="#FBE9E7"
                  icon={MdEmail}
                  iconcolor="#FF834B"
                />
                  <StatCards
                    title="Total Voice Campaigns"
                    value={cardData ? cardData["Voice"].count : "0"}
                    date=""
                    color="#FFFDE7"
                    icon={MdSettingsVoice}
                    iconcolor="#FFC700"
                  />
                <StatCards
                  title="USSD Survey Campaigns"
                  value={"0"}
                  date=""
                  color="#E0E1FAFF"
                  icon={FaMobileRetro}
                  iconcolor="#2816E9FF"
                />
              </CardContainer>
              <div className="flex flex-col p-2 space-y-4 bg-gray-100 md:flex-row md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/3">
                  <RecentActivities socialMedia={socialMedia} />
                </div>
                <div className="w-full md:w-2/3">
                  <OrderStatus campaigns={campaigns} />
                </div>
              </div>
            </Content>
          )}
        </Page>
      </Container>
    </>
  );
};

const DashboardContainer = tw.div`flex flex-wrap md:flex-nowrap`;
const CardContainer = tw.div`flex flex-wrap md:flex-nowrap `;

const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded`;

const MainContent = tw.div`w-full md:w-[75%] p-2 `;
const SideContent = tw.div`w-full md:w-[25%] p-2 `;
export default Dashboard;
