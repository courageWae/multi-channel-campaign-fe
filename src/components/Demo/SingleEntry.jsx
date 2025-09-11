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

import Model from "../Model";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";

const SingleEntry = ({
    SingleEntryLoading,
    postSingleEntry,
    setOpenUploadModel,
}) => {
    const InitialValues = {
        reportName: "",
        startDate: "",
        endDate: "",
        type: "1",
    };

    const SubmitHandler = (values) => {
        if (!values.type) {
            return toast.error("Please select report type");
        }
        postSingleEntry(values);
    };

    return (
        <Model width={`w-11/12 max-w-xl  `} setOpenModel={setOpenUploadModel}>
            <Title>Generate Report</Title>


            <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
                {(formikProps) => (
                    <Form>
                        <Wrapper>
                            <CombineInputGroup>
                                <InputGroup>
                                    <Label htmlFor="startDate">Start Date</Label>
                                    <FieldWrapper>
                                        <Field
                                            name="startDate"
                                            type="date"
                                            id="startDate"
                                            autoComplete="off"
                                            required
                                        />
                                    </FieldWrapper>
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="endDate">End Date</Label>
                                    <FieldWrapper>
                                        <Field
                                            name="endDate"
                                            type="date"
                                            id="endDate"
                                            autoComplete="off"
                                            required
                                        />
                                    </FieldWrapper>
                                </InputGroup>
                            </CombineInputGroup>

                            <InputGroup>
                                <Label htmlFor="reportName">Report Name</Label>
                                <FieldWrapper>
                                    <Field
                                        type="text"
                                        name="reportName"
                                        id="reportName"
                                        autoComplete="off"
                                        className="truncate"
                                        required
                                    />
                                </FieldWrapper>
                            </InputGroup>

                            <InputGroup>
                                <Label htmlFor="type">Report Type</Label>
                                <FieldWrapper $select={true}>
                                    <Field
                                        type="text"
                                        name="type"
                                        id="type"
                                        autoComplete="off"
                                        className="truncate"
                                        required
                                    >
                                        {(props) => (
                                            <Select
                                                autoComplete="off"
                                                className="w-full pl-2  bg-transparent text-sm p-0 border-none"
                                                style={{ height: "40px" }}
                                                {...props.field}
                                            >
                                                <MenuItem value="1">SMS</MenuItem>
                                                <MenuItem value="2">Voice</MenuItem>
                                                <MenuItem value="3">Email</MenuItem>
                                            </Select>
                                        )}
                                    </Field>
                                </FieldWrapper>
                            </InputGroup>
                        </Wrapper>
                        <BtnWrapper>
                            <SubmitBtn type="submit">Generate</SubmitBtn>
                        </BtnWrapper>
                    </Form>
                )}
            </Formik>

        </Model>
    );
};

const Wrapper = tw.div`
grid  gap-6 my-10 px-1`;
const SampleFile = tw.a` w-full pt-3 text-blue-500 underline text-sm text-center`;

const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default SingleEntry;
