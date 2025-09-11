import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrapper,
    CombineInputGroup,
    FieldWrappers,
    Label,
    SubmitBtn,
    CancelBtn
} from "../Styles/InputStyles";
import Loading from "../Loading";
import { MdClose } from "react-icons/md";
import * as Yup from "yup";


const CreateReport = ({
    setOpenUploadModel,
    reportMutate,
    reportLoading,
}) => {

    const initialValues = {
        reportName: "",
        startDate: "",
        endDate: "",
        reportType: "",
        contentType: "",
    };

    const validationSchema = Yup.object({
        reportName: Yup.string().required("Report name is required"),
        startDate: Yup.date().required("Start date is required"),
        endDate: Yup.date()
            .required("End date is required")
            .min(Yup.ref("startDate"), "End date must be after start date"),
    });

    const handleSubmit = (values) => {
        reportMutate(values);
    };

    const handleClose = () => {
        setOpenUploadModel(false);
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Create Report</Title>
                <button onClick={handleClose}>
                    <MdClose color="white" size={24} />
                </button>
            </div>
            {reportLoading && <Loading />}

            <div className="px-8 h-full flex flex-col justify-between pb-4">
                {!reportLoading && (
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form className="flex flex-col h-full justify-between">
                                <Wrapper>
                                    <InputGroup>
                                        <Label htmlFor="name">Report Name *</Label>
                                        <FieldWrappers>
                                            <Field
                                                type="text"
                                                name="reportName"
                                                id="reportName"
                                                autoComplete="off"
                                                className=""
                                                required
                                                maxLength="40"
                                                onChange={(e) => {
                                                    setFieldValue("reportName", e.target.value);

                                                }}
                                                value={values.reportName}
                                            />

                                        </FieldWrappers>
                                        {errors.reportName && touched.reportName ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.reportName}</div>
                                        ) : null}
                                    </InputGroup>

                                    <InputGroup>
                                        <Label htmlFor="startDate">Start Date</Label>
                                        <FieldWrappers>
                                            <Field
                                                name="startDate"
                                                type="date"
                                                id="startDate"
                                                autoComplete="off"
                                                required
                                                max={new Date().toISOString().split("T")[0]}
                                            />
                                        </FieldWrappers>
                                        {errors.startDate && touched.startDate ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.startDate}</div>
                                        ) : null}
                                    </InputGroup>

                                    <InputGroup>
                                        <Label htmlFor="endDate">End Date</Label>
                                        <FieldWrappers>
                                            <Field
                                                name="endDate"
                                                type="date"
                                                id="endDate"
                                                autoComplete="off"
                                                required
                                                max={new Date().toISOString().split("T")[0]}
                                            />
                                        </FieldWrappers>
                                        {errors.endDate && touched.endDate ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.endDate}</div>
                                        ) : null}
                                    </InputGroup>


                                </Wrapper>

                                <div className="flex justify-between p-4">

                                    <CancelBtn type="button"
                                        onClick={() => setOpenUploadModel(false)}>
                                        Cancel
                                    </CancelBtn>
                                    <BtnWrapper>
                                        <SubmitBtn type="submit">Create</SubmitBtn>
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
export default CreateReport;
