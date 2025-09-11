import Images from "Images";
import React from "react";
import { LuChurch } from "react-icons/lu";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

const Header = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <TextWrapper>
          <Subtitle>
          <LuChurch className="text-orange-600 mr-3" />
            <span className="text-orange-600 font-bold">Religious Institutions</span>
          </Subtitle>
          <Title>
            Solutions Focused on {" "}
            <span className="text-orange-600 text-6xl  font-bold capitalize">
              Religious{" "}
            </span>
            Institutions
          </Title>
          <Description>
            InstitutionsThese use cases highlight how Adsevo can
            effectively support and enhance various aspects of operations within
            religious institutions, improving communication, engagement, and
            overall management.
          </Description>
          <Link to="/register">
            <SignUpButton>Sign up</SignUpButton>
          </Link>
        </TextWrapper>
        <ImageContainer>
          <img src={Images.bible} alt="hero-illustrator" />
        </ImageContainer>
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
    flex items-center text-gray-600 mb-4 text-orange-600 font-bold text-sm p-3 bg-white rounded-md shadow-md
`;

const ImageContainer = tw.div`
    flex flex-col items-start p-4 mr-6 md:w-2/3
`;

const Title = tw.h1`
    text-6xl font-bold text-gray-900 mb-6
`;

const Description = tw.p`
    text-md text-gray-700 mb-6 text-justify leading-8
`;
const SignUpButton = tw.button`
    bg-orange-600 text-white px-6 py-2 rounded-full text-lg hover:bg-orange-700 transition duration-200
`;

export default Header;
