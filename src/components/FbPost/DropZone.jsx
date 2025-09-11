

import tw from 'tailwind-styled-components';
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaRegImage, FaTimesCircle } from "react-icons/fa";

const DropZone = ({ images, setImages, videos, setVideos, setError, error, setExpandModel, expandModel, setSelectedImage, selectedImage, postType, setSelectedVideo }) => {
    const isAspectRatioValid = (width, height) => {
        const aspectRatio = width / height;
        return aspectRatio >= 0.8 && aspectRatio <= 1.91;
    };

    const isVideoAspectRatioValid = (width, height) => {
        const aspectRatio = width / height;
        return aspectRatio === 9 / 16;
    };
    console.log(postType)
    const onDrop = useCallback(
        (acceptedFiles) => {
            const validImages = [];
            const validVideos = [];
            const errors = [];

            acceptedFiles.forEach((file) => {
                if (file.size > 10 * 1024 * 1024) {
                    errors.push(`${file.name} is larger than 10MB`);
                    return;
                }

                if (file.type.startsWith('image/')) {
                    if (postType == 'Reel') {
                        errors.push("You cannot upload images for a reel. Only videos are allowed.");
                    } else if (postType == 'Post' && videos.length > 0) {
                        errors.push("You cannot upload images and videos together in a post.");
                    } else if (images.some((img) => img.name === file.name && img.size === file.size)) {
                        errors.push(`${file.name} is already uploaded`);
                    } else if (videos.length > 0) {
                        errors.push("You cannot upload images when a video is already uploaded.");
                    } else {
                        const img = new Image();
                        img.src = URL.createObjectURL(file);
                        img.onload = () => {
                            if (isAspectRatioValid(img.width, img.height)) {
                                validImages.push(Object.assign(file, { preview: img.src }));
                            } else {
                                errors.push(
                                    `${file.name} does not have an acceptable aspect ratio (4:5 to 1.91:1)`
                                );
                            }
                            if (file === acceptedFiles[acceptedFiles.length - 1]) {
                                processFiles(validImages, validVideos, errors);
                            }
                        };
                    }
                } else if (file.type.startsWith('video/')) {
                    if (postType == 'Post' && images.length > 0) {
                        errors.push("You cannot upload images and videos together in a post.");
                    } else if (videos.length > 0) {
                        errors.push("You can only upload one video.");
                    } else if (images.length > 0) {
                        errors.push("You cannot upload videos when images are already uploaded.");
                    } else {
                        const video = document.createElement('video');
                        video.src = URL.createObjectURL(file);
                        video.onloadedmetadata = () => {
                            if (video.duration > 60) {
                                errors.push(`${file.name} is longer than 60 seconds`);
                            } else if ((postType == 'Reel' || postType == 'Story' || postType == 'Post') && !isVideoAspectRatioValid(video.videoWidth, video.videoHeight)) {
                                errors.push(`${file.name} does not have the correct aspect ratio of 9:16 for a reel or post or story`);
                            } else {
                                validVideos.push(Object.assign(file, { preview: video.src }));
                            }
                            if (file === acceptedFiles[acceptedFiles.length - 1]) {
                                processFiles(validImages, validVideos, errors);
                            }
                        };
                    }
                }
            });

            const processFiles = (validImages, validVideos, errors) => {
                setImages((prevImages) => [...prevImages, ...validImages]);
                setVideos((prevVideos) => [...prevVideos, ...validVideos]);
                setError(errors.join(", "));
            };
        },
        [images, videos, postType, setError]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: postType == 'Reel' ? "video/*" : "image/*,video/*",
        noClick: videos.length > 0,
        noDrag: videos.length > 0,
    });

    const handleRemoveImage = (image) => {
        setImages((prevImages) => prevImages.filter((img) => img !== image));
    };

    const handleRemoveVideo = (video) => {
        setVideos([]);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image.preview);
    };
    const handleVideoClick = (video) => {
        setSelectedVideo(video.preview);
    };

    return (
        <>
            <div className="grid lg:grid-cols-5 px-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1 items-center">
                {images.map((image) => (
                    <div key={image.name} className="relative">
                        <PreviewImage
                            src={image.preview}
                            alt="Image preview"
                            onClick={() => {
                                setExpandModel(true);
                                handleImageClick(image);
                            }}
                            className="cursor-pointer"
                        />
                        <button
                            className="absolute -top-2 -right-2 rounded-full p-1"
                            onClick={() => handleRemoveImage(image)}
                        >
                            <FaTimesCircle className="bg-white text-gray-600 hover:text-red-600 h-4 w-4 rounded-full" />
                        </button>
                    </div>
                ))}
                {videos.map((video) => (
                    <div key={video.name} className="relative">
                        <video
                            src={video.preview}
                            className="w-full h-28 object-cover rounded mb-4"
                            controls
                            onClick={() => {
                                setExpandModel(true);
                                handleVideoClick(video);
                            }}

                        />
                        <button
                            className="absolute -top-2 -right-2 rounded-full p-1"
                            onClick={() => handleRemoveVideo(video)}
                        >
                            <FaTimesCircle className="bg-white text-gray-600 hover:text-red-600 h-4 w-4 rounded-full" />
                        </button>
                    </div>
                ))}

                {(postType === "Story" && images.length === 0 && videos.length === 0) ||
                    (postType === "Reel" && videos.length === 0) ||
                    (postType === "Post" && videos.length === 0) ? (
                    <DropzoneContainer {...getRootProps()}>
                        <input {...getInputProps()} />
                        <DropzoneText>
                            <span className="flex justify-center">
                                <FaRegImage className="h-6 w-6" />
                            </span>
                            Drag & drop or
                            <span className="text-blue-500"> select a file</span>
                        </DropzoneText>
                    </DropzoneContainer>
                ) : null}

            </div>
        </>
    );
};

const DropzoneContainer = tw.div`flex w-full items-center h-32 p-4 border-2 border-dotted border-gray-300 hover:border-blue-500 rounded text-center`;
const DropzoneText = tw.div`flex-1 text-gray-600 text-sm`;
const PreviewImage = tw.img`w-full h-28 object-cover rounded mb-4`;

export default DropZone;
