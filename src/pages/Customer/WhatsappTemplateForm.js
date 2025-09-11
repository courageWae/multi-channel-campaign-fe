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
  templateType: Yup.string().required("Template type is required"),
  contentType: Yup.string().required("Content type is required"),
});

const TemplateSchemaStep2 = Yup.object().shape({
  body: Yup.string().required("Body is required"),
});

const TemplateForm = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [bodyCharCount, setBodyCharCount] = useState(0);
  const [templateCharCount, setTemplateCharCount] = useState(0);
  const [mediaUrlCharCount, setMediaUrlCharCount] = useState(0);
  const [initialValues, setInitialValues] = useState({
    templateName: "",
    templateType: "1",
    contentType: "1",
    body: "",
    mediaUrl: "",
  });

  //------- Create Template -------
  const CreateTemplateFunction = async (values) => {
    await axios.post(`${Config.apiUrl}/template/whatsapp/create`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };

  const createTemplateSuccess = (data) => {
    navigate("/whatsapp-template");
    toast.success(
      data?.data?.msg || "Whatsapp template has been created successfully"
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
      contentType: values.contentType,
      templateType: values.templateType,
      message: values.body,
    };

    if (values.contentType == 2) {
      if (!values.mediaUrl) {
        toast.error("Media URL is required");
        return;
      }

      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
      if (!urlPattern.test(values.mediaUrl)) {
        toast.error("Invalid URL format for Media URL");
        return;
      }

      body.mediaUrl = values.mediaUrl;
    }

    createTemplateMutate(body);
  };
  return (
    <Container>
      <Page>
        <TopNavbar />
        <Contents>
          <ContentHeader>
            <HeaderTitle>Create a WhatsApp template</HeaderTitle>
            <HeaderSubTitle className="mt-6">
              Design a Whatsapp message template that can be used for your
              WhatsApp campaigns. A template needs to be submitted for approval
              to Meta before it can be sent to WhatsApp customers.
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

                    <InputGroup>
                      <Label htmlFor="templateType">Template Type *</Label>
                      <FieldWrapper $select={true}>
                        <Field
                          required
                          name="templateType"
                          id="templateType"
                          autoComplete="off"
                        >
                          {(props) => (
                            <Select
                              required
                              {...props.field}
                              className="w-full h-full pl-2 bg-transparent text-sm p-0 border-none"
                              autoComplete="none"
                            >
                              <MenuItem value="0" disabled>
                                Select Template Type
                              </MenuItem>
                              <MenuItem value="1">Utility</MenuItem>
                              <MenuItem value="2">Marketing</MenuItem>
                            </Select>
                          )}
                        </Field>
                      </FieldWrapper>
                      {errors.templateType && touched.templateType ? (
                        <Error>{errors.templateType}</Error>
                      ) : null}
                    </InputGroup>

                    <InputGroup>
                      <Label htmlFor="contentType">Content Type *</Label>
                      <FieldWrapper $select={true}>
                        <Field
                          required
                          name="contentType"
                          id="contentType"
                          autoComplete="off"
                        >
                          {(props) => (
                            <Select
                              required
                              {...props.field}
                              className="w-full h-full pl-2 bg-transparent text-sm p-0 border-none"
                              autoComplete="none"
                            >
                              <MenuItem value="0" disabled>
                                Select Content Type
                              </MenuItem>
                              <MenuItem value="1">Text</MenuItem>
                              <MenuItem value="2">Media</MenuItem>
                            </Select>
                          )}
                        </Field>
                      </FieldWrapper>
                      {errors.contentType && touched.contentType ? (
                        <Error>{errors.contentType}</Error>
                      ) : null}
                    </InputGroup>
                  </Wrapper>
                )}

                {/* {step === 2 && (
                  <SupportedChannels>
                    <p className="font-semibold text-md">Supported Channels:</p>
                    <Channel valid={true}>
                      <FaCheckCircle className="mr-1" />
                      WhatsApp user initiated
                    </Channel>
                   
                    <Channel valid={values.contentType === "1"}>
                      {values.contentType === "2" ? (
                        <FaTimesCircle className="mr-1" />
                      ) : (
                        <FaCheckCircle className="mr-1" />
                      )}
                      SMS
                    </Channel>
                  </SupportedChannels>
                )} */}

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
                        <CharCount>{bodyCharCount}/1600</CharCount>
                      </FieldWrappers>
                      {errors.body && touched.body ? (
                        <Error>{errors.body}</Error>
                      ) : null}
                    </InputGroup>
                    {values.contentType == 2 && (
                      <InputGroup>
                        <Label htmlFor="mediaUrl">Media URL *</Label>
                        <FieldWrappers>
                          <Field
                            type="text"
                            name="mediaUrl"
                            id="mediaUrl"
                            autoComplete="off"
                            placeholder="https://www"
                            className="italic w-10/12 "
                            required
                            maxLength="1600"
                            onChange={(e) => {
                              setFieldValue("mediaUrl", e.target.value);
                              setMediaUrlCharCount(e.target.value.length);
                            }}
                            value={values.mediaUrl}
                          />
                          <MediaCharCount>
                            {mediaUrlCharCount}/1600
                          </MediaCharCount>
                        </FieldWrappers>
                        <p className="text-gray-400 text-sm">
                          Supports images, audio, documents, and video.
                        </p>
                        {errors.mediaUrl && touched.mediaUrl ? (
                          <Error>{errors.mediaUrl}</Error>
                        ) : null}
                      </InputGroup>
                    )}
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
export default TemplateForm;
