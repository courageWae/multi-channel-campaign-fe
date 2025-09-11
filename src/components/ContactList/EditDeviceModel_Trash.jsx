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
import { toast } from "react-toastify";

const EditModel = ({
    editEntryLoading,
    editSingleEntry,
    setOpenEditModel,
    groupId,
    selectedItem,
}) => {
    const [contactType, setContactType] = useState(selectedItem?.type || 1);

    const InitialValues = {
        id: selectedItem?.id,
        firstName: selectedItem?.first_name,
        lastName: selectedItem?.last_name,
        mobile: selectedItem?.contact,
        email: selectedItem?.contact,
        type: selectedItem?.type,
        groupId,
    };

    const SubmitHandler = (values) => {
        if (contactType === 1) {
            const mobileLength = values.mobile.toString().length;
            if (mobileLength < 9 || mobileLength > 12) {
                return toast.error("Please enter a valid mobile number");
            }
            editSingleEntry({
                id: values.id,
                firstName: values.firstName,
                lastName: values.lastName,
                mobile: values.mobile,
                type: contactType,
                groupId: values.groupId,
            });
        } else if (contactType === 2) {
            editSingleEntry({
                id: values.id,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                type: contactType,
                groupId: values.groupId,
            });
        }
    };

    return (
        <Model width={`w-11/12 max-w-lg `} setOpenModel={setOpenEditModel}>
            <Title>Edit Contact</Title>

            {editEntryLoading && <Loading />}

            {!editEntryLoading && (
                <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
                    {({ values, setFieldValue }) => (
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
                                        />
                                    </FieldWrappers>
                                </InputGroup>
                            </Wrapper>
                            {contactType === 1 && (
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
                            )}
                            {contactType === 2 && (
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
                            )}

                            <BtnWrapper>
                                <SubmitBtn type="submit">Update</SubmitBtn>
                            </BtnWrapper>
                        </Form>
                    )}
                </Formik>
            )}
        </Model>
    );
};

const Wrapper = tw.div`
grid md:grid-cols-2  gap-6 my-6 px-1`;
const SampleFile = tw.a`w-full pt-3 text-blue-500 underline text-sm text-center`;

const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center mt-6`;

export default EditModel;
