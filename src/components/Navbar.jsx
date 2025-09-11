import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import Images from "../Images";

const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [isMobileUser, setIsMobileUser] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileUser(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsNavActive(false);
  }, [pathname]);

  const toggleNavbar = () => setIsNavActive(!isNavActive);

  return (
    <Nav $isScrolled={isScrolled} $isDropdownOpen={isDropdownOpen}>
      <Container $isNavActive={isNavActive}>
        <Link to="/" className="z-10">
          <Logo src={Images.adsevoLogo} alt="Adsevo logo" />
        </Link>
        <MenuIconComp toggleNavbar={toggleNavbar} />
        <NavLinksComp
          isNavActive={isNavActive}
          isUserMenuVisible={isUserMenuVisible}
          setIsUserMenuVisible={setIsUserMenuVisible}
          isMobileUser={isMobileUser}
          pathname={pathname}
          setIsDropdownOpen={setIsDropdownOpen}
        />
      </Container>
    </Nav>
  );
};

const NavLinksComp = ({
  isNavActive,
  isMobileUser,
  isUserMenuVisible,
  setIsUserMenuVisible,
  pathname,
  setIsDropdownOpen,
}) => {
  const [showBookingSubLinks, setShowBookingSubLinks] = useState(false);
  const [showBookingSubLinks2, setShowBookingSubLinks2] = useState(false);
  const [showBookingSubLinks3, setShowBookingSubLinks3] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsDropdownOpen(
      showBookingSubLinks || showBookingSubLinks2 || showBookingSubLinks3
    );
  }, [
    showBookingSubLinks,
    showBookingSubLinks2,
    showBookingSubLinks3,
    setIsDropdownOpen,
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-content") &&
        !event.target.closest(".dropdown-trigger")
      ) {
        setShowBookingSubLinks(false);
        setShowBookingSubLinks2(false);
        setShowBookingSubLinks3(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFeatureClick = () => {
    setShowBookingSubLinks2(!showBookingSubLinks2);
    setShowBookingSubLinks(false);
    setShowBookingSubLinks3(false);
  };

  const handleSolutionsClick = () => {
    setShowBookingSubLinks3(!showBookingSubLinks3);
    setShowBookingSubLinks2(false);
    setShowBookingSubLinks(false);
  };

  const handleResourcesClick = () => {
    setShowBookingSubLinks(!showBookingSubLinks);
    setShowBookingSubLinks2(false);
    setShowBookingSubLinks3(false);
  };

  return (
    <>
    <NavLinksWrapper
        $isNavActive={isNavActive}
        className={`flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 ${
          isNavActive ? "h-screen" : "h-auto"
        } md:h-auto bg-white`}
      >
        <NavLink
          className="relative flex justify-between w-full md:w-auto sm:px-0 md:py-0 dropdown-trigger"
          onClick={handleFeatureClick}
        >
          Feature
          <RiArrowDropDownLine
            className={`inline-block w-4 h-4 mt-1 transition-transform ${
              showBookingSubLinks2 ? "rotate-180" : ""
            }`}
          />
        </NavLink>
        <NavLink
          className="relative flex justify-between w-full md:w-auto sm:px-0 md:py-0 dropdown-trigger"
          onClick={handleSolutionsClick}
        >
          Solutions
          <RiArrowDropDownLine
            className={`inline-block w-4 h-4 mt-1 transition-transform ${
              showBookingSubLinks3 ? "rotate-180" : ""
            }`}
          />
        </NavLink>
        <Link to="/pricing" className="w-full md:w-auto">
          <NavLink className="relative flex justify-between md:py-0 sm:py-0">
            Pricing
          </NavLink>
        </Link>

        <NavLink
          className="relative flex justify-between w-full md:w-auto sm:px-0 md:py-0 dropdown-trigger"
          onClick={handleResourcesClick}
        >
          Resources
          <RiArrowDropDownLine
            className={`inline-block w-4 h-4 mt-1 transition-transform ${
              showBookingSubLinks ? "rotate-180" : ""
            }`}
          />
        </NavLink>
        <Link to="/sales-contact" className="w-full md:w-auto">
          <NavLink className="flex justify-between md:py-0">
            Request Demo
          </NavLink>
        </Link>
        <Link to="/login" className="w-full md:w-auto">
          <LoginButton className="w-full max-w-xs mx-auto md:w-auto">
            Login
          </LoginButton>
        </Link>
        <Link to="/register" className="w-full md:w-auto">
          <RegisterButton className="w-full max-w-xs mx-auto md:w-auto">
            Register
          </RegisterButton>
        </Link>
    </NavLinksWrapper>

    {showBookingSubLinks3 && (
        <FullScreenDropdown>
        <div className="md:w-1/2 md:flex-1">
            <NewTitle>Consumer-Focused Industries</NewTitle>
            <hr className="mx-10" />
            <DropdownContent>
              <ul>
                <div className="one">
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.advertising}
                      title="Advertising"
                      description="Discover how you can leverage the platform to deliver targeted campaigns, creative services, and client management, enhancing customer experiences with personalized content and loyalty programs."
                      to="/advertising"
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.welcome}
                      title="Hospitality & Tourism"
                      to={"/hospitality-and-tourism"}
                      description="Explore the ways you can leverage the platform in services such as hotels, resorts, and event planning, aimed at improving guest satisfaction and engagement."
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      to={"/wholesale-and-retail"}
                      icon={Images.shop}
                      title="Wholesale & Retail"
                      description="Explore how you can leverage the platform in wholesale and retail to boost customer satisfaction, streamline operations, and enhance sales and engagement."
                    />
                  </li>
                </div>
              </ul>
              <ul>
                <div className="second">
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.insurance}
                      title="Insurance"
                      to="/insurance"
                      description="The Platform Offers risk management solutions through various types of solutions, aiming to increase customer retention and optimize policy renewals"
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.banking}
                      title="Banking & Finance"
                      description="Available Solutions for financial services, including savings, loans, and investments, with a focus on customer engagement through digital and personalized offerings."
                      to="/banking-and-finance"
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.education}
                      title="Education"
                      to="/education"
                      description="Using the platform for education management, aiming to enhance student engagement, teaching effectiveness, and administrative efficiency."
                    />
                  </li>
                </div>
              </ul>
            </DropdownContent>
        </div>
        <div className="md:w-1/2 md:flex-1">
            <NewTitle>Production-Focused Industries</NewTitle>
            <hr className="mx-10" />
            <DropdownContent>
              <ul>
                <div className="one">
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.factory}
                      title="Religious Institutions"
                      description="Explore how you can leverage the platform in services such as religious institution, aimed at improving guest satisfaction and engagement."
                      to="/religious-institutions"
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.healthcare}
                      title="Health"
                      to="/health-industry"
                      description="Using the platform for patient care, and health management, aiming to improve patient engagement, service delivery, and operational efficiency."
                    />
                  </li>
                </div>
              </ul>
              <ul>
                <div className="second">
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.industrial}
                      title="Oil, Gas & Mining"
                      to="/oil-and-gas"
                      description="Focuses on the extraction, refining, and distribution of energy resources, emphasizing operational safety, process optimization, and regulatory compliance."
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      to={"/food-and-agriculture"}
                      icon={Images.agriculture}
                      title="Food, Agriculture & Forestry"
                      description="Explore the ways you can leverage the platform in services such as Agriculture and Forestry aimed at improving satisfaction and engagement."
                    />
                  </li>
                </div>
              </ul>
            </DropdownContent>
        </div>
        </FullScreenDropdown>
    )}
    {showBookingSubLinks2 && (
        <FullScreenDropdown>
            <div className="md:w-1/2 md:flex-1">
            <NewTitle>Communication</NewTitle>
            <hr className="mx-10" />
            <DropdownContent>
              <ul>
                <div className="one">
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.MsgIcon}
                      title="Multi Channel Marketing Campaign Management"
                      description="Simplify the creation of visually appealing and effective campaigns without needing technical skills."
                      to="/multi-channel-marketing"
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.MsgIcon}
                      title="Social Media Marketing & Campaign Management"
                      description="Allows users to easily create and customize campaigns without needing advanced design skills, making campaign creation more accessible."
                      to="/social-media-marketing"
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.MsgIcon}
                      title="USSD Menu Builder Design"
                      description="Allows users to visualize the menu flow and make immediate adjustments, ensuring the final design meets their expectations before going live."
                      to="/ussd-menu"
                    />
                  </li>
                </div>
              </ul>
              <ul>
                <div className="second">
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.EmailIcon}
                      title="Device Campaign Management"
                      to="/device-management"
                      description="Reaching users within their preferred mobile apps with relevant and engaging ads, driving higher engagement rates."
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.MsgIcon}
                      title="GEO- Location Campaign Management"
                      to="/geo-location"
                      description="Allows marketers to target subscribers based on their physical location or proximity to specific landmarks or areas of interest."
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.MsgIcon}
                      title="Polling, Surveys & Customer Feedback Management"
                      description="Brand Consistency: Ensures that surveys align with company branding, enhancing recognition and trust."
                      to="/polling-and-surveys"
                    />
                  </li>
                </div>
              </ul>
            </DropdownContent>
            </div>
            <div className="md:w-1/2 md:flex-1">
            <NewTitle>Others</NewTitle>
            <hr className="mx-10" />
            <DropdownContent>
              <ul>
                <div className="one">
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.MsgIcon}
                      title="Automation & Business Operations"
                      description="Lead Capture: Facilitates the collection of contact information directly from the landing page."
                      to="/sales-and-marketing"
                    />
                  </li>

                  <li className="list-none">
                    <DropdownCard
                      icon={Images.MsgIcon}
                      title="Campaign Performance Dashboard & Analytics"
                      to="/report-and-analytics"
                      description="Feedback Collection: Gathers insights directly from target audiences."
                    />
                  </li>
                </div>
              </ul>
              <ul>
                <div className="second">
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.MsgIcon}
                      title="Loyalty Campaign Management"
                      to="/loyalty-management"
                      description="Feedback Collection: Gathers insights directly from target audiences."
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.MsgIcon}
                      title="Meetings & Appointments"
                      to="/meeting-and-appointment"
                      description="Feedback Collection: Gathers insights directly from target audiences."
                    />
                  </li>
                  {/* <li className="list-none">
                            <DropdownCard
                                icon={Images.MsgIcon}
                                title="Resources (API Integrations, Documentation & Support)"
                                to="/detail-pages"
                                description="Feedback Collection: Gathers insights directly from target audiences."
                            />
                        </li> */}
                </div>
              </ul>
            </DropdownContent>
            </div>
        </FullScreenDropdown>
    )}
    {showBookingSubLinks && (
        <FullScreenDropdown>
            <div className="md:w-1/2 md:flex-1">
            <NewTitle>API Documentation & Use Cases</NewTitle>
            <hr className="mx-10" />
            <DropdownContent>
              <ul>
                <div className="one">
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.gateway}
                      title="API Documentation, Integration & Support"
                      description="Technical guides for API use, integration steps, and dedicated support to assist developers in connecting and optimizing campaign tools."
                      to="/multi-channel-marketing"
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.video}
                      title="E-books, Webinars, Blogs & Vlogs"
                      description="Educational resources providing in-depth knowledge, industry trends, tips, and updates via various content formats."
                      to="/multi-channel-marketing"
                    />
                  </li>
                </div>
              </ul>
              <ul>
                <div className="second">
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.case}
                      title="Case Studies & Fact Sheets"
                      description="Real-world success stories and concise documents outlining the impact, features, and advantages of the platform."
                      to="/social-media-marketing"
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.events}
                      title="Events"
                      description="Information on upcoming workshops, conferences, and webinars relevant to campaign management."
                      to="/social-media-marketing"
                    />
                  </li>
                </div>
              </ul>
            </DropdownContent>
            </div>
            <div className="md:w-1/2 md:flex-1">
            <NewTitle>Consumer Support</NewTitle>
            <hr className="mx-10" />
            <DropdownContent>
              <ul>
                <div className="one">
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.insights}
                      title=" ⁠Consumer Insights"
                      description="Data-driven analysis and reports on customer behaviors, trends, and preferences to improve marketing strategies."
                      to="/sales-and-marketing"
                    />
                  </li>
                  <li className="list-none">
                    <DropdownCard
                      icon={Images.customer}
                      title="Help & Support Center"
                      description="Comprehensive assistance hub with FAQs, user guides, and support for troubleshooting and technical issues."
                      to="/sales-and-marketing"
                    />
                  </li>
                </div>
              </ul>
            </DropdownContent>
            </div>
        </FullScreenDropdown>
    )}
    </>
);
};

const MenuIconComp = ({ toggleNavbar }) => (
  <button
    onClick={toggleNavbar}
    className="z-10 text-gray-500 md:hidden"
    aria-label="Toggle navigation"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  </button>
);

const DropdownCard = ({ title, description, to, icon }) => (
  <div className="lg:h-[180px] md:h-[220px] w-full cursor-pointer   pt-3 ">
    <Link to={to}>
      <div className="p-4 transition-colors duration-200 rounded-lg hover:bg-gray-100">
        <div className="flex gap-2.5 items-start">
          <StyledIcon src={icon} alt="logo" />
          <h3 className="font-medium text-[15px] text-black-800">{title}</h3>
        </div>
        <p className="ml-8 text-[13px] text-gray-700 mt-2">{description}</p>
      </div>
    </Link>
  </div>
);

const StyledIcon = tw.img`
  w-5 h-4/5 object-contain mt-1
`;

const Nav = tw.nav`
z-40 w-full border-b navbar fixed top-0 right-0 left-0
${(p) => (p.$isScrolled || p.$isDropdownOpen ? "bg-white" : "bg-transparent")}`;

const Container = tw.div`Container flex items-center justify-between py-4 px-2 md:px-4`;

const Logo = tw.img`w-24 md:w-32 z-10 -ml-6`;

const Title = tw.h1`text-base font-semibold h-9`;
const NewTitle = tw.h1`p-4 pl-10 text-base font-semibold`;

const NavLinksWrapper = tw.ul`
${(p) => (p.$isNavActive ? "translate-y-0" : "-translate-y-full")}
fixed top-0 left-0 right-0 bg-white pt-16 transition duration-200 pb-5 flex flex-col items-center space-y-4 md:relative md:translate-y-0 md:space-y-0 md:pt-0 md:flex-row md:items-center md:bg-transparent md:p-0 md:space-x-4`;

const NavLink = tw.li`
${(p) => (p.$active ? "md:bg-gray-100 text-gray-900" : "")}
text-[15px] text-black-500 hover:text-orange-500 font-medium relative flex space-x-1.5 items-left md:items-center cursor-pointer py-2 px-4 md:rounded-full whitespace-nowrap md:px-2 tracking-wide transition duration-300 w-full`;

const LoginButton = tw.button`text-sm border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full px-4 py-2`;

const RegisterButton = tw.button`text-sm bg-orange-500 text-white rounded-full px-4 py-2 hover:bg-orange-700`;

// const FullScreenDropdown = tw.div`bg-white shadow-2xl z-40  absolute top-14 md:top-[70px] rounded-b-3xl  lg:h-fit dropdown-content grid grid-rows-1 md:grid-cols-2 -ml-8 md:-ml-4 lg:-ml-24 md:mr-8`;
const FullScreenDropdown = tw.div`
  bg-white
  shadow-2xl 
  z-40  
  absolute
  top-14 
  md:top-[70px] 
  rounded-b-3xl  
  dropdown-content 
  md:flex
  -ml-8 
  md:mr-8 
  max-h-screen
  overflow-y-auto
  pb-10
  
`;

// const DropdownContent = tw.div`
// rounded-lg px-5 py-4 grid grid-cols-1 lg:grid-row-2 md:grid-cols-2 bg-opacity-0 bg-black shadow-b-lg justify-around w-full scroll-auto overflow-auto`;

const DropdownContent = tw.div`
rounded-lg px-5 grid grid-cols-1 lg:grid-row-2 md:grid-cols-1 lg:grid-cols-2 bg-opacity-0  bg-black shadow-b-lg justify-around w-full scroll-auto overflow-y-auto`;

export default Navbar;
