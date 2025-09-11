import React from "react";
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
    console.log(selectedData)
    const DeleteDevice = () => {
        deleteMutate({ campaignId: selectedData })
    };

    return (
        <Model width={"w-full max-w-md"} setOpenModel={setDeleteModel} title="Delete Campaign">
            {deleteLoading && <Loading />}
            {!deleteLoading && (
                <>
                    <SubTitle>You are about to delete selected campaign. Deleting campaign is permanent and cannot be undone.</SubTitle>


                    <div className="w-full flex justify-end space-x-6 mt-8">
                        <CancelBtn onClick={() => setDeleteModel(false)}>Cancel</CancelBtn>
                        <ModelDangerBtn onClick={DeleteDevice}> Delete</ModelDangerBtn>
                    </div>
                </>
            )}
        </Model>
    );
};

const SubTitle = tw.p` text-sm md:text-base text-left mb-6 text-gray-700 text-pretty pt-2`;

export default UploadModel;
