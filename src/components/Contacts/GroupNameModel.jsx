


import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
  InputGroup,
  FieldWrappers,
  Label,
  SubmitBtn,
  CancelBtn
} from "../Styles/InputStyles";
import Loading from "../Loading";
import { MdClose } from "react-icons/md";
import * as Yup from "yup";

const SingleEntry = ({
  setOpenUploadModel,
  GroupNameMutate,
  GroupNameLoading,
}) => {
  const [bodyCharCount, setBodyCharCount] = useState(0);
  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Group name is required"),

  });

  const handleSubmit = (values) => {
    GroupNameMutate({
      name: values.name,
    });
  };

  const handleClose = () => {
    setOpenUploadModel(false);
  };

  return (
    <div className="bg-white w-full h-full flex flex-col">
      <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
        <Title className="text-white">Create Contact Group</Title>
        <button onClick={handleClose}>
          <MdClose color="white" size={24} />
        </button>
      </div>
      {GroupNameLoading && <Loading />}

      <div className="px-8 h-full flex flex-col justify-between pb-4">
        {!GroupNameLoading && (
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({ errors, touched, setFieldValue, values }) => (
              <Form className="flex flex-col h-full justify-between">
                <Wrapper>
                  <InputGroup>
                    <Label htmlFor="name">Group Name *</Label>
                    <FieldWrappers>
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="off"
                        className=""
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
                  onClick={() => setOpenUploadModel(false)}
                  className="hover:bg-purple-100 p-2 rounded-xl transition-all duration-100 hover:text-topBar-purple"
                >
                  Cancel
                </button> */}
                  <CancelBtn type="button"
                    onClick={() => setOpenUploadModel(false)}>
                    Cancel
                  </CancelBtn>
                  <BtnWrapper>
                    <SubmitBtn type="submit">Create</SubmitBtn>
                  </BtnWrapper>
                </div>
              </Form>)}
          </Formik>
        )}
      </div>
    </div>
  );
};
const Wrapper = tw.div`grid gap-6 my-6`;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;
const MediaCharCount = tw.div`absolute top-2.5 right-2 text-xs text-gray-400`;
export default SingleEntry;
