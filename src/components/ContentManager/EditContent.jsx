
import React, { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import { InputGroup, FieldWrappers, FieldWrapper, Label, SubmitBtn, CancelBtn } from "../Styles/InputStyles";
import { MdClose } from "react-icons/md";
import Loading from "../Loading";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";

const EditContent = ({ setContentModel, createContentMutate, createContentLoading, selectedData }) => {
    const [mergeFields, setMergeFields] = useState([]);
    const editorRef = useRef(null);

    useEffect(() => {
        if (selectedData && selectedData.merge_fields) {
            setMergeFields(selectedData.merge_fields.split(","));
        }
    }, [selectedData]);

    const initialValues = {
        id: selectedData?.id || "",
        contentType: selectedData?.type || "",
        subject: selectedData?.subject || "",
        message: selectedData?.email_content || "",
        description: selectedData?.sms_content || "",
        insertField: selectedData?.merge_fields || "",
    };

    const handleSubmit = (values) => {
        if (initialValues.contentType === "1" && !values.description) {
            toast.error("Description is required for SMS content.");
            return;
        }
        if (initialValues.contentType === "2") {
            if (!values.subject) {
                toast.error("Subject is required for Email content.");
                return;
            }
            if (!values.message) {
                toast.error("Message is required for Email content.");
                return;
            }
        }
        const newMergeFields = mergeFields.join(",");
        createContentMutate({
            contentId: selectedData?.id,
            subject: values.subject,
            emailContent: values.message,
            smsContent: values.description,
            mergeFields: newMergeFields
        });
    };

    const insertField = (val) => {
        if (editorRef.current) {
            const editor = editorRef.current.getEditor();
            const range = editor.getSelection();
            const currentText = editor.getText();
            const beforeText = currentText.slice(0, range?.index || 0);
            const afterText = currentText.slice(range?.index || 0);

            editor.setText(`${beforeText}{{${val}}}${afterText}`);
            editor.setSelection((range?.index || 0) + `{{${val}}}`.length, (range?.index || 0) + `{{${val}}}`.length);
        } else {
            toast.error("Editor is not available.");
        }
    };

    const handleFieldChange = (e) => {
        const selectedField = e.target.value;
        if (selectedField) {
            if (!mergeFields.includes(selectedField)) {
                setMergeFields((prev) => [...prev, selectedField]);
            }
            insertField(selectedField);
        } else {
            toast.error("Selected field is not valid.");
        }
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Edit Content</Title>
                <button
                    onClick={() => setContentModel(false)}
                >
                    <MdClose color="white" size={24} />
                </button>
            </div>
            {createContentLoading && <Loading />}
            <div className="px-8 flex-grow flex flex-col justify-between pb-4">
                {!createContentLoading && (
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, values, setFieldValue }) => (
                            <Form className="flex flex-col h-full justify-between">
                                <Wrapper>
                                    {initialValues.contentType === "1" && (
                                        <InputGroup>
                                            <Label htmlFor="description">Description *</Label>
                                            <FieldWrappers as="textarea" className="h-32">
                                                <Field
                                                    as="textarea"
                                                    name="description"
                                                    id="description"
                                                    className="w-full h-full pt-1"
                                                    autoComplete="off"
                                                    placeholder="Please write short details"
                                                    required
                                                />
                                            </FieldWrappers>
                                            {errors.description && touched.description ? (
                                                <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                                            ) : null}
                                        </InputGroup>
                                    )}
                                    {initialValues.contentType === "2" && (
                                        <>
                                            <InputGroup>
                                                <Label htmlFor="subject">Subject *</Label>
                                                <FieldWrappers>
                                                    <Field
                                                        type="text"
                                                        name="subject"
                                                        id="subject"
                                                        autoComplete="off"
                                                        value={values.subject}
                                                        onChange={(e) => setFieldValue("subject", e.target.value)}
                                                        required
                                                    />
                                                </FieldWrappers>
                                                {errors.subject && touched.subject ? (
                                                    <div className="text-red-500 text-sm mt-1">{errors.subject}</div>
                                                ) : null}
                                            </InputGroup>
                                            <InputGroup>
                                                <Label htmlFor="insertField">Insert Merge Field</Label>
                                                <FieldWrapper $select={true}>
                                                    <Field
                                                        // required
                                                        name="insertField"
                                                        id="insertField"
                                                        className="border border-gray-300 rounded-md h-10 px-2"
                                                        autoComplete="off"
                                                        as="select"
                                                        onChange={handleFieldChange}
                                                    >
                                                        <option value="" disabled>Select Field</option>
                                                        <option value="Name">Name</option>
                                                        {/* <option value="Last Name">Last Name</option>
                                                        <option value="Mobile Number">Mobile Number</option>
                                                        <option value="Email">Email</option> */}
                                                    </Field>
                                                </FieldWrapper>
                                            </InputGroup>
                                            <InputGroup>
                                                <Label htmlFor="message">Message *</Label>
                                                <ReactQuill
                                                    ref={editorRef}
                                                    value={values.message}
                                                    onChange={(value) => {
                                                        setFieldValue("message", value);
                                                    }}
                                                    id="message"
                                                    name="message"
                                                    theme="snow"
                                                    className="h-28"
                                                />
                                                {errors.message && touched.message ? (
                                                    <div className="text-red-500 text-sm mt-1">{errors.message}</div>
                                                ) : null}
                                            </InputGroup>
                                        </>
                                    )}
                                </Wrapper>
                                <div className="flex justify-between p-4">
                                    <CancelBtn type="button" onClick={() => setContentModel(false)}>
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

const Wrapper = tw.div`grid md:gap-2 md:my-4 `;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default EditContent;




// import React, { useState, useEffect } from "react";
// import tw from "tailwind-styled-components";
// import { Formik, Field, Form } from "formik";
// import { MdClose } from "react-icons/md";
// import Loading from "../Loading";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import { toast } from "react-toastify";
// import {
//     InputGroup,
//     FieldWrappers,
//     FieldWrapper,
//     Label,
//     SubmitBtn,
//     CancelBtn,
// } from "../Styles/InputStyles";

// const EditContent = ({ setContentModel, createContentMutate, createContentLoading, selectedData }) => {

//     const [isVariableAdded, setIsVariableAdded] = useState(false);

//     const initialValues = {
//         id: selectedData?.id,
//         contentType: selectedData?.type,
//         subject: selectedData?.subject,
//         message: selectedData?.email_content,
//         description: selectedData?.sms_content,

//     };

//     const handleSubmit = (values) => {
//         if (initialValues.contentType == "1" && !values.description) {
//             toast.error("Description is required for SMS content.");
//             return;
//         }
//         if (initialValues.contentType == "2") {
//             if (!values.subject) {
//                 toast.error("Subject is required for Email content.");
//                 return;
//             }
//             if (!values.message) {
//                 toast.error("Message is required for Email content.");
//                 return;
//             }
//         }

//         createContentMutate({
//             contentId: selectedData?.id,
//             subject: values.subject,
//             emailContent: values.message,
//             smsContent: values.description,

//         });
//     };


// const handleAddRemoveVariable = (setFieldValue, currentMessage) => {
//     const variablePlaceholder = "{{1}}";
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = currentMessage;
//     const plainTextMessage = tempDiv.textContent || tempDiv.innerText || "";

//     if (isVariableAdded) {
//         const variableRegex = new RegExp(`\\s*${variablePlaceholder}\\s*`);
//         const updatedPlainText = plainTextMessage.replace(variableRegex, "").trim();
//         const updatedMessage = currentMessage.replace(variablePlaceholder, "").trim();
//         setFieldValue("message", updatedMessage);
//         setIsVariableAdded(false);
//     } else {
//         const updatedMessage = `${currentMessage} ${variablePlaceholder}`;
//         setFieldValue("message", updatedMessage.trim());
//         setIsVariableAdded(true);
//     }
// };

//     return (
//         <div className="bg-white w-full h-full flex flex-col">
//             <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
//                 <Title className="text-white">Edit Content</Title>
//                 <button
//                     onClick={() => {
//                         setContentModel(false);
//                     }}
//                 >
//                     <MdClose color="white" size={24} />
//                 </button>
//             </div>
//             {createContentLoading && <Loading />}
//             <div className="px-8 flex-grow flex flex-col justify-between pb-4">
//                 {!createContentLoading && (
//                     <Formik
//                         initialValues={initialValues}
//                         enableReinitialize={true}
//                         onSubmit={handleSubmit}
//                     >
//                         {({ errors, touched, values, setFieldValue }) => (
//                             <Form className="flex flex-col h-full justify-between">
//                                 <Wrapper>
//                                     {initialValues.contentType == "1" && (
//                                         <InputGroup>
//                                             <Label htmlFor="description">Description *</Label>
//                                             <FieldWrappers as="textarea" className="h-32">
//                                                 <Field
//                                                     as="textarea"
//                                                     name="description"
//                                                     id="description"
//                                                     className="w-full h-full pt-1"
//                                                     autoComplete="off"
//                                                     placeholder="Please write short details"
//                                                     required
//                                                 />
//                                             </FieldWrappers>
//                                             {errors.description && touched.description ? (
//                                                 <div className="text-red-500 text-sm mt-1">{errors.description}</div>
//                                             ) : null}
//                                         </InputGroup>
//                                     )}
//                                     {initialValues.contentType == "2" && (
//                                         <>
//                                             <InputGroup>
//                                                 <Label htmlFor="subject">Subject *</Label>
//                                                 <FieldWrappers>
//                                                     <Field
//                                                         type="text"
//                                                         name="subject"
//                                                         id="subject"
//                                                         autoComplete="off"
//                                                         value={values.subject}
//                                                         onChange={(e) => setFieldValue("subject", e.target.value)}
//                                                         required
//                                                     />
//                                                 </FieldWrappers>
//                                                 {errors.subject && touched.subject ? (
//                                                     <div className="text-red-500 text-sm mt-1">{errors.subject}</div>
//                                                 ) : null}
//                                             </InputGroup>

//                                             <InputGroup>
//                                                 <Label htmlFor="message">Message *</Label>
//                                                 <ReactQuill
//                                                     value={values.message}
//                                                     onChange={(value) => setFieldValue("message", value)}
//                                                     id="message"
//                                                     name="message"
//                                                     theme="snow"
//                                                     className="h-28"
//                                                 />
//                                                 {errors.message && touched.message ? (
//                                                     <div className="text-red-500 text-sm mt-1">{errors.message}</div>
//                                                 ) : null}
//                                             </InputGroup>
//                                             <div className="flex items-center justify-end mt-10">
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleAddRemoveVariable(setFieldValue, values.message)}
//                                                     className="text-blue-500 underline"
//                                                 >
//                                                     {isVariableAdded ? "Remove Variable" : "Add Variable"}
//                                                 </button>
//                                             </div>


//                                         </>
//                                     )}
//                                 </Wrapper>
//                                 <div className="flex justify-between p-4">
//                                     <CancelBtn type="button" onClick={() => setContentModel(false)}>
//                                         Cancel
//                                     </CancelBtn>
//                                     <BtnWrapper>
//                                         <SubmitBtn type="submit">Update</SubmitBtn>
//                                     </BtnWrapper>
//                                 </div>
//                             </Form>
//                         )}
//                     </Formik>
//                 )}
//             </div>
//         </div >
//     );
// };

// const Wrapper = tw.div`grid md:gap-2 md:my-4 `;
// const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
// const BtnWrapper = tw.div`flex justify-center items-center`;

// export default EditContent;

// import React, { useState, useRef } from "react";
// import tw from "tailwind-styled-components";
// import { Formik, Field, Form } from "formik";
// import { MdClose } from "react-icons/md";
// import Loading from "../Loading";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { toast } from "react-toastify";
// import {
//     InputGroup,
//     FieldWrappers,
//     Label,
//     SubmitBtn,
//     CancelBtn,
// } from "../Styles/InputStyles";

// const EditContent = ({ setContentModel, createContentMutate, createContentLoading, selectedData }) => {
//     const [isVariableAdded, setIsVariableAdded] = useState(false);
//     const quillRef = useRef(null); // Create a reference for ReactQuill

//     const initialValues = {
//         id: selectedData?.id,
//         contentType: selectedData?.type,
//         subject: selectedData?.subject,
//         message: selectedData?.email_content,
//         description: selectedData?.sms_content,
//     };

//     const handleSubmit = (values) => {
//         if (initialValues.contentType == "1" && !values.description) {
//             toast.error("Description is required for SMS content.");
//             return;
//         }
//         if (initialValues.contentType == "2") {
//             if (!values.subject) {
//                 toast.error("Subject is required for Email content.");
//                 return;
//             }
//             if (!values.message) {
//                 toast.error("Message is required for Email content.");
//                 return;
//             }
//         }

//         createContentMutate({
//             contentId: selectedData?.id,
//             subject: values.subject,
//             emailContent: values.message,
//             smsContent: values.description,
//         });
//     };

//     const handleAddRemoveVariable = (setFieldValue, currentMessage) => {
//         const quillEditor = quillRef.current.getEditor();
//         const cursorPosition = quillEditor.getSelection();
//         const variablePlaceholder = "{{1}}";

//         if (isVariableAdded) {

//             const variableRegex = new RegExp(`\\s*${variablePlaceholder}\\s*`);
//             const updatedMessage = currentMessage.replace(variableRegex, "").trim();
//             setFieldValue("message", updatedMessage);
//             setIsVariableAdded(false);
//         } else {

//             let updatedMessage;
//             if (cursorPosition) {
//                 quillEditor.insertText(cursorPosition.index, ` ${variablePlaceholder}`);
//                 updatedMessage = quillEditor.root.innerHTML;
//             } else {
//                 updatedMessage = `${currentMessage} ${variablePlaceholder}`;
//                 quillEditor.setContents([{ insert: updatedMessage }]);
//             }
//             setFieldValue("message", updatedMessage.trim());
//             setIsVariableAdded(true);
//         }
//     };
    

//     return (
//         <div className="bg-white w-full h-full flex flex-col">
//             <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
//                 <Title className="text-white">Edit Content</Title>
//                 <button
//                     onClick={() => {
//                         setContentModel(false);
//                     }}
//                 >
//                     <MdClose color="white" size={24} />
//                 </button>
//             </div>
//             {createContentLoading && <Loading />}
//             <div className="px-8 flex-grow flex flex-col justify-between pb-4">
//                 {!createContentLoading && (
//                     <Formik
//                         initialValues={initialValues}
//                         enableReinitialize={true}
//                         onSubmit={handleSubmit}
//                     >
//                         {({ errors, touched, values, setFieldValue }) => (
//                             <Form className="flex flex-col h-full justify-between">
//                                 <Wrapper>
//                                     {initialValues.contentType == "1" && (
//                                         <InputGroup>
//                                             <Label htmlFor="description">Description *</Label>
//                                             <FieldWrappers as="textarea" className="h-32">
//                                                 <Field
//                                                     as="textarea"
//                                                     name="description"
//                                                     id="description"
//                                                     className="w-full h-full pt-1"
//                                                     autoComplete="off"
//                                                     placeholder="Please write short details"
//                                                     required
//                                                 />
//                                             </FieldWrappers>
//                                             {errors.description && touched.description ? (
//                                                 <div className="text-red-500 text-sm mt-1">{errors.description}</div>
//                                             ) : null}
//                                         </InputGroup>
//                                     )}
//                                     {initialValues.contentType == "2" && (
//                                         <>
//                                             <InputGroup>
//                                                 <Label htmlFor="subject">Subject *</Label>
//                                                 <FieldWrappers>
//                                                     <Field
//                                                         type="text"
//                                                         name="subject"
//                                                         id="subject"
//                                                         autoComplete="off"
//                                                         value={values.subject}
//                                                         onChange={(e) => setFieldValue("subject", e.target.value)}
//                                                         required
//                                                     />
//                                                 </FieldWrappers>
//                                                 {errors.subject && touched.subject ? (
//                                                     <div className="text-red-500 text-sm mt-1">{errors.subject}</div>
//                                                 ) : null}
//                                             </InputGroup>

//                                             <InputGroup>
//                                                 <Label htmlFor="message">Message *</Label>
//                                                 <ReactQuill
//                                                     value={values.message}
//                                                     onChange={(value) => setFieldValue("message", value)}
//                                                     ref={quillRef} // Attach the ref to ReactQuill
//                                                     id="message"
//                                                     name="message"
//                                                     theme="snow"
//                                                     className="h-28"
//                                                 />
//                                                 {errors.message && touched.message ? (
//                                                     <div className="text-red-500 text-sm mt-1">{errors.message}</div>
//                                                 ) : null}
//                                             </InputGroup>
//                                             <div className="flex items-center justify-end mt-10">
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleAddRemoveVariable(setFieldValue, values.message)}
//                                                     className="text-blue-500 underline"
//                                                 >
//                                                     {isVariableAdded ? "Remove Variable" : "Add Variable"}
//                                                 </button>
//                                             </div>
//                                         </>
//                                     )}
//                                 </Wrapper>
//                                 <div className="flex justify-between p-4">
//                                     <CancelBtn type="button" onClick={() => setContentModel(false)}>
//                                         Cancel
//                                     </CancelBtn>
//                                     <BtnWrapper>
//                                         <SubmitBtn type="submit">Update</SubmitBtn>
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

// const Wrapper = tw.div`grid md:gap-2 md:my-4 `;
// const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
// const BtnWrapper = tw.div`flex justify-center items-center`;

// export default EditContent;
