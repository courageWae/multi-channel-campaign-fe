import React from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import Loading from "../Loading";
import {
    InputGroup,
    FieldWrapper,
    Label,
    SubmitBtn,
    CombineInputGroup,
    FieldWrappers,
} from "../Styles/InputStyles";
import MenuItem from "@mui/material/MenuItem";
import Select from "react-select";
import Model from "../Model";

const EditModel = ({
    editSingleEntry,
    editEntryLoading,
    selectedItem,
    setEditModel,
}) => {
    const InitialValues = {
        senderId: selectedItem?.sender_id,
        rowId: selectedItem?.id,
    };

    const SubmitHandler = (values) => editSingleEntry(values);

    return (
        <Model width={`w-11/12 max-w-lg`} setOpenModel={setEditModel}>
            <Title>Edit Details</Title>

            {editEntryLoading && <Loading />}

            {!editEntryLoading && (
                <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
                    <Form>
                        <Wrapper>
                            <InputGroup>
                                <Label htmlFor="senderId">Sender Id</Label>
                                <FieldWrappers>
                                    <Field
                                        type="text"
                                        required
                                        name="senderId"
                                        id="senderId"
                                        autoComplete="off"
                                    />
                                </FieldWrappers>
                            </InputGroup>
                        </Wrapper>
                        <BtnWrapper>
                            <SubmitBtn type="submit">Update</SubmitBtn>
                        </BtnWrapper>
                    </Form>
                </Formik>
            )}
        </Model>
    );
};

const Wrapper = tw.div`
grid  gap-10 my-10 px-1 `;

const Title = tw.h2` text-lg md:text-xl lg:text-2xl text-gray-600 font-medium mb-6 text-center`;
const BtnWrapper = tw.div` w-full flex items-center justify-center space-x-10 mt-8`;

export default EditModel;
