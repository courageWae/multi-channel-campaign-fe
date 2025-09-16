import React from "react";
import Model from "../Model";
import tw from "tailwind-styled-components";
import Loading from "../Loading";

import {
  CancelBtn,
  SubmitBtn,
} from "../Styles/InputStyles";

const GoLiveModal = ({
  goLiveLoading,
  setGoLiveModel,
  selectedData,
  goLiveMutate,
}) => {
  const handleConfirm = () => {    
    console.log("Confirming USSD activation with ID:", selectedData);
    goLiveMutate({ id: selectedData });
  };

  const handleClose = () => {
    setGoLiveModel(false);
  };

  return (
    <Model
      width={"w-full max-w-md"}
      setOpenModel={setGoLiveModel}
      title="Activate Your USSD Survey"
    >
      {goLiveLoading && <Loading />}
      {!goLiveLoading && (
        <>
          
          <div className="px-8 py-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex justify-center items-center mb-4 w-16 h-16 bg-blue-100 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              <div className="text-center">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Confirm Activation</h3>
                <p className="text-sm text-gray-600">
                  Once activated, your USSD survey will be live and users can access it through the assigned short code.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between p-6 border-t border-gray-200">
            <CancelBtn type="button" onClick={handleClose}>
              Cancel
            </CancelBtn>
            <BtnWrapper>
              <SubmitBtn type="button" onClick={handleConfirm}>
                Confirm
              </SubmitBtn>
            </BtnWrapper>
          </div>
        </>
      )}
    </Model>
  );
};

const SubTitle = tw.p`text-sm md:text-base text-left mb-6 text-gray-700 text-pretty pt-2`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default GoLiveModal;
