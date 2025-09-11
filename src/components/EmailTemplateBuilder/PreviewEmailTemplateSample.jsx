import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { FaTimes } from "react-icons/fa";
import { IoMdDesktop } from "react-icons/io";
import { FaTabletAlt } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";

const PreviewEmailTemplateSample = ({ isOpen, onClose, emailHtml, templateName }) => {
  const [view, setView] = useState("desktop");

  // Determine the container size based on the selected view
  const getContainerClass = () => {
    switch (view) {
      case "desktop":
        return "max-w-4xl";
      case "tablet":
        return "max-w-2xl";
      case "mobile":
        return "max-w-md";
      default:
        return "max-w-4xl";
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent className={`transition-all duration-300 ${getContainerClass()}`}>
        <Header>
          <ButtonGroup>
            <ViewButton onClick={() => setView("desktop")} className={`${view === 'desktop' ? 'text-orange-500' : 'text-gray-500'}`} ><IoMdDesktop/></ViewButton>
            <ViewButton onClick={() => setView("tablet")} className={`${view === 'tablet' ? 'text-orange-500' : 'text-gray-500'}`}><FaTabletAlt/></ViewButton>
            <ViewButton onClick={() => setView("mobile")} className={`${view === 'mobile' ? 'text-orange-500' : 'text-gray-500'}`}><FaMobileAlt/></ViewButton>
          </ButtonGroup>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </Header>
        <SubHeading>{templateName}</SubHeading>
        <Separator/>
        <EmailPreviewWrapper>
          <EmailPreviewFrame style={{border:"1px solid #ccc"}}>
            <EmailPreviewContainer
              dangerouslySetInnerHTML={{ __html: emailHtml }}
            />
          </EmailPreviewFrame>
        </EmailPreviewWrapper>
        <Footer>
          <p className="text-center text-gray-500">Powered by Campaign-Manager</p>
        </Footer>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = tw.div`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50`;
const ModalContent = tw.div`bg-white rounded-lg w-4/5 h-svh flex flex-col overflow-hidden`;
const Header = tw.div`flex justify-between items-center p-4 border-b border-gray-300`;
const ButtonGroup = tw.div`w-full flex gap-2 items-center justify-center`;
const ViewButton = tw.button`px-4 py-2 bg-white text-orange-500 rounded-md`;
const CloseButton = tw.button`text-gray-700 hover:text-gray-900 text-2xl`;
const EmailPreviewWrapper = tw.div`flex-1 flex justify-center items-center p-4 overflow-auto`;
const EmailPreviewFrame = tw.div`w-full h-full border-t border-white bg-white rounded-lg shadow-lg overflow-auto p-4`;
const EmailPreviewContainer = tw.div`w-full h-full max-h-full overflow-auto`;
const Footer = tw.div`p-4 border-t border-gray-300`;
const SubHeading = tw.div`text-left pl-4 font-family-sans font-bold text-3xl mb-6 text-gray-500 letter-spacing-2`;
const Separator = tw.div`w-full h-0.5 bg-gray-200 my-3`;

export default PreviewEmailTemplateSample;
