import React from 'react';
import Images from 'Images';
import tw from 'tailwind-styled-components';

const Container = tw.div`Container mx-auto text-center  shadow-lg z-40 rounded-md py-5 bg-white `;
const Title = tw.h2`text-3xl font-bold text-gray-800`;
const LogosContainer = tw.div`flex justify-between px-7 md:space-x-4 space-y-4 md:space-y-0 mt-8 flex-col lg:flex-row`;
const LogoImage = tw.img`h-20`;

const Features = () => {
    return (
        <section className="bg-transparent pb-20">
            <Container>
                <Title>Join our 30,000+ happy customers</Title>
                <LogosContainer>
                    <LogoImage src={Images.Feature1} alt="Logo 1" />
                    <LogoImage src={Images.Feature2} alt="Logo 2" />
                    <LogoImage src={Images.Feature3} alt="Logo 3" />
                    <LogoImage src={Images.Feature4} alt="Logo 4" />
                    <LogoImage src={Images.Feature5} alt="Logo 4" />
                    <LogoImage src={Images.Feature6} alt="Logo 4" />
                </LogosContainer>

            </Container>
        </section>
    );
};

export default Features;
