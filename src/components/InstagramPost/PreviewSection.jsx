import React from "react";
import AIAssistant from "../FbPost/AIAssistant";
import InstagramPreview from "./InstagramPreview";
import EmptyPreview from "./EmptyPreview";
import StoryPreview from "./StoryPreview";
import ReelPreview from "./ReelPreview";

const PreviewSection = ({
    images,
    postText,
    setPostText,
    GenerateMutate,
    generateLoading,
    aiContent,
    setAiContent,
    showAiAssistant,
    setShowAiAssistant,
    isCopied,
    setIsCopied,
    contentText,
    setContentText,
    postType,
    videos,
}) => {
    console.log("Videos length:", videos.length);
    console.log("Images length:", images.length);
    console.log("Post type:", postType);

    const shouldShowInstagramPreview =
        postType === "Post" && (images.length > 0 || videos.length > 0);

    const shouldShowStoryPreview =
        postType === "Story" && (images.length > 0 || videos.length > 0);

    const shouldShowReelPreview = postType === "Reel" && videos.length > 0;

    return (
        <div className="relative h-full">
            {showAiAssistant ? (
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
            ) : shouldShowInstagramPreview ? (
                <InstagramPreview
                    images={images}
                    postText={postText}
                    postType={postType}
                    videos={videos}
                />
            ) : shouldShowStoryPreview ? (
                <StoryPreview images={images} postType={postType} videos={videos} />
            ) : shouldShowReelPreview ? (
                <ReelPreview videos={videos} postType={postType} postText={postText} />
            ) : (
                <EmptyPreview />
            )}
        </div>
    );
};

export default PreviewSection;
