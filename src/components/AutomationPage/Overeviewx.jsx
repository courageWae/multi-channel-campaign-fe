
import React from 'react';
import tw from 'tailwind-styled-components';
import Images from 'Images';

const Overviewx = () => {
    return (
        <HeroSection>

            <Content>
                <Container>
                    <ImageContainer>



                        <StyledImage src={Images.Over} alt="Person" />

                    </ImageContainer>
                    <div className="md:w-1/2 w-full text-center lg:text-left">

                        <Title>Get even more control and flexibility
                            with our enterprise solution</Title>
                        <Paragraph>Empower your team with versatile solutions to build brilliant customer experiences across channels. Use tailor-made products to meet advanced needs and benefit from personal support with 1 hour guaranteed response time.</Paragraph>
                        <Button>Learn More</Button>
                    </div>

                </Container>
            </Content>
        </HeroSection>
    );
};

const HeroSection = tw.section`relative w-full  py-12 bg-orange-200`;

const Content = tw.div`relative z-10 w-full h-full flex items-center justify-center`;
const Container = tw.div`Container mx-auto flex flex-col md:flex-row items-center`;
const Title = tw.h1`text-xl md:text-3xl font-bold text-gray-800 leading-tight mt-4`;
const Paragraph = tw.p`mt-4 text-gray-600`;
const Button = tw.button`mt-6 bg-gradient-to-r from-orange-300 to-orange-500 rounded-full text-white py-2 px-12 hover:bg-orange-600`;
const ImageContainer = tw.div`md:w-1/2 w-full mt-5 md:mt-0 flex justify-center relative md:pr-10`;
const StyledImage = tw.img` h-auto  relative z-2 rounded-lg`;


export default Overviewx;
