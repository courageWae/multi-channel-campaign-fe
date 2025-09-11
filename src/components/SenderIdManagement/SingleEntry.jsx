import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrapper,
    Label,
    SubmitBtn,
    CombineInputGroup,
} from "../Styles/InputStyles";
import Loading from "../Loading";
import MenuItem from "@mui/material/MenuItem";
import Select from "react-select";
import Model from "../Model";
import DropzoneForContact from "../Contacts/DropzoneForContact_Trash";
import Images from "../../Images";
import { MdAdd } from "react-icons/md";
import AddSenderIdModel from "../AddSms/RequestSenderIdModal";

const SingleEntry = ({
    SingleEntryLoading,
    postSingleEntry,
    setOpenUploadModel,
    // hostNamesandProvince,
}) => {
    const [uploadFile, setUploadFile] = useState("");
    const [openSenderIdModel, setOpenSenderIdModel] = useState(false);

    const InitialValues = {
        eventName: "",
        province: "",
        totalAmount: "",
        gst: "",
        hst: "",
        qst: "",
    };

    const SubmitHandler = (values) => {
        postSingleEntry(values);
    };

    const SenderList = [
        { value: "Sender 1", label: "Sender 1" },
        { value: "Sender 2", label: "Sender 2" },
        { value: "Sender 3", label: "Sender 3" },
    ];

    const InsertList = [
        { value: "Phone Number", label: "Phone Number" },
        { value: "OTP", label: "OTP" },
        { value: "Email", label: "Email" },
        { value: "First Name", label: "First Name" },
        { value: "Last Name", label: "Last Name" },
        { value: "Other", label: "Other" },
    ];

    return (
        <Model width={`w-11/12 max-w-lg `} setOpenModel={setOpenUploadModel}>
            <Title>Create Template</Title>

            {SingleEntryLoading && <Loading />}

            {!SingleEntryLoading &&
                <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
                    <Form>
                        <Wrapper>
                            <CombineInputGroup>
                                <InputGroup>
                                    <Label htmlFor="custName">Template Name</Label>
                                    <FieldWrapper>
                                        <Field
                                            type="text"
                                            name="custName"
                                            id="custName"
                                            autoComplete="off"
                                            className="truncate"
                                            required
                                        />
                                    </FieldWrapper>
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="senderId">Sender Id</Label>
                                    <FieldWrapper $select={true}>
                                        <Field
                                            required
                                            name="senderId"
                                            id="senderId"
                                            autoComplete="off"
                                        >
                                            {(props) => (
                                                <Select
                                                    className="w-full h-full"
                                                    options={SenderList}
                                                    onChange={(val) =>
                                                        props.form.setFieldValue("senderId", val.value)
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FieldWrapper>
                                </InputGroup>
                            </CombineInputGroup>

                            <InputGroup>
                                <Label htmlFor="senderId">Insert Merge Field</Label>
                                <FieldWrapper $select={true}>
                                    <Field
                                        required
                                        name="senderId"
                                        id="senderId"
                                        autoComplete="off"
                                    >
                                        {(props) => (
                                            <Select
                                                className="w-full h-full"
                                                options={InsertList}
                                                onChange={(val) =>
                                                    props.form.setFieldValue("senderId", val.value)
                                                }
                                            />
                                        )}
                                    </Field>
                                </FieldWrapper>
                            </InputGroup>
                            <InputGroup>
                                <Label htmlFor="message">Message</Label>
                                <FieldWrapper>
                                    <Field
                                        required
                                        name="message"
                                        as="textarea"
                                        rows="5"
                                        id="message"
                                        placeholder="Type your message here"
                                        autoComplete="off"
                                    />
                                </FieldWrapper>
                            </InputGroup>
                        </Wrapper>
                        <BtnWrapper>
                            <SubmitBtn type="submit">Save</SubmitBtn>
                        </BtnWrapper>
                    </Form>
                </Formik>
            }
        </Model>
    );
};

const Wrapper = tw.div`
grid  gap-6 my-10 px-1`;
const SampleFile = tw.a` w-full pt-3 text-blue-500 underline text-sm text-center`;

const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;
const Button = tw.button`text-white bg-custom-zambia  w-52 flex items-center space-x-1 justify-center h-10   text-xs whitespace-nowrap rounded`;

export default SingleEntry;
