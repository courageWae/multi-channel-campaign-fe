import React from "react";
import { GiEngagementRing } from "react-icons/gi";
import tw from "tailwind-styled-components";
import { benefits } from "./data";

const Benefits = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <TopTitle>
          <Title>
            <span>
              <GiEngagementRing className="text-orange-600 text-md font-bold mr-2" />
            </span>
            Benefits of Using Adsevo in the Banking and Finance Sector
          </Title>
          <Separator />
        </TopTitle>
        <GridContainer>
          {benefits.map((item, index) => {
            return (
              <Card key={index}>
                <ImageContainer>
                  <img src={item.image} alt={item.title} width={"100"} />
                </ImageContainer>
                <Separator className="my-6 w-full h-[1px]" />
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </Card>
            );
          })}
        </GridContainer>
      </ContentWrapper>
    </SectionContainer>
  );
};



const ImageContainer = tw.div`
  flex justify-center items-center
`;

const CardTitle = tw.h1`
  text-xl font-bold text-gray-800 mb-4
`;

const CardDescription = tw.p`
  text-md text-gray-700 leading-8
`;

const SectionContainer = tw.div`
  flex justify-center items-center py-28 relative
`;

const ContentWrapper = tw.div`
  flex flex-col items-center max-w-6xl w-full px-4
`;

const GridContainer = tw.div`
  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4 w-full
`;

const Card = tw.div`
  h-[450px] w-full bg-white hover:shadow-xl transition duration-500 rounded-lg p-6 border border-gray-200
`;

const TopTitle = tw.div`
  flex items-center w-full gap-2 mb-10
`;

const Title = tw.h1`
  text-md flex items-center font-bold text-orange-600 p-3 bg-white shadow-md rounded-md
`;

const Separator = tw.div`
  h-[0.5px] w-6 bg-gray-300 rounded-md flex-grow
`;

export default Benefits;
