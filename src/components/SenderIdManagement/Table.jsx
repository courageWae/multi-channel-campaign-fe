

import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { PaginationLimit } from "../../Config";
import { RiContactsFill } from "react-icons/ri";
import { MdDelete, MdArrowBack, MdArrowForward, MdDriveFileRenameOutline } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { IoMdMore, IoIosCreate } from "react-icons/io";
import { FaCircle, FaRegCheckCircle } from "react-icons/fa";
import useMedia from "use-media";
import { Tooltip } from "react-tooltip";
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCircle } from "react-icons/fa";
const Table = ({
  ApiData,
  setSelectedData,
  setViewReasonModel,

}) => {
  const isMobile = useMedia({ maxWidth: "768px" });
  const [data, setData] = useState([]);
  const [openActionMenu, setOpenActionMenu] = useState(null);

  // const ViewReason = (id) => {
  //   setSenderIdActionModel(true);
  //   setSelectedData({ id });
  //   setOpenActionMenu(null);
  // };


  const getRandomColor = () => {
    const colors = ["bg-gray-200 text-gray-600"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };


  const ActionBtns = (item) => {
    const openMenu = (id) => {
      setOpenActionMenu((prevId) => (prevId === id ? null : id));
    };

    return (
      <ActionBtnWrapper>
        {/* {openActionMenu === item.id && (
          <MenuOptions id="menuOptions">
            <MenuItem onClick={() => ViewReason(item.id)}>
              <IoIosCreate className="text-gray-700 mr-2" /> View Reason
            </MenuItem>
          </MenuOptions>
        )} */}
        {/* <Btn title="Actions" type="button" onClick={() => openMenu(item.id)}>
          <IoMdMore className="text-gray-600" size={24} />
        </Btn> */}
        <Btn title="Actions" type="button" >
          <IoMdMore className="text-gray-600" size={24} />
        </Btn>

      </ActionBtnWrapper>
    );
  };


  const getStatus = (status, reason) => {
    if (status === 1) {
      return (
        <PendingBadge>
          <FaRegCircle className="inline mr-1 w-4 h-4" />
          Pending
        </PendingBadge>
      );
    } else if (status === 2) {
      return (
        <SuccessBadge>
          <FaRegCheckCircle className="inline mr-1 w-4 h-4" />
          Approved
        </SuccessBadge>
      );
    }
    else {
      return (
        <RejectedBadge data-tooltip-id={`tooltip-rejected-${reason}`} data-tooltip-content={reason}  data-tooltip-delay-show={1000}>
          <RxCrossCircled className="inline mr-1 w-4 h-4" />
          Rejected
          <Tooltip id={`tooltip-rejected-${reason}`} place="top" effect="solid" />
        </RejectedBadge>
      )
    }
  };

  const getDescription = (description) => {
    if (description) {
      return (
        <span data-tooltip-id={`tooltip-${description}`} data-tooltip-content={description} data-tooltip-delay-show={1000}>
          <Description>{description}</Description>
          <Tooltip id={`tooltip-${description}`} place="top" effect="solid" />
        </span>
      );
    } else {
      return (
        <span>
          <Description>N/A</Description>
        </span>
      );
    }
  };



  useEffect(() => {
    if (ApiData) {
      const tempData = ApiData.map((item) => ({
        // senderId: getName(item),
        senderId: item.sender_id,
        description: getDescription(item.description),
        status: getStatus(item.status, item.reason),
        id: getId(item),
        action: ActionBtns(item),


      }));

      setData(tempData);
    }
  }, [ApiData, openActionMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#menuOptions") && !event.target.closest(".action-btn")) {
        setOpenActionMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getName = (item) => {
    const initial = item.sender_id && item.sender_id[0];
    const randomColor = getRandomColor();
    return (
      <div className="flex items-center gap-2 capitalize">
        <div className={`px-3 py-1.5 inline-block rounded-full ${randomColor}`}>
          {initial}
        </div>
        <div className="flex flex-col">
          {/* <Link to={`/contact-list/${item.id}`}> */}
          <span className="uppercase">{item.sender_id} </span>
          {/* </Link> */}
        </div>
      </div>
    );
  };

  const getId = (item) => {
    return (
      <span className="bg-green-200 text-black-700 px-4 py-1 rounded-sm inline-flex items-center gap-2">
        #{item.id}
      </span>
    );
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Sender Id",
        accessor: "senderId",
      },
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Description",
        accessor: "description",
      },

      // {
      //   Header: "Actions",
      //   accessor: "action",
      // },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
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
  }, []);

  return (
    <>
      <CustomTable
        {...getTableProps()}
        className={`${isMobile ? "block" : "table"} w-full`}
      >
        <Thead className={`${isMobile ? "hidden" : "table-header-group"}`}>
          {headerGroups.map((headerGroup) => (
            <Tr
              {...headerGroup.getHeaderGroupProps()}
              className={`${isMobile ? "block mb-4" : "table-row"}`}
            >
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`${isMobile ? "block text-right px-4" : "table-cell"
                    }`}
                >
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
        <Tbody
          {...getTableBodyProps()}
          className={`${isMobile ? "block" : "table-row-group"}`}
        >
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                className={`${isMobile ? "block mb-4" : "table-row"}`}
              >
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    className={`${isMobile
                      ? "block text-right px-4 py-2 before:content-[attr(data-header)] before:block before:text-left before:font-bold"
                      : "table-cell"
                      }`}
                    data-header={cell.column.Header}
                  >
                    {cell.render("Cell")}
                  </Td>
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
        </PaginationWrapper>)}
    </>
  );
};

const ActionBtnWrapper = tw.div`flex items-center gap-3 relative`;
const Btn = tw.button`action-btn grid place-items-center border border-gray-300 w-8 h-8 rounded-full transform transition duration-200 hover:scale-110 hover:shadow-md`;
const CustomTable = tw.table`w-full`;
//const Thead = tw.thead`rounded-md border border-[#06163A]`;
const Thead = tw.thead`rounded-md`;

const Tbody = tw.tbody`border-b`;
const Tr = tw.tr`border-b rounded-md overflow-hidden hover:bg-slate-100`;
//const Th = tw.th`text-md p-4 font-medium text-gray-200 text-left bg-[#06163A]`;
const Th = tw.th`text-md p-4 font-semibold text-gray-700 text-left`;

const Td = tw.td`p-3 text-md`;
const MobileBadge = tw.div`inline-block bg-purple-100 text-purple-800 border-purple-400 px-2 pt-1 pb-1.5 text-xs rounded-md`;
const EmailBadge = tw.div`inline-block bg-blue-100 text-blue-800 border-blue-400 px-2 pt-1 pb-1.5 text-xs rounded-md`;
const SuccessBadge = tw.div`bg-green-100 text-green-700 text-xs w-24 h-7 flex items-center justify-center rounded-lg`;
const RejectedBadge = tw.div`bg-rose-100 text-rose-700 text-xs w-24 h-7 flex items-center justify-center rounded-lg`;
const PendingBadge = tw.div`bg-yellow-100 text-yellow-700 text-xs w-24 h-7 flex items-center justify-center rounded-lg`;
const MenuOptions = tw.div`absolute bottom-10 right-0 py-4 w-max bg-white z-50 rounded-lg shadow-lg border border-gray-200 flex flex-col`;
const MenuItem = tw.div`flex items-center gap-2 px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-100`;
const Description = tw.span`truncate block w-40`;
// const RejectedBadge = tw.div`bg-rose-100 text-rose-800 text-xs border-rose-400 border w-24 h-7 flex items-center justify-center rounded-full`;
// const SuccessBadge = tw.div`bg-green-100 text-green-800 text-xs border-green-400 border w-24 h-7 flex items-center justify-center rounded-full`;
export const Seperator = tw.div`w-full h-0.5 bg-gray-200 my-2`;

export default Table;


