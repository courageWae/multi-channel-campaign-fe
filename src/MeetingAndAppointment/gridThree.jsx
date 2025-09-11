import tw from 'tailwind-styled-components';
import { data } from './data';

const GridThree = () => {
    const benefits = data.benefits;
    

    return (
        <SectionContainer>
            {benefits.map((card, i) => (
                <ContentWrapper key={i}>
                    <Box>
                        <div className="text-5xl text-orange-500 mb-3">
                            {card.icon}
                        </div>
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
    p-4  rounded-lg  hover:scale-110 hover:transform hover:-translate-y-[20%] transition-all
`;

const Heading = tw.h1`
    text-xl text-orange-500 font-medium mb-3
`;

const SubHeading = tw.p`
    text-md text-gray-600 font-normal
`;

export default GridThree;
