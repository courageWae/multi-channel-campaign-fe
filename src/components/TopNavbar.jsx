// import React, { useState, useEffect } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { HiOutlineBell } from "react-icons/hi";
// import { LuHelpCircle } from "react-icons/lu";
// import { PiPulseBold } from "react-icons/pi";
// import tw from "tailwind-styled-components";
// import { useDispatch, useSelector } from "react-redux";
// import { Remove_User } from "../Redux/actions";
// import { Tooltip } from "@mui/material";
// import { Link } from "react-router-dom";
// import Config from "Config";

// const TopNavbar = ({ pageTitle, pageSubtitle }) => {
//   const user = useSelector((state) => state.UserReducer.user);
//   const dispatch = useDispatch();

//   const logout = () => dispatch(Remove_User());
//   const [showDropdown, setShowDropdown] = useState(false);

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const closeDropdown = () => {
//     setShowDropdown(false);
//   };

//   const handleClickOutside = (event) => {
//     if (
//       !event.target.closest(".dropdown-menu") &&
//       !event.target.closest(".user-icon")
//     ) {
//       closeDropdown();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <NavbarContainer>
//       <div>
//         <Title>{pageTitle}</Title>
//         <SubTitle>{pageSubtitle}</SubTitle>
//       </div>
//       <NavbarContent>

//         {user.type == Config.UserType.ClientUser && (
//           <Btn className="flex gap-2 items-center bg-yellow-100 rounded-2xl group">
//             <PulseIcon className="group-hover:text-topBar-purple" />
//             <span className="pr-2 text-base font-semibold text-slate-800 group-hover:text-topBar-purple">
//               Usage and Plan
//             </span>
//           </Btn>)}

//         <Tooltip title="Help">
//           <Btn>
//             <LuHelpCircle size={20} />
//           </Btn>
//         </Tooltip>
//         <Tooltip title="Notifications">
//           <Btn>
//             <HiOutlineBell size={20} />
//           </Btn>
//         </Tooltip>
//         <Tooltip title="Profile & more...">
//           <Btn className="group" onClick={toggleDropdown}>
//             <UserIcon className="user-icon" />
//           </Btn>
//         </Tooltip>
//         {showDropdown && (
//           <DropdownMenu className="dropdown-menu">
//             {/* <Triangle /> */}
//             <DropdownItem>Profile</DropdownItem>
//             {user?.type == Config.UserType.SuperAdminUser && (
//               <Link to="/blacklist/keywords" >
//                 <DropdownItem>Blacklist Keyword</DropdownItem>
//               </Link>)}
//             <DropdownItem
//               className="font-semibold text-red-500"
//               onClick={logout}
//             >
//               Logout
//             </DropdownItem>
//           </DropdownMenu>
//         )}
//         {/* </IconsContainer> */}
//       </NavbarContent>
//     </NavbarContainer>
//   );
// };

// const NavbarContainer = tw.div`
//     bg-white h-14 px-8 flex justify-between items-center
// `;
// const Title = tw.h1`text-xl  text-gray-800 whitespace-nowrap   font-medium`;
// const SubTitle = tw.h1`text-xs  text-gray-500 whitespace-nowrap   `;
// const NavbarContent = tw.div`
//     flex items-center gap-8
// `;

// const Btn = tw.button`hover:bg-violet-100 hover:text-topBar-purple px-2 py-2 hover:rounded-xl`;
// const IconsContainer = tw.div`
//     flex items-center gap-8 relative
// `;

// const BellIcon = tw(HiOutlineBell)`
//     text-slate-800 cursor-pointer text-xl
// `;
// const PulseIcon = tw(PiPulseBold)`
//     text-slate-800 cursor-pointer text-xl h-4 w-4
// `;
// const HelpIcon = tw(LuHelpCircle)`
//     text-slate-800 cursor-pointer text-xl h-5 w-5 hover:text-topBar-purple
// `;

// const UserIcon = tw(FaUserCircle)`
//     text-slate-800 cursor-pointer text-xl h-5 w-5 group-hover:text-topBar-purple
// `;

// const DropdownMenu = tw.div`
//     absolute top-10 right-0  w-40 bg-white border border-gray-200 shadow-md rounded-md py-2 z-10
// `;

// const DropdownItem = tw.div`
//     cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full mx-2 text-sm
// `;

// const Triangle = tw.div`
//     w-5 h-5 bg-white absolute -top-3 right-1 transform rotate-45  border-l border-t border-gray-200
// `;

// export default TopNavbar;

import React, { useState, useEffect, useRef } from "react";
import { FaRegTimesCircle, FaUserCircle } from "react-icons/fa";
import { HiOutlineBell } from "react-icons/hi";
import { LuHelpCircle } from "react-icons/lu";
import { PiPulseBold } from "react-icons/pi";
import tw from "tailwind-styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Remove_User } from "../Redux/actions";
import { Tooltip } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Config from "Config";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import moment from "moment";

const TopNavbar = ({ pageTitle, pageSubtitle }) => {
  const user = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();
  const PR = user?.permissions?.split(",") || [];

  const logout = () => dispatch(Remove_User());
  const [showDropdown, setShowDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [subData, setSubData] = useState([]);
  const [subExpired, setSubExpired] = useState(false);
  const location = useLocation();
  const [planPage, setPlanPage] = useState(false);
  const [emailCredits, setEmailCredits] = useState(0)
  const [smsCredits, setSmsCredits] = useState(0)


  useEffect(() => {
    if (
      subData?.plan_expiry_date &&
      checkIfExpired(subData?.plan_expiry_date)
    ) {
      setSubExpired(true);
    }
  }, [subData?.plan_expiry_date]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user?.token) {
        const response = await axios.get(`${Config.apiUrl}/profile/get/info`, {
          headers: {
            "Content-Type": "application/json",
            Token: `${user.token}`,
          },
        });

        if (response.data) {
          setSubData(response.data);
        }
      }
    };

    fetchData();
  }, [user?.token]);

  useEffect(()=>{
    const fetchCredits = async()=>{
      try{
        const response = await axios.get(`${Config.apiUrl}/account/credits`,{
          headers:{
            "Content-Type":"application/json",
            Token:user?.token
          }
        })
        const data = await response.data.leftCredits;
        setEmailCredits(data.email);
        setSmsCredits(data.sms);
        
      }catch(error){
        console.log("Error: ", error);
      }finally{
        console.log("PROCESS DONE");
      }
    }
    fetchCredits();
  },[user?.token])

  console.log("subData", subData);

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      !event.target.closest(".user-icon")
    ) {
      setShowDropdown(false);
      setOpenModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePlanPurchaseRedirect = () => {
    navigate("/plans");
  };

  const checkIfExpired = (dateString) => {
    const currentDate = moment();
    const targetDate = moment(dateString, "YYYY-MM-DD");

    return targetDate.isBefore(currentDate);
  };

  const handleOpenModal = () => setOpenModal(!openModal);

  const handleEmailTopUp = () => {
    navigate("/email/top-up");
  };
  const handleSmsTopUp = () => {
    navigate("/sms/top-up");
  };

  useEffect(()=>{
    const isPlanPage = ()=>{
      if(location.pathname === "/plans"){
        setPlanPage(true)
      }else{
        setPlanPage(false)
      }
    }
    isPlanPage();
  },[location])

  return (
    <NavbarContainer>
      <div>
        <Title>{pageTitle}</Title>
        <SubTitle>{pageSubtitle}</SubTitle>
      </div>
      <NavbarContent>
        {user.type === Config.UserType.ClientUser && (
          // <Btn
          //   className="flex gap-2 items-center bg-yellow-100 rounded-2xl group"
          //   onClick={handleOpenModal}
          // >
          //   Usage and Plan
          // </Btn>
          <>
          {
            !planPage && (
              <Btn
              type="button"
              onClick={handleOpenModal}
              className="flex gap-2 items-center bg-yellow-100 rounded-2xl group"
            >
              <PulseIcon className="group-hover:text-topBar-purple" />
              <span className="pr-2 text-base font-semibold text-slate-800 group-hover:text-topBar-purple">
                Usage and Plan
              </span>
            </Btn>
            )
          }
          </>
        )}

        {/* <Tooltip title="Help">
          <Btn>
            <LuHelpCircle size={20} />
          </Btn>
        </Tooltip>
        <Tooltip title="Notifications">
          <Btn>
            <HiOutlineBell size={20} />
          </Btn>
        </Tooltip> */}
        <Tooltip title="Profile & more...">
          <Btn className="group" onClick={toggleDropdown}>
            <UserIcon className="user-icon" />
          </Btn>
        </Tooltip>
        {showDropdown && (
          <DropdownMenu className="dropdown-menu">
            {/* <Triangle /> */}
            {user?.type === Config.UserType.ClientUser && (
              <Link to="/account-settings">
                <DropdownItem>Profile</DropdownItem>
              </Link>
            )}

            {(user?.type === Config.UserType.SuperAdminUser ||
              user?.type === Config.UserType.CommercialAdminUser ||
              user?.type === Config.UserType.FinanceAdminUserF) && (
              <>
                <Link to="/admin-profile">
                  <DropdownItem>Profile</DropdownItem>
                </Link>
                <Link to="/admin-users">
                  <DropdownItem>Admin Users</DropdownItem>
                </Link>
                {/* {PR.includes(Config.Modules.ClientUserList) && ( */}
                <Link to="/client-users">
                  <DropdownItem>Client Users</DropdownItem>
                </Link>
                {/* )} */}
                <Link to="/blacklist/keywords">
                  <DropdownItem>Blacklist Keyword</DropdownItem>
                </Link>
              </>
            )}

            <DropdownItem
              className="font-semibold text-red-500"
              onClick={logout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        )}
        {/* </IconsContainer> */}
      </NavbarContent>

      {openModal && (
        <>
          <div className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50">
            <ModalContainer
              ref={modalRef}
              className="bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <ModalHeader className="flex justify-between items-center p-4 border-b border-gray-200 sm:p-6">
                <div className="flex-1 min-w-0">
                  <Heading className="text-xl font-bold text-gray-800 sm:text-2xl">
                    Campaign Usage and Plan
                  </Heading>
                  <p className="mt-2 text-sm text-gray-500 sm:mt-3 sm:text-md">
                    Don't have enough credit? Upgrade your subscription or
                    top-up Email, SMS, or Voice credits.
                  </p>
                </div>
                <CloseButton
                  onClick={handleOpenModal}
                  className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600"
                >
                  <FaRegTimesCircle size={20} className="sm:w-6 sm:h-6" />
                </CloseButton>
              </ModalHeader>

              <ModalContent className="p-4 sm:p-6">
                {/* Responsive Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  {/* Email Credit Card */}
                  <div className="overflow-hidden relative p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg min-h-[160px] sm:min-h-[180px]">
                    <div className="absolute right-[-25%] top-[-25%] h-[120px] w-[120px] sm:h-[150px] sm:w-[150px] bg-gradient-to-r from-blue-200 to-blue-100 rounded-full"></div>
                    <div className="relative z-10">
                      <p className="text-3xl font-bold text-blue-900 sm:text-4xl lg:text-5xl">{emailCredits}</p>
                      <p className="mt-1 text-lg font-semibold text-blue-900 sm:text-xl">
                        Email Credits
                      </p>
                      <button
                        type="button"
                        onClick={handleEmailTopUp}
                        className="flex gap-1 items-center px-3 py-2 mt-3 text-sm font-semibold text-white bg-blue-500 rounded-lg sm:px-5 sm:py-3 sm:mt-4 hover:bg-blue-600 sm:text-base"
                      >
                        <CiCirclePlus className="text-sm text-white sm:text-md" />
                        <span>Top Up</span>
                      </button>
                    </div>
                  </div>

                  {/* SMS Credit Card */}
                  <div className="overflow-hidden relative p-4 sm:p-6 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-lg min-h-[160px] sm:min-h-[180px]">
                    <div className="absolute right-[-25%] top-[-25%] h-[120px] w-[120px] sm:h-[150px] sm:w-[150px] bg-gradient-to-r from-orange-600 to-yellow-300 rounded-full"></div>
                    <div className="relative z-10">
                      <p className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{smsCredits}</p>
                      <p className="mt-1 text-lg font-semibold text-white sm:text-xl">
                        SMS Credits
                      </p>
                      <button
                        type="button"
                        onClick={handleSmsTopUp}
                        className="flex gap-1 items-center px-3 py-2 mt-3 text-sm font-semibold text-white bg-orange-500 rounded-lg sm:px-5 sm:py-3 sm:mt-4 hover:bg-orange-600 sm:text-base"
                      >
                        <CiCirclePlus className="text-sm text-white sm:text-md" />
                        <span>Top Up</span>
                      </button>
                    </div>
                  </div>

                  {/* Telegram Credit Card */}
                  {/* <div className="overflow-hidden relative p-6 bg-gradient-to-r from-purple-100 to-purple-500 rounded-lg">
                    <div className="absolute right-[-25%] top-[-25%] h-[150px] w-[150px] bg-gradient-to-r from-purple-200 to-purple-400 rounded-full"></div>
                    <p className="z-10 text-5xl font-bold text-purple-900">0</p>
                    <p className="z-10 text-xl font-semibold text-purple-900">
                      Telegram
                    </p>
                    <button
                      type="button"
                      // onClick={handleTelegramTopUp}
                      className="flex z-10 gap-1 items-center px-5 py-3 mt-4 font-semibold text-white bg-purple-500 rounded-lg hover:bg-purple-600"
                    >
                      <CiCirclePlus className="mt-1 text-white text-md" />
                      <span>Top Up</span>
                    </button>
                  </div> */}


                  {/* WhatsApp Credit Card */}
                  {/* <div className="overflow-hidden relative p-6 bg-gradient-to-r from-green-100 to-green-500 rounded-lg">
                    <div className="absolute right-[-25%] top-[-25%] h-[150px] w-[150px] bg-gradient-to-r from-green-200 to-green-400 rounded-full"></div>
                    <p className="z-10 text-5xl font-bold text-green-900">0</p>
                    <p className="z-10 text-xl font-semibold text-green-900">
                      WhatsApp
                    </p>
                    <button
                      type="button"
                      // onClick={handleWhatsAppTopUp}
                      className="flex z-10 gap-1 items-center px-5 py-3 mt-4 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
                    >
                      <CiCirclePlus className="mt-1 text-white text-md" />
                      <span>Top Up</span>
                    </button>
                  </div> */}
                </div>

                {/* Plan Details Section */}
                <div className="p-4 mt-6 bg-gray-50 rounded-lg sm:p-6 sm:mt-8">
                  <div className="overflow-hidden mx-auto max-w-5xl bg-white rounded-lg shadow-lg lg:flex">
                    <div className="p-4 sm:p-6 lg:w-3/4">
                      <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                        {subData?.plan_type === Config.Plans.Free ||
                        subData?.plan_type === null
                          ? "Free Plan"
                          : subData?.plan_type === Config.Plans.Bronze
                          ? "Bronze Plan"
                          : subData?.plan_type === Config.Plans.Silver
                          ? "Silver Plan"
                          : "Gold Plan"}
                      </h3>
                      <p className="mt-4 text-gray-600">
                        You are currently using the
                        {subData?.plan_type === Config.Plans.Free ||
                        subData?.plan_type === null
                          ? " Free Plan"
                          : subData?.plan_type === Config.Plans.Bronze
                          ? " Bronze Plan"
                          : subData?.plan_type === Config.Plans.Silver
                          ? " Silver Plan"
                          : " Gold Plan"}
                        .
                      </p>
                      <div className="mt-4 border-t border-gray-200"></div>
                      <ul className="mt-6 space-y-4 lg:grid lg:grid-cols-1 lg:gap-6 lg:space-y-0">
                        <li className="flex items-center">
                          <svg
                            className="w-5 h-5 text-orange-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="ml-3 text-gray-500">
                            {subExpired
                              ? `Expired on: ${moment(
                                  subData?.plan_expiry_date
                                ).format("LL")}`
                              : `Expires on: ${moment(
                                  subData?.plan_expiry_date
                                ).format("LL")}`}
                          </p>
                        </li>
                      </ul>
                    </div>

                    {/* Pricing Section */}
                    <div className="flex flex-col justify-center p-4 text-center bg-gray-100 sm:p-6 lg:w-1/3">
                      <div className="flex justify-center items-center text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-5xl">
                        <span>₵{parseFloat(subData?.amount).toFixed(2)}</span>
                        <span className="ml-2 text-lg text-gray-500 sm:text-xl">GHS</span>
                      </div>
                      <button
                        type="button"
                        onClick={handlePlanPurchaseRedirect}
                        className="px-4 py-2 mt-4 text-sm font-medium text-white bg-orange-500 rounded-lg sm:px-5 sm:py-3 sm:mt-6 hover:bg-orange-600 sm:text-base"
                      >
                        {subExpired
                          ? "Purchase Subscription"
                          : "Upgrade Subscription"}
                      </button>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </ModalContent>
            </ModalContainer>
          </div>
        </>
      )}
    </NavbarContainer>
  );
};

const NavbarContainer = tw.div`
    bg-white h-14 px-8 flex justify-between items-center sticky top-0 z-50
`;
const Title = tw.h1`text-xl  text-gray-800 whitespace-nowrap   font-medium`;
const SubTitle = tw.h1`text-xs  text-gray-500 whitespace-nowrap   `;
const NavbarContent = tw.div`
    flex items-center gap-8
`;

const Btn = tw.button`hover:bg-violet-100 hover:text-topBar-purple px-2 py-2 hover:rounded-xl relative`;
const IconsContainer = tw.div`
    flex items-center gap-8 relative
`;

const BellIcon = tw(HiOutlineBell)`
    text-slate-800 cursor-pointer text-xl
`;
const PulseIcon = tw(PiPulseBold)`
    text-slate-800 cursor-pointer text-xl h-4 w-4
`;
const HelpIcon = tw(LuHelpCircle)`
    text-slate-800 cursor-pointer text-xl h-5 w-5 hover:text-topBar-purple
`;

const UserIcon = tw(FaUserCircle)`
    text-slate-800 cursor-pointer text-xl h-5 w-5 group-hover:text-topBar-purple
`;

const DropdownMenu = tw.div`
    absolute top-10 right-0  w-40 bg-white border border-gray-200 shadow-md rounded-md py-2 z-10
`;

const DropdownItem = tw.div`
    cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full mx-2 text-sm
`;

const Triangle = tw.div`
    w-5 h-5 bg-white absolute -top-3 right-1 transform rotate-45  border-l border-t border-gray-200
`;

const ModalContainer = tw.div`
  absolute top-14 right-4 sm:right-8 lg:right-20 w-[calc(100vw-2rem)] sm:w-[calc(100vw-4rem)] lg:w-2/3 xl:w-3/4 max-w-6xl bg-white border border-gray-200 shadow-lg rounded-lg py-4 px-6 z-20
`;

const ModalHeader = tw.div`
  flex justify-between items-center mb-4
`;

const CloseButton = tw.span`
  cursor-pointer text-xl font-bold
`;

const ModalContent = tw.div`
  text-gray-800
`;
const Heading = tw.h2`text-xl font-semibold`;
const SubHeading = tw.h4`text-base font-semibold`;
const Paragraph = tw.p`text-sm`;

export default TopNavbar;
