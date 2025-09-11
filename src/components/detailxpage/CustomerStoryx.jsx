
import React from 'react';
import tw from 'tailwind-styled-components';
import Images from 'Images'
const Header = () => {
    return (
        <SectionContainer>
            <ContentWrapper>
                <TextWrapper>

                    <Title>Solution for every business</Title>

                    <SignUpButton>Read all customer stories</SignUpButton>
                </TextWrapper>
                <VideoPlaceholder>
                    <Description>"The email dashboard is so detailed! I love to go there, check the stats, and see how contacts are engaging with our content."</Description>
                    <div className='flex'>
                        <StyledImage src={Images.Tri} alt="Person" />
                        <div className='md:ml-4 ml-2'>
                            <Founder>Simón Gómez</Founder>
                            <Designation>Growth Marketer, Tributi</Designation>
                        </div>
                    </div>
                </VideoPlaceholder>
            </ContentWrapper>
        </SectionContainer>
    );
};

const SectionContainer = tw.div`
    flex justify-center items-center py-14 relative
`;

const ContentWrapper = tw.div`
    flex flex-col md:flex-row items-center Container w-full
`;

const TextWrapper = tw.div`
    flex flex-col items-start p-4 md:w-1/2
`;

const Title = tw.h1`
    text-4xl font-bold text-gray-900 mb-8
`;


const SignUpButton = tw.button`
    bg-orange-600 text-white px-6 py-2 rounded-full text-lg hover:bg-orange-700 transition duration-200
`;

const VideoPlaceholder = tw.div`
    flex flex-col items-start py-4 md:w-1/2
`;
const Description = tw.p`
  text-md  md:text-xl text-gray-700 mb-6 md:text-left text-center
`;
const StyledImage = tw.img`w-28 h-auto  relative z-2 `;
const Founder = tw.p`text-sm font-bold`;
const Designation = tw.p`text-sm`;
export default Header;

