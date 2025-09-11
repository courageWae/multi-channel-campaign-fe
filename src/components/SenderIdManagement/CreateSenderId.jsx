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

const CreateSenderId = ({
    setOpenUploadModel,
    SenderIdMutate,
    SenderIdLoading,
}) => {
    const [bodyCharCount, setBodyCharCount] = useState(0);
    const initialValues = {
        senderId: "",
        description: "",
    };

    const validationSchema = Yup.object({
        senderId: Yup.string()
            .matches(/^(?!^\d+$)[A-Za-z0-9\s]{1,11}$/, "Sender ID must be 1-11 characters long, can contain alphabets, numbers, and spaces, but cannot be only numbers")
            .required("Sender ID is required"),
        description: Yup.string(),
    });

    const handleSubmit = (values, { resetForm }) => {
        SenderIdMutate({
            senderId: values.senderId.toUpperCase(),
            description: values.description,
        });
        resetForm();
    };

    const handleClose = (resetForm) => {
        resetForm();
        setOpenUploadModel(false);
    };

    return (
        <div className="flex flex-col w-full h-full bg-white">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Create Sender ID</Title>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                    validateOnBlur={true}
                >
                    {({ resetForm }) => (
                        <button onClick={() => handleClose(resetForm)}>
                            <MdClose color="white" size={24} />
                        </button>
                    )}
                </Formik>
            </div>
            {SenderIdLoading && <Loading />}

            <div className="flex flex-col justify-between h-full px-8 pb-4">
                {!SenderIdLoading && (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        validateOnChange={true}
                        validateOnBlur={true}
                    >
                        {({ errors, touched, resetForm, setFieldValue, values }) => (
                            <Form className="flex flex-col justify-between h-full">
                                <Wrapper>
                                    <InputGroup>
                                        <Label htmlFor="senderId">Sender Id *</Label>
                                        <FieldWrappers className={errors.senderId && touched.senderId ? 'border-red-500' : ''}>
                                            <Field
                                                type="text"
                                                name="senderId"
                                                id="senderId"
                                                autoComplete="off"
                                                className="uppercase"
                                                required
                                                maxLength="11"
                                                onChange={(e) => {
                                                    setFieldValue("senderId", e.target.value);
                                                    setBodyCharCount(e.target.value.length);
                                                }}
                                                value={values.senderId}
                                            />
                                            <MediaCharCount>{bodyCharCount}/11</MediaCharCount>
                                        </FieldWrappers>
                                        {errors.senderId && touched.senderId ? (
                                            <ErrorMessage>
                                                <div className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                    </svg>
                                                    <span>{errors.senderId}</span>
                                                </div>
                                            </ErrorMessage>
                                        ) : null}
                                    </InputGroup>
                                    <InputGroup>
                                        <Label htmlFor="description">Description</Label>
                                        <FieldWrappers as="textarea" className="h-32">
                                            <Field
                                                as="textarea"
                                                name="description"
                                                id="description"
                                                className="w-full h-full pt-1"
                                                autoComplete="off"
                                                placeholder="Please write short details for company name or brand used for which you will use this sender Id"
                                            />

                                        </FieldWrappers>
                                        {errors.description && touched.description ? (
                                            <div className="mt-1 text-sm text-red-500">{errors.description}</div>
                                        ) : null}
                                    </InputGroup>
                                </Wrapper>

                                <div className="flex justify-between p-4">
                                    <CancelBtn type="button" onClick={() => handleClose(resetForm)}>
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

const Wrapper = tw.div`grid gap-6 my-6`;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;
const MediaCharCount = tw.div`absolute top-2.5 right-2 text-xs text-gray-400`;
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
`;
export default CreateSenderId;
