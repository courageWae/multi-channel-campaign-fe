import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import tw from "tailwind-styled-components";

import { AiOutlineClose } from "react-icons/ai";
const DropZone = ({ setFieldValue, componentFor, setUploadFile }) => {
    const [file, setFile] = useState(null);

    useEffect(() => {
        setUploadFile(file?.[0]);
    }, [file]);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const tempFile = acceptedFiles.map((file) => {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file),
                });
            });

            setFile(tempFile);
        }
    }, []);

    const accept =
        componentFor === "profile"
            ? "image/png, image/jpg, image/webp, image/jpeg"
            : ".xlsx,.xlsm,.xltx,.xlsb";
    const minSize = 0;
    const maxSize = 26214400;
    const maxFiles = 1;

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        minSize,
        maxSize,
        maxFiles,
    });

    const removePreviewImage = () => setFile(null);

    return (
        <>
            {!file && (
                <Uploader
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    isDragActive={isDragActive}
                    componentFor={componentFor}
                />
            )}

            {componentFor === "profile" && file && (
                <SingleFile file={file} removePreviewImage={removePreviewImage} />
            )}

            {componentFor !== "profile" && file && (
                <FileName>
                    {file[0].name}

                    <PreviewFigure onClick={removePreviewImage} $admin={true}>
                        <AiOutlineClose className="w-2" />
                    </PreviewFigure>
                </FileName>
            )}
        </>
    );
};

const Uploader = ({
    getRootProps,
    getInputProps,
    isDragActive,
    componentFor,
}) => (
    <div
        {...getRootProps()}
        className="w-full h-full bg-gray-50 rounded-md border-2 border-gray-200   "
    >
        <input {...getInputProps()} />

        <div
            className={`w-full h-full grid place-content-center p-3 ${isDragActive ? "bg-gray-300" : ""
                }`}
        >
            <Label htmlFor="file">
                <TextWrapper>
                    {/* <img src={Images.Upload} alt="upload-icon" className="w-5" /> */}

                    <p>
                        {isDragActive
                            ? "Drop it like it's hot"
                            : `Click or Drag ${componentFor === "profile" ? "Images" : "Excel file"
                            } To Upload`}
                    </p>
                    {componentFor === "profile" && <p>(JPG, PNG, JPEG )</p>}
                </TextWrapper>
            </Label>
        </div>
    </div>
);

const SingleFile = ({ file, removePreviewImage }) => (
    <div className="w-28 h-28 relative mt-2">
        <PreviewFigure onClick={removePreviewImage}>
            <AiOutlineClose className="w-2" />
        </PreviewFigure>

        <img
            src={file[0].preview}
            className="object-contain w-full h-full"
            alt="image"
        />
    </div>
);

const TextWrapper = tw.div`
${(p) => (p.$isDragActive ? "bg-gray-400" : " bg-gray-100")}
 upload-fonts w-full  rounded-lg  text-gray-600 flex flex-col items-center py-4 px-3 gap-0 mt-1 cursor-pointer md:text-xs md:gap-2 md:px-8 md:py-5
`;

const Label = tw.label`
text-sm text-gray-600`;

const PreviewFigure = tw.div`
${(p) => (p.$admin ? "top-2.5 right-2" : " -top-1  -right-1")}
w-5 h-5 rounded-full grid place-items-center cursor-pointer absolute bg-black`;

const FileName = tw.p` relative font-medium p-3 w-full bg-gray-100 rounded-md text-gray-500 text-sm`;

export default DropZone;
