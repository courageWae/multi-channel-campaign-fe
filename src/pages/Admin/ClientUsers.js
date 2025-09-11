import { Container } from "@mui/material";
import axios from "axios";
import UserStatusChange from "components/ClientUserManagement/UserStatusChange";
import AdminTable from "components/ClientUserManagement/AdminTable";
import ViewUserModel from "components/ClientUserManagement/ViewUserModel";
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
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

const ClientUsers = () => {
  const user = useSelector((state) => state.UserReducer.user);

  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [openViewModel, setOpenViewModel] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [updateStatusModel, setUpdateStatusModel] = useState(false);

  const fetchFunction = async () =>
    await axios.get(`${Config.nodeApiUrl}/admin/getUsers`, {
      headers: {
        "Content-Type": "application/json",
        token: user?.token,
      },
    });

  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    "users",
    fetchFunction
  );

  //------- Add Single Entry -------
    const updateUserStatusFunction = async (values) =>
      await axios.post(
        `${Config.appUrl}/admin/editUser`,
        values,
        Config.AxiosConfig
      );
  
    const updateStatusSuccess = (data) => {
      refetch();
      setOpenUploadModel(false);
      toast.success(data?.data?.msg || "Success");
    };
  
    const updateStatusError = (data) => {
      toast.error(data?.response?.data?.msg || "An Error Occurred");
    };
  
    const { isLoading: updateStatusLoading, mutate: updateStatusMutate } =
      useMutation(updateUserStatusFunction, {
        onSuccess: updateStatusSuccess,
        onError: updateStatusError,
      });

  const customData = [
    {
      id:1,
      name: "John Doe",
      email: "example@example.com",
      phoneNumber: "233249158582",
      userType:2,
      permissions:"USL,ADSI,PLN,ADC",
      status: 2,
      created_at: "2024-09-27T10:45:15.000000Z",
    },
    {
      id:2,
      name: "Jane Doe",
      email: "example@example.com",
      phoneNumber: "233249158582",
      userType:2,
      permissions:"USL,ADSI",
      status: 1,
      created_at: "2024-09-27T10:45:15.000000Z",
    },
  ];



  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          <Content>
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle>Manage Clients</HeaderTitle>
              </div>
              <HeaderSubTitle>
                This is where you can add and view and modify client account
              </HeaderSubTitle>
              <LearnMoreLink>
                <Link to="" className="flex items-center gap-1">
                  <p className="underline hover:text-topBar-purple">
                    Manager User Accounts
                  </p>
                  <img src={Images.ShareIcon} alt="Share" />
                </Link>
              </LearnMoreLink>
            </ContentHeader>
            
            {openViewModel && (
          <ViewUserModel
            setOpenViewModel={setOpenViewModel}
            selectedData={selectedData}
          />
        )}
        {
            updateStatusModel && (
              <UserStatusChange
              setUpdateStatusModel={setUpdateStatusModel}
              selectedData={selectedData}
              updateStatusMutate={updateStatusMutate}
              updateStatusLoading={updateStatusLoading}
              />
            )
          }
            {!isLoading && !isRefetching && (
              <TableWrapper>
                <AdminTable
                  // ApiData={error ? [] : data?.data?.data}
                  ApiData={customData}
                  setSelectedData={setSelectedData}
                  setOpenViewModel={setOpenViewModel}
                  setUpdateStatusModel={setUpdateStatusModel}
                />
                {/* {(error || data?.data?.ussdSurvey?.length === 0) && */}
                {(error || customData?.length === 0) &&
                  !isLoading &&
                  gotInitialResp && <NotFoundModel />}
              </TableWrapper>
            )}

            {(isLoading || isRefetching) && <Loading />}
          </Content>
        </Page>
      </Container>
    </>
  );
};
const TableWrapper = tw.div` border rounded-md `;

export default ClientUsers;
