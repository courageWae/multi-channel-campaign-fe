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
  FieldWrapper,
} from "../Styles/InputStyles";
import Loading from "../Loading";
import { MdClose } from "react-icons/md";
import { Checkbox, ListItemText, MenuItem, Select } from "@mui/material";
import Config from "Config";
import permissionsArr from "./UserPermissions";

const CreateUser = ({
  setCreateUserModel,
  createUserMutation,
  createUserLoading,
  createUserModel,
}) => {
  const [activeUserPermissions, setActiveUserPermissions] = useState([]);
  const [bodyCharCount, setBodyCharCount] = useState(0);

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    userType: "",
    permissions: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter a valid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10,12}$/, "Phone must be between 10 and 12 digits")
      .required("Phone is required"),
      userType: Yup.string().required("User Type is required"),
    permissions: Yup.array().min(1, "At least one permission is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newPermissionsValue = values.permissions
      .map((permission) => {
        const temp = activeUserPermissions.find(
          (item) => item.name === permission
        );
        return temp ? temp.value : permission;
      })
      .join(",");

    const payload = {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      userType: values.userType,
      permissions: newPermissionsValue,
    };

    // Call the mutation function with the updated payload
    createUserMutation(payload);

    resetForm();
  };

  const handleClose = (resetForm) => {
    resetForm();
    setCreateUserModel(false);
  };

  const changeUserType = (val, setFieldValue) => {
    setFieldValue("userType", val);
    setFieldValue("permissions", []);

    const selectedUserPermission = permissionsArr.find(
      (item) => item.type === val
    );

    setActiveUserPermissions(selectedUserPermission?.permissions || []);
  };

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
        <Title className="text-white">Add New User</Title>
        <button onClick={() => setCreateUserModel(false)}>
          <MdClose color="white" size={24} />
        </button>
      </div>

      {createUserLoading && <Loading />}

      <div className="flex flex-col justify-between h-full px-8 pb-4">
        {!createUserLoading && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, resetForm, setFieldValue, values }) => (
              <Form className="flex flex-col justify-between h-full">
                <Wrapper>
                  <InputGroup>
                    <Label htmlFor="name">Name *</Label>
                    <FieldWrappers>
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="off"
                        required
                        maxLength="255"
                        onChange={(e) => {
                          setFieldValue("name", e.target.value);
                          setBodyCharCount(e.target.value.length);
                        }}
                        value={values.name}
                      />
                    </FieldWrappers>
                    {errors.name && touched.name ? (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.name}
                      </div>
                    ) : null}
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="email">Email *</Label>
                    <FieldWrappers>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        required
                        onChange={(e) => {
                          setFieldValue("email", e.target.value);
                        }}
                        value={values.email}
                      />
                    </FieldWrappers>
                    {errors.email && touched.email ? (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </div>
                    ) : null}
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="phone">Phone *</Label>
                    <FieldWrappers>
                      <Field
                        type="text"
                        name="mobile"
                        id="mobile"
                        autoComplete="off"
                        required
                        onChange={(e) => setFieldValue("mobile", e.target.value)}
                        value={values.mobile}
                      />
                    </FieldWrappers>
                    {errors.mobile && touched.mobile ? (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.mobile}
                      </div>
                    ) : null}
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="userType">User Type *</Label>
                    <FieldWrapper $select={true}>
                      <Select
                        className="w-full h-full pl-2"
                        name="userType"
                        id="userType"
                        value={values.userType}
                        onChange={(e) =>
                          changeUserType(e.target.value, setFieldValue)
                        }
                      >
                        <MenuItem value={Config.UserType.CommercialAdminUser}>
                          Admin
                        </MenuItem>
                        <MenuItem value={Config.UserType.FinanceAdminUser}>
                          Finance
                        </MenuItem>
                      </Select>
                    </FieldWrapper>
                    {errors.userType && touched.userType ? (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.userType}
                      </div>
                    ) : null}
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="permissions">Permissions</Label>
                    <FieldWrapper $select={true}>
                      <Field
                        required
                        name="permissions"
                        id="permissions"
                        autoComplete="off"
                      >
                        {(props) => (
                          <Select
                            autoComplete="off"
                            className="p-0 pl-2 text-sm bg-transparent border-none w-[450px]"
                            style={{ height: "40px" }}
                            multiple
                            renderValue={(selected) => selected.join(", ")}
                            {...props.field}
                          >
                            {!props.form.values.userType && (
                              <MenuItem disabled value="">
                                Please Select User Type First
                              </MenuItem>
                            )}
                            {props.form.values.userType &&
                              activeUserPermissions.map((item) => (
                                <MenuItem key={item.value} value={item.name}>
                                  <Checkbox
                                    checked={
                                      props.form.values.permissions.indexOf(
                                        item.name
                                      ) > -1
                                    }
                                  />
                                  <ListItemText primary={item.name} />
                                </MenuItem>
                              ))}
                          </Select>
                        )}
                      </Field>
                    </FieldWrapper>
                  </InputGroup>
                </Wrapper>

                <div className="flex justify-between p-4">
                  <CancelBtn
                    type="button"
                    onClick={() => handleClose(resetForm)}
                  >
                    Cancel
                  </CancelBtn>
                  <BtnWrapper>
                    <SubmitBtn type="submit">Create</SubmitBtn>
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

export default CreateUser;
