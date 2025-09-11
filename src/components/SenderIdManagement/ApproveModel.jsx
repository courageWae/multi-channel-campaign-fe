import React, { useState } from "react";
import Model from "../Model";
import tw from "tailwind-styled-components";
import Loading from "../Loading";

import {
    ModelGreenBtn,
    CancelBtn,
    ModelDangerBtn
} from "../Styles/InputStyles";

const UploadModel = ({
    setSenderIdActionModel,
    senderIdActionMutate,
    senderIdActionLoading,
    selectedData,
    action,
    deviceId
}) => {
    const [reason, setReason] = useState("");
    const ApproveDevice = () =>
        senderIdActionMutate({ rowId: selectedData?.id, action, reason });
    console.log(action)
    return (
        <Model width={"w-11/12 max-w-md"} setOpenModel={setSenderIdActionModel} title={action == 1 ? "Approve sender id" : "Reject sender id"} >
            {senderIdActionLoading && <Loading />}
            {!senderIdActionLoading && (
                <>
                    {/* <Title>Are you sure?</Title> */}
                    {action == 2 && (
                        <SubTitle>You are about to reject the selected Sender ID. This action will mark the Sender ID as inactive and will not be usable for sending messages. Please review the details carefully before proceeding.</SubTitle>)}
                    {action == 1 && (
                        <SubTitle>You are about to approve the selected Sender ID. This action will make the Sender ID active and usable for sending messages. Please review the details carefully before proceeding.</SubTitle>)}
                    {action === 2 && (
                        <ReasonInput
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Enter reason"
                            required
                        />
                    )}

                    <div className="w-full flex items-center justify-end space-x-10 mt-8">
                        <CancelBtn onClick={() => setSenderIdActionModel(false)}>Cancel</CancelBtn>
                        {action == 1 && (
                            <ModelGreenBtn onClick={ApproveDevice}>Approve</ModelGreenBtn>)}
                        {action == 2 && (
                            <ModelDangerBtn onClick={ApproveDevice}>Reject</ModelDangerBtn>)}
                    </div>
                </>
            )}
        </Model>
    );
};

const Title = tw.h2` text-lg md:text-xl lg:text-2xl text-gray-600 mb-2 font-bold text-center`;
const SubTitle = tw.p` text-sm md:text-base text-left mb-6 text-gray-700 text-pretty pt-2`;
const Delete = tw.button`px-10 py-2.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 font-semibold`;
const Cancel = tw.button`px-10 py-2.5 text-sm border border-gray-600 text-gray-600 rounded font-semibold hover:bg-gray-200`;
const ReasonInput = tw.input`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 rounded-md`;
export default UploadModel;
