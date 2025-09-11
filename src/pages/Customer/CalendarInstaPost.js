import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import CreatePostModal from "components/FbPost/FbPostModel";
import CalendarView from "components/FbPost/CalenderView";

const CalendarInstaPost = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [searchType, setSearchType] = useState("STATUS");
  const [searchValue, setSearchValue] = useState("");
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [filterType, setFilterType] = useState("4");
  const [isModalOpen, setModalOpen] = useState(false);
  const [calendarView, setCalendarView] = useState("week");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.calendarView) {
      setCalendarView(location.state.calendarView);
    }
  }, [location.state]);
  useEffect(() => {
    console.log("Calendar view set to:", calendarView);
  }, [calendarView]);
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

  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          <Content>
            {isModalOpen && (
              <CreatePostModal onClose={() => setModalOpen(false)} />
            )}
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle>Instagram</HeaderTitle>

                <Button
                  className="rounded-xl"
                  type="button"
                  onClick={() => setModalOpen(true)}
                >
                  <PiPlusCircleBold size={18} />{" "}
                  <p className="font-semibold">Create</p>
                </Button>
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

            {/* {!isLoading && gotInitialResp && <FbCard />} */}
            <div className="w-10/12 items-center justify-between">
              <CalendarView view={calendarView} />
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
export default CalendarInstaPost;
