import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaChartBar,
  FaBars,
  FaWhatsapp,
  FaFacebookSquare,
  FaInstagram,
  FaThumbsUp,
  FaHashtag,
} from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { PiIdentificationBadgeBold } from "react-icons/pi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { HiTemplate } from "react-icons/hi";
import { SiCampaignmonitor } from "react-icons/si";
import { MdSms, MdEmail, MdManageAccounts, MdOutlineAddCircle } from "react-icons/md";
import { RiArrowDropDownLine, RiChatVoiceFill, RiSurveyFill } from "react-icons/ri";
import { SiMinutemailer } from "react-icons/si";

import tw from "tailwind-styled-components";
import Images from "Images";
import { Tooltip } from "react-tooltip";
import Config from "Config";
import { useSelector, useDispatch } from "react-redux";
const SidebarContainer = tw.div`
  bg-[#06163A] text-white transition-all min-h-screen float-left duration-300 text-xs md:text-sm ${(p) =>
    p.$isOpen ? "w-56 " : "w-20"}
`;
const Logo = tw.img`w-8 z-10 ${(p) => (!p.$isOpen ? "hidden" : "")}`;
const Header = tw.div`
  flex items-center justify-between p-4 bg-[#06163A]
`;

const Title = tw.h1`
  text-xl font-bold ${(p) => (!p.$isOpen ? "hidden" : "")}
`;

const ToggleButton = tw.button`
  text-white focus:outline-none
`;

const Nav = tw.nav`
  mt-4 mx-2
`;

const NavList = tw.ul``;

const NavItem = tw.li`
  flex flex-col
`;

const NavItemHeader = tw.div`
  flex items-center p-2 mt-3 hover:bg-orange-500 transition-colors duration-300 cursor-pointer
`;

const NavText = tw.span`font-basic text-base
  ml-4  ${(p) => (!p.$isOpen ? "hidden" : "")}
`;

const SubMenu = tw.ul`
  ml-8 mt-2 text-xs md:text-sm
`;

const SubMenuItem = tw.li`
  flex items-center p-2 mt-2 hover:bg-orange-500 transition-colors duration-300 cursor-pointer ${(p) => (p.$isOpen ? "bg-orange-500" : "")}
`;

const Sidebar = () => {
  const user = useSelector((state) => state.UserReducer.user);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [isChartsOpen, setIsChartsOpen] = useState(false);
  const [isSenderOpen, setIsSenderOpen] = useState(false);
  const [isTablesOpen, setIsTablesOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [isUSSDOpen, setIsUSSDOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCharts = () => {
    setIsChartsOpen(!isChartsOpen);
  };

  const toggleSender = () => {
    setIsSenderOpen(!isSenderOpen);
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

  return (
    <SidebarContainer $isOpen={isOpen}>
      <Header>
        <Logo src={Images.LogoSevoc} alt="txt connect logo" $isOpen={isOpen} />
        {/* <Title $isOpen={isOpen}>Sevo </Title> */}
        <ToggleButton onClick={toggleSidebar}>
          <FaBars />
        </ToggleButton>
      </Header>
      <Nav>
        <NavList>
          <NavItem>
            <Link to="/dashboard">
              <NavItemHeader data-tooltip-id="dashboard-tooltip">
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
                  <NavItemHeader data-tooltip-id="contacts-tooltip">
                    <FaUser />
                    <NavText $isOpen={isOpen}>Contacts</NavText>
                    {!isOpen && (
                      <Tooltip id="contacts-tooltip" place="right" effect="solid">
                        Contacts
                      </Tooltip>
                    )}
                  </NavItemHeader>
                </Link>
              </NavItem>

            </>)}

          {user?.type == Config.UserType.SuperAdminUser && (
            <>
              <NavItem>
                <NavItemHeader
                  onClick={toggleSender}
                  data-tooltip-id="sender-tooltip"
                >
                  <PiIdentificationBadgeBold />
                  <NavText $isOpen={isOpen}>
                    Sender Id{" "}
                    <RiArrowDropDownLine
                      className={`inline-block w-4 h-4 transition-transform ${isSenderOpen ? "rotate-180" : ""
                        }`}
                    />
                  </NavText>
                  {!isOpen && (
                    <Tooltip id="sender-tooltip" place="right" effect="solid">
                      Sender Id
                    </Tooltip>
                  )}
                </NavItemHeader>
                {isSenderOpen && (
                  <SubMenu>
                    <Link to="/admin/sender-id-management">
                      <SubMenuItem data-tooltip-id="manage-sender-tooltip">
                        <MdManageAccounts />
                        <NavText $isOpen={isOpen}>Manage Sender Id</NavText>
                        {!isOpen && (
                          <Tooltip id="manage-sender-tooltip" place="right" effect="solid">
                            Manage Sender Id
                          </Tooltip>
                        )}
                      </SubMenuItem>
                    </Link>
                    <SubMenuItem data-tooltip-id="request-sender-tooltip">
                      <FaCodePullRequest />
                      <NavText $isOpen={isOpen}>Request Sender Id</NavText>
                      {!isOpen && (
                        <Tooltip id="request-sender-tooltip" place="right" effect="solid">
                          Request Sender Id
                        </Tooltip>
                      )}
                    </SubMenuItem>

                  </SubMenu>
                )}
              </NavItem>
            </>)}

          <NavItem>
            <NavItemHeader
              onClick={toggleCharts}
              data-tooltip-id="templates-tooltip"
            >
              <HiTemplate />
              <NavText $isOpen={isOpen}>
                Templates{" "}
                <RiArrowDropDownLine
                  className={`inline-block w-4 h-4 transition-transform ${isChartsOpen ? "rotate-180" : ""
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
                <Link to="/sender-id">
                  <SubMenuItem $isOpen={isOpen} data-tooltip-id="sender-template-tooltip">
                    <MdOutlineAddCircle />
                    <NavText $isOpen={isOpen}>Sender Id1</NavText>
                    {!isOpen && (
                      <Tooltip id="sender-template-tooltip" place="right" effect="solid">
                        Create Sender Id
                      </Tooltip>
                    )}
                  </SubMenuItem>
                </Link>
                <SubMenuItem data-tooltip-id="sms-template-tooltip">
                  <MdSms />
                  <NavText $isOpen={isOpen}>SMS</NavText>
                  {!isOpen && (
                    <Tooltip id="sms-template-tooltip" place="right" effect="solid">
                      SMS Templates
                    </Tooltip>
                  )}
                </SubMenuItem>
                <SubMenuItem data-tooltip-id="email-template-tooltip">
                  <MdEmail />
                  <NavText $isOpen={isOpen}>Email</NavText>
                  {!isOpen && (
                    <Tooltip id="email-template-tooltip" place="right" effect="solid">
                      Email Templates
                    </Tooltip>
                  )}
                </SubMenuItem>
                <SubMenuItem data-tooltip-id="whatsapp-template-tooltip">
                  <FaWhatsapp />
                  <NavText $isOpen={isOpen}>Whatsapp</NavText>
                  {!isOpen && (
                    <Tooltip id="whatsapp-template-tooltip" place="right" effect="solid">
                      Whatsapp Templates
                    </Tooltip>
                  )}
                </SubMenuItem>
              </SubMenu>
            )}
          </NavItem>
          <NavItem>
            <NavItemHeader
              onClick={toggleTables}
              data-tooltip-id="campaign-tooltip"
            >
              <SiCampaignmonitor />
              <NavText $isOpen={isOpen}>
                Campaign{" "}
                <RiArrowDropDownLine
                  className={`inline-block w-4 h-4 transition-transform ${isTablesOpen ? "rotate-180" : ""
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
                <SubMenuItem data-tooltip-id="sms-campaign-tooltip">
                  <MdSms />
                  <NavText $isOpen={isOpen}>SMS</NavText>
                  {!isOpen && (
                    <Tooltip id="sms-campaign-tooltip" place="right" effect="solid">
                      SMS Campaign
                    </Tooltip>
                  )}
                </SubMenuItem>
                <SubMenuItem data-tooltip-id="email-campaign-tooltip">
                  <SiMinutemailer />
                  <NavText $isOpen={isOpen}>Email</NavText>
                  {!isOpen && (
                    <Tooltip id="email-campaign-tooltip" place="right" effect="solid">
                      Email Campaign
                    </Tooltip>
                  )}
                </SubMenuItem>
                <SubMenuItem data-tooltip-id="voice-campaign-tooltip">
                  <RiChatVoiceFill />
                  <NavText $isOpen={isOpen}>Voice</NavText>
                  {!isOpen && (
                    <Tooltip id="voice-campaign-tooltip" place="right" effect="solid">
                      Voice Campaign
                    </Tooltip>
                  )}
                </SubMenuItem>
              </SubMenu>
            )}
          </NavItem>


          <NavItem>
            <NavItemHeader
              onClick={toggleMedia}
              data-tooltip-id="social-tooltip"
            >
              <FaThumbsUp />
              <NavText $isOpen={isOpen}>
                Social Media{" "}
                <RiArrowDropDownLine
                  className={`inline-block w-4 h-4 transition-transform ${isTablesOpen ? "rotate-180" : ""
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
                <SubMenuItem data-tooltip-id="whatsapp-tooltip">
                  <FaWhatsapp />
                  <NavText $isOpen={isOpen}>Whatsapp</NavText>
                  {!isOpen && (
                    <Tooltip id="whatsapp-tooltip" place="right" effect="solid">Whatsapp</Tooltip>)}
                </SubMenuItem>
                <SubMenuItem data-tooltip-id="facebook-tooltip">
                  <FaFacebookSquare />
                  <NavText $isOpen={isOpen}>Facebook</NavText>
                  {!isOpen && (
                    <Tooltip id="facebook-tooltip" place="right" effect="solid">Facebook</Tooltip>)}
                </SubMenuItem>
                <SubMenuItem data-tooltip-id="instagram-tooltip">
                  <FaInstagram />
                  <NavText $isOpen={isOpen}>Instagram</NavText>
                  {!isOpen && (
                    <Tooltip id="instagram-tooltip" place="right" effect="solid">Instagram</Tooltip>)}
                </SubMenuItem>
              </SubMenu>
            )}
          </NavItem>

          <NavItem>
            <NavItemHeader
              onClick={toggleUSSD}
              data-tooltip-id="ussd-tooltip"
            >
              <FaHashtag />
              <NavText $isOpen={isOpen}>
                USSD{" "}
                <RiArrowDropDownLine
                  className={`inline-block w-4 h-4 transition-transform ${isTablesOpen ? "rotate-180" : ""
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
                <SubMenuItem data-tooltip-id="survey-tooltip">
                  <RiSurveyFill />
                  <NavText $isOpen={isOpen}>Create Survey</NavText>
                  {!isOpen && (
                    <Tooltip id="survey-tooltip" place="right" effect="solid">Create Survey</Tooltip>)}
                </SubMenuItem>

              </SubMenu>
            )}
          </NavItem>
        </NavList>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;

