import React, { useEffect, useState } from "react";
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

const EditUser = ({
  setEditUserModel,
  editUserMutation,
  editUserLoading,
  editUserModel,
  selectedData,
}) => {
  const [activeUserPermissions, setActiveUserPermissions] = useState([]);
  const [isReinitialize, setIsReinitialize] = useState(true);

  useEffect(() => {
    const selectedUserPermission = permissionsArr.find(
      (item) => item.type === selectedData?.type
    );
    setActiveUserPermissions(selectedUserPermission?.permissions || []);
  }, [selectedData]);

  const getInitialPermissionValue = () => {
    if (!selectedData?.permissions) return [];
    const per = selectedData?.permissions.split(",");
    console.log("per", per);
    console.log("selectedData", selectedData);
    const newPermissionsValue = per
      .map((permission) => {
        const temp = activeUserPermissions.find(
          (item) => item.value === permission
        );
        return temp ? temp.name : null;
      })
      .filter((item) => item !== null);
    return newPermissionsValue;
  };

  const initialValues = {
    id:selectedData?.id,
    name: selectedData?.name || "",
    email: selectedData?.email || "",
    mobile: selectedData?.phone || "",
    userType: selectedData?.type ||"",
    permissions: getInitialPermissionValue(),
  };

  console.log("initial values", initialValues);

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
      id: values.id,
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      userType: values.userType,
      permissions: newPermissionsValue,
    };

    editUserMutation(payload);
    resetForm();
  };

  const handleClose = (resetForm) => {
    resetForm();
    setEditUserModel(false);
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
        <Title className="text-white">Edit User</Title>
        <button onClick={() => setEditUserModel(false)}>
          <MdClose color="white" size={24} />
        </button>
      </div>

      {editUserLoading && <Loading />}

      <div className="flex flex-col justify-between h-full px-8 pb-4">
        {!editUserLoading && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={isReinitialize}
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
                        value={values.name}
                        onChange={(e) => setFieldValue("name", e.target.value)}
                      />
                    </FieldWrappers>
                    {errors.name && touched.name && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.name}
                      </div>
                    )}
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
                        value={values.email}
                        onChange={(e) =>
                          setFieldValue("email", e.target.value)
                        }
                      />
                    </FieldWrappers>
                    {errors.email && touched.email && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </div>
                    )}
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
                        value={values.mobile}
                        onChange={(e) => setFieldValue("mobile", e.target.value)}
                      />
                    </FieldWrappers>
                    {errors.mobile && touched.mobile && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.mobile}
                      </div>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="userType">User Type *</Label>
                    <FieldWrapper $select={true}>
                      <Field name="userType" id="userType" autoComplete="off">
                        {({ field, form }) => (
                          <Select
                            className="w-full p-0 pl-2 text-sm bg-transparent border-none"
                            value={field.value}
                            onChange={(e) =>
                              changeUserType(e.target.value, form.setFieldValue)
                            }
                            style={{ height: "40px" }}
                          >
                            <MenuItem
                              value={Config.UserType.CommercialAdminUser}
                            >
                              Admin
                            </MenuItem>
                            <MenuItem value={Config.UserType.FinanceAdminUser}>
                              Finance
                            </MenuItem>
                          </Select>
                        )}
                      </Field>
                    </FieldWrapper>
                    {errors.userType && touched.userType && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.userType}
                      </div>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="permissions">Permissions *</Label>
                    <FieldWrapper $select={true}>
                      <Field name="permissions" id="permissions">
                        {({ field, form }) => (
                          <Select
                          className="w-[450px] p-0 pl-2 text-sm bg-transparent border-none"
                            multiple
                            renderValue={(selected) =>
                              selected.join(", ")
                            }
                            value={field.value}
                            onChange={(e) =>
                              form.setFieldValue("permissions", e.target.value)
                            }
                          >
                            {activeUserPermissions.map((item) => (
                              <MenuItem key={item.value} value={item.name}>
                                <Checkbox
                                  checked={
                                    form.values.permissions.indexOf(item.name)>
                                    -1
                                  }
                                />
                                <ListItemText primary={item.name} />
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </Field>
                    </FieldWrapper>
                    {errors.permissions && touched.permissions && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.permissions}
                      </div>
                    )}
                  </InputGroup>
                </Wrapper>

                <div className="flex justify-between p-4">
                  <CancelBtn type="button" onClick={() => handleClose(resetForm)}>
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

const Wrapper = tw.div`grid gap-6 my-6`;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default EditUser;
