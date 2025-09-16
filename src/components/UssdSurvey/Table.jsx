import React, { useEffect, useState, useCallback, useRef } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { PaginationLimit } from "../../Config";

import {
  MdArrowBack,
  MdArrowForward,
  MdDelete,
  MdOutlinePending,
  MdOutlinePreview,
} from "react-icons/md";
import Config from "Config";
import { useSelector } from "react-redux";
import { IoMdMore } from "react-icons/io";
import { FaCheckCircle, FaEye, FaTimesCircle } from "react-icons/fa";
import { ImMobile } from "react-icons/im";
import LiveButton from "components/LiveButton";
import Timer from "./Timer";
import { TbLivePhoto } from "react-icons/tb";
import { CiShare2 } from "react-icons/ci";
import { FaChartBar } from "react-icons/fa";
import { showAlert } from "USSD/utilities/alert_utilities";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Table = ({
  ApiData,
  setSelectedData,
  setGoLiveModel,
  setViewModel,
  setOpenActionModel,
  setIsModalOpen,
  setNode,
  setEdge,
  setSurveyData,
  setAssignTestNumberModal,
  setUssdDetailsModal
}) => {
  const user = useSelector((state) => state.UserReducer.user);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const shareLink = (item) => {
    console.log("shareLink", item);
    setOpenActionMenu(null);
    window.navigator.clipboard.writeText(
      `${window.location.origin}/preview${item.preview_url}`
    );
    toast.success("Link copied to Clipboard");

  };

  const assignTestNumbersModal = (item) => {
    setAssignTestNumberModal(true);
    setSelectedData(item);
    setOpenActionMenu(null);
  };

  const handleSurveyDetails = (item)=>{
    setUssdDetailsModal(true);
    setSelectedData(item);
    setOpenActionMenu(null);
  }

  const handlePreviewClick = (item) => {
    const parsedData = JSON.parse(item.raw_data);
    const { nodes, edges } = parsedData.state;
    setSurveyData(item.raw_data);
    setNode(nodes);
    setEdge(edges);
    setIsModalOpen(true);
    setOpenActionMenu(null);
  };

  const goLive = (item) => {
    setSelectedData(item.id);
    setOpenActionMenu(false);
    setGoLiveModel(true);
  }

  const viewResponses = (item) => {
    setOpenActionMenu(false);
    navigate(`/ussd-survey-responses/${item.id}`);
  }

  const getStatus = (status) => {
    if (status === 1) {
      return (
        <button
          type="button"
          class="flex items-center text-orange-600 text-sm bg-orange-50 px-3 py-1.5 tracking-wide rounded-md"
        >
          <MdOutlinePending className="text-md" />
          <span className="ml-2 font-semibold">Pending</span>
        </button>
      );
    } else if (status === 2 || status === 4) {
      let status_text = "Approved";
      if (status === 4) {
        status_text = "Active";
      }
      return (
        <button
          type="button"
          class="flex items-center text-green-600 text-sm bg-green-50 px-3 py-1.5 tracking-wide rounded-md"
        >
          <FaCheckCircle className="text-md" />
          <span className="ml-2 font-semibold">{status_text}</span>
        </button>
      );
    } else if (status === 5) {
      return (
        <button
          type="button"
          class="flex items-center text-violet-600 text-sm bg-green-50 px-3 py-1.5 tracking-wide rounded-md"
        >
          <FaCheckCircle className="text-md" />
          <span className="ml-2 font-semibold">Inactive</span>
        </button>
      );
    } else {
      return (
        <button
          type="button"
          class="flex items-center text-red-600 text-sm bg-red-50 px-3 py-1.5 tracking-wide rounded-md"
        >
          <FaTimesCircle className="text-md" />
          <span className="ml-2 font-semibold">Rejected</span>
        </button>
      );
    }
  };

  const testingExpired = (expiredAt) => {
    const expiredDate = new Date(expiredAt);
    return new Date() > expiredDate;
  };

  const getId = (item) => {
    return (
      <span className="inline-flex gap-2 items-center px-4 py-1 bg-green-200 rounded-sm text-black-700">
        #{item}
      </span>
    );
  };
  const ActionBtns = (item) => {
    const openMenu = (id) => {
      setOpenActionMenu((prevId) => (prevId === id ? null : id));
    };
    const expired = testingExpired(item.expiry_time);

    return (
      <ActionBtnWrapper>
        {openActionMenu === item.id && (
          <MenuOptions id="menuOptions">
            <MenuItem onClick={() => shareLink(item)}>
              <CiShare2 className="mr-2 text-gray-700" /> Copy Shareable Link
            </MenuItem>
            {item.status === 2 && item.short_code_status !== 2 && (
              <MenuItem onClick={() => goLive(item)}>
                <TbLivePhoto className="mr-2 text-gray-700" /> Go Live
              </MenuItem>
            )}
            <MenuItem onClick={() => handlePreviewClick(item)}>
              <MdOutlinePreview className="mr-2 text-gray-700" /> Preview Survey
            </MenuItem>
            <MenuItem onClick={() => handleSurveyDetails(item)}>
              <FaEye className="mr-2 text-gray-700" /> Survey Details
            </MenuItem>
            {(item.status === 2 || item.status === 4) && (
              <MenuItem onClick={() => viewResponses(item)}>
                <FaChartBar className="mr-2 text-gray-700" /> View Responses
              </MenuItem>
            )}
            {/* {!expired && ( */}
              <MenuItem onClick={() => assignTestNumbersModal(item)}>
                <ImMobile className="mr-2 text-gray-700" /> Assign Test Numbers
              </MenuItem>
            {/* )} */}
            <Seperator />
            <MenuItem onClick={() => console.log("deleted")}>
              <MdDelete className="mr-2 text-red-700" /> Delete Survey
            </MenuItem>
          </MenuOptions>
        )}
        <Btn title="Actions" type="button" onClick={() => openMenu(item.id)}>
          <IoMdMore className="text-gray-600" size={24} />
        </Btn>
      </ActionBtnWrapper>
    );
  };

  const getShortCode = (item) => {
    const expired = testingExpired(item.expiry_time);

    if (item.short_code_status === 1 && !expired) {
      return (
        <button
          type="button"
          className="inline-flex items-center px-5 py-2.5 text-sm  font-semibold text-center text-violet-500 bg-violet-100 rounded-lg focus:ring-4 focus:outline-none focus:ring-violet-300 dark:bg-violet-100 dark:hover:bg-violet-100"
        >
          <ImMobile className="text-violet-600" />
          <span className="font-semibold">{item.short_code}</span>
          <span className="inline-flex items-center justify-center w-[50px] h-4 ms-2 text-xs font-bold text-violet-800 bg-violet-200 rounded-sm">
            Sandbox
          </span>
        </button>
      );
    } else if (item.short_code_status === 2) {
      return (
        <button
          type="button"
          className="inline-flex items-center px-5 py-2.5 text-sm  font-semibold text-center text-green-500 bg-green-100 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-100 dark:hover:bg-green-100"
        >
          <ImMobile className="text-green-600" />
          <span className="font-semibold">{item.short_code}</span>
          <span className="inline-flex items-center justify-center w-[60px] h-4 ms-2 text-xs font-bold text-green-800 bg-green-200 rounded-sm">
            Live
          </span>
        </button>
      );
    } else if (item.short_code_status === 3 || expired === true) {
      return (
        <button
          type="button"
          className="inline-flex items-center px-5 py-2.5 text-sm  font-semibold text-center text-rose-500 bg-rose-100 rounded-lg focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-100 dark:hover:bg-rose-100"
        >
          <ImMobile className="text-rose-600" />
          <span className="font-semibold">{item.short_code}</span>
          <span className="inline-flex items-center justify-center w-[60px] h-4 ms-2 text-xs font-bold text-rose-800 bg-rose-200 rounded-sm">
            Expired
          </span>
        </button>
      );
    }
  };

  const getUssdStatus = (item) => {
    if (item.status === 1) {
      return (
        <LiveButton children={"Pending"} status={item.status} />
      );
    } else if (item.status === 2 && item.short_code_status === 2) {
      return <LiveButton children={"Live"} status={item.status} />;
    
    } else if (item.status === 2 && item.short_code_status === 1) {
      return <LiveButton children={"Approved"} status={item.status} />;
    } else if (item.status === 3) {
      return <LiveButton children={"Rejected"} status={item.status} />;
    }
    else if(item.status === 4){
      return <LiveButton children={"Active"} status={item.status} />;
    }
    else if(item.status===5){
      return <LiveButton children={"Inactive"} status={item.status} />;
    }
  };



  useEffect(() => {
    if (ApiData) {
      const tempData = ApiData.map((item) => ({
        title: item.survey_name,
        id: getId(item.id),
        created_at: moment(item.created_at).format("DD MMM YYYY, HH:mm"),
        status: getStatus(item.status),
        short_code: getShortCode(item),
        ussd_status: getUssdStatus(item),
        userName: item.userName || "N/A",
        actions: ActionBtns(item),
      }));
      setData(tempData);
    }
  }, [ApiData, openActionMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest("#menuOptions") &&
        !event.target.closest(".action-btn")
      ) {
        setOpenActionMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const columns = React.useMemo(() => {
    const baseColumns = [
      {
        Header: "Survey Name",
        accessor: "title",
      },
      {
        Header: user.type === Config.UserType.SuperAdminUser ? "User" : "",
        accessor:
          user.type === Config.UserType.SuperAdminUser
            ? "userName"
            : "undefined",
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Approval",
        accessor: "status",
      },
      {
        Header: "Short Code",
        accessor: "short_code",
      },
      {
        Header: "Survey Status",
        accessor: "ussd_status",
      },
      {
        Header: "Created",
        accessor: "created_at",
      },
      {
        Header: "Action",
        accessor: "actions",
      },
    ];

    // const includeTimeLeftColumn = data.some((item) => item.short_code_status !== 1);

    // if (includeTimeLeftColumn) {
    //   baseColumns.splice(5, 0, {
    //     Header: "Time Left",
    //     accessor: "time_left",
    //   });
    // }

    return baseColumns;
  }, [data, user.type]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex },
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      data,
      columns,
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setPageSize(PaginationLimit);
  }, [setPageSize]);

  return (
    <>
      <CustomTable {...getTableProps()} className="w-full">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <MdArrowBack className="inline-block ml-1" />
                      ) : (
                        <MdArrowForward className="inline-block ml-1" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </CustomTable>
      {ApiData.length != false && (
        <PaginationWrapper>
          <div className="px-2">
            Page{" "}
            <em>
              {pageIndex + 1} of {pageOptions.length}
            </em>
          </div>
          <div className="flex gap-1">
            <PrevBtn onClick={() => previousPage()} disabled={!canPreviousPage}>
              <MdArrowBack className="w-4 h-4" />
            </PrevBtn>
            <NextBtn onClick={() => nextPage()} disabled={!canNextPage}>
              <MdArrowForward className="w-4 h-4" />
            </NextBtn>
          </div>
        </PaginationWrapper>
      )}
    </>
  );
};
const ActionBtnWrapper = tw.div`flex items-center gap-3 relative`;
const MenuOptions = tw.div`absolute bottom-10 right-0 py-4 w-max bg-white z-50 rounded-lg shadow-lg border border-gray-200 flex flex-col`;
const MenuItem = tw.div`flex items-center gap-2 px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-100`;
const CustomTable = tw.table`w-full`;
const Thead = tw.thead`rounded-md`;
const Btn = tw.button`action-btn grid place-items-center border border-gray-300 w-8 h-8 rounded-full transform transition duration-200 hover:scale-110 hover:shadow-md`;

const Tbody = tw.tbody`border-b`;
const Tr = tw.tr`border-b rounded-md overflow-hidden hover:bg-slate-100`;

const Th = tw.th`text-md p-4 font-semibold text-gray-700 text-left`;
const Td = tw.td`p-3 text-md`;

export const Seperator = tw.div`w-full h-0.5 bg-gray-200 my-2`;

export default Table;
