import React from 'react'
import tw from "tailwind-styled-components";
import { IoBackspaceOutline } from "react-icons/io5";
import { GiSaveArrow } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const { setOpenUploadTemplateModel, setOpenUpdateTemplateModel,emailTemplateId } = props;

  const navigate = useNavigate();

  const goBack = () => {
    if(emailTemplateId) return navigate(`/email/sample/create/${emailTemplateId}`);
    return navigate("/email/sample/create");
  };

  return (
    <NavigationBarAlt>
    <div className="dashboard-header-feature">
      {emailTemplateId ? (
        <Button onClick={() => setOpenUpdateTemplateModel(true)}>
          <GiSaveArrow className="mr-1 text-white" /> Update Sample
        </Button>
      ) : (
        <Button onClick={() => setOpenUploadTemplateModel(true)}>
          <GiSaveArrow className="mr-1 text-white" /> Save Sample
        </Button>
      )}
      <CancelButton onClick={goBack}>
        <IoBackspaceOutline className="mr-1 text-white" /> Go Back
      </CancelButton>
    </div>
  </NavigationBarAlt>
  )
}

const NavigationBarAlt = tw.div`bg-white h-14 flex justify-end items-center`;
const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded`;
const CancelButton = tw.button`text-white bg-red-500 hover:bg-red-500 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded`;
export default Header