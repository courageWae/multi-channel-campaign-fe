import React, { useState } from "react";
import axios from "axios";
import Config from "../../Config";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "components/Loading";
import { Container, Content, Page } from "components/Styles/PageStyles";
import TopNavbar from "components/TopNavbar";
import Images from "Images";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import {
  FiCheckCircle,
  FiArrowRightCircle,
  FiClock,
  FiThumbsUp,
} from "react-icons/fi";
const PaymentVerification = () => {
  const [showInstructions, setShowInstructions] = useState(false); // State for modal
  const user = useSelector((state) => state.UserReducer.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { refrenceId, network, amount } = location.state || {};

  const handleVerifyPayment = async (values) => {
    try {
      const response = await axios.post(
        `${Config.apiUrl}/payment/verify`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Token: user?.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const verifyPaymentSuccess = (data) => {
    const paymentStatus = data?.status;
    if (paymentStatus === "PENDING") {
      toast.warn(data?.msg || "Pending Payment Approval");
    } else if (paymentStatus === "SUCCESS") {
      toast.success(data?.msg || "Payment Successful");
      navigate("/dashboard");
    } else if (paymentStatus === "FAILED") {
      toast.error(data?.msg || "Payment Failed");
      navigate("/dashboard");
    }
  };

  const verifyPaymentError = (error) => {
    toast.error(error?.response?.data?.msg || "An Error Occurred");
  };

  const { isLoading: verifyPaymentLoading, mutate: verifyPaymentMutate } =
    useMutation(handleVerifyPayment, {
      onSuccess: verifyPaymentSuccess,
      onError: verifyPaymentError,
    });

  const submitVerificationHandler = () => {
    const body = { refrenceId: refrenceId };
    verifyPaymentMutate(body);
  };

  return (
    <Container>
      <Page>
        <TopNavbar />
        <Content>
          <div className="relative z-10 px-4 Container sm:px-6 lg:px-8">
            <div className="mb-20 text-center">
              <h2 className="text-[42px] font-bold text-gray-800 leading-tight">
                Verify your <span className="text-orange-500">Payment</span>{" "}
                after you have paid!
              </h2>
              <h2 className="text-[20px] font-normal text-gray-500 leading-tight mt-4">
                After you have approved payment on your device, click on the
                button to verify your payment.
              </h2>
              {
                network !== Config.mno.AT && (
                  <button
                  onClick={() => setShowInstructions(true)}
                  className="px-4 py-2 mt-4 font-semibold text-white bg-orange-500 rounded hover:bg-orange-600"
                >
                  Not Sure how to Verify Payment? Click Here...
                </button>
                )
              }
            </div>

            {verifyPaymentLoading && <Loading />}
            {!verifyPaymentLoading && (
              <div className="grid grid-cols-3 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-1">
                  {network === Config.mno.MTN ? (
                    <NetworkCard
                      name="MTN Mobile Money"
                      image={Images.mtnMomo}
                    />
                  ) : network === Config.mno.TELECEL ? (
                    <NetworkCard
                      name="Telecel Cash"
                      image={Images.telecelCash}
                    />
                  ) : (
                    <NetworkCard
                      name="AirtelTigo Money"
                      image={Images.atMoney}
                    />
                  )}
                </div>
                <div className="col-span-2">
                  <PaymentVerificationCard
                    referenceNumber={refrenceId}
                    amount={parseFloat(amount).toFixed(2)}
                    submitVerificationHandler={submitVerificationHandler}
                    network={network}
                  />
                </div>
              </div>
            )}
          </div>
        </Content>
      </Page>
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} network={network} />
      )}
    </Container>
  );
};

const InstructionsModal = ({ onClose, network }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
    <div className="w-full max-w-lg p-8 bg-white shadow-2xl rounded-2xl">
      <h2 className="mb-8 text-3xl font-semibold text-center text-gray-800">
        Payment Verification Steps
      </h2>
      <div className="relative pl-12 space-y-8 text-gray-700">
        {/* Timeline Line */}
        <div className="absolute top-0 left-7 w-[2px] h-full bg-gray-300"></div>

        {/* Step 1 */}
        {network === Config.mno.MTN ? (
          <>
            <div className="relative flex items-start space-x-4">
              <div className="flex items-center justify-center p-1 text-white bg-orange-500 rounded-full p-">
                <FiCheckCircle className="text-lg" />
              </div>
              <p>
              Open your phone and dial *170#, then select option 6 for <span className="font-bold">*My Wallet*</span>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start space-x-4">
              <div className="flex items-center justify-center p-1 text-white bg-blue-500 rounded-full p-">
                <FiArrowRightCircle className="text-lg" />
              </div>
              <p>
                Choose option 3 for <span className="font-fold">*My Approvals*</span>. This will take you to a list of your pending approvals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start space-x-4">
              <div className="flex items-center justify-center p-1 text-white bg-green-500 rounded-full p-">
                <FiClock className="text-lg" />
              </div>
              <p>When prompted, enter your Mobile Money PIN to access your approval requests.</p>
            </div>

            {/* Step 4 */}
            <div className="relative flex items-start space-x-4">
              <div className="flex items-center justify-center p-1 text-white bg-purple-500 rounded-full p-">
                <FiThumbsUp className="text-lg" />
              </div>
              <p>
                Select the pending payment you want to approve and follow the instructions. After that, return to the app and click the Verify Payment button to confirm your transaction.
              </p>
            </div>
          </>
        ) : network === Config.mno.TELECEL ? (
          <>
            <div className="relative flex items-start space-x-4">
              <div className="flex items-center justify-center p-1 text-white bg-orange-500 rounded-full p-">
                <FiCheckCircle className="text-lg" />
              </div>
              <p>
              Open your phone and dial *110#, then select option 6 for <span className="font-bold">My Account</span>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start space-x-4">
              <div className="flex items-center justify-center p-1 text-white bg-blue-500 rounded-full p-">
                <FiArrowRightCircle className="text-lg" />
              </div>
              <p>
              Choose option 5 for <span className="font-bold">Approvals</span>. This will show you a list of pending payment approvals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start space-x-4">
              <div className="flex items-center justify-center p-1 text-white bg-green-500 rounded-full p-">
                <FiClock className="text-lg" />
              </div>
              <p>Proceed to Resume the payment process by following the provided instructions.</p>
            </div>

            {/* Step 4 */}
            <div className="relative flex items-start space-x-4">
              <div className="flex items-center justify-center p-1 text-white bg-purple-500 rounded-full p-">
                <FiThumbsUp className="text-lg" />
              </div>
              <p>
              After that, go back to the app and click the Verify Payment button to confirm your transaction.
              </p>
            </div>
          </>
        ) : (
          <>
 <>
            <div className="relative flex items-start space-x-4">
              <div className="flex items-center justify-center p-1 text-white bg-orange-500 rounded-full p-">
                <FiCheckCircle className="text-lg" />
              </div>
              <p>
              Open your phone and dial *110#, then select option 6 for <span className="font-bold">My Account</span>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start space-x-4">
              <div className="flex items-center justify-center p-1 text-white bg-blue-500 rounded-full p-">
                <FiArrowRightCircle className="text-lg" />
              </div>
              <p>
              Choose option 5 for <span className="font-bold">Approvals</span>. This will show you a list of pending payment approvals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start space-x-4">
              <div className="flex items-center justify-center p-1 text-white bg-green-500 rounded-full p-">
                <FiClock className="text-lg" />
              </div>
              <p>Proceed to Resume the payment process by following the provided instructions.</p>
            </div>

            {/* Step 4 */}
            <div className="relative flex items-start space-x-4">
              <div className="flex items-center justify-center p-1 text-white bg-purple-500 rounded-full p-">
                <FiThumbsUp className="text-lg" />
              </div>
              <p>
              After that, go back to the app and click the Verify Payment button to confirm your transaction.
              </p>
            </div>
          </>
          </>
        )}
      </div>

      <button
        onClick={onClose}
        className="w-full px-5 py-3 mt-8 text-lg font-semibold text-white transition duration-200 bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Close
      </button>
    </div>
  </div>
);

const NetworkCard = ({ name, image }) => (
  <div className="max-w-[360px] rounded-lg border border-gray-200 bg-white shadow-md transition-transform transform dark:border-gray-700 dark:bg-gray-800">
    <img
      className="object-cover w-full rounded-t-lg h-72"
      src={image}
      alt={name}
    />
    <div className="p-4 text-center">
      <p className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
        {name}
      </p>
    </div>
  </div>
);

const PaymentVerificationCard = ({
  referenceNumber,
  amount,
  submitVerificationHandler,
  network,
}) => (
  <div className="max-w-full p-5 transition-transform transform bg-white border border-gray-200 rounded-sm shadow-md dark:border-gray-700 dark:bg-gray-800">
    <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
      Payment Details
    </h2>
    <div className="flex justify-between mb-4">
      <span className="text-gray-500 dark:text-gray-400 font-inter">
        Reference Number:
      </span>
      <span className="font-medium text-gray-800 dark:text-gray-200">
        {referenceNumber}
      </span>
    </div>
    <Separator />
    <div className="flex justify-between mb-4">
      <span className="text-gray-500 dark:text-gray-400 font-inter">
        Network:
      </span>
      <span className="font-medium text-gray-800 dark:text-gray-200">
        {network === Config.mno.MTN
          ? "MTN"
          : network === Config.mno.TELECEL
          ? "Telecel"
          : "AirtelTigo"}
      </span>
    </div>
    <Separator />
    <div className="flex justify-between mb-4">
      <span className="text-gray-500 dark:text-gray-400 font-inter">
        Amount:
      </span>
      <span className="font-medium text-gray-800 dark:text-gray-200">
        {amount}
      </span>
    </div>
    <Separator />
    <button
      type="button"
      onClick={submitVerificationHandler}
      className="w-full py-3 font-semibold text-white transition duration-200 bg-orange-600 rounded-lg hover:bg-orange-700"
    >
      Verify Payment
    </button>
  </div>
);

const Separator = () => <div className="h-[1px] bg-gray-200 my-6 w-full"></div>;

export default PaymentVerification;
