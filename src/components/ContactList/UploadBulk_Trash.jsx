import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrapper,
    Label,
    SubmitBtn,
} from "../Styles/InputStyles";
import Loading from "../Loading";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Model from "../Model";
import DropzoneForContact from "./DropzoneForContact_Trash";
import Images from "Images"
import { toast } from "react-toastify";

const UploadBulk = ({
    uploadBulkMutate,
    uploadBulkLoading,
    setOpenBulkUploadModel,
    groupId,
    type,
}) => {
    const [uploadFile, setUploadFile] = useState("");
    const [contactType, setContactType] = useState(type || 1);
    const InitialValues = {
        name: "",
    };

    const SubmitHandler = (values) => {
        console.log(uploadFile)
        if (!uploadFile) {
            return toast.error("Please upload the Contacts");
        }
        uploadBulkMutate({ filename: uploadFile, groupId });
    };

    return (
        <Model width={`w-11/12 max-w-lg `} setOpenModel={setOpenBulkUploadModel}>
            <Title>Add Bulk Contact</Title>

            {uploadBulkLoading && <Loading />}

            {!uploadBulkLoading && (
                <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
                    <Form>
                        <Wrapper>
                            <InputGroup>
                                <Label htmlFor="name">Upload Excel File</Label>
                                <DropzoneForContact setUploadFile={setUploadFile} />
                                {contactType === 1 && (
                                    <SampleFile href={Images.ExcelMobile} download>
                                        Download Mobile Contact Template
                                    </SampleFile>
                                )}
                                {contactType === 2 && (
                                    <SampleFile href={Images.ExcelEmail} download>
                                        Download Email Contact Template
                                    </SampleFile>
                                )}
                            </InputGroup>
                        </Wrapper>
                        <BtnWrapper>
                            <SubmitBtn type="submit">Add</SubmitBtn>
                        </BtnWrapper>
                    </Form>
                </Formik>
            )}
        </Model>
    );
};

const Wrapper = tw.div`
grid  gap-10 my-10 px-1`;
const SampleFile = tw.a` w-full pt-3 text-blue-500 underline text-sm text-center`;

const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default UploadBulk;
