import { Container, Page, HeaderTitle, Content, ContentHeader} from 'components/Styles/PageStyles'
import TopNavbar from 'components/TopNavbar'
import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import "../../styles/emailTemplateBuilder.css"
import Playground from './playground';
const Builder = () => {
  const [templateName, setTemplateName] = useState("Email Templates Builder")

  useEffect(() => {
    setTemplateName(localStorage.getItem("templateName"))
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

export default Builder