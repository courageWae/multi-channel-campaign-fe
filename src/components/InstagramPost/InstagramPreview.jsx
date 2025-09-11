import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useSelector } from "react-redux";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { TbMessageCircle } from "react-icons/tb";
import { PiPaperPlaneTiltBold } from "react-icons/pi";

const AvatarContainers = tw.div`w-8 h-8 bg-[#F780BA] rounded-full flex items-center text-lg justify-center text-white font-semibold`;
const InstaPreviewImage = tw.img`w-full h-full  object-cover`;

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

const InstagramPreview = ({ images = [], postText, videos = [] }) => {
    const user = useSelector((state) => state.UserReducer.user);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageClicks = (index) => {
        setCurrentImageIndex(index);
    };

    const renderPostTextWithHashtags = (text) => {
        const hashtagRegex = /(#\w+)/g;
        const parts = text.split(hashtagRegex);
        return parts.map((part, index) =>
            hashtagRegex.test(part) ? (
                <span key={index} className="text-blue-500">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <div className="overflow-y-auto">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center p-4">
                Instagram Preview{" "}
                <IoMdInformationCircleOutline className="text-gray-400 ml-1" />
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg mx-4 mb-4 overflow-y-auto">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-2">
                        <AvatarUser user={user} />
                        <div>
                            <div className="font-semibold text-gray-900">{user.name}</div>
                        </div>
                    </div>
                    <MdOutlineMoreHoriz className="w-6 h-6" />
                </div>
                {images.length > 0 && currentImageIndex < images.length && (
                    <>
                        <div className="max-h-[38vh] overflow-y-auto w-full">
                            <InstaPreviewImage
                                src={images[currentImageIndex].preview}
                                alt="Image preview"
                            />
                        </div>
                        <div className="w-full flex justify-center space-x-1 py-1">
                            {images.map((_, index) => (
                                <span
                                    key={index}
                                    className={`w-1.5 h-1.5 rounded-full ${currentImageIndex === index ? "bg-black" : "bg-gray-400"}`}
                                    onClick={() => handleImageClicks(index)}
                                />
                            ))}
                        </div>
                    </>
                )}
                {videos.length > 0 && (
                    <div key={videos[0].name} className={`py-2 overflow-y-auto ${postText ? 'h-[36vh]' : 'h-[48vh]'}`}>
                        <video
                            src={videos[0].preview}
                            controls
                            alt="Expanded preview"
                            className="object-contain overflow-clip"
                        />
                    </div>
                )}
                <div className="flex justify-between items-center my-2 px-2 pb-1">
                    <div className="flex space-x-4">
                        <GoHeart className="h-5 w-5 text-gray-500" />
                        <TbMessageCircle className="h-5 w-5 text-gray-500" />
                        <PiPaperPlaneTiltBold className="h-5 w-5 text-gray-500" />
                    </div>
                    <FaRegBookmark className="h-5 w-5 text-gray-500" />
                </div>
                <div className="px-2 pb-1">
                    <div className="flex flex-col">
                        <div className="flex flex-wrap items-baseline">
                            <p className="text-base font-semibold mr-2">
                                {user.name}{" "}
                                <span className="text-gray-900 text-[0.92rem] font-normal">
                                    {postText.length > 75 ? (
                                        <>
                                            {renderPostTextWithHashtags(postText.substring(0, 75))}...
                                            <button className="text-gray-500 text-sm ml-2">See More</button>
                                        </>
                                    ) : (
                                        renderPostTextWithHashtags(postText)
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstagramPreview;
