import React from 'react';
import { FaComments, FaSearch, FaChartLine, FaThumbsUp } from 'react-icons/fa';
import tw from 'tailwind-styled-components';
import { Link, useLocation } from "react-router-dom";
const services = [
    {
        title: "Multi Channel Marketing Campaign Management",
        description: "Simplify the creation of visually appealing and effective campaigns without needing technical skills.",
        icon: <FaComments className="text-xl" />,
        to: "/multi-channel-marketing",
    },
    {
        title: "Social Media Marketing & Campaign Management",
        description: "Allows users to easily create and customize campaigns without needing advanced design skills, making campaign creation more accessible.",
        icon: <FaSearch className="text-xl" />,
        to: "/social-media-marketing",
    },
    {
        title: "USSD Menu Builder Design",
        description: "Allows users to visualize the menu flow and make immediate adjustments, ensuring the final design meets their expectations before going live.",
        icon: <FaChartLine className="text-xl" />,
        to: "/ussd-menu",
    },
    {
        title: "Device Campaign Management",
        description: "Reaching users within their preferred mobile apps with relevant and engaging ads, driving higher engagement rates.",
        icon: <FaThumbsUp className="text-xl" />,
        to: "/device-campaign",
    },
    {
        title: "GEO- Location Campaign Management",
        description: "Allows marketers to target subscribers based on their physical location or proximity to specific landmarks or areas of interest.",
        icon: <FaComments className="text-xl" />,
        to: "/geo-location",
    },
    {
        title: "Polling, Surveys & Customer Feedback Management",
        description: "Brand Consistency: Ensures that surveys align with company branding, enhancing recognition and trust.",
        icon: <FaSearch className="text-xl" />,
        to: "/polling-pages",
    },
    {
        title: "Automation & Business Operations",
        description: "Lead Capture: Facilitates the collection of contact information directly from the landing page.",
        icon: <FaChartLine className="text-xl" />,
        to: "/automation-pages",
    },
    {
        title: "Landing Page Design for Lead Generation",
        description: "Conversion Optimization: Helps identify the most effective design and content elements.",
        icon: <FaThumbsUp className="text-xl" />,
        to: "/lead-generation",
    },
    {
        title: "Campaign Performance Dashboard & Analytics",
        description: "Feedback Collection: Gathers insights directly from target audiences.",
        icon: <FaComments className="text-xl" />,
        to: "/campaign-pages",
    },
    {
        title: "Loyalty Campaign Management",
        description: "Feedback Collection: Gathers insights directly from target audiences.",
        icon: <FaSearch className="text-xl" />,
        to: "/loyalty-campaign",
    },
    {
        title: "Meetings & Appointments",
        description: "Feedback Collection: Gathers insights directly from target audiences.",
        icon: <FaChartLine className="text-xl" />,
        to: "/meeting-page",
    },
    {
        title: "Resources (API Integrations, Documentation & Support)",
        description: "Feedback Collection: Gathers insights directly from target audiences.",
        icon: <FaThumbsUp className="text-xl" />,
        to: "/resources-page",
    },
];

const Section = tw.section`bg-white py-20`;
const Container = tw.div`Container mx-auto `;
const Title = tw.h2`text-3xl font-bold text-gray-800 text-center`;
const Grid = tw.div`mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`;
const ServiceCard = tw.div`bg-white p-6 rounded-md shadow transition-colors duration-300 hover:bg-orange-500 hover:text-white shadow-2xl`;
const IconBox = tw.div`w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-sm transition-colors duration-300 hover:bg-white hover:text-orange-500 mb-4 `;
const Description = tw.p`mt-2 text-sm`;

const Services = () => {
    return (
        <Section>
            <Container>
                <p className="text-md mb-4 text-orange-500 text-center font-semibold">Featured Services</p>
                <Title>You’ve got a business, we have got<br /> brilliant minds</Title>
                <Grid>
                    {services.map((service, index) => (
                        <Link to={service.to}>
                            <ServiceCard key={index}>
                                <IconBox>
                                    {service.icon}
                                </IconBox>
                                <h3 className="text-xl font-normal text-left">{service.title}</h3>
                                <Description className="text-left">{service.description}</Description>
                            </ServiceCard>
                        </Link>
                    ))}
                </Grid>
            </Container>
        </Section>
    );
};

export default Services;
