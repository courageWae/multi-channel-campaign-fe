import React from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
  InputGroup,
  FieldWrapper,
  Label,
  SubmitBtn,
  CancelBtn,
} from "../Styles/InputStyles";
import Loading from "../Loading";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Model from "../Model";
import toast from "react-hot-toast";


const UserStatusChange = ({
  updateStatusMutate,
  updateStatusLoading,
  setUpdateStatusModel,
  selectedData,
}) => {
  const InitialValues = {
    status: selectedData?.status,
    id: selectedData?.id,
  };

  const SubmitHandler = (values) => {
    if (!values?.status || values?.status === "0") {
      return toast.error("Please select the status");
    }

    updateStatusMutate(values);
  };

  return (
    <Model width={`w-11/12 max-w-lg `} setOpenModel={setUpdateStatusModel}>
      <Title>Update Status</Title>

      {updateStatusLoading && <Loading />}

      {!updateStatusLoading && (
        <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
          <Form>
            <Wrapper>
              <InputGroup>
                <Label htmlFor="status">Status</Label>
                <FieldWrapper $select={true}>
                  <Field required name="status" id="status" autoComplete="off">
                    {(props) => (
                      <Select
                        required
                        {...props.field}
                        className="w-full h-full p-0 pl-2 text-sm bg-transparent border-none"
                        autoComplete="none"
                      >
                        <MenuItem value="0" disabled>
                          Select Status
                        </MenuItem>
                        <MenuItem value="1">Active</MenuItem>
                        <MenuItem value="2">Inactive</MenuItem>
                      </Select>
                    )}
                  </Field>
                </FieldWrapper>
              </InputGroup>
            </Wrapper>

            <BtnWrapper>
              <SubmitBtn type="submit">Update</SubmitBtn>
              <CancelBtn type="button" onClick = {()=>setUpdateStatusModel(false)}>Cancel</CancelBtn>
            </BtnWrapper>
          </Form>
        </Formik>
      )}
    </Model>
  );
};

const Wrapper = tw.div`
grid  gap-6  my-6 `;

const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center gap-6 items-center mt-6 w-full`;

export default UserStatusChange;
