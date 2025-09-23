import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import Images from "../../Images";
import axios from "axios";
import Config from "../../Config";
import VoiceTable from "components/Campaign/VoiceTable";
import { PiPlusCircleBold } from "react-icons/pi";
import {
  Page,
  Container,
  Content,
  ContentHeader,
  HeaderTitle,
} from "../../components/Styles/PageStyles";
import NotFoundModel from "components/NotFoundModel";
import { useSelector } from "react-redux";
import NoPermissionModal from "components/NoPermission";

const VoiceCampaign = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [voiceCampaigns, setVoiceCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Load campaigns from localStorage
  useEffect(() => {
    const campaigns = JSON.parse(localStorage.getItem('voiceCampaigns') || '[]');
    console.log('Loaded campaigns from localStorage:', campaigns); // Debug log
    setVoiceCampaigns(campaigns);
    setFilteredCampaigns(campaigns);
  }, []);

  // Filter campaigns based on search
  useEffect(() => {
    let filtered = voiceCampaigns;
    
    if (searchValue) {
      filtered = filtered.filter(campaign => 
        campaign.campaignName.toLowerCase().includes(searchValue.toLowerCase()) ||
        campaign.recipientName.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    
    setFilteredCampaigns(filtered);
  }, [searchValue, voiceCampaigns]);

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
    console.log("permissions",permissions)

    if (
      (permissions.includes(Config.Permissions.VOICE) &&
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


  const ChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          <Content>
            <ContentHeader>
              <div className="flex justify-between items-center">
                <HeaderTitle>Voice Campaign</HeaderTitle>
                <div className="flex gap-2">
                  {/* <button 
                    onClick={() => {
                      localStorage.removeItem('voiceCampaigns');
                      window.location.reload();
                    }}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded"
                  >
                    Clear Data (Debug)
                  </button> */}
                  {user.type === Config.UserType.ClientUser && (
                    <Link to="/campaign/create/voice">
                      <Button className="rounded-xl" type="button">
                        <PiPlusCircleBold size={18} />{" "}
                        <p className="font-semibold">Create</p>
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </ContentHeader>

            <div className="flex justify-between items-center w-full">
              <Uploader
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                ChangeHandler={ChangeHandler}
              />
            </div>

            {!canCreate && !loading && (
              <NoPermissionModal isOpen={true} planType={user?.planType} />
            )}

            <TableWrapper>
              <VoiceTable
                ApiData={filteredCampaigns}
              />

              {filteredCampaigns.length === 0 && (
                <NotFoundModel />
              )}
            </TableWrapper>
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
          <img src={Images.SearchIcon} alt="Search" />
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
export default VoiceCampaign;
