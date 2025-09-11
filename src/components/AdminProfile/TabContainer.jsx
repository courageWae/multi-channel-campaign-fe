import React from "react";
import { FaUser } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

const TabContainer = ({ setTab, tab, tabPanelID }) => {
  const handleTabChange = (tabId) => {
    setTab(tabId);
  };

  return (
    <div className="text-md my-6 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px list-none">
        <li className="me-2 list-none group">
          <button
            onClick={() => handleTabChange(tabPanelID.PERSONAL_INFO)}
            className={`flex items-center p-4 border-b-2 rounded-t-lg ${
              tab === tabPanelID.PERSONAL_INFO
                ? "text-orange-600 border-orange-600 dark:text-orange-500 dark:border-orange-500"
                : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }`}
          >
            <FaUser className="mr-2 text-md" />
            <span>Personal Info</span>
          </button>
        </li>
        <li className="me-2 list-none group">
          <button
            onClick={() => handleTabChange(tabPanelID.SECURITY)}
            className={`flex items-center p-4 border-b-2 rounded-t-lg ${
              tab === tabPanelID.SECURITY
                ? "text-orange-600 border-orange-600 dark:text-orange-500 dark:border-orange-500"
                : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }`}
          >
            <MdSecurity className="mr-2 text-md" />
            <span>Security</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TabContainer;
