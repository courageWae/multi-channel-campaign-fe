import React from "react";
import tw from "tailwind-styled-components";

const GetStarted = () => {
    return (
        <SectionContainer>
        <ContentWrapper>
            <Heading>Ready to get started?</Heading>
            <SubHeading>
            Our Multi-Channel Marketing Module provides a comprehensive suite of
            tools to help you reach and engage your audience across multiple
            channels. Each feature is designed to simplify your marketing efforts
            and maximize your results. Watch our video tutorials to get started
            and make the most of our powerful capabilities
            </SubHeading>
            <div className="flex justify-center">
            <Button>Sign up Free</Button>
            </div>
        </ContentWrapper>
        </SectionContainer>
    );
};

const SectionContainer = tw.div`
   bg-orange-200 flex justify-center items-center py-14 relative
`;

const ContentWrapper = tw.div`
    
`;

const Heading = tw.div`
   text-center font-medium text-2xl mb-2
`;

const SubHeading = tw.div`
   text-center font-medium text-md lg:w-8/12 xl:w-8/12 md:w-6/12 sm:w-4/12 mb-6 text-gray-600 mx-auto
`;

const Button = tw.h1`
    text-md  text-white bg-orange-500 px-4 py-2 inline-block rounded-full
`;

export default GetStarted;
