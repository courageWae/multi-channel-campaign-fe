import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import {
  Page,
  Container,
  BuilderContent,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
  LearnMoreLink,
} from "components/Styles/PageStyles";
import Config from "Config";
import { Link, useNavigate } from "react-router-dom";
import Images from "Images";
import { PiPlusCircleBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import NotFoundModel from "components/NotFoundModel";
import { useMutation } from "react-query";
import axios from "axios";
import Table from "components/AdminEmailSamplesBuilder/Table";
import Loading from "components/Loading";
import { toast } from "react-toastify";
import DeleteEmailTemplate from "components/AdminEmailSamplesBuilder/DeleteEmailSample";
import TopNavbar from "components/TopNavbar";
import PreviewEmailSample from "components/AdminEmailSamplesBuilder/PreviewEmailSample";




const AdminEmailTemplateSamples = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [searchType, setSearchType] = useState("STATUS");
  const [searchValue, setSearchValue] = useState("");
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [templateType, setTemplateType] = useState("1");

  const [selectedData, setSelectedData] = useState("");
  const [deleteModel, setDeleteModel] = useState(false);

  //* PREVIEW STATES
  const [showModal, setShowModal] = useState(false);
  const [templateId, setTemplateId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const templateName =  localStorage.getItem("templateName");
    if(templateName){
      localStorage.removeItem(templateName);
    }
  },[])

  const ChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  // Todo => Handle the closing and the opening of the modals

  //TODO=> START THE FETCH METHOD
  const fetchFunction = async (values) =>
    await axios.get(`${Config.apiUrl}/template/email/sample/get`, {
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
  //TODO=> END THE FETCH METHOD

  function redirectToBuilder() {
    navigate("/email/sample/create");
  }

  //Todo => -----------------HANDLE THE DELETE FEATURE-------------
  const deleteFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/template/email/sample/delete`, values, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });
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

  const {
    isLoading: deleteEmailTemplateLoading,
    mutate: deleteEmailSampleMutate,
  } = useMutation(deleteFunction, {
    onSuccess: deleteSuccess,
    onError: deleteError,
  });
  //Todo => -----------------END THE DELETE FEATURE-------------

  return (
    <Container>
      <Page>
        <TopNavbar />
        <BuilderContent>
          <ContentHeader>
            {showModal &&(
              <PreviewEmailSample
              show={showModal}
              setShowModal={setShowModal}
              templateId={templateId}
            />
            )}
            {deleteModel && (
              <DeleteEmailTemplate
                setDeleteModel={setDeleteModel}
                deleteEmailTemplateLoading={deleteEmailTemplateLoading}
                selectedData={selectedData}
                deleteEmailSampleMutate={deleteEmailSampleMutate}
              />
            )}
            <div className="flex items-center justify-between">
              <HeaderTitle>Email Template Samples</HeaderTitle>
              {user.type === Config.UserType.SuperAdminUser && (
                <Link to="/email/sample/create">
                  <Button className="rounded-xl" type="button">
                    <PiPlusCircleBold size={18} />{" "}
                    <p className="font-semibold">Create Email Sample</p>
                  </Button>
                </Link>
              )}
            </div>
            <HeaderSubTitle>
              Create email templates samples effortlessly. This is going to be used by clients to create their own customized templates.             Templates Builder. Try it now!
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

          <div
            className={`${
              openUploadModel ? "flex" : "hidden"
            } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
          />

          {data?.data?.data?.length === 0 &&
            searchValue === "" &&
            user.type === Config.UserType.ClientUser && (
              <div className="flex flex-col items-center justify-center h-full my-20">
                <p>No email samples yet.</p>
                <button
                  className="text-blue-500 underline"
                  onClick={redirectToBuilder}
                >
                  Create Your First Email Template
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
                  setDeleteModel={setDeleteModel}
                  setSelectedData={setSelectedData}
                  setShowModal = {setShowModal}
                  setTemplateId = {setTemplateId}
                />
              </TableWrapper>
            )}

          {(isLoading || !gotInitialResp) && <Loading />}

          {(error || data?.data?.data?.length === 0) &&
            !isLoading &&
            gotInitialResp &&
            searchValue !== "" && <NotFoundModel />}
        </BuilderContent>
      </Page>
    </Container>
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


const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded`;
const TableWrapper = tw.div` border rounded-md `;
const SearchWrapper = tw.div`flex items-center w-full max-w-sm ml-auto`;
const SearchInput = tw.div` field-wrapper relative px-2 gap-2 rounded-xl bg-white h-10 border border-zinc-400 flex items-center overflow-hidden ml-auto`;

export default AdminEmailTemplateSamples;
