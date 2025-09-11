


import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrappers,
    Label,
    SubmitBtn,
    CancelBtn
} from "../Styles/InputStyles";
import Loading from "../Loading";
import { MdClose } from "react-icons/md";
import * as Yup from "yup";

const ChangePassword = ({
    setOpenUploadModel,
    ChangePasswordMutate,
    ChangePasswordLoading,
}) => {

    const initialValues = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        currentPassword: Yup.string()
            .required("Current password is required")
            .min(5, "Password must be at least 5 characters"),

        newPassword: Yup.string()
            .required("New password is required")
            .min(5, "Password must be at least 5 characters"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Confirm password is required")
            .min(5, "Password must be at least 5 characters"),
    });


    const handleSubmit = (values) => {
        ChangePasswordMutate({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
        });
    };

    const handleClose = () => {
        setOpenUploadModel(false);
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Change Password</Title>
                <button onClick={handleClose}>
                    <MdClose color="white" size={24} />
                </button>
            </div>
            {ChangePasswordLoading && <Loading />}

            <div className="px-8 h-full flex flex-col justify-between pb-4">
                {!ChangePasswordLoading && (
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form className="flex flex-col h-full justify-between">
                                <Wrapper>
                                    <InputGroup>
                                        <Label htmlFor="currentPassword">Current Password *</Label>
                                        <FieldWrappers>
                                            <Field
                                                type="password"
                                                name="currentPassword"
                                                id="currentPassword"
                                                autoComplete="off"
                                                className=""
                                                required

                                                onChange={(e) => {
                                                    setFieldValue("currentPassword", e.target.value);

                                                }}
                                                value={values.currentPassword}
                                            />

                                        </FieldWrappers>
                                        {errors.currentPassword && touched.currentPassword ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.currentPassword}</div>
                                        ) : null}
                                    </InputGroup>
                                    <InputGroup>
                                        <Label htmlFor="newPassword">New Password *</Label>
                                        <FieldWrappers>
                                            <Field
                                                type="password"
                                                name="newPassword"
                                                id="newPassword"
                                                autoComplete="off"
                                                className=""
                                                required

                                                onChange={(e) => {
                                                    setFieldValue("newPassword", e.target.value);

                                                }}
                                                value={values.newPassword}
                                            />

                                        </FieldWrappers>
                                        {errors.newPassword && touched.newPassword ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.newPassword}</div>
                                        ) : null}
                                    </InputGroup>
                                    <InputGroup>
                                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                                        <FieldWrappers>
                                            <Field
                                                type="password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                autoComplete="off"
                                                className=""
                                                required

                                                onChange={(e) => {
                                                    setFieldValue("confirmPassword", e.target.value);

                                                }}
                                                value={values.confirmPassword}
                                            />

                                        </FieldWrappers>
                                        {errors.confirmPassword && touched.confirmPassword ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
                                        ) : null}
                                    </InputGroup>
                                </Wrapper>

                                <div className="flex justify-between p-4">

                                    <CancelBtn type="button"
                                        onClick={() => setOpenUploadModel(false)}>
                                        Cancel
                                    </CancelBtn>
                                    <BtnWrapper>
                                        <SubmitBtn type="submit">Update</SubmitBtn>
                                    </BtnWrapper>
                                </div>
                            </Form>)}
                    </Formik>
                )}
            </div>
        </div>
    );
};
const Wrapper = tw.div`grid gap-6 my-6`;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;
const MediaCharCount = tw.div`absolute top-2.5 right-2 text-xs text-gray-400`;
export default ChangePassword;
