import React from 'react';
import tw from 'tailwind-styled-components';
import Images from 'Images';

const FooterSection = tw.footer`relative py-20 bg-gray-800 bg-opacity-75`;
const Container = tw.div`Container mx-auto text-center text-white relative z-10`;
const Title = tw.h2`text-2xl md:text-4xl font-bold`;
const Subheading = tw.p`text-sm md:text-md my-4 md:mx-20`;
const Grid = tw.div`mt-6 grid grid-cols-1 md:grid-cols-3 gap-8`;
const Item = tw.div``;
const BgImg = tw.img`absolute inset-0 w-full h-full object-cover object-center opacity-10 `;

const Footer = () => {
    return (
        <FooterSection>
            <BgImg src={Images.FooterImg} alt="Footer Background Image" />
            <Container>
                <Title>Let us build the bridge<br /> between your brand and<br /> customer</Title>
                <Subheading>Your success is our priority, and we're here to help you achieve it. Your success is our priority, and we're here to help you achieve it.Your success is our priority, and we're here to help you achieve it.Your success is our priority, and we're here to help you achieve it.</Subheading>
                <Grid>
                    <Item>
                        <h3 className="text-orange-500 text-3xl font-semibold">18K+</h3>
                        <p className="text-sm">Project Done</p>
                    </Item>
                    <Item>
                        <h3 className="text-orange-500 text-3xl font-semibold">7K+</h3>
                        <p className="text-sm">Happy Customer</p>
                    </Item>
                    <Item>
                        <h3 className="text-orange-500 text-3xl font-semibold">4.7</h3>
                        <p className="text-sm">Customer Rating</p>
                    </Item>
                </Grid>
            </Container>
        </FooterSection>
    );
};

export default Footer;
