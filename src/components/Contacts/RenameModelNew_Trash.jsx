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
// import Loading from "../Loading";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Model from "../Model";
import NewModel from "../NewModel";
import { toast } from "react-toastify";

const RenameModel = ({
    // renameLoading,
    setRenameModel,
    deviceId,
    // renameMutate,
}) => {
    const InitialValues = {
        name: deviceId?.name || "",
    };


    const SubmitHandler = (values) => {
        // Rename logic
        console.log(values.name);
        console.log(deviceId.id);
        setRenameModel(false); // Close the model

        // renameMutate({ name: values?.name, groupId: deviceId?.id });
    };

    return (
        <Model width={`w-11/12 max-w-lg `} setOpenModel={setRenameModel}>
            <Title>Rename Contact Group</Title>

            {/* {renameLoading && <Loading />}

            {!renameLoading && ( */}
            <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
                <Form>
                    <Wrapper>
                        <InputGroup>
                            <FieldWrappers>
                                <Field
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="off"
                                    className="truncate !text-center text-base"
                                    required
                                    autofocus
                                />
                            </FieldWrappers>
                        </InputGroup>
                    </Wrapper>
                    <BtnWrapper>
                        <SubmitBtn type="submit">Update</SubmitBtn>
                    </BtnWrapper>
                </Form>
            </Formik>
            {/* // )} */}
        </Model>
    );
};

const Wrapper = tw.div`
grid  gap-10 my-10 px-1`;
const SampleFile = tw.a` w-full pt-3 text-blue-500 underline text-sm text-center`;

const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default RenameModel;
