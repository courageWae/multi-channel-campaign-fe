import React from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  InputGroup,
  FieldWrappers,
  Label,
  SubmitBtn,
  CancelBtn,
  FieldWrapper,
} from "../Styles/InputStyles";
import Loading from "../Loading";
import { MdClose } from "react-icons/md";
import { MenuItem, Select, TextField } from "@mui/material";

const ApproveSurveyModal = ({
  setOpenApprovalModel,
  approvalLoading,
  selectedData,
  SurveyApprovalMutate,
}) => {
  const { id } = selectedData;

  // Ensure the initial value for `action` is either a string or number
  const initialValues = {
    action: "", // Can be string or number depending on what Select outputs
    reason: "",
    id: id,
  };

  // Use Yup to validate `action` and `reason`
  const validationSchema = Yup.object().shape({
    action: Yup.string().required("Action is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    SurveyApprovalMutate({
      action: values.action,
      reason: values.reason,
      id: id,
    });
    resetForm();
  };

  const handleClose = (resetForm) => {
    resetForm();
    setOpenApprovalModel(false);
  };

  return (
<Backdrop>
      <ModalContainer>
        <div className="flex items-center justify-between bg-[#06173A] py-4 px-4 rounded-t-lg">
          <Title className="text-white">Approve USSD Survey</Title>
          {/* Close Button */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ resetForm }) => (
              <button onClick={() => handleClose(resetForm)}>
                <MdClose color="white" size={24} />
              </button>
            )}
          </Formik>
        </div>

        {approvalLoading && <Loading />}

        <div className="p-8">
          {!approvalLoading && (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, resetForm, setFieldValue, values }) => (
                <Form>
                  <Wrapper>
                    <InputGroup>
                      <Label htmlFor="action">Approve/Reject Survey *</Label>
                      <FieldWrapper $select={true}>
                        <Select
                          className="w-full h-full pl-2"
                          name="action"
                          id="action"
                          value={values.action}
                          onChange={(e) => setFieldValue("action", e.target.value)}
                        >
                          <MenuItem value={"1"}>Approve</MenuItem>
                          <MenuItem value={"2"}>Reject</MenuItem>
                        </Select>
                      </FieldWrapper>
                      {errors.action && touched.action && (
                        <Error>{errors.action}</Error>
                      )}
                    </InputGroup>

                    {values.action === "2" && (
                      <InputGroup>
                        <Label htmlFor="reason">Enter Reason *</Label>
                        <TextField
                          name="reason"
                          value={values.reason}
                          onChange={(e) => setFieldValue("reason", e.target.value)}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          fullWidth
                        />
                        {errors.reason && touched.reason && (
                          <div className="mt-1 text-sm text-red-500">
                            {errors.reason}
                          </div>
                        )}
                      </InputGroup>
                    )}
                  </Wrapper>

                  <div className="flex justify-between mt-6">
                    <CancelBtn
                      type="button"
                      onClick={() => handleClose(resetForm)}
                    >
                      Cancel
                    </CancelBtn>
                    <BtnWrapper>
                      <SubmitBtn type="submit">Submit</SubmitBtn>
                    </BtnWrapper>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </ModalContainer>
    </Backdrop>
  );
};

// Styled Components
const Backdrop = tw.div`fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center`;
const ModalContainer = tw.div`bg-white rounded-lg shadow-lg w-full max-w-lg relative z-50`;
const Wrapper = tw.div`grid gap-6`;
const Title = tw.h1`text-lg font-medium`;
const BtnWrapper = tw.div`flex justify-center items-center`;
const CloseButton = tw.button`text-white`;

// Error styling
const Error = tw.div`text-red-500 text-xs italic mb-4`;

export default ApproveSurveyModal;
