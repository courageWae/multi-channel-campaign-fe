
import React, { useState } from "react";
import tw from 'tailwind-styled-components';
import { FaFlag } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";

const ConnectToFacebookModal = ({ setIsFacebookModalOpen }) => {
    const [selectedOption, setSelectedOption] = useState("page");
    const [showGroupInputs, setShowGroupInputs] = useState(false);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleClose = () => {
        setIsFacebookModalOpen(false);
    };

    const handleStartConnecting = () => {
        if (selectedOption === "group" && !showGroupInputs) {
            setShowGroupInputs(true);
        } else {
            // Handle connecting logic for Facebook Page or submit Group details
            handleClose();
        }
    };

    const getCurrentTarget = (e) => {
        const targetClass = Array.from(e.target.classList);
        if (targetClass.includes("addCommentModel")) handleClose();
    };

    return (
        <ModalOverlay onClick={getCurrentTarget}>
            <ModalContainer>
                <div className="flex justify-between items-center p-4 border-gray-300">
                    {!showGroupInputs && (<Heading>Connect to Facebook</Heading>)}
                    {(showGroupInputs) && (<Heading>Set up your Facebook Group</Heading>)}
                    <CloseButton onClick={handleClose}>
                        <MdClose className="text-gray-700 w-6 h-6" />
                    </CloseButton>
                </div>
                <OptionContainer>
                    {(!showGroupInputs || selectedOption !== "group") && (
                        <>
                            <p className="text-black p-4">
                                Check out our <Link href="#">guide</Link> to supported account types for more details.
                            </p>
                            <OptionLabel selected={selectedOption === "page"} onClick={() => handleOptionChange("page")}>
                                <OptionRadio
                                    type="radio"
                                    name="facebookOption"
                                    checked={selectedOption === "page"}
                                    onChange={() => handleOptionChange("page")}
                                />
                                <OptionText>
                                    <div className="font-semibold text-black flex">Facebook Page <FaFlag className="mt-1 ml-1" /></div>
                                    <div className="text-gray-600">A public profile that Facebook users "like"</div>
                                </OptionText>
                            </OptionLabel>
                            <OptionLabel selected={selectedOption === "group"} onClick={() => handleOptionChange("group")}>
                                <OptionRadio
                                    type="radio"
                                    name="facebookOption"
                                    checked={selectedOption === "group"}
                                    onChange={() => handleOptionChange("group")}
                                />
                                <OptionText>
                                    <div className="font-semibold text-black flex">Facebook Group <FaUserGroup className="mt-1 ml-1" /> </div>
                                    <div className="text-gray-600">
                                        <p className="mb-2">
                                            Connect to a Facebook Group as a <span className="font-bold">member</span> or <span className="font-bold">admin</span>.
                                        </p>
                                        Direct publishing to Facebook Groups is no longer supported by Meta. Buffer seamlessly facilitates scheduling your posts with mobile-based notifications. <Link href="#">Learn more</Link>
                                    </div>
                                </OptionText>
                            </OptionLabel>
                        </>
                    )}
                    {showGroupInputs && selectedOption === "group" && (
                        <div className="p-4">
                            <FormGroup>
                                <Label>Name</Label>
                                <Input type="text" placeholder="Enter your Facebook Group Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Group URL <FaQuestionCircle className="ml-2 mt-0.5" /></Label>
                                <Input type="text" placeholder="Looks like this: facebook.com/groups/xxxxxxxxxx" />
                            </FormGroup>
                        </div>
                    )}
                </OptionContainer>
                <div className="flex justify-end p-4 items-center">
                    <button className="mr-2 text-gray-700 font-semibold hover:text-black text-base" onClick={handleClose}>Cancel</button>
                    <Button
                        className="rounded-xl ml-2"
                        type="button"
                        onClick={handleStartConnecting}
                    >
                        {showGroupInputs && selectedOption === "group" ? "Next" : "Start Connecting"}
                    </Button>
                </div>
            </ModalContainer>
        </ModalOverlay>
    );
};

const ModalOverlay = tw.div`addCommentModel h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out flex justify-center items-center z-20`;
const ModalContainer = tw.div`bg-white rounded-lg shadow-lg  w-full max-w-lg`;
const Heading = tw.h2`text-xl font-semibold text-black`;
const OptionContainer = tw.div`border-t border-b border-gray-300 bg-neutral-100`;
const OptionLabel = tw.label`flex items-center p-4 border bg-white rounded cursor-pointer mb-2 mx-4
  ${(p) => (p.selected ? "border-blue-500 bg-blue-50" : "border-gray-300")}`;
const OptionRadio = tw.input`form-radio h-5 w-5 text-blue-600 items-start`;
const OptionText = tw.div`ml-3`;
const Link = tw.a`text-blue-600 hover:underline`;
const Button = tw.button`bg-orange-500 text-white hover:bg-orange-600 px-4 items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded-md items-center`;
const CloseButton = tw.button`p-2 rounded-full hover:bg-gray-200 text-black`;
const FormGroup = tw.div`mb-4`;
const Label = tw.label`block text-gray-700 text-sm font-bold mb-2 flex`;
const Input = tw.input`shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline`;

export default ConnectToFacebookModal;
