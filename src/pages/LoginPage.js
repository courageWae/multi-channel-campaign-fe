import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Images from "Images";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../Config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Save_User } from "../Redux/actions";
import { useMutation } from "react-query";
import moment from "moment";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginMode, setLoginMode] = useState(null);
  const [isForgetPassword, setIsForgetPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    registeredEmail: "",
  };

  // login
  const LoginPostFunction = async ({ values, setSubmitting }) => {
    const body = new FormData();
    body.append("loginId", values.email);
    body.append("password", values.password);
    body.append("mode", loginMode);
    try {
      const response = await axios.post(`${Config.apiUrl}/login`, body, {
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

  // forget password
  const ForgetPasswordFunction = async ({ values, setSubmitting }) => {
    const body = new FormData();
    body.append("registeredId", values.registeredEmail);
    try {
      const response = await axios.post(
        `${Config.apiUrl}/forgot-password`,
        body,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      );
      setSubmitting(false);
      return response;
    } catch (error) {
      setSubmitting(false);
      throw error;
    }
  };

  const onSuccess = (res) => {
    console.log(res?.data);
    if (res?.data?.status === "OK") {
      if (isForgetPassword) {
        toast.success(
          res?.data?.msg || "Password reset link sent to your email."
        );
      } else {
        const expireAt = moment()
          .add(Config.sessionExpiredTime, "minutes")
          .valueOf();
        const realData = { ...res.data, expireAt };
        dispatch(Save_User(realData));
        
        // Force navigation to happen after state updates
        setTimeout(() => {
          if (
            res?.data?.redirectPage === "COMPANY_PAGE" &&
            res?.data?.type === Config.UserType.ClientUser
          ) {
            navigate("/form", { replace: true });
          } else if (
            res?.data?.redirectPage === "HOME_PAGE" &&
            res?.data?.type === Config.UserType.ClientUser
          ) {
            navigate("/dashboard", { replace: true });
          } else if (res?.data?.type === Config.UserType.SuperAdminUser) {
            navigate("/dashboard", { replace: true });
          } else if (res?.data?.type === Config.UserType.CommercialAdminUser) {
            navigate("/dashboard", { replace: true });
          } else if (res?.data?.type === Config.UserType.FinanceAdminUser) {
            navigate("/dashboard", { replace: true });
          }

        }, 0);
      }
    } else {
      toast.error(res?.data?.msg || "Error");
    }
  };

  const onError = (res) => {
    toast.error(res?.response?.data?.msg || "An Error Occurred");
  };

  const { mutate: postLogin } = useMutation(LoginPostFunction, {
    onSuccess,
    onError,
  });

  const { mutate: postForgetPassword } = useMutation(ForgetPasswordFunction, {
    onSuccess,
    onError,
  });

  const SubmitHandler = (values, { setSubmitting }) => {
    console.log(values);
    if (isForgetPassword) {
      if (!values.registeredEmail) {
        setSubmitting(false);
        return toast.error("Please enter your registered email address");
      }
      postForgetPassword({ values, setSubmitting });
    } else {
      if (!values.email) {
        setSubmitting(false);
        return toast.error("Please enter email address");
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        setSubmitting(false);
        return toast.error("Please enter a valid email address");
      } else if (!values.password) {
        setSubmitting(false);
        return toast.error("Please enter password");
      }
      setLoginMode(1);
      postLogin({ values, setSubmitting });
    }
  };

  const handleGoogleLogin = () => {
    setLoginMode(2);
    const googleUser = {
      email: "googleuser@example.com",
      password: "googlepassword",
    };
    postLogin({ values: googleUser, setSubmitting: () => {} });
  };

  const handleForgetPasswordClick = () => {
    setIsForgetPassword(true);
  };
  const handleLoginClick = () => {
    setIsForgetPassword(false);
  };

  const date = new Date();
  const year = date.getFullYear();

  return (
    <StyledLoginPage>
      <StyledContainer>
        <StyledLeftSection>
          <div className="md:mx-4">
            <Link to="/" className="z-10">
              <Logo src={Images.LogoSevoc} alt="sevo campaign manager" />
            </Link>
            <h2 className="mt-10 mb-2 text-3xl font-bold">
              {isForgetPassword ? "Forgot Password" : "Login"}
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              {isForgetPassword
                ? "Enter your registered email to reset password."
                : "to your sevo account."}
            </p>

            <Formik initialValues={initialValues} onSubmit={SubmitHandler}>
              {({ isSubmitting }) => (
                <Form className="mt-5">
                  {isForgetPassword ? (
                    <>
                      <div className="mb-2">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Registered Email
                        </label>
                        <Field
                          type="email"
                          name="registeredEmail"
                          placeholder="Enter your registered email"
                          className="px-3 py-2 w-full leading-tight text-gray-700 rounded border appearance-none text-md focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                          name="registeredEmail"
                          component="div"
                          className="mt-1 text-xs text-red-500"
                        />
                      </div>
                      <div className="flex justify-end items-center mb-4">
                        <button
                          type="button"
                          onClick={handleLoginClick}
                          className="inline-block text-xs font-bold text-orange-400 align-baseline hover:text-orange-800"
                        >
                          Back to Login
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          className="px-3 py-2 w-full leading-tight text-gray-700 rounded border appearance-none text-md focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="mt-1 text-xs text-red-500"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block mb-2 font-bold text-gray-700 text-md">
                          Password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          className="px-3 py-2 mb-3 w-full leading-tight text-gray-700 rounded border appearance-none text-md focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="mt-1 text-xs text-red-500"
                        />
                        <div className="flex justify-end items-center">
                          <button
                            type="button"
                            onClick={handleForgetPasswordClick}
                            className="inline-block text-xs font-bold text-orange-400 align-baseline hover:text-orange-800"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  <StyledButton
                    type="submit"
                    className="px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-600 text-md focus:outline-none focus:shadow-outline"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? isForgetPassword
                        ? "Sending..."
                        : "Logging in..."
                      : isForgetPassword
                      ? "Send Reset Password"
                      : "Login"}
                  </StyledButton>
                </Form>
              )}
            </Formik>

            {/* {!isForgetPassword && (
              <>
                <span className="flex justify-center items-center mt-1 mb-4 w-full">
                  <hr className="mr-2 w-1/6 border-gray-200 border-t-0.5" />
                  <p className="text-sm text-gray-300">OR</p>
                  <hr className="ml-2 w-1/6 border-gray-200 border-t-0.5" />
                </span>

                <StyledButton
                  className="px-4 py-2 mb-5 text-sm font-normal text-gray-700 bg-white rounded border border-gray-200"
                  onClick={handleGoogleLogin}
                >
                  <span className="flex justify-center items-center">
                    <FcGoogle className="mr-2" /> Sign in with Google
                  </span>
                </StyledButton>
              </>
            )} */}
          </div>
          {/* <p className="mt-3.5 text-xs text-center text-gray-500">
            © {year} Adsevo, All rights reserved. Powered by
            GWOSEVO.
          </p> */}
        </StyledLeftSection>
        <StyledRightSection>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[27px]">Don't have an account? </h3>
            <Link to="/register" className="underline">
              <p className="!text-[22px] font-medium text-center">
                {" "}
                Register Now
              </p>
            </Link>
          </div>
          <StyledImageWrapper>
            <StyledImage src={Images.Person} alt="Person" />
          </StyledImageWrapper>
        </StyledRightSection>
      </StyledContainer>
    </StyledLoginPage>
  );
};

const StyledLoginPage = tw.div`
  flex items-center justify-center bg-white bg-gradient-to-r from-orange-200 to-orange-50 h-screen px-12 py-4
`;

const StyledContainer = tw.div`
  bg-white  shadow-lg overflow-hidden  rounded-lg  flex w-full h-full max-w-screen-lg mx-auto
`;

const StyledLeftSection = tw.div`
  md:w-1/2   px-10 py-8 flex flex-col justify-center  lg:px-16 overflow-hidden h-full 
`;

const StyledButton = tw.button`
  w-full font-bold py-2 px-4 rounded mb-3
`;

const StyledRightSection = tw.div`
  md:w-1/2  bg-gradient-to-r from-orange-300 to-orange-500 text-white  flex-col items-center justify-between h-full px-10 py-10 pb-0 relative  hidden md:flex
`;

const StyledImageWrapper = tw.div`
 w-[400px]   lg:mx-auto
`;
const StyledImage = tw.img`
  w-full h-full object-contain
`;

const Logo = tw.img`w-32  -ml-6 z-10 `;

export default LoginPage;
