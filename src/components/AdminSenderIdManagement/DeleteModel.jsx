import React, { useState } from "react";
import Model from "../Model";
import { SubmitBtn, PreviewBtn } from "../Styles/InputStyles";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const UploadModel = ({
    setOpenDeleteModel,
    deleteDeviceMutate,
    deleteDeviceLoading,
    deviceId,
}) => {
    const DeleteDevice = () => deleteDeviceMutate(deviceId);

    return (
        <Model width={"w-11/12 max-w-lg"} setOpenModel={setOpenDeleteModel}>
            {deleteDeviceLoading && <Loading />}
            {!deleteDeviceLoading && (
                <>
                    <Title>Are you sure to delete this Test Type? </Title>

                    <div className="w-full flex items-center justify-center space-x-10 mt-8">
                        <Delete onClick={DeleteDevice}> Yes</Delete>
                        <Cancel onClick={() => setOpenDeleteModel(false)}>No</Cancel>
                    </div>
                </>
            )}
        </Model>
    );
};

const Title = tw.h2` text-lg md:text-xl lg:text-2xl text-gray-600 font-medium mb-6 text-center`;
const Delete = tw.button`px-8 py-3 text-sm bg-red-500 text-white rounded hover:bg-red-600`;
const Cancel = tw.button`px-8 py-3 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200`;

export default UploadModel;
