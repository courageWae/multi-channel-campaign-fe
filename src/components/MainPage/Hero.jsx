
import React from 'react';
import tw from 'tailwind-styled-components';
import Images from 'Images';
import { Link, useLocation } from "react-router-dom";

const Hero = () => {
    return (
        <HeroSection>

            <Content>
                <Container>
                    <div className="w-full text-left md:w-1/2 lg:text-left">
                        <h1>
                            <span className="px-8 py-2 text-white rounded-full bg-gradient-to-r from-orange-300 to-orange-500">#Premium Services</span>
                        </h1>
                        <Title>You’ve got a business,<br /> we have got brilliant<br /> idea for you.</Title>
                        <Paragraph>At Adsevo, we deliver smart solutions to help your business grow.,<br /> Our expert team is ready to provide the strategies you need to succeed. Let's build your future together.</Paragraph>
                        <Link to="/sales-contact">
                            <Button>Get a Demo</Button>
                        </Link>
                    </div>
                    <ImageContainer>
                        <StatsContainerLeft>
                            <StatImage src={Images.PaidOrders} alt="Product Impressions" />
                        </StatsContainerLeft>
                        <BlobImage>  <BlobStatImage src={Images.OrangeBlob} alt="blob" /></BlobImage>

                        <StyledImage src={Images.Person} alt="Person" />
                        <StatsContainerTop>
                            <StatImage src={Images.ProductImpressions} alt="Paid Orders" />
                        </StatsContainerTop>
                        <StatsContainerBottom>
                            <StatImage src={Images.NewOrders} alt="New Orders" />
                        </StatsContainerBottom>
                    </ImageContainer>
                </Container>
            </Content>
        </HeroSection>
    );
};

const HeroSection = tw.section`relative w-full h-screen overflow-hidden lg:pt-24 pt-24`;
const BgImg = tw.img`absolute inset-0 w-full h-full object-cover z-0`;
const Content = tw.div`relative z-10 w-full h-full flex items-center justify-center`;
const Container = tw.div`Container mx-auto flex flex-col md:flex-row items-center`;
// const Title = tw.h1`text-4xl text-center md:text-3xl md:text-left lg:text-left md:text-center font-bold text-gray-800 leading-tight mt-4`;
const Title = tw.h1`
  text-4xl
  md:text-left
  font-bold 
  text-gray-800 
  leading-tight 
  mt-4
`;

const Paragraph = tw.p`mt-4 text-gray-600`;
const Button = tw.button`mt-6 bg-gradient-to-r from-orange-300 to-orange-500 rounded-full text-white py-4 px-12 hover:bg-orange-600`;
const ImageContainer = tw.div`md:w-1/2 w-full mt-5 md:mt-0 flex justify-center relative`;
const StyledImage = tw.img`w-2/3 h-auto  relative z-2 transform scale-150 translate-y-[16%]`;
const StatsContainerTop = tw.div`absolute top-0 right-0 flex flex-col space-y-4 hidden md:block`;
const StatsContainerBottom = tw.div`absolute bottom-0 -right-36 flex flex-col space-y-4 hidden md:block`;
const StatsContainerLeft = tw.div`absolute top-1/3 left-0 flex flex-col space-y-4 z-10 hidden md:block`;
const BlobImage = tw.div`absolute top-0 left-0 flex flex-col space-y-4  `;
const StatImage = tw.img`w-48 h-auto bg-white rounded-lg shadow-md p-2`;
const BlobStatImage = tw.img`w-full h-full `;

export default Hero;
