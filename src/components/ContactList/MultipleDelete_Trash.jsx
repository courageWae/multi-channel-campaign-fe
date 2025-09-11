// import React, { useState } from "react";
// import tw from "tailwind-styled-components";
// import { Formik, Field, Form } from "formik";
// import {
//     InputGroup,
//     FieldWrapper,
//     Label,
//     SubmitBtn,
// } from "../Styles/InputStyles";
// import Loading from "../Loading";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import Model from "../Model";
// import DropzoneForContact from "./DropzoneForContact";
// import Images from "../../Images";
// import { toast } from "react-toastify";

// const MultipleDelete = ({
//     deleteBulkMutate,
//     deleteBulkLoading,
//     setOpenMultipleDeleteModel,
//     groupId,
//     type,
// }) => {
//     const [uploadFile, setUploadFile] = useState("");
//     const [contactType, setContactType] = useState(type || 1);

//     const InitialValues = {
//         name: "",
//     };

//     const SubmitHandler = (values) => {
//         const validRecipients = new RegExp("^[0-9]+(,[0-9]+)*$");

//         if (!validRecipients.test(values?.numbers) || values?.numbers.length == 0) {
//             return toast.error("Please enter valid comma separated phone numbers");
//         }
//         deleteBulkMutate({ numbers: values?.numbers, groupId });
//     };

//     return (
//         <Model
//             width={`w-11/12 max-w-xl `}
//             setOpenModel={setOpenMultipleDeleteModel}
//         >
//             <Title>Delete Bulk Contact</Title>

//             {deleteBulkLoading && <Loading />}

//             {!deleteBulkLoading && (
//                 <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
//                     <Form>
//                         <Wrapper>
//                             <InputGroup>
//                                 <Label htmlFor="name">Phone Numbers</Label>
//                                 <FieldWrapper>
//                                     <Field
//                                         name="numbers"
//                                         as="textarea"
//                                         rows="6"
//                                         id="numbers"
//                                         placeholder="Enter phone number here e.g. 260456789456, 260451254785, 260985467812"
//                                         autoComplete="off"
//                                     />
//                                 </FieldWrapper>
//                             </InputGroup>
//                         </Wrapper>
//                         <BtnWrapper>
//                             <SubmitBtn type="submit">Delete</SubmitBtn>
//                         </BtnWrapper>
//                     </Form>
//                 </Formik>
//             )}
//         </Model>
//     );
// };

// const Wrapper = tw.div`
// grid  gap-10 my-10 px-1`;
// const SampleFile = tw.a` w-full pt-3 text-blue-500 underline text-sm text-center`;

// const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
// const BtnWrapper = tw.div`flex justify-center items-center`;

// export default MultipleDelete;

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
import Model from "../Model";
import { toast } from "react-toastify";

const MultipleDelete = ({
    deleteBulkMutate,
    deleteBulkLoading,
    setOpenMultipleDeleteModel,
    groupId,
    type,
}) => {
    const [contactType, setContactType] = useState(type);

    const InitialValues = {
        contacts: "",
    };

    const SubmitHandler = (values) => {
        if (contactType === 1) {
            const validRecipients = new RegExp("^[0-9]+(,[0-9]+)*$");

            if (!validRecipients.test(values.contacts) || values.contacts.length === 0) {
                return toast.error("Please enter valid comma-separated phone numbers");
            }
            deleteBulkMutate({ contacts: values.contacts, groupId, type: contactType });
        } else if (contactType === 2) {
            const validEmails = new RegExp(
                "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(,[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})*$"
            );

            if (!validEmails.test(values.contacts) || values.contacts.length === 0) {
                return toast.error("Please enter valid comma-separated email addresses");
            }
            deleteBulkMutate({ contacts: values.contacts, groupId, type: contactType });
        }
    };

    return (
        <Model
            width={`w-11/12 max-w-lg `}
            setOpenModel={setOpenMultipleDeleteModel}
        >
            <Title>Delete Bulk Contact</Title>

            {deleteBulkLoading && <Loading />}

            {!deleteBulkLoading && (
                <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
                    <Form>
                        <Wrapper>
                            <InputGroup>
                                <Label htmlFor="contacts">
                                    {contactType === 1 ? "Phone Numbers" : "Email Addresses"}
                                </Label>
                                <FieldWrapper>
                                    <Field
                                        name="contacts"
                                        as="textarea"
                                        rows="6"
                                        id="contacts"
                                        placeholder={
                                            contactType === 1
                                                ? "Enter phone numbers here e.g. 260456789456, 260451254785, 260985467812"
                                                : "Enter email addresses here e.g. example1@gmail.com, example2@yahoo.com"
                                        }
                                        autoComplete="off"
                                    />
                                </FieldWrapper>
                            </InputGroup>
                        </Wrapper>
                        <BtnWrapper>
                            <SubmitBtn type="submit" className="bg-red-500">Delete</SubmitBtn>
                        </BtnWrapper>
                    </Form>
                </Formik>
            )}
        </Model>
    );
};

const Wrapper = tw.div`
grid gap-10 my-10 px-1`;
const SampleFile = tw.a`w-full pt-3 text-blue-500 underline text-sm text-center`;

const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default MultipleDelete;
