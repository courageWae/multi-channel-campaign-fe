import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import tw from "tailwind-styled-components";
import { useSelector } from "react-redux";
import {
  Page,
  Container,
  Content,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
} from "components/Styles/PageStyles";
import {
  InputGroup,
  FieldWrappers,
  Label,
  SubmitBtn,
  CancelBtn,
} from "components/Styles/InputStyles";
import TopNavbar from "components/TopNavbar";
import { useNavigate } from "react-router-dom";

import { useQuery } from "react-query";
import Config from "../../Config";
import CreateSurvey from "components/UssdSurveyBuilder/CreateSurvey";
import { RiSurveyLine } from "react-icons/ri";
import NoPermissionModal from "components/NoPermission";

// Validation schemas
const SurveySchemaStep1 = Yup.object().shape({
  surveyTitle: Yup.string().required("A Survey Title is required"),
});


// Main component
const UssdSurveyCreation = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [titleCharCount, setTitleCharCount] = useState(0);
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [type, setType] = useState(4);
  const [initialValues, setInitialValues] = useState({
    surveyTitle: "",
    surveyData: "",
    rawData: "",
  });
  const [selectedSurveyTitle, setSelectedSurveyTitle] = useState("");
  const [copied, setIsCopied] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canCreate, setCanCreate] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Config.apiUrl}/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Token: user?.token,
          },
        });

        const { data } = response;
        if (isMounted && data) {
          console.log("dashboardData", data);
          
          //* STORE THE PERMISSIONS
          setDashboardData((data?.data?.permissions));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (user?.token) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [user?.token]);
  
  useEffect(() => {
    const permissions = dashboardData ? dashboardData.split(",") : [];

    if (
      (permissions.includes(Config.Permissions.USSD) &&
        user?.type === Config.UserType.ClientUser) ||
      user?.type === Config.UserType.SuperAdminUser ||
      user?.type === Config.UserType.CommercialAdminUser ||
      user?.type === Config.UserType.FinanceAdminUser
    ) {
      setCanCreate(true);
    } else {
      setCanCreate(false);
    }
  }, [user, dashboardData]);


  //Todo => Handle redirect after a callback

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

  // Handle form submission
  const handleSubmit = async (values) => {
    if (step === 1) {
      setInitialValues(values);
      setSelectedSurveyTitle(values.surveyTitle);
      localStorage.setItem("surveyTitle", values.surveyTitle);
      setStep(2);
    } else {
      setInitialValues(values);

      console.log("Initial Values:", values);
    }
  };

  //Todo => Cancel The process
  const cancelSurveyCreation = () => {
    //* clear the ussd-storage from session storage
    if (localStorage.getItem("ussd-storage")) {
      localStorage.removeItem("ussd-storage");
    }
    navigate("/ussd-survey");
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => setIsCopied(false), 2000);
    }
    return () => {
      clearTimeout();
    };
  }, [copied]);


  return (
    <Container>
      <Page>
        {step===1?<TopNavbar /> :null}
        <div
          className={`${
            openUploadModel ? "flex" : "hidden"
          } h-screen w-screen bg-black/30 backdrop-blur-sm  fixed inset-0 transition-all duration-400 ease-in-out z-50`}
        />
        {step === 1 && (
          <Contents>
            {
              !canCreate && !loading && (
                <NoPermissionModal isOpen={true} planType={user?.planType} />
              )
            }
            <ContentHeader>
              <HeaderTitle>Create USSD Survey</HeaderTitle>
              <HeaderSubTitle className="mt-6">
                Engage your audience with a quick USSD survey. Gather valuable
                feedback effortlessly!
              </HeaderSubTitle>
            </ContentHeader>

            <Formik
              initialValues={initialValues}
              validationSchema={SurveySchemaStep1}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form>
                  <Wrapper>
                    <InputGroup>
                      <Label htmlFor="surveyTitle">
                        How will you name your survey?
                      </Label>
                      <FieldWrappers>
                        <Field
                          type="text"
                          name="surveyTitle"
                          id="surveyTitle"
                          placeholder="Type the name of your survey"
                          autoComplete="off"
                          required
                          maxLength="60"
                          onChange={(e) => {
                            setFieldValue("surveyTitle", e.target.value);
                            setTitleCharCount(e.target.value.length);
                          }}
                          value={values.surveyTitle}
                        />
                        <MediaCharCount>{titleCharCount}/60</MediaCharCount>
                      </FieldWrappers>
                      {errors.surveyTitle && touched.surveyTitle ? (
                        <Error>{errors.surveyTitle}</Error>
                      ) : null}
                    </InputGroup>
                  </Wrapper>
                  <div className="flex justify-end mt-8">
                    <CancelBtn
                      className="mr-4"
                      type="button"
                      onClick={cancelSurveyCreation}
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
        {step === 2 && data && (
          <Content>
            <SurveyHeader>
              <HeaderTitle>
                <div className="flex items-center gap">
                  <RiSurveyLine className="mr-2 text-orange-500" />
                  {selectedSurveyTitle}
                </div>
              </HeaderTitle>
              <div className="">
              </div>
            </SurveyHeader>
            <CreateSurvey setStep={setStep} />
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
const SurveyHeader = tw.section`flex gap-2 justify-between items-center`;
export default UssdSurveyCreation;
