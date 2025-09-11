import React, { useState, useRef, useEffect, useCallback } from "react";
import tw from "tailwind-styled-components";
import DropZone from "./DropZone";
import { FaWandMagicSparkles } from "react-icons/fa6";
import PreviewSection from "./PreviewSection";
import axios from "axios";
import Config from "../../Config";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
// import SendCampaign from "components/Campaign/SendCampaign";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import IconSelector from "./IconSelector";
import EmojiPicker from "emoji-picker-react";
import {
    MdOutlineEmojiEmotions,
    MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import ScheduleModal from "./ScheduleModal";
import ExpandPreview from "./ExapandPreview";
import { GrEmoji } from "react-icons/gr";
import { Tooltip } from "react-tooltip";

const CreatePostModal = ({ onClose }) => {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [postText, setPostText] = useState("");
    const [error, setError] = useState("");
    const [expandModel, setExpandModel] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showAiAssistant, setShowAiAssistant] = useState(false);
    const [aiContent, setAiContent] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [contentText, setContentText] = useState("");
    const [openUploadModel, setOpenUploadModel] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [postType, setPostType] = useState("Post");
    const navigate = useNavigate();

    const user = useSelector((state) => state.UserReducer.user);
    const isShareDisabled =
        postText.trim().length === 0 && images.length === 0 && videos.length === 0;

    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const dropdownRef = useRef(null);
    const textAreaRef = useRef(null);
    const toggleDropdown = () => setIsScheduleOpen(!isScheduleOpen);
    // const handleOptionClick = (option) => {
    //     console.log(option);
    //     setIsScheduleOpen(false);
    // };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsScheduleOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getCurrentTarget = (e) => {
        const targetClass = Array.from(e.target.classList);
        if (targetClass.includes("addCommentModel")) onClose();
    };

    const handleTextChange = (e) => {
        setPostText(e.target.value);
    };

    const handleAiButtonClick = () => {
        setShowAiAssistant(!showAiAssistant);
    };

    // const handleEmojiClick = (emojiData) => {
    //     setPostText(postText + emojiData.emoji);
    //     setShowEmojiPicker(false);
    // };

    const handleEmojiClick = (emojiData) => {
        if (textAreaRef.current) {
            const { selectionStart, selectionEnd } = textAreaRef.current;
            const newText =
                postText.slice(0, selectionStart) +
                emojiData.emoji +
                postText.slice(selectionEnd);
            setPostText(newText);

            setTimeout(() => {
                textAreaRef.current.setSelectionRange(
                    selectionStart + emojiData.emoji.length,
                    selectionStart + emojiData.emoji.length
                );
                textAreaRef.current.focus();
            }, 0);
        }
        setShowEmojiPicker(false);
    };
    const handleEmojiButtonClick = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const ScheduleFunction = async (values) => {
        return await axios.post(`${Config.apiUrl}/create/fb/post`, values, {
            headers: {
                "Content-Type": "multipart/form-data",
                Token: `${user.token}`,
            },
        });
    };

    const scheduleSuccess = (data) => {
        navigate("/fb/post");
        isScheduleModalOpen(false);
        toast.success(data?.data?.msg || "Success");
    };

    const scheduleError = (data) => {
        isScheduleModalOpen(false);
        toast.error(data?.response?.data?.msg || "An Error Occurred");
    };

    const { isLoading: scheduleLoading, mutate: ScheduleMutate } = useMutation(
        ScheduleFunction,
        {
            onSuccess: scheduleSuccess,
            onError: scheduleError,
        }
    );

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        const payload = {
            postType,
            postText,
            images,
            videos,
            isSchedule: option,
        };
        if (option === "now") {
            ScheduleMutate(payload);
        }
        setIsScheduleOpen(false);
    };

    const GenerateFunction = async (values) => {
        return await axios.post(`${Config.apiUrl}/generate`, values, {
            headers: {
                "Content-Type": "multipart/form-data",
                Token: `${user.token}`,
            },
        });
    };

    const generateSuccess = (data) => {
        // toast.success(data?.data?.msg || "Success");
    };

    const generateError = (data) => {
        // toast.error(data?.response?.data?.msg || "Error");
    };

    const {
        isLoading: generateLoading,
        mutate: GenerateMutate,
        data,
    } = useMutation(GenerateFunction, {
        onSuccess: generateSuccess,
        onError: generateError,
    });

    return (
        <ModalContainer onClick={getCurrentTarget}>
            {isScheduleModalOpen && (
                <ScheduleModal
                    onClose={() => setIsScheduleModalOpen(false)}
                    ScheduleMutate={ScheduleMutate}
                    scheduleLoading={scheduleLoading}
                    postText={postText}
                    images={images}
                    videos={videos}
                    postType={postType}
                />
            )}

            {expandModel && (
                <ExpandPreview
                    setExpandModel={setExpandModel}
                    images={images}
                    videos={videos}
                    setSelectedImage={setSelectedImage}
                    setSelectedVideo={setSelectedVideo}
                    selectedImage={selectedImage}
                    selectedVideo={selectedVideo}
                />
            )}

            <ModalContent>
                <div className="flex flex-col w-full lg:w-2/3 bg-white rounded-md">
                    <div style={{ maxHeight: "20vh" }}>
                        <Header>
                            <h2>Create Post</h2>
                        </Header>
                        <div className="px-4 pb-4">
                            <IconSelector />
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-[6%] pl-4 pt-1">
                            <FaFacebook className="w-5 h-5 text-blue-500" />
                        </div>
                        {showEmojiPicker && (
                            <EmojiPickerContainer>
                                <EmojiPicker theme="dark" onEmojiClick={handleEmojiClick} />
                            </EmojiPickerContainer>
                        )}
                        <Body className="h-[50vh] overflow-y-auto relative">
                            <div className="px-4 py-2 border-b border-gray-300">
                                <div className="flex space-x-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="postType"
                                            value="Post"
                                            checked={postType === "Post"}
                                            onChange={() => setPostType("Post")}
                                        />
                                        <span>Post</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="postType"
                                            value="Reel"
                                            checked={postType === "Reel"}
                                            onChange={() => setPostType("Reel")}
                                            disabled={images.length > 0}
                                            data-tooltip-id="reelTooltip"
                                            data-tooltip-delay-show={1000}
                                        />
                                        <span>Reel</span>
                                        <Tooltip
                                            id="reelTooltip"
                                            place="bottom"
                                            effect="solid"
                                            className="!max-w-sm !z-50"
                                        >
                                            You have to delete images in order to create a Reel
                                        </Tooltip>
                                    </label>

                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="postType"
                                            value="Story"
                                            checked={postType === "Story"}
                                            onChange={() => setPostType("Story")}
                                            disabled={postText.length > 0 || images.length > 1}
                                            data-tooltip-id="storyTooltip"
                                            data-tooltip-delay-show={1000}
                                        />
                                        <span>Story</span>
                                        <Tooltip
                                            id="storyTooltip"
                                            place="bottom"
                                            effect="solid"
                                            className="!max-w-sm !z-50"
                                        >
                                            Story can contain only one media item
                                        </Tooltip>
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-4 bg-white p-2">
                                {postType != "Story" && (
                                    <TextArea
                                        ref={textAreaRef}
                                        placeholder="Enter your post caption here..."
                                        value={postText}
                                        onChange={handleTextChange}
                                    />
                                )}
                                <DropZone
                                    setImages={setImages}
                                    images={images}
                                    videos={videos}
                                    setVideos={setVideos}
                                    error={error}
                                    setError={setError}
                                    expandModel={expandModel}
                                    setExpandModel={setExpandModel}
                                    selectedImage={selectedImage}
                                    setSelectedImage={setSelectedImage}
                                    setSelectedVideo={setSelectedVideo}
                                    postType={postType}
                                />
                            </div>
                            {error && <p className="text-red-500 px-4">{error}</p>}
                            {postType != "Story" && (
                                <AiWrap>
                                    <AiButton onClick={handleAiButtonClick}>
                                        <FaWandMagicSparkles className="mr-1.5" />
                                        AI Assistant
                                    </AiButton>
                                    <div className="relative">
                                        <EmojiButton onClick={handleEmojiButtonClick}>
                                            <MdOutlineEmojiEmotions
                                                className="text-gray-600 mt-1 w-5 h-5 hover:text-black"
                                                title="Select Emoji"
                                            />
                                        </EmojiButton>
                                    </div>
                                </AiWrap>
                            )}
                        </Body>
                    </div>
                    <Footer className="relative" ref={dropdownRef}>
                        <Button
                            type="button"
                            disabled={isShareDisabled}
                            onClick={toggleDropdown}
                        >
                            <p className="font-semibold">Schedule</p>
                            <MdOutlineKeyboardArrowDown />
                        </Button>
                        {isScheduleOpen && (
                            <div className="absolute right-2 -top-16 px-2 py-1 bg-white border border-gray-300 rounded w-40">
                                <button
                                    className="w-full px-1 py-1 text-left hover:bg-gray-100 rounded text-gray-600 text-[15px] font-medium"
                                // onClick={() => handleOptionClick("now")}
                                >
                                    Share Now
                                </button>
                                <button
                                    className="w-full px-1 py-1 text-left hover:bg-gray-100 rounded text-gray-600 text-[15px] font-medium"
                                    onClick={() => setIsScheduleModalOpen(true)}
                                >
                                    Schedule
                                </button>
                            </div>
                        )}
                    </Footer>
                </div>

                <PreviewSections style={{ overflowY: "auto" }} className="relative">
                    <PreviewSection
                        images={images}
                        postText={postText}
                        setPostText={setPostText}
                        setImages={setImages}
                        generateLoading={generateLoading}
                        GenerateMutate={GenerateMutate}
                        aiContent={aiContent}
                        setAiContent={setAiContent}
                        showAiAssistant={showAiAssistant}
                        setShowAiAssistant={setShowAiAssistant}
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}
                        contentText={contentText}
                        setContentText={setContentText}
                        postType={postType}
                        videos={videos}
                        setVideos={setVideos}
                    />
                </PreviewSections>
            </ModalContent>
        </ModalContainer>
    );
};

const ModalContainer = tw.div`addCommentModel z-10 fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-75 `;
const ModalContent = tw.div`bg-transparent shadow-lg w-[1080px] flex flex-col lg:flex-row gap-4`;
const Header = tw.div` items-center justify-between px-4 pt-4 pb-6 w-full font-semibold text-base`;
const Body = tw.div`flex flex-col border border-gray-200 ml-2 mr-4 rounded mb-4 w-[94%] relative`;
const PreviewSections = tw.div` lg:w-[32%] border-l border-gray-300 bg-gray-100 flex flex-col bg-white rounded-md`;
const Footer = tw.div`flex justify-end p-4 border-t w-full`;
const TextArea = tw.textarea`w-full p-2 rounded-lg mb-14 `;
const AiWrap = tw.div`border-t border-gray-200 mt-2 py-1 px-4 flex items-center space-x-2`;
const AiButton = tw.button`flex items-center text-gray-600 hover:text-black space-x-1 justify-center h-10 text-base whitespace-nowrap rounded transition-colors duration-300`;
const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 px-4 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded transition-colors duration-300 ${(
    props
) => (props.disabled ? "bg-gray-400 cursor-not-allowed" : "")}`;
const EmojiButton = tw.button`text-gray-600 hover:text-black text-base rounded transition-colors duration-300 p-2`;
const EmojiPickerContainer = tw.div`absolute z-50 left-20 top-14 `;
export default CreatePostModal;
