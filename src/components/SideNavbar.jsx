import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaBars,
  FaThumbsUp,
  FaHashtag,
  FaWhatsapp,
  FaFacebookSquare,
  FaInstagram,
  FaFacebook,
  FaList,
  FaTelegram,
  FaSearch,
  FaChartBar,
  FaSms,
  FaMoneyBill,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { HiTemplate } from "react-icons/hi";
import { SiCampaignmonitor } from "react-icons/si";
import {
  MdSms,
  MdOutlineAddCircle,
  MdEmail,
  MdSupervisedUserCircle,
  MdVerifiedUser,
  MdPayment,
  MdOutlineContentPaste,
  MdKeyboardVoice,
} from "react-icons/md";
import {
  RiArrowDropDownLine,
  RiChatVoiceFill,
  RiSurveyFill,
} from "react-icons/ri";
import { SiMinutemailer } from "react-icons/si";
import tw from "tailwind-styled-components";
import Images from "Images";
import { Tooltip } from "react-tooltip";
import Config from "Config";
import { useSelector, useDispatch } from "react-redux";
import { BsFillCloudPlusFill } from "react-icons/bs";
import ConnectToFacebookModal from "../components/FbPost/ConnectToFacebookModal";
import AuthenticateWithFacebookModal from "./FbPost/ConnectToInstagramModal";
import { TbCurrencyCent, TbReportAnalytics } from "react-icons/tb";
import { CgAttribution } from "react-icons/cg";
import { PiTelegramLogoFill } from "react-icons/pi";
import { ImUser } from "react-icons/im";
import { LuLayoutTemplate } from "react-icons/lu";
import { FaMoneyBill1Wave } from "react-icons/fa6";

const SidebarContainer = tw.div`bg-[#06163A] text-white transition-all overflow-y-auto fixed top-0 left-0 h-full float-left duration-300 text-xs md:text-sm ${(
  p
) => (p.$isOpen ? "w-1/6" : "w-1/12")}`;
const Logo = tw.img`w-8  ${(p) => (!p.$isOpen ? "hidden" : "")}`;
const Header = tw.div`flex items-center justify-between p-4 bg-[#06163A]`;
const ToggleButton = tw.button`text-white focus:outline-none`;
const Nav = tw.nav`mt-4 mx-2`;
const NavList = tw.ul`ml-0`;
const NavItem = tw.li`flex flex-col`;
const NavItemHeader = tw.div`flex  items-center p-2 mt-3 hover:bg-orange-500 transition-colors duration-300 cursor-pointer rounded-md ${(
  p
) => p.$isActive && "bg-orange-500"}`;
const NavText = tw.span`font-basic text-base ml-4  ${(p) =>
  !p.$isOpen ? "hidden" : ""}`;
const SubMenu = tw.ul`ml-0 mt-2 text-xs md:text-sm`;
const SubMenuItem = tw.li`flex items-center pl-6 py-2 mt-2 hover:bg-orange-500 rounded-md transition-colors duration-300 cursor-pointer ${(
  p
) => p.$isActive && "bg-orange-500"}`;

const Sidebar = ({ PR }) => {
  const user = useSelector((state) => state.UserReducer.user);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [isChartsOpen, setIsChartsOpen] = useState(false);
  const [isTablesOpen, setIsTablesOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [isUSSDOpen, setIsUSSDOpen] = useState(false);
  const [isSenderIdOpen, setIsSenderIdOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isFacebookModalOpen, setIsFacebookModalOpen] = useState(false);
  const [isInstaModalOpen, setIsInstaModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isReportCampaignOpen, setIsReportCampaignOpen] = useState(false);
  const [isReportSocialOpen, setIsReportSocialOpen] = useState(false);
  const togglePlan = () => {
    setIsPlanOpen(!isPlanOpen);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCharts = () => {
    setIsChartsOpen(!isChartsOpen);
  };

  const toggleTables = () => {
    setIsTablesOpen(!isTablesOpen);
  };

  const toggleMedia = () => {
    setIsMediaOpen(!isMediaOpen);
  };

  const toggleUSSD = () => {
    setIsUSSDOpen(!isUSSDOpen);
  };

  const toggleSenderId = () => {
    setIsSenderIdOpen(!isSenderIdOpen);
  };
  const toggleReport = () => {
    setIsReportOpen(!isReportOpen);
  };
  const toggleReportCampaign = () => {
    setIsReportCampaignOpen(!isReportCampaignOpen);
  };
  const toggleReportSocial = () => {
    setIsReportSocialOpen(!isReportSocialOpen);
  };
  return (
    <SidebarContainer
      $isOpen={isOpen}
      style={{
        minWidth: isOpen ? "175px" : "",
        maxWidth: isOpen ? "230px" : "",
        paddingBottom: "100px",
      }}
    >
      {isFacebookModalOpen && (
        <ConnectToFacebookModal
          setIsFacebookModalOpen={setIsFacebookModalOpen}
        />
      )}
      {isInstaModalOpen && (
        <AuthenticateWithFacebookModal
          setIsInstaModalOpen={setIsInstaModalOpen}
        />
      )}
      <Header>
        <Logo src={Images.adLogo} alt="adsevo logo" $isOpen={isOpen} />
        <ToggleButton onClick={toggleSidebar}>
          <FaBars />
        </ToggleButton>
      </Header>
      <Nav>
        <NavList>
          <NavItem>
            <Link to="/dashboard">
              <NavItemHeader
                $isActive={pathname === "/dashboard"}
                data-tooltip-id="dashboard-tooltip"
                data-tooltip-delay-show={1000}
              >
                <FaTachometerAlt />
                <NavText $isOpen={isOpen}>Dashboard</NavText>
                {!isOpen && (
                  <Tooltip id="dashboard-tooltip" place="right" effect="solid">
                    Dashboard
                  </Tooltip>
                )}
              </NavItemHeader>
            </Link>
          </NavItem>
          {user?.type == Config.UserType.ClientUser && (
            <>
              <NavItem>
                <Link to="/contacts">
                  <NavItemHeader
                    $isActive={pathname === "/contacts"}
                    data-tooltip-id="contacts-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <FaUser />
                    <NavText $isOpen={isOpen}>Contacts</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="contacts-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Contacts
                      </Tooltip>
                    )}
                  </NavItemHeader>
                </Link>
              </NavItem>
            </>
          )}
          <NavItem>
            <NavItemHeader
              onClick={toggleCharts}
              data-tooltip-id="templates-tooltip"
              data-tooltip-delay-show={1000}
            >
              <HiTemplate />
              <NavText $isOpen={isOpen}>
                Templates{" "}
                <RiArrowDropDownLine
                  className={`inline-block  w-4 h-4 transition-transform ${
                    isChartsOpen ? "rotate-180" : ""
                  }`}
                />
              </NavText>
              {!isOpen && (
                <Tooltip id="templates-tooltip" place="right" effect="solid">
                  Templates
                </Tooltip>
              )}
            </NavItemHeader>
            {isChartsOpen && (
              <SubMenu>
                <NavItem>
                  <SubMenuItem
                    onClick={toggleSenderId}
                    data-tooltip-id="sender-template-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <MdOutlineAddCircle />
                    <NavText $isOpen={isOpen}>
                      Sender Ids{" "}
                      <RiArrowDropDownLine
                        className={`inline-block w-4 h-4 transition-transform ${
                          isSenderIdOpen ? "rotate-180" : ""
                        }`}
                      />
                    </NavText>
                    {!isOpen && (
                      <Tooltip
                        id="sender-template-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Create Sender Id
                      </Tooltip>
                    )}
                  </SubMenuItem>
                  {isSenderIdOpen && (
                    <SubMenu className="ml-5">
                      <Link to="/sender-id">
                        <SubMenuItem
                          $isActive={pathname === "/sender-id"}
                          data-tooltip-id="sender-id-sms-tooltip"
                          data-tooltip-delay-show={1000}
                        >
                          <MdSms />
                          <NavText $isOpen={isOpen}>SMS</NavText>
                          {!isOpen && (
                            <Tooltip
                              id="sender-id-sms-tooltip"
                              place="right"
                              effect="solid"
                            >
                              SMS
                            </Tooltip>
                          )}
                        </SubMenuItem>
                      </Link>
                      {user.type === Config.UserType.ClientUser && (
                        <Link to="/sender-id/email">
                          <SubMenuItem
                            $isActive={pathname === "/sender-id/email"}
                            data-tooltip-id="sender-id-email-tooltip"
                            data-tooltip-delay-show={1000}
                          >
                            <MdEmail />
                            <NavText $isOpen={isOpen}>Email</NavText>
                            {!isOpen && (
                              <Tooltip
                                id="sender-id-email-tooltip"
                                place="right"
                                effect="solid"
                              >
                                Email
                              </Tooltip>
                            )}
                          </SubMenuItem>
                        </Link>
                      )}
                    </SubMenu>
                  )}
                </NavItem>
                <Link to="/sms-template">
                  <SubMenuItem
                    $isActive={pathname === "/sms-template"}
                    data-tooltip-id="sms-template-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <MdSms />
                    <NavText $isOpen={isOpen}>SMS</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="sms-template-tooltip"
                        place="right"
                        effect="solid"
                      >
                        SMS
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
                {user.type === Config.UserType.ClientUser && (
                  <Link to="/email-template">
                    <SubMenuItem
                      $isActive={pathname === "/email-template"}
                      data-tooltip-id="email-template-tooltip"
                      data-tooltip-delay-show={1000}
                    >
                      <MdEmail />
                      <NavText $isOpen={isOpen}>Email</NavText>
                      {!isOpen && (
                        <Tooltip
                          id="email-template-tooltip"
                          place="right"
                          effect="solid"
                        >
                          Email
                        </Tooltip>
                      )}
                    </SubMenuItem>
                  </Link>
                )}

                <Link to="/whatsapp-template">
                  <SubMenuItem
                    $isActive={pathname === "/whatsapp-template"}
                    data-tooltip-id="whatsapp-template-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <FaWhatsapp />
                    <NavText $isOpen={isOpen}>Whatsapp</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="whatsapp-template-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Whatsapp
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
                <Link to="/telegram-template">
                  <SubMenuItem
                    $isActive={pathname === "/telegram-template"}
                    data-tooltip-id="telegram-template-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <PiTelegramLogoFill />
                    <NavText $isOpen={isOpen}>Telegram</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="telegram-template-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Telegram
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
              </SubMenu>
            )}
          </NavItem>
          <NavItem>
            <NavItemHeader
              onClick={toggleTables}
              data-tooltip-id="campaign-tooltip"
              data-tooltip-delay-show={1000}
            >
              <SiCampaignmonitor />
              <NavText $isOpen={isOpen}>
                Campaign{" "}
                <RiArrowDropDownLine
                  className={`inline-block w-4 h-4 transition-transform ${
                    isTablesOpen ? "rotate-180" : ""
                  }`}
                />
              </NavText>
              {!isOpen && (
                <Tooltip id="campaign-tooltip" place="right" effect="solid">
                  Campaign
                </Tooltip>
              )}
            </NavItemHeader>
            {isTablesOpen && (
              <SubMenu>
                <Link to="/campaign/sms">
                  <SubMenuItem
                    $isActive={pathname === "/campaign/sms"}
                    data-tooltip-id="sms-campaign-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <MdSms />
                    <NavText $isOpen={isOpen}>SMS</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="sms-campaign-tooltip"
                        place="right"
                        effect="solid"
                      >
                        SMS Campaign
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
                {user.type === Config.UserType.ClientUser && (
                  <Link to="/email-campaign">
                    <SubMenuItem
                      $isActive={pathname === "/email-campaign"}
                      data-tooltip-id="email-campaign-tooltip"
                      data-tooltip-delay-show={1000}
                    >
                      <MdEmail />
                      <NavText $isOpen={isOpen}>Email</NavText>
                      {!isOpen && (
                        <Tooltip
                          id="email-campaign-tooltip"
                          place="right"
                          effect="solid"
                        >
                          Email Campaign
                        </Tooltip>
                      )}
                    </SubMenuItem>
                  </Link>
                )}
                <Link to="/campaign/voice">
                  <SubMenuItem
                    $isActive={pathname === "/campaign/voice"}
                    data-tooltip-id="voice-campaign-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <RiChatVoiceFill />
                    <NavText $isOpen={isOpen}>Voice</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="voice-campaign-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Voice Campaign
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
                <Link to="/campaign/whatsapp">
                  <SubMenuItem
                    $isActive={pathname === "/campaign/whatsapp"}
                    data-tooltip-id="whatsapp-campaign-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <FaWhatsapp />
                    <NavText $isOpen={isOpen}>Whatsapp</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="whatsapp-campaign-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Whatsapp Campaign
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
                <Link to="/campaign/telegram">
                  <SubMenuItem
                    $isActive={pathname === "/campaign/telegram"}
                    data-tooltip-id="telegram-campaign-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <PiTelegramLogoFill />
                    <NavText $isOpen={isOpen}>Telegram</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="whatsapp-campaign-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Telegram Campaign
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
              </SubMenu>
            )}
          </NavItem>

          <>
            <NavItem>
              <NavItemHeader
                onClick={toggleMedia}
                data-tooltip-id="social-tooltip"
                data-tooltip-delay-show={1000}
              >
                <FaThumbsUp />
                <NavText $isOpen={isOpen}>
                  Social Media{" "}
                  <RiArrowDropDownLine
                    className={`inline-block w-4 h-4 transition-transform ${
                      isMediaOpen ? "rotate-180" : ""
                    }`}
                  />
                </NavText>
                {!isOpen && (
                  <Tooltip id="social-tooltip" place="right" effect="solid">
                    Social Media
                  </Tooltip>
                )}
              </NavItemHeader>
              {isMediaOpen && (
                <SubMenu>
                  <Link to="/fb/post">
                    <SubMenuItem
                      $isActive={pathname === "/fb/post"}
                      data-tooltip-id="facebook-tooltip"
                      data-tooltip-delay-show={1000}
                    >
                      <FaFacebookSquare />
                      <NavText $isOpen={isOpen}>Facebook</NavText>
                      {!isOpen && (
                        <Tooltip
                          id="facebook-tooltip"
                          place="right"
                          effect="solid"
                        >
                          Facebook
                        </Tooltip>
                      )}
                    </SubMenuItem>
                  </Link>
                  <Link to="/instagram/post">
                    <SubMenuItem
                      $isActive={pathname === "/instagram/post"}
                      data-tooltip-id="instagram-tooltip"
                      data-tooltip-delay-show={1000}
                    >
                      <FaInstagram />
                      <NavText $isOpen={isOpen}>Instagram</NavText>
                      {!isOpen && (
                        <Tooltip
                          id="instagram-tooltip"
                          place="right"
                          effect="solid"
                        >
                          Instagram
                        </Tooltip>
                      )}
                    </SubMenuItem>
                  </Link>
                </SubMenu>
              )}
            </NavItem>
          </>

          {user?.type == Config.UserType.ClientUser && (
            <>
              <NavItem>
                <NavItemHeader
                  onClick={toggleUSSD}
                  data-tooltip-id="ussd-tooltip"
                  data-tooltip-delay-show={1000}
                >
                  <FaHashtag />
                  <NavText $isOpen={isOpen}>
                    USSD{" "}
                    <RiArrowDropDownLine
                      className={`inline-block w-4 h-4 transition-transform ${
                        isUSSDOpen ? "rotate-180" : ""
                      }`}
                    />
                  </NavText>
                  {!isOpen && (
                    <Tooltip id="ussd-tooltip" place="right" effect="solid">
                      USSD
                    </Tooltip>
                  )}
                </NavItemHeader>
                {isUSSDOpen && (
                  <SubMenu>
                    <Link to="/ussd-survey">
                      <SubMenuItem
                        $isActive={pathname === "/ussd-survey"}
                        data-tooltip-id="survey-tooltip"
                        data-tooltip-delay-show={1000}
                      >
                        <RiSurveyFill />
                        <NavText $isOpen={isOpen}>Survey</NavText>
                        {!isOpen && (
                          <Tooltip
                            id="survey-tooltip"
                            place="right"
                            effect="solid"
                          >
                            Survey
                          </Tooltip>
                        )}
                      </SubMenuItem>
                    </Link>
                  </SubMenu>
                )}
              </NavItem>
              <NavItem>
                <Link to="/transactions">
                  <NavItemHeader
                    data-tooltip-id="payments-settings-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <FaMoneyBill />
                    <NavText $isOpen={isOpen}>Transactions</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="payments-settings-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Transactions
                      </Tooltip>
                    )}
                  </NavItemHeader>
                </Link>
              </NavItem>
            </>
          )}
          {(user?.type == Config.UserType.SuperAdminUser ||
            user?.type == Config.UserType.FinanceAdminUser ||
            user?.type == Config.UserType.CommercialAdminUser) && (
            <>
              {PR.includes(Config.Modules.Plans) && (
                <NavItem>
                  <NavItemHeader
                    onClick={togglePlan}
                    data-tooltip-id="plan-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <TbCurrencyCent />
                    <NavText $isOpen={isOpen}>
                      Plan{" "}
                      <RiArrowDropDownLine
                        className={`inline-block w-4 h-4 transition-transform ${
                          isPlanOpen ? "rotate-180" : ""
                        }`}
                      />
                    </NavText>
                    {!isOpen && (
                      <Tooltip id="plan-tooltip" place="right" effect="solid">
                        Plan
                      </Tooltip>
                    )}
                  </NavItemHeader>
                  {isPlanOpen && (
                    <SubMenu>
                      <Link to="/plan/list">
                        <SubMenuItem
                          $isActive={pathname === "/plan/list"}
                          data-tooltip-id="plan-list-tooltip"
                          data-tooltip-delay-show={1000}
                        >
                          <FaList />
                          <NavText $isOpen={isOpen}>Plan List</NavText>
                          {!isOpen && (
                            <Tooltip
                              id="plan-list-tooltip"
                              place="right"
                              effect="solid"
                            >
                              Plan List
                            </Tooltip>
                          )}
                        </SubMenuItem>
                      </Link>

                      <Link to="/plan/features">
                        <SubMenuItem
                          $isActive={pathname === "/plan/features"}
                          data-tooltip-delay-show={1000}
                          data-tooltip-id="plan-features-tooltip"
                        >
                          <CgAttribution />
                          <NavText $isOpen={isOpen}>Plan Feature</NavText>
                          {!isOpen && (
                            <Tooltip
                              id="plan-features-tooltip"
                              place="right"
                              effect="solid"
                            >
                              Plan Feature
                            </Tooltip>
                          )}
                        </SubMenuItem>
                      </Link>
                    </SubMenu>
                  )}
                </NavItem>
              )}
              <NavItem>
                <Link to="/email/template/samples">
                  <NavItemHeader
                    $isActive={pathname === "/email/template/samples"}
                    data-tooltip-id="contacts-tooltip"
                  >
                    <LuLayoutTemplate />
                    <NavText $isOpen={isOpen}>Email Samples</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="contacts-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Email Templates
                      </Tooltip>
                    )}
                  </NavItemHeader>
                </Link>
              </NavItem>
              <NavItem>
                <NavItemHeader
                  onClick={toggleUSSD}
                  data-tooltip-id="ussd-tooltip"
                  data-tooltip-delay-show={1000}
                >
                  <FaHashtag />
                  <NavText $isOpen={isOpen}>
                    USSD{" "}
                    <RiArrowDropDownLine
                      className={`inline-block w-4 h-4 transition-transform ${
                        isUSSDOpen ? "rotate-180" : ""
                      }`}
                    />
                  </NavText>
                  {!isOpen && (
                    <Tooltip id="ussd-tooltip" place="right" effect="solid">
                      USSD
                    </Tooltip>
                  )}
                </NavItemHeader>
                {isUSSDOpen && (
                  <SubMenu>
                    <Link to="/survey-list">
                      <SubMenuItem
                        $isActive={pathname === "/survey-list"}
                        data-tooltip-id="survey-tooltip"
                        data-tooltip-delay-show={1000}
                      >
                        <RiSurveyFill />
                        <NavText $isOpen={isOpen}>Survey List</NavText>
                        {!isOpen && (
                          <Tooltip
                            id="survey-tooltip"
                            place="right"
                            effect="solid"
                          >
                            Survey
                          </Tooltip>
                        )}
                      </SubMenuItem>
                    </Link>
                  </SubMenu>
                )}
              </NavItem>
            </>
          )}
          <NavItem>
            <NavItemHeader
              onClick={toggleReport}
              data-tooltip-id="report-tooltip"
              data-tooltip-delay-show={1000}
            >
              <FaChartBar />
              <NavText $isOpen={isOpen}>
                Reports & Analytics{" "}
                <RiArrowDropDownLine
                  className={`inline-block w-4 h-4 transition-transform ${
                    isReportOpen ? "rotate-180" : ""
                  }`}
                />
              </NavText>
              {!isOpen && (
                <Tooltip id="reporting-tooltip" place="right" effect="solid">
                  Reports & Analytics
                </Tooltip>
              )}
            </NavItemHeader>
            {isReportOpen && (
              <SubMenu>
                <Link to="/survey-list">
                  <SubMenuItem
                    $isActive={pathname === "/survey-list"}
                    data-tooltip-id="sms-reporting-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <FaSms />
                    <NavText $isOpen={isOpen}>SMS</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="sms-reporting-tooltip"
                        place="right"
                        effect="solid"
                      >
                        SMS Report
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
                <Link to="/survey-list">
                  <SubMenuItem
                    $isActive={pathname === "/survey-list"}
                    data-tooltip-id="sms-reporting-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <MdEmail />
                    <NavText $isOpen={isOpen}>Email</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="email-reporting-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Email
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
                <Link to="/survey-list">
                  <SubMenuItem
                    $isActive={pathname === "/survey-list"}
                    data-tooltip-id="sms-reporting-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <MdKeyboardVoice />
                    <NavText $isOpen={isOpen}>Voice</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="voice-reporting-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Voice
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
                <Link to="/survey-list">
                  <SubMenuItem
                    $isActive={pathname === "/survey-list"}
                    data-tooltip-id="sms-reporting-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <FaWhatsapp />
                    <NavText $isOpen={isOpen}>WhatsApp</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="facebook-reporting-tooltip"
                        place="right"
                        effect="solid"
                      >
                        WhatsApp
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
                <Link to="/survey-list">
                  <SubMenuItem
                    $isActive={pathname === "/survey-list"}
                    data-tooltip-id="sms-reporting-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <FaFacebook />
                    <NavText $isOpen={isOpen}>Facebook</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="facebook-reporting-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Facebook
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
                <Link to="/survey-list">
                  <SubMenuItem
                    $isActive={pathname === "/survey-list"}
                    data-tooltip-id="telegram-reporting-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <FaTelegram />
                    <NavText $isOpen={isOpen}>Telegram</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="telegram-reporting-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Telegram
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
              </SubMenu>
            )}
          </NavItem>
          {(user?.type == Config.UserType.SuperAdminUser ||
            user?.type == Config.UserType.FinanceAdminUser ||
            user?.type == Config.UserType.CommercialAdminUser) && (
            <>
              {PR.includes(Config.Modules.Payments) &&(
              <NavItem>
                <Link to="/admin-payments">
                  <NavItemHeader
                    data-tooltip-id="payments-settings-tooltip"
                    data-tooltip-delay-show={1000}
                  >
                    <FaMoneyBill />
                    <NavText $isOpen={isOpen}>Payments</NavText>
                    {!isOpen && (
                      <Tooltip
                        id="payments-settings-tooltip"
                        place="right"
                        effect="solid"
                      >
                        Payments
                      </Tooltip>
                    )}
                  </NavItemHeader>
                </Link>
              </NavItem>
            )}
            </>
          )}
        </NavList>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;
