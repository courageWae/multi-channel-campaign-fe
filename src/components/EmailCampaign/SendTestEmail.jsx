import React from "react";
import tw from "tailwind-styled-components";
import { MdClose } from "react-icons/md";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  InputGroup,
  FieldWrappers,
  Label,
  SubmitBtn,
} from "../Styles/InputStyles";
import { BiLogoTelegram } from "react-icons/bi";
import Config from "Config";
const SendTestEmail = ({
  setOpenTestModel,
  SendTestMutate,
  senderId,
  templateId,
  type,
}) => {
  const handleClose = () => {
    setOpenTestModel(false);
  };

  const initialValues = {
    email: "",
    message:"",
    senderId: senderId,
    subject: "",
    type: type,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email Entered"),
    message: Yup.string()
      .required("Message is required"),
    subject: Yup.string()
      .required("Subject is required"),
  });

  const handleSubmit = (values) => {
    const sendTestData = {
      senderId: values.senderId,
      type: values.type,
      email: values.email,
      subject: values.subject,
      message: values.message,
    };

    SendTestMutate(sendTestData);
    console.log(values);
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <Header>
          <Title>Send a Test Email</Title>
          <CloseButton onClick={handleClose}>
            <MdClose size={24} />
          </CloseButton>
        </Header>
        <Content>
          {templateId && (
            <SendTestSection>
              <Heading>
                Send test{" "}
                {type === Config.CampaignType.Email && <span>Email</span>}
              </Heading>
              <SubHeading>
                Ensure your recipient is registered in your contact list with a
                valid  email account in the{" "}
                {type === Config.CampaignType.Email && (
                  <span className="font-medium">Email</span>
                )}{" "}
                field.
              </SubHeading>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <InputGroup className=" my-3 w-full">
                      <Label
                        htmlFor="subject"
                        className="text-base text-pretty font-normal"
                      >
                        Subject *
                      </Label>
                      <FieldWrappers style={{ border: "1px solid lightgray" }}>
                        <Field
                          type="subject"
                          name="subject"
                          id="subject"
                          autoComplete="off"
                          className="truncate"
                          onChange={(e) => setFieldValue("subject", e.target.value)}
                          required
                        />
                      </FieldWrappers>
                      <ErrorMessage
                        name="subject"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </InputGroup>
                    <InputGroup className=" my-3">
                      <Label
                        htmlFor="email"
                        className="text-base text-pretty font-normal"
                      >
                        Email *
                      </Label>
                      <FieldWrappers style={{ border: "1px solid lightgray" }}>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="off"
                          className="truncate"
                          onChange={(e) => setFieldValue("email", e.target.value)}
                          required
                        />
                      </FieldWrappers>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </InputGroup>
                    <InputGroup className="my-3">
                      <Label
                        htmlFor="message"
                        className="text-base text-pretty font-normal"
                      >
                        Message *
                      </Label>
                      <div style={{ border: "1px solid lightgray" }}>
                        <Field
                          as="textarea"
                          rows="3"
                          name="message"
                          id="message"
                          autoComplete="off"
                          className="truncate w-full p-2"
                          onChange={(e) => setFieldValue("message", e.target.value)}
                          required
                        />
                      </div>
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </InputGroup>
                    <div className="flex justify-end pt-8">
                      <BtnWrapper>
                        <SubmitBtn
                          type="submit"
                          disabled={isSubmitting}
                          className="flex justify-center"
                        >
                          <BiLogoTelegram className="mr-2" /> Send Test
                        </SubmitBtn>
                      </BtnWrapper>
                    </div>
                  </Form>
                )}
              </Formik>
            </SendTestSection>
          )}
        </Content>
      </ModalContainer>
    </ModalBackground>
  );
};

const BtnWrapper = tw.div`flex justify-center items-center`;
const ModalBackground = tw.div`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`;
const ModalContainer = tw.div`bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6`;
const Header = tw.div`flex justify-between items-center mb-8 px-4`;
const Title = tw.h2`text-xl text-pretty`;
const CloseButton = tw.button`text-gray-500 hover:text-gray-700`;
const Content = tw.div`my-4 flex space-x-6 px-4`;
const SendTestSection = tw.div`w-full pt-4 px-4 border rounded-md`;
const Heading = tw.h1`text-xl text-pretty mb-2`;
const SubHeading = tw.p`text-gray-600 text-sm font-normal`;
export default SendTestEmail;
