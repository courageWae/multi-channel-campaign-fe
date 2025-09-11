import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { MdOutlineClose, MdOutlineCopyAll } from "react-icons/md";
import { IoReloadSharp } from "react-icons/io5";
import { IoMdHelpCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { InputGroup, Label } from "components/Styles/InputStyles";

const AIAssistant = ({
    contentText,
    setContentText,
    GenerateMutate,
    generateLoading,
    aiContent,
    setAiContent,
    setShowAiAssistant,
    isCopied,
    setIsCopied,
    setPostText,
}) => {
    const handleContentChange = (e) => {
        setContentText(e.target.value);
    };

    const handleGenerateAiContent = () => {
        GenerateMutate({ contentText });
        setAiContent("Every day is a new opportunity to make a difference. #positivity #motivation");
    };

    const handleInsertAiContent = () => {
        setPostText(aiContent);
        setShowAiAssistant(false);
    };

    const handleCopyAiContent = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(aiContent)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                })
                .catch((err) => {
                    console.error("Could not copy text: ", err);
                });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = aiContent;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand("copy");
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error("Fallback: Oops, unable to copy", err);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <>
            <div className="overflow-y-auto p-4">
                <div className="flex justify-between">
                    <h3 className="mb-6 font-semibold text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-700 flex items-center">
                        <FaWandMagicSparkles className="mr-1.5 text-purple-500" />
                        AI Assistant
                    </h3>
                    <RxCrossCircled className="w-5 h-5" onClick={() => setShowAiAssistant(false)} />
                </div>
                {!aiContent && (
                    <>
                        <InputGroup>
                            <Label>What do you want to write about?</Label>
                            <TextArea
                                placeholder="Enter keyword..."
                                className="p-2 border border-gray-300 rounded h-28"
                                value={contentText}
                                onChange={handleContentChange}
                            />
                        </InputGroup>
                        <p className="text-sm text-gray-500 mt-1">
                            <span className="font-semibold text-black">Pro tip:</span> Include key
                            points, your target audience, and your desired outcome for this post
                        </p>
                        <div className="flex justify-end">
                            <button
                                onClick={handleGenerateAiContent}
                                className={`text-white bg-gradient-to-r from-purple-500 to-purple-700 px-4 py-2 mt-2 rounded-lg ${contentText === "" || generateLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={contentText === "" || generateLoading}
                            >
                                <div className="flex items-center">
                                    {generateLoading ? <span>Loading...</span> : <><FaWandMagicSparkles className="mr-1.5 mt-1" /> Generate</>}
                                </div>
                            </button>
                        </div>
                    </>
                )}
                {aiContent && (
                    <div>
                        <InputGroup>
                            <Label>What do you want to write about?</Label>
                            <div className="relative">
                                <input
                                    placeholder="Enter keyword..."
                                    className="p-2 border border-gray-300 rounded w-full pr-10"
                                    value={contentText}
                                    readOnly
                                />
                                <button
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setAiContent("")}
                                    title="Clear"
                                >
                                    <MdOutlineClose className="w-4 h-4" />
                                </button>
                            </div>
                        </InputGroup>
                        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-3 rounded mt-4">
                            <p className="text-gray-900 mb-2">{aiContent}</p>
                            <div className="flex space-x-2 items-center justify-between mt-3">
                                <div>
                                    <button title="Copy Text" onClick={handleCopyAiContent}>
                                        {isCopied ? "Copied" : <MdOutlineCopyAll className="w-6 h-6 text-gray-600 hover:text-black" />}
                                    </button>
                                </div>
                                <div className="flex">
                                    <button
                                        onClick={handleGenerateAiContent}
                                        className="text-gray-600 hover:text-black flex mr-2 font-semibold"
                                    >
                                        <IoReloadSharp className="mt-1.5 mr-1" />
                                        Retry
                                    </button>
                                    <button
                                        onClick={handleInsertAiContent}
                                        className="text-white bg-blue-500 hover:bg-blue-600 px-2 h-8 rounded ml-2"
                                    >
                                        Insert
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="border-t border-gray-200 absolute bottom-0 left-0 right-0">
                <div className="flex text-gray-500 text-sm p-4">
                    <IoMdHelpCircle className="mr-1 h-4 w-4 mt-0.5" />
                    Need tips on writing better prompts? <span className="text-blue-500 ml-1 cursor-pointer">See tips.</span>
                </div>
            </div>
        </>
    );
};

const TextArea = tw.textarea`w-full p-2 rounded-lg mb-12`;

export default AIAssistant;
