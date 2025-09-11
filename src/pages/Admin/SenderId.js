import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import Images from "../../Images";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Config from "../../Config";
import Loading from "components/Loading";
import AdminTable from "components/SenderIdManagement/AdminTable";
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
import ApproveModel from "components/SenderIdManagement/ApproveModel";
import { toast } from "react-toastify";

const AdminSenderId = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [searchType, setSearchType] = useState("STATUS");
  const [searchValue, setSearchValue] = useState("");
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [templateType, setTemplateType] = useState("1");
  const [selectedData, setSelectedData] = useState("");
  const [senderIdActionModel, setSenderIdActionModel] = useState(false);
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
  }, [searchValue, templateType]);
  useEffect(() => {
    setSearchValue("");
  }, [templateType]);

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
  //------- Approve/Reject sender id -------
  const senderIdActionFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/senderid/sms/action`,
      values,

      {
        headers: {
          "Content-Type": "application/json",
          Token: `${user.token}`,
        },
      }
    );

  const senderIdActionSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
      templateType: templateType,
    });
    setSelectedData("");
    setSenderIdActionModel(false);
    if (data?.data?.status === "NOK") {
      toast.error(data?.data?.msg || "error");
    } else {
      toast.success(data?.data?.msg || "success");
    }
  };

  const senderIdActionError = (data) => {
    getListMutate({
      searchValue: searchValue,
      templateType: templateType,
    });
    setSenderIdActionModel(false);
    setSelectedData("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: senderIdActionLoading, mutate: senderIdActionMutate } =
    useMutation(senderIdActionFunction, {
      onSuccess: senderIdActionSuccess,
      onError: senderIdActionError,
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
                <HeaderTitle>Sender ID</HeaderTitle>
                {/* <Button
                  className="rounded-xl"
                  type="button"
                  onClick={() => setOpenUploadModel(true)}
                >
                  <PiPlusCircleBold size={18} />{" "}
                  <p className="font-semibold">Create</p>
                </Button> */}
              </div>
              <HeaderSubTitle>
                An Alphanumeric Sender ID is your company name or brand used as
                the Sender ID
              </HeaderSubTitle>
            </ContentHeader>

            <ButtonGroup>
              <TemplateButton
                isActive={templateType === "1"}
                onClick={() => setTemplateType("1")}
              >
                Pending
              </TemplateButton>
              <TemplateButton
                ml
                isActive={templateType === "2"}
                onClick={() => setTemplateType("2")}
              >
                Approved
              </TemplateButton>
              <TemplateButton
                ml
                isActive={templateType === "3"}
                onClick={() => setTemplateType("3")}
              >
                Rejected
              </TemplateButton>
            </ButtonGroup>
            <Seperator />
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

            {senderIdActionModel && (
              <ApproveModel
                setSenderIdActionModel={setSenderIdActionModel}
                senderIdActionLoading={senderIdActionLoading}
                selectedData={selectedData}
                senderIdActionMutate={senderIdActionMutate}
                action={selectedData.action}
              />
            )}

            {!error && !isLoading && gotInitialResp && (
              <TableWrapper>
                <AdminTable
                  ApiData={data?.data?.data}
                  setSelectedData={setSelectedData}
                  setSenderIdActionModel={setSenderIdActionModel}
                  setTemplateType={setTemplateType}
                  templateType={templateType}
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
const ButtonGroup = tw.div`flex items-center !gap-0`;
const TemplateButton = tw.button`
  px-2 font-semibold relative ${(props) =>
    props.isActive ? "text-blue-500" : "text-black"}
  ${(props) => (props.ml ? "ml-2" : "")}
  after:absolute after:top-11 after:left-0 after:w-full after:h-0.5
  ${(props) => (props.isActive ? "after:bg-blue-500" : "")}
`;
const Seperator = tw.div`w-full h-[0.090rem] bg-gray-200 `;

export default AdminSenderId;
