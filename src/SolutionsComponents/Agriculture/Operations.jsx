import React from "react";
import { MdManageAccounts } from "react-icons/md";
import tw from "tailwind-styled-components";
const Operations = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <TopTitle>
          <Title>
            <span>
              <MdManageAccounts className="text-orange-600 text-md font-bold mr-2" />
            </span>
            Why should I choose Adsevo in my Food, Agriculture or Forestry Business?
          </Title>
          <Separator />
        </TopTitle>
        <Subtitle>
          <div>
            <span className="text-orange-600">Adsevo </span>{" "}
            ensures efficiency and coordination of processes, resources, and
            activities to achieve Industrial goals and improve productivity.
          </div>
        </Subtitle>
      </ContentWrapper>
    </SectionContainer>
  );
};


const Subtitle = tw.h4`flex justify-start text-2xl w-full leading-10 font-bold text-gray-700 mt-2`;

const SectionContainer = tw.div`
  flex justify-center items-center relative
`;

const ContentWrapper = tw.div`
  flex flex-col items-center max-w-6xl w-full px-4
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
export default Operations;
