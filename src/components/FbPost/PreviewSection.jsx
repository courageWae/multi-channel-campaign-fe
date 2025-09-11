// import React, { useState } from "react";
// import tw from "tailwind-styled-components";
// import { FaRegImage, FaRegThumbsUp, FaTimesCircle } from "react-icons/fa";
// import { LuMessageSquare } from "react-icons/lu";
// import { PiShareFat } from "react-icons/pi";
// import { useSelector } from "react-redux";
// import Images from "../../Images";
// import { IoMdHelpCircle } from "react-icons/io";
// import { IoReloadSharp } from "react-icons/io5";
// import { IoEarth } from "react-icons/io5";
// import { MdOutlineMoreHoriz, MdOutlineClose } from "react-icons/md";
// import { IoMdInformationCircleOutline } from "react-icons/io";
// import { RxCrossCircled } from "react-icons/rx";
// import { InputGroup, Label } from "components/Styles/InputStyles";
// import { MdOutlineCopyAll } from "react-icons/md";
// import { FaWandMagicSparkles } from "react-icons/fa6";

// const AvatarUser = ({ user }) => {
//     const firstLetter = user.name.charAt(0).toUpperCase();
//     return (
//         <AvatarContainers>
//             {user.avatar ? (
//                 <img
//                     src={user.avatar}
//                     alt={user.name}
//                     className="rounded-full w-full h-full"
//                 />
//             ) : (
//                 firstLetter
//             )}
//         </AvatarContainers>
//     );
// };

// const PreviewSection = ({
//     images,
//     postText,
//     setPostText,
//     setImages,
//     GenerateMutate,
//     generateLoading,
//     aiContent,
//     setAiContent,
//     showAiAssistant,
//     setShowAiAssistant,
//     isCopied,
//     setIsCopied,
//     contentText,
//     setContentText,
// }) => {
//     const user = useSelector((state) => state.UserReducer.user);

//     const [showMore, setShowMore] = useState(false);

//     const handleShowMore = () => {
//         setShowMore(!showMore);
//     };

//     const renderImages = () => {
//         const imageCount = images.length;

//         if (imageCount === 1) {
//             return (
//                 <img
//                     className="w-full h-full object-cover"
//                     src={images[0].preview}
//                     alt="Preview"
//                 />
//             );
//         }

//         if (imageCount === 2) {
//             return (
//                 <div className="flex gap-1">
//                     {images.map((image) => (
//                         <img
//                             key={image.name}
//                             className="w-1/2 h-28 object-cover"
//                             src={image.preview}
//                             alt="Preview"
//                         />
//                     ))}
//                 </div>
//             );
//         }

//         if (imageCount === 3) {
//             return (
//                 <div className="grid grid-cols-2 gap-1">
//                     <img
//                         className="col-span-2 w-full h-28 object-cover"
//                         src={images[0].preview}
//                         alt="Preview"
//                     />
//                     <img
//                         className="w-full h-28 object-cover"
//                         src={images[1].preview}
//                         alt="Preview"
//                     />
//                     <img
//                         className="w-full h-28 object-cover"
//                         src={images[2].preview}
//                         alt="Preview"
//                     />
//                 </div>
//             );
//         }

//         if (imageCount > 3 && imageCount <= 4) {
//             return (
//                 <div className="grid grid-cols-3 gap-1">
//                     {images.slice(0, 1).map((image) => (
//                         <img
//                             key={image.name}
//                             className="w-full col-span-3 h-28 object-cover"
//                             src={image.preview}
//                             alt="Preview"
//                         />
//                     ))}
//                     {images.slice(1).map((image) => (
//                         <img
//                             key={image.name}
//                             className="w-full h-28 object-cover"
//                             src={image.preview}
//                             alt="Preview"
//                         />
//                     ))}
//                 </div>
//             );
//         }

//         if (imageCount === 5) {
//             return (
//                 <div className="grid grid-cols-3 gap-1">
//                     {images.slice(0, 1).map((image) => (
//                         <img
//                             key={image.name}
//                             className="w-full col-span-2 h-28 object-cover"
//                             src={image.preview}
//                             alt="Preview"
//                         />
//                     ))}
//                     {images.slice(1).map((image) => (
//                         <img
//                             key={image.name}
//                             className="w-full h-28 object-cover"
//                             src={image.preview}
//                             alt="Preview"
//                         />
//                     ))}
//                 </div>
//             );
//         }

//         if (imageCount > 5) {
//             return (
//                 <div className="grid grid-cols-3 gap-1">
//                     {images.slice(0, 1).map((image) => (
//                         <img
//                             key={image.name}
//                             className="w-full col-span-2 h-28 object-cover"
//                             src={image.preview}
//                             alt="Preview"
//                         />
//                     ))}
//                     {images.slice(1, 4).map((image) => (
//                         <img
//                             key={image.name}
//                             className="w-full h-28 object-cover"
//                             src={image.preview}
//                             alt="Preview"
//                         />
//                     ))}
//                     <div className="relative">
//                         <img
//                             className="w-full h-28 object-cover"
//                             src={images[4].preview}
//                             alt="Preview"
//                         />
//                         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
//                             +{imageCount - 5}
//                         </div>
//                     </div>
//                 </div>
//             );
//         }
//     };

//     const handleContentChange = (e) => {
//         setContentText(e.target.value);
//     };

//     const handleGenerateAiContent = () => {
//         GenerateMutate({
//             contentText: contentText,
//         });
//         setAiContent(
//             "Every day is a new opportunity to make a difference. #positivity #motivation"
//         );
//     };

//     const handleInsertAiContent = () => {
//         setPostText(aiContent);
//         setShowAiAssistant(false);
//     };

//     const handleCopyAiContent = () => {
//         if (navigator.clipboard && navigator.clipboard.writeText) {
//             navigator.clipboard
//                 .writeText(aiContent)
//                 .then(() => {
//                     setIsCopied(true);
//                     setTimeout(() => setIsCopied(false), 2000);
//                 })
//                 .catch((err) => {
//                     console.error("Could not copy text: ", err);
//                 });
//         } else {
//             const textArea = document.createElement("textarea");
//             textArea.value = aiContent;
//             document.body.appendChild(textArea);
//             textArea.focus();
//             textArea.select();
//             try {
//                 document.execCommand("copy");
//                 setIsCopied(true);
//                 setTimeout(() => setIsCopied(false), 2000);
//             } catch (err) {
//                 console.error("Fallback: Oops, unable to copy", err);
//             }
//             document.body.removeChild(textArea);
//         }
//     };

//     const renderPostTextWithHashtags = (text) => {
//         const hashtagRegex = /(#\w+)/g;
//         const parts = text.split(hashtagRegex);

//         return parts.map((part, index) => {
//             if (hashtagRegex.test(part)) {
//                 return (
//                     <span key={index} className="text-blue-500">
//                         {part}
//                     </span>
//                 );
//             }
//             return part;
//         });
//     };
//     return (
//         <div >
//             {showAiAssistant ? (
//                 <>
//                     <div className="overflow-y-auto p-4 ">
//                         <div className="flex justify-between">
//                             <h3 className="mb-6 font-semibold text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-700 flex items-center">
//                                 <FaWandMagicSparkles className="mr-1.5 text-purple-500" />
//                                 AI Assistant
//                             </h3>
//                             <RxCrossCircled
//                                 className="w-5 h-5"
//                                 onClick={() => setShowAiAssistant(false)}
//                             />
//                         </div>
//                         {!aiContent && (
//                             <>
//                                 <InputGroup>
//                                     <Label>What do you want to write about?</Label>

//                                     <TextArea
//                                         placeholder="Enter keyword..."
//                                         className=" p-2 border border-gray-300 rounded h-28"
//                                         value={contentText}
//                                         onChange={handleContentChange}
//                                     />
//                                 </InputGroup>
//                                 <p className="text-sm text-gray-500 mt-1">
//                                     <span className="font-semibold text-black">Pro tip:</span>{" "}
//                                     Include key points, your target audience and your desired
//                                     outcome for this post
//                                 </p>
//                                 <div className="flex justify-end">
//                                     <button
//                                         onClick={handleGenerateAiContent}
//                                         className={`text-white bg-gradient-to-r from-purple-500 to-purple-700 px-4 py-2 mt-2 rounded-lg ${contentText === "" || generateLoading
//                                             ? "opacity-50 cursor-not-allowed"
//                                             : ""
//                                             }`}
//                                         disabled={contentText === "" || generateLoading}
//                                     >
//                                         <div className="flex items-center">
//                                             {generateLoading ? (
//                                                 <span>Loading...</span>
//                                             ) : (
//                                                 <>
//                                                     <FaWandMagicSparkles className="mr-1.5 mt-1" />{" "}
//                                                     Generate
//                                                 </>
//                                             )}
//                                         </div>
//                                     </button>
//                                 </div>
//                             </>
//                         )}
//                         {aiContent && (
//                             <div>
//                                 <InputGroup>
//                                     <Label>What do you want to write about?</Label>
//                                     <div className="relative">
//                                         <input
//                                             placeholder="Enter keyword..."
//                                             className="p-2 border border-gray-300 rounded w-full pr-10"
//                                             value={contentText}
//                                             readOnly
//                                         />
//                                         <button
//                                             className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                             onClick={() => setAiContent("")}
//                                             title="Clear"
//                                         >
//                                             <MdOutlineClose className="w-4 h-4" />
//                                         </button>
//                                     </div>
//                                 </InputGroup>
//                                 <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-3 rounded mt-4">
//                                     <p className="text-gray-900 mb-2">{aiContent}</p>
//                                     <div className="flex space-x-2 items-center justify-between mt-3">
//                                         <div>
//                                             <button title="Copy Text" onClick={handleCopyAiContent}>
//                                                 {isCopied ? (
//                                                     "Copied"
//                                                 ) : (
//                                                     <MdOutlineCopyAll className="w-6 h-6 text-gray-600 hover:text-black" />
//                                                 )}
//                                             </button>
//                                         </div>
//                                         <div className="flex">
//                                             <button
//                                                 onClick={handleGenerateAiContent}
//                                                 className="text-gray-600 hover:text-black flex mr-2 font-semibold"
//                                             >
//                                                 <IoReloadSharp className=" mt-1.5 mr-1" />
//                                                 Retry
//                                             </button>
//                                             <button
//                                                 onClick={handleInsertAiContent}
//                                                 className="text-white bg-blue-500 hover:bg-blue-600 px-2 h-8 rounded ml-2"
//                                             >
//                                                 Insert
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     <div className=" border-t border-gray-200 absolute bottom-0 left-0 right-0">
//                         <div className="flex text-gray-500 text-sm p-4 ">
//                             <IoMdHelpCircle className=" mr-1 h-4 w-4 mt-0.5" />
//                             Need tips on writing better prompts?{" "}
//                             <span className="text-blue-500 ml-1 cursor-pointer">See tips.</span>

//                         </div>
//                     </div>
//                 </>
//             ) : postText || images.length > 0 ? (
//                 <div className="overflow-y-auto">
//                     <h3 className="font-semibold text-gray-900 mb-2 flex items-center p-4">
//                         Facebook Preview{" "}
//                         <IoMdInformationCircleOutline className="text-gray-400 ml-1" />
//                     </h3>
//                     <div className="bg-white border border-gray-200 rounded-lg mx-4 mb-4">
//                         <div className="flex items-center justify-between p-4">
//                             <div className="flex items-center space-x-2">
//                                 <AvatarUser user={user} />
//                                 <div>
//                                     <div className="font-semibold text-gray-900">{user.name}</div>
//                                     <div className="flex text-gray-500 text-sm">
//                                         Just Now · <IoEarth className="ml-1 mt-1" />
//                                     </div>
//                                 </div>
//                             </div>
//                             <MdOutlineMoreHoriz className="w-6 h-6" />
//                         </div>
//                         <div className="px-4">

//                             <p>
//                                 {postText.length > 75 ? (
//                                     <>
//                                         {renderPostTextWithHashtags(postText.substring(0, 75))}...
//                                         <button className="text-gray-500 text-sm  ml-2">See More</button>
//                                     </>
//                                 ) : (
//                                     renderPostTextWithHashtags(postText)
//                                 )}
//                             </p>

//                         </div>
//                         <div className="py-2">{renderImages()}</div>
//                         <div className="flex justify-between items-center  my-2 px-4 py-1">
//                             <div className="flex justify-center items-center space-x-1 text-gray-500 text-base">
//                                 <FaRegThumbsUp className="h-4 w-4 mt-1" />
//                                 <p>Like</p>
//                             </div>
//                             <div className="flex justify-center items-center space-x-1 text-gray-500 text-base">
//                                 <LuMessageSquare className="h-4 w-4 mt-1" />
//                                 <p>Comment</p>
//                             </div>
//                             <div className="flex justify-center items-center space-x-1 text-gray-500 text-base">
//                                 <PiShareFat className="h-4 w-4 mt-1" />
//                                 <p>Share</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="flex flex-col items-start  h-full p-4">
//                     <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
//                         Facebook Preview{" "}
//                         <IoMdInformationCircleOutline className="text-gray-400 ml-1" />
//                     </h3>
//                     <div className="my-16 mx-auto">
//                         <img src={Images.FacebookPreview} alt="Facebook Preview" />
//                         <p className="text-sm font-semibold text-center text-gray-500">
//                             See your post's preview here
//                         </p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// const TextArea = tw.textarea`w-full p-2 rounded-lg mb-12 `;
// const AvatarContainers = tw.div`w-10 h-10 bg-blue-300 rounded-full flex items-center text-lg justify-center text-[#075CE5] font-semibold`;
// export default PreviewSection;



import React, { useState } from "react";
import { useSelector } from "react-redux";
import AIAssistant from "./AIAssistant";
import FacebookPreview from "./FacebookPreview";
import EmptyPreview from "./EmptyPreview";
import StoryPreview from "./StoryPreview";
import ReelPreview from "./ReelPreview";

const PreviewSection = ({
    contentText,
    setContentText,
    GenerateMutate,
    generateLoading,
    aiContent,
    setAiContent,
    showAiAssistant,
    setShowAiAssistant,
    isCopied,
    setIsCopied,
    postText,
    setPostText,
    images,
    postType,
    videos,
}) => {
    // const [showAiAssistant, setShowAiAssistant] = useState(false);

    const renderImages = () => {
        const imageCount = images.length;

        if (imageCount === 1) {
            return (
                <div className="max-h-[36vh] overflow-y-auto w-full" ><img
                    className="w-full h-full object-cover"
                    src={images[0].preview}
                    alt="Preview" />
                </div>
            );
        }

        if (imageCount === 2) {
            return (
                <div className="flex gap-1">
                    {images.map((image) => (
                        <img
                            key={image.name}
                            className="w-1/2 h-28 object-cover"
                            src={image.preview}
                            alt="Preview"
                        />
                    ))}
                </div>
            );
        }

        if (imageCount === 3) {
            return (
                <div className="grid grid-cols-2 gap-1">
                    <img
                        className="col-span-2 w-full h-28 object-cover"
                        src={images[0].preview}
                        alt="Preview"
                    />
                    <img
                        className="w-full h-28 object-cover"
                        src={images[1].preview}
                        alt="Preview"
                    />
                    <img
                        className="w-full h-28 object-cover"
                        src={images[2].preview}
                        alt="Preview"
                    />
                </div>
            );
        }

        if (imageCount > 3 && imageCount <= 4) {
            return (
                <div className="grid grid-cols-3 gap-1">
                    {images.slice(0, 1).map((image) => (
                        <img
                            key={image.name}
                            className="w-full col-span-3 h-28 object-cover"
                            src={image.preview}
                            alt="Preview"
                        />
                    ))}
                    {images.slice(1).map((image) => (
                        <img
                            key={image.name}
                            className="w-full h-28 object-cover"
                            src={image.preview}
                            alt="Preview"
                        />
                    ))}
                </div>
            );
        }

        if (imageCount === 5) {
            return (
                <div className="grid grid-cols-3 gap-1">
                    {images.slice(0, 1).map((image) => (
                        <img
                            key={image.name}
                            className="w-full col-span-2 h-28 object-cover"
                            src={image.preview}
                            alt="Preview"
                        />
                    ))}
                    {images.slice(1).map((image) => (
                        <img
                            key={image.name}
                            className="w-full h-28 object-cover"
                            src={image.preview}
                            alt="Preview"
                        />
                    ))}
                </div>
            );
        }

        if (imageCount > 5) {
            return (
                <div className="grid grid-cols-3 gap-1">
                    {images.slice(0, 1).map((image) => (
                        <img
                            key={image.name}
                            className="w-full col-span-2 h-28 object-cover"
                            src={image.preview}
                            alt="Preview"
                        />
                    ))}
                    {images.slice(1, 4).map((image) => (
                        <img
                            key={image.name}
                            className="w-full h-28 object-cover"
                            src={image.preview}
                            alt="Preview"
                        />
                    ))}
                    <div className="relative">
                        <img
                            className="w-full h-28 object-cover"
                            src={images[4].preview}
                            alt="Preview"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
                            +{imageCount - 5}
                        </div>
                    </div>
                </div>
            );
        }
    };

    const renderPostTextWithHashtags = (text) => {
        return text.split(" ").map((word, index) =>
            word.startsWith("#") ? (
                <span key={index} className="text-blue-500">
                    {word}{" "}
                </span>
            ) : (
                `${word} `
            )
        );
    };
    const shouldShowFacebookPreview = (postType === "Post" && (postText || images.length > 0 || videos.length > 0))


    const shouldShowStoryPreview = (postType === "Story" && (images.length > 0 || videos.length > 0))

    const shouldShowReelPreview = (postType === "Reel" && (videos.length > 0))
    return (
        <div className="relative h-full">
            {showAiAssistant && postType != "Story" ? (
                <AIAssistant
                    contentText={contentText}
                    setContentText={setContentText}
                    GenerateMutate={GenerateMutate}
                    generateLoading={generateLoading}
                    aiContent={aiContent}
                    setAiContent={setAiContent}
                    setShowAiAssistant={setShowAiAssistant}
                    isCopied={isCopied}
                    setIsCopied={setIsCopied}
                    setPostText={setPostText}
                />
            ) : shouldShowFacebookPreview ? (
                <FacebookPreview
                    postText={postText}
                    postType={postType}
                    images={images}
                    videos={videos}
                    renderImages={renderImages}
                    renderPostTextWithHashtags={renderPostTextWithHashtags}
                />
            ) : shouldShowStoryPreview ? (
                <StoryPreview

                    postType={postType}
                    images={images}
                    videos={videos}

                />
            ) : shouldShowReelPreview ? (
                <ReelPreview
                    postText={postText}
                    postType={postType}
                    videos={videos}

                />
            ) : (
                <EmptyPreview />
            )}
        </div>
    );
};

export default PreviewSection;
