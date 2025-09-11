import React, { useState } from "react";
import { ImMobile } from "react-icons/im";
import tw from "tailwind-styled-components";
import { useSelector } from "react-redux";
import Timer from "./Timer";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { HiOutlineSignal } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";

const ModalBackdrop = tw.div`fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-black bg-opacity-50 flex justify-center items-center`;
const ModalDialog = tw.div`relative w-auto p-6 pointer-events-none translate-y-0 opacity-100 transition-all duration-300 ease-in-out sm:mx-auto w-3/5 sm:mt-7 sm:max-w-[700px] lg:max-w-[700px]`;
const ModalContent = tw.div`pointer-events-auto flex w-full flex-col rounded-md bg-white shadow-lg text-current dark:bg-surface-dark`;
const ModalHeader = tw.div`flex items-center justify-between rounded-t-md border-b-2 p-4 dark:border-white/10`;
const ModalTitle = tw.h5`text-xl py-4 flex gap-2  items-center font-bold text-gray-900 dark:text-white leading-normal text-surface dark:text-white`;
const ModalBody = tw.div`relative p-4`;
const CloseButton = tw.button`box-content text-neutral-500 hover:text-neutral-800 focus:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300 focus:outline-none`;

// Main Modal Component
const UssdDetails = ({
  selectedData,
  ussdDetailsModal,
  setUssdDetailsModal,
}) => {
  const user = useSelector((state) => state.UserReducer.user);

  const closeModal = () => {
    setUssdDetailsModal(false);
  };

  console.log("selectedData: ", selectedData);

  if (!ussdDetailsModal || !selectedData) return null;

  return (
    <ModalBackdrop
      id="exampleModalLg"
      tabIndex="-1"
      aria-labelledby="exampleModalLgLabel"
      aria-modal="true"
      role="dialog"
    >
      <ModalDialog>
        <ModalContent>
          {/* Modal Header */}
          <ModalHeader>
            <ModalTitle id="exampleModalLgLabel">
              <ImMobile className="text-xl text-orange-600" />
              <span className="flex items-center gap-3 ml-2 font-semibold text-gray-600 text-[24px]">
                Survey Details
              </span>
            </ModalTitle>
            <CloseButton aria-label="Close" onClick={closeModal}>
              <span className="[&>svg]:h-6 [&>svg]:w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <div className="body">
              {selectedData.reason !== null && (
                <WarningAlert children={selectedData.reason} />
              )}
              <div className="grid grid-cols-3 gap-6">
                <div className="h-full col-span-1 p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <GetTimeLeft item={selectedData} />
                      <p className="text-lg text-center text-gray-400">
                        {"Test Duration"}
                      </p>
                    </div>
                    <div className="w-0.5 h-[350px] bg-gray-300"></div>
                  </div>
                </div>
                <div className="h-full col-span-2 p-3">
                  <div className="flex flex-col gap-6">
                    <ShortCodeCard item={selectedData} />
                    <SurveyDetails item={selectedData} />
                  </div>
                  <div className="flex items-center justify-end w-full my-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-1 text-white transition bg-orange-500 rounded-md duration-300s hover:bg-orange-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </ModalDialog>
    </ModalBackdrop>
  );
};

const GetTimeLeft = ({ item }) => {
  return (
    <Timer
      id={item.id}
      datetime={item.created_at}
      expiry_time={item.expiry_time}
      status={item.status}
      short_code_status={item.short_code_status}
    />
  );
};

const ShortCodeCard = ({ item }) => {
  const isExpired = testingExpired(item.expiry_time);
  return (
    <div className="w-full p-4 bg-white border border-gray-100 rounded-md shadow-md">
      <div className="">
        <div className="w-full">
          <h4 className="font-semibold text-gray-400 text-md">Short Code</h4>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-500">
            {item.short_code}
          </p>
          {item.short_code_status === 1 && !isExpired ? (
            <div className="px-[25px] py-[5px] bg-purple-50 text-purple-500 rounded-md flex gap-2 items-center">
              <AiOutlineCodeSandbox />
              <span className="text-sm font-semibold">Sandbox</span>
            </div>
          ) : item.short_code_status === 2 ? (
            <div className="px-[25px] py-[5px] bg-emerald-50 text-emerald-500 rounded-md flex gap-2 items-center">
              <HiOutlineSignal />
              <span className="text-sm font-semibold">Live</span>
            </div>
          ) : item.short_code_status === 3 || isExpired === true ? (
            <div className="px-[25px] py-[5px] bg-rose-50 text-rose-500 rounded-md flex gap-2 items-center">
              <IoTimeOutline />
              <span className="text-sm font-semibold">Expired</span>
            </div>
          ) : (
            <div className="px-[25px] py-[5px] bg-red-50 text-red-500 rounded-md flex gap-2 items-center">
              <IoTimeOutline />
              <span className="text-sm font-semibold">Inactive</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const testingExpired = (expiredAt) => {
  const expiredDate = new Date(expiredAt);
  return new Date() > expiredDate;
};

const SurveyDetails = ({ item }) => {
  return (
    <div className="w-full px-4 py-6 bg-white border border-gray-100 rounded-md shadow-md">
      <div className="flex items-start justify-between w-full py-3">
        <p className="text-sm font-semibold text-gray-400 font-inter">
          Approval Status:
        </p>
        {item.status === 1 ? (
          <div className="px-[25px] py-[5px] bg-amber-50 text-amber-500 rounded-md flex gap-2 items-center">
            <MdOutlinePending />
            <span className="text-sm font-bold">Pending</span>
          </div>
        ) : item.status === 2 || item.status === 4 ? (
          <div className="w-[105px] px-4 justify-center py-[5px] bg-emerald-50 text-emerald-500 rounded-md flex gap-2 items-center">
            <FaCheckCircle />
            <span className="text-sm font-semibold">Approved</span>
          </div>
        ) : (
          <div className="w-[105px] px-4 justify-center py-[5px] bg-rose-100 text-rose-500 rounded-md flex gap-2 items-center">
            <FaTimesCircle />
            <span className="text-sm font-bold">Rejected</span>
          </div>
        )}
      </div>
      <div className="flex items-start justify-between w-full py-3">
        <p className="text-sm font-semibold text-gray-400 font-inter">
          Survey Name:
        </p>
        <p className="flex items-start font-semibold justify-start text-gray-600 w-[110px] text-sm text-wrap">
          {item.survey_name}
        </p>
      </div>
      <div className="flex items-start justify-between w-full py-6">
        <p className="text-sm font-semibold text-gray-400 font-inter">
          Survey Status:
        </p>
        {item.status === 2 && item.short_code_status === 2 ? (
          <div className="w-[105px] px-4 justify-center py-[5px] bg-emerald-50 text-emerald-500 rounded-md flex gap-2 items-center">
            <HiOutlineSignal />
            <span className="text-sm font-bold">Live</span>
          </div>
        ) : item.status === 4 ? (
          <div className="w-[105px] px-4 justify-center py-[5px] bg-green-50 text-green-500 rounded-md flex gap-2 items-center">
            <FaTimesCircle />
            <span className="text-sm font-bold">Active</span>
          </div>
        ) : (
          <div className="w-[105px] px-4 justify-center py-[5px] bg-rose-50 text-rose-500 rounded-md flex gap-2 items-center">
            <IoTimeOutline />
            <span className="text-sm font-bold">Inactive</span>
          </div>
        )}
      </div>
    </div>
  );
};

const WarningAlert = ({ children }) => {
  return (
    <div
      className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div className="flex flex-col gap-3">
        <div>
          <span className="font-medium">Reason!</span> This is why your survey
          was rejected.
        </div>
        <div className="text-sm font-medium text-yellow-300 p">{children}</div>
      </div>
    </div>
  );
};

export default UssdDetails;
