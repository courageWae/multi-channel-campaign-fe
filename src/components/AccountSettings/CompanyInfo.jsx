import axios from "axios";
import Loading from "components/Loading";
import Config from "Config";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  FaBusinessTime,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import tw from "tailwind-styled-components";

const CompanyInfo = ({ user, setTab }) => {
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchFunction = async (values) =>
    await axios.get(`${Config.apiUrl}/profile/get/info`, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user?.token}`,
      },
    });

  const getListSuccess = (data) => {
    setGotInitialResp(true);
    formik.setValues({
      companyName: data?.data?.company_name || "",
      companyEmail: data?.data?.email || "",
      companyAddress: data?.data?.company_address || "",
      contactPersonPhone: data?.data?.contact_person_phone || "",
      supportPersonPhone: data?.data?.support_person_phone || "",
      contactPersonName: data?.data?.contact_person_name || "",
      supportPersonName: data?.data?.support_person_name || "",
    });
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

  const updateCompanyDetails = async (values) => {
    setIsUpdating(true);
    await axios.post(
      `${Config.apiUrl}/profile/edit/companydetails`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          Token: `${user?.token}`,
        },
      }
    );
  };

  const updateSuccess = () => {
    setIsUpdating(false);
    toast.success("Details updated successfully");
    setTab(2);
    getListMutate();
  };

  const updateError = () => {
    setIsUpdating(false);
    setTab(2);
    toast.error("Something went wrong");
    getListMutate();
  };

  const { mutate: updateMutate } = useMutation(updateCompanyDetails, {
    onSuccess: updateSuccess,
    onError: updateError,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      getListMutate();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [getListMutate]);

  const formik = useFormik({
    initialValues: {
      companyName: data?.data?.company_name || "",
      companyEmail: data?.data?.company_email || "",
      companyAddress: data?.data?.company_address || "",
      contactPersonPhone: data?.data?.contact_person_phone || "",
      contactPersonName: data?.data?.contact_person_name || "",
      supportPersonPhone: data?.data?.support_person_phone || "",
      supportPersonName: data?.data?.support_person_name || "",
    },
    validate: (values) => {
      const errors = {};
      
      // Required fields validation
      if (!values.companyName) errors.companyName = 'Company name is required';
      if (!values.companyEmail) errors.companyEmail = 'Company email is required';
      if (!values.companyAddress) errors.companyAddress = 'Company address is required';
      if (!values.contactPersonName) errors.contactPersonName = 'Contact person name is required';
      if (!values.contactPersonPhone) errors.contactPersonPhone = 'Contact person phone is required';
      
      // Phone number validation
      const phoneRegex = /^0\d{9}$/;
      if (values.contactPersonPhone && !phoneRegex.test(values.contactPersonPhone)) {
        errors.contactPersonPhone = 'Phone number must be 10 digits and start with 0';
      }
      if (values.supportPersonPhone && !phoneRegex.test(values.supportPersonPhone)) {
        errors.supportPersonPhone = 'Phone number must be 10 digits and start with 0';
      }
      
      // Email validation
      if (values.companyEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.companyEmail)) {
        errors.companyEmail = 'Invalid email address';
      }

      return errors;
    },
    onSubmit: (values) => {
      updateMutate(values);
    },
  });

  if (isUpdating) {
    return <Loading />;
  }

  return (
    <>
      {isLoading && !gotInitialResp ? (
        <Loading />
      ) : !isLoading && gotInitialResp ? (
        <CompanyInfoContainer>
          <CompanyCard>
            <Header>
              <div className="flex-1">
                <Title>Company Information</Title>
                <SubTitle>Update your company details here</SubTitle>
              </div>
              <Button type="submit" onClick={formik.handleSubmit}>
                Save Changes
              </Button>
            </Header>
            <Separator />
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col items-start w-full"
            >
              {/* First FormContainer */}
              <ContentWrapper>
                <DescriptionWrapper className="flex-[1]">
                  <CompanyTitle>Company Info</CompanyTitle>
                  <CompanyTitleSubtitle>
                    Change the name and email of your company.
                  </CompanyTitleSubtitle>
                </DescriptionWrapper>
                <FormContainer className="flex-[3]">
                  {" "}
                  {/* Changed flex ratio */}
                  <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <InputWrapper>
                      <IconWrapper>
                        <FaBusinessTime className="text-gray-500" />
                      </IconWrapper>
                      <Input
                        id="name"
                        name="companyName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.companyName}
                        placeholder="Enter your company name"
                      />
                    </InputWrapper>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <InputWrapper>
                      <IconWrapper>
                        <FaEnvelope className="text-gray-500" />
                      </IconWrapper>
                      <Input
                        id="email"
                        name="companyEmail"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.companyEmail}
                        placeholder="Enter your company email"
                      />
                    </InputWrapper>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="address">Address</Label>
                    <InputWrapper>
                      <IconWrapper>
                        <FaMapMarkerAlt className="text-gray-500" />
                      </IconWrapper>
                      <Input
                        id="address"
                        name="companyAddress"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.companyAddress}
                        placeholder="Enter your company address"
                      />
                    </InputWrapper>
                  </FormGroup>
                </FormContainer>
              </ContentWrapper>

              {/* Second Separator */}
              <Separator />

              {/* Second FormContainer */}
              <ContentWrapper>
                <DescriptionWrapper className="flex-[1]">
                  <CompanyTitle>Contact Info</CompanyTitle>
                  <CompanyTitleSubtitle>
                    Update your company's address and phone number.
                  </CompanyTitleSubtitle>
                </DescriptionWrapper>
                <FormContainer className="flex-[3]">
                  <FormGroup>
                    <Label htmlFor="contact_person">Contact Person</Label>
                    <InputWrapper>
                      <IconWrapper>
                        <FaUser className="text-gray-500" />
                      </IconWrapper>
                      <Input
                        id="contact_person"
                        name="contactPersonName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.contactPersonName}
                        placeholder="Enter your company person"
                      />
                    </InputWrapper>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="phone">Contact Phone</Label>
                    <InputWrapper>
                      <IconWrapper>
                        <FaPhoneAlt className="text-gray-500" />
                      </IconWrapper>
                      <Input
                        id="contact_phone"
                        name="contactPersonPhone"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.contactPersonPhone}
                        placeholder="Enter your company phone"
                        className={formik.errors.contactPersonPhone && formik.touched.contactPersonPhone ? 'border-red-500' : ''}
                        maxLength="10"
                      />
                    </InputWrapper>
                    {formik.errors.contactPersonPhone && formik.touched.contactPersonPhone && (
                      <ErrorMessage>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{formik.errors.contactPersonPhone}</span>
                      </ErrorMessage>
                    )}
                  </FormGroup>
                </FormContainer>
              </ContentWrapper>
              {/* Second Separator */}
              <Separator />
              {/* Third FormContainer */}
              <ContentWrapper>
                <DescriptionWrapper className="flex-[1]">
                  <CompanyTitle>Business Support</CompanyTitle>
                  <CompanyTitleSubtitle>
                    Update your company's Support Contact.
                  </CompanyTitleSubtitle>
                </DescriptionWrapper>
                <FormContainer className="flex-[3]">
                  <FormGroup>
                    <Label htmlFor="support_person">Name</Label>
                    <InputWrapper>
                      <IconWrapper>
                        <FaUser className="text-gray-500" />
                      </IconWrapper>
                      <Input
                        id="support_person"
                        name="supportPersonName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.supportPersonName}
                        placeholder="Enter your Support Name"
                      />
                    </InputWrapper>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="support_phone">Phone</Label>
                    <InputWrapper>
                      <IconWrapper>
                        <FaPhoneAlt className="text-gray-500" />
                      </IconWrapper>
                      <Input
                        id="support_phone"
                        name="supportPersonPhone"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.supportPersonPhone}
                        placeholder="Enter your support phone"
                        className={formik.errors.supportPersonPhone && formik.touched.supportPersonPhone ? 'border-red-500' : ''}
                        maxLength="10"
                      />
                    </InputWrapper>
                    {formik.errors.supportPersonPhone && formik.touched.supportPersonPhone && (
                      <ErrorMessage>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{formik.errors.supportPersonPhone}</span>
                      </ErrorMessage>
                    )}
                  </FormGroup>
                </FormContainer>
              </ContentWrapper>
              <div className="flex items-center justify-end w-full">
                <Button>Save Changes</Button>
              </div>
            </form>
          </CompanyCard>
        </CompanyInfoContainer>
      ) : (
        <Loading />
      )}
    </>
  );
};

const CompanyInfoContainer = tw.section`w-full bg-gray-50 flex justify-center items-center py-8 px-4`;
const CompanyCard = tw.div`bg-white border border-gray-200 p-8 w-full max-w-5xl rounded-lg shadow-lg`;

const Header = tw.div`flex flex-col md:flex-row justify-between items-start md:items-center mb-6 w-full`;
const Title = tw.h1`text-3xl font-bold text-gray-800 mb-4 md:mb-0`;
const SubTitle = tw.p`text-md text-gray-600`;

const Button = tw.button`px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-all`;
const Separator = tw.div`h-0.5 bg-gray-300 w-full my-6`;

// Form Content Styling
const ContentWrapper = tw.div`flex flex-col md:flex-row gap-6 w-full`;
const DescriptionWrapper = tw.div`w-full`;
const CompanyTitle = tw.p`text-xl font-semibold text-gray-700 mb-2`;
const CompanyTitleSubtitle = tw.p`text-sm text-gray-500 mb-6`;

// Form Styling
const FormContainer = tw.div`w-full`;
const FormGroup = tw.div`mb-6`;
const Label = tw.label`block text-gray-700 font-semibold mb-2`;
const InputWrapper = tw.div`relative w-full`;
const IconWrapper = tw.div`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none`;
const Input = tw.input`block w-full rounded-lg border-2 border-gray-300  p-2.5 pl-12 text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-all`;

const ErrorMessage = tw.div`
  mt-1 
  text-sm 
  text-red-500 
  bg-red-50 
  border 
  border-red-100 
  rounded-md 
  px-3 
  py-2
  shadow-sm
  flex 
  items-center 
  gap-2
`;

export default CompanyInfo;
