

import React from 'react';
import tw from 'tailwind-styled-components';

const CardContainer = tw.div`
  border-2 p-6 rounded-tl-[30px] rounded-br-[30px] shadow-md flex flex-col
`;

const Title = tw.h2`
  text-xl font-bold mb-4
`;

const Description = tw.p`
  text-gray-700 mb-4
`;

const FeatureHeading = tw.h3`
  font-semibold mb-2
`;

const FeatureList = tw.ul`
  list-disc list-inside mb-6
`;

const FeatureItem = tw.li``;

const Button = tw.button`
  py-2 px-4  text-white mt-auto rounded-full
`;

const ProductCard = ({ title, description, features, buttonLabel, borderColor, buttonColor }) => {
    return (
        <CardContainer className={borderColor}>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <FeatureHeading>Top Features:</FeatureHeading>
            <FeatureList>
                {features.map((feature, index) => (
                    <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
            </FeatureList>
            <Button className={buttonColor}>{buttonLabel}</Button>
        </CardContainer>
    );
};

const ProductsSectionx = () => {
    const products = [
        {
            title: "Marketing Platform",
            description: "Increase conversions with multi-channel campaigns and marketing automation.",
            features: ["Email marketing", "Marketing Automation", "SMS & WhatsApp campaigns"],
            buttonLabel: "Find out more",
            borderColor: "border-purple-500",
            buttonColor: "bg-purple-500",
        },
        {
            title: "Sales Platform",
            description: "Easily manage your pipeline and accelerate revenue growth across the entire sales cycle.",
            features: ["Pipeline management", "Automated deal tracking", "Meetings & call recordings"],
            buttonLabel: "Find out more",
            borderColor: "border-orange-500",
            buttonColor: "bg-orange-500",
        },
        {
            title: "Conversations Platform",
            description: "Offer superb customer service with our multi-channel communication solution.",
            features: ["Chat", "Phone", "Universal inbox"],
            buttonLabel: "Find out more",
            borderColor: "border-red-500",
            buttonColor: "bg-red-500",
        },
        {
            title: "Customer Data Platform",
            description: "Unify, manage and sync customer data to accelerate your time-to-value.",
            features: ["Multi-table data model", "Scoring Library", "Customer Analytics & BI"],
            buttonLabel: "Learn more",
            borderColor: "border-blue-500",
            buttonColor: "bg-blue-500",
        },
    ];

    return (
        <div className="py-16">
            <div className='Container'>
                <h1 className="text-2xl font-bold text-center mb-10">Explore our other products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            title={product.title}
                            description={product.description}
                            features={product.features}
                            buttonLabel={product.buttonLabel}
                            borderColor={product.borderColor}
                            buttonColor={product.buttonColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsSectionx;
