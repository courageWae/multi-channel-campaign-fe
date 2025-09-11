


import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrappers,
    FieldWrapper,
    Label,
    SubmitBtn,
    CancelBtn
} from "../Styles/InputStyles";
import Loading from "../Loading";
import { MdClose } from "react-icons/md";
import Config from "Config";
import permissionsArr from "./userPermissions";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";

const EditUserModel = ({
    setEditUser,
    editSingleEntry,
    editEntryLoading,
    selectedItem,
}) => {
    const [activeUserPermissions, setActiveUserPermissions] = useState([]);
    const [isReinitialize, setIsReinitialize] = useState(true);

    useEffect(() => {
        const selectedUserPermission = permissionsArr.find(
            (item) => item.type === selectedItem?.type
        );

        setActiveUserPermissions(selectedUserPermission?.permissions || []);
    }, [selectedItem]);

    const getInitialPermissionValue = () => {
        const per = selectedItem?.permissions?.split(",") || [];

        const newPermissionsValue = per
            .map((permission) => {
                const temp = activeUserPermissions.find(
                    (item) => item.value === permission
                );

                if (temp) return temp.name;
            })
            .filter((item) => item);

        return newPermissionsValue;
    };

    const initialValues = {
        name: selectedItem?.name || "",
        userType: selectedItem?.type || "",
        permissions: getInitialPermissionValue(),
        mobile: selectedItem?.phone || "",
        id: selectedItem?.id || "",
    };

    const handleSubmit = (values) => {
        const mobileLength = values.mobile.toString().length;
        if (mobileLength < 9) {
            return toast.error("Please enter a valid mobile number");
        } else if (!values?.userType) {
            return toast.error("Please select a user type");
        } else if (values?.permissions.length === 0) {
            return toast.error("Please select at least one permission");
        }

        const newPermissionsValue = values.permissions
            .map((permission) => {
                const temp = activeUserPermissions.find(
                    (item) => item.name === permission
                );

                if (temp) return temp.value;
                else return permission;
            })
            .join(",");

        editSingleEntry({ ...values, permissions: newPermissionsValue });
    };

    const changeUserType = (val, setFieldValue) => {
        setIsReinitialize(false);
        setFieldValue("userType", val);
        setFieldValue("permissions", []);

        const selectedUserPermission = permissionsArr.find(
            (item) => item.type === val
        );

        setActiveUserPermissions(selectedUserPermission?.permissions || []);
    };

    const handleClose = () => {
        setEditUser(false);
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Edit User</Title>
                <button onClick={handleClose}>
                    <MdClose color="white" size={24} />
                </button>
            </div>
            {editEntryLoading && <Loading />}

            <div className="px-8 h-full flex flex-col justify-between pb-4">
                {!editEntryLoading && (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        enableReinitialize={isReinitialize}
                    >
                        {({ setFieldValue, values }) => (
                            <Form className="flex flex-col h-full justify-between">
                                <Wrapper>
                                    <InputGroup>
                                        <Label htmlFor="name">User Name</Label>
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
                                    </InputGroup>
                                    <InputGroup>
                                        <Label htmlFor="mobile">Phone Number</Label>
                                        <FieldWrappers>
                                            <Field
                                                type="text"
                                                name="mobile"
                                                id="mobile"
                                                autoComplete="off"
                                                className="truncate"
                                                required
                                            />
                                        </FieldWrappers>
                                    </InputGroup>
                                    <InputGroup>
                                        <Label htmlFor="userType">User Type</Label>
                                        <FieldWrapper $select={true}>
                                            <Field
                                                required
                                                name="userType"
                                                id="userType"
                                                autoComplete="off"
                                            >
                                                {(props) => (
                                                    <Select
                                                        autoComplete="off"
                                                        className="w-full pl-2  bg-transparent text-sm p-0 border-none"
                                                        style={{ height: "40px" }}
                                                        {...props.field}
                                                        value={values.userType} // Set value here
                                                        onChange={(e) =>
                                                            changeUserType(
                                                                e.target.value,
                                                                props.form.setFieldValue
                                                            )
                                                        }
                                                    >
                                                        <MenuItem value={Config.UserType.CommercialAdminUser}>
                                                            Commercial
                                                        </MenuItem>
                                                        <MenuItem value={Config.UserType.FinanceAdminUser}>
                                                            Finance
                                                        </MenuItem>
                                                    </Select>
                                                )}
                                            </Field>
                                        </FieldWrapper>
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
                                                        className="w-full pl-2  bg-transparent text-sm p-0 border-none"
                                                        style={{ height: "40px" }}
                                                        multiple
                                                        renderValue={(selected) =>
                                                            selected.join(", ")
                                                        }
                                                        {...props.field}
                                                    >
                                                        {activeUserPermissions.map(
                                                            (item) => (
                                                                <MenuItem
                                                                    key={item.value}
                                                                    value={item.name}
                                                                >
                                                                    <Checkbox
                                                                        checked={
                                                                            props.form.values.permissions.indexOf(
                                                                                item.name
                                                                            ) > -1
                                                                        }
                                                                    />
                                                                    <ListItemText
                                                                        primary={item.name}
                                                                    />
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </Select>
                                                )}
                                            </Field>
                                        </FieldWrapper>
                                    </InputGroup>
                                </Wrapper>
                                <div className="flex justify-between p-4">
                                    <CancelBtn
                                        type="button"
                                        onClick={() => setEditUser(false)}
                                    >
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

const Wrapper = tw.div`grid gap-6 my-2`;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default EditUserModel;
