import React, { useState, useRef } from "react";
import tw from "tailwind-styled-components";
import Images from "Images";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../Config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Save_User } from "../Redux/actions";
import { useMutation } from "react-query";
import moment from "moment";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showGoogleMobilePrompt, setShowGoogleMobilePrompt] = useState(false);
  const [emailFormValues, setEmailFormValues] = useState(null);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // register
  const RegisterPostFunction = async ({ values, setSubmitting }) => {
    const body = new FormData();
    body.append("email", values.email);
    body.append("password", values.password);
    body.append("name", values.name);
    body.append("phone", values.mobile);
    try {
      const response = await axios.post(`${Config.apiUrl}/register`, body, {
        headers: {
          authorization: Config.AxiosConfig.headers.authorization,
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      });
      setSubmitting(false);
      setShowOTPForm(true);
      return response;
    } catch (error) {
      setSubmitting(false);
      setShowOTPForm(false);
      throw error;
    }
  };

  const onSuccess = (res) => {
    toast.success(res?.data?.msg || "Error");
  };

  const onError = (res) => {
    toast.error(res?.response?.data?.msg || "An Error Occurred");
  };

  const { mutate: postRegister } = useMutation(RegisterPostFunction, {
    onSuccess,
    onError,
  });

  const handleEmailSubmit = (values, { setSubmitting }) => {
    console.log(values);

    setEmailFormValues(values);

    postRegister({ values, setSubmitting });
  };

  const VerifyPostFunction = async ({ values, setSubmitting }) => {
    const otp = values.otp.join("");
    const body = new FormData();
    body.append("email", emailFormValues.email);
    body.append("otp", otp);
    body.append("phone", emailFormValues.mobile);
    try {
      const response = await axios.post(`${Config.apiUrl}/verifyOtp`, body, {
        headers: {
          authorization: Config.AxiosConfig.headers.authorization,
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      });
      setSubmitting(false);
      return response;
    } catch (error) {
      setSubmitting(false);
      throw error;
    }
  };

  const onVerifySuccess = (res) => {
    console.log(res?.data?.status);
    if (res?.data?.status === "OK") {
      const expireAt = moment()
        .add(Config.sessionExpiredTime, "minutes")
        .valueOf();
      const realData = { ...res.data, expireAt };
      dispatch(Save_User(realData));
      navigate("/form");
    } else {
      toast.error(res?.data?.msg || "Error");
    }
  };

  const onVerifyError = (res) => {
    toast.error(res?.response?.data?.msg || "An Error Occurred");
  };

  const { mutate: postVerify } = useMutation(VerifyPostFunction, {
    onSuccess: onVerifySuccess,
    onError: onVerifyError,
  });

  const handleOTPSubmit = (values, { setSubmitting }) => {
    postVerify({ values, setSubmitting });
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (value.length === 1 && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleGoogleSignup = (values, { setSubmitting }) => {
    console.log("Google Signup Mobile:", values.mobile);
    // Simulate redirect to dashboard or further steps
    setTimeout(() => {
      alert("Google Signup Successful!");
      setSubmitting(false);
    }, 2000);
  };

  const date = new Date();
  const year = date.getFullYear();

  return (
    <StyledRegistrationPage>
      <StyledContainer>
        <StyledLeftSection>
          <div className="flex-grow md:mx-10">
            <h2 className="mb-4 text-xl font-bold">
              Register{" "}
              <span role="img" aria-label="peace">
                ✌️
              </span>
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Join us and start your amazing journey!
            </p>

            {!showEmailForm && !showGoogleMobilePrompt && (
              <>
                <StyledButtonEmail
                  className="flex justify-center items-center px-4 py-2 mb-5 text-sm font-normal text-gray-700 bg-white rounded border border-gray-200"
                  onClick={() => {
                    setShowEmailForm(true);
                    setShowGoogleMobilePrompt(false);
                  }}
                >
                  <MdEmail className="mr-2" /> Sign up with Email
                </StyledButtonEmail>

                {/* <span className="flex justify-center items-center my-5">
                  <hr className="mr-2 w-1/6 border-gray-200 border-t-0.5" />
                  <p className="text-sm text-gray-300">
                    or Sign up with Google
                  </p>{" "}
                  <hr className="ml-2 w-1/6 border-gray-200 border-t-0.5" />
                </span>
                <StyledButtonGoogle
                  className="flex justify-center items-center px-4 py-2 mb-5 text-sm font-normal text-gray-700 bg-white rounded border border-gray-200"
                  onClick={() => {
                    setShowEmailForm(false);
                    setShowGoogleMobilePrompt(true);
                  }}
                >
                  <FcGoogle className="mr-2" /> Sign up with Google
                </StyledButtonGoogle> */}
              </>
            )}

            {showEmailForm && !showOTPForm && (
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  mobile: "",
                  password: "",
                  confirmPassword: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.name) {
                    errors.name = "Required";
                  }
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  if (!values.mobile) {
                    errors.mobile = "Required";
                  } else if (!/^[0-9]{7,15}$/.test(values.mobile)) {
                    errors.mobile =
                      "Phone Number must be between 7 and 15 digits";
                  }
                  if (!values.password) {
                    errors.password = "Required";
                  } else if (values.password.length <= 4) {
                    errors.password = "Password must be more than 4 characters";
                  }
                  if (!values.confirmPassword) {
                    errors.confirmPassword = "Required";
                  } else if (values.password !== values.confirmPassword) {
                    errors.confirmPassword = "Passwords must match";
                  }
                  // if (!values.mobile) {
                  //   errors.mobile = "Required";
                  // }
                  return errors;
                }}
                onSubmit={handleEmailSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="mt-5">
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Full Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        className="px-3 py-2 w-full text-sm leading-tight text-gray-700 rounded border shadow appearance-none focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="px-3 py-2 w-full text-sm leading-tight text-gray-700 rounded border shadow appearance-none focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Mobile
                      </label>
                      <Field
                        type="text"
                        name="mobile"
                        placeholder="Enter your mobile number"
                        className="px-3 py-2 w-full text-sm leading-tight text-gray-700 rounded border shadow appearance-none focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="px-3 py-2 mb-3 w-full text-sm leading-tight text-gray-700 rounded border shadow appearance-none focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        className="px-3 py-2 mb-3 w-full text-sm leading-tight text-gray-700 rounded border shadow appearance-none focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                    <StyledButtonEmailSubmit
                      type="submit"
                      className="px-4 py-2 text-sm font-bold text-white bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </StyledButtonEmailSubmit>
                  </Form>
                )}
              </Formik>
            )}

            {showOTPForm && (
              <Formik
                initialValues={{ otp: ["", "", "", ""] }}
                onSubmit={handleOTPSubmit}
              >
                {({ values, handleChange, isSubmitting }) => (
                  <Form className="mt-5">
                    <div className="flex justify-center mb-4 space-x-2">
                      {values.otp.map((_, index) => (
                        <Field
                          key={index}
                          type="text"
                          name={`otp[${index}]`}
                          maxLength="1"
                          required
                          className="w-12 h-12 text-sm leading-tight text-center text-black text-gray-700 rounded border shadow appearance-none focus:outline-none focus:shadow-outline"
                          innerRef={otpRefs[index]}
                          onChange={(e) => {
                            handleChange(e);
                            handleOtpChange(e, index);
                          }}
                        />
                      ))}
                    </div>
                    <StyledButtonEmailSubmit
                      type="submit"
                      className="px-4 py-2 text-sm font-bold text-white bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Loading..." : "Verify OTP"}
                    </StyledButtonEmailSubmit>
                  </Form>
                )}
              </Formik>
            )}

            {showGoogleMobilePrompt && (
              <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
                <div className="p-8 mx-4 w-full bg-white rounded-lg shadow-lg md:w-1/4">
                  <div className="flex justify-end">
                    <button
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => setShowGoogleMobilePrompt(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <h2 className="mb-4 text-xl font-bold">Google Signup</h2>
                  <Formik
                    initialValues={{ mobile: "" }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.mobile) {
                        errors.mobile = "Required";
                      }
                      return errors;
                    }}
                    onSubmit={handleGoogleSignup}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="mb-4">
                          <label className="block mb-2 text-sm font-bold text-gray-700">
                            Mobile Number
                          </label>
                          <Field
                            type="text"
                            name="mobile"
                            placeholder="Enter your mobile number"
                            className="px-3 py-2 w-full text-sm leading-tight text-gray-700 rounded border shadow appearance-none focus:outline-none focus:shadow-outline"
                          />
                          <ErrorMessage
                            name="mobile"
                            component="div"
                            className="mt-1 text-xs text-red-500"
                          />
                        </div>
                        <StyledButtonEmailSubmit
                          type="submit"
                          className="px-4 py-2 text-sm font-bold text-white bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </StyledButtonEmailSubmit>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            )}
          </div>
          {/* <p className="flex-shrink-0 mt-5 text-xs text-center text-gray-500">
            © {year} Adsevo, All rights reserved. Powered by
            GWOSevo.
          </p> */}
        </StyledLeftSection>
        <StyledRightSection>
          <h3 className="text-[27px] font-bold">
            Already have an account?{" "}
            <span role="img" aria-label="peace">
              ✌️
            </span>
          </h3>

          <Link to="/login" className="underline">
            <p className="!text-[22px] font-bold"> Login Now</p>
          </Link>

          <StyledImage src={Images.Person} alt="Person" />
        </StyledRightSection>
      </StyledContainer>
    </StyledRegistrationPage>
  );
};

const StyledRegistrationPage = tw.div`
   flex items-center justify-center bg-orange-50 lg:min-h-screen py-5 lg:py-10
`;

const StyledContainer = tw.div`
  bg-white rounded-lg shadow-lg overflow-hidden flex w-4/5 max-w-4xl 
`;

const StyledLeftSection = tw.div`
  md:w-1/2 px-10 py-8 flex flex-col justify-between
`;

const StyledButtonEmail = tw.button`
  w-full font-bold py-2 px-4 rounded mb-3
`;

const StyledButtonGoogle = tw.button`
  w-full flex items-center font-bold py-2 px-4 rounded mb-3
`;

const StyledRightSection = tw.div`
  md:w-1/2 bg-gradient-to-r from-orange-300 to-orange-500 text-white flex flex-col items-center justify-center px-10 pt-8 pb-0 relative hidden md:block
`;

const StyledImage = tw.img`
  w-full h-4/5 object-contain 
`;
const StyledButtonEmailSubmit = tw.button`
  w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
`;

export default RegistrationPage;
