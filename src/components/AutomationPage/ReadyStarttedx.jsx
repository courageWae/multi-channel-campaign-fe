
import React from 'react';
import tw from 'tailwind-styled-components';

const ReadyStarttedx = () => {
    return (
        <SectionContainer>
            <ContentWrapper>
                <Heading>Ready to get started?</Heading>
                <SubHeading>Join Sevo. Send 300 emails a day on our free plan and upgrade as you grow.</SubHeading>
                <div className='flex justify-center'>
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
   text-center font-medium text-md mb-6 text-gray-600
`;

const Button = tw.h1`
    text-md  text-white bg-orange-500 px-4 py-2 inline-block rounded-full
`;



export default ReadyStarttedx;

