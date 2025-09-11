

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FaPaperPlane } from "react-icons/fa6";
import Images from 'Images';
import tw from 'tailwind-styled-components';

const FooterWrapper = tw.footer`py-8 bg-gray-100`;
const Container = tw.div`Container mx-auto px-6`;
const GridWrapper = tw.div`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-6`;
const TextCenterWrapper = tw.div`text-center md:text-left mb-6 md:mb-0`;
const LogoWrapper = tw.div`text-xl font-bold text-indigo-600 mb-2`;
const Text = tw.p`text-gray-500 md:px-2`;
const SocialLinksWrapper = tw.div`flex justify-center md:justify-start mt-4 space-x-3`;
const LinkWrapper = tw(Link)`text-gray-500 hover:text-orange-500 text-md font-normal`;
const SectionWrapper = tw.div``;
const SectionTitle = tw.h5`font-bold text-gray-700 mb-4`;
const List = tw.ul`text-gray-600`;
const ListItem = tw.li`mb-1`;
const InputWrapper = tw.form`flex flex-col`;
const Input = tw.input`p-2 mb-2 md:mb-0 flex-grow rounded border border-gray-300`;
const Button = tw.button`bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded mt-2`;
const BottomWrapper = tw.div`flex flex-col md:flex-row justify-between items-center mt-8 border-t border-gray-200 pt-4`;
const BottomText = tw.p`text-gray-500 text-sm`;
const BottomLinksWrapper = tw.div`flex mt-4 md:mt-0 space-x-4`;
const BottomLink = tw(Link)`text-gray-500 hover:text-orange-500 text-sm`;


// const SectionWrapper = tw.div`w-full md:w-1/4 mb-6 md:mb-0`;


const Footers = () => {

    let date = new Date();
    let year = date.getYear();

    return (
        <FooterWrapper>
            <Container>
                <GridWrapper>
                    <TextCenterWrapper>
                        <LogoWrapper>
                            <img src={Images.LogoSevo} alt="TXT Logo" className="inline h-8 mr-2" />
                        </LogoWrapper>
                        <Text>Molestie cras maximus venenatis ipsum mauris ultricies penatibus bibendum semper primis potenti</Text>
                        <SocialLinksWrapper>
                            <LinkWrapper to="#"><FaFacebookF /></LinkWrapper>
                            <LinkWrapper to="#"><FaInstagram /></LinkWrapper>
                            <LinkWrapper to="#"><FaTwitter /></LinkWrapper>
                            <LinkWrapper to="#"><FaYoutube /></LinkWrapper>
                        </SocialLinksWrapper>
                    </TextCenterWrapper>
                    <SectionWrapper>
                        <SectionTitle>Services</SectionTitle>
                        <List>
                            <ListItem><LinkWrapper to="#">Brand Development</LinkWrapper></ListItem>
                            <ListItem><LinkWrapper to="#">Marketing Agency</LinkWrapper></ListItem>
                            <ListItem><LinkWrapper to="#">Digital Marketing</LinkWrapper></ListItem>
                            <ListItem><LinkWrapper to="#">Technical SEO</LinkWrapper></ListItem>
                            <ListItem><LinkWrapper to="#">Keyword research and optimization</LinkWrapper></ListItem>
                        </List>
                    </SectionWrapper>
                    <SectionWrapper>
                        <SectionTitle>Company</SectionTitle>
                        <List>
                            <ListItem><LinkWrapper to="#">About us</LinkWrapper></ListItem>
                            <ListItem><LinkWrapper to="#">Leadership</LinkWrapper></ListItem>
                            <ListItem><LinkWrapper to="#">Careers</LinkWrapper></ListItem>
                            <ListItem><LinkWrapper to="#">Article & News</LinkWrapper></ListItem>
                            <ListItem><LinkWrapper to="#">Contact us</LinkWrapper></ListItem>
                        </List>
                    </SectionWrapper>
                    <SectionWrapper>
                        <SectionTitle>Newsletter</SectionTitle>
                        <Text className="mb-4">Sign up our newsletter to get update information, news and free insight.</Text>
                        <InputWrapper>
                            <Input type="email" placeholder="Email" />
                            <Button>SIGN UP</Button>
                        </InputWrapper>
                    </SectionWrapper>
                </GridWrapper>
                <BottomWrapper>
                    <BottomText>© {year} Sevo Adsevo, All rights reserved. Powered by GWOSEVO.</BottomText>
                    <BottomLinksWrapper>
                        <BottomLink to="#">Terms of use</BottomLink>
                        <BottomLink to="#">Privacy Policy</BottomLink>
                        <BottomLink to="#">Cookie Policy</BottomLink>
                    </BottomLinksWrapper>
                </BottomWrapper>
            </Container>
        </FooterWrapper>
    );
};

export default Footers;
