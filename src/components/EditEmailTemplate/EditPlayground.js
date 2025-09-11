import React, { useRef, useState, useEffect } from "react";
import EmailEditor from "@editex/react-email-editor";
import axios from "axios";
import Config from "Config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import UpdateEmailTemplate from "components/EmailTemplate/UpdateEmailTemplate";
import Loading from "components/Loading";
import Header from "components/EmailTemplateBuilder/Header";

function EditPlayground() {
  const user = useSelector((state) => state.UserReducer.user);
  const [emailData, setEmailData] = useState([]);
  const [openUploadTemplateModel, setOpenUploadTemplateModel] = useState(false);
  const [openUpdateTemplateModel, setOpenUpdateTemplateModel] = useState(false);
  const { templateId } = useParams();
  const [loading, setLoading] = useState(false);
  const [emailTemplateId, setEmailTemplateId] = useState(null);
  const [emailTemplateName, setEmailTemplateName] = useState("");
  const emailEditorRef = useRef(null);

  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sample_id = query.get("key");
  const edit_param = query.get("edit");

  useEffect(()=>{
    if(sample_id){
      setLoading(true)
      const fetchSample = async () => {
        try{

          const response = await axios.get(
            `${Config.apiUrl}/template/email/sample/view/${sample_id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Token: `${user.token}`,
              },
            }
          );
          setEmailData(JSON.parse(response.data.extra_data));
        }catch(error){
          console.log(error);
        }finally{
          console.log("finally");
          setLoading(false);
        }
      }
      fetchSample();
    }
    else{
      setEmailData([])
    }
  },[sample_id, user.token])

  useEffect(() => {
    if (templateId) {
      setLoading(true);
      const fetchTemplate = async () => {
        if (templateId) {
          setEmailTemplateId(templateId);
          try {
            const response = await axios.get(
              `${Config.apiUrl}/template/email/view/${templateId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Token: `${user.token}`,
                },
              }
            );
            setEmailData(JSON.parse(response.data.extra_data));
          } catch (err) {
          } finally {
            console.log("finally");
            setLoading(false);
          }
        }
      };
      fetchTemplate();
    }
  }, [templateId, user.token]);

  useEffect(() => {
    //* Get the template name from the local storage
    if(localStorage.getItem("selectedTemplateName")){
      const editTemplateName = localStorage.getItem("selectedTemplateName");
      setEmailTemplateName(editTemplateName);
    }
    else{
      const template_name = localStorage.getItem("templateName");
      setEmailTemplateName(template_name);
    }
  }, []);

  const UpdateUploadTemplate = async (values) => {
    const html = emailEditorRef.current.exportHtml();
    const design = emailEditorRef.current.blockList;
    setEmailData(design);

    const body = new FormData();
    body.append("templateName", emailTemplateName);
    body.append("template", html);
    body.append("templateId", emailTemplateId);
    body.append("extraData", JSON.stringify(design));

    return await axios.post(`${Config.apiUrl}/template/email/edit`, body, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });
  };

  const updateEditIdSuccess = (data) => {
    setOpenUpdateTemplateModel(false);
    toast.success(data?.data?.msg || "Success");
    if(edit_param && edit_param === "campaign_edit"){
      const params = new URLSearchParams();
      params.append("key", "campaign_edit");
      navigate(`/email/campaign/create?${params.toString()}`);
    }
    else if(edit_param && edit_param ==="campaign_update"){
      const params = new URLSearchParams();
      params.append("key", "campaign_update");
      const campaignId = localStorage.getItem("campaignId");
      navigate(`/email/campaign/edit/${campaignId}?${params.toString()}`);
    }
    else{
      navigate("/email-template");
    }
  };

  const updateEditError = (data) => {
    setOpenUpdateTemplateModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occurred");
  };

  const {
    isLoading: emailEditTemplateUploadLoading,
    mutate: emailEditTemplateMutate,
  } = useMutation(UpdateUploadTemplate, {
    onSuccess: updateEditIdSuccess,
    onError: updateEditError,
  });

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        {openUpdateTemplateModel && (
          <UpdateEmailTemplate
            setOpenUpdateTemplateModel={setOpenUpdateTemplateModel}
            emailEditTemplateMutate={emailEditTemplateMutate}
            emailEditTemplateUploadLoading={emailEditTemplateUploadLoading}
            openUpdateTemplateModel={openUpdateTemplateModel}
            emailTemplateName={emailTemplateName}
          />
        )}
        <div
          className="dashboard"
          style={{
            zIndex: `${
              openUpdateTemplateModel || openUploadTemplateModel ? "-1" : "0"
            }`,
          }}
        >
          <Header
            setOpenUpdateTemplateModel={setOpenUpdateTemplateModel}
            emailTemplateId={emailTemplateId}
            sample_id={sample_id}
            setEmailData = {setEmailData}
          />
          <div className="dashboard-content">
            {emailData ? (
              <EmailEditor
                ref={emailEditorRef}
                defaultBlockList={emailData}
                appearance={{
                  theme: "dark",
                  customCSS: `
                .email-editor { border: 1px solid #CD2A2A !important; }
                .email-editor-toolbar { background-color: #4BBA0C !important; }
              `,
                }}
                onLoad={() => {
                  console.log("EmailEditor loaded");
                }}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default EditPlayground;
