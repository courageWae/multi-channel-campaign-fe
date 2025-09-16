import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link, useNavigate } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import Images from "Images";
import { useMutation } from "react-query";
import axios from "axios";

import Loading from "components/Loading";
import Table from "components/UssdSurvey/Table";
import { PiPlusCircleBold } from "react-icons/pi";
import {
  Page,
  Container,
  Content,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
} from "components/Styles/PageStyles";
import NotFoundModel from "components/NotFoundModel";
import DeleteModel from "components/EmailCampaign/DeleteModel";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ViewModel from "components/EmailCampaign/ViewModel";
import Config from "Config";
import initialNodes from "../../components/UssdSurveyBuilder/nodes";
import initialEdges from "../../components/UssdSurveyBuilder/edges";
import useStore from "components/UssdSurveyBuilder/store";
import MobilePreviewModal from "USSD/components/Mobile/MobilePreviewModal";
import GoLiveModal from "components/UssdSurvey/GoLiveModal";
import AssignTestNumberModal from "components/UssdSurvey/AssignTestNumberModal";
import UssdDetails from "components/UssdSurvey/UssdDetails";
import NoPermissionModal from "components/NoPermission";


/*************  ✨ Codeium Command ⭐  *************/
/**
 * UssdSurvey is a React functional component that manages the user interface and
 * operations for handling USSD surveys. It includes functionalities for creating,
 * viewing, and managing USSD surveys, including handling user permissions, 
 * searching surveys, and managing various UI modals such as upload, delete, 
 * go-live, and assign test numbers. It utilizes React hooks for state management 
 * and side effects and interacts with APIs to fetch and mutate survey data. 
 * The component also incorporates user permissions to control access to 
 * certain features.
 */
/******  1eb7f3c9-ef3f-4202-9169-3b7721ae59ff  *******/const UssdSurvey = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [searchType, setSearchType] = useState("STATUS");
  const [searchValue, setSearchValue] = useState("");
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [deleteModel, setDeleteModel] = useState(false);
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [openActionModel, setOpenActionModel] = useState(false);
  const [filterType, setFilterType] = useState("4");
  const [viewModel, setViewModel] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [node, setNode] = useState(null);
  const [edge, setEdge] = useState(null);
  const [surveyData, setSurveyData] = useState(null);
  const [liveUssdCodes, setLiveUssdCodes] = useState([]);
  const [ussdDetailsModal, setUssdDetailsModal] = useState(false);
  const [goLiveModel, setGoLiveModel] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canCreate, setCanCreate] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Config.apiUrl}/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Token: user?.token,
          },
        });

        const { data } = response;
        if (isMounted && data) {
          console.log("dashboardData", data);
          
          //* STORE THE PERMISSIONS
          setDashboardData((data?.data?.permissions));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (user?.token) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [user?.token]);
  
  useEffect(() => {
    const permissions = dashboardData ? dashboardData.split(",") : [];

    if (
      (permissions.includes(Config.Permissions.USSD) &&
        user?.type === Config.UserType.ClientUser) ||
      user?.type === Config.UserType.SuperAdminUser ||
      user?.type === Config.UserType.CommercialAdminUser ||
      user?.type === Config.UserType.FinanceAdminUser
    ) {
      setCanCreate(true);
    } else {
      setCanCreate(false);
    }
  }, [user, dashboardData]);

  const [assignTestNumberModal, setAssignTestNumberModal] = useState(false);


  // ----- Getting Initial Data ------
  const fetchFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/ussd/get`, values, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });

  const getListSuccess = (data) => {
    setGotInitialResp(true);
    setLiveUssdCodes(data.data.shortCode);
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
        filterType: filterType,
        type: Config.CampaignType.Email,
      });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, filterType]);

  useEffect(() => {
    setSearchValue("");
  }, [filterType]);

  useEffect(() => {
    localStorage.removeItem("ussd-storage");
    localStorage.removeItem("surveyTitle");
  }, []);

  const ChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  //------- Delete Group -------
  const deleteFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/campaign/sms/delete`,
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
      type: Config.CampaignType.Email,
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

  //------- Active/Inactive Template -------
  const actionFunction = async (values) =>
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

  const actionSuccess = (data) => {
    getListMutate({
      searchValue: searchValue,
      type: Config.CampaignType.Email,
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
    toast.error(data?.response?.data?.msg || "An Error Occurred");
  };

  const { isLoading: actionDeviceLoading, mutate: actionDeviceMutate } =
    useMutation(actionFunction, {
      onSuccess: actionSuccess,
      onError: actionError,
    });

  const startUssdSetup = () => {
    localStorage.removeItem("ussd-storage");
    localStorage.removeItem("shortCode");
    localStorage.removeItem("surveyTitle");

    // Reset Zustand state to initial values if necessary
    useStore.setState({
      nodes: initialNodes,
      edges: initialEdges,
      selectedNode: null,
    });

    navigate("/ussd-survey-setup");
  };

  const openModal = () => {
    setIsModalOpen(false);
  };

  // ------ USSD LIVE MODE -------
  const goLiveFunction = async ({ id }) => {
    
    
    try {
      const response = await axios.post(`${Config.apiUrl}/ussd/goLive/${id}`, {}, {
        headers: {
          "Content-Type": "application/json",
          Token: `${user.token}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const goLiveSuccess = (data) => {
    // refetch();
    getListMutate({
      searchValue: searchValue,
      type: Config.CampaignType.Email,
    });
    setSelectedData("");
    setGoLiveModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const goLiveError = (data) => {
    setGoLiveModel(false);
    setSelectedData("");
    toast.error(data?.response?.data?.msg || "An Error Occurred");
  };

  const { isLoading: goLiveLoading, mutate: goLiveMutate } = useMutation(
    goLiveFunction,
    {
      onSuccess: goLiveSuccess,
      onError: goLiveError,
    }
  );
  // ------ USSD LIVE MODE END -------

  // ------ USSD ASSIGN TEST NUMBERS -------
  const assignTestNumberFunction = async (values, id) =>
    await axios.post(
      `${Config.apiUrl}/ussd/live/${id}`,
      values,

      {
        headers: {
          "Content-Type": "application/json",
          Token: `${user.token}`,
        },
      }
    );

  const assignTestNumberSuccess = (data) => {
    // refetch();
    getListMutate({
      searchValue: searchValue,
      type: Config.CampaignType.Email,
    });
    setSelectedData("");
    setGoLiveModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const assignTestNumberError = (data) => {
    setGoLiveModel(false);
    setSelectedData("");
    toast.error(data?.response?.data?.msg || "An Error Occurred");
  };

  const { isLoading: assignTestNumberLoading, mutate: assignTestNumberMutate } =
    useMutation(goLiveFunction, {
      onSuccess: assignTestNumberSuccess,
      onError: assignTestNumberError,
    });
  console.log("codes", liveUssdCodes);

  // ------ USSD ASSIGN TEST NUMBERS END -------
  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          <Content>
            <ContentHeader>
              <div className="flex justify-between items-center">
                <HeaderTitle>USSD Surveys</HeaderTitle>
                {user.type === Config.UserType.ClientUser && (
                  <Button
                    onClick={startUssdSetup}
                    className="rounded-xl"
                    type="button"
                  >
                    <PiPlusCircleBold size={18} />{" "}
                    <p className="font-semibold">Create Survey</p>
                  </Button>
                )}
              </div>
              <HeaderSubTitle>
                Engage your audience directly and increase participation with
                personalized, effective USSD surveys.
              </HeaderSubTitle>
            </ContentHeader>

            <ButtonGroup>
              <TemplateButton
                isActive={filterType === "4"}
                onClick={() => setFilterType("4")}
              >
                All
              </TemplateButton>
              <TemplateButton
                ml
                isActive={filterType === "2"}
                onClick={() => setFilterType("2")}
              >
                Approved
              </TemplateButton>
              <TemplateButton
                ml
                isActive={filterType === "3"}
                onClick={() => setFilterType("3")}
              >
                Rejected
              </TemplateButton>
            </ButtonGroup>
            <Seperator />
            <div className="flex justify-between items-center w-full">
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

            {ussdDetailsModal && (
              <UssdDetails
                selectedData={selectedData}
                ussdDetailsModal={ussdDetailsModal}
                setUssdDetailsModal={setUssdDetailsModal}
              />
            )}

            {
              !canCreate && !loading && (
                <NoPermissionModal isOpen={true} planType={user?.planType} />
              )
            }

            {goLiveModel && (
              <GoLiveModal
                setGoLiveModel={setGoLiveModel}
                goLiveLoading={goLiveLoading}
                selectedData={selectedData}
                goLiveMutate={goLiveMutate}
                liveUssdCodes={liveUssdCodes}
              />
            )}

            {assignTestNumberModal && (
              <AssignTestNumberModal
                assignTestNumberLoading={assignTestNumberLoading}
                setAssignTestNumberModal={setAssignTestNumberModal}
                selectedData={selectedData}
                assignTestNumberMutate={assignTestNumberMutate}
                assignTestNumberModal={assignTestNumberModal}
              />
            )}

            {viewModel && (
              <ViewModel
                setViewModel={setViewModel}
                selectedData={selectedData}
              />
            )}

            {!isLoading && !loading && gotInitialResp && (
              <TableWrapper>
                <Table
                  ApiData={error ? [] : data?.data?.ussdSurvey}
                  setSelectedData={setSelectedData}
                  setDeleteModel={setDeleteModel}
                  setOpenActionModel={setOpenActionModel}
                  setViewModel={setViewModel}
                  setIsModalOpen={setIsModalOpen}
                  setNode={setNode}
                  setEdge={setEdge}
                  setSurveyData={setSurveyData}
                  setGoLiveModel={setGoLiveModel}
                  setAssignTestNumberModal={setAssignTestNumberModal}
                  setUssdDetailsModal={setUssdDetailsModal}
                />
                {(error || data?.data?.ussdSurvey?.length === 0) &&
                  !isLoading &&
                  gotInitialResp && <NotFoundModel />}
              </TableWrapper>
            )}
            {(isLoading || !gotInitialResp) && <Loading />}
          </Content>
        </Page>
        <MobilePreviewModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          nodes={node}
          edges={edge}
          surveyData={surveyData}
        />
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
const ButtonGroup = tw.div`flex items-center !gap-0`;
const TemplateButton = tw.button`
  px-2 font-semibold relative ${(props) =>
    props.isActive ? "text-blue-500" : "text-black"}
  ${(props) => (props.ml ? "ml-2" : "")}
  after:absolute after:top-11 after:left-0 after:w-full after:h-0.5
  ${(props) => (props.isActive ? "after:bg-blue-500" : "")}
`;
const Seperator = tw.div`w-full h-[0.090rem] bg-gray-200 `;
export default UssdSurvey;
