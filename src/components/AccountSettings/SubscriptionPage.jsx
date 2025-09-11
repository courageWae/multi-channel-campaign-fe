import axios from "axios";
import Loading from "components/Loading";
import Config from "Config";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoIosRocket } from "react-icons/io";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

const SubscriptionPage = ({ user }) => {
  const [gotInitialResp, setGotInitialResp] = React.useState(false);
  const [subExpired, setSubExpired] = useState(false);

  const fetchFunction = async (values) =>
    await axios.get(`${Config.apiUrl}/profile/get/info`, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user?.token}`,
      },
    });
  const navigate = useNavigate();

  const getListSuccess = (data) => {
    setGotInitialResp(true);
  };
  const getListError = (data) => {
    setGotInitialResp(true);
  };

  const {
    isLoading,
    data,
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

  const durationInDays = (expiry_date, payment_date) => {
    const expiry = moment(expiry_date);
    const payment = moment(payment_date);
    const duration = expiry.diff(payment, "days");
    return duration;
  };

  const durationLeft = (expiry_date) => {
    const expiry = moment(expiry_date);
    const today = moment();
    const duration = expiry.diff(today, "days");
    return duration;
  };

  const calculatePercentageDaysUsed = (expiry_date, payment_date) => {
    const totalDays = durationInDays(expiry_date, payment_date);
    const daysPassed = totalDays - durationLeft(expiry_date);
    const percentageUsed = (daysPassed / totalDays) * 100;

    console.log("percentageUsed", percentageUsed);

    return percentageUsed;
  };

  const handleBuySubscribe = () => {
    navigate("/plans");
  };

  const checkIfExpired = (dateString) => {
    const currentDate = moment();
    const targetDate = moment(dateString, "YYYY-MM-DD");

    return targetDate.isBefore(currentDate);
  };

  useEffect(() => {
    //check if user has an active subscription
    if (data?.data?.expiry_date && checkIfExpired(data?.data?.expiry_date)) {
      setSubExpired(true);
    }
  }, [data?.data?.expiry_date]);

  return (
    <>
      {isLoading && !gotInitialResp ? (
        <Loading />
      ) : !isLoading && gotInitialResp ? (
        <SubscriptionContainer>
          <Title>Subscription Plan</Title>
          <SubscriptionCard>
            <div className="flex items-center justify-between w-full">
              <CardTitle>Active Plan</CardTitle>
              <span
                class={`${
                  data?.data?.plan_type === Config.Plans.Free
                  ? "bg-purple-100 text-purple-800"
                    : "bg-green-100 text-green-800"
                } text-lg font-bold me-2 px-10 py-3 rounded-full`}
              >
                {data?.data?.plan_type === Config.Plans.Free ? "Trial Period" : "Active"}
              </span>
            </div>
            <Separator />
            <DetailsWrapper>
              <div>
                <IconWrapper>
                  <IoIosRocket className="text-2xl text-gray-900" />
                </IconWrapper>
                <PlanTitle>
                  {data?.data?.plan_type === Config.Plans.Free
                    ? "Free Plan"
                    : data?.data?.plan_type === Config.Plans.Bronze
                    ? "Bronze Plan"
                    : data?.data?.plan_type === Config.Plans.Silver
                    ? "Silver Plan"
                    : "Gold Plan"}
                </PlanTitle>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-semibold text-gray-400">
                    Valid Until:{" "}
                  </span>
                  <DateFormat>
                    {moment(data?.data?.plan_expiry_date).format("LL")}
                  </DateFormat>
                </div>
              </div>
              <div>
                <PlanPrice>
                  GHC{parseFloat(data?.data?.amount).toFixed(2)}
                </PlanPrice>
                <Duration>{data?.data?.duration === Config.planDuration.monthly ? "( Monthly Payment )" : "( Yearly Payment )"} </Duration>
              </div>
            </DetailsWrapper>
            <ProgressContainer>
              <ProgressDetails>
                <div className="text-lg font-bold text-gray-800">
                  Duration Usage
                </div>
                <div className="text-lg font-bold text-gray-800">
                  {durationLeft(data?.data?.plan_expiry_date)}/
                  {durationInDays(
                    data?.data?.plan_expiry_date,
                    data?.data?.subscription_date
                  )}{" "}
                  days Left
                </div>
              </ProgressDetails>
              <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-orange-600 h-2.5 rounded-full"
                  style={{
                    width: `${parseInt(
                      calculatePercentageDaysUsed(
                        data?.data?.plan_expiry_date,
                        data?.data?.subscription_date
                      )
                    )}%`,
                  }}
                ></div>
              </div>
            </ProgressContainer>
            <ButtonContainer>
              <ButtonWrapper>
                {data?.data?.plan_type !== Config.Plans.Free && (
                  <CancelButton>Cancel Subscription</CancelButton>
                )}
                {!subExpired ? (
                  <UpdateButton onClick={handleBuySubscribe}>
                    Upgrade Subscription
                  </UpdateButton>
                ) : (
                  <UpdateButton onClick={handleBuySubscribe}>
                    Purchase Subscription
                  </UpdateButton>
                )}
              </ButtonWrapper>
            </ButtonContainer>
          </SubscriptionCard>
        </SubscriptionContainer>
      ) : (
        <Loading />
      )}
    </>
  );
};

const SubscriptionContainer = tw.section`w-full`;
const SubscriptionCard = tw.div`w-full bg-white shadow-md border-gray-300 border rounded-md px-6 py-6`;
const Title = tw.h1`text-3xl font-bold text-gray-800 my-6`;
const CardTitle = tw.h3`text-2xl font-bold text-gray-800 my-3`;
const Separator = tw.div`h-0.5 bg-gray-300 rounded-md w-full my-3`;
const DetailsWrapper = tw.div`flex items-center justify-between w-full`;
const IconWrapper = tw.div`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-800`;
const PlanTitle = tw.p`text-2xl font-bold text-gray-900 my-3`;
const DateFormat = tw.p`text-lg font-bold text-gray-500 my-2`;

const PlanPrice = tw.h3`text-3xl text-gray-800 font-bold mb-3`;
const Duration = tw.p`text-md text-gray-500 font-semibold`;

const ProgressContainer = tw.div`my-6 flex flex-col items-center gap-3`;
const ProgressDetails = tw.div`flex items-center justify-between w-full`;

const ButtonContainer = tw.div`flex justify-end items-center w-full`;
const ButtonWrapper = tw.div`flex items-center gap-6`;

const CancelButton = tw.button`py-[10px] px-[30px] outline outline-2 outline-red-500 hover:bg-red-500 hover:text-white text-red-600 rounded-md text-md flex items-center-justify-center transition duration-300s`;
const UpdateButton = tw.button` py-[10px] px-[30px] bg-orange-500 text-white text-md font-semibold flex items-center-justify-center rounded-md hover:bg-orange-600 transition duration-300s`;

export default SubscriptionPage;
