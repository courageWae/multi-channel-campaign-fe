import React, { useRef, useState } from "react";
import tw from "tailwind-styled-components";
import {
    FaPlay,
    FaPause,
    FaVolumeUp,
    FaVolumeMute,
    FaEllipsisH,
    FaThumbsUp,
    FaComment,
    FaShare,
    FaFacebookMessenger,
    FaTelegramPlane,
    FaHeart,
    FaRegHeart,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoMdInformationCircleOutline } from "react-icons/io";

const AvatarUser = ({ user }) => {
    const firstLetter = user.name.charAt(0).toUpperCase();
    return (
        <Avatar>
            {user.avatar ? (
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-full w-full h-full"
                />
            ) : (
                firstLetter
            )}
        </Avatar>
    );
};

const StoryPreview = ({ videos, postText, images, postType }) => {
    const user = useSelector((state) => state.UserReducer.user);
    const videoRefs = useRef([]);
    const [playingIndex, setPlayingIndex] = useState(null);
    const [muted, setMuted] = useState(false);

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

    const handleMuteUnmuteClick = () => {
        if (videoRefs.current[0]) {
            videoRefs.current[0].muted = !muted;
            setMuted(!muted);
        }
    };

    return (
        <div className="overflow-y-auto">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center p-4">
                Instagram Preview{" "}
                <IoMdInformationCircleOutline className="text-gray-400 ml-1" />
            </h3>
            <Container>
                <VideoContainer>
                    {videos.map((video, index) => (
                        <Video
                            key={index}
                            ref={(el) => (videoRefs.current[index] = el)}
                            src={video.preview}
                            controls={false}
                            className="object-contain overflow-clip"
                        />
                    ))}

                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.preview}
                            className="w-full h-auto object-cover"
                        />
                    ))}
                    <Overlay>

                        <Header>
                            <Profile>
                                <AvatarUser user={user} alt="Profile" />
                                <Username>{user.name}</Username>
                            </Profile>
                            {videos.length > 0 && (
                                <Actions>
                                    <PlayPauseButton onClick={() => handlePlayPauseClick(0)}>
                                        {playingIndex === 0 ? <FaPause /> : <FaPlay />}
                                    </PlayPauseButton>
                                    <MuteButton onClick={handleMuteUnmuteClick}>
                                        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                                    </MuteButton>
                                </Actions>
                            )}
                        </Header>

                    </Overlay>
                </VideoContainer>

                <div className="  absolute bottom-0 py-2 left-4 ">
                    <div className="flex items-center relative">
                        <input
                            type="text"
                            placeholder="Reply to..."
                            className="flex-1 border border-gray-300 rounded-full py-2 pl-4 pr-4 focus:outline-none"
                        />
                        <div className="flex space-x-2 ml-4">
                            <FaRegHeart className=" w-5 h-5" />

                            <FaTelegramPlane className=" w-5 h-5" />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

const Container = tw.div`w-full bg-black  text-white rounded-lg relative`;
const VideoContainer = tw.div`relative h-[73vh] overflow-y-auto`;
const Video = tw.video`w-full h-auto`;
const Overlay = tw.div`absolute inset-0 flex flex-col justify-between p-4 `;
const Header = tw.div`flex justify-between items-center`;
const Profile = tw.div`flex items-center space-x-2`;
const Avatar = tw.div`w-8 h-8 bg-[#F780BA] rounded-full flex items-center text-lg justify-center text-white font-semibold`;
const Username = tw.span`font-semibold`;
const Actions = tw.div`flex space-x-2`;

const PlayPauseButton = tw.button`p-2  rounded-full`;
const MuteButton = tw.button`p-2  rounded-full`;


export default StoryPreview;
