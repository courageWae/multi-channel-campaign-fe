import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Config from "Config";
import Loading from "components/Loading";

const PreviewSelectedEmail = ({ templateId, htmlTemplate }) => {
  const [emailTemplate, setEmailTemplate] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.UserReducer.user);

  useEffect(() => {
    if (templateId) {
      const fetchTemplate = async () => {
        setLoading(true);

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
          setEmailTemplate(response.data?.data);
        } catch (err) {
        } finally {
          console.log("finally");
          setLoading(false);
        }
      };
      fetchTemplate();
    }
  }, [templateId, user.token]);

  useEffect(()=>{
    if(htmlTemplate){
      setLoading(true);
      setEmailTemplate(htmlTemplate);
      setLoading(false);
    }
  },[htmlTemplate])
  
  return (
    <div>
      {loading && <Loading />}
      {emailTemplate && (
        <div dangerouslySetInnerHTML={{ __html: emailTemplate }}></div>
      )}
    </div>
  );
};

export default PreviewSelectedEmail;
