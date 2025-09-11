import React, { useState, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import Images from "Images";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Config from "Config";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

import { FieldWrapper, InputGroup, Label } from "components/Styles/InputStyles";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosCheckmark,
} from "react-icons/io";

import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";

// import "react-input-range/lib/css/index.css";
import tw from "tailwind-styled-components";
import Loading from "components/Loading";

import {
  Page,
  BoxContainer,
  Underline,
  Container,
  Content,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
} from "components/Styles/PageStyles";
import TopNavbar from "components/TopNavbar";
import {
  Input,
  ListItem,
  Select,
  TextField,
  Field,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";

const PlansCheckout = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { planDetails, from, planDuration } = location.state || {};

  console.log("planDetails3", planDetails);

  const user = useSelector((state) => state.UserReducer.user);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const OTPInputRef = useRef(null);
  const [mobile, setMobile] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [ussd, setUssd] = useState("");
  const [gotInitialResp, setGotInitialResp] = React.useState(false);
  const [expiryDate, setExpiryDate] = useState(null);
  const [subExpired, setSubExpired] = useState(false);
  const [referenceCode, setReferenceCode] = useState(null);

  //*PAYLOAD STATES
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [gotOtp, setGotOtp] = useState(false);
  const [OTP, setOTP] = useState(null);
  const [ussdCode, setUssdCode] = useState(null);
  const [codes, setCodes] = useState([]);
  const [planType, setPlanType] = useState(null);
  const [isPlanFetched, setIsPlanFetched] = useState(false);
  const [loading, setLoading] = useState(true);

  let packageType = {
    Bronze: 2,
    Silver: 3,
    Gold: 4,
  };

  const [planPurchased, setPlanPurchased] = useState([]);
  const [planPrice, setPlanPrice] = useState(0);
  const [planData, setPlanData] = useState([]);
  const [isPlanLoading, setPlanLoading] = useState(true);  // Added loading state
  
  //* PLANS INFO RETRIEVAL
  const getPlans = async () => {
    try {
      const res = await axios.get(`${Config.apiUrl}/plan/view`);
      if (res?.data?.data) {
        setPlanData(res.data.data);
      } else {
        console.error("No plan data found in the response");
      }
      setPlanLoading(false);
    } catch (error) {
      console.error("Error fetching plan data", error);
      setPlanLoading(false);
    }
  };
  
  // Fetch plans only once
  useEffect(() => {
    if (!isPlanFetched) {
      setIsPlanFetched(true);
      getPlans();
    }
  }, [isPlanFetched]);
  
  const findPlanByName = (planDetails, planData) => {
    if (!planDetails || !planData.length) return null;
    return planData.find((item) => item.name === planDetails.name) || null;
  };
  
  useEffect(() => {
    if (!from || !planDetails) return;
  
    if (!isPlanLoading && isPlanFetched) {
      if (from === "plans") {
        setPlanPurchased(planDetails);
      }
  
      if (from === "features") {
        const planToPurchase = findPlanByName(planDetails, planData);
        if (planToPurchase) {
          setPlanPurchased(planToPurchase);
        } else {
          toast.error("Plan not found");
          navigate("/plans");
        }
      }
    }
  }, [planDetails, planData, from, isPlanFetched, isPlanLoading, navigate]);
  
  useEffect(() => {
    if (!planPurchased || !planDuration) return;
  
    // Set plan price based on duration
    if(!isPlanLoading && isPlanFetched){
      if (planDuration === Config.planDuration.monthly) {
        setPlanPrice(planPurchased.price);
      } else if (planDuration === Config.planDuration.yearly) {
        setPlanPrice(planDetails?.discount_price);
      }
    }
  }, [planPurchased, planDuration, isPlanFetched, isPlanLoading, planDetails]);
  
  
  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get(
          `${Config.apiUrl}/ussd/getUssdShortCodes`,
          {
            headers: {
              "Content-Type": "application/json",
              Token: `${user?.token}`,
            },
          }
        );

        const data = response?.data;
        console.log("response", data?.data);

        if (data?.data) {
          setCodes(data?.data);
        } else {
          setCodes([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchCodes();
  }, [user?.token]);
  console.log("codes", codes);

  const renderStepCircleContent = (step) => {
    if (completedSteps.includes(step)) {
      return <FaCheck />;
    } else {
      return step;
    }
  };

  const handleUssdChange = (e) => {
    setUssdCode(e.target.value);
  };

  //* FETCH THE USER SUBSCRIPTION INFO
  const fetchFunction = async (values) =>
    await axios.get(`${Config.apiUrl}/profile/get/info`, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user?.token}`,
      },
    });

  const getListSuccess = (data) => {
    setGotInitialResp(true);
  };
  const getListError = (data) => {
    setGotInitialResp(true);
  };

  const {
    isLoading: isLoadingSubInfo,
    data: subData,
    mutate: getListMutate,
  } = useMutation(fetchFunction, {
    onSuccess: getListSuccess,
    onError: getListError,
  });
  useEffect(() => {
    const handler = setTimeout(() => {
      getListMutate();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [getListMutate]);

  useEffect(() => {
    if (subData) {
      setExpiryDate(subData?.data?.plan_expiry_date);
      setPlanType(subData?.data?.plan_type);
    }
  }, [gotInitialResp, subData]);

  //* CHECK IF SUBSCRIPTION HAS EXPIRED
  const checkIfExpired = (dateString) => {
    const currentDate = moment();
    const targetDate = moment(dateString, "YYYY-MM-DD");
    return targetDate.isBefore(currentDate);
  };

  useEffect(() => {
    // if (expiryDate && checkIfExpired("2023-01-01")) {
    if (expiryDate && checkIfExpired(expiryDate)) {
      setSubExpired(true);
    }
    if (planType && planType === Config.Plans.Free) {
      setSubExpired(true);
    }
  }, [expiryDate, planType]);

  const handleNextStep = () => {
    if (!planPurchased && currentStep === 1) {
      toast.error("Please select a plan");
      return;
    }

    if (subExpired && currentStep === 2 && !ussdCode) {
      toast.error("Please select a USSD code");
      return;
    }

    if (
      (subExpired && currentStep === 4) ||
      (!subExpired && currentStep === 3)
    ) {
      if (!otpVal) {
        toast.error("Please enter the OTP");
        return;
      }
    }

    setCurrentStep(currentStep + 1);
    setCompletedSteps((prev) => [...prev, currentStep]);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
    setCompletedSteps((prev) => prev.filter((step) => step < currentStep));
  };

  const [otpVal, setOtpVal] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });
  const firstOTP = useRef(null);
  const secondOTP = useRef(null);
  const thirdOTP = useRef(null);
  const fourthOTP = useRef(null);

  useEffect(() => {
    if (!mobile) {
      setMobile(user?.phone);
    }
  }, [user, mobile]);

  const mobileChangeHandler = (e) => {
    const value = e.target.value;
    if (value?.length > 12) return;

    setMobile(value);
    setGotOtp(false);
  };

  useEffect(() => {
    if(planDuration===Config.planDuration.monthly){
      
      if (planPurchased?.price) {
        const formattedPrice = Number(planPurchased.price).toFixed(2);
        setTotalPrice(formattedPrice);
      }
    }
    else if(planDuration===Config.planDuration.yearly){
      if (planDetails?.discount_price) {
        const formattedPrice = Number(planDetails.discount_price).toFixed(2);
        setTotalPrice(formattedPrice);
      }
    }
  }, [planPurchased, planDuration, planDetails]);

  const resetPlanPurchase = () => setPlanPurchased(null);

  // ----- Getting Initial Data ------
  // const fetchFunction = async () =>
  //   await axios.get(`${Config.nodeApiUrl}/getPlans`, Config.AxiosConfig);

  const { isLoading, error, data, refetch } = useQuery("planList");

  //------- GET OTP -------
  const getOTPFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/payment/otp/send`, values, {
      headers: {
        "Content-Type": "application/json",
        Token: user?.token,
      },
    });

  const getOTPSuccess = (data) => {
    setPaymentLoading(false);
    setGotOtp(true);
    toast.success(data?.data?.msg || "Success");
    OTPInputRef?.current?.focus();
    setCurrentStep(currentStep + 1);
    setCompletedSteps((prev) => [...prev, currentStep]);
  };

  const getOTPError = (data) => {
    setPaymentLoading(false);
    toast.error(data?.response?.data?.msg || "An Error Occurred");
  };

  const { isLoading: getOTPLoading, mutate: getOTPMutate } = useMutation(
    getOTPFunction,
    {
      onSuccess: getOTPSuccess,
      onError: getOTPError,
    }
  );

  const triggerMOMOPayment = async () => {
    try {
      let msisdn = mobile;
      let planPackage = planPurchased?.name;
      let network = selectedPaymentMethod;
      let duration = planDuration;
      let amount = planPrice;
      let shortCode = ussdCode;


      let paymentBody = {
        package: packageType[planPackage],
        msisdn,
        network,
        duration,
        amount: 0.1,
        // amount,
        ussdCode: shortCode,
      };
      let headers = {
        "Content-Type": "application/json",
        Token: user?.token,
      };

      const res = await axios.post(
        `${Config.apiUrl}/payment/initiate`,
        paymentBody,
        { headers }
      );
      const RefrenceId = res.data.refrenceId;
      let verifyBody = {
        refrenceId: RefrenceId,
      };
      setReferenceCode(RefrenceId);

      let count = 0;
      const IntervalFunction = setInterval(async function () {
        let checkResp = await checkingPayStatus(verifyBody, headers);
        count++;
        const result = checkResp?.data?.status;

        if (result === "SUCCESS") {
          clearInterval(IntervalFunction);
          setShowPaymentOptions(false);
          setPaymentLoading(false);
          toast.success("Your Payment has been successfully processed");
          navigate("/dashboard");
        }

        if (result === "FAILED") {
          clearInterval(IntervalFunction);
          setShowPaymentOptions(false);
          setPaymentLoading(false);
          toast.error("Your Payment has been failed");
          resetPlanPurchase();
          navigate("/plans");
        }
        
        if(count >= Config.checkPaymentStatusLimit && network === Config.mno.AT){
          clearInterval(IntervalFunction);
          setPaymentLoading(false);
          setShowPaymentOptions(false);
          toast.warning("Your Payment could not be verified");
          resetPlanPurchase();
          navigate("/plans");
        }

        if (count >= Config.checkPaymentStatusLimit && network !== Config.mno.AT) {
          clearInterval(IntervalFunction);
          setPaymentLoading(false);
          setShowPaymentOptions(false);
          toast.warning("Your Payment is in pending state");
          resetPlanPurchase();
          navigate("/payment/verification", {
            state: {
              refrenceId: RefrenceId,
              network: network,
              amount: amount,
            },
          });
        }
      }, Config.checkPaymentStatusTimeInterval);
    } catch (error) {
      setPaymentLoading(false);
      toast.error("Your payment could not be processed");
      resetPlanPurchase();
    }
  };

  const validateOTP = async (mobile) => {
    try {
      const otpRes = await axios.post(
        `${Config.apiUrl}/payment/otp/verify`,
        {
          msisdn: mobile,
          otp: otpVal?.first + otpVal?.second + otpVal?.third + otpVal?.fourth,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Token: user?.token,
          },
        }
      );

      return otpRes?.status === 200 ? true : false;
    } catch (error) {
      return false;
    }
  };
  const handleConfirmOTP = async () => {
    try {
      setPaymentLoading(true);

      if (!otpVal.first || !otpVal.second || !otpVal.third || !otpVal.fourth) {
        toast.error("Please enter OTP");
        setPaymentLoading(false);
        return;
      }
      const isValidated = await validateOTP(mobile);

      if (isValidated) {
        handleNextStep();
      } else {
        toast.error(data?.response?.data?.msg || "Please enter a correct OTP");
      }
    } catch (error) {
      toast.error("Your OTP could not be confirmed");
      resetPlanPurchase();
    } finally {
      setPaymentLoading(false);
    }
  };

  const getOTPHandler = () => {
    const body = { msisdn: mobile, isResend: gotOtp ? true : false };
    getOTPMutate(body);
  };

  const OtpChangeHandler = (e) => {
    const { value, name } = e.target;
    if (value) {
      if (value.length === 1) {
        setOtpVal((prev) => ({ ...prev, [name]: value }));
        if (name === "first") secondOTP.current.focus();
        else if (name === "second") thirdOTP.current.focus();
        else if (name === "third") fourthOTP.current.focus();
      }
    } else {
      setOtpVal((prev) => ({ ...prev, [name]: value }));
      if (name === "fourth") thirdOTP.current.focus();
      else if (name === "third") secondOTP.current.focus();
      else if (name === "second") firstOTP.current.focus();
    }
  };

  const checkingPayStatus = (body, headers) =>
    axios.post(`${Config.apiUrl}/payment/verify`, body, {
      headers,
    });

  const submitHandler = async (type) => {
    if (mobile?.toString()?.length >= 9) {
      if (!planPurchased) {
        return toast.error("Please select a plan");
      }

      let correctMobile = mobile?.toString();
      correctMobile = "23" + mobile.slice(mobile.length - 9, mobile.length);

      try {
        setPaymentLoading(true);
        await triggerMOMOPayment(correctMobile, type);
      } catch (error) {
        toast.error(
          data?.response?.data?.msg || "Your payment could not be processed"
        );
        resetPlanPurchase();
        navigate("/plans");
      }
    } else {
      toast.error("Please enter a valid phone number");
    }
  };
  
  console.log("plan price", planPrice);
  

  const parseHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const items = Array.from(doc.querySelectorAll("li")).map((item, index) => (
      <ListItem key={index}>
        <FaCheckCircle className="w-4 h-4 mr-2 text-orange-500" />
        {item.textContent}
      </ListItem>
    ));
    return items;
  };

  return (
    <Container>
      <Page>
        <TopNavbar />
        {isLoadingSubInfo && !gotInitialResp && <Loading />}
        {!isLoadingSubInfo && gotInitialResp && (
          <Content>
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle className="!text-center w-full">
                  Subscription Payment
                </HeaderTitle>
              </div>
              <HeaderSubTitle className="!text-center">
                Confirm your payment by going through the payment process
                specified below.
              </HeaderSubTitle>
            </ContentHeader>

            <StepCount>
              <RenderStepCount
                currentStep={currentStep}
                subExpired={subExpired}
                completedSteps={completedSteps}
                renderStepCircleContent={renderStepCircleContent}
              />
            </StepCount>

            <div
              className={`w-full md:max-w-4xl max-w-full flex-col mx-auto space-y-5 ${
                currentStep === 2 && subExpired ? "w-full md:max-w-xl" : ""
              } ${currentStep === 3 ? "w-full md:max-w-xl" : ""} ${
                currentStep === 4 ? "w-full md:max-w-xl" : ""
              } ${currentStep === 5 ? "w-full md:max-w-xl" : ""}`}
            >
              <div className="flex justify-center">
                {currentStep === 1 && planPurchased && (
                  <>
                    <div className="w-full overflow-hidden bg-orange-500 border-4 border-orange-500 rounded-lg y-6 wmx-auto lg:flex shadow-teal">
                      <div className="w-full px-6 py-6 bg-white lg:flex-shrink-1 lg:p-12 dark:bg-gray-900">
                        <h3 className="text-2xl font-bold leading-8 text-left text-gray-900 sm:text-3xl sm:leading-9 dark:text-gray-100">
                          {planPurchased?.name} Package
                        </h3>
                        <p className="mt-6 text-lg leading-8 text-left text-gray-500 font-inter dark:text-gray-400">
                          {planPurchased?.plan_short_description}
                        </p>
                        <div className="mt-8">
                          <div className="flex items-center">
                            <h4 className="flex-shrink-0 pr-4 text-sm font-semibold leading-5 tracking-wider text-orange-500 uppercase bg-white dark:text-orange-500 dark:bg-transparent">
                              What's included
                            </h4>
                            <div className="flex-1 border-t-2 border-gray-200 dark:border-gray-700"></div>
                          </div>
                          <p className="text-left text-gray-700 text-medium text-md dark:text-gray-300">
                            <ul className="grid grid-cols-1 gap-3 mt-4 -ml-3 space-y-1 md:grid-cols-2">
                              {parseHTML(planPurchased?.key_features)}
                            </ul>
                            {}
                          </p>
                        </div>
                      </div>
                      <div className="px-6 py-8 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12 dark:bg-gray-900">
                        <div className="flex items-baseline justify-center my-10 text-3xl font-extrabold leading-none text-gray-900 lg:my-6 dark:text-gray-100">
                          <p className="flex flex-col items-center gap-4 font-inter">
                            GHS {
                              planDuration === Config.planDuration.monthly ? parseFloat(planPurchased?.price).toFixed(2) : parseFloat(planDetails?.discount_price).toFixed(2)
                            }
                            <span className="text-xl font-semibold text-center text-gray-600 font-inter">
                            {
                              planDuration === Config.planDuration.monthly ? "( Monthly )" : "( Annually )"
                            }
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {currentStep === 1 && (
                  <>
                    <Button2
                      onClick={() => {
                        navigate("/plans");
                      }}
                      type="button"
                    >
                      <IoIosArrowBack className="w-4 h-4 ml-2 " />
                      <span className="text">Go Back</span>
                    </Button2>
                    <SubmitButton2 type="submit" onClick={handleNextStep}>
                      <span className="text">Next</span>

                      <IoIosArrowForward className="w-4 h-4 text-white" />
                    </SubmitButton2>
                  </>
                )}
              </div>

              {subExpired && currentStep === 2 && (
                <div className="flex items-center justify-center">
                  <div className="!w-full">
                    <Box className="my-4">
                      <InputGroup>
                        <Label htmlFor="ussd">USSD Code</Label>
                        <Select
                          labelId="ussd"
                          id="ussd"
                          value={ussdCode}
                          onChange={(e) => handleUssdChange(e)}
                          placeholder="Select ussd code"
                          style={{
                            padding: "6px 10px",
                          }}
                        >
                          {codes &&
                            codes.map((code, index) => {
                              return (
                                <MenuItem key={index} value={code.code}>
                                  {code.code}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </InputGroup>
                    </Box>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <>
                        <Button2
                          onClick={() => {
                            setCurrentStep(currentStep - 1);

                            setCompletedSteps((prev) =>
                              prev.filter((step) => step !== 1)
                            );
                          }}
                          type="button"
                        >
                          <IoIosArrowBack className="w-4 h-4 ml-2 " />
                          <span className="text">Previous</span>
                        </Button2>

                        <SubmitButton2
                          type="submit"
                          onClick={handleNextStep}
                          disabled={getOTPLoading}
                        >
                          <span className="text">
                            {" "}
                            {!getOTPLoading && !gotOtp && "Next"}
                            {!getOTPLoading && gotOtp && "Next"}
                          </span>
                          {!getOTPLoading && (
                            <IoIosArrowForward className="w-4 h-4 text-white" />
                          )}
                          {getOTPLoading && (
                            <Loading
                              width={18}
                              height={18}
                              color="white"
                              noPadding
                            />
                          )}
                        </SubmitButton2>
                      </>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === (subExpired ? 3 : 2) && (
                <div className="flex items-center justify-center">
                  <div className="!w-4/5">
                    <Box className="my-4">
                      <InputGroup>
                        <Label htmlFor="mobile">Enter Mobile Number *</Label>
                        <TextField
                          name="mobile"
                          value={mobile}
                          onChange={mobileChangeHandler}
                          fullWidth
                        />
                      </InputGroup>
                    </Box>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <>
                        <Button2
                          onClick={() => {
                            setCurrentStep(currentStep - 1);

                            setCompletedSteps((prev) =>
                              prev.filter((step) => step !== 2)
                            );
                          }}
                          type="button"
                        >
                          <IoIosArrowBack className="w-4 h-4 ml-2 " />
                          <span className="text">Previous</span>
                        </Button2>

                        <SubmitButton2
                          type="submit"
                          onClick={getOTPHandler}
                          disabled={getOTPLoading}
                        >
                          <span className="text">
                            {" "}
                            {!getOTPLoading && !gotOtp && "Next"}
                            {!getOTPLoading && gotOtp && "Next"}
                          </span>
                          {!getOTPLoading && (
                            <IoIosArrowForward className="w-4 h-4 text-white" />
                          )}
                          {getOTPLoading && (
                            <Loading
                              width={18}
                              height={18}
                              color="white"
                              noPadding
                            />
                          )}
                        </SubmitButton2>
                      </>
                    </div>
                  </div>
                </div>
              )}
              {/* gotOtp &&  */}
              {currentStep === (subExpired ? 4 : 3) && (
                <div className="flex items-center justify-center">
                  <div className="!w-full">
                    <Box>
                      <InputGroup>
                        <Title2>Enter OTP</Title2>
                        <SubTitle>
                          Please enter the One-Time Password (OTP) below:
                        </SubTitle>

                        <OtpInputWrapper>
                          <OtpInput
                            type="number"
                            maxLength={1}
                            name="first"
                            value={otpVal.first}
                            required
                            onChange={OtpChangeHandler}
                            ref={firstOTP}
                          />
                          <OtpInput
                            type="number"
                            maxLength={1}
                            name="second"
                            value={otpVal.second}
                            required
                            onChange={OtpChangeHandler}
                            ref={secondOTP}
                          />
                          <OtpInput
                            type="number"
                            maxLength={1}
                            name="third"
                            value={otpVal.third}
                            required
                            onChange={OtpChangeHandler}
                            ref={thirdOTP}
                          />
                          <OtpInput
                            type="number"
                            maxLength={1}
                            name="fourth"
                            value={otpVal.fourth}
                            required
                            onChange={OtpChangeHandler}
                            ref={fourthOTP}
                          />
                        </OtpInputWrapper>
                      </InputGroup>
                    </Box>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "20px",
                      }}
                    >
                      {currentStep === (subExpired ? 4 : 3) && (
                        <>
                          <Button2
                            onClick={() => {
                              setCurrentStep(currentStep - 1);

                              setCompletedSteps((prev) =>
                                prev.filter((step) => step !== 3)
                              );
                            }}
                            type="button"
                          >
                            <IoIosArrowBack className="w-4 h-4 " />
                            <span className="text">Previous</span>
                          </Button2>

                          <SubmitButton2
                            type="submit"
                            onClick={handleConfirmOTP}
                            disabled={paymentLoading}
                          >
                            <span className="text">
                              {" "}
                              {!paymentLoading && "Next"}
                            </span>
                            {!paymentLoading && (
                              <IoIosArrowForward className="w-4 h-4 text-white" />
                            )}
                            {paymentLoading && (
                              <Loading
                                width={18}
                                height={18}
                                color="white"
                                noPadding
                              />
                            )}
                          </SubmitButton2>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === (subExpired ? 5 : 4) && (
                <div className="flex items-center justify-center">
                  <div className="!w-full">
                    <Box>
                      <div>
                        <Title2>Payment Method</Title2>

                        {!paymentLoading && (
                          <>
                            {Config.networkMtn.mtn === true && (
                              <Flex
                                className={`border  ${
                                  selectedPaymentMethod === Config.mno.MTN
                                    ? "selected border-orange-500 shadow-lg"
                                    : "border-gray-200"
                                }`}
                                onClick={() =>
                                  setSelectedPaymentMethod(Config.mno.MTN)
                                }
                              >
                                <div className="flex items-center justify-between w-full py-1">
                                  <div className="flex items-center gap-3">
                                    <CircleImage src={Images.Mtn} />
                                    <p className="font-medium text-gray-600 ml-1.5">
                                      MTN
                                    </p>
                                  </div>
                                  {selectedPaymentMethod === Config.mno.MTN && (
                                    <FaCheckCircle className="text-orange-500 ml-1.5" />
                                  )}
                                </div>
                              </Flex>
                            )}

                            {/*  start*/}
                            {/* <Flex className="border-none"> */}
                            {Config.networkAt.at === true && (
                              <Flex
                                className={`border  ${
                                  selectedPaymentMethod === Config.mno.AT
                                    ? "selected border-orange-500 shadow-lg"
                                    : "border-gray-200"
                                }`}
                                onClick={() =>
                                  setSelectedPaymentMethod(Config.mno.AT)
                                }
                              >
                                <div className="flex items-center justify-between w-full py-1">
                                  <div className="flex items-center gap-3">
                                    <CircleImage src={Images.Air} />
                                    <p className="font-medium text-gray-600 ml-1.5">
                                      AT
                                    </p>
                                  </div>
                                  {selectedPaymentMethod === Config.mno.AT && (
                                    <FaCheckCircle className="text-orange-500 ml-1.5" />
                                  )}
                                </div>
                              </Flex>
                            )}

                            {Config.networkVodafone.vodafone === true && (
                              <Flex
                                className={`border  ${
                                  selectedPaymentMethod === Config.mno.TELECEL
                                    ? "selected border-orange-500 shadow-lg"
                                    : "border-gray-200"
                                }`}
                                onClick={() =>
                                  setSelectedPaymentMethod(Config.mno.TELECEL)
                                }
                              >
                                <div className="flex items-center justify-between w-full py-1">
                                  <div className="flex items-center gap-3">
                                    <CircleImage src={Images.Telecel} />
                                    <p className="font-medium text-gray-600 ml-1.5">
                                      Telecel
                                    </p>
                                  </div>
                                  {selectedPaymentMethod ===
                                    Config.mno.TELECEL && (
                                    <FaCheckCircle className="text-orange-500 ml-1.5" />
                                  )}
                                </div>
                              </Flex>
                            )}
                          </>
                        )}

                        {paymentLoading && (
                          <div className="flex flex-col items-center justify-center h-40 space-y-2">
                            <Loading noPadding />
                            <p className="text-base font-medium text-gray-600 md:text-lg">
                              Please Wait...
                            </p>
                          </div>
                        )}
                      </div>
                    </Box>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "20px",
                      }}
                    >
                      {currentStep > 3 && (
                        <>
                          <Button2
                            onClick={() => {
                              setCurrentStep(currentStep - 1);

                              setCompletedSteps((prev) =>
                                prev.filter((step) => step !== 4)
                              );
                            }}
                            type="button"
                          >
                            <IoIosArrowBack className="w-4 h-4 ml-4 " />
                            <span className="text">Previous</span>
                          </Button2>
                          <SubmitButton2
                            type="submit"
                            onClick={() => submitHandler(selectedPaymentMethod)}
                            disabled={paymentLoading}
                          >
                            <span className="text">
                              {" "}
                              {!paymentLoading && "Pay"}
                            </span>

                            {paymentLoading && (
                              <Loading
                                width={18}
                                height={18}
                                color="white"
                                noPadding
                              />
                            )}
                          </SubmitButton2>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Content>
        )}
      </Page>
    </Container>
  );
};
const Box = tw.div`border border-gray-300 p-10 rounded-lg`;

const Flex = tw.div`py-3 my-4 hover:shadow-md transition duration-500s bg-white rounded-md   flex text-gray-600 text-sm items-center justify-between px-5`;
const CircleImage = tw.img`w-8 h-8 rounded-full overflow-hidden object-cover  `;
const Title2 = tw.h2`text-lg mb-1 text-gray-700 font-medium  `;
const SubTitle = tw.p`!mt-0 !mb-3 text-sm text-gray-500 font-normal `;

const StepCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const StepCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ active, completed }) =>
    completed ? "#E47A17FF" : active ? "#E47A17FF" : "#e0e0e0"};
  // margin: 0 10px;
  font-size: 14px;
  color: ${({ active, completed }) => (active || completed ? "#fff" : "#666")};
`;
const OtpInput = tw.input`w-full w-14 md:mx-auto mx-2 text-center py-4 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white `;
const OtpInputWrapper = tw.div`w-3/4 flex justify-center mx-auto items-center`;

const HorizontalLine = ({ active, completed }) => {
  const borderColor = completed || active ? "#E47A17FF" : "#e0e0e0";
  return (
    <div
      className="inline-block w-10"
      style={{
        borderBottom: `3px solid ${borderColor}`,
        height: "5px",
      }}
    />
  );
};

// SubmitButton2 component
const SubmitButton2 = ({ children, ...props }) => {
  return (
    <button
      className="flex items-center justify-center ml-4 font-normal tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-orange-500 rounded-lg -12 w-36 hover:bg-orange-500 focus:outline-none"
      {...props}
    >
      {children}
    </button>
  );
};

// Button2 component
const Button2 = ({ children, ...props }) => {
  return (
    <button
      className="tracking-wide font-normal border border-[#666] text-[#666] w-36 h-12 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none mr-4"
      {...props}
    >
      {children}
    </button>
  );
};

const RenderStepCount = ({
  subExpired,
  currentStep,
  completedSteps,
  renderStepCircleContent,
}) => {
  return (
    <StepCount>
      <StepCircle
        active={currentStep === 1}
        completed={completedSteps?.includes(1)}
      >
        {renderStepCircleContent(1)}
      </StepCircle>
      <HorizontalLine
        active={currentStep >= 2}
        completed={
          completedSteps?.includes(1) &&
          completedSteps.includes(2) &&
          subExpired
        }
      />
      {subExpired && (
        <>
          <StepCircle
            active={currentStep === 2}
            completed={completedSteps.includes(2)}
          >
            {renderStepCircleContent(2)}
          </StepCircle>
          <HorizontalLine
            active={currentStep >= 3}
            completed={completedSteps.includes(2) && completedSteps.includes(3)}
          />
        </>
      )}
      <StepCircle
        active={currentStep === (subExpired ? 3 : 2)}
        completed={completedSteps.includes(subExpired ? 3 : 2)}
      >
        {renderStepCircleContent(subExpired ? 3 : 2)}
      </StepCircle>
      <HorizontalLine
        active={currentStep >= (subExpired ? 4 : 3)}
        completed={
          completedSteps.includes(subExpired ? 3 : 2) &&
          completedSteps.includes(subExpired ? 4 : 3)
        }
      />
      <StepCircle
        active={currentStep === (subExpired ? 4 : 3)}
        completed={completedSteps.includes(subExpired ? 4 : 3)}
      >
        {renderStepCircleContent(subExpired ? 4 : 3)}
      </StepCircle>
      <HorizontalLine
        active={currentStep >= (subExpired ? 5 : 4)}
        completed={
          completedSteps.includes(subExpired ? 4 : 3) &&
          completedSteps.includes(subExpired ? 5 : 4)
        }
      />
      <StepCircle
        active={currentStep === (subExpired ? 5 : 4)}
        completed={completedSteps.includes(subExpired ? 5 : 4)}
      >
        {renderStepCircleContent(subExpired ? 5 : 4)}
      </StepCircle>
    </StepCount>
  );
};
export default PlansCheckout;
