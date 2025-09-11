import React from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrappers,
    FieldWrapper,
    Label,
    SubmitBtn,
} from "../Styles/InputStyles";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import Loading from "components/Loading";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const EditModel = ({ setRenameModel, selectedData, renameLoading, renameMutate }) => {
    const initialValues = {
        keyword: selectedData?.keyword || "",
        keywordId: selectedData?.id || "",
        mode: selectedData?.mode || "",
        type: selectedData?.type || "",
    };

    const handleSubmit = (values) => {
        renameMutate({
            keyword: values.keyword,
            keywordId: selectedData?.id,
            type: values.type,
            // mode: values.mode,
            mode: 1,
        });
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Update Keyword</Title>
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
                        <Form className="flex flex-col h-full justify-between">
                            <Wrapper>
                                <InputGroup>
                                    <Label htmlFor="type">Type</Label>
                                    <FieldWrapper $select={true}>
                                        <Field required name="type" id="type" autoComplete="off">
                                            {(props) => (
                                                <Select
                                                    className="w-full h-full pl-2"
                                                    {...props.field}
                                                >
                                                    <MenuItem value="1">Sender Id</MenuItem>
                                                    <MenuItem value="2">Message</MenuItem>
                                                </Select>
                                            )}
                                        </Field>
                                    </FieldWrapper>
                                </InputGroup>
                                <InputGroup>
                                    <Label htmlFor="keyword">keyword *</Label>
                                    <FieldWrappers>
                                        <Field
                                            type="text"
                                            name="keyword"
                                            id="keyword"
                                            autoComplete="off"
                                            className="truncate"
                                            required
                                        />
                                    </FieldWrappers>
                                </InputGroup>

                                {/* <InputGroup>
                                    <Label htmlFor="mode">Mode</Label>
                                    <FieldWrapper $select={true}>
                                        <Field required name="mode" id="mode" autoComplete="off">
                                            {(props) => (
                                                <Select
                                                    className="w-full h-full pl-2"
                                                    {...props.field}
                                                >
                                                    <MenuItem value="1">SMS</MenuItem>
                                                    <MenuItem value="2">Email</MenuItem>
                                                </Select>
                                            )}
                                        </Field>
                                    </FieldWrapper>
                                </InputGroup> */}
                            </Wrapper>
                            <div className="flex justify-between p-4">
                                <button
                                    type="button"
                                    onClick={() => setRenameModel(false)}
                                    className="hover:bg-purple-100 p-2 rounded-xl transition-all duration-100 hover:text-topBar-purple"
                                >
                                    Cancel
                                </button>
                                <BtnWrapper>
                                    <SubmitBtn type="submit">Update</SubmitBtn>
                                </BtnWrapper>
                            </div>
                        </Form>
                    </Formik>)}
            </div>
        </div>
    );
};

const Wrapper = tw.div`
    grid gap-6 my-6
`;
const Title = tw.h1`
    text-lg md:text-xl font-medium text-center text-gray-800
`;
const BtnWrapper = tw.div`
    flex justify-center items-center
`;

export default EditModel;
