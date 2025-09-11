import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import TopNavbar from "components/TopNavbar";
import axios from "axios";
import Config from "../../Config";
import Loading from "components/Loading";
import { PiPlusCircleBold } from "react-icons/pi";
import {
  Page,
  Container,
  Content,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
} from "../../components/Styles/PageStyles";
import PersonalInfo from "components/AccountSettings/PersonalInfo";
import ChangePassword from "components/AccountSettings/ChangePassword";
import { useSelector } from "react-redux";
import TabContainer from "components/AccountSettings/TabContainer";
import SubscriptionPage from "components/AccountSettings/SubscriptionPage";
import CompanyInfo from "components/AccountSettings/CompanyInfo";
import { useMutation } from "react-query";

const AccountSettings = () => {
  const user = useSelector((state) => state.UserReducer.user);

  const [gotInitialResp, setGotInitialResp] = React.useState(false);

  const fetchFunction = async (values) =>
    await axios.get(`${Config.apiUrl}/profile/get/info`, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user?.token}`,
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
      getListMutate();
      console.log("data", data);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [getListMutate]);


  const [tab, setTab] = useState(1);

  const tabPanelID = {
    PERSONAL_INFO: 1,
    COMPANY_INFO: 2,
    SUBSCRIPTION: 3,
    SECURITY: 4,
  };

  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          {isLoading ? (
            !gotInitialResp && <Loading />
          ) : (
            <Content>
              <ContentHeader>
                <div className="flex items-center justify-between">
                  <HeaderTitle>Profile Settings</HeaderTitle>
                </div>
                <HeaderSubTitle>
                  Manage your personal information and account settings here.
                  Update your profile details, change your password, and
                  customize preferences to keep your account up to date.
                </HeaderSubTitle>
                <TabContainer
                  tab={tab}
                  setTab={setTab}
                  tabPanelID={tabPanelID}
                />
              </ContentHeader>
              {tab === tabPanelID.PERSONAL_INFO && (
                <PersonalInfo user={user} />
              )}
              {tab === tabPanelID.SECURITY && <ChangePassword user={user} setTab={setTab} />}
              {tab === tabPanelID.SUBSCRIPTION && (
                <SubscriptionPage user={user} />
              )}
              {tab === tabPanelID.COMPANY_INFO && <CompanyInfo user={user} setTap={setTab} />}
            </Content>
          )}
        </Page>
      </Container>
    </>
  );
};

const Separator = tw.div`h-0.5 bg-gray-100 w-full my-3`;

export default AccountSettings;
