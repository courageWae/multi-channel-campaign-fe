// import React from "react";
// import tw from "tailwind-styled-components";
// import { Formik, Field, Form } from "formik";
// import * as Yup from "yup";
// import Select from "react-select";
// import {
//     InputGroup,
//     FieldWrappers,
//     Label,
//     SubmitBtn,
//     CancelBtn,
// } from "../Styles/InputStyles";
// import { MdClose } from "react-icons/md";
// import Loading from "../Loading";

// const validationSchema = Yup.object({
//     name: Yup.string().required("Name is required"),
//     tooltip: Yup.string().required("Tooltip is required"),
//     isAccessible: Yup.array().min(1, "Select at least one option").required("Is Accessible is required"),
// });

// const options = [
//     { value: "1", label: "Free" },
//     { value: "2", label: "Bronze" },
//     { value: "3", label: "Silver" },
//     { value: "4", label: "Gold" },
// ];

// const AddFeature = ({ setAddModel, addMutate, addLoading, selectedData }) => {
//     const initialValues = {
//         name: "",
//         toolTip: "",
//         categoryId: selectedData.id,
//         isAccessible: [],
//     };

//     const handleSubmit = (values) => {
//         console.log(values);
//         addMutate({
//             name: values.name,
//             toolTip: values.tooltip,
//             categoryId: selectedData.id,
//             // isAccessible: values.isAccessible.map(option => option.value),
//             isAccessible: values.isAccessible.map(option => ({ value: option.value, label: option.label })),
//         });
//     };

//     return (
//         <div className="bg-white w-full h-full flex flex-col">
//             <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
//                 <Title className="text-white">Add Feature</Title>
//                 <button
//                     onClick={() => {
//                         setAddModel(false);
//                     }}
//                 >
//                     <MdClose color="white" size={24} />
//                 </button>
//             </div>
//             {addLoading && <Loading />}
//             <div className="px-8 flex-grow flex flex-col justify-between pb-4">
//                 {!addLoading && (
//                     <Formik
//                         initialValues={initialValues}
//                         validationSchema={validationSchema}
//                         onSubmit={handleSubmit}
//                     >
//                         {({ errors, touched, setFieldValue }) => (
//                             <Form className="flex flex-col h-full justify-between">
//                                 <Wrapper>
//                                     <InputGroup>
//                                         <Label htmlFor="name">Name *</Label>
//                                         <FieldWrappers>
//                                             <Field
//                                                 type="text"
//                                                 name="name"
//                                                 id="name"
//                                                 autoComplete="off"
//                                                 className="truncate"
//                                                 required
//                                             />
//                                         </FieldWrappers>
//                                         {errors.name && touched.name ? (
//                                             <div className="text-red-500">{errors.name}</div>
//                                         ) : null}
//                                     </InputGroup>
//                                     <InputGroup>
//                                         <Label htmlFor="tooltip">Tooltip *</Label>
//                                         <FieldWrappers>
//                                             <Field
//                                                 type="text"
//                                                 name="tooltip"
//                                                 id="tooltip"
//                                                 autoComplete="off"
//                                                 className="truncate"
//                                                 required
//                                             />
//                                         </FieldWrappers>
//                                         {errors.tooltip && touched.tooltip ? (
//                                             <div className="text-red-500">{errors.tooltip}</div>
//                                         ) : null}
//                                     </InputGroup>
//                                     <InputGroup>
//                                         <Label htmlFor="isAccessible">Is Accessible *</Label>
//                                         <FieldWrappers className="!pl-0">
//                                             <Select
//                                                 id="isAccessible"
//                                                 name="isAccessible"
//                                                 options={options}
//                                                 isMulti
//                                                 onChange={(selectedOptions) => setFieldValue("isAccessible", selectedOptions)}
//                                                 className="basic-multi-select w-full"
//                                                 classNamePrefix="select"
//                                             />
//                                         </FieldWrappers>
//                                         {errors.isAccessible && touched.isAccessible ? (
//                                             <div className="text-red-500">{errors.isAccessible}</div>
//                                         ) : null}
//                                     </InputGroup>
//                                 </Wrapper>
//                                 <div className="flex justify-between p-4">
//                                     <CancelBtn type="button" onClick={() => setAddModel(false)}>
//                                         Cancel
//                                     </CancelBtn>
//                                     <BtnWrapper>
//                                         <SubmitBtn type="submit">Add</SubmitBtn>
//                                     </BtnWrapper>
//                                 </div>
//                             </Form>
//                         )}
//                     </Formik>
//                 )}
//             </div>
//         </div>
//     );
// };

// const Wrapper = tw.div`grid md:gap-6 md:my-6 `;
// const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
// const BtnWrapper = tw.div`flex justify-center items-center`;

// export default AddFeature;

import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
    InputGroup,
    FieldWrappers,
    Label,
    SubmitBtn,
    CancelBtn,
} from "../Styles/InputStyles";
import { MdClose } from "react-icons/md";
import Loading from "../Loading";
import { FaCheck } from "react-icons/fa";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    tooltip: Yup.string().required("Tooltip is required"),
    isAccessible: Yup.array().min(1, "Select at least one option").required("Is Accessible is required"),
});

const options = [
    { value: "1", label: "Free" },
    { value: "2", label: "Bronze" },
    { value: "3", label: "Silver" },
    { value: "4", label: "Gold" },
];

const Tag = ({ tag, selected, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center justify-between cursor-pointer px-4 py-1 rounded-full border ${selected
            ? "bg-orange-100 text-orange-600 border-orange-600"
            : "bg-gray-100 text-gray-600 border-gray-400"
            }`}
    >
        {selected && <FaCheck className="mr-2" />}
        {tag.label}

    </div>
);

const AddFeature = ({ setAddModel, addMutate, addLoading, selectedData }) => {
    const initialValues = {
        name: "",
        toolTip: "",
        categoryId: selectedData.id,
        isAccessible: [],
    };

    const handleSubmit = (values) => {
        console.log(values);
        addMutate({
            name: values.name,
            toolTip: values.tooltip,
            categoryId: selectedData.id,
            isAccessible: values.isAccessible,
        });
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Add Feature</Title>
                <button
                    onClick={() => {
                        setAddModel(false);
                    }}
                >
                    <MdClose color="white" size={24} />
                </button>
            </div>
            {addLoading && <Loading />}
            <div className="px-8 flex-grow flex flex-col justify-between pb-4">
                {!addLoading && (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, values, setFieldValue }) => (
                            <Form className="flex flex-col h-full justify-between">
                                <Wrapper>
                                    <InputGroup>
                                        <Label htmlFor="name">Name *</Label>
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
                                        {errors.name && touched.name ? (
                                            <div className="text-red-500">{errors.name}</div>
                                        ) : null}
                                    </InputGroup>
                                    <InputGroup>
                                        <Label htmlFor="tooltip">Tooltip *</Label>
                                        <FieldWrappers>
                                            <Field
                                                type="text"
                                                name="tooltip"
                                                id="tooltip"
                                                autoComplete="off"
                                                className="truncate"
                                                required
                                            />
                                        </FieldWrappers>
                                        {errors.tooltip && touched.tooltip ? (
                                            <div className="text-red-500">{errors.tooltip}</div>
                                        ) : null}
                                    </InputGroup>
                                    <InputGroup >
                                        <Label htmlFor="isAccessible">Please select a plan *</Label>
                                        <p classname="text-[10px] text-gray-300 !pb-2">Select plans for which feature is available</p>
                                        {/* <FieldWrappers className="!pl-0"> */}
                                        <div className="flex flex-wrap gap-2 ">
                                            {options.map((option) => (
                                                <Tag
                                                    key={option.value}
                                                    tag={option}
                                                    selected={values.isAccessible.includes(option)}
                                                    onClick={() => {
                                                        const newValue = values.isAccessible.includes(option)
                                                            ? values.isAccessible.filter((t) => t !== option)
                                                            : [...values.isAccessible, option];
                                                        setFieldValue("isAccessible", newValue);
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        {/* </FieldWrappers> */}
                                        {errors.isAccessible && touched.isAccessible ? (
                                            <div className="text-red-500">{errors.isAccessible}</div>
                                        ) : null}
                                    </InputGroup>
                                </Wrapper>
                                <div className="flex justify-between p-4">
                                    <CancelBtn type="button" onClick={() => setAddModel(false)}>
                                        Cancel
                                    </CancelBtn>
                                    <BtnWrapper>
                                        <SubmitBtn type="submit">Add</SubmitBtn>
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

const Wrapper = tw.div`grid md:gap-6 md:my-6 `;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default AddFeature;
