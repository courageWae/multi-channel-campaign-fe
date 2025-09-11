import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegThumbsUp } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { PiShareFat } from "react-icons/pi";
import { IoEarth } from "react-icons/io5";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import tw from "tailwind-styled-components";

const AvatarUser = ({ user }) => {
    const firstLetter = user.name.charAt(0).toUpperCase();
    return (
        <AvatarContainers>
            {user.avatar ? (
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-full w-full h-full"
                />
            ) : (
                firstLetter
            )}
        </AvatarContainers>
    );
};

const FacebookPreview = ({ postText, images, renderImages, renderPostTextWithHashtags, videos, postType }) => {
    const user = useSelector((state) => state.UserReducer.user);

    return (
        <div className="overflow-y-auto">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center p-4">
                Facebook Preview <IoMdInformationCircleOutline className="text-gray-400 ml-1" />
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg mx-4 mb-4">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-2">
                        <AvatarUser user={user} />
                        <div>
                            <div className="font-semibold text-gray-900">{user.name}</div>
                            <div className="flex text-gray-500 text-sm">
                                Just Now · <IoEarth className="ml-1 mt-1" />
                            </div>
                        </div>
                    </div>
                    <MdOutlineMoreHoriz className="w-6 h-6" />
                </div>
                {postText && (
                    <div className="px-4">
                        <p>
                            {postText.length > 75 ? (
                                <>
                                    {renderPostTextWithHashtags(postText.substring(0, 75))}...
                                    <button className="text-gray-500 text-sm ml-2">See More</button>
                                </>
                            ) : (
                                renderPostTextWithHashtags(postText)
                            )}
                        </p>
                    </div>)}
                {renderImages && (
                    <div className="py-2">{renderImages()}</div>)}
                {videos.map((video) => (
                    // <div key={video.name} className="py-2 h-[36vh] overflow-y-auto">
                    <div key={video.name} className={`py-2 overflow-y-auto ${postText ? 'h-[36vh]' : 'h-[48vh]'}`}>
                        <video
                            src={video.preview}
                            controls
                            alt="Expanded preview"
                            className="object-contain overflow-clip"
                        /></div>))}
                <div className="flex justify-between items-center my-2 px-4 py-1">
                    <div className="flex justify-center items-center space-x-1 text-gray-500 text-base">
                        <FaRegThumbsUp className="h-4 w-4 mt-1" />
                        <p>Like</p>
                    </div>
                    <div className="flex justify-center items-center space-x-1 text-gray-500 text-base">
                        <LuMessageSquare className="h-4 w-4 mt-1" />
                        <p>Comment</p>
                    </div>
                    <div className="flex justify-center items-center space-x-1 text-gray-500 text-base">
                        <PiShareFat className="h-4 w-4 mt-1" />
                        <p>Share</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
const AvatarContainers = tw.div`w-10 h-10 bg-blue-300 rounded-full flex items-center text-lg justify-center text-[#075CE5] font-semibold`;
export default FacebookPreview;
