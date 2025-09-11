import React from "react";
import tw from "tailwind-styled-components";
import Images from "../../Images";
import Model from "../PreviewModel";
import moment from "moment";

const ExpandPreview = ({ setExpandModel, selectedImage, selectedVideo, videos }) => {
    console.log(selectedImage)
    console.log(selectedVideo)
    return (
        <Model width={"w-11/12 max-w-xl"} setOpenModel={setExpandModel} >
            <Wrapper>
                {selectedImage && (
                    <img
                        src={selectedImage}
                        alt="Expanded preview"
                        className="max-w-full max-h-full object-contain "
                    />)}
                {selectedVideo && (
                    <video
                        src={selectedVideo}
                        controls
                        alt="Expanded preview"
                        className="w-full max-h-[80vh] object-cover "
                    />)}
                {videos && (
                    <video
                        src={videos[0]}
                        controls
                        alt="Expanded preview"
                        className="w-full max-h-[80vh] object-cover "
                    />)}
            </Wrapper>
        </Model>
    );
};



const Wrapper = tw.div``;
const Title = tw.h2`text-lg md:text-xl mb-6 text-gray-700 font-medium text-center`;
const Name = tw.p`text-sm text-gray-500  w-40`;
const Value = tw.p`text-sm text-gray-800 font-medium max-w-xs truncate`;
const LinkValue = tw.a`text-sm text-blue-500 max-w-xs truncate cursor-pointer`;

const Box = tw.div`text-center text-gray-800 border border-gray-100 bg-gray-50 p-5`;
export default ExpandPreview;
