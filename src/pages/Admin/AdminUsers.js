import { Container } from "@mui/material";
import axios from "axios";
import UserStatusChange from "components/AdminUserManagement/UserStatusChange";
import AdminTable from "components/AdminUserManagement/AdminTable";
import CreateUser from "components/AdminUserManagement/CreateUser";
import EditUser from "components/AdminUserManagement/EditUser";
import ViewUserModel from "components/AdminUserManagement/ViewUserModel";
import Loading from "components/Loading";
import NotFoundModel from "components/NotFoundModel";
import {
  Content,
  ContentHeader,
  HeaderSubTitle,
  HeaderTitle,
  LearnMoreLink,
  Page,
} from "components/Styles/PageStyles";
import TopNavbar from "components/TopNavbar";
import Config from "Config";
import Images from "Images";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PiPlusCircleBold } from "react-icons/pi";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

const AdminUsers = () => {
  const user = useSelector((state) => state.UserReducer.user);

  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [openViewModel, setOpenViewModel] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [editUser, setEditUser] = useState(false);
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [createUserModel, setCreateUserModel] = useState(false);
  const [editUserModel, setEditUserModel] = useState(false);
  const [updateStatusModel, setUpdateStatusModel] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const fetchFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/getusers`, values, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user?.token}`,
      },
    });

  const getListSuccess = (data) => {
    setGotInitialResp(true);
  };
  const getListError = (data) => {
    setGotInitialResp(true);
  };

  const {
    isLoading,
    error,
    data,
    mutate: getListMutate,
  } = useMutation(fetchFunction, {
    onSuccess: getListSuccess,
    onError: getListError,
  });
  useEffect(() => {
    const handler = setTimeout(() => {
      getListMutate({
        searchValue: searchValue,
      });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const ChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };
  //------ Upload Excel File ------
  const createUserFunction = async (values) => {
    return await axios.post(`${Config.apiUrl}/adduser`, values, {
      headers: {
        "Content-Type": "application/json",
        Token: user?.token,
      },
    });
  };

  const onSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    setCreateUserModel(false);
    setSelectedData("");
    toast.success(data?.data?.msg || "Success");
  };

  const onError = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    setCreateUserModel(false);
    setSelectedData("");
    toast.error(data?.data?.msg || "Sorry An Error Occurred");
  };

  const { isLoading: createUserLoading, mutate: createUserMutation } =
    useMutation(createUserFunction, { onSuccess, onError });

  //------- Add Single Entry -------
  const editUserFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/edituser`,
      values,
      {
        headers:{
          "Content-Type":"application/json",
          Token: user?.token
        }
      }
    );

  const editSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    // refetch();
    setEditUserModel(false);
    setSelectedData(null)
    toast.success(data?.data?.msg || "Success");
  };

  const editError = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    setEditUserModel(false);
    setSelectedData(null);
    toast.error(data?.response?.data?.msg || "An Error Occurred");
  };

  const { isLoading: editUserLoading, mutate: editUserMutation } = useMutation(
    editUserFunction,
    {
      onSuccess: editSuccess,
      onError: editError,
    }
  );

  const updateUserStatusFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/changestatus`,
      values,
      {
        headers:{
          "Content-Type":"application/json",
          Token:user?.token
        }
      }
    );

  const updateStatusSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    setUpdateStatusModel(false);
    setSelectedData(null);
    toast.success(data?.data?.msg || "Success");
  };

  const updateStatusError = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    setUpdateStatusModel(false);
    setSelectedData(null);
    toast.error(data?.response?.data?.msg || "An Error Occurred");
  };

  const { isLoading: updateStatusLoading, mutate: updateStatusMutate } =
    useMutation(updateUserStatusFunction, {
      onSuccess: updateStatusSuccess,
      onError: updateStatusError,
    });

  const handleCreateUser = () => {
    setCreateUserModel(true);
  };

  console.log("data", data);

  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          <Content>
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle>Manage Users</HeaderTitle>
                <Button
                  onClick={handleCreateUser}
                  className="rounded-xl"
                  type="button"
                >
                  <PiPlusCircleBold size={18} />{" "}
                  <p className="font-semibold">Create User</p>
                </Button>
              </div>
              <HeaderSubTitle>
                This is where you can add and modify admin details for managing
                users.
              </HeaderSubTitle>
              <LearnMoreLink>
                <Link to="" className="flex items-center gap-1">
                  <p className="underline hover:text-topBar-purple">
                    Add new user
                  </p>
                  <img src={Images.ShareIcon} alt="Share" />
                </Link>
              </LearnMoreLink>
            </ContentHeader>
            <div
              className={`${
                createUserModel ? "flex" : "hidden"
              } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                createUserModel ? "translate-x-0" : "translate-x-full"
              } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <CreateUser
                setOpenUploadModel={setOpenUploadModel}
                createUserMutation={createUserMutation}
                createUserLoading={createUserLoading}
                createUserModel={createUserModel}
                setCreateUserModel={setCreateUserModel}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <Uploader
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                ChangeHandler={ChangeHandler}
                setOpenUploadModel={setOpenUploadModel}
              />
            </div>
            <div
              className={`${
                editUserModel ? "flex" : "hidden"
              } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                editUserModel ? "translate-x-0" : "translate-x-full"
              } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <EditUser
                setOpenUploadModel={setOpenUploadModel}
                editUserMutation={editUserMutation}
                editUserLoading={editUserLoading}
                editUserModel={editUserModel}
                setEditUserModel={setEditUserModel}
                selectedData={selectedData}
              />
            </div>

            {openViewModel && (
              <ViewUserModel
                setOpenViewModel={setOpenViewModel}
                selectedData={selectedData}
              />
            )}
            {updateStatusModel && (
              <UserStatusChange
                setUpdateStatusModel={setUpdateStatusModel}
                selectedData={selectedData}
                updateStatusMutate={updateStatusMutate}
                updateStatusLoading={updateStatusLoading}
              />
            )}
            {!isLoading && gotInitialResp && (
              <TableWrapper>
                <AdminTable
                  ApiData={error ? [] : data?.data?.data}
                  setSelectedData={setSelectedData}
                  setOpenViewModel={setOpenViewModel}
                  setCreateUserModel={setCreateUserModel}
                  setEditUserModel={setEditUserModel}
                  setUpdateStatusModel={setUpdateStatusModel}
                  updateStatusMutate={updateStatusMutate}
                />
                {(error || data?.data?.data?.length === 0) &&
                  !isLoading &&
                  gotInitialResp && <NotFoundModel />}
              </TableWrapper>
            )}

            {isLoading && <Loading />}
          </Content>
        </Page>
      </Container>
    </>
  );
};

const Uploader = ({ searchValue, ChangeHandler }) => {
  return (
    <>
      <SearchWrapper>
        <SearchInput>
          <img src={Images.SearchIcon} alt="search-icon" />
          <input
            type="text"
            placeholder={`Type in to search...`}
            onChange={ChangeHandler}
            value={searchValue}
            className=""
          />
        </SearchInput>
      </SearchWrapper>
    </>
  );
};
const TableWrapper = tw.div` border rounded-md `;
const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded`;
const SearchInput = tw.div` field-wrapper relative px-2 gap-2 rounded-xl bg-white h-10 border border-zinc-400 flex items-center overflow-hidden ml-auto`;
const SearchWrapper = tw.div`flex items-center w-full max-w-sm ml-auto`;

export default AdminUsers;
