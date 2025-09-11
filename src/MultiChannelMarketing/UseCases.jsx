import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useCases } from "MultiChannelMarketing/data";
import CaseModal from "../SalesMarketing/CaseModal";

const UseCases = ({ channel }) => {
  const cases = useCases.cases;

  const [isModalOpen, setModalOpen] = useState(false);
  const [caseData, setCaseData] = useState(null);
  const [title, setTitle] = useState("");

  const openModal = (data) => {
    setModalOpen(true)
    setCaseData(data)
    setTitle(data?.title)
  };
  const closeModal = () => {
    setModalOpen(false)
    setCaseData(null);
    setTitle("");
  };

  return (
    <HeroSection>
      <Content>
        <div className="mx-auto py-12 max-w-7xl text-center">
          <Title>
            Use Cases <span className="text-orange-500">Across</span> Industries
          </Title>
          <Container>
            {cases.map((data, index) => (
              <Card onClick={()=>{openModal(data)}}  key={index} className="col-span-1">
                <ImageContainer>
                  <IconElement>{data.icon}</IconElement>
                </ImageContainer>
                <TextContainer>
                  <Heading>{data.title}</Heading>
                  <SubHeading>{data.sub_heading}</SubHeading>
                </TextContainer>
                <div className="flex justify-end my-4">
                  <Button onClick={()=>{openModal(data)}}>Learn More</Button>
                </div>
              </Card>
            ))}
          </Container>
        </div>
      </Content>
      <CaseModal isOpen={isModalOpen} onClose={closeModal} title={title} data={caseData}/>
    </HeroSection>
  );
};

const HeroSection = tw.section`relative w-full py-12 bg-white`;

const Content = tw.div`relative z-10 w-full h-full flex items-center justify-center`;
const Container = tw.div`flex flex-wrap justify-center gap-8 w-full px-4`;
const Title = tw.h1`text-xl md:text-3xl font-bold text-gray-800 text-center leading-tight mb-10`;

const Card = tw.div`flex cursor-pointer flex-col items-center justify-between bg-white shadow-lg h-[450px] rounded-xl transform transition-transform hover:scale-105 duration-300 ease-in-out max-w-xs`;
const ImageContainer = tw.div`w-full h-24 p-6 bg-cover bg-center rounded-t-xl`;
const TextContainer = tw.div`p-6 text-left`;
const IconElement = tw.div`text-orange-600 text-5xl bg-orange-100 rounded-md p-4 w-24 h-24 flex items-center justify-center`;
const Heading = tw.h3`text-xl md:text-xl text-gray-700 font-bold mt-4`;
const SubHeading = tw.p`mt-2 text-gray-500 text-md w-full break-normal leading-relaxed`;
const Button = tw.button`mt-6 bg-gradient-to-r from-orange-300 to-orange-500 rounded-full text-white py-3 px-12 hover:bg-orange-600`;

export default UseCases;
