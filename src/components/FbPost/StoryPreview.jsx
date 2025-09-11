
import React, { useRef, useState } from 'react';
import tw from "tailwind-styled-components";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { AiOutlineLike, AiOutlineSmile } from "react-icons/ai";
import { FaFacebookMessenger, FaHeart, FaThumbsUp } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { FaShare, FaPlay, FaPause, } from 'react-icons/fa';

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

const StoryPreview = ({ postType, images, videos }) => {
    const user = useSelector((state) => state.UserReducer.user);
    const videoRefs = useRef([]);
    const [playingIndex, setPlayingIndex] = useState(null);
    const handlePlayPauseClick = (index) => {
        if (videoRefs.current[index]) {
            if (videoRefs.current[index].paused) {
                videoRefs.current[index].play();
                setPlayingIndex(index);
            } else {
                videoRefs.current[index].pause();
                setPlayingIndex(null);
            }
        }
    };
    return (
        <div className="overflow-y-auto">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center p-4">
                Facebook Preview <IoMdInformationCircleOutline className="text-gray-400 ml-1" />
            </h3>
            <div className="bg-white  rounded-lg  mb-4">

                <div classname="bg-gray-50">
                    {images.map((image) => (
                        <div key={image.name} className="relative ">
                            <div className="absolute top-0 left-0 flex items-center justify-between px-2 py-2 w-full ">
                                <div className="flex items-center space-x-2">
                                    <AvatarUser user={user} />
                                    <div>
                                        <div className="font-semibold text-gray-900 text-base">
                                            {user.name}
                                            <span className="font-normal ml-2">2 hrs</span>
                                        </div>
                                    </div>
                                </div>
                                <MdOutlineMoreHoriz className="w-6 h-6 text-gray-900" />
                            </div>
                            <img
                                src={image.preview}
                                alt="Expanded preview"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    ))}
                    {videos.map((video, index) => (
                        <div key={video.name} className="relative h-[64vh]">
                            <div className="absolute top-0 left-0 flex items-center justify-between px-4 py-2 w-full">
                                <div className="flex items-center space-x-2">
                                    <AvatarUser user={user} />
                                    <div>
                                        <div className="font-semibold text-white text-base">
                                            {user.name}
                                            <span className="font-normal ml-2">2 hrs</span>
                                        </div>
                                    </div>
                                </div>
                                <MdOutlineMoreHoriz className="w-6 h-6 text-white" />
                            </div>
                            <video
                                key={index}
                                ref={el => videoRefs.current[index] = el}
                                src={video.preview}
                                controls={false}
                                className="object-contain overflow-clip"
                            />
                        </div>
                    ))}
                </div>
                {videos.length > 0 && (
                    <div className="flex items-center absolute top-1/2  justify-center py-2 w-full">
                        <PlayPauseButton onClick={() => handlePlayPauseClick(0)}>
                            {playingIndex === 0 ? <FaPause /> : <FaPlay />}
                        </PlayPauseButton>
                    </div>
                )}

                <div className="border-t border-gray-200 bg-black px-4 absolute bottom-0 py-2  ">
                    <div className="flex items-center relative">
                        <PlayButton>
                            <FaShare className='text-white' />
                        </PlayButton>
                        <FaFacebookMessenger className="absolute left-12 text-white w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Send message..."
                            className="flex-1 border border-gray-300 rounded-full py-2 pl-9 pr-4 focus:outline-none"
                        />
                        <div className="flex space-x-2 ml-4">
                            <div className="rounded-full bg-blue-500 text-white text-xs w-8 h-8 items-center justify-center flex">
                                <FaThumbsUp className=" w-5 h-5" />
                            </div>
                            <div className="rounded-full bg-red-500 text-white text-xs w-8 h-8 items-center justify-center flex">
                                <FaHeart className=" w-5 h-5" /></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const AvatarContainers = tw.div`w-8 h-8 bg-blue-300 rounded-full flex items-center text-lg justify-center text-[#075CE5] font-semibold`;
const PlayButton = tw.button`p-2 bg-gray-800 rounded-full mr-2`;
const PlayPauseButton = tw.button`p-2 bg-white rounded-full`;
const Actions = tw.div`flex space-x-2`;
export default StoryPreview;
