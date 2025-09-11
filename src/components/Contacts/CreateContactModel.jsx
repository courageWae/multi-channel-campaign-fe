import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import {
  InputGroup,
  FieldWrappers,
  Label,
  SubmitBtn,
  CancelBtn,
} from "../Styles/InputStyles";
import { MdClose } from "react-icons/md";
import Loading from "../Loading";
// import { set } from "react-datepicker/dist/date_utils";

const validationSchema = Yup.object({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
//   phoneNumber: Yup.string()
//     .matches(/^[0-9]{7,15}$/, "Phone Number must be between 7 and 15 digits")
//     .required("Phone Number is required"),
}
);

const CreateContactModel = ({
  setContactModel,
  createContactMutate,
  createContactLoading,
  groupId,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telegramPhone, setTelegramPhone] = useState("");
  const [phoneInputError, setPhoneInputError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(()=>{
    setErrorMsg("");
    if(phoneNumber.length === 0 || phoneNumber===""){
      setPhoneInputError(false);
      setErrorMsg("Phone Number is required");
    }

    else if(phoneNumber.length>0 && (phoneNumber.length < 7 || phoneNumber.length>15)){
      setPhoneInputError(true);
      setErrorMsg("Phone Number must be between 7 and 15 digits");
    }
    else{
      setPhoneInputError(false);
      setErrorMsg("");
    }
  }, [phoneNumber])

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/^\+/, "");
  };

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    whatsapp: "",
    groupId: groupId,
    telegram: "",
  };

  const handleSubmit = (values) => {
    if(phoneInputError){
      return;
    }
    createContactMutate({
      firstName: values.firstname,
      lastName: values.lastname,
      email: values?.email,
      sms: formatPhoneNumber(phoneNumber), // Format phone number
      whatsapp: formatPhoneNumber(whatsapp), // Format WhatsApp number
      groupId: groupId,
      telegram: formatPhoneNumber(telegramPhone), // Format Telegram number
    });

    setPhoneNumber("");
    setWhatsapp("");
    setTelegramPhone("");
  };

  return (
    <div className="flex flex-col w-full h-full max-h-screen bg-white">
      <div className="flex items-center justify-between bg-[#06173A] py-6 px-4">
        <Title className="text-white">Create Contact</Title>
        <button
          onClick={() => {
            setContactModel(false);
          }}
        >
          <MdClose color="white" size={24} />
        </button>
      </div>
      {createContactLoading && <Loading />}
      <div className="flex flex-col justify-between flex-grow px-8 pb-4 overflow-y-auto">
        {!createContactLoading && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col justify-between h-full">
                <Wrapper>
                  <InputGroup>
                    <Label htmlFor="firstname">First Name *</Label>
                    <FieldWrappers>
                      <Field
                        type="text"
                        name="firstname"
                        id="firstname"
                        autoComplete="off"
                        className="truncate"
                        required
                      />
                    </FieldWrappers>
                    {errors.firstname && touched.firstname ? (
                      <div className="text-sm italic text-red-500">{errors.firstname}</div>
                    ) : null}
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="lastname">Last Name *</Label>
                    <FieldWrappers>
                      <Field
                        type="text"
                        name="lastname"
                        id="lastname"
                        autoComplete="off"
                        className="truncate"
                        required
                      />
                    </FieldWrappers>
                    {errors.lastname && touched.lastname ? (
                      <div className="text-sm italic text-red-500">{errors.lastname}</div>
                    ) : null}
                  </InputGroup>

                  {/* Phone Number Input */}
                  <InputGroup>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    {/* <FieldWrappers> */}
                      <PhoneInput
                        style={{
                          width: "100%",
                          "--react-international-phone-height": "43px",
                          "--react-international-phone-font-size": "15px",
                        }}
                        defaultCountry="gh"
                        name="phoneNumber"
                        placeholder="Enter your phone number*"
                        value={phoneNumber}
                        onChange={(value)=>setPhoneNumber(value)}
                      />
                    {/* </FieldWrappers> */}
                    {/* {errors.phoneNumber && touched.phoneNumber ? (
                      <div className="text-red-500">{errors.phoneNumber}</div>
                    ) : null} */}
                    {
                      phoneInputError && <div className="text-sm italic text-red-500">{errorMsg}</div>
                    }
                  </InputGroup>
                  {/* Email Input */}
                  <InputGroup>
                    <Label htmlFor="email">Email</Label>
                    <FieldWrappers>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        className="truncate"
                      />
                    </FieldWrappers>
                  </InputGroup>

                  {/* WhatsApp Number Input */}
                  <InputGroup>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    {/* <FieldWrappers> */}
                      <PhoneInput
                        style={{
                          width: "100%",
                          "--react-international-phone-height": "40px",
                          "--react-international-phone-font-size": "15px",
                        }}
                        defaultCountry="gh"
                        name="whatsapp"
                        placeholder="Enter WhatsApp number"
                        value={whatsapp}
                        onChange={(value)=>setWhatsapp(value)}
                      />
                    {/* </FieldWrappers> */}
                  </InputGroup>

                  {/* Telegram Number Input */}
                  <InputGroup>
                    <Label htmlFor="telegram">Telegram</Label>
                    {/* <FieldWrappers> */}
                      <PhoneInput
                        style={{
                          width: "100%",
                          "--react-international-phone-height": "43px",
                          "--react-international-phone-font-size": "15px",
                        }}
                        defaultCountry="gh"
                        name="telegram"
                        placeholder="Enter Telegram number"
                        value={telegramPhone}
                        onChange={(value)=>setTelegramPhone(value)}

                      />
                    {/* </FieldWrappers> */}
                  </InputGroup>
                </Wrapper>

                <div className="flex justify-between p-4">
                  <CancelBtn
                    type="button"
                    onClick={() => setContactModel(false)}
                  >
                    Cancel
                  </CancelBtn>
                  <BtnWrapper>
                    <SubmitBtn type="submit">Create</SubmitBtn>
                  </BtnWrapper>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

const Wrapper = tw.div`grid md:gap-4 md:my-4 `;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default CreateContactModel;
