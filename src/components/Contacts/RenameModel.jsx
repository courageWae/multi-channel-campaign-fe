

import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrappers,
    Label,
    SubmitBtn,
    CancelBtn
} from "../Styles/InputStyles";
import { MdClose } from "react-icons/md";
import Loading from "../Loading";
import * as Yup from "yup";

const RenameModel = ({ setRenameModel, selectedData, renameLoading, renameMutate }) => {
    const [bodyCharCount, setBodyCharCount] = useState(0);
    useEffect(() => {
        if (selectedData?.name) {
            setBodyCharCount(selectedData.name.length);
        }
    }, [selectedData]);
    const initialValues = {
        name: selectedData?.name || "",
        groupId: selectedData?.id || "",
    };
    const validationSchema = Yup.object({
        name: Yup.string().required("Group name is required"),

    });
    const handleSubmit = (values) => {
        renameMutate({
            groupName: values.name,
            groupId: selectedData?.id
        });
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Rename Contact Group</Title>
                <button
                    onClick={() => {
                        setRenameModel(false);
                    }}
                >
                    <MdClose color="white" size={24} />
                </button>
            </div>
            {renameLoading && <Loading />}

            <div className="px-8 flex-grow flex flex-col justify-between pb-4">
                {!renameLoading && (
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form className="flex flex-col h-full justify-between">
                                <Wrapper>
                                    <InputGroup>
                                        <Label htmlFor="name">New Group Name *</Label>
                                        <FieldWrappers>
                                            <Field
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="off"
                                                className="truncate"
                                                required
                                                maxLength="40"
                                                onChange={(e) => {
                                                    setFieldValue("name", e.target.value);
                                                    setBodyCharCount(e.target.value.length);
                                                }}
                                                value={values.name}
                                            />
                                            <MediaCharCount>{bodyCharCount}/40</MediaCharCount>
                                        </FieldWrappers>
                                        {errors.name && touched.name ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                                        ) : null}

                                    </InputGroup>
                                </Wrapper>
                                <div className="flex justify-between p-4">
                                    {/* <button
                                    type="button"
                                    onClick={() => setRenameModel(false)}
                                    className="hover:bg-purple-100 p-2 rounded-xl transition-all duration-100 hover:text-topBar-purple"
                                >
                                    Cancel
                                </button> */}
                                    <CancelBtn type="button" onClick={() => setRenameModel(false)}>
                                        Cancel
                                    </CancelBtn>
                                    <BtnWrapper>
                                        <SubmitBtn type="submit">Rename</SubmitBtn>
                                    </BtnWrapper>
                                </div>
                            </Form>)}
                    </Formik>)}
            </div>
        </div>
    );
};

const Wrapper = tw.div`grid gap-6 my-6`;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;
const MediaCharCount = tw.div`absolute top-2.5 right-2 text-xs text-gray-400`;
export default RenameModel;
