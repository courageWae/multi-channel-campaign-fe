import React, { useState } from "react";
import Model from "../Model";
import { SubmitBtn, PreviewBtn } from "../Styles/InputStyles";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const UploadModel = ({
    deleteLoading,
    setDeleteModel,
    deviceId,
    deleteMutate,
}) => {
    const DeleteDevice = () => {
        deleteMutate({ groupId: deviceId })
    };

    return (
        <Model width={"w-11/12 max-w-md"} setOpenModel={setDeleteModel}>
            {deleteLoading && <Loading />}
            {!deleteLoading && (
                <>
                    <Title>Are you sure?</Title>
                    <SubTitle>Are you sure want to delete this item? This action can't be undone.</SubTitle>

                    <div className="w-full flex items-center justify-center space-x-6 mt-8">
                        <Cancel onClick={() => setDeleteModel(false)}>Cancel</Cancel>
                        <Delete onClick={DeleteDevice}> Delete</Delete>

                    </div>
                </>
            )}
        </Model>
    );
};

const Title = tw.h2` text-lg md:text-xl lg:text-2xl text-gray-600 mb-2 font-bold text-center`;
const SubTitle = tw.p` text-sm md:text-base  text-gray-400 font-normal  text-center mb-6`;
const Delete = tw.button`px-14 py-2.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 font-semibold`;
const Cancel = tw.button`px-14 py-2.5 text-sm border border-gray-600 text-gray-600 rounded font-semibold hover:bg-gray-200`;

export default UploadModel;
