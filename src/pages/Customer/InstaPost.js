import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link, useNavigate } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import Images from "../../Images";
import { useMutation } from "react-query";
import axios from "axios";
import Config from "../../Config";
import Loading from "components/Loading";
import Table from "components/FbPost/Table";
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
import FbCard from "components/FbPost/FbCard";
import InstagramPostModel from "components/InstagramPost/InstagramPostModel";
import InstaCard from "components/InstagramPost/InstaCard";
import NoPermissionModal from "components/NoPermission";

const InstaPost = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [searchType, setSearchType] = useState("STATUS");
  const [searchValue, setSearchValue] = useState("");
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [filterType, setFilterType] = useState("4");
  const [isInstaModalOpen, setInstaModalOpen] = useState(false);
  const [calendarView, setCalendarView] = useState("");
  const navigate = useNavigate();

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
    console.log("social_permissions", permissions)

    if (
      (permissions.includes(Config.Permissions.SOCIAL) &&
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

  // ----- Getting Initial Data ------

  const fetchFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/campaign/sms/list`, values, {
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
        filterType: filterType,
      });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, filterType]);

  useEffect(() => {
    setSearchValue("");
  }, [filterType]);

  const ChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };
  const handleCalendarViewChange = (view) => {
    setCalendarView(view);
    navigate("/calendar/instapost", { state: { calendarView: view } });
  };
  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          <Content>
            {isInstaModalOpen && (
              <InstagramPostModel onClose={() => setInstaModalOpen(false)} />
            )}

            {!canCreate && !loading &&(
              <NoPermissionModal isOpen={true} planType={user?.planType} />
            )}
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle>Instagram</HeaderTitle>
                {user.type == Config.UserType.ClientUser && (
                  <Button
                    className="rounded-xl"
                    type="button"
                    onClick={() => setInstaModalOpen(true)}
                  >
                    <PiPlusCircleBold size={18} />{" "}
                    <p className="font-semibold">Create</p>
                  </Button>
                )}
              </div>
              <HeaderSubTitle>
                This is where you organize your instagram post. Create for
                targeted interactions.
              </HeaderSubTitle>
              <LearnMoreLink>
                <Link to="" className="flex items-center gap-1">
                  <p className="underline hover:text-topBar-purple">
                    Get started with instagram post
                  </p>
                  <img src={Images.ShareIcon} alt="Share" />
                </Link>
              </LearnMoreLink>
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
                Sent
              </TemplateButton>
              <TemplateButton
                ml
                isActive={filterType === "1"}
                onClick={() => setFilterType("1")}
              >
                Scheduled
              </TemplateButton>
            </ButtonGroup>
            <Seperator />

            <div className="items-center justify-between w-10/12">
              <div className="flex items-center justify-end w-full mb-4 ml-auto">
                <div className="flex overflow-hidden border rounded-md">
                  <button
                    className="px-4 py-2 border-r hover:bg-orange-100 hover:text-orange-600 hover:border-orange-500"
                    onClick={() => handleCalendarViewChange("week")}
                  >
                    Week
                  </button>
                  <button
                    className="px-4 py-2 border-l hover:bg-orange-100 hover:text-orange-600 hover:border-orange-500"
                    onClick={() => handleCalendarViewChange("month")}
                  >
                    Month
                  </button>
                </div>
              </div>
              {!isLoading && !loading && gotInitialResp && <InstaCard />}
            </div>

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
const ButtonGroup = tw.div`flex items-center !gap-0`;
const TemplateButton = tw.button`
  px-2 font-semibold relative ${(props) =>
    props.isActive ? "text-blue-500" : "text-black"}
  ${(props) => (props.ml ? "ml-2" : "")}
  after:absolute after:top-11 after:left-0 after:w-full after:h-0.5
  ${(props) => (props.isActive ? "after:bg-blue-500" : "")}
`;
const Seperator = tw.div`w-full h-[0.090rem] bg-gray-200 `;
export default InstaPost;
