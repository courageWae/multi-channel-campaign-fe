

import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    InputGroup,
    FieldWrapper,
    CombineInputGroup,
    Label,
    SubmitBtn,
    FieldWrappers,
    CancelBtn
} from "../Styles/InputStyles";
import Loading from "../Loading";
import Select from "react-select";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const AddConnectionModel = ({
    createConnectionLoading,
    createConnectionMutate,
    setOpenUploadModel,
}) => {
    const [selectedMethod, setSelectedMethod] = useState("");

    const InitialValues = {
        name: "",
        userName: "",
        password: "",
        host: "",
        smpphost: "",
        smppport: "",
        adminport: "",
        smsboxport: "",
        smsc: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        userName: Yup.string().required("User Name is required"),
        password: Yup.string().required("Password is required"),
        smpphost: Yup.string()
            .required("SMPP Host is required")
            .matches(
                /^(?:(?:[a-zA-Z0-9]+)(?:[a-zA-Z0-9-]+)\.)+[a-zA-Z]{2,}$/,
                "SMPP Host must be a valid hostname"
            ),

        smppport: Yup.number()
            .required("SMPP Port is required")
            .integer("SMPP Port must be an integer")
            .min(1, "SMPP Port must be at least 1")
            .max(65535, "SMPP Port must be less than 65535"),

        adminport: Yup.number()
            .required("Admin Port is required")
            .integer("Admin Port must be an integer")
            .min(1, "Admin Port must be at least 1")
            .max(65535, "Admin Port must be less than 65535"),

        smsboxport: Yup.number()
            .required("SMS Box Port is required")
            .integer("SMS Box Port must be an integer")
            .min(1, "SMS Box Port must be at least 1")
            .max(65535, "SMS Box Port must be less than 65535"),

        host: Yup.string()
            .required("Host is required")
            .matches(
                /^(?:(?:[a-zA-Z0-9]+)(?:[a-zA-Z0-9-]+)\.)+[a-zA-Z]{2,}$/,
                "Host must be a valid hostname"
            ),
        smsc: Yup.string().required("Host is required"),


    });

    const SubmitHandler = (values) => {
        createConnectionMutate({
            name: values.name,
            password: values.password,
            username: values.userName,
            smtpHost: values.smpphost,
            smtpPort: values.smppport,
            adminPort: values.adminport,
            smsBoxPort: values.smsboxport,
            host: values.host,
            smsc: values.smsc,
        });
    };

    const handleClose = () => {
        setOpenUploadModel(false);
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Add SMPP Connection</Title>
                <button onClick={handleClose}>
                    <MdClose color="white" size={24} />
                </button>
            </div>

            {createConnectionLoading && <Loading />}
            <div className="px-8 h-full flex flex-col justify-between pb-4">
                {!createConnectionLoading && (
                    <Formik
                        initialValues={InitialValues}
                        validationSchema={validationSchema}
                        onSubmit={SubmitHandler}
                    >
                        {({ setFieldValue }) => (
                            <Form className="flex flex-col h-full justify-between">
                                <Wrapper>
                                    <InputGroup>
                                        <Label htmlFor="name">Name</Label>
                                        <FieldWrappers>
                                            <Field
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="off"
                                                required />
                                        </FieldWrappers>
                                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                    </InputGroup>
                                    <InputGroup>
                                        <Label htmlFor="host">Host</Label>
                                        <FieldWrappers>
                                            <Field
                                                type="text"
                                                name="host"
                                                id="host"
                                                autoComplete="off"
                                                required />

                                        </FieldWrappers>
                                        <ErrorMessage name="host" component="div" className="text-red-500 text-sm mt-1" />
                                    </InputGroup>
                                    <CombineInputGroup>
                                        <InputGroup>
                                            <Label htmlFor="smpphost">SMPP Host</Label>
                                            <FieldWrappers>
                                                <Field
                                                    type="text"
                                                    name="smpphost"
                                                    id="smpphost"
                                                    autoComplete="off"
                                                    required />

                                            </FieldWrappers>
                                            <ErrorMessage name="smpphost" component="div" className="text-red-500 text-sm mt-1" />
                                        </InputGroup>
                                        <InputGroup>
                                            <Label htmlFor="smppport">SMPP Port</Label>
                                            <FieldWrappers>
                                                <Field
                                                    type="number"
                                                    name="smppport"
                                                    id="smppport"
                                                    autoComplete="off"
                                                    required />

                                            </FieldWrappers>
                                            <ErrorMessage name="smppport" component="div" className="text-red-500 text-sm mt-1" />
                                        </InputGroup>
                                    </CombineInputGroup>
                                    <CombineInputGroup>
                                        <InputGroup>
                                            <Label htmlFor="userName">Username</Label>
                                            <FieldWrappers>
                                                <Field
                                                    type="text"
                                                    name="userName"
                                                    id="userName"
                                                    autoComplete="off"
                                                    required />

                                            </FieldWrappers>
                                            <ErrorMessage name="userName" component="div" className="text-red-500 text-sm mt-1" />
                                        </InputGroup>
                                        <InputGroup>
                                            <Label htmlFor="password">Password</Label>
                                            <FieldWrappers>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    autoComplete="off"
                                                    required />

                                            </FieldWrappers>
                                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                        </InputGroup>
                                    </CombineInputGroup>
                                    <CombineInputGroup>
                                        <InputGroup>
                                            <Label htmlFor="adminport">Admin Port</Label>
                                            <FieldWrappers>
                                                <Field
                                                    type="number"
                                                    name="adminport"
                                                    id="adminport"
                                                    autoComplete="off"
                                                    required />

                                            </FieldWrappers>
                                            <ErrorMessage name="adminport" component="div" className="text-red-500 text-sm mt-1" />
                                        </InputGroup>
                                        <InputGroup>
                                            <Label htmlFor="smsboxport">SMSBox Port</Label>
                                            <FieldWrappers>
                                                <Field
                                                    type="number"
                                                    name="smsboxport"
                                                    id="smsboxport"
                                                    autoComplete="off"
                                                    required />

                                            </FieldWrappers>
                                            <ErrorMessage name="smsboxport" component="div" className="text-red-500 text-sm mt-1" />
                                        </InputGroup>
                                    </CombineInputGroup>
                                    <InputGroup>
                                        <Label htmlFor="smsc">SMSC</Label>
                                        <FieldWrappers>
                                            <Field
                                                type="text"
                                                name="smsc"
                                                id="smsc"
                                                autoComplete="off"
                                                required />

                                        </FieldWrappers>
                                        <ErrorMessage name="smsc" component="div" className="text-red-500 text-sm mt-1" />
                                    </InputGroup>
                                </Wrapper>
                                <div className="flex justify-between p-4">
                                    <CancelBtn type="button" onClick={handleClose}>
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

const Wrapper = tw.div`grid gap-1.5 my-2`;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default AddConnectionModel;
