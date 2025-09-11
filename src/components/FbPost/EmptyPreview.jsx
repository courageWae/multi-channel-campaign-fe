import Images from "Images";
import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

const EmptyPreview = () => {
    return (
        <div className="flex flex-col items-start  h-full p-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                Facebook Preview{" "}
                <IoMdInformationCircleOutline className="text-gray-400 ml-1" />
            </h3>
            <div className="my-16 mx-auto">
                <img src={Images.FacebookPreview} alt="Facebook Preview" />
                <p className="text-sm font-semibold text-center text-gray-500">
                    See your post's preview here
                </p>
            </div>
        </div>
    );
};

export default EmptyPreview;
