import Config from "Config";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NoPermissionModal = ({ isOpen, planType }) => {
  const navigate = useNavigate();

  const handleGoBackButton = () => {
    navigate(-1);
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-80">
      <div className="relative px-6 pt-10 pb-8 shadow-xl bg-white/90 ring-1 ring-gray-900/5 sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <svg
              className="w-12 h-12 mx-auto text-orange-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {planType === Config.Plans.Free
                ? "Subscribe to Unlock Feature"
                : "Upgrade to Unlock Feature"}
            </h2>
          </div>

          <div className="divide-y divide-gray-300/50">
            <div className="py-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Your current plan does not support this feature. Please upgrade
                your subscription to access it.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="flex-none w-6 h-6 mt-1 stroke-2 fill-orange-100 stroke-orange-500"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="11" />
                    <path
                      d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                      fill="none"
                    />
                  </svg>
                  <p className="ml-4">
                    Unlock more features and benefits by upgrading your plan!
                  </p>
                </li>
                <li className="flex items-start">
                  <svg
                    className="flex-none w-6 h-6 stroke-2 fill-orange-100 stroke-orange-500"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="11" />
                    <path
                      d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                      fill="none"
                    />
                  </svg>
                  <p className="ml-4">
                    Enjoy enhanced support from our team, available only to
                    premium users.
                  </p>
                </li>
              </ul>
            </div>

            <div className="pt-8 text-base font-semibold leading-7 text-center">
              {/* <p className="text-gray-900">
                Want to design your own USSD survey? Then...
              </p> */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handleGoBackButton}
                  className="inline-block px-6 py-2 mt-4 text-gray-600 bg-white border border-gray-600 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 hover:text-white"
                >
                  Go Back
                </button>
                <Link
                  to="/plans"
                  className="inline-block px-6 py-2 mt-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                >
                  Upgrade
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPermissionModal;
