import React from "react";
import Model from "../Model";
import tw from "tailwind-styled-components";
import Loading from "../Loading";

import {
  CancelBtn,
  InputGroup,
  Label,
  FieldWrapper,
  SubmitBtn,
} from "../Styles/InputStyles";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { MenuItem, Select } from "@mui/material";

const GoLiveModal = ({
  goLiveLoading,
  setGoLiveModel,
  selectedData,
  goLiveMutate,
  liveUssdCodes
}) => {
  console.log(selectedData);

  const initialValues = {
    short_code: "",
  };

  const validationSchema = Yup.object({
    short_code: Yup.string().required("You must Select an Active to Continue"),
  });
  

  const handleSubmit = (values) => {    
    goLiveMutate({ values: { shortCode: values.short_code }, id: selectedData });
  };

  const handleClose = () => {
    setGoLiveModel(false);
  };

  return (
    <Model
      width={"w-full max-w-md"}
      setOpenModel={setGoLiveModel}
      title="Activate Your USSD Survey"
    >
      {goLiveLoading && <Loading />}
      {!goLiveLoading && (
        <>
          <SubTitle>
            You are about to Activate your USSD survey. Selected Your short Code
            to Proceed.
          </SubTitle>
          <div className="px-8 h-full flex flex-col justify-between pb-4">
            {!goLiveLoading && (
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
                        <Label htmlFor="short_code">Short Code *</Label>
                        <FieldWrapper $select={true}>
                          <Field
                            required
                            name="short_code"
                            id="short_code"
                            autoComplete="off"
                          >
                            {(props) => (
                              <Select
                                className="w-full h-full pl-2"
                                {...props.field}
                              >
                                {
                                  liveUssdCodes.length > 0 && liveUssdCodes.map((code, index)=>{
                                    return (
                                      <MenuItem key={index} value={code.short_code}>{code.short_code}</MenuItem>
                                    );
                                  })
                                }
                              </Select>
                            )}
                          </Field>
                        </FieldWrapper>
                        {errors.short_code && touched.short_code ? (
                          <Error>{errors.short_code}</Error>
                        ) : null}
                      </InputGroup>
                    </Wrapper>

                    <div className="flex justify-between p-4">
                      <CancelBtn type="button" onClick={() => handleClose()}>
                        Cancel
                      </CancelBtn>
                      <BtnWrapper>
                        <SubmitBtn type="submit">Go Live</SubmitBtn>
                      </BtnWrapper>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </>
      )}
    </Model>
  );
};

const SubTitle = tw.p` text-sm md:text-base text-left mb-6 text-gray-700 text-pretty pt-2`;
const Wrapper = tw.div`grid gap-6 my-6`;
const BtnWrapper = tw.div`flex justify-center items-center`;
const Error = tw.div`text-red-500 text-xs italic mb-4`;

export default GoLiveModal;
