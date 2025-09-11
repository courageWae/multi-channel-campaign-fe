
import React from 'react';
import tw from 'tailwind-styled-components';
import { Link, useLocation } from "react-router-dom";

const Header1 = () => {



    return (
        <SectionContainer>
            <ContentWrapper>
                <TextWrapper>
                    <Subtitle>MESSAGING API</Subtitle>
                    <Title>Multi Channel Marketing Campaign Management (SMS, Voice & Email)
                    </Title>
                    <Description>
                        Simplify the creation of visually appealing and effective campaigns without needing technical skills.

                    </Description>
                    <Link to="/register">
                        <SignUpButton>Sign up free</SignUpButton>
                    </Link>
                </TextWrapper>

                <VideoPlaceholder>
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/GcX1ckvyBJM"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>

                </VideoPlaceholder>
            </ContentWrapper>
        </SectionContainer>
    );
};

const SectionContainer = tw.div`
    flex justify-center items-center py-28 relative
`;

const ContentWrapper = tw.div`
    flex flex-col md:flex-row items-center max-w-6xl w-full
`;

const TextWrapper = tw.div`
    flex flex-col items-start p-4 md:w-1/2
`;

const Subtitle = tw.h2`
    text-sm font-medium text-gray-600 mb-2
`;

const Title = tw.h1`
    text-4xl font-bold text-gray-900 mb-4
`;

const Description = tw.p`
    text-lg text-gray-700 mb-6
`;

const SignUpButton = tw.button`
    bg-orange-600 text-white px-6 py-2 rounded-full text-lg hover:bg-orange-700 transition duration-200
`;

const VideoPlaceholder = tw.div`
    bg-orange-100 md:w-1/2 h-64 md:h-80 flex items-center justify-center relative mt-6 md:mt-0 rounded-md
`;

const UnmuteButton = tw.button`
    absolute top-4 right-4 bg-black text-white px-2 py-1 rounded
`;

export default Header1;
