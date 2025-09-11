import React from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
// import Loading from "../Loading";
import {
    InputGroup,
    FieldWrapper,
    FieldWrappers,
    Label,
    SubmitBtn,
    CombineInputGroup,
} from "../Styles/InputStyles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Model from "../Model";

const EditDeviceModel = ({
    // editSingleEntry,
    // editEntryLoading,
    setEditDevice,
    // deviceId,
    // data,
}) => {
    // const deviceData = data.find((item) => item.id === deviceId);

    const InitialValues = {
        // id: deviceId,
        // eventName: deviceData?.name,
        // province: deviceData?.province,
        // totalAmount: deviceData?.totalAmount,
        // gst: deviceData?.gst,
        // hst: deviceData?.hst,
        // qst: deviceData?.qst,
    };

    const SubmitHandler = (values) => {
        // editSingleEntry(values);
    }

    return (
        <Model width={`w-11/12 max-w-2xl`} setOpenModel={setEditDevice}>
            <Title>Edit Event</Title>

            {/* {editEntryLoading && <Loading />}

            {!editEntryLoading && ( */}
            <Formik initialValues={InitialValues} onSubmit={SubmitHandler}>
                <Form>
                    <Wrapper>
                        <InputGroup>
                            <Label htmlFor="eventName">Event Name</Label>
                            <FieldWrappers>
                                <Field
                                    type="text"
                                    name="eventName"
                                    id="eventName"
                                    autoComplete="off"
                                    className="truncate"
                                    required
                                />
                            </FieldWrappers>
                        </InputGroup>

                        <InputGroup>
                            <Label htmlFor="province">Province</Label>
                            <FieldWrappers>
                                <Field
                                    type="text"
                                    name="province"
                                    id="province"
                                    autoComplete="off"
                                    className="truncate"
                                    required
                                />
                            </FieldWrappers>
                        </InputGroup>

                        <InputGroup>
                            <Label htmlFor="totalAmount">Total Amount</Label>
                            <FieldWrappers>
                                <Field
                                    type="number"
                                    name="totalAmount"
                                    id="totalAmount"
                                    autoComplete="off"
                                    required
                                />
                            </FieldWrappers>
                        </InputGroup>

                        <InputGroup>
                            <Label htmlFor="gst">GST</Label>
                            <FieldWrappers>
                                <Field
                                    type="number"
                                    name="gst"
                                    id="gst"
                                    autoComplete="off"
                                    required
                                    min="0"
                                />
                            </FieldWrappers>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="hst">HST</Label>
                            <FieldWrappers>
                                <Field
                                    type="number"
                                    name="hst"
                                    id="hst"
                                    autoComplete="off"
                                    required
                                    min="0"
                                />
                            </FieldWrappers>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="qst">QST</Label>
                            <FieldWrappers>
                                <Field
                                    type="number"
                                    name="qst"
                                    id="qst"
                                    autoComplete="off"
                                    required
                                    min="0"
                                />
                            </FieldWrappers>
                        </InputGroup>
                    </Wrapper>
                    <BtnWrapper>
                        <SubmitBtn type="submit">Update</SubmitBtn>
                    </BtnWrapper>
                </Form>
            </Formik>
            {/* // )} */}
        </Model>
    );
};

const Wrapper = tw.div`
grid grid-cols-2 gap-10 my-10 px-1 `;

const Title = tw.h2` text-lg md:text-xl lg:text-2xl text-gray-600 font-medium mb-6 text-center`;
const BtnWrapper = tw.div` w-full flex items-center justify-center space-x-10 mt-8`;

export default EditDeviceModel;
