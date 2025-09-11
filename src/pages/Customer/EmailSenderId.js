import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import Images from "../../Images";
import { useMutation } from "react-query";
import axios from "axios";
import Config from "../../Config";
import Loading from "components/Loading";
import Table from "components/EmailSenderIdManagement/Table";
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
import CreateEmailSenderId from "components/EmailSenderIdManagement/CreateEmailSenderId";
import UpdateEmailSenderId from "components/EmailSenderIdManagement/UpdateEmailSenderId";
import { toast } from "react-toastify";
// import ViewReason from "components/SenderIdManagement/ViewReason_Trash";
import DeleteEmailSenderIdModal from "components/EmailSenderIdManagement/DeleteEmailSenderIdModal";
import VerifyEmailSenderId from "components/EmailSenderIdManagement/VerifyEmailSenderId";
import VerifyEmailSenderIdModal from "components/EmailSenderIdManagement/VerifyEmailSenderIdModal";

const EmailSenderId = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [searchType, setSearchType] = useState("STATUS");
  const [searchValue, setSearchValue] = useState("");
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [templateType, setTemplateType] = useState("1");
  const [selectedData, setSelectedData] = useState("");
  const [gotInitialResp, setGotInitialResp] = useState(false);

  //* State to handle Delete Modal
  const [deleteModel, setDeleteModel] = useState(false);
  const [verifyModal, setOpenVerifyModel] = useState(false);

  //*State for the initial verification modal after creation
  const [initialVerificationModalOpen, setInitialVerificationModalOpen] =useState(false);
  const [initialVerifyData, setInitialVerifyData] = useState({});

  // ----- Getting Initial Data ------

  const fetchFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/senderid/email/get`, values, {
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
    body.append("senderName", values.fromName);
    body.append("emailId", values.fromEmail);

    return await axios.post(`${Config.apiUrl}/senderid/email/request`, body, {
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

    //Info => Load up the verification modal
    setInitialVerifyData({
      email_id: data?.data?.emailSender?.email_id,
      id:data?.data?.emailSender?.id,
    });
    console.log("email: ", data?.data?.emailSender?.email_id);
    console.log("ID: ", data?.data?.emailSender?.id);
    toast.success(data?.data?.msg || "Success");
    setInitialVerificationModalOpen(true);
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

  //Todo => -----------------HANDLE THE DELETE FEATURE-------------
  const deleteFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/deleteContactGroup`,
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
      toast.error(data?.response?.data?.msg || "An Error Occurred");
    };
  

  const { isLoading: deleteLoading, mutate: deleteMutate } = useMutation(
    deleteFunction,
    {
      onSuccess: deleteSuccess,
      onError: deleteError,
    }
  );
  //Todo => -----------------END THE DELETE FEATURE-------------


  //Todo => -----------------HANDLE THE UPDATE FEATURE-------------
  const UpdateSenderIdFunction = async (values) => {
    const body = new FormData();
    body.append("fromName", values.fromName);
    body.append("fromEmail", values.fromEmail);
    return await axios.post(`${Config.apiUrl}/requestSenderId`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  }

  const senderIdEditSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
      templateType: templateType,
    });
    setOpenEditModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const senderIdEditError = (data) => {
    getListMutate({
      searchValue: searchValue,
      templateType: templateType,
    });
    setOpenEditModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occurred");
  };

  const { isLoading: SenderIdEditLoading, mutate: SenderIdEditMutate } = useMutation(
    UpdateSenderIdFunction,
    {
      onSuccess: senderIdEditSuccess,
      onError: senderIdEditError,
    }
  );
  //Todo => -----------------END THE UPDATE FEATURE-------------

  //Todo => -----------------HANDLE THE EMAIL VERIFICATION FEATURE-------------
  const emailSenderVerifyFunction = async (values) =>{
    const body = new FormData();
    body.append("otp", values.otp);
    body.append("emailId", values.emailId);
    await axios.post(
      `${Config.apiUrl}/senderid/email/verify`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Token: `${user.token}`,
        },
      }
    );
  }
    const verifySuccess = (data) => {
      getListMutate({
        searchValue: searchValue,
      });
      setSelectedData("");
      setOpenVerifyModel(false);
      toast.success(data?.response?.data?.msg || "Email Sender verified");
    };
  
    const verifyError = (data) => {
      setOpenVerifyModel(false);
      setSelectedData("");
      toast.error(data?.response?.data?.msg || "An Error Occurred");
    };
  

  const { isLoading: verifyLoading, mutate: verifyMutate } = useMutation(
    emailSenderVerifyFunction,
    {
      onSuccess: verifySuccess,
      onError: verifyError,
    }
  );

  // Todo => -----------------END THE EMAIL VERIFICATION FEATURE-------------


  const initialVerifySuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
    });
    setInitialVerifyData("");
    setInitialVerificationModalOpen(false);
    toast.success(data?.response?.data?.msg || "Email Sender verified");
  };

  const verifyInitialError = (data) => {
    setInitialVerificationModalOpen(false);
    setInitialVerifyData("");
    toast.error(data?.response?.data?.msg || "An Error Occurred");
  };


const { isLoading: verifyInitialLoading, mutate: verifyInitialMutate } = useMutation(
  emailSenderVerifyFunction,
  {
    onSuccess: initialVerifySuccess,
    onError: verifyInitialError,
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
                <HeaderTitle>Email Sender ID</HeaderTitle>
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
                Add a New Email Sender ID: Specify "From Name" and "From Email"
              </HeaderSubTitle>
              <LearnMoreLink>
                <Link to="" className="flex items-center gap-1">
                  <p className="underline hover:text-topBar-purple">
                    Ensure your emails are easily recognizable by setting a custom "From Name" and "From Email" address.
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
              <DeleteEmailSenderIdModal
                setDeleteModel={setDeleteModel}
                deleteLoading={deleteLoading}
                selectedData={selectedData}
                deleteMutate={deleteMutate}
              />
            )}
            
            { initialVerificationModalOpen && (
              <VerifyEmailSenderIdModal
                setInitialVerificationModalOpen={setInitialVerificationModalOpen}
                verifyInitialLoading={verifyInitialLoading}
                initialVerifyData={initialVerifyData}
                verifyInitialMutate={verifyInitialMutate}
              />
            )}
            
            {/* //Todo => VERIFY MODAL */}
            <div
              className={`${
                verifyModal ? "flex" : "hidden"
              } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                verifyModal ? "translate-x-0" : "translate-x-full"
              } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <VerifyEmailSenderId
                setOpenVerifyModel={setOpenVerifyModel}
                verifyLoading={verifyLoading}
                selectedData={selectedData}
                SenderIdVerifyMutate={verifyMutate}
              />
            </div>
            {/* //Todo => END VERIFY MODAL */}

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
              <CreateEmailSenderId
                setOpenUploadModel={setOpenUploadModel}
                SenderIdMutate={SenderIdMutate}
                SenderIdLoading={SenderIdLoading}
                openUploadModel={openUploadModel}
              />
            </div>
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
              <UpdateEmailSenderId
                setOpenEditModel={setOpenEditModel}
                SenderIdEditMutate={SenderIdEditMutate}
                SenderIdEditLoading={SenderIdEditLoading}
                openEditModel={openEditModel}
                selectedData={selectedData}
              />
            </div>

            {data?.data?.data?.length === 0 &&
              searchValue == "" &&
              user.type == Config.UserType.ClientUser && (
                <div className="flex flex-col items-center justify-center h-full my-20">
                  <p>You don’t have any sender id yet.</p>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setOpenUploadModel(true)}
                  >
                    Create your first email sender id
                  </button>
                </div>
              )}

            {!error &&
              !isLoading &&
              gotInitialResp &&
              data?.data?.data?.length !== 0  && (
                <TableWrapper>
                  <Table
                    // ApiData={customData}
                    ApiData={data?.data?.data}
                    setSelectedData={setSelectedData}
                    setDeleteModel={setDeleteModel}
                    setOpenEditModel={setOpenEditModel}
                    setOpenVerifyModel={setOpenVerifyModel}
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
const Seperator = tw.div`w-full h-0.5 bg-gray-200 `;

export default EmailSenderId;
