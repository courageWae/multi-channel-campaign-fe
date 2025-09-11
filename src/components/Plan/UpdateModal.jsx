


import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrappers,
    Label,
    SubmitBtn,
    CancelBtn,
    CombineInputGroup
} from "../Styles/InputStyles";
import { MdClose } from "react-icons/md";
import Loading from "../Loading";
import * as Yup from "yup";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateModal = ({ setUpdateModel, selectedData, updateLoading, updateMutate }) => {


    const initialValues = {
        name: selectedData?.name || "",
        planId: selectedData?.id || "",
        description: selectedData?.plan_short_description || "",
        price: selectedData?.price || "",
        discount: selectedData?.discount || "",
        features: selectedData?.key_features || "",
    };

    const validationSchema = Yup.object({
        description: Yup.string().required("Description is required"),
        // price: Yup.string().required("Price is required"),
        // discount: Yup.string().required("Discount is required"),
        features: Yup.string().required("Features are required"),
    });

    const handleSubmit = (values) => {
        updateMutate({
            planName: values.name,
            planId: selectedData?.id,
            planShortDescription: values.description,
            price: values.price || selectedData?.price,
            discount: values.discount || selectedData?.discount,
            keyFeatures: values.features,
        });
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Edit Plan</Title>
                <button
                    onClick={() => {
                        setUpdateModel(false);
                    }}
                >
                    <MdClose color="white" size={24} />
                </button>
            </div>
            {updateLoading && <Loading />}

            <div className="px-8 flex-grow flex flex-col justify-between pb-4">
                {!updateLoading && (
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize validationSchema={validationSchema}>
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form className="flex flex-col h-full justify-between">
                                <Wrapper>
                                    <InputGroup>
                                        <Label htmlFor="name">Plan Name *</Label>
                                        <FieldWrappers className="bg-gray-100 ">
                                            <Field
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="off"
                                                disabled
                                                required

                                                onChange={(e) => {
                                                    setFieldValue("name", e.target.value);

                                                }}
                                                value={values.name}
                                            />

                                        </FieldWrappers>
                                        {errors.name && touched.name ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                                        ) : null}
                                    </InputGroup>
                                    {selectedData.name != "Free" && (
                                        <CombineInputGroup>
                                            <InputGroup>
                                                <Label htmlFor="price">Price *</Label>
                                                <FieldWrappers className=" flex items-center">
                                                    <span className="px-2">₵</span>
                                                    <Field
                                                        type="text"
                                                        name="price"
                                                        id="price"
                                                        autoComplete="off"
                                                        required
                                                        onChange={(e) => setFieldValue("price", e.target.value)}
                                                        value={values.price}
                                                        className="flex-grow bg-transparent"
                                                    />
                                                    <span className="px-2">/month</span>
                                                </FieldWrappers>
                                                {errors.price && touched.price ? (
                                                    <div className="text-red-500 text-sm mt-1">{errors.price}</div>
                                                ) : null}
                                            </InputGroup>

                                            <InputGroup>
                                                <Label htmlFor="discount">Discount *</Label>
                                                <FieldWrappers className=" flex items-center">
                                                    <Field
                                                        type="text"
                                                        name="discount"
                                                        id="discount"
                                                        autoComplete="off"
                                                        required
                                                        onChange={(e) => setFieldValue("discount", e.target.value)}
                                                        value={values.discount}
                                                        className="flex-grow bg-transparent"
                                                    />
                                                    <span className="px-2">%</span>
                                                </FieldWrappers>
                                                {errors.discount && touched.discount ? (
                                                    <div className="text-red-500 text-sm mt-1">{errors.discount}</div>
                                                ) : null}
                                            </InputGroup>
                                        </CombineInputGroup>)}
                                    <InputGroup>
                                        <Label htmlFor="description">Description *</Label>
                                        <FieldWrappers >
                                            <Field
                                                type="text"
                                                name="description"
                                                id="description"
                                                autoComplete="off"

                                                required

                                                onChange={(e) => {
                                                    setFieldValue("description", e.target.value);

                                                }}
                                                value={values.description}
                                            />

                                        </FieldWrappers>
                                        {errors.description && touched.description ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                                        ) : null}
                                    </InputGroup>


                                    <InputGroup>
                                        <Label htmlFor="features">Features *</Label>
                                        {/* <FieldWrappers className="bg-gray-100"> */}
                                        <ReactQuill
                                            value={values.features}
                                            onChange={(value) => setFieldValue("features", value)}
                                            id="features"
                                            name="features"
                                            theme="snow"
                                            className="h-28"
                                        />
                                        {/* </FieldWrappers> */}
                                        {errors.features && touched.features ? (
                                            <div className="text-red-500 text-sm mt-1">{errors.features}</div>
                                        ) : null}
                                    </InputGroup>
                                </Wrapper>
                                <div className="flex justify-between p-4">
                                    <CancelBtn type="button" onClick={() => setUpdateModel(false)}>
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

const Wrapper = tw.div`grid gap-3 mt-3 mb-8`;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;
const MediaCharCount = tw.div`absolute top-2.5 right-2 text-xs text-gray-400`;

export default UpdateModal;
