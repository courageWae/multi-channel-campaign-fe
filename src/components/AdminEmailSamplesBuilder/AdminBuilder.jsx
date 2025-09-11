import { Container, Page, HeaderTitle, Content, ContentHeader } from 'components/Styles/PageStyles'
import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import TopNavbar from 'components/TopNavbar'
import "../../styles/emailTemplateBuilder.css"
import Playground from './Playground';
const AdminBuilder = () => {
  const [templateName, setTemplateName] = useState("Email Templates Sample Builder")

  useEffect(() => {
    setTemplateName(localStorage.getItem("sampleName"))
  }, [])

  const redirectUserBack = () => {
    window.history.back()
  }

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
            <Playground/>
        </Content>
      </Page>
    </Container>
  )
}
export default AdminBuilder