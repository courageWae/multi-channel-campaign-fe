
import React, { useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaEllipsisH, FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';
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

const ReelPreview = ({ videos, postText }) => {
    const user = useSelector((state) => state.UserReducer.user);
    const videoRefs = useRef([]);
    const [playingIndex, setPlayingIndex] = useState(null);
    const [muted, setMuted] = useState(false);

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
                Facebook Preview <IoMdInformationCircleOutline className="text-gray-400 ml-1" />
            </h3>
            <Container>
                <VideoContainer>
                    {videos.map((video, index) => (
                        <Video
                            key={index}
                            ref={el => videoRefs.current[index] = el}
                            src={video.preview}
                            controls={false}
                            className="object-contain overflow-clip"
                        />
                    ))}
                    <Overlay>
                        <Header>
                            <Profile>
                                <AvatarUser user={user} alt="Profile" />
                                <Username>{user.name}</Username>
                            </Profile>
                            <Actions>
                                <PlayPauseButton onClick={() => handlePlayPauseClick(0)}>
                                    {playingIndex === 0 ? <FaPause /> : <FaPlay />}
                                </PlayPauseButton>
                                <MuteButton onClick={handleMuteUnmuteClick}>
                                    {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                                </MuteButton>
                            </Actions>
                        </Header>
                    </Overlay>
                    <Mid>
                        <PlayButton>
                            <FaThumbsUp />
                        </PlayButton>
                        <VolumeButton>
                            <FaComment />
                        </VolumeButton>
                        <MoreButton>
                            <FaShare />
                        </MoreButton>
                        <MoreButton>
                            <FaEllipsisH />
                        </MoreButton>
                    </Mid>


                </VideoContainer>
                {postText && (
                    <Footer>
                        <ReelDescription>
                            <span className="text-white text-[0.92rem] font-normal">
                                {postText.length > 75 ? (
                                    <>
                                        {renderPostTextWithHashtags(postText.substring(0, 75))}...
                                        <button className="text-white text-sm ml-2">See More</button>
                                    </>
                                ) : (
                                    renderPostTextWithHashtags(postText)
                                )}
                            </span>
                        </ReelDescription>
                    </Footer>)}
            </Container>
        </div>
    );
};

const Container = tw.div`w-full bg-black text-white rounded-lg relative`;
const VideoContainer = tw.div`relative h-[73vh] overflow-y-auto`;
const Video = tw.video`w-full h-auto`;
const Overlay = tw.div`absolute inset-0 flex flex-col justify-between p-4 `;
const Header = tw.div`flex justify-between items-center`;
const Profile = tw.div`flex items-center space-x-2`;
const Avatar = tw.div`w-8 h-8 bg-blue-300 rounded-full flex items-center text-lg justify-center text-[#075CE5] font-semibold`;
const Username = tw.span`font-semibold`;
const Actions = tw.div`flex space-x-2`;
const Mid = tw.div`flex flex-col space-y-5 absolute right-3 bottom-20`;
const PlayPauseButton = tw.button`p-2 bg-gray-800 rounded-full`;
const MuteButton = tw.button`p-2 bg-gray-800 rounded-full`;
const VolumeButton = tw.button`p-2 bg-gray-800 rounded-full`;
const MoreButton = tw.button`p-2 bg-gray-800 rounded-full`;
const Footer = tw.div`absolute bottom-0 left-0 right-0 px-4 py-2 flex justify-between items-center bg-gradient-to-r from-transparent via-black to-transparent`;
const ReelDescription = tw.p`text-sm`;
const PlayButton = tw.button`p-2 bg-gray-800 rounded-full`;

export default ReelPreview;
