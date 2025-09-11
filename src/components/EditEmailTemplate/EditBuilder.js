import { Container, Page, HeaderTitle, Content, ContentHeader } from 'components/Styles/PageStyles'
import TopNavbar from 'components/TopNavbar'
import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EditPlayground from './EditPlayground';
import "../../styles/emailTemplateBuilder.css"

function useQueryHook() {
  return new URLSearchParams(useLocation().search);
}
const EditBuilder = () => {
  const [templateName, setTemplateName] = useState("Email Templates Builder")
  const {templateId} = useParams();
  const navigate = useNavigate();

  // Get a query param
  const query = useQueryHook();
  const param = query.get("edit");

  useEffect(() => {
    if(param && (param === "campaign_edit" || param ==="campaign_update")){
      setTemplateName(localStorage.getItem("selectedTemplateName"));
    }
    else{
      setTemplateName(localStorage.getItem("templateName"))
    }
  }, [param])

  const redirectUserBack = () => {
    if(param && param === "campaign_update"){
      const campaignId = localStorage.getItem("campaignId");
      const params = new URLSearchParams();
      params.append("key", "campaign_update");
      navigate(`/email/campaign/edit/${campaignId}?${params.toString()}`);
    }else{
      navigate(`/email-template/edit/${templateId}`)
    }
  }

  console.log("templateName", templateName);
  

  return (
    <Container>
      <Page>
          <TopNavbar/>
        <Content>
        <ContentHeader>
              <div className="flex items-center gap-2">
              <span onClick={redirectUserBack} style={{marginRight: "10px", color: "#D66909",fontSize:"24px", cursor:"pointer"}}>
              <IoMdArrowBack/>
              </span>
                <HeaderTitle>
                  { templateName }</HeaderTitle>
              </div>
            </ContentHeader>
            <EditPlayground/>
        </Content>
      </Page>
    </Container>
  )
}

export default EditBuilder