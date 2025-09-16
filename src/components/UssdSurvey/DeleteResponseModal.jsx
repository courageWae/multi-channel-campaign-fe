import React from "react";
import Model from "../Model";
import tw from "tailwind-styled-components";
import Loading from "../Loading";
import {
  CancelBtn,
  SubmitBtn,
} from "../Styles/InputStyles";

const DeleteResponseModal = ({ response, onConfirm, onCancel, loading }) => {
  return (
    <Model
      width={"w-full max-w-md"}
      setOpenModel={onCancel}
      title="Delete Response"
    >
      {loading && <Loading />}
      {!loading && (
        <>
          <div className="px-8 py-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex justify-center items-center mb-4 w-16 h-16 bg-red-100 rounded-full">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              
              <div className="text-center">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Delete Response</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Are you sure you want to delete this response? This action cannot be undone.
                </p>
                
                {response && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-700">
                      <div className="mb-2 font-medium">Response Details:</div>
                      <div className="space-y-1">
                        <div><span className="font-medium">Phone:</span> {response.phone_number}</div>
                        <div><span className="font-medium">Response:</span> {response.responses}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between p-6 border-t border-gray-200">
            <CancelBtn type="button" onClick={onCancel}>
              Cancel
            </CancelBtn>
            <BtnWrapper>
              <SubmitBtn 
                type="button" 
                onClick={onConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Response
              </SubmitBtn>
            </BtnWrapper>
          </div>
        </>
      )}
    </Model>
  );
};

const BtnWrapper = tw.div`flex justify-center items-center`;

export default DeleteResponseModal;
