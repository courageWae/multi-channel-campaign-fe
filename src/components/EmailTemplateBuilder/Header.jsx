import tw from "tailwind-styled-components";
import { IoBackspaceOutline } from "react-icons/io5";
import { GiSaveArrow } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import { PiEyedropperSampleBold } from "react-icons/pi";

const Header = (props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const edit_param = query.get("edit");

  const {
    setOpenUploadTemplateModel,
    setOpenUpdateTemplateModel,
    emailTemplateId,
  } = props;

  const navigate = useNavigate();

  const goBack = () => {
    if (emailTemplateId && !edit_param) {
      return navigate(`/email-template/edit/${emailTemplateId}`);
    }
    if (edit_param && edit_param === "campaign_edit") {
      const params = new URLSearchParams();
      params.append("key", "campaign_edit");
      navigate(`/email/campaign/create?${params.toString()}`);
    }
    else if(edit_param && edit_param === "campaign_update"){
      const params = new URLSearchParams();
      params.append("key", "campaign_update");
      const campaignId = localStorage.getItem("campaignId");
      navigate(`/email/campaign/edit/${campaignId}?${params.toString()}`);
    } 
    else {
      return navigate("/email-template/create");
    }
  };

  const redirectToSamples = () => {
    if (emailTemplateId) {
      return navigate(`/samples/email-template/${emailTemplateId}`);
    }
    return navigate("/samples/email-template");
  };

  return (
    <NavigationBarAlt>
      <div className="dashboard-header-feature flex gap-2 items-center">
      {!edit_param && (
          <ChooseButton onClick={redirectToSamples}>
            <PiEyedropperSampleBold className="mr-1 text-white" />
            Choose from Samples
          </ChooseButton>
      )}
      </div>
      <div className="dashboard-header-feature">
        {emailTemplateId ? (
          <Button onClick={() => setOpenUpdateTemplateModel(true)}>
            <GiSaveArrow className="mr-1 text-white" /> Update Template
          </Button>
        ) : (
          <Button onClick={() => setOpenUploadTemplateModel(true)}>
            <GiSaveArrow className="mr-1 text-white" /> Save Template
          </Button>
        )}
        <CancelButton onClick={goBack}>
          <IoBackspaceOutline className="mr-1 text-white" /> Go Back
        </CancelButton>
      </div>
    </NavigationBarAlt>
  );
};

const NavigationBarAlt = tw.div`bg-white h-14 flex justify-between items-center`;
const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded`;
const ChooseButton = tw.button`text-white bg-blue-950 hover:bg-blue-900 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded`;
const CancelButton = tw.button`text-white bg-red-500 hover:bg-red-500 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded`;
export default Header;
