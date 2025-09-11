import React from "react";
import tw from "tailwind-styled-components";
import { Link, useParams } from "react-router-dom";
import Sidebar from "components/SideNavbar";
import TopNavbar from "components/TopNavbar";
import Images from "../../Images";

import {
  Container,
  Page,
  Content,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
  LearnMoreLink,
} from "../../components/Styles/PageStyles";

import { FaFileImport, FaPaste, FaPuzzlePiece } from "react-icons/fa";

const Card = ({ icon: Icon, title, description, to }) => (
  <CardContainer>
    <Link to={to}>
      <IconWrapper>
        <Icon className="h-8 w-8" />
      </IconWrapper>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Link>
  </CardContainer>
);

const ImportContactCard = () => {
  const { id } = useParams();

  return (
    <Container>
      {/* <Sidebar /> */}
      <Page>
        <TopNavbar />
        <Content>
          <ContentHeader>
            <div className="flex items-center justify-between">
              <HeaderTitle>
                Import contacts for bulk creation or updating
              </HeaderTitle>
            </div>
            <HeaderSubTitle>
              Create, update, or blocklist contacts in bulk in Sevo. And manage
              unlimited contacts in one place. Keep in mind you must have your
              contacts' consent to send them campaigns.
            </HeaderSubTitle>
            <LearnMoreLink>
              <Link to="" className="flex items-center gap-1">
                <p className="underline hover:text-topBar-purple">
                Learn about contacts you're allowed to import for better response and compliance
                </p>
                <img src={Images.ShareIcon} alt="Share" />
              </Link>
            </LearnMoreLink>
          </ContentHeader>
          <Wrapper>
            <CardsContainer>
              <Card
                icon={FaFileImport}
                title="Import from a file"
                description="Import your contacts from a csv or xlsx file."
                to={`/upload/${id}`}
              />
              <Card
                icon={FaPaste}
                title="Copy-paste"
                description="Paste the contacts as text from a spreadsheet or a similar list."
                to={`/copy-paste/${id}`}
              />
            </CardsContainer>
          </Wrapper>
        </Content>
      </Page>
    </Container>
  );
};

const Wrapper = tw.div`min-h-screen flex flex-col items-left py-10`;
const CardsContainer = tw.div`flex flex-wrap justify-left gap-8`;
const CardContainer = tw.div`border rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out mb-4`;
const IconWrapper = tw.div`text-orange-500 mb-4`;
const CardTitle = tw.h3`text-xl font-semibold`;
const CardDescription = tw.p`text-gray-600 text-center`;
export default ImportContactCard;
