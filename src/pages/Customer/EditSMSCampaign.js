import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import tw from "tailwind-styled-components";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import SendCampaign from "components/Campaign/SendCampaign";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
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
  Label,
  SubmitBtn,
  CancelBtn,
} from "../../components/Styles/InputStyles";
import TopNavbar from "components/TopNavbar";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import { useQuery, useMutation } from "react-query";
import Config from "../../Config";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import SelectTemplate from "components/SelectTemplate";
import SendTestModel from "components/SendTestModel";
import { Seperator } from "components/ContactList/Table";
import EditMessageTemplate from "components/SMSTemplate/EditMessageTemplate";
import { useParams } from "react-router-dom";
import Loading from "components/Loading";
import NotFoundModel from "components/NotFoundModel";
// Validation schemas

const CampaignSchemaStep2 = Yup.object().shape({
  smsTemplate: Yup.string().required("Required"),
  sender: Yup.string().required("Required"),
  recipients: Yup.string().required("Required"),
});

// Main component
const EditSMSCamaign = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [campaignCharCount, setCampaignCharCount] = useState(0);
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [openTestModel, setOpenTestModel] = useState(false);
  const [type, setType] = useState(1);

  const [selectedRecipientName, setSelectedRecipientName] = useState("");
  const [selectedTemplateName, setSelectedTemplateName] = useState("");
  const [selectedTemplateMessage, setSelectedTemplateMessage] = useState("");
  const [selectedTemplateUrl, setSelectedTemplateUrl] = useState("");
  const [selectedTemplateContent, setSelectedTemplateContent] = useState("");
  const [selectedSenderName, setSelectedSenderName] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [openMessageModel, setOpenMessageModel] = useState(false);
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // Fetch function
  const fetchFunction = async (type) =>
    await axios.get(`${Config.apiUrl}/getAllListing/${type}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });

  const { isLoading, error, data, refetch } = useQuery(
    ["getContactGroups", type],
    () => fetchFunction(type),
    {
      onSuccess: () => {
        setGotInitialResp(true);
      },
      onError: (error) => {
        setGotInitialResp(true);
      },
    }
  );

  const [initialValues, setInitialValues] = useState({
    campaignId: "",
    campaignName: "",
    smsTemplate: "",
    sender: "",
    recipients: "",
  });

  useEffect(() => {
    if (data) {
      const campaignList = data.data?.campaignList;
      setInitialValues({
        campaignId: campaignList?.id || "",
        campaignName: campaignList?.name || "",
        smsTemplate: campaignList?.template_id || "",
        sender: campaignList?.sender_id || "",
        recipients: campaignList?.group_id || "",
      });
      const recipient = data.data?.contactGroupList?.find(
        (group) => group.id === campaignList?.group_id
      );
      const template = data.data?.SmsTemplateList?.find(
        (template) => template.id === campaignList?.template_id
      );
      const sender = data.data?.senderList?.find(
        (sender) => sender.id === campaignList?.sender_id
      );

      setSelectedRecipientName(recipient?.name || "");
      setSelectedTemplateName(template?.name || "");
      setSelectedTemplateMessage(template?.message || "");
      setSelectedTemplateUrl(template?.media || "");
      setSelectedTemplateContent(template?.contentType || "");
      setSelectedSenderName(sender?.sender_id || "");
    }
  }, [data]);

  //------- Add Schedule Model -------
  const ScheduleFunction = async (values) => {
    return await axios.post(`${Config.apiUrl}/campaign/sms/update`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };

  const scheduleSuccess = (data) => {
    navigate("/campaign/sms");
    setOpenUploadModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const scheduleError = (data) => {
    setOpenUploadModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: scheduleLoading, mutate: ScheduleMutate } = useMutation(
    ScheduleFunction,
    {
      onSuccess: scheduleSuccess,
      onError: scheduleError,
    }
  );

  //------- Add Send Test Model -------
  const SendTestFunction = async (values) => {
    return await axios.post(`${Config.apiUrl}/campaign/sms/test`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };

  const SendTestSuccess = (data) => {
    navigate("/campaign/sms");
    setOpenTestModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const SendTestError = (data) => {
    setOpenTestModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: SendTestLoading, mutate: SendTestMutate } = useMutation(
    SendTestFunction,
    {
      onSuccess: SendTestSuccess,
      onError: SendTestError,
    }
  );

  // Handle form submission
  const handleSubmit = async (values) => {
    setInitialValues(values);
  };
  const handleSave = (values) => {
    setInitialValues(values);
    setExpanded(false);
    console.log("Initial Values:", values);
  };
  const handleOpenTestModel = () => {
    if (initialValues.sender && initialValues.smsTemplate) {
      setOpenTestModel(true);
    } else {
      toast.error("Please select a sender and an sms template first.");
    }
  };

  const handleOpenScheduleModel = () => {
    if (
      initialValues.sender &&
      initialValues.smsTemplate &&
      initialValues.recipients
    ) {
      setOpenUploadModel(true);
    } else {
      toast.error(
        "Please select a sender, recipients and an sms template first."
      );
    }
  };

  // Edit Message

  const EditTemplateFunction = async (values) => {
    await axios.post(`${Config.apiUrl}/template/sms/edit`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };

  const editTemplateSuccess = (data, values) => {
    refetch();
    toast.success(
      data?.data?.msg || "Sms template has been updated successfully"
    );
    setOpenMessageModel(false);
    setSelectedTemplateMessage(values.message);
  };

  const editTemplateError = (data) => {
    toast.error(data?.response?.data?.msg || "An Error Occured");
    setOpenMessageModel(false);
  };

  const { isLoading: editTemplateLoading, mutate: editTemplateMutate } =
    useMutation(EditTemplateFunction, {
      onSuccess: editTemplateSuccess,
      onError: editTemplateError,
    });

  return (
    <Container>
      <Page>
        <TopNavbar />
        <div
          className={`${
            openUploadModel ? "flex" : "hidden"
          } h-screen w-screen bg-black/30 backdrop-blur-sm  fixed inset-0 transition-all duration-400 ease-in-out`}
        />

        <div
          className={`${
            openUploadModel ? "translate-x-0" : "translate-x-full"
          } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
        >
          <SendCampaign
            campaignName={initialValues.campaignName}
            campaignId={id}
            recipients={initialValues.recipients}
            sender={initialValues.sender}
            smsTemplate={initialValues.smsTemplate}
            type={type}
            setOpenUploadModel={setOpenUploadModel}
            ScheduleMutate={ScheduleMutate}
            scheduleLoading={scheduleLoading}
            selectedTemplateMessage={selectedTemplateMessage}
            setSelectedTemplateMessage={setSelectedTemplateMessage}
          />
        </div>
        {openTestModel && (
          <SendTestModel
            campaignName={initialValues.campaignName}
            recipients={initialValues.recipients}
            sender={initialValues.sender}
            smsTemplate={initialValues.smsTemplate}
            type={type}
            selectedTemplateMessage={selectedTemplateMessage}
            setSelectedTemplateMessage={setSelectedTemplateMessage}
            setOpenTestModel={setOpenTestModel}
            SendTestMutate={SendTestMutate}
            SendTestLoading={SendTestLoading}
          />
        )}

        <div
          className={`${
            openMessageModel ? "flex" : "hidden"
          } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
        />
        <div
          className={`${
            openMessageModel ? "translate-x-0" : "translate-x-full"
          } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
        >
          <EditMessageTemplate
            setOpenMessageModel={setOpenMessageModel}
            editTemplateMutate={editTemplateMutate}
            editTemplateLoading={editTemplateLoading}
            openMessageModel={openMessageModel}
            smsTemplate={initialValues.smsTemplate}
            selectedTemplateMessage={selectedTemplateMessage}
            setSelectedTemplateMessage={setSelectedTemplateMessage}
          />
        </div>
        {(isLoading || !gotInitialResp) && <Loading />}
        {(error || data?.data == false) && !isLoading && gotInitialResp && (
          <NotFoundModel />
        )}
        {!isLoading && gotInitialResp && (
          <Content>
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle className="flex">
                  <IoIosArrowRoundBack
                    className="text-blue-500 text-md mt-1.5 mr-2 "
                    onClick={() => navigate(-1)}
                  />
                  <span
                    className=" w-72 truncate"
                    data-tooltip-id={`tooltip-campaignName-${data?.data?.campaignList?.name}`}
                    data-tooltip-content={data?.data?.campaignList?.name}
                  >
                    {data?.data?.campaignList?.name}
                    <Tooltip
                      id={`tooltip-campaignName-${data?.data?.campaignList?.name}`}
                      place="top"
                      effect="solid"
                    />
                  </span>
                </HeaderTitle>
                <div className="flex">
                  <ImportButton
                    className="rounded-xl"
                    type="button"
                    // onClick={() => setOpenTestModel(true)}
                    onClick={handleOpenTestModel}
                  >
                    <p className="font-semibold">Send Test SMS</p>
                  </ImportButton>
                  <Button
                    className="rounded-xl ml-2"
                    type="submit"
                    // onClick={() => setOpenUploadModel(true)}
                    onClick={handleOpenScheduleModel}
                  >
                    <p className="font-semibold">Schedule</p>
                  </Button>
                </div>
              </div>
            </ContentHeader>

            <div className="flex">
              <div className="w-1/2 my-6">
                <Box>
                  <div className="flex justify-between">
                    <Heading>
                      {selectedTemplateName ? (
                        <FaCheckCircle className="text-orange-500 -mt-5 mr-2 text-md" />
                      ) : (
                        <FaCheckCircle className="text-[#CFCFCF] -mt-5  mr-2 text-md" />
                      )}

                      <div>
                        <h1> Message Content</h1>
                        <p className="mb-1 text-sm text-gray-600 font-normal">
                          Compose your sms
                        </p>
                      </div>
                    </Heading>
                    {initialValues.smsTemplate && (
                      // <Link
                      //   to={`/sms-template-edit/${initialValues.smsTemplate}`}
                      // >
                      <EditBtn onClick={() => setOpenMessageModel(true)}>
                        Edit
                      </EditBtn>
                      // </Link>
                    )}
                  </div>

                  <MessageContent className="flex flex-col ">
                    {selectedTemplateContent == 2 && (
                      <ContentBox className="mb-3">
                        {" "}
                        <Typography>
                          {selectedTemplateUrl || "Please select sms template"}
                        </Typography>
                      </ContentBox>
                    )}
                    <ContentBox>
                      <Typography>
                        {selectedTemplateMessage || <SelectTemplate />}
                      </Typography>
                    </ContentBox>
                  </MessageContent>
                </Box>
              </div>
              <div className="w-1/2 ml-6">
                <Formik
                  initialValues={initialValues}
                  validationSchema={CampaignSchemaStep2}
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {({ errors, touched, setFieldValue, values }) => (
                    <Form>
                      <Wrapper
                        className={`${
                          openUploadModel || openMessageModel
                            ? "blur-effect pointer-events-none"
                            : ""
                        }`}
                      >
                        <Accordion
                          expanded={expanded === "panel1"}
                          onChange={handleAccordionChange("panel1")}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon className="text-blue-500" />
                            }
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            className=" hover:bg-gray-100"
                            sx={{
                              borderBottom: "1px solid #E5E7EB",
                            }}
                          >
                            <div className="flex py-2">
                              {selectedSenderName ? (
                                <FaCheckCircle className="text-orange-500 mt-1.5 mr-2 text-sm" />
                              ) : (
                                <FaCheckCircle className="text-[#CFCFCF] mt-1.5 mr-2 text-sm" />
                              )}
                              <Typography className="flex flex-col">
                                <p className="text-lg font-semibold">Sender</p>
                                {/* </span> */}
                                <span className="text-sm text-gray-600">
                                  {selectedSenderName ||
                                    "The name your recipients see when they receive a message from you"}
                                </span>
                              </Typography>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <FormControl
                              className="mt-4 w-full "
                              variant="outlined"
                              size="small"
                            >
                              {/* <Seperator /> */}
                              <Label className="my-2">Sender Id*</Label>
                              <Select
                                value={values.sender}
                                onChange={(e) => {
                                  setFieldValue("sender", e.target.value);
                                  setSelectedSenderName(
                                    data?.data?.senderList.find(
                                      (sender) => sender.id === e.target.value
                                    )?.sender_id || ""
                                  );
                                }}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                <MenuItem value="" disabled>
                                  <em>Select Sender</em>
                                </MenuItem>
                                {data?.data?.senderList?.map((sender) => (
                                  <MenuItem key={sender.id} value={sender.id}>
                                    {sender.sender_id}
                                  </MenuItem>
                                ))}
                              </Select>
                              <div className="flex justify-end mt-4">
                                <BtnWrapper>
                                  <SubmitBtn
                                    type="button"
                                    onClick={() => {
                                      handleSubmit(values);
                                      handleSave(values);
                                    }}
                                  >
                                    Save
                                  </SubmitBtn>
                                </BtnWrapper>
                              </div>
                            </FormControl>
                            {errors.sender && touched.sender ? (
                              <Error>{errors.sender}</Error>
                            ) : null}
                          </AccordionDetails>
                        </Accordion>
                        <Accordion
                          expanded={expanded === "panel2"}
                          onChange={handleAccordionChange("panel2")}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon className="text-blue-500" />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className=" hover:bg-gray-100"
                            sx={{
                              borderBottom: "1px solid #E5E7EB",
                            }}
                          >
                            <div className="flex py-2">
                              {selectedRecipientName ? (
                                <FaCheckCircle className="text-orange-500 mt-1.5 mr-2 text-sm" />
                              ) : (
                                <FaCheckCircle className="text-[#CFCFCF] mt-1.5 mr-2 text-sm" />
                              )}
                              <Typography className="flex flex-col">
                                <p className="text-lg font-semibold">
                                  Recipients
                                </p>
                                {/* </span> */}
                                <span className="text-sm text-gray-600">
                                  {selectedRecipientName ||
                                    "The people who receive message from you"}
                                </span>
                              </Typography>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <FormControl
                              className="mt-4 w-full"
                              variant="outlined"
                              size="small"
                            >
                              <Label className="my-2">Recipients *</Label>
                              <Select
                                value={values.recipients}
                                onChange={(e) => {
                                  setFieldValue("recipients", e.target.value);
                                  setSelectedRecipientName(
                                    data?.data?.contactGroupList.find(
                                      (group) => group.id === e.target.value
                                    )?.name || ""
                                  );
                                }}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                <MenuItem value="" disabled>
                                  <em>Select Recipient Group</em>
                                </MenuItem>
                                {data?.data?.contactGroupList?.map((group) => (
                                  <MenuItem key={group.id} value={group.id}>
                                    {group.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              <div className="flex justify-end mt-4">
                                <BtnWrapper>
                                  <SubmitBtn
                                    type="button"
                                    onClick={() => {
                                      handleSubmit(values);
                                      handleSave(values);
                                    }}
                                  >
                                    Save
                                  </SubmitBtn>
                                </BtnWrapper>
                              </div>
                            </FormControl>
                            {errors.recipients && touched.recipients ? (
                              <Error>{errors.recipients}</Error>
                            ) : null}
                          </AccordionDetails>
                        </Accordion>

                        <Accordion
                          expanded={expanded === "panel3"}
                          onChange={handleAccordionChange("panel3")}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon className="text-blue-500" />
                            }
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                            className=" hover:bg-gray-100"
                            sx={{
                              borderBottom: "1px solid #E5E7EB",
                            }}
                          >
                            <div className="flex py-2">
                              {selectedTemplateName ? (
                                <FaCheckCircle className="text-orange-500 mt-1.5 mr-2 text-sm" />
                              ) : (
                                <FaCheckCircle className="text-[#CFCFCF] mt-1.5 mr-2 text-sm" />
                              )}
                              <Typography className="flex flex-col">
                                <p className="text-lg font-semibold">
                                  SMS Template
                                </p>
                                {/* </span> */}
                                <span className="text-sm text-gray-600">
                                  {selectedTemplateName ||
                                    "The message template you will send"}
                                </span>
                              </Typography>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <FormControl
                              className="mt-4 w-full"
                              variant="outlined"
                              size="small"
                            >
                              <Label className="my-2">SMS Template *</Label>
                              <Select
                                value={values.smsTemplate}
                                onChange={(e) => {
                                  setFieldValue("smsTemplate", e.target.value);
                                  const selectedTemplate =
                                    data?.data?.SmsTemplateList.find(
                                      (template) =>
                                        template.id === e.target.value
                                    );
                                  setSelectedTemplateName(
                                    selectedTemplate?.name || ""
                                  );
                                  setSelectedTemplateMessage(
                                    selectedTemplate?.message || ""
                                  );
                                  setSelectedTemplateUrl(
                                    selectedTemplate?.media || ""
                                  );
                                  setSelectedTemplateContent(
                                    selectedTemplate?.contentType || ""
                                  );
                                }}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                <MenuItem value="" disabled>
                                  <em>Select Template</em>
                                </MenuItem>
                                {data?.data?.SmsTemplateList?.map(
                                  (template) => (
                                    <MenuItem
                                      key={template.id}
                                      value={template.id}
                                    >
                                      {template.name}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                              <div className="flex justify-end mt-4">
                                <BtnWrapper>
                                  <SubmitBtn
                                    type="button"
                                    onClick={() => {
                                      handleSubmit(values);
                                      handleSave(values);
                                    }}
                                  >
                                    Save
                                  </SubmitBtn>
                                </BtnWrapper>
                              </div>
                            </FormControl>
                            {errors.smsTemplate && touched.smsTemplate ? (
                              <Error>{errors.smsTemplate}</Error>
                            ) : null}
                          </AccordionDetails>
                        </Accordion>
                      </Wrapper>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </Content>
        )}
      </Page>
    </Container>
  );
};

const Contents = tw.section`py-10 px-8 max-w-2xl mx-auto `;
const Wrapper = tw.div`grid  my-6 `;
const Error = tw.div`text-red-500 text-xs italic mb-4`;
const BtnWrapper = tw.div`flex justify-center items-center `;
const MediaCharCount = tw.div`absolute top-2.5 right-2 text-xs text-gray-400`;
const Button = tw.button`mr-4 bg-orange-500 text-white hover:bg-orange-600 px-8  items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded-md items-center`;
const ImportButton = tw.button`text-black border border-gray-300  hover:bg-gray-200 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded`;
const Box = tw.div`border border-gray-200 rounded-lg p-4  `;
const Heading = tw.h1`text-lg pb-2 px-2 font-semibold flex items-center`;
const MessageContent = tw.div`p-4 bg-gray-100 rounded-lg flex justify-center py-14 px-14 h-screen overflow-y-auto`;
const ContentBox = tw.div`p-4 bg-white rounded-lg shadow-md text-left whitespace-pre-line overflow-y-auto`;
const EditBtn = tw.button`
text-sm  w-32  md:w-20 h-10 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed font-medium  md:text-base bg-transparent hover:bg-gray-400 text-black  rounded-xl border border-gray-300`;
export default EditSMSCamaign;
