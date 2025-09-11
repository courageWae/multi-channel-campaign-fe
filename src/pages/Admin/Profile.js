import React, { useState } from "react";
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
import PersonalInfo from "components/AdminProfile/PersonalInfo";
import ChangePassword from "components/AdminProfile/ChangePassword";
import { useSelector } from "react-redux";
import TabContainer from "components/AdminProfile/TabContainer";

const Profile = () => {
  const user = useSelector((state) => state.UserReducer.user);

  const [tab, setTab] = useState(1);

  const tabPanelID = {
    PERSONAL_INFO: 1,
    SECURITY: 2,
  };

  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          <Content>
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle>Profile Settings</HeaderTitle>
              </div>
              <HeaderSubTitle>
                Manage your personal information and account settings here.
                Update your profile details, change your password, and customize
                preferences to keep your account up to date.
              </HeaderSubTitle>
              <TabContainer tab={tab} setTab={setTab} tabPanelID={tabPanelID} />
            </ContentHeader>
            {tab === tabPanelID.PERSONAL_INFO && <PersonalInfo user={user} />}
            {tab === tabPanelID.SECURITY && <ChangePassword user={user} setTab={setTab} />}
          </Content>
        </Page>
      </Container>
    </>
  );
};

export default Profile;
