import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link, useNavigate } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import Images from "../../Images";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Config from "../../Config";
import Loading from "components/Loading";
import AdminTable from "components/Plan/Table";

import {
  Page,
  Container,
  Content,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
  LearnMoreLink,
} from "../../components/Styles/PageStyles";
import NotFoundModel from "components/NotFoundModel";

import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import UpdateModal from "components/Plan/UpdateModal";
import ViewModel from "components/Plan/ViewModel";

const Plan = () => {
  const user = useSelector((state) => state.UserReducer.user);

  const [selectedData, setSelectedData] = useState("");
  const [updateModel, setUpdateModel] = useState(false);
  const [openViewModel, setOpenViewModel] = useState(false);
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const navigate = useNavigate();

  // ----- Getting Initial Data ------

  const fetchFunction = async () =>
    await axios.get(`${Config.apiUrl}/plan/view`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });

  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    "adminApi",
    fetchFunction
  );
  //------- Update Plan -------
  const updateFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/plan/update
`,
      values,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Token: `${user.token}`,
        },
      }
    );

  const updateSuccess = (data) => {
    refetch();
    setSelectedData("");
    setUpdateModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const updateError = (data) => {
    refetch();
    setUpdateModel(false);
    setSelectedData("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: updateLoading, mutate: updateMutate } = useMutation(
    updateFunction,
    {
      onSuccess: updateSuccess,
      onError: updateError,
    }
  );

  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          <Content>
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle>Plan</HeaderTitle>
              </div>
              <HeaderSubTitle>
                This is where you organize your plan. Modify for targeted
                interactions.
              </HeaderSubTitle>
              <LearnMoreLink>
                <Link to="" className="flex items-center gap-1">
                  <p className="underline hover:text-topBar-purple">
                    Get started with plan
                  </p>
                  <img src={Images.ShareIcon} alt="Share" />
                </Link>
              </LearnMoreLink>
            </ContentHeader>

            <div
              className={`${
                updateModel ? "flex" : "hidden"
              } h-[screen]  w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                updateModel ? "translate-x-0" : "translate-x-full"
              } fixed h-screen overflow-y-auto right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <UpdateModal
                updateLoading={updateLoading}
                selectedData={selectedData}
                updateMutate={updateMutate}
                setUpdateModel={setUpdateModel}
              />
            </div>
            {openViewModel && (
              <ViewModel
                selectedData={selectedData}
                setOpenViewModel={setOpenViewModel}
                openViewModel={openViewModel}
              />
            )}

            {!isLoading && !isRefetching && (
              <TableWrapper>
                <AdminTable
                  ApiData={error ? [] : data?.data?.data}
                  setSelectedData={setSelectedData}
                  setUpdateModel={setUpdateModel}
                  setOpenViewModel={setOpenViewModel}
                />
                {(error || data?.data?.data?.length === 0) &&
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

export default Plan;
