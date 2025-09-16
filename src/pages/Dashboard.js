

import React, { useEffect, useState } from "react";
import {
  Page,
  Container,
  Content,
} from "../components/Styles/PageStyles";

import TopNavbar from "components/TopNavbar";
import TrafficChart from "components/Dashboard/TrafficChart";
import OrderStatus from "components/Dashboard/OrderStatus";
import Summary from "components/Dashboard/Summary";
import { FaCommentSms } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
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



  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          {loading ? (
            <Loading />
          ) : (
            <Content className="p-6 min-h-screen bg-gray-50">
              {/* Enhanced Header Section */}
              <div className="mb-8">
                <div className="p-8 text-white bg-gradient-to-r from-[#06163A] to-[#F97316] rounded-xl shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="mb-2 text-3xl font-bold">Welcome back, {user?.name || "User"}! 👋</h1>
                      <p className="text-lg text-blue-100">Here's what's happening with your campaigns today</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <div className="p-4 rounded-lg backdrop-blur-sm bg-white/20">
                        <p className="text-sm text-blue-100">Total Campaigns</p>
                        <p className="text-2xl font-bold">{dashboardData?.totalCampaigns || "0"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Summary and Chart Section */}
              <div className="mb-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                    <Summary
                      totalCampaigns={dashboardData?.totalCampaigns}
                    />
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                    <TrafficChart pieData={pieData} />
                  </div>
                </div>
              </div>

              {/* Enhanced Campaign Cards */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Campaign Overview</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Live Data</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* SMS Campaign Card */}
                  <div className="overflow-hidden relative bg-white rounded-xl border border-gray-100 shadow-lg transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="relative p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                            <FaCommentSms className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">SMS Campaigns</h3>
                            <p className="text-sm text-gray-500">Text messaging campaigns</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-gray-800">
                            {cardData ? cardData["SMS"]?.count : "0"}
                          </div>
                          <div className="text-sm font-medium text-green-600">Active</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <div className="mr-2 w-2 h-2 bg-purple-500 rounded-full"></div>
                            SMS Only
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Last updated: Now
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email Campaign Card */}
                  <div className="overflow-hidden relative bg-white rounded-xl border border-gray-100 shadow-lg transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="relative p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
                            <MdEmail className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">Email Campaigns</h3>
                            <p className="text-sm text-gray-500">Email marketing campaigns</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-gray-800">
                            {cardData ? cardData["Email"]?.count : "0"}
                          </div>
                          <div className="text-sm font-medium text-green-600">Active</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <div className="mr-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                            Email Only
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Last updated: Now
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Recent Campaigns Section */}
              <div className="overflow-hidden bg-white rounded-xl border border-gray-100 shadow-lg">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Recent Campaigns</h2>
                  <p className="mt-1 text-sm text-gray-600">Track your latest SMS and Email campaigns</p>
                </div>
                <div className="p-6">
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

export default Dashboard;
