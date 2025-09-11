import React, { useState, useRef } from "react";
import tw from "tailwind-styled-components";
import { Link, useParams } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import { useQuery } from "react-query";
import axios from "axios";
import Config from "../../Config";
import Loading from "components/Loading";
import NotFoundModel from "components/NotFoundModel";
import { useSelector } from "react-redux";
import ViewModel from "components/Campaign/ViewModel";
import Spinner from "components/Spinner";
import {
  Page,
  Container,
  Content,
  ContentHeader,
  HeaderTitle,
} from "../../components/Styles/PageStyles";
import { Label } from "../../components/Styles/InputStyles";
import SemiCircularProgressBar from "../../components/Campaign/SemiCircularProgressBar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaDownload } from "react-icons/fa";

const WhatsappCampaignReport = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const { id } = useParams();
  const reportRef = useRef(null);
  const [viewModel, setViewModel] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [fullMessageView, setFullMessageView] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const fetchFunction = async () =>
    await axios.get(
      `${Config.apiUrl}/campaign/whatsapp/generate/report/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Token: `${user.token}`,
        },
      }
    );

  const { isLoading, error, data } = useQuery("adminApi", fetchFunction, {
    onSuccess: () => {
      setGotInitialResp(true);
    },
    onError: (error) => {
      setGotInitialResp(true);
    },
  });

  const reportData = data?.data;
  console.log(reportData);

  const stats = [
    { label: "Pending", number: reportData?.pending, color: "#fde047" },
    { label: "Sent", number: reportData?.sent, color: "#d8b4fe" },
    {
      label: "Delivered",
      number: reportData?.deliveredCount,
      color: "#86efac",
    },
    { label: "Failed", number: reportData?.failedCount, color: "#fca5a5" },
    { label: "Frozen", number: reportData?.total_block, color: "#fdba74" },
  ];

  const handleExport = () => {
    setIsExporting(true);
    setFullMessageView(true);

    setTimeout(() => {
      const input = reportRef.current;

      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("report.pdf");

        setFullMessageView(false);
        setIsExporting(false);
      });
    }, 0);
  };

  const message = reportData?.message;
  const status = reportData?.status;
  const showMoreButton = message?.length > 60;

  const getStatus = (status) => {
    if (status === 1) {
      return <span>Scheduled</span>;
    } else if (status === 2) {
      return <span>Running</span>;
    } else if (status === 3) {
      return <span>Sent</span>;
    } else {
      return <span>Pending</span>;
    }
  };

  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          {viewModel && (
            <ViewModel setViewModel={setViewModel} message={message} selectedData={selectedData ?? {}}/>
          )}
          {(isLoading || !gotInitialResp) && <Loading />}
          {(error || data?.data == false) && !isLoading && gotInitialResp && (
            <NotFoundModel />
          )}
          {!isLoading && gotInitialResp && !error && (
            <Content ref={reportRef}>
              <ContentHeader>
                <div className="flex items-center justify-between">
                  <Link to="/campaign/sms">
                    <HeaderTitle className="hover:underline hover:text-blue-500">
                      {reportData.name}
                    </HeaderTitle>
                  </Link>

                  <Button
                    // className="rounded-xl"
                    className={`rounded-xl ${isExporting ? "hidden" : ""}`}
                    type="button"
                    onClick={handleExport}
                    disabled={isExporting}
                  >
                    {isExporting ? (
                      <Spinner />
                    ) : (
                      <>
                        <FaDownload size={18} />
                        <p className="font-semibold">Export</p>
                      </>
                    )}
                  </Button>
                </div>
              </ContentHeader>
              <div className="flex md:flex-row flex-col space-x-10">
                <div className="md:w-1/2 w-full">
                  <div className="flex justify-between my-6">
                    <Status>
                      <Label className="mb-2">Status:</Label>
                      {getStatus(status)}
                    </Status>
                    <Status>
                      <Label className="mb-2">From Number:</Label>
                      {reportData.sender_id}
                    </Status>
                  </div>
                  <Status>
                    <Label className="mb-2">Message:</Label>
                    <Message id="message-content">
                      {fullMessageView ? (
                        message
                      ) : showMoreButton ? (
                        <>
                          {message.substring(0, 60)}...
                          <button
                            onClick={() => setViewModel(true)}
                            className="text-blue-500 ml-2 underline"
                          >
                            More
                          </button>
                        </>
                      ) : (
                        message
                      )}
                    </Message>
                  </Status>
                  <Info>
                    <InfoItem>
                      <div>Created</div>
                      <div>
                        📅 {new Date(reportData.created_at).toLocaleString()}
                      </div>
                    </InfoItem>
                    <InfoItem>
                      <div>Activated</div>
                      <div>
                        📅 {new Date(reportData.schedule).toLocaleString()}
                      </div>
                    </InfoItem>
                    <InfoItem>
                      <div>Last Text</div>
                      <div>
                        📅 {new Date(reportData.updated_at).toLocaleString()}
                      </div>
                    </InfoItem>
                  </Info>
                </div>
                <div className="md:w-1/2 w-full border border-gray-100 rounded-md p-20">
                  <div className="flex flex-col items-center">
                    <SemiCircularProgressBar
                      percentage={reportData.totalProcessed}
                      totalCost={reportData.totalCost}
                    />
                  </div>
                </div>
              </div>
              <Stats>
                {stats.map((stat, index) => (
                  <StatBox key={index} style={{ backgroundColor: stat.color }}>
                    <StatNumber>{stat.number}</StatNumber>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatBox>
                ))}
              </Stats>
            </Content>
          )}
        </Page>
      </Container>
    </>
  );
};

const Status = tw.span`py-1 text-lg font-bold flex flex-col text-green-600`;
const Message = tw.div`p-4 mb-6 bg-purple-100 text-base font-normal whitespace-pre-line rounded-lg text-purple-900`;
const Info = tw.div`flex justify-between mb-6`;
const InfoItem = tw.div`text-sm text-gray-700 border border-gray-100 p-5 font-medium`;
const Stats = tw.div`flex justify-between mt-4`;
const StatBox = tw.div`flex-1 p-6 bg-gray-100 rounded-lg m-2 text-center`;
const StatNumber = tw.div`text-2xl font-bold`;
const StatLabel = tw.div`text-sm text-gray-900`;

const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded items-center`;

export default WhatsappCampaignReport;
