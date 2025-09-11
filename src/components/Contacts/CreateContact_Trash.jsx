import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrapper,
    FieldWrappers,
    Label,
    SubmitBtn,
} from "../Styles/InputStyles";
import Loading from "../Loading";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Model from "../Model";
import DropzoneForContact from "./DropzoneForContact_Trash";
import Images from "../../Images";
import { toast } from "react-toastify";

const CreateContact = ({
    SingleEntryLoading,
    setCreateModel,
    postSingleEntry,
    setOpenUploadModel,
    groupId,
    selectedItem,
    type,
}) => {
    const [contactType, setContactType] = useState(type || 1);
    const InitialValues = {
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        groupId,
        companyName: "",
        userName: "",
        type,
    };
    console.log(InitialValues)
    const SubmitHandler = (values) => {
        const mobileLength = values.mobile.toString().length;
        if (mobileLength < 9) {
            return toast.error("Please enter a valid mobile number");
        }
        postSingleEntry(values);
    };



    return (
        <Model width={`w-11/12 max-w-lg `} setOpenModel={setCreateModel}>
            <Title>Add Contact</Title>

            {/* {SingleEntryLoading && <Loading />}

            {!SingleEntryLoading && ( */}
            <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
                <Form>
                    <Wrapper>
                        <InputGroup>
                            <Label htmlFor="firstName">First Name</Label>
                            <FieldWrappers>
                                <Field
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    autoComplete="off"
                                    className="truncate"
                                    required
                                />
                            </FieldWrappers>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="lastName">Last Name</Label>
                            <FieldWrappers>
                                <Field
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    autoComplete="off"
                                    className="truncate"
                                    required
                                />
                            </FieldWrappers>
                        </InputGroup>




                        <InputGroup>
                            <Label htmlFor="mobile">Phone Number</Label>
                            <FieldWrappers>
                                <Field
                                    type="number"
                                    name="mobile"
                                    id="mobile"
                                    autoComplete="off"
                                    className="truncate"
                                    required
                                />
                            </FieldWrappers>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="email">Email</Label>
                            <FieldWrappers>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    className="truncate"
                                    required
                                />
                            </FieldWrappers>
                        </InputGroup>
                    </Wrapper>
                    <BtnWrapper>
                        <SubmitBtn type="submit">Add</SubmitBtn>
                    </BtnWrapper>
                </Form>
            </Formik>

        </Model>
    );
};

const Wrapper = tw.div`
grid md:grid-cols-2  gap-6 my-6 px-1`;
const SampleFile = tw.a` w-full pt-3 text-blue-500 underline text-sm text-center`;

const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center mt-6`;

export default CreateContact;
