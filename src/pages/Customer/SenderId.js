import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import Images from "../../Images";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Config from "../../Config";
import Loading from "components/Loading";
import Table from "components/SenderIdManagement/Table";
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
import CreateSenderId from "components/SenderIdManagement/CreateSenderId";
import { toast } from "react-toastify";

const SenderId = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [searchType, setSearchType] = useState("STATUS");
  const [searchValue, setSearchValue] = useState("");
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [templateType, setTemplateType] = useState("1");
  const [selectedData, setSelectedData] = useState("");
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const navigate = useNavigate();

  // ----- Getting Initial Data ------

  const fetchFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/senderid/sms/get`, values, {
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
        templateType: templateType,
      });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const ChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  //------- Create Sender Id -------
  const CreateSenderIdFunction = async (values) => {
    const body = new FormData();
    body.append("senderId", values.senderId);
    body.append("description", values.description);
    return await axios.post(`${Config.apiUrl}/senderid/sms/request`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };

  const senderIdSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
      templateType: templateType,
    });
    setOpenUploadModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const senderIdError = (data) => {
    getListMutate({
      searchValue: searchValue,
      templateType: templateType,
    });
    setOpenUploadModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: SenderIdLoading, mutate: SenderIdMutate } = useMutation(
    CreateSenderIdFunction,
    {
      onSuccess: senderIdSuccess,
      onError: senderIdError,
    }
  );

  return (
    <>
      <Container>
        {/* <Sidebar /> */}
        <Page>
          <TopNavbar />
          <Content>
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle>Sender ID</HeaderTitle>
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
                An Alphanumeric Sender ID is your company name or brand used as
                the Sender ID
              </HeaderSubTitle>
              <LearnMoreLink>
                <Link to="" className="flex items-center gap-1">
                  <p className="underline hover:text-topBar-purple">
                    Getting Started with Alphanumeric Sender ID
                  </p>
                  <img src={Images.ShareIcon} alt="Share" />
                </Link>
              </LearnMoreLink>
            </ContentHeader>

            <div className="flex items-center justify-between w-full">
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
                openUploadModel ? "flex" : "hidden"
              } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                openUploadModel ? "translate-x-0" : "translate-x-full"
              } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <CreateSenderId
                setOpenUploadModel={setOpenUploadModel}
                SenderIdMutate={SenderIdMutate}
                SenderIdLoading={SenderIdLoading}
                openUploadModel={openUploadModel}
              />
            </div>

            {data?.data?.data?.length === 0 &&
              searchValue === "" &&
              user.type === Config.UserType.ClientUser && (
                <div className="flex flex-col items-center justify-center h-full my-20">
                  <p>You don’t have any sender id yet.</p>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setOpenUploadModel(true)}
                  >
                    Create your first sender id
                  </button>
                </div>
              )}

            {!error &&
              !isLoading &&
              gotInitialResp &&
              data?.data?.data?.length !== 0 && (
                <TableWrapper>
                  <Table
                    ApiData={data?.data?.data}
                    setSelectedData={setSelectedData}
                  />
                </TableWrapper>
              )}

            {(isLoading || !gotInitialResp) && <Loading />}

            {(error || data?.data?.data?.length === 0) &&
              !isLoading &&
              gotInitialResp &&
              searchValue !== "" && <NotFoundModel />}
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
          <img src={Images.SearchIcon} alt="" />
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


export default SenderId;
