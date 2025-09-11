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
  Slider,
} from "@mui/material";
import moment from "moment";
import { toast } from "react-toastify";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const VoiceCreditTopUp = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { planDetails } = location.state || {};
  console.log("selectedPlan", planDetails);

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
  const [codes, setCodes] = useState([]);
  const [planType, setPlanType] = useState(null);
  const [topUpDetails, setTopUpDetails] = useState({
    credits: 0,
    amount: 0,
  });

  const [amountPerUnit, setAmountPerUnit] = useState(0.04);

  const [voiceUnits, setVoiceUnits] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const [isUnitLoading, setIsUnitLoading] = useState(false);

  useEffect(()=>{
    const fetchPerUnitAmount = ()=>{
      try{
        setIsUnitLoading(true);
        axios.get(`${Config.apiUrl}/pricing/per-unit`, {
          headers: {
            "Content-Type": "application/json",
            Token: `${user?.token}`,
          }
        }).then((res)=>{
          
          setAmountPerUnit(res.data.perUnit.voice);
          setIsUnitLoading(false);
          
        }).catch((err)=>{
          
          setIsUnitLoading(false);
          console.log(err);
        })

      }catch(error){
        setIsUnitLoading(false);
        console.log(error);
      }finally{
        console.log("Process done");
      }
    }
    fetchPerUnitAmount();
  },[user?.token]);
  const renderStepCircleContent = (step) => {
    if (completedSteps.includes(step)) {
      return <FaCheck />;
    } else {
      return step;
    }
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
    if ((voiceUnits === 0 || totalAmount===0) && currentStep === 1) {
      toast.error("You must select the number of voice credits you are purchasing");
      return;
    }

    if (currentStep === 3){
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
    if (topUpDetails?.amount) {
      const formattedPrice = Number(topUpDetails.amount).toFixed(2);
      setTotalPrice(formattedPrice);
    }
  }, [topUpDetails]);
  console.log("plan purchased", topUpDetails);

  const resetAmount = () => setTotalAmount(0);

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
      let msisdn  = mobile;
      let units   = voiceUnits;
      let network = selectedPaymentMethod;
      let amount  = totalAmount;

      let paymentBody = {
        msisdn,
        network,
        amount: 0.1,
        email:0,
        sms:0,
        voice:units,
        telegram:0,
        whatsApp:0
      };
      let headers = {
        "Content-Type": "application/json",
        Token: user?.token,
      };

      const res = await axios.post(
        `${Config.apiUrl}/payment/topup`,
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
          navigate(-1);
        }

        if (result === "FAILED") {
          clearInterval(IntervalFunction);
          setShowPaymentOptions(false);
          setPaymentLoading(false);
          toast.error("Your Payment has been failed");
          resetAmount();
          navigate(-1);
        }

        if (count >= Config.checkPaymentStatusLimit) {
          clearInterval(IntervalFunction);
          setPaymentLoading(false);
          setShowPaymentOptions(false);
          toast.warning("Your Payment is in pending state");
          resetAmount();
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
      resetAmount();
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
      resetAmount();
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
      if (!topUpDetails) {
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
        resetAmount();
        navigate("/plans");
      } finally {
      }
    } else {
      toast.error("Please enter a valid phone number");
    }
  };

  const changeHandler = (e) => {
    try {
      const { name, value } = e.target;
      if (name === "voice") {
        setVoiceUnits(value);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (voiceUnits) {
      setTotalAmount(parseFloat(voiceUnits * amountPerUnit).toFixed(2));
    }
    if(voiceUnits==="" || voiceUnits===0) {
      setTotalAmount(0);
    }
  }, [voiceUnits, amountPerUnit]);

  return (
    <Container>
      <Page>
        <TopNavbar />
        {isLoadingSubInfo && !gotInitialResp && isUnitLoading && <Loading />}
        {!isLoadingSubInfo && gotInitialResp && (
          <Content>
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle className="!text-center w-full">
                  Voice Credit Top-Up
                </HeaderTitle>
              </div>
              <HeaderSubTitle className="!text-center">
                Top Up your Voice credit by following the process.
              </HeaderSubTitle>
            </ContentHeader>

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
                  completedSteps?.includes(1) && completedSteps.includes(2)
                }
              />
              <StepCircle
                active={currentStep === 2}
                completed={completedSteps?.includes(2)}
              >
                {renderStepCircleContent(2)}
              </StepCircle>
              <HorizontalLine
                active={currentStep >= 3}
                completed={
                  completedSteps.includes(2) && completedSteps.includes(3)
                }
              />
              <StepCircle
                active={currentStep === 3}
                completed={completedSteps.includes(3)}
              >
                {renderStepCircleContent(3)}
              </StepCircle>
              <HorizontalLine
                active={currentStep >= 4}
                completed={
                  completedSteps.includes(3) && completedSteps.includes(4)
                }
              />
              <StepCircle
                active={currentStep === 4}
                completed={completedSteps.includes(4)}
              >
                {renderStepCircleContent(4)}
              </StepCircle>
            </StepCount>

            <div
              className={`w-full md:max-w-4xl max-w-full flex-col mx-auto space-y-5"
              } ${currentStep === 2 ? "w-full md:max-w-xl" : ""} ${
                currentStep === 3 ? "w-full md:max-w-xl" : ""
              } ${currentStep === 4 ? "w-full md:max-w-xl" : ""}`}
            >
              <div className="flex justify-center">
                {currentStep === 1 && (
                  <>
                    {/* Main Card */}
                    <Box className="w-3/4 p-6 rounded-lg shadow-md bg-gray-50">
                      {/* Amount Per Unit Section */}
                      <div className="p-6 bg-white rounded-lg shadow-sm">
                        <Row className="flex items-center justify-between pb-6 border-b">
                          <PlanName className="text-xl font-semibold text-gray-700">
                            Amount Per Unit
                          </PlanName>
                          <Amt className="text-2xl font-semibold text-orange-500">
                            {parseFloat(amountPerUnit).toFixed(2)} GHS
                          </Amt>
                        </Row>

                        {/* Slider Component */}
                        <div className="flex flex-col my-3">
                          <label
                            htmlFor="voice-units-slider"
                            className="mb-2 font-semibold text-gray-600 text-md"
                          >
                            Select Units
                          </label>
                          <Slider
                            id="voice-units-slider"
                            min={0}
                            max={500000}
                            step={1000}
                            value={voiceUnits}
                            onChange={(e, value) => {
                              setVoiceUnits(value);
                            }}
                            valueLabelDisplay="auto"
                            aria-label="Select voice Units"
                            color="warning"
                          />
                        </div>

                        {/* Input Component */}
                        <div className="flex flex-col">
                          <Input
                            id="voice-input"
                            type="number"
                            placeholder="Enter units here"
                            min={0}
                            max={500000}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              changeHandler({
                                target: { value: inputValue, name: "voice" },
                              });
                            }}
                            name="voice"
                            value={voiceUnits}
                            color="warning"
                            className="w-full p-4 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Total Amount Section */}
                      <div className="p-6 mt-8 bg-white rounded-lg shadow-sm">
                        <Row className="flex items-center justify-between pt-6 border-t">
                          <p className="text-lg font-medium text-gray-900">
                            Total Amount
                          </p>
                          <p className="text-2xl font-semibold text-orange-600">
                            {totalAmount} GHS
                          </p>
                        </Row>
                      </div>
                    </Box>
                  </>
                )}
              </div>

              {currentStep === 1 && (
                <div className="flex justify-end w-full max-w-3xl mt-6 ml-3">
                  <Button2
                    onClick={() => {
                      navigate(-1);
                    }}
                    type="button"
                  >
                    <IoIosArrowBack className="w-4 h-4" />
                    <span className="text">Go Back</span>
                  </Button2>
                  <SubmitButton2 type="submit" onClick={handleNextStep}>
                    <span className="text">Next</span>
                    <IoIosArrowForward className="w-4 h-4 text-white" />
                  </SubmitButton2>
                </div>
              )}

              {currentStep === 2 && (
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
              {currentStep === 3 && (
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
                      {currentStep === 3 && (
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

              {currentStep === 4 && (
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

const PlanName = tw.div`flex w-full  justify-start items-center space-x-2 `;
const Row = tw.div`flex justify-between items-end p-3`;
const Amt = tw.p`w-96 text-right`;

export default VoiceCreditTopUp;
