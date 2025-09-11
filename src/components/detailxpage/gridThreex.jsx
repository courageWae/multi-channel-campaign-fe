import React from 'react';
import tw from 'tailwind-styled-components';

const GridThreex = () => {
    const data = [
        {
            heading: "Email deliverability",
            subHeading: "Send emails from A to B without delay. Our email API guarantees a 99% delivery rate."
        },
        {
            heading: "Email deliverability",
            subHeading: "Send emails from A to B without delay. Our email API guarantees a 99% delivery rate."
        },
        {
            heading: "Email deliverability",
            subHeading: "Send emails from A to B without delay. Our email API guarantees a 99% delivery rate."
        },
        {
            heading: "Email deliverability",
            subHeading: "Send emails from A to B without delay. Our email API guarantees a 99% delivery rate."
        },
        {
            heading: "Email deliverability",
            subHeading: "Send emails from A to B without delay. Our email API guarantees a 99% delivery rate."
        },
        {
            heading: "Email deliverability",
            subHeading: "Send emails from A to B without delay. Our email API guarantees a 99% delivery rate."
        },
    ];

    return (
        <SectionContainer>
            {data.map((card, i) => (
                <ContentWrapper key={i}>
                    <Box>
                        <Heading>{card.heading}</Heading>
                        <SubHeading>{card.subHeading}</SubHeading>
                    </Box>
                </ContentWrapper>
            ))}
        </SectionContainer>
    );
};

const SectionContainer = tw.div`
    grid grid-cols-1 md:grid-cols-3 gap-8 items-center md:py-12 relative Container
`;

const ContentWrapper = tw.div`
    flex justify-center
`;

const Box = tw.div`
    p-4  rounded-lg  hover:scale-110 hover:transform hover:-translate-y-[20%]
`;

const Heading = tw.h1`
    text-xl text-orange-500 font-medium mb-3
`;

const SubHeading = tw.p`
    text-md text-gray-600 font-normal
`;

export default GridThreex;
