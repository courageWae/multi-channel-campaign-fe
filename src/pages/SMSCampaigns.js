import Sidebar from "components/SideNavbar";
import TopNavbar from "components/TopNavbar";
import React, { useState } from "react";

const SMSCampaigns = () => {
  const [activeTab, setActiveTab] = useState("All (3)");

  const tabs = [
    "All (3)",
    "Sent (2)",
    "Drafts (0)",
    "Scheduled (1)",
    "Running (0)",
  ];

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNavbar pageTitle="SMS Campaign" pageSubtitle="SMS campaign" />
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">SMS campaigns</h1>
              <button className="bg-black text-white px-4 py-2 rounded-full">
                Create an SMS campaign
              </button>
            </div>
            <ul className="flex space-x-8 text-xl font-semibold border-b-2 mb-10 mt-10">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  className={`pb-2 cursor-pointer ${
                    activeTab === tab
                      ? "border-b-4 border-organge-500 text-orange-500"
                      : "hover:border-b-4 hover:border-orange-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
            <div className="relative overflow-x-auto ">
              <table className="w-full text-sm text-left bg-white text-gray-200">
                <thead className="text-xl  uppercase bg-white text-gray-600">
                  <tr>
                    <th scope="col" className="px-7 py-4">
                      Campaign
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Recipients
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delivered
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 6,
                      name: "Subscription",
                      status: "Sent",
                      date: "28 Jun 2024, 15:07",
                      recipients: 0,
                      delivered: 0,
                      color: "orange",
                    },
                    {
                      id: 15,
                      name: "Subscription",
                      status: "Suspended",
                      date: "25 Jun 2024, 18:29",
                      recipients: 0,
                      delivered: 0,
                      color: "red",
                    },
                    {
                      id: 11,
                      name: "Subscription1",
                      status: "Suspended",
                      date: "20 Jun 2024, 15:09",
                      recipients: 0,
                      delivered: 0,
                      color: "red",
                    },
                  ].map((campaign, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b text-xl text-black"
                    >
                      <td className="px-6 py-4 flex items-center">
                        <span
                          className={`w-4 h-4 rounded-full bg-${campaign.color}-500 inline-block mr-2`}
                        ></span>
                        <div>
                          <div className="font-bold text-bg-gray-600">
                            {campaign.name}
                          </div>
                          <div className="text-gray-500">
                            #{campaign.id} - {campaign.status} on{" "}
                            {campaign.date}
                          </div>
                          <div className="flex space-x-4">
                            <button className="text-md text-black hover:underline">
                              Report
                            </button>
                            <button className="text-md text-black hover:underline">
                              Preview
                            </button>
                            <button className="text-md text-black hover:underline">
                              More
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-black">
                        {campaign.recipients} (0%)
                      </td>
                      <td className="px-6 py-4 text-black">
                        {campaign.delivered} (0%)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SMSCampaigns;
