import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
  InputGroup,
  FieldWrapper,
  Label,
  SubmitBtn,
  FieldWrappers
} from "../Styles/InputStyles";
import Loading from "../Loading";
import MenuItem from "@mui/material/MenuItem";
import Select from "react-select";
import Model from "../Model";
import DropzoneForContact from "../Contacts/DropzoneForContact_Trash";
import Images from "../../Images";
import Config from "../../Config";
import { toast } from "react-toastify";

const RequestSenderIdModal = ({
  SingleEntryLoading,
  postSingleEntry,
  setOpenUploadModel,
}) => {
  const InitialValues = {
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
    <Model width={`w-11/12 max-w-lg `} setOpenModel={setOpenUploadModel}>
      <Title>Request New Sender ID</Title>

      {SingleEntryLoading && <Loading />}

      {!SingleEntryLoading && (
        <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
          <Form>
            <Wrapper>
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
              <SubmitBtn type="submit">Submit</SubmitBtn>
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

export default RequestSenderIdModal;
