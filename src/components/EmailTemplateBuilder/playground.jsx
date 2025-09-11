import React, { useRef, useState, useEffect } from "react";
import EmailEditor from "@editex/react-email-editor";
import Header from "./Header";
import axios from "axios";
import Config from "Config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import CreateEmailTemplate from "components/EmailTemplate/CreateEmailTemplate";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "components/Loading";

function Playground() {
  const user = useSelector((state) => state.UserReducer.user);
  const [emailData, setEmailData] = useState([]);
  const [openUploadTemplateModel, setOpenUploadTemplateModel] = useState(false);
  const [openUpdateTemplateModel, setOpenUpdateTemplateModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailTemplateName, setEmailTemplateName] = useState("");
  const emailEditorRef = useRef(null);

  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sample_id = query.get("key");

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
    //* Get the template name from the local storage
    const template_name = localStorage.getItem("templateName");
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

    return await axios.post(`${Config.apiUrl}/template/email/create`, body, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });
  };

  const senderIdSuccess = (data) => {
    setOpenUploadTemplateModel(false);
    if(localStorage.getItem("templateName")){
      localStorage.removeItem("templateName");
    }
    toast.success(data?.data?.msg || "Success");
    navigate("/email-template");
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

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        {openUploadTemplateModel && (
          <CreateEmailTemplate
            setOpenUploadTemplateModel={setOpenUploadTemplateModel}
            emailTemplateMutate={emailTemplateMutate}
            emailTemplateUploadLoading={emailTemplateUploadLoading}
            openUploadTemplateModel={openUploadTemplateModel}
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
            sample_id={sample_id}
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
