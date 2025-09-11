import axios from "axios";
import Config from "Config";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Model from "../Model";
import Loading from "components/Loading";
import tw from "tailwind-styled-components";

const PreviewEmailSample = ({ show, setShowModal, templateId }) => {
  const user = useSelector((state) => state.UserReducer.user);

  const [loading, setLoading] = useState(true);
  const [emailData, setEmailData] = useState("");
  const [templateName, setTemplateName] = useState("");

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (templateId) {
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
          setEmailData(response.data.data);
          setTemplateName(response.data.name);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTemplate();
  }, [templateId, user.token]);

  return (
    <Model header={<h1>{templateName}</h1>} width={"w-full max-w-3xl"} setOpenModel={setShowModal} size="lg">
      {loading ? (
        <Loading />
      ) : (
        <div style={{border: '1px solid gray'}} dangerouslySetInnerHTML={{ __html: emailData }} />
      )}

      <div className="w-full flex items-center justify-end space-x-10 mt-8">
        <Delete onClick={handleClose}>{"Close"} </Delete>
      </div>
    </Model>
  );
};
const Delete = tw.button`px-10 py-2.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 font-semibold`;

export default PreviewEmailSample;
