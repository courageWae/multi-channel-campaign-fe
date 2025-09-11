
import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Model from "../Model";
import { toast } from "react-toastify";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
} from "react-share";
import { useSelector } from "react-redux";

const ShareReportModel = ({ setModalIsOpen, selectedData, id }) => {
    const [copySuccess, setCopySuccess] = useState("");
    const user = useSelector((state) => state.UserReducer.user);

    const handleCopyLink = () => {
        const url = new URL(window.location.href);
        url.searchParams.set("id", id);
        url.searchParams.set("userId", user.userId);
        url.searchParams.set("userToken", user.token);

        const fullUrl = url.toString();

        if (navigator.clipboard) {
            navigator.clipboard.writeText(fullUrl).then(
                () => {
                    toast.success("Link copied to clipboard!");
                    setCopySuccess("Link copied successfully!");
                },
                () => {
                    fallbackCopyTextToClipboard(fullUrl);
                }
            );
        } else {
            fallbackCopyTextToClipboard(fullUrl);
        }
    };

    const fallbackCopyTextToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand("copy");
            toast.success("Link copied to clipboard!");
            setCopySuccess("Link copied successfully!");
        } catch (err) {
            toast.error("Failed to copy link!");
            setCopySuccess("Failed to copy link!");
        }
        document.body.removeChild(textArea);
    };

    const url = new URL(window.location.href);
    url.searchParams.set("id", id);
    url.searchParams.set("userId", user.userId);
    url.searchParams.set("userToken", user.token);
    const fullUrl = url.toString();

    return (
        <Model
            width={"w-11/12 max-w-md"}
            setOpenModel={setModalIsOpen}
            title="Share Report"
            className="text-2xl font-semibold"
        >
            <Wrapper>
                <FacebookShareButton url={fullUrl}>
                    <FacebookIcon size={40} round />
                </FacebookShareButton>
                <TwitterShareButton url={fullUrl}>
                    <TwitterIcon size={40} round />
                </TwitterShareButton>
                <LinkedinShareButton url={fullUrl}>
                    <LinkedinIcon size={40} round />
                </LinkedinShareButton>
                <WhatsappShareButton url={fullUrl}>
                    <WhatsappIcon size={40} round />
                </WhatsappShareButton>
            </Wrapper>
            <CopyLinkWrapper>
                <CopyInput
                    type="text"
                    value={fullUrl} // Set value to fullUrl
                    readOnly
                />
                <CopyButton onClick={handleCopyLink}>Copy</CopyButton>
            </CopyLinkWrapper>
            {/* {copySuccess && <CopyMessage>{copySuccess}</CopyMessage>} */}
        </Model>
    );
};

const Wrapper = tw.div`mt-2 gap-4 flex justify-center`;
const CopyLinkWrapper = tw.div`mt-4 flex items-center justify-center`;
const CopyInput = tw.input`border border-gray-300 rounded-l px-2 py-1 w-full`;
const CopyButton = tw.button`bg-blue-500 text-white rounded-r px-4 py-1`;
const CopyMessage = tw.div`mt-2 text-green-500 text-center`;

export default ShareReportModel;
