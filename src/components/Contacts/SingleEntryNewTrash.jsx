

import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrapper,
    FieldWrappers,
    FieldWrapperSelect,
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

const SingleEntry = ({
    setOpenUploadModel,

}) => {


    const InitialValues = {
        name: "",

    };

    const SubmitHandler = (values) => {
        console.log(values);

    };

    return (
        <Model width={`w-11/12 max-w-lg `} setOpenModel={setOpenUploadModel}>
            <Title>Create Contact Group</Title>
            {/* {SingleEntryLoading && <Loading />} */}

            {/* {!SingleEntryLoading && ( */}
            <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
                {({ values, setFieldValue }) => (
                    <Form>

                        <InputGroup>
                            <Label htmlFor="name">Group Name</Label>
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
                        </InputGroup>
                        <BtnWrapper >
                            <SubmitBtn type="submit">Create</SubmitBtn>
                        </BtnWrapper>
                    </Form>
                )}
            </Formik>
            {/* )} */}
        </Model>
    );
};

const Wrapper = tw.div`
grid md:grid-cols-2  gap-6 my-6 px-1`;
const SampleFile = tw.a`w-full pt-3 text-blue-500 underline text-sm text-center`;

const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center mt-6`;

export default SingleEntry;
