
import React from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
    InputGroup,
    FieldWrappers,
    Label,
    SubmitBtn,
    CancelBtn,
} from "../Styles/InputStyles";
import { MdClose } from "react-icons/md";
import Loading from "../Loading";
import { Update } from "@mui/icons-material";


const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{7,15}$/, "Phone Number must be between 7 and 15 digits")
        .required("Phone Number is required"),
});

const UpdateProfile = ({ setUpdateModel, updateMutate, updateLoading, data }) => {
    const initialValues = {
        name: data?.name,
        email: data?.email,
        phoneNumber: data?.phone,

    };
    console.log(initialValues)
    const handleSubmit = (values) => {
        updateMutate({
            name: values.name,
            phone: values.phoneNumber,
            email: values?.email,

        });
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Update Profile</Title>
                <button
                    onClick={() => {
                        setUpdateModel(false);
                    }}
                >
                    <MdClose color="white" size={24} />
                </button>
            </div>
            {updateLoading && <Loading />}
            <div className="px-8 flex-grow flex flex-col justify-between pb-4">
                {!updateLoading && (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ errors, touched }) => (
                            <Form className="flex flex-col h-full justify-between">
                                <Wrapper>
                                    <InputGroup>
                                        <Label htmlFor="name">Name *</Label>
                                        <FieldWrappers>
                                            <Field
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="off"
                                                className="truncate"
                                                required
                                            />

                                        </FieldWrappers>
                                        {errors.name && touched.name ? (
                                            <div className="text-red-500">{errors.name}</div>
                                        ) : null}
                                    </InputGroup>


                                    <InputGroup>
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
                                        {errors.phoneNumber && touched.phoneNumber ? (
                                            <div className="text-red-500">{errors.phoneNumber}</div>
                                        ) : null}
                                    </InputGroup>
                                    <InputGroup>
                                        <Label htmlFor="email">Email *</Label>
                                        <FieldWrappers className="bg-gray-100">
                                            <Field
                                                type="email"
                                                name="email"
                                                id="email"
                                                autoComplete="off"
                                                className="truncate"
                                                disabled
                                            />
                                        </FieldWrappers>
                                    </InputGroup>

                                </Wrapper>
                                <div className="flex justify-between p-4">
                                    <CancelBtn type="button" onClick={() => setUpdateModel(false)}>
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

const Wrapper = tw.div`grid md:gap-4 md:my-4 `;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default UpdateProfile;
