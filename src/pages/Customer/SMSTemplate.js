import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import Images from "../../Images";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Config from "../../Config";
import Loading from "components/Loading";
import Table from "components/SMSTemplate/Table";
import { PiPlusCircleBold } from "react-icons/pi";
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
import DeleteModel from "components/SMSTemplate/DeleteModel";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import UpdateStatus from "components/SMSTemplate/UpdateStatus";

const SMSTemplate = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [searchType, setSearchType] = useState("STATUS");
  const [searchValue, setSearchValue] = useState("");
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [deleteModel, setDeleteModel] = useState(false);
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [openActionModel, setOpenActionModel] = useState(false);
  const navigate = useNavigate();

  // ----- Getting Initial Data ------
  const fetchFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/template/sms/get`, values, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
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

  //------- Delete Group -------
  const deleteFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/template/sms/delete`,
      values,

      {
        headers: {
          "Content-Type": "application/json",
          Token: `${user.token}`,
        },
      }
    );

  const deleteSuccess = (data) => {
    // refetch();
    getListMutate({
      searchValue: searchValue,
    });
    setSelectedData("");
    setDeleteModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const deleteError = (data) => {
    setDeleteModel(false);
    setSelectedData("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: deleteLoading, mutate: deleteMutate } = useMutation(
    deleteFunction,
    {
      onSuccess: deleteSuccess,
      onError: deleteError,
    }
  );

  //------- Active/Inactive Template -------
  const actionFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/template/sms/updatestatus`,
      values,

      {
        headers: {
          "Content-Type": "application/json",
          Token: `${user.token}`,
        },
      }
    );

  const actionSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    setSelectedData("");
    setOpenActionModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const actionError = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    setOpenActionModel(false);
    setSelectedData("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: actionDeviceLoading, mutate: actionDeviceMutate } =
    useMutation(actionFunction, {
      onSuccess: actionSuccess,
      onError: actionError,
    });

  return (
    <>
      <Container>
        {/* <Sidebar /> */}
        <Page>
          <TopNavbar />
          <Content>
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle>SMS Template</HeaderTitle>
                {user.type == Config.UserType.ClientUser && (
                  <Link to="/sms-template-setup">
                    <Button className="rounded-xl" type="button">
                      <PiPlusCircleBold size={18} />{" "}
                      <p className="font-semibold">Create</p>
                    </Button>
                  </Link>
                )}
              </div>
              <HeaderSubTitle>
                SMS templates save time and ensure consistency in communication
              </HeaderSubTitle>
              <LearnMoreLink>
                <Link to="" className="flex items-center gap-1">
                  <p className="underline hover:text-topBar-purple">
                    Getting started with template creation
                  </p>
                  <img src={Images.ShareIcon} alt="Share" />
                </Link>
              </LearnMoreLink>
            </ContentHeader>

            <div className="flex w-full justify-between items-center">
              <Uploader
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                searchType={searchType}
                setSearchType={setSearchType}
                ChangeHandler={ChangeHandler}
                setOpenUploadModel={setOpenUploadModel}
              />
            </div>

            {deleteModel && (
              <DeleteModel
                setDeleteModel={setDeleteModel}
                deleteLoading={deleteLoading}
                selectedData={selectedData}
                deleteMutate={deleteMutate}
              />
            )}

            {openActionModel && (
              <UpdateStatus
                setOpenActionModel={setOpenActionModel}
                actionDeviceMutate={actionDeviceMutate}
                selectedData={selectedData}
                actionDeviceLoading={actionDeviceLoading}
              />
            )}

            {!isLoading && gotInitialResp && (
              <TableWrapper>
                <Table
                  ApiData={error ? [] : data?.data?.data}
                  setSelectedData={setSelectedData}
                  setDeleteModel={setDeleteModel}
                  setOpenActionModel={setOpenActionModel}
                />
                {(error || data?.data?.data?.length === 0) &&
                  !isLoading &&
                  gotInitialResp && <NotFoundModel />}
              </TableWrapper>
            )}

            {(isLoading || !gotInitialResp) && <Loading />}
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
          <img src={Images.SearchIcon} />
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
const SearchWrapper = tw.div`flex items-center w-full max-w-sm ml-auto`;
const SearchInput = tw.div` field-wrapper relative px-2 gap-2 rounded-xl bg-white h-10 border border-zinc-400 flex items-center overflow-hidden ml-auto`;

export default SMSTemplate;
