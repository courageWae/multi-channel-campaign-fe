import React, { useState } from "react";
import { useFormik } from "formik";
import tw from "tailwind-styled-components";
import * as Yup from "yup";
import ChangePasswordConfirmation from "components/AccountSettings/ChangePasswordConfirmation";
import Images from "Images";

const ChangePassword = ({ setTab }) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [payload, setPayload] = useState(null);

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .min(3, "Current password must be at least 6 characters")
      .required("Current password is required"),
    newPassword: Yup.string()
      .min(5, "New password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values", values);
      setPayload(values);
      setConfirmModalOpen(true);
    },
  });

  const onCancel = () => {
    setConfirmModalOpen(false);
  };

  return (
    <>
      {confirmModalOpen && (
        <ChangePasswordConfirmation
          isOpen={confirmModalOpen}
          payload={payload}
          setConfirmModalOpen={setConfirmModalOpen}
          onCancel={onCancel}
          setTab={setTab}
        />
      )}
      <ChangePasswordContainer>
        <DescriptionContainer>
          <Title>Change Password</Title>
          <Subtitle>
            Update your password associated with your account.
          </Subtitle>
          <img src={Images.changePass} alt={"change-password"} />
        </DescriptionContainer>
        <FormContainer>
          <form onSubmit={formik.handleSubmit} className="w-full">
            <FormGroup>
              <label
                htmlFor="currentPassword"
                className="block font-semibold text-gray-700"
              >
                Current Password
              </label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.currentPassword}
                onBlur={formik.handleBlur} // trigger validation on blur
                placeholder="Enter your Current Password"
              />
              {formik.touched.currentPassword && formik.errors.currentPassword ? (
                <ErrorText>{formik.errors.currentPassword}</ErrorText>
              ) : null}
            </FormGroup>
            <FormGroup>
              <label
                htmlFor="newPassword"
                className="block font-semibold text-gray-700"
              >
                New Password
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                onBlur={formik.handleBlur} // trigger validation on blur
                placeholder="Enter New Password"
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <ErrorText>{formik.errors.newPassword}</ErrorText>
              ) : null}
            </FormGroup>
            <FormGroup>
              <label
                htmlFor="confirmPassword"
                className="block font-semibold text-gray-700"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur} // trigger validation on blur
                placeholder="Confirm Password"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <ErrorText>{formik.errors.confirmPassword}</ErrorText>
              ) : null}
            </FormGroup>
            <Button type="submit">Save Changes</Button>
          </form>
        </FormContainer>
      </ChangePasswordContainer>
    </>
  );
};

const ChangePasswordContainer = tw.section`flex flex-col md:flex-row justify-between items-start gap-8 w-full h-fit p-6`;
const DescriptionContainer = tw.div`flex-[1] flex flex-col items-start gap-1`;
const FormContainer = tw.div`flex-[2] flex flex-col items-start gap-3`;
const Title = tw.h1`text-xl font-bold text-gray-900 w-full text-capitalize`;
const Subtitle = tw.p`text-sm font-semibold text-gray-500 leading-6`;

const FormGroup = tw.div`mb-6 w-full`;
const Input = tw.input`w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`;
const Button = tw.button`bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mt-4`;

const ErrorText = tw.div`text-red-500 text-sm mt-1`;

export default ChangePassword;
