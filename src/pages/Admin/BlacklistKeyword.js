import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link, useNavigate } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import Images from "../../Images";
import { useMutation } from "react-query";
import axios from "axios";
import Config from "../../Config";
import Loading from "components/Loading";
import AdminTable from "components/BlacklistKeyword/Table";
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
import DeleteModel from "components/BlacklistKeyword/DeleteModel";
import { useSelector } from "react-redux";
import CreateModel from "components/BlacklistKeyword/CreateModel";
import { toast } from "react-toastify";
import EditModel from "components/BlacklistKeyword/EditModel";
import CreateContactModel from "components/Contacts/CreateContactModel";
const BlacklistKeyword = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [searchType, setSearchType] = useState("STATUS");
  const [searchValue, setSearchValue] = useState("");
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [renameModel, setRenameModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [contactModel, setContactModel] = useState(false);
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const navigate = useNavigate();

  // ----- Getting Initial Data ------

  const fetchFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/keyword/get`, values, {
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

  //------- Add Keyword Model -------
  const GroupNameFunction = async (values) => {
    const body = new FormData();
    body.append("keyword", values.keyword);
    body.append("mode", values.mode);
    body.append("type", values.type);
    return await axios.post(`${Config.apiUrl}/keyword/create`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };

  const groupNameSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    setOpenUploadModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const groupNameError = (data) => {
    setOpenUploadModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: GroupNameLoading, mutate: GroupNameMutate } = useMutation(
    GroupNameFunction,
    {
      onSuccess: groupNameSuccess,
      onError: groupNameError,
    }
  );

  //------- Edit Model -------
  const renameFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/keyword/update`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });

  const renameSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    setSelectedData("");
    setRenameModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const renameError = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    setRenameModel(false);
    setSelectedData("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: renameLoading, mutate: renameMutate } = useMutation(
    renameFunction,
    {
      onSuccess: renameSuccess,
      onError: renameError,
    }
  );

  //------- Delete Group -------
  const deleteFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/keyword/delete`,
      values,

      {
        headers: {
          "Content-Type": "application/json",
          Token: `${user.token}`,
        },
      }
    );

  const deleteSuccess = (data) => {
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

  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          <Content>
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle>Blacklist Keyword</HeaderTitle>
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
                This is where you organize your sender id keywords. Create,
                modify, and manage custom keywords for targeted interactions.
              </HeaderSubTitle>
              <LearnMoreLink>
                <Link to="" className="flex items-center gap-1">
                  <p className="underline hover:text-topBar-purple">
                    Get started with Keywords
                  </p>
                  <img src={Images.ShareIcon} alt="Share" />
                </Link>
              </LearnMoreLink>
            </ContentHeader>

            <div className="flex w-full justify-between items-center ">
              <Uploader
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                searchType={searchType}
                setSearchType={setSearchType}
                ChangeHandler={ChangeHandler}
                setOpenUploadModel={setOpenUploadModel}
              />
            </div>

            <div
              className={`${
                renameModel ? "flex" : "hidden"
              } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                renameModel ? "translate-x-0" : "translate-x-full"
              } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <EditModel
                renameLoading={renameLoading}
                selectedData={selectedData}
                renameMutate={renameMutate}
                setRenameModel={setRenameModel}
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
              <CreateModel
                setOpenUploadModel={setOpenUploadModel}
                GroupNameMutate={GroupNameMutate}
                GroupNameLoading={GroupNameLoading}
                openUploadModel={openUploadModel}
              />
            </div>

            {!isLoading && gotInitialResp && (
              <TableWrapper>
                <AdminTable
                  ApiData={error ? [] : data?.data?.data}
                  setSelectedData={setSelectedData}
                  setRenameModel={setRenameModel}
                  setContactModel={setContactModel}
                  setDeleteModel={setDeleteModel}
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

export default BlacklistKeyword;
