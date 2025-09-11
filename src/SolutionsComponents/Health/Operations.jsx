import React from "react";
import { MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { operations } from "./data";
const Operations = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <TopTitle>
          <Title>
            <span>
              <MdManageAccounts className="text-orange-600 text-md font-bold mr-2" />
            </span>
            Operational Efficiency and Community Health
          </Title>
          <Separator />
        </TopTitle>
        <Subtitle>
          <div>
            <span className="text-orange-600">Operational Efficiency and Community Health</span>{" "}
            ensures efficient coordination of processes, resources, and
            activities to achieve institutional goals and improve productivity.
          </div>
        </Subtitle>
        <OperationsContainer>
          <BackgroundImage
            src="https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="background"
          />
          <Overlay />
          <OverlayContent>
            <CardContainer>
              {operations.map((item, index) => {
                return <CardComponent item={item} key={index} />;
              })}
            </CardContainer>
          </OverlayContent>
        </OperationsContainer>
      </ContentWrapper>
    </SectionContainer>
  );
};

const CardComponent = ({ item, key }) => {
  return (
    <div
      key={key}
      className="group relative cursor-pointer w-full overflow-hidden bg-orange-500 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10"
    >
      <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-white transition-all duration-300 group-hover:scale-[10]"></span>
      <div className="relative z-10 mx-auto max-w-md">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-white transition-all duration-300 group-hover:bg-white group-hover:border-2 group-hover:border-orange-500">
          {item.icon}
        </span>
        <h4 className="text-white font-bold text-xl group-hover:text-orange-500">{item.title}</h4>
        <div className="space-y-2 pt-5 text-base leading-7 text-white transition-all duration-300 group-hover:text-orange-500/90">
          <p>{item.description}</p>
        </div>
        <div className="pt-5 text-base font-semibold leading-7">
          <p>
            <Link
              to="/register"
              className="text-white transition-all duration-300 group-hover:text-orange-500"
            >
              Signup Free &rarr;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const Subtitle = tw.h4`flex justify-start text-2xl w-full leading-10 font-bold text-gray-700 mt-2`;

const SectionContainer = tw.div`
  flex justify-center items-center py-10 relative
`;

const ContentWrapper = tw.div`
  flex flex-col items-center max-w-6xl w-full px-4
`;

const CardContainer = tw.div`
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full p-6
  max-w-[80%] mx-auto
`;

const OperationsContainer = tw.div`
  relative w-full h-[900px] mt-20 overflow-hidden rounded-md
`;

const BackgroundImage = tw.img`
  w-full object-cover rounded-md h-full
`;

const Overlay = tw.div`
  absolute inset-0 bg-gray-700 opacity-60 rounded-md
`;

const OverlayContent = tw.div`
  absolute inset-0 flex justify-center items-center p-6
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
