import React from 'react';
import { FaBriefcase, FaSearch } from 'react-icons/fa';
import { IoRocketOutline } from "react-icons/io5";
import Images from 'Images';
import tw from 'tailwind-styled-components';

const Section = tw.section`py-10`;
const Container = tw.div`Container mx-auto flex flex-col md:flex-row items-center`;
const ImageWrapper = tw.div`md:w-1/2 w-full`;
const ContentWrapper = tw.div`md:w-1/2 w-full md:pl-16 mt-10 md:mt-0 text-center md:text-left`;
const Title = tw.h2`text-3xl font-bold text-gray-800`;
const Subtitle = tw.p`mt-4 text-gray-600`;
const IconWrapper = tw.div`flex items-start`;
const Icon = tw.div`flex-shrink-0 text-orange-500 w-6 h-6 mt-1.5`;
const TextWrapper = tw.div`ml-4`;

const About = () => {
    return (
        <Section>
            <Container>
                <ImageWrapper>
                    <img src={Images.AboutImg} alt="About Image" className="w-full h-auto" />
                </ImageWrapper>
                <ContentWrapper>
                    <p className="text-md font-semibold text-orange-500 mb-4">Who We Are</p>
                    <Title>Real people delivering real results.</Title>
                    <Subtitle>Pharetra ornare consequat id lobortis facilisis habitasse pretium sollicitudin natoque. Ornare parturient hendrerit vulputate mi potenti per justo. Commodo eros amet ipsum phasellus tincidunt.</Subtitle>
                    <div className="mt-6 space-y-4">
                        <IconWrapper>
                            <Icon><FaBriefcase /></Icon>
                            <TextWrapper>
                                <h3 className="text-xl font-semibold text-gray-800">Marketing Agency</h3>
                                <p className="text-gray-600">Ligula mauris felis metus euismod etiam conubia facilisi quam efficitur senectus luctus.</p>
                            </TextWrapper>
                        </IconWrapper>
                        <IconWrapper>
                            <Icon><IoRocketOutline /></Icon>
                            <TextWrapper>
                                <h3 className="text-xl font-semibold text-gray-800">SEO Services</h3>
                                <p className="text-gray-600">Ligula mauris felis metus euismod etiam conubia facilisi quam efficitur senectus luctus.</p>
                            </TextWrapper>
                        </IconWrapper>
                    </div>
                </ContentWrapper>
            </Container>
        </Section>
    );
};

export default About;
