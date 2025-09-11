import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link, useNavigate } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import Images from "../../Images";
import { useMutation } from "react-query";
import axios from "axios";
import Config from "../../Config";
import Loading from "components/Loading";
import AdminTable from "components/Connection/Table";
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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import RenameModel from "components/Contacts/RenameModel";
import AddConnectionModel from "components/Connection/AddConnectionModel";
import StatusUpdate from "components/Connection/StatusUpdate";
import ViewModel from "components/Connection/ViewModel";
import EditConnectionModel from "components/Connection/EditConnectionModel";
import StatusViewModel from "components/Connection/StatusViewModel";
const AddConnection = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [searchType, setSearchType] = useState("STATUS");
  const [searchValue, setSearchValue] = useState("");
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [renameModel, setRenameModel] = useState(false);
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [openActionModel, setOpenActionModel] = useState(false);
  const [isRestartLoading, setIsRestartLoading] = useState(false);
  const [isCheckStatusLoading, setIsCheckStatusLoading] = useState(false);
  const [smmpStatusData, setStatusData] = useState([]);
  const [viewModel, setViewModel] = useState(false);
  const [statusViewModel, setStatusViewModel] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const navigate = useNavigate();

  // ----- Getting Initial Data ------

  const fetchFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/smtp/get`, values, {
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

  //------- Add Connection Model -------
  const createConnectionFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/smtp/create`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  const createConnectionSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    setOpenUploadModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const createConnectionError = (data) => {
    setOpenUploadModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: createConnectionLoading, mutate: createConnectionMutate } =
    useMutation(createConnectionFunction, {
      onSuccess: createConnectionSuccess,
      onError: createConnectionError,
    });

  //------- Edit Connection Model -------
  const editConnectionFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/smtp/edit`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  const editConnectionSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    setOpenEditModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const editConnectionError = (data) => {
    setOpenEditModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: editConnectionLoading, mutate: editConnectionMutate } =
    useMutation(editConnectionFunction, {
      onSuccess: editConnectionSuccess,
      onError: editConnectionError,
    });

  //------- Status Update connectiom Group -------
  const actionFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/smtp/status`,
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

  //------- Restart SMPP Connection Status -------
  const restartFunction = async (values) => {
    setIsRestartLoading(true);
    const body = new FormData();
    body.append("connectionId", values.id);
    return await axios.post(`${Config.apiUrl}/smtp/restart`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };
  const getRestartSuccess = (data) => {
    console.log(data?.data?.data);
    setIsRestartLoading(false);

    setViewModel(false);
    toast.success(data?.data?.msg || "Success");
    //setGotInitialResp(true);
  };

  const getRestartError = (data) => {
    setIsRestartLoading(false);

    setViewModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occured");
    //setGotInitialResp(true);
  };

  const {
    isRestartLoading1,
    restartError,
    mutate: restartMutate,
  } = useMutation(restartFunction, {
    onSuccess: getRestartSuccess,
    onError: getRestartError,
  });
  console.log(isRestartLoading);

  //------- End Restart SMPP Connection -------

  //------- Check SMPP Connection Status -------
  const checkStatusFunction = async (values) => {
    setIsCheckStatusLoading(true);
    const body = new FormData();
    body.append("connectionId", values.id);
    return await axios.post(`${Config.apiUrl}/smtp/check`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };
  const getCheckStatusSuccess = (data) => {
    setIsCheckStatusLoading(false);
    setViewModel(false);
    setStatusViewModel(true);
    setStatusData(data?.data?.data || []);
    toast.success(data?.data?.msg || "Success");
    //setGotInitialResp(true);
  };

  const getCheckStatusError = (data) => {
    setIsCheckStatusLoading(false);
    setViewModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occured");
    //setGotInitialResp(true);
  };

  const {
    // isCheckStatusLoading,
    checkStatusError,
    mutate: checkStatusMutate,
  } = useMutation(checkStatusFunction, {
    onSuccess: getCheckStatusSuccess,
    onError: getCheckStatusError,
  });

  console.log("isCheckStatusLoading", isCheckStatusLoading);
  //------- End Check SMPP Connection Status -------

  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          <Content>
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle>Connection</HeaderTitle>
                <Button
                  className="rounded-xl"
                  type="button"
                  onClick={() => setOpenUploadModel(true)}
                >
                  <PiPlusCircleBold size={18} />{" "}
                  <p className="font-semibold">Create</p>
                </Button>
              </div>
              <HeaderSubTitle>
                This is where you organize your connection. Create, modify, and
                manage connection for targeted interactions.
              </HeaderSubTitle>
              <LearnMoreLink>
                <Link to="" className="flex items-center gap-1">
                  <p className="underline hover:text-topBar-purple">
                    Get started with connection
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
            {openActionModel && (
              <StatusUpdate
                setOpenActionModel={setOpenActionModel}
                actionDeviceLoading={actionDeviceLoading}
                selectedData={selectedData}
                actionDeviceMutate={actionDeviceMutate}
              />
            )}
            <div
              className={`${
                openUploadModel ? "flex" : "hidden"
              } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                openUploadModel ? "translate-x-0" : "translate-x-full"
              } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <AddConnectionModel
                setOpenUploadModel={setOpenUploadModel}
                createConnectionMutate={createConnectionMutate}
                createConnectionLoading={createConnectionLoading}
                openUploadModel={openUploadModel}
              />
            </div>
            <div
              className={`${
                openUploadModel ? "flex" : "hidden"
              } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                openUploadModel ? "translate-x-0" : "translate-x-full"
              } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <AddConnectionModel
                setOpenUploadModel={setOpenUploadModel}
                createConnectionMutate={createConnectionMutate}
                createConnectionLoading={createConnectionLoading}
                openUploadModel={openUploadModel}
              />
            </div>{" "}
            <div
              className={`${
                openEditModel ? "flex" : "hidden"
              } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                openEditModel ? "translate-x-0" : "translate-x-full"
              } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <EditConnectionModel
                setOpenEditModel={setOpenEditModel}
                editConnectionMutate={editConnectionMutate}
                editConnectionLoading={editConnectionLoading}
                openEditModel={openEditModel}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </div>
            {viewModel && (
              <ViewModel
                selectedItem={selectedItem}
                setViewModel={setViewModel}
                checkStatusMutate={checkStatusMutate}
                restartMutate={restartMutate}
                isRestartLoading={isRestartLoading}
                isCheckStatusLoading={isCheckStatusLoading}
              />
            )}
            {statusViewModel && (
              <StatusViewModel
                data={smmpStatusData}
                setStatusViewModel={setStatusViewModel}
              />
            )}
            {!isLoading && gotInitialResp && (
              <TableWrapper>
                <AdminTable
                  ApiData={error ? [] : data?.data?.data}
                  setSelectedData={setSelectedData}
                  setOpenActionModel={setOpenActionModel}
                  setSelectedItem={setSelectedItem}
                  setViewModel={setViewModel}
                  setOpenEditModel={setOpenEditModel}
                />
              </TableWrapper>
            )}
            {(isLoading || !gotInitialResp) && <Loading />}
            {(error || data?.data?.data?.length === 0) &&
              !isLoading &&
              gotInitialResp && <NotFoundModel />}
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

export default AddConnection;
