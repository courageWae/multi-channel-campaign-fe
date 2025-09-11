import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Config from "../../Config";
import Loading from "components/Loading";
import Table from "components/ContactList/Table";
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
import { MdOutlineImportExport } from "react-icons/md";
import Images from "Images";
import NotFoundModel from "components/NotFoundModel";
import DeleteModel from "components/ContactList/DeleteModel";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CreateContactModel from "components/Contacts/CreateContactModel";
import Block from "components/ContactList/Block";
import DeletePermanently from "components/ContactList/DeletePermanently";
const ContactList = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [searchType, setSearchType] = useState("STATUS");
  const [searchValue, setSearchValue] = useState("");
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openDeletePermanentlyModel, setOpenDeletePermanentlyModel] =
    useState(false);
  const [openBlockModel, setOpenBlockModel] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [contactModel, setContactModel] = useState(false);
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const fetchFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/getContactList`, values, {
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
        id: id,
      });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const ChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };
  console.log(data?.msg);
  //------- Create Contact Group -------
  const createContactFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/addSingleContact`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });

  const cerateContactSuccess = (data) => {
    // refetch();
    getListMutate({
      searchValue: searchValue,
      id: id,
    });
    setDeviceId("");
    setContactModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const cerateContactError = (data) => {
    getListMutate({
      searchValue: searchValue,
      id: id,
    });
    setContactModel(false);
    setDeviceId("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: createContactLoading, mutate: createContactMutate } =
    useMutation(createContactFunction, {
      onSuccess: cerateContactSuccess,
      onError: cerateContactError,
    });

  //------- Delete contact Group -------
  const deleteFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/deleteContactById`,
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
      id: id,
    });
    setDeviceId("");
    setOpenDeleteModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const deleteError = (data) => {
    getListMutate({
      searchValue: searchValue,
      id: id,
    });
    setOpenDeleteModel(false);
    setDeviceId("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: deleteDeviceLoading, mutate: deleteDeviceMutate } =
    useMutation(deleteFunction, {
      onSuccess: deleteSuccess,
      onError: deleteError,
    });

  //------- Block contact Group -------
  const blockFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/blockContact`,
      values,

      {
        headers: {
          "Content-Type": "application/json",
          Token: `${user.token}`,
        },
      }
    );

  const blockSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
      id: id,
    });
    setDeviceId("");
    setOpenBlockModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const blockError = (data) => {
    getListMutate({
      searchValue: searchValue,
      id: id,
    });
    setOpenBlockModel(false);
    setDeviceId("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: blockDeviceLoading, mutate: blockDeviceMutate } =
    useMutation(blockFunction, {
      onSuccess: blockSuccess,
      onError: blockError,
    });

  //------- Block contact Group -------
  const deletePermanentFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/deleteContact`,
      values,

      {
        headers: {
          "Content-Type": "application/json",
          Token: `${user.token}`,
        },
      }
    );

  const deletePermanentSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
      id: id,
    });
    setDeviceId("");
    setOpenDeletePermanentlyModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const deletePermanentError = (data) => {
    getListMutate({
      searchValue: searchValue,
      id: id,
    });
    setOpenDeletePermanentlyModel(false);
    setDeviceId("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const {
    isLoading: deletePermanentlyDeviceLoading,
    mutate: deletePermanentlyDeviceMutate,
  } = useMutation(deletePermanentFunction, {
    onSuccess: deletePermanentSuccess,
    onError: deletePermanentError,
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
                <HeaderTitle>Contacts</HeaderTitle>
                <div className="flex">
                  <Link to={`/import-contact/${id}`}>
                    <ImportButton className="rounded-xl" type="button">
                      <MdOutlineImportExport size={18} />{" "}
                      <p className="font-semibold">Import</p>
                    </ImportButton>
                  </Link>
                  <Button
                    className="rounded-xl ml-2"
                    type="button"
                    onClick={() => setContactModel(true)}
                  >
                    <PiPlusCircleBold size={18} />{" "}
                    <p className="font-semibold">Create</p>
                  </Button>
                </div>
              </div>
              <HeaderSubTitle>
                This is your contact database. From here, you can view, organize
                and manage your contacts, individually or as a group.
              </HeaderSubTitle>
              <LearnMoreLink>
                <GroupName>
                  {`${data?.data?.groupName || ""}`}
                  {/* <img src={Images.ShareIcon} alt="Share" /> */}
                </GroupName>
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

            {openDeleteModel && (
              <DeleteModel
                setOpenDeleteModel={setOpenDeleteModel}
                deleteDeviceLoading={deleteDeviceLoading}
                deviceId={deviceId}
                deleteDeviceMutate={deleteDeviceMutate}
              />
            )}
            {openBlockModel && (
              <Block
                setOpenBlockModel={setOpenBlockModel}
                blockDeviceLoading={blockDeviceLoading}
                deviceId={deviceId}
                blockDeviceMutate={blockDeviceMutate}
              />
            )}
            {openDeletePermanentlyModel && (
              <DeletePermanently
                setOpenDeletePermanentlyModel={setOpenDeletePermanentlyModel}
                deletePermanentlyDeviceLoading={deletePermanentlyDeviceLoading}
                deviceId={deviceId}
                deletePermanentlyDeviceMutate={deletePermanentlyDeviceMutate}
              />
            )}

            <div
              className={`${
                contactModel ? "flex" : "hidden"
              } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                contactModel ? "translate-x-0" : "translate-x-full"
              } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <CreateContactModel
                groupId={id}
                setContactModel={setContactModel}
                createContactLoading={createContactLoading}
                createContactMutate={createContactMutate}
              />
            </div>

            {!isLoading && gotInitialResp && (
              <TableWrapper>
                <Table
                  ApiData={error ? [] : data?.data?.data}
                  setSelectedItem={setSelectedItem}
                  setOpenDeleteModel={setOpenDeleteModel}
                  setDeviceId={setDeviceId}
                  setOpenBlockModel={setOpenBlockModel}
                  setOpenDeletePermanentlyModel={setOpenDeletePermanentlyModel}
                />
                {(error || data?.data?.data?.length == 0) &&
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

const Uploader = ({ setSearchValue, searchValue, ChangeHandler }) => {
  return (
    <>
      <SearchWrapper>
        <SearchInput>
          <img src={Images.SearchIcon} />
          <input
            type="text"
            placeholder={`Search by name, phone number or email`}
            onChange={ChangeHandler}
            value={searchValue}
            className=""
          />
        </SearchInput>
      </SearchWrapper>
    </>
  );
};

const TableWrapper = tw.h1` border   rounded-md `;
const GroupName = tw.h1`text-black-700 bg-gray-200 px-8 items-center py-1 font-semibold whitespace-nowrap rounded-xl `;
const Title = tw.h1`text-xl  text-gray-800 whitespace-nowrap   font-medium`;

const UploadWrapper = tw.div`
 w-full flex flex-col md:flex-row md:justify-end md:space-x-4 space-y-2 md:space-y-0 items-center `;

const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded`;
const ImportButton = tw.button`text-black border border-gray-300  hover:bg-gray-200 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded`;

const SearchWrapper = tw.div`flex items-center w-full max-w-sm ml-auto`;
const SearchInput = tw.div` w-[350px] field-wrapper relative px-2 gap-2 rounded-xl bg-white h-10 border border-zinc-400 flex items-center overflow-hidden ml-auto`;

export default ContactList;
