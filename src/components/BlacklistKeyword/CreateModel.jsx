import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrappers,
    FieldWrapper,
    Label,
    SubmitBtn,
    CancelBtn
} from "../Styles/InputStyles";
import Loading from "../Loading";
import { MdClose } from "react-icons/md";
import Select from "react-select";
import * as Yup from "yup";

const CreateModel = ({
    setOpenUploadModel,
    GroupNameMutate,
    GroupNameLoading,
}) => {
    const initialValues = {
        keyword: "",
        type: "",
        mode: "",
    };

    const validationSchema = Yup.object({
        keyword: Yup.string().required("Keyword is required"),
        type: Yup.string().required("Type is required"),
        // mode: Yup.string().required("Mode is required"),
    });

    const handleSubmit = (values) => {
        GroupNameMutate({
            keyword: values.keyword,
            type: values.type,
            // mode: values.mode,
            mode: 1,
        });
    };

    const handleClose = () => {
        setOpenUploadModel(false);
    };

    const typeOptions = [
        { value: "1", label: "Sender ID" },
        { value: "2", label: "Messages" }
    ];

    const modeOptions = [
        { value: "1", label: "SMS" },
        { value: "2", label: "Email" }
    ];

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Create Keyword</Title>
                <button onClick={handleClose}>
                    <MdClose color="white" size={24} />
                </button>
            </div>
            {GroupNameLoading && <Loading />}

            <div className="px-8 h-full flex flex-col justify-between pb-4">
                {!GroupNameLoading && (
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form className="flex flex-col h-full justify-between">
                                <Wrapper>
                                    <InputGroup>
                                        <Label htmlFor="type">Type *</Label>
                                        <FieldWrapper className="!pl-0">
                                            <Select
                                                name="type"
                                                id="type"
                                                className=" w-full"
                                                options={typeOptions}
                                                onChange={(option) => setFieldValue("type", option.value)}
                                                value={typeOptions.find(option => option.value === values.type)}
                                            />
                                        </FieldWrapper>
                                        {errors.type && touched.type ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.type}</div>
                                        ) : null}
                                    </InputGroup>
                                    <InputGroup>
                                        <Label htmlFor="keyword">Keyword *</Label>
                                        <FieldWrappers>
                                            <Field
                                                type="text"
                                                name="keyword"
                                                id="keyword"
                                                autoComplete="off"
                                                className=""
                                                required
                                                onChange={(e) => {
                                                    setFieldValue("keyword", e.target.value);
                                                }}
                                                value={values.keyword}
                                            />
                                        </FieldWrappers>
                                        {errors.keyword && touched.keyword ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.keyword}</div>
                                        ) : null}
                                    </InputGroup>



                                    {/* <InputGroup>
                                        <Label htmlFor="mode">Mode *</Label>
                                        <FieldWrapper className="!pl-0">
                                            <Select
                                                name="mode"
                                                id="mode"
                                                className=" w-full"
                                                options={modeOptions}
                                                onChange={(option) => setFieldValue("mode", option.value)}
                                                value={modeOptions.find(option => option.value === values.mode)}
                                            />
                                        </FieldWrapper>
                                        {errors.mode && touched.mode ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.mode}</div>
                                        ) : null}
                                    </InputGroup> */}
                                </Wrapper>

                                <div className="flex justify-between p-4">
                                    <CancelBtn type="button" onClick={handleClose}>Cancel</CancelBtn>
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

export default CreateModel;
