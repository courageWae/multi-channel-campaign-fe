import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrapper,
    Label,
    SubmitBtn,
    FieldWrappers,
} from "../Styles/InputStyles";
import Loading from "../Loading";
import MenuItem from "@mui/material/MenuItem";
// import Select from "react-select";
import Select from "@mui/material/Select";
import Model from "../Model";
import DropzoneForContact from "../Contacts/DropzoneForContact_Trash";
import Images from "../../Images";
import Config from "../../Config";
import { toast } from "react-toastify";

const AddModel = ({
    SingleEntryLoading,
    postSingleEntry,
    setOpenAddModel,
    users,
}) => {
    const [uploadFile, setUploadFile] = useState("");

    const InitialValues = {
        usersId: "",
        senderId: "",
    };

    const SubmitHandler = (values) => {
        if (values.senderId.length > Config.SenderIdLength) {
            return toast.error(
                `Sender Id cannot be more than ${Config.SenderIdLength} characters`
            );
        }
        postSingleEntry(values);
    };

    return (
        <Model width={`w-11/12 max-w-xl `} setOpenModel={setOpenAddModel}>
            <Title>Add New Sender ID</Title>

            {SingleEntryLoading && <Loading />}

            {!SingleEntryLoading && (
                <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
                    <Form>
                        <Wrapper>
                            <InputGroup>
                                <Label htmlFor="usersId">Select User</Label>
                                <FieldWrapper $select={true}>
                                    <Field
                                        required
                                        name="usersId"
                                        id="usersId"
                                        autoComplete="off"
                                    >
                                        {(props) => (
                                            <Select
                                                required
                                                {...props.field}
                                                className="w-full h-full pl-2 bg-transparent text-sm p-0  border-none"
                                                autoComplete="none"
                                            >
                                                <MenuItem value="0" disabled>
                                                    Select User
                                                </MenuItem>
                                                {users?.map((user) => (
                                                    <MenuItem value={user?.id}>{user?.name}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    </Field>
                                </FieldWrapper>
                            </InputGroup>

                            <InputGroup>
                                <Label htmlFor="senderId">Sender Id</Label>
                                <FieldWrappers>
                                    <Field
                                        type="text"
                                        name="senderId"
                                        id="senderId"
                                        autoComplete="off"
                                        className="truncate"
                                        maxlength={Config.SenderIdLength}
                                        required
                                    />
                                </FieldWrappers>
                                <p className="text-sm text-gray-600 font-medium ">
                                    NOTE: Sender Id cannot be more than {Config.SenderIdLength}{" "}
                                    characters
                                </p>
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

export default AddModel;
