import React, { useState } from "react";
import Model from "../Model";
import tw from "tailwind-styled-components";
import Loading from "../Loading";

import {
    ModelDangerBtn,
    CancelBtn
} from "../Styles/InputStyles";

const Block = ({
    setOpenBlockModel,
    blockDeviceMutate,
    blockDeviceLoading,
    groupId,
    deviceId,
    selectedItem,
}) => {
    const DeleteDevice = () =>
        blockDeviceMutate({ contactId: deviceId?.id, groupId });

    return (
        <Model width={"w-11/12 max-w-md"} setOpenModel={setOpenBlockModel} title="Block contact">
            {blockDeviceLoading && <Loading />}
            {!blockDeviceLoading && (
                <>
                    {/* <Title>Are you sure?</Title> */}
                    {/* <SubTitle>You are about to {deviceId.status == "1" ? "Block" : "Unblock"} selected contact. They will no longer be able to receive sms/email campaigns but will still be displayed in your contacts.</SubTitle> */}
                    <SubTitle>
                        You are about to {deviceId.status == "1" ? "Block" : "Unblock"} selected contact.
                        {deviceId.status == "1"
                            ? "They will no longer be able to receive sms/email campaigns but will still be displayed in your contacts."
                            : "They will now be able to receive sms/email campaigns."}
                    </SubTitle>

                    <div className="w-full flex items-center justify-end space-x-10 mt-8">
                        <CancelBtn onClick={() => setOpenBlockModel(false)}>Cancel</CancelBtn>
                        <ModelDangerBtn onClick={DeleteDevice}>{deviceId.status == "1" ? "Block" : "Unblock"}</ModelDangerBtn>
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

export default Block;
