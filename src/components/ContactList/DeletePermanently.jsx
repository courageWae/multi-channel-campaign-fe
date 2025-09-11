import React, { useState } from "react";
import Model from "../Model";
import tw from "tailwind-styled-components";
import Loading from "../Loading";

import {
    ModelDangerBtn,
    CancelBtn
} from "../Styles/InputStyles";

const DeletePermanently = ({
    setOpenDeletePermanentlyModel,
    deletePermanentlyDeviceMutate,
    deletePermanentlyDeviceLoading,
    deviceId,
    selectedItem,
}) => {
    const DeleteDevice = () =>
        deletePermanentlyDeviceMutate({ contactId: deviceId?.id, groupId: deviceId?.group_id });

    return (
        <Model width={"w-11/12 max-w-md"} setOpenModel={setOpenDeletePermanentlyModel} title="Delete permanently">
            {deletePermanentlyDeviceLoading && <Loading />}
            {!deletePermanentlyDeviceLoading && (
                <>
                    {/* <Title>Are you sure?</Title> */}
                    {/* <SubTitle>Are you sure want to delete this item permanently? This action can't be undone.</SubTitle> */}
                    <SubTitle>You are about to delete selected contact. Deleting contacts is permanent and cannot be undone.</SubTitle>

                    <div className="w-full flex items-center justify-end space-x-10 mt-8">
                        <CancelBtn onClick={() => setOpenDeletePermanentlyModel(false)}>Cancel</CancelBtn>
                        <ModelDangerBtn onClick={DeleteDevice}>Delete</ModelDangerBtn>
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

export default DeletePermanently;
