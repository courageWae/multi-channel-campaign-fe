
import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
    InputGroup,
    FieldWrappers,
    Label,
    SubmitBtn,
    CancelBtn
} from "../Styles/InputStyles";
import Loading from "../Loading";
import { MdClose } from "react-icons/md";

const EditEmailSenderId = ({
    setOpenEditModel,
    SenderIdEditMutate,
    SenderIdEditLoading,
    selectedData
}) => {
    const [bodyCharCount, setBodyCharCount] = useState(0);
    const {name, email_id} = selectedData;
    const initialValues = {
        fromName: name,
        fromEmail: email_id,
    };

    const validationSchema = Yup.object({
        fromName: Yup.string()
                        .matches(/^[a-zA-Z]+$/, "The Name should contain only alphabetic characters.")
                        .min(3, "The 'From Name' must be at least 3 characters long.")
                        .required("From Name is required"),

        fromEmail: Yup.string()
                        .email("Invalid email format.")
                        .min(3, "Email must be at least 3 characters long.")
                        .required("Email is required"),
    });

    const handleSubmit = (values, { resetForm }) => {
        SenderIdEditMutate({
            senderName: values.fromName,
            emailId: values.fromEmail,
        });
        resetForm();
    };

    const handleClose = (resetForm) => {
        resetForm();
        setOpenEditModel(false);
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Edit Email Sender ID</Title>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ resetForm }) => (
                        <button onClick={() => handleClose(resetForm)}>
                            <MdClose color="white" size={24} />
                        </button>
                    )}
                </Formik>
            </div>
            {SenderIdEditLoading && <Loading />}

            <div className="px-8 h-full flex flex-col justify-between pb-4">
                {!SenderIdEditLoading && (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, resetForm, setFieldValue, values }) => (
                            <Form className="flex flex-col h-full justify-between">
                                <Wrapper>
                                    <InputGroup>
                                        <Label htmlFor="senderId">From Name *</Label>
                                        <FieldWrappers>
                                            <Field
                                                type="text"
                                                name="fromName"
                                                id="fromName"
                                                autoComplete="off"
                                                required
                                                maxLength="40"
                                                minLength="3"
                                                onChange={(e) => {
                                                    setFieldValue("fromName", e.target.value);
                                                    setBodyCharCount(e.target.value.length);
                                                }}
                                                value={values.fromName ? values.fromName : name}
                                            />
                                            <MediaCharCount>{bodyCharCount}/40</MediaCharCount>
                                        </FieldWrappers>
                                        {errors.fromName && touched.fromName ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.fromName}</div>
                                        ) : null}
                                    </InputGroup>
                                    <InputGroup>
                                        <Label htmlFor="description">From Email *</Label>
                                        <FieldWrappers>
                                            <Field
                                                name="fromEmail"
                                                id="fromEmail"
                                                className="w-full h-full pt-1"
                                                autoComplete="off"
                                                placeholder="Please Provide a Valid Email......"
                                                required
                                                value={values.fromEmail? values.fromEmail : email_id}
                                            />

                                        </FieldWrappers>
                                        {errors.fromEmail && touched.fromEmail ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.fromEmail}</div>
                                        ) : null}
                                    </InputGroup>
                                </Wrapper>

                                <div className="flex justify-between p-4">
                                    <CancelBtn type="button" onClick={() => handleClose(resetForm)}>
                                        Cancel
                                    </CancelBtn>
                                    <BtnWrapper>
                                        <SubmitBtn type="submit">Update</SubmitBtn>
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

const Wrapper = tw.div`grid gap-6 my-6`;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;
const MediaCharCount = tw.div`absolute top-2.5 right-2 text-xs text-gray-400`;
export default EditEmailSenderId;
