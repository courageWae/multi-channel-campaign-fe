import React from "react";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <TextWrapper>
          <Subtitle>SALES MARKETING</Subtitle>
          <Title>Sales & Marketing Automation</Title>
          <Description>
            The Sales & Marketing Automation Module in a campaign management
            solution is designed to streamline and enhance sales and marketing
            efforts through automation, improving efficiency, and effectiveness.
            This module integrates various tools and features to automate
            repetitive tasks, nurture leads, and drive conversions.
          </Description>
          <Description>
            The Sales & Marketing Automation Module is integral to modern
            marketing and sales strategies, enabling businesses to operate more
            efficiently, engage their audience effectively, and drive better
            results.
          </Description>
          <Description>
            The Sales & Marketing Automation Module automates key sales and
            marketing processes, enabling businesses to run efficient campaigns,
            nurture leads, and manage customer relationships. It helps in
            managing customer data, automating follow-ups, segmenting audiences,
            and tracking engagement to drive better sales outcomes and marketing
            effectiveness.
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
    flex flex-col gap-3 md:flex-row items-center max-w-6xl w-full
`;

const TextWrapper = tw.div`
    flex flex-col items-start p-4 mr-6 md:w-2/3
`;

const Subtitle = tw.h2`
    text-sm font-medium text-gray-600 mb-2
`;

const Title = tw.h1`
    text-4xl font-bold text-gray-900 mb-4
`;

const Description = tw.p`
    text-md text-gray-700 mb-6 text-justify
`;

const SignUpButton = tw.button`
    bg-orange-600 text-white px-6 py-2 rounded-full text-lg hover:bg-orange-700 transition duration-200
`;

const VideoPlaceholder = tw.div`
    bg-orange-100 md:w-1/2 h-64 md:h-80 flex items-center justify-center relative mt-6 md:mt-0 rounded-md
`;

// const UnmuteButton = tw.button`
//     absolute top-4 right-4 bg-black text-white px-2 py-1 rounded
// `;

// const ButtonGroup = tw.div`w-100 flex justify-start align-center gap-3 mb-6`;
// const LoginButton = tw.button`text-sm border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full px-4 py-2`;

export default Header;
