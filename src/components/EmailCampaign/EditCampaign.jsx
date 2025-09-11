import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import tw from "tailwind-styled-components";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import SelectTemplate from "components/EmailCampaign/SelectEmailTemplate";
import SendTestEmail from "components/EmailCampaign/SendTestEmail";
import { Tooltip } from "react-tooltip";
import PreviewSelectedEmail from "../../components/EmailCampaign/PreviewSelectedEmail";
import Loading from "components/Loading";
import UpdateCampaign from "./UpdateCampaign";
import { TextField } from "@mui/material";
import { MdOutlineEmail } from "react-icons/md";

// Validation schemas
const CampaignSchemaStep1 = Yup.object().shape({
  campaignName: Yup.string().required("Campaign name is required"),
});

const CampaignSchemaStep2 = Yup.object().shape({
  emailTemplate: Yup.string().required("Required"),
  sender: Yup.string().required("Required"),
  recipients: Yup.string().required("Required"),
});

function useQueryHook() {
  return new URLSearchParams(useLocation().search);
}

// Main component
const EditCampaign = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const navigate = useNavigate();
  const [step, setStep] = useState(2);
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [campaignCharCount, setCampaignCharCount] = useState(0);
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [openTestModel, setOpenTestModel] = useState(false);
  const [type, setType] = useState(4);
  const [initialValues, setInitialValues] = useState({
    campaignName: "",
    templateId: "",
    senderId: "",
    groupId: "",
    campaignId: "",
    subject: "",
  });
  const [selectedRecipientName, setSelectedRecipientName] = useState("");
  const [selectedTemplateName, setSelectedTemplateName] = useState("");
  const [selectedSenderName, setSelectedSenderName] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [openMessageModel, setOpenMessageModel] = useState(false);
  const [templateId, setTemplateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");

  // Todo => Handle Time States
  const [default_date, setDefaultDateValue] = useState("");
  const [default_hours, setDefaultHoursValue] = useState("");
  const [default_minutes, setDefaultMinutesValue] = useState("");
  const [default_AmPm, setDefaultAmPmValue] = useState("");
  const [scheduleStatus, setScheduleStatus] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const { id } = useParams();

  // Todo => Get the schedule time
  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const campaignResponse = await axios.get(
            `${Config.apiUrl}/getAllListing/${Config.CampaignType.Email}/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Token: `${user.token}`,
              },
            }
          );

          if (campaignResponse) {
            const campaignData = await campaignResponse.data.campaignList;
            setInitialValues({
              campaignName: campaignData.name,
              templateId: campaignData.template_id,
              senderId: campaignData.sender_id,
              groupId: campaignData.group_id,
              campaignId: id,
              subject: campaignData.subject,
            });
            setSubject(campaignData.subject);
            setTemplateId(campaignData.template_id);

            const schedule_date = campaignData.schedule;

            if (schedule_date != null) {
              setScheduleStatus(true);
              const scheduleDate = new Date(schedule_date);
              scheduleDate.setMinutes(scheduleDate.getMinutes() + 15);

              const date = scheduleDate.toISOString().split("T")[0];
              let hours = scheduleDate.getHours();
              const minutes = String(scheduleDate.getMinutes()).padStart(
                2,
                "0"
              );
              const ampm = hours >= 12 ? "PM" : "AM";

              hours = hours % 12;
              hours = hours ? hours : 12;

              setDefaultDateValue(date);
              setDefaultHoursValue(String(hours).padStart(2, "0"));
              setDefaultMinutesValue(minutes);
              setDefaultAmPmValue(ampm);
            }
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
          console.log("Finally");
        }
      };
      fetchData();
    }
  }, [id, user.token]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //Todo => Handle redirect after a callback
  const query = useQueryHook();
  const key = query.get("key");

  useEffect(() => {
    if (key && key === "campaign_update") {
      const initial_values = localStorage.getItem("initialValues");
      const templateName = localStorage.getItem("selectedTemplateName");
      const recipientName = localStorage.getItem("selectedRecipientName");
      const senderName = localStorage.getItem("selectedSenderName");
      const template_id = localStorage.getItem("templateId");

      // Todo => Set the state values using the values in the localStorage
      setInitialValues(JSON.parse(initial_values));
      setSelectedRecipientName(recipientName);
      setSelectedTemplateName(templateName);
      setSelectedSenderName(senderName);
      setTemplateId(template_id);
      setStep(2);
    }
  }, [key]);

  //* Fetch the details fo the scheduled email campaign

  // Fetch function
  const fetchFunction = async (type) =>
    await axios.get(`${Config.apiUrl}/getAllListing/${type}`, {
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

  useEffect(() => {}, [templateId]);

  useEffect(() => {
    if (data) {
      const recipient = data.data?.contactGroupList?.find(
        (group) => group.id === initialValues.groupId
      );
      const template = data.data?.emailTemplateList?.find(
        (template) => template.id === initialValues.templateId
      );
      const sender = data.data?.senderList?.find(
        (sender) => sender.id === initialValues.senderId
      );

      setSelectedRecipientName(recipient?.name || "");
      setSelectedTemplateName(template?.name || "");
      setSelectedSenderName(sender?.name || "");
      setSelectedEmail(sender?.email_id || "");
    }
  }, [initialValues, data]);

  //------- Add Schedule Model -------
  const ScheduleFunction = async (values) => {
    return await axios.post(`${Config.apiUrl}/campaign/email/update`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };

  const scheduleSuccess = (data) => {
    navigate("/email-campaign");
    setOpenUploadModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const scheduleError = (data) => {
    setOpenUploadModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occurred");
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
    return await axios.post(`${Config.apiUrl}/campaign/email/test`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };

  const SendTestSuccess = (data) => {
    navigate("/email/campaign/update");
    setStep(2);
    setOpenTestModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const SendTestError = (data) => {
    setOpenTestModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occurred");
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
    if (step === 1) {
      setInitialValues(values);
      setStep(2);
    } else {
      setInitialValues(values);

      console.log("Initial Values:", values);
    }
  };
  const handleSave = (values) => {
    setInitialValues(values);
    setExpanded(false);
    console.log("Initial Values:", values);
  };
  const handleOpenTestModel = () => {
    if (initialValues.senderId && initialValues.templateId && initialValues.subject) {
      setOpenTestModel(true);
    } else {
      toast.error("Please select a subject, sender and an email template first.");
    }
  };

  const handleOpenScheduleModel = () => {
    if (
      initialValues.senderId &&
      initialValues.templateId &&
      initialValues.groupId &&
      initialValues.subject
    ) {
      setOpenUploadModel(true);
    } else {
      toast.error(
        "Please select a subject, sender, recipients and an email template first."
      );
    }
  };

  const redirectToTemplateEdit = () => {
    if (templateId) {
      //* store the campaignName, initialValues, selectedTemplateName, selectedSenderName and SelectedRecipientName in localStorage
      localStorage.setItem("initialValues", JSON.stringify(initialValues));
      localStorage.setItem("selectedTemplateName", selectedTemplateName);
      localStorage.setItem("selectedRecipientName", selectedRecipientName);
      localStorage.setItem("setSelectedSenderName", setSelectedSenderName);
      localStorage.setItem("templateId", templateId);
      localStorage.setItem("campaignId", id);
      localStorage.setItem("subject", subject);

      //* Adding an extra parameter to the edit url to indicate this edit is originating from the campaign page
      const params = new URLSearchParams();
      params.append("edit", "campaign_update");

      //* Redirecting the user to the edit page to edit the template
      navigate(`/edit/email-template/build/${templateId}?${params.toString()}`);
    }
  };

  //Todo => Cancel The process
  const cancelCampaignProcess = () => {
    if (key && key === "campaign_update") {
      localStorage.removeItem("initialValues");
      localStorage.removeItem("selectedTemplateName");
      localStorage.removeItem("selectedRecipientName");
      localStorage.removeItem("setSelectedSenderName");
      localStorage.removeItem("templateId");
      localStorage.removeItem("subject");
    }

    navigate("/email-campaign");
  };

  console.log("subject", subject);

  return (
    <Container>
      <Page>
        <TopNavbar />
        <div
          className={`${
            openUploadModel ? "flex" : "hidden"
          } h-screen w-screen bg-black/30 backdrop-blur-sm  fixed inset-0 transition-all duration-400 ease-in-out z-50`}
        />

        <div
          className={`${
            openUploadModel ? "translate-x-0" : "translate-x-full"
          } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
        >
          <UpdateCampaign
            campaignName={initialValues.campaignName}
            groupId={initialValues.groupId}
            senderId={initialValues.senderId}
            templateId={initialValues.templateId}
            subject={initialValues.subject}
            type={type}
            prevSubject={subject}
            isScheduled={scheduleStatus}
            id={id}
            setOpenUploadModel={setOpenUploadModel}
            ScheduleMutate={ScheduleMutate}
            scheduleLoading={scheduleLoading}
            default_date={default_date}
            default_hours={default_hours}
            default_minutes={default_minutes}
            default_AmPm={default_AmPm}
          />
        </div>
        {openTestModel && (
          <SendTestEmail
            senderId={initialValues.senderId}
            templateId={initialValues.templateId}
            type={type}
            setOpenTestModel={setOpenTestModel}
            SendTestMutate={SendTestMutate}
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
        ></div>

        {step === 1 && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <Contents>
                <ContentHeader>
                  <HeaderTitle>Edit Email Campaign</HeaderTitle>
                  <HeaderSubTitle className="mt-6">
                    Update your email campaign! Connect with your customers by
                    sharing important news, promoting new products, and
                    announcing upcoming events.
                  </HeaderSubTitle>
                </ContentHeader>

                <Formik
                  initialValues={initialValues}
                  validationSchema={CampaignSchemaStep1}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                      <Wrapper>
                        <InputGroup>
                          <Label htmlFor="campaignName">
                            Do you want to change the campaign name? (only you
                            can see it)
                          </Label>
                          <FieldWrappers>
                            <Field
                              type="text"
                              name="campaignName"
                              id="campaignName"
                              placeholder="Type the name of your campaign"
                              autoComplete="off"
                              required
                              maxLength="60"
                              onChange={(e) => {
                                setFieldValue("campaignName", e.target.value);
                                setCampaignCharCount(e.target.value.length);
                              }}
                              value={values.campaignName}
                            />
                            <MediaCharCount>
                              {campaignCharCount}/60
                            </MediaCharCount>
                          </FieldWrappers>
                          {errors.campaignName && touched.campaignName ? (
                            <Error>{errors.campaignName}</Error>
                          ) : null}
                        </InputGroup>
                      </Wrapper>
                      <div className="flex justify-end mt-8">
                        <CancelBtn
                          className="mr-4"
                          type="button"
                          onClick={cancelCampaignProcess}
                        >
                          Cancel
                        </CancelBtn>
                        <BtnWrapper>
                          <SubmitBtn type="submit">Next</SubmitBtn>
                        </BtnWrapper>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Contents>
            )}
          </>
        )}

        {step === 2 && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <Content>
                <ContentHeader>
                  <div className="flex items-center justify-between">
                    <HeaderTitle className="flex ">
                      <IoIosArrowRoundBack
                        className="text-blue-500 text-md mt-1.5 mr-2"
                        onClick={cancelCampaignProcess}
                      />
                      <span
                        className=" w-72 truncate"
                        data-tooltip-id={`tooltip-campaignName-${initialValues.campaignName}`}
                        data-tooltip-content={initialValues.campaignName}
                      >
                        {initialValues.campaignName}
                        <Tooltip
                          id={`tooltip-campaignName-${initialValues.campaignName}`}
                          place="top"
                          effect="solid"
                        />
                      </span>
                    </HeaderTitle>
                    <div className="flex">
                      <ImportButton
                        className="rounded-xl"
                        type="button"
                        onClick={handleOpenTestModel}
                      >
                        <p className="font-semibold">Send Test Email</p>
                      </ImportButton>
                      <Button
                        className="rounded-xl ml-2"
                        type="submit"
                        onClick={handleOpenScheduleModel}
                      >
                        <p className="font-semibold">Update Schedule</p>
                      </Button>
                    </div>
                  </div>
                </ContentHeader>

                <div className="flex">
                  <div className="w-1/2 my-6 md:block hidden">
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
                              Compose your Email
                            </p>
                          </div>
                        </Heading>
                        {initialValues.templateId && (
                          <EditBtn
                            style={{ background: "#A7A7A7" }}
                            onClick={redirectToTemplateEdit}
                          >
                            Edit
                          </EditBtn>
                        )}
                      </div>

                      <MessageContent className="flex flex-col ">
                        <ContentBox>
                          {selectedTemplateName ? (
                            <PreviewSelectedEmail templateId={templateId} />
                          ) : (
                            <SelectTemplate />
                          )}
                        </ContentBox>
                      </MessageContent>
                    </Box>
                  </div>
                  <div className="md:w-1/2 w-full ml-6">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={CampaignSchemaStep2}
                      onSubmit={handleSubmit}
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
                            {/* Todo => Subject for the email appended */}
                            <Accordion
                              expanded={expanded === "panel4"}
                              onChange={handleAccordionChange("panel4")}
                            >
                              <AccordionSummary
                                expandIcon={
                                  <ExpandMoreIcon className="text-blue-500" />
                                }
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                                className=" hover:bg-gray-100"
                                sx={{
                                  borderBottom: "1px solid #E5E7EB",
                                }}
                              >
                                <div className="flex py-2">
                                  {initialValues.subject ? (
                                    <FaCheckCircle className="text-orange-500 mt-1.5 mr-2 text-sm" />
                                  ) : (
                                    <FaCheckCircle className="text-[#CFCFCF] mt-1.5 mr-2 text-sm" />
                                  )}
                                  <Typography className="flex flex-col">
                                    <p className="text-lg font-semibold">
                                      Email Subject
                                    </p>
                                    {/* </span> */}
                                    <span className="text-sm text-gray-600">
                                      {subject ||
                                        "The subject for the email..."}
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
                                  <Label className="my-2">Email Subject*</Label>
                                  <TextField
                                    value={values.subject}
                                    onChange={(e) => {
                                      setFieldValue("subject", e.target.value);
                                      setSubject(e.target.value);
                                    }}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                  ></TextField>
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
                                {errors.subject && touched.subject ? (
                                  <Error>{errors.subject}</Error>
                                ) : null}
                              </AccordionDetails>
                            </Accordion>
                            {/* End of the subject */}
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
                                  {initialValues.senderId ? (
                                    <FaCheckCircle className="text-orange-500 mt-1.5 mr-2 text-sm" />
                                  ) : (
                                    <FaCheckCircle className="text-[#CFCFCF] mt-1.5 mr-2 text-sm" />
                                  )}
                                  <Typography className="flex flex-col">
                                    <p className="text-lg font-semibold">
                                      Email Sender
                                    </p>
                                    {/* </span> */}
                                    <span className="text-sm text-gray-600">
                                      {selectedSenderName ||
                                        "The name your recipients see when they receive a message from you"}
                                    </span>
                                    <span className="text-sm text-gray-500 mt-1 font-medium flex items-center">
                                      {selectedEmail ? (
                                        <>
                                          <MdOutlineEmail className="mr-1" />
                                          {selectedEmail}
                                        </>
                                      ) : null}
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
                                  <Label className="my-2">Email Sender*</Label>
                                  <Select
                                    value={values.senderId}
                                    onChange={(e) => {
                                      setFieldValue("senderId", e.target.value);
                                      setSelectedSenderName(
                                        data?.data?.senderList.find(
                                          (sender) =>
                                            sender.id === e.target.value
                                        )?.name || ""
                                      );
                                    }}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                  >
                                    <MenuItem value="" disabled>
                                      <em>Select Sender</em>
                                    </MenuItem>
                                    {data?.data?.senderList?.map((sender) => (
                                      <MenuItem
                                        key={sender.id}
                                        value={sender.id}
                                      >
                                        {sender.name}
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
                                {errors.senderId && touched.senderId ? (
                                  <Error>{errors.senderId}</Error>
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
                                  {initialValues.groupId ? (
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
                                    value={values.groupId}
                                    onChange={(e) => {
                                      setFieldValue("groupId", e.target.value);
                                      setSelectedRecipientName(
                                        data?.data?.contactGroupList.find(
                                          (group) => group.id === e.target.value
                                        )?.name || ""
                                      );
                                    }}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                  >
                                    <MenuItem value="" disabled>
                                      <em>Select Recipient Group</em>
                                    </MenuItem>
                                    {data?.data?.contactGroupList?.map(
                                      (group) => (
                                        <MenuItem
                                          key={group.id}
                                          value={group.id}
                                        >
                                          {group.name}
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
                                {errors.groupId && touched.groupId ? (
                                  <Error>{errors.groupId}</Error>
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
                                  {initialValues.templateId ? (
                                    <FaCheckCircle className="text-orange-500 mt-1.5 mr-2 text-sm" />
                                  ) : (
                                    <FaCheckCircle className="text-[#CFCFCF] mt-1.5 mr-2 text-sm" />
                                  )}
                                  <Typography className="flex flex-col">
                                    <p className="text-lg font-semibold">
                                      Email Template
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
                                  <Label className="my-2">
                                    Email Template *
                                  </Label>
                                  <Select
                                    value={values.templateId}
                                    onChange={(e) => {
                                      setFieldValue(
                                        "templateId",
                                        e.target.value
                                      );
                                      const selectedTemplate =
                                        data?.data?.emailTemplateList.find(
                                          (template) =>
                                            template.id === e.target.value
                                        );
                                      setSelectedTemplateName(
                                        selectedTemplate?.name || ""
                                      );
                                      setTemplateId(selectedTemplate?.id || "");
                                    }}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                  >
                                    <MenuItem value="" disabled>
                                      <em>Select Template</em>
                                    </MenuItem>
                                    {data?.data?.emailTemplateList?.map(
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
                                {errors.templateId && touched.templateId ? (
                                  <Error>{errors.templateId}</Error>
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
          </>
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
const MessageContent = tw.div`p-4 bg-gray-100 rounded-lg h-dvh overflow-y-auto`;
const ContentBox = tw.div`p-2 bg-white rounded-lg shadow-md text-left overflow-y-auto`;
const EditBtn = tw.button`text-sm  w-32  md:w-20 h-10 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed font-medium  md:text-base bg-transparent hover:bg-gray-400 text-black  rounded-xl border border-gray-400`;
export default EditCampaign;
