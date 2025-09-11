import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import tw from "tailwind-styled-components";
import { useNavigate, useParams } from "react-router-dom";
import {
  Page,
  Container,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
} from "components/Styles/PageStyles";
import {
  InputGroup,
  FieldWrappers,
  Label,
  SubmitBtn,
  CancelBtn,
} from "components/Styles/InputStyles";
import TopNavbar from "components/TopNavbar";
import Loading from "components/Loading";
import { useSelector } from "react-redux";
import Config from "Config";

const TemplateSchemaStep1 = Yup.object().shape({
  templateName: Yup.string()
    .required("Template name is required")
});

const EditTemplateName = () => {
  const navigate = useNavigate();
  const [templateCharCount, setTemplateCharCount] = useState(0);
  const user = useSelector((state) => state.UserReducer.user);
  const [templateLoading, setTemplateLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    templateName: '',
  });

  const  { templateId } = useParams();

  useEffect(()=>{
    if(templateId){
      setTemplateLoading(true);
      const fetchTemplate = async()=>{
        const response = await axios.get(`${Config.apiUrl}/template/email/view/${templateId}`, {
          headers: {
            "Content-Type": "application/json",
            Token: `${user.token}`,
          },
        })
        if(response){
          setInitialValues({templateName: response.data.name});
          setTemplateLoading(false);
        }
      }
      fetchTemplate();
    }
  },[templateId, user.token]);

  useEffect(()=>{
    if(localStorage.getItem('templateName')){
      setInitialValues({templateName: localStorage.getItem('templateName')})
    }
  }, [])

  const cancelTemplateEdit = () => {
    localStorage.removeItem('templateName');
    navigate("/email-template");
  };

  const handleSubmit = (values) => {
    setTemplateLoading(true);
    localStorage.setItem('templateName', values.templateName);
    navigate(`/edit/email-template/build/${templateId}`);
  };

  return (
    <Container>
      <Page>
        <TopNavbar />
        <Contents>
          <ContentHeader>
            <HeaderTitle>{"Edit Email Template"}</HeaderTitle>
            <HeaderSubTitle className="mt-6">
              Update your email template. A template needs to be submitted for approval before you can deploy emails using the template.
            </HeaderSubTitle>
          </ContentHeader>
          {templateLoading ? (
            <Loading />
          ) : (
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={TemplateSchemaStep1}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form>
                  <Wrapper>
                    <InputGroup>
                      <Label htmlFor="templateName">Template Name *</Label>
                      <FieldWrappers>
                        <Field
                          type="text"
                          name="templateName"
                          id="templateName"
                          autoComplete="off"
                          className="truncate"
                          required
                          maxLength="60"
                          onChange={(e) => {
                            setFieldValue("templateName", e.target.value);
                            setTemplateCharCount(e.target.value.length);
                          }}
                          value={values.templateName}
                        />
                        <MediaCharCount>{templateCharCount}/60</MediaCharCount>
                      </FieldWrappers>
                      {errors.templateName && touched.templateName ? (
                        <Error>{errors.templateName}</Error>
                      ) : null}
                    </InputGroup>
                  </Wrapper>
                  <div className="flex justify-end mt-8">
                    <CancelBtn
                      className="mr-4"
                      type="button"
                      onClick={cancelTemplateEdit}
                    >
                      Cancel
                    </CancelBtn>
                    <BtnWrapper>
                      <SubmitBtn type="submit" disabled={templateLoading}>
                        {templateLoading ? "Saving..." : "Next"}
                      </SubmitBtn>
                    </BtnWrapper>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Contents>
      </Page>
    </Container>
  );
};

const Contents = tw.section`py-10 px-8 max-w-2xl mx-auto`;
const Wrapper = tw.div`grid gap-6 my-6 `;
const Error = tw.div`text-red-500 text-xs italic mb-4`;
const BtnWrapper = tw.div`flex justify-center items-center `;
const MediaCharCount = tw.div`absolute top-2.5 right-2 text-xs text-gray-400`;

export default EditTemplateName;
