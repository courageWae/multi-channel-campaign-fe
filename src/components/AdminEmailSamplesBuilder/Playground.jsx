import React, { useRef, useState, useEffect } from "react";
import EmailEditor from "@editex/react-email-editor";
import Header from "./Header";
import axios from "axios";
import Config from "Config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/Loading";
import CreateEmailTemplateSample from "components/AdminEmailSamplesBuilder/CreateEmailTemplateSample";
import EditEmailTemplateSample from "components/AdminEmailSamplesBuilder/EditEmailSample";

function Playground() {
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

  useEffect(() => {
    if (templateId) {
      setLoading(true);
      const fetchTemplate = async () => {
        if (templateId) {
          setEmailTemplateId(templateId);
          try {
            const response = await axios.get(
              `${Config.apiUrl}/template/email/sample/view/${templateId}`,
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
    const template_name = localStorage.getItem("sampleName");
    setEmailTemplateName(template_name);
  }, []);

  const createUploadTemplate = async (values) => {
    const html = emailEditorRef.current.exportHtml();
    const design = emailEditorRef.current.blockList;
    setEmailData(design);

    const body = new FormData();
    body.append("templateName", emailTemplateName);
    body.append("template", html);
    body.append("extraData", JSON.stringify(design));

    return await axios.post(`${Config.apiUrl}/template/email/sample/create`, body, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });
  };

  const senderIdSuccess = (data) => {
    setOpenUploadTemplateModel(false);
    if(localStorage.getItem("sampleName")){
      localStorage.removeItem("sampleName");
    }
    toast.success(data?.data?.msg || "Success");
    navigate("/email/template/samples");
  };

  const senderIdError = (data) => {
    setOpenUploadTemplateModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occurred");
  };

  const { isLoading: emailTemplateUploadLoading, mutate: emailTemplateMutate } =
    useMutation(createUploadTemplate, {
      onSuccess: senderIdSuccess,
      onError: senderIdError,
    });
  const UpdateUploadTemplate = async (values) => {
    const html = emailEditorRef.current.exportHtml();
    const design = emailEditorRef.current.blockList;
    setEmailData(design);

    const body = new FormData();
    body.append("templateName", emailTemplateName);
    body.append("template", html);
    body.append("templateId", emailTemplateId);
    body.append("extraData", JSON.stringify(design));

    return await axios.post(`${Config.apiUrl}/template/email/sample/edit`, body, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });
  };

  const updateEditIdSuccess = (data) => {
    setOpenUpdateTemplateModel(false);
    if(localStorage.getItem("sampleName")){
      localStorage.removeItem("sampleName");
    }
    toast.success(data?.data?.msg || "Success");
    navigate("/email/template/samples");
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
    return <Loading />; // Show a loading message or spinner
  } else {
    return (
      <>
        {openUploadTemplateModel && (
          <CreateEmailTemplateSample
            setOpenUploadTemplateModel={setOpenUploadTemplateModel}
            emailTemplateMutate={emailTemplateMutate}
            emailTemplateUploadLoading={emailTemplateUploadLoading}
            openUploadTemplateModel={openUploadTemplateModel}
          />
        )}
        {openUpdateTemplateModel && (
          <EditEmailTemplateSample
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
            setOpenUploadTemplateModel={setOpenUploadTemplateModel}
            setOpenUpdateTemplateModel={setOpenUpdateTemplateModel}
            emailTemplateId={emailTemplateId}
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

export default Playground;
