import React, { useState } from "react";
import tw from 'tailwind-styled-components';
import { MdClose } from "react-icons/md";
import Images from "Images";

const AuthenticateWithFacebookModal = ({ setIsInstaModalOpen }) => {
    const handleClose = () => {
        setIsInstaModalOpen(false);
    };

    const getCurrentTarget = (e) => {
        const targetClass = Array.from(e.target.classList);
        if (targetClass.includes("addCommentModel")) handleClose();
    };

    return (
        <ModalOverlay onClick={getCurrentTarget}>
            <ModalContainer>
                <Header>
                    <Title>Authenticate with Facebook</Title>
                    <CloseButton onClick={handleClose}>
                        <MdClose className="text-gray-700 w-6 h-6" />
                    </CloseButton>
                </Header>
                <Content>
                    <Subtitle>Wait...why do I have to authenticate with Facebook?</Subtitle>
                    <Description>
                        Facebook requires Instagram Business or Creator accounts to be connected to a Facebook Page. For Buffer to work as intended, we need to authenticate through Facebook.
                    </Description>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="w-full md:w-2/3">
                            <Subtitle>What happens next?</Subtitle>
                            <Description>
                                Once we transfer you, <Link href="#">sign in to the Facebook profile</Link> that has Admin permissions for the Facebook Page connected with your Instagram account.
                            </Description>
                        </div>
                        <Image src={Images.InstagramModal} alt="Illustration" className="h-36 w-full md:h-32 md:w-1/3 object-contain" />
                    </div>
                    <Description>
                        Check out our <Link href="#">Instagram connection guide</Link> for more.
                    </Description>

                </Content>
                <Footer>
                    <CancelButton onClick={handleClose}>Cancel</CancelButton>
                    <Button>Authenticate with Facebook</Button>
                </Footer>
            </ModalContainer>
        </ModalOverlay>
    );
};

const ModalOverlay = tw.div`addCommentModel h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out flex justify-center items-center z-20`;
const ModalContainer = tw.div`bg-white rounded-lg shadow-lg w-full max-w-lg `;
const Header = tw.div`flex justify-between items-center  p-4`;
const Title = tw.h2`text-xl font-semibold text-black`;
const CloseButton = tw.button`p-2 rounded-full hover:bg-gray-200 text-black`;
const Content = tw.div` border-t border-b border-gray-300 bg-neutral-100 p-4`;
const Subtitle = tw.h3`text-lg font-semibold text-black `;
const Description = tw.p`text-gray-700 mb-4`;
const Link = tw.a`text-blue-600 hover:underline`;
const Image = tw.img` mb-4`;
const Footer = tw.div`flex justify-end items-center p-4`;
const CancelButton = tw.button`mr-2 text-gray-700 font-semibold hover:text-black text-base`;
const Button = tw.button`bg-orange-500 text-white hover:bg-orange-600 px-4 items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded-md items-center`;

export default AuthenticateWithFacebookModal;
