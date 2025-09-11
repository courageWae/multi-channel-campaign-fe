import React from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrappers,
    Label,
    SubmitBtn,
} from "../Styles/InputStyles";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import Loading from "../Loading";
const CreateContactModel = ({ setContactModel, deviceId, createContactMutate, createContactLoading, groupId }) => {
    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        whatsapp: "",
        // groupId: groupId,
        groupId: deviceId?.group_id || "",
    };
    console.log(deviceId)
    console.log(initialValues)
    const handleSubmit = (values) => {
        console.log('Submitted values:', values);

        createContactMutate({

            firstName: values.firstname,
            lastName: values.lastname,
            email: values?.email,
            sms: values?.phoneNumber,
            whatsapp: values?.whatsapp,
            groupId: groupId
        });
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
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
            <div className="px-8 flex-grow flex flex-col justify-between pb-4">
                {!createContactLoading && (
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form className="flex flex-col h-full justify-between">
                            <Wrapper>
                                <InputGroup >
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
                                </InputGroup>
                                <InputGroup >
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
                                </InputGroup>
                                <InputGroup >
                                    <Label htmlFor="email">Email *</Label>
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
                                <InputGroup >
                                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                                    <FieldWrappers>
                                        <Field
                                            type="tel"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            autoComplete="off"
                                            className="truncate"
                                            required
                                        />
                                    </FieldWrappers>
                                </InputGroup>
                                <InputGroup >
                                    <Label htmlFor="whatsapp">WhatsApp *</Label>
                                    <FieldWrappers>
                                        <Field
                                            type="tel"
                                            name="whatsapp"
                                            id="whatsapp"
                                            autoComplete="off"
                                            className="truncate"
                                            required
                                        />
                                    </FieldWrappers>
                                </InputGroup>
                            </Wrapper>
                            <div className="flex justify-between p-4">
                                <button
                                    type="button"
                                    onClick={() => setContactModel(false)}
                                    className="hover:bg-purple-100 p-2 rounded-xl transition-all duration-100 hover:text-topBar-purple"
                                >
                                    Cancel
                                </button>
                                <BtnWrapper>
                                    <SubmitBtn type="submit">Create</SubmitBtn>
                                </BtnWrapper>
                            </div>
                        </Form>
                    </Formik>)}
            </div>
        </div>
    );
};

const Wrapper = tw.div`
    grid md:gap-4 md:my-4 
`;
const Title = tw.h1`
    text-lg md:text-xl font-medium text-center text-gray-800
`;
const BtnWrapper = tw.div`
    flex justify-center items-center
`;

export default CreateContactModel;
