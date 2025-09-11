import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import tw from "tailwind-styled-components";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useMutation, useQuery } from "react-query";
import Config from "../../Config";
import {
  Page,
  Container,
  Content,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
} from "../../components/Styles/PageStyles";
import {
  InputGroup,
  FieldWrappers,
  FieldWrapper,
  Label,
  SubmitBtn,
  CancelBtn,
} from "../../components/Styles/InputStyles";
import TopNavbar from "components/TopNavbar";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const TemplateSchemaStep1 = Yup.object().shape({
  templateName: Yup.string()
    .required("Template name is required")
    .matches(/^\S*$/, "Template name cannot contain spaces"),
});

const TemplateSchemaStep2 = Yup.object().shape({
  body: Yup.string().required("Body is required"),
});

const SMSTemplateForm = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [bodyCharCount, setBodyCharCount] = useState(0);
  const [templateCharCount, setTemplateCharCount] = useState(0);
  const [mediaUrlCharCount, setMediaUrlCharCount] = useState(0);
  const [initialValues, setInitialValues] = useState({
    templateName: "",
    body: "",
  });

  //------- Create Template -------
  const CreateTemplateFunction = async (values) => {
    await axios.post(`${Config.apiUrl}/template/sms/create`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };

  const createTemplateSuccess = (data) => {
    navigate("/sms-template");
    toast.success(
      data?.data?.msg || "Sms template has been created successfully"
    );
  };

  const createTemplateError = (data) => {
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const {
    data,
    isLoading: createTemplateLoading,
    mutate: createTemplateMutate,
  } = useMutation(CreateTemplateFunction, {
    onSuccess: createTemplateSuccess,
    onError: createTemplateError,
  });

  const handleSubmit = (values) => {
    const body = {
      name: values.templateName.toUpperCase(),
      message: values.body,
    };

    createTemplateMutate(body);
  };
  return (
    <Container>
      <Page>
        <TopNavbar />
        <Contents>
          <ContentHeader>
            <HeaderTitle>Create a SMS template</HeaderTitle>
            <HeaderSubTitle className="mt-6">
              Design a SMS message template that can be used for your SMS
              campaigns.
            </HeaderSubTitle>
          </ContentHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={
              step === 1 ? TemplateSchemaStep1 : TemplateSchemaStep2
            }
            onSubmit={(values) => {
              if (step === 1) {
                setInitialValues(values);
                setStep(2);
              } else {
                handleSubmit(values);
              }
            }}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                {step === 1 && (
                  <Wrapper>
                    <InputGroup>
                      <Label htmlFor="templateName">Template Name *</Label>
                      <FieldWrappers>
                        <Field
                          type="text"
                          name="templateName"
                          id="templateName"
                          autoComplete="off"
                          className="truncate uppercase"
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
                )}

                {step === 2 && (
                  <Wrapper>
                    <InputGroup>
                      <Label htmlFor="body">Body *</Label>
                      <FieldWrappers as="textarea" className="h-32">
                        <Field
                          as="textarea"
                          name="body"
                          id="body"
                          className="w-10/12 h-full py-1"
                          autoComplete="off"
                          row="10"
                          required
                          maxLength="1600"
                          onChange={(e) => {
                            setFieldValue("body", e.target.value);
                            setBodyCharCount(e.target.value.length);
                          }}
                          value={values.body}
                        />
                        <CharCount>
                          {" "}
                          {Math.ceil(bodyCharCount / 160)} SMS
                        </CharCount>
                      </FieldWrappers>
                      {errors.body && touched.body ? (
                        <Error>{errors.body}</Error>
                      ) : null}
                    </InputGroup>
                  </Wrapper>
                )}

                <div className="flex justify-end mt-8">
                  {step === 2 && (
                    <CancelBtn
                      className="mr-4"
                      type="button"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </CancelBtn>
                  )}
                  {step === 1 && (
                    <CancelBtn
                      className="mr-4"
                      type="button"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </CancelBtn>
                  )}
                  <BtnWrapper>
                    <SubmitBtn type="submit" disabled={createTemplateLoading}>
                      {createTemplateLoading
                        ? "Saving..."
                        : step === 1
                        ? "Next"
                        : "Save"}
                    </SubmitBtn>
                  </BtnWrapper>
                </div>
              </Form>
            )}
          </Formik>
        </Contents>
      </Page>
    </Container>
  );
};

const Contents = tw.section`py-10 px-8 max-w-2xl mx-auto`;
const Wrapper = tw.div`grid gap-6 my-6 `;
const Error = tw.div`text-red-500 text-xs italic mb-4`;
const BtnWrapper = tw.div`flex justify-center items-center `;
const SupportedChannels = tw.div`flex  my-5`;
const Channel = tw.div`
  flex text-sm rounded-md px-2 font-medium mx-2
  ${(p) =>
    p.valid
      ? "bg-green-100 text-green-600 items-center"
      : "bg-red-100 text-red-600 items-center"}
`;
const CharCount = tw.div`absolute bottom-2 right-2 text-xs text-gray-400`;
const MediaCharCount = tw.div`absolute top-2.5 right-2 text-xs text-gray-400`;
export default SMSTemplateForm;
