
import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
    InputGroup,
    FieldWrappers,
    Label,
    SubmitBtn,
    CancelBtn
} from "../Styles/InputStyles";
import Loading from "../Loading";
import { MdClose } from "react-icons/md";

const EditMessageTemplate = ({
    setOpenMessageModel,
    editTemplateMutate,
    editTemplateLoading,
    smsTemplate,
    selectedTemplateMessage,
    setSelectedTemplateMessage,

}) => {
    const [bodyCharCount, setBodyCharCount] = useState(0);
    const initialValues = {

        body: selectedTemplateMessage,
        templateId: smsTemplate,
    };
    console.log(initialValues.templateId)
    useEffect(() => {
        if (initialValues.body) {
            setBodyCharCount(initialValues.body.length);
        }

    }, [initialValues.body]);

    const validationSchema = Yup.object({


        body: Yup.string().required("Message is required"),
    });

    const handleSubmit = (values) => {
        editTemplateMutate({
            message: values.body,
            id: smsTemplate,
        });

    };

    const handleClose = () => {

        setOpenMessageModel(false);
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Edit Template Message</Title>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    <button onClick={() => handleClose()}>
                        <MdClose color="white" size={24} />
                    </button>

                </Formik>
            </div>
            {editTemplateLoading && <Loading />}

            <div className="px-8 h-full flex flex-col justify-between pb-4">
                {!editTemplateLoading && (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form className="flex flex-col h-full justify-between">
                                <Wrapper>

                                    <InputGroup>
                                        <Label htmlFor="body">Body *</Label>
                                        <FieldWrappers as="textarea" className="h-32">
                                            <Field
                                                as="textarea"
                                                name="body"
                                                id="body"
                                                className="w-10/12 h-full py-1"
                                                autoComplete="off"
                                                row="10"
                                                required
                                                maxLength="1600"
                                                onChange={(e) => {
                                                    setFieldValue("body", e.target.value);
                                                    setBodyCharCount(e.target.value.length);
                                                }}
                                                value={values.body}
                                            />
                                            <CharCount>
                                                {" "}
                                                {Math.ceil(bodyCharCount / 160)} SMS
                                            </CharCount>
                                        </FieldWrappers>
                                        {errors.body && touched.body ? (
                                            <Error>{errors.body}</Error>
                                        ) : null}
                                    </InputGroup>
                                </Wrapper>

                                <div className="flex justify-between p-4">
                                    <CancelBtn type="button" onClick={() => handleClose()}>
                                        Cancel
                                    </CancelBtn>
                                    <BtnWrapper>
                                        <SubmitBtn type="submit">Update</SubmitBtn>
                                    </BtnWrapper>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

const Wrapper = tw.div`grid gap-6 my-6`;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;
const CharCount = tw.div`absolute bottom-2 right-2 text-xs text-gray-400`;
const MediaCharCount = tw.div`absolute top-2.5 right-2 text-xs text-gray-400`;
const Error = tw.div`text-red-500 text-xs italic mb-4`;
export default EditMessageTemplate;
