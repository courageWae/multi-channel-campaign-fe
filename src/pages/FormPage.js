import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../Config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Container = tw.div`flex justify-center items-center min-h-screen bg-gray-100`;
const FormContainer = tw.div`bg-white p-8 rounded-md shadow-md w-full max-w-xl sm:my-10`;
const FormTitle = tw.h2`text-2xl font-bold mb-6 text-gray-800`;
const FormGrid = tw.div`grid gap-4 grid-cols-1 md:grid-cols-2`;
const FormField = tw.div``;
const Label = tw.label`block text-sm font-medium text-gray-700`;
const Input = tw(
  Field
)`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`;
const ErrorText = tw.div`text-red-500 text-sm mt-1`;
const Button = tw.button`w-full bg-orange-500 text-white py-2 px-4 rounded-md mt-8 hover:bg-orange-600`;
const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  companyAddress: Yup.string().required("Company address is required"),
  companyEmail: Yup.string()
    .email("Invalid email")
    .required("Company email is required"),
  contactPersonName: Yup.string().required("Contact person name is required"),
  contactPersonPhone: Yup.string()
    .matches(
      /^[0-9]{10}$/,
      "Contact person phone must be 10 digits"
    )
    .required("Contact person phone is required"),
  supportPersonName: Yup.string(),
  supportPersonPhone: Yup.string().matches(
    /^[0-9]{10}$/,
    "Support person phone must be 10 digits"
  ),
});

const initialValues = {
  companyName: "",
  companyAddress: "",
  companyEmail: "",
  contactPersonName: "",
  contactPersonPhone: "",
  supportPersonName: "",
  supportPersonPhone: "",
};

const FormPage = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const body = new FormData();
      body.append("companyName", values.companyName);
      body.append("companyAddress", values.companyAddress);
      body.append("companyEmail", values.companyEmail);
      body.append("contactPersonName", values.contactPersonName);
      body.append("contactPersonPhone", values.contactPersonPhone);
      body.append("supportPersonName", values.supportPersonName);
      body.append("supportPersonPhone", values.supportPersonPhone);

      const response = await axios.post(
        `${Config.apiUrl}/updateProfile`,
        body,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${user.token}`,
          },
        }
      );

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(` ${error.response.data.msg}`);
      } else {
        toast.error("Error submitting form.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <FormTitle>Company Information</FormTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormGrid>
                <FormField>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input type="text" id="companyName" name="companyName" />
                  <ErrorMessage name="companyName" component={ErrorText} />
                </FormField>
                <FormField>
                  <Label htmlFor="companyAddress">Company Address</Label>
                  <Input
                    type="text"
                    id="companyAddress"
                    name="companyAddress"
                  />
                  <ErrorMessage name="companyAddress" component={ErrorText} />
                </FormField>
              </FormGrid>
              <FormField className="my-4">
                <Label htmlFor="companyEmail">Company Email</Label>
                <Input type="email" id="companyEmail" name="companyEmail" />
                <ErrorMessage name="companyEmail" component={ErrorText} />
              </FormField>
              <FormGrid>
                <FormField>
                  <Label htmlFor="contactPersonName">Contact Person Name</Label>
                  <Input
                    type="text"
                    id="contactPersonName"
                    name="contactPersonName"
                  />
                  <ErrorMessage
                    name="contactPersonName"
                    component={ErrorText}
                  />
                </FormField>
                <FormField>
                  <Label htmlFor="contactPersonPhone">
                    Contact Person Phone
                  </Label>
                  <Input
                    type="text"
                    id="contactPersonPhone"
                    name="contactPersonPhone"
                  />
                  <ErrorMessage
                    name="contactPersonPhone"
                    component={ErrorText}
                  />
                </FormField>
                <FormField>
                  <Label htmlFor="supportPersonName">Support Person Name</Label>
                  <Input
                    type="text"
                    id="supportPersonName"
                    name="supportPersonName"
                  />
                  <ErrorMessage
                    name="supportPersonName"
                    component={ErrorText}
                  />
                </FormField>
                <FormField>
                  <Label htmlFor="supportPersonPhone">
                    Support Person Phone
                  </Label>
                  <Input
                    type="text"
                    id="supportPersonPhone"
                    name="supportPersonPhone"
                  />
                  <ErrorMessage
                    name="supportPersonPhone"
                    component={ErrorText}
                  />
                </FormField>
              </FormGrid>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default FormPage;
