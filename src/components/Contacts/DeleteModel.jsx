import React, { useState } from "react";
import Model from "../Model";
import tw from "tailwind-styled-components";
import Loading from "../Loading";

import {
    ModelDangerBtn,
    CancelBtn
} from "../Styles/InputStyles";

const UploadModel = ({
    deleteLoading,
    setDeleteModel,
    selectedData,
    deleteMutate,
}) => {
    const DeleteDevice = () => {
        deleteMutate({ groupId: selectedData })
    };

    return (
        <Model width={"w-full max-w-md"} setOpenModel={setDeleteModel} title="Delete Group">
            {deleteLoading && <Loading />}
            {!deleteLoading && (
                <>
                    {/* <Title>Are you sure?</Title> */}
                    <SubTitle>You are about to delete selected group. Deleting group is permanent and cannot be undone.</SubTitle>
                    

                    <div className="w-full flex justify-end space-x-6 mt-8">
                        <CancelBtn onClick={() => setDeleteModel(false)}>Cancel</CancelBtn>
                        <ModelDangerBtn onClick={DeleteDevice}> Delete</ModelDangerBtn>
                    </div>
                </>
            )}
        </Model>
    );
};

const Title = tw.h2` text-lg md:text-xl lg:text-2xl text-gray-600 mb-2 font-bold text-left`;
const SubTitle = tw.p` text-sm md:text-base text-left mb-6 text-gray-700 text-pretty pt-2`;
const Delete = tw.button`px-14 py-2.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 font-semibold`;
const Cancel = tw.button`px-14 py-2.5 text-sm border border-gray-600 text-gray-600 rounded font-semibold hover:bg-gray-200`;

export default UploadModel;
