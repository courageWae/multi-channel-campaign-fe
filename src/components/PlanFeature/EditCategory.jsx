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

const EditCategory = ({ setEditCategoryModel, selectedData, editCategoryMutate, editCategoryLoading }) => {
    const initialValues = {
        name: selectedData?.name || "",
        categoryId: selectedData?.id || "",
        status: selectedData?.status || "",
    };

    const handleSubmit = (values) => {
        editCategoryMutate({
            name: values.name,
            categoryId: selectedData?.id,
            status: values.status,

        });
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Update Category</Title>
                <button
                    onClick={() => {
                        setEditCategoryModel(false);
                    }}
                >
                    <MdClose color="white" size={24} />
                </button>
            </div>
            {editCategoryLoading && <Loading />}
            <div className="px-8 flex-grow flex flex-col justify-between pb-4">
                {!editCategoryLoading && (
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                        <Form className="flex flex-col h-full justify-between">
                            <Wrapper>
                                <InputGroup>
                                    <Label htmlFor="name">Category Name *</Label>
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
                                <InputGroup>
                                    <Label htmlFor="status">Status</Label>
                                    <FieldWrapper $select={true}>
                                        <Field required name="status" id="status" autoComplete="off">
                                            {(props) => (
                                                <Select
                                                    className="w-full h-full pl-2"
                                                    {...props.field}
                                                >
                                                    <MenuItem value="1">Active</MenuItem>
                                                    <MenuItem value="0">Inactive</MenuItem>
                                                </Select>
                                            )}
                                        </Field>
                                    </FieldWrapper>
                                </InputGroup>
                            </Wrapper>
                            <div className="flex justify-between p-4">
                                <button
                                    type="button"
                                    onClick={() => setEditCategoryModel(false)}
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

export default EditCategory;
