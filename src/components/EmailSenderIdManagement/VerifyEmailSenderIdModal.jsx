import React, { useState, useEffect } from "react";
import Model from "../Model";
import { SubmitBtn } from "../Styles/InputStyles";
import tw from "tailwind-styled-components";
import Loading from "../Loading";
import {
  InputGroup,
  FieldWrappers,
  Label,
  CancelBtn,
} from "../Styles/InputStyles";
import { Formik, Field, Form } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Config from "../../Config";
import axios from "axios";

const VerifyEmailSenderIdModal = ({
  setInitialVerificationModalOpen,
  verifyInitialMutate,
  verifyInitialLoading,
  initialVerifyData,
}) => {
  const [bodyCharCount, setBodyCharCount] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
        setResendSuccess(false);
        setResendError(false);
    }, 5000);

    return () => {
        clearTimeout(timeout);
    };
}, [resendSuccess, resendError]);

  const user = useSelector((state) => state.UserReducer.user);
  const {email_id } = initialVerifyData;

  const initialValues = {
    otp: "",
    emailId: initialVerifyData.email_id,
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d+$/, "The OTP only accepts numbers.")
      .min(4, "The OTP must be at least 4 characters long.")
      .max(4, "The OTP must be at most 4 characters long.")
      .required("OTP is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    verifyInitialMutate({
      otp: values.otp,
      emailId: values.emailId ?? email_id,
    });
    resetForm();
  };

  console.log("id_from_modal",initialVerifyData.id);

  const handleOTPResend = async () => {
    try {
      setResendLoading(true);
      const response = await axios.post(
        `${Config.apiUrl}/senderid/email/resend`,
        { emailSenderId: initialVerifyData.id },
        {
          headers: {
            "Content-Type": "application/json",
            Token: `${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        setResendSuccess(true);
      } else {
        setResendError(true);
      }
    } catch (error) {
      setResendError(true);
    } finally {
      setResendLoading(false);
    }
  };

  const handleClose = (resetForm) => {
    resetForm();
    setInitialVerificationModalOpen(false);
  };

  return (
    <Model
      width={"w-11/12 max-w-md"}
      setOpenModel={setInitialVerificationModalOpen}
    >
      <Title>Verify Email</Title>
      <SubTitle>
        An OTP has been sent to the email address you provided. Please copy the
        OTP to complete the verification process.
      </SubTitle>

      {verifyInitialLoading && <Loading />}

      <div className="px-8 h-full flex flex-col justify-between pb-4">
        {!verifyInitialLoading && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, resetForm, setFieldValue, values }) => (
              <Form className="flex flex-col h-full justify-between">
                <Wrapper>
                  {/* RESEND SUCCESS MESSAGE */}
                  {resendSuccess && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                      <p className="text-lg font-semibold">OTP Sent</p>
                      <p>Your OTP code has been successfully sent.</p>
                    </div>
                  )}
                  {resendError && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                      <p className="text-lg font-semibold">Failure</p>
                      <p>Your OTP code could not be sent.</p>
                    </div>
                  )}
                  <InputGroup>
                    <Label htmlFor="emailId"> Email Id *</Label>
                    <FieldWrappers>
                      <Field
                        name="emailId"
                        id="emailId"
                        className="w-full h-full pt-1"
                        autoComplete="off"
                        readOnly
                        required
                        value={email_id}
                      />
                    </FieldWrappers>
                    {errors.emailId && touched.emailId ? (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.emailId}
                      </div>
                    ) : null}
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="otp">Enter OTP *</Label>
                    <FieldWrappers>
                      <Field
                        type="text"
                        name="otp"
                        id="otp"
                        autoComplete="off"
                        required
                        maxLength="4"
                        minLength="4"
                        onChange={(e) => {
                          setFieldValue("otp", e.target.value);
                          setBodyCharCount(e.target.value.length);
                        }}
                        value={values.otp}
                      />
                      <MediaCharCount>{bodyCharCount}/4</MediaCharCount>
                    </FieldWrappers>
                    {errors.otp && touched.otp ? (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.otp}
                      </div>
                    ) : null}
                  </InputGroup>
                  <ResendText>
                    Did not get OTP?
                    {resendLoading ? (
                      <ResendLoader role="status">
                        <svg
                          aria-hidden="true"
                          class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-300"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </ResendLoader>
                    ) : (
                      <ResendLink onClick={handleOTPResend}>
                        {resendLoading ? "" : "Resend"}
                      </ResendLink>
                    )}
                  </ResendText>
                </Wrapper>

                <div className="flex justify-between p-4">
                  <CancelBtn
                    type="button"
                    onClick={() => handleClose(resetForm)}
                  >
                    Cancel
                  </CancelBtn>
                  <BtnWrapper>
                    <SubmitBtn type="submit">Verify</SubmitBtn>
                  </BtnWrapper>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </Model>
  );
};

const Title = tw.h2` text-lg md:text-xl lg:text-2xl text-gray-600 mb-2 font-bold text-center`;
const SubTitle = tw.p` text-sm md:text-md  text-gray-400  text-center mb-6`;
const MediaCharCount = tw.div`absolute top-2.5 right-2 text-xs text-gray-400`;
const Wrapper = tw.div`grid gap-6 my-6`;
const ResendText = tw.div`flex justify-end text-sm text-right align-middle`;
const ResendLoader = tw.div`ml-3 flex justify-end text-sm text-right align-middle`;
const ResendLink = tw.p`ml-1 flex justify-end text-sm text-orange-500 font-bold text-right cursor-pointer underline align-middle`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default VerifyEmailSenderIdModal;
