import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";
import tw from "tailwind-styled-components";
import moment from "moment";
import { PaginationLimit } from "../../Config";
import {
  MdDelete,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import {FaRegCheckCircle } from "react-icons/fa";
import useMedia from "use-media";
import { Tooltip } from "react-tooltip";
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { GoCheckCircle } from "react-icons/go";
const Table = ({
  ApiData,
  setSelectedData,
  setDeleteModel,
  setOpenEditModel,
  setOpenVerifyModel,
}) => {
  const isMobile = useMedia({ maxWidth: "768px" });
  const [data, setData] = useState([]);
  const [openActionMenu, setOpenActionMenu] = useState(null);

  // const DeleteThisDevice = (id) => {
  //   setDeleteModel(true);
  //   setSelectedData(id);
  //   setOpenActionMenu(null);
  // };

  // const EditEmailSenderId = (item) => {
  //   setOpenEditModel(true);
  //   setSelectedData(item);
  //   setOpenActionMenu(null);
  // };

  const VerifyEmail = (item) => {
    setOpenVerifyModel(true);
    setSelectedData(item);
    setOpenActionMenu(null);
  };


  const ActionBtns = (item) => {
    const openMenu = (id) => {
      setOpenActionMenu((prevId) => (prevId === id ? null : id));
    };

    return (
      <ActionBtnWrapper>
        {openActionMenu === item.id && (
          <MenuOptions id="menuOptions">
            {item.status === 1 && (
              <MenuItem onClick={() => VerifyEmail(item)}>
                <GoCheckCircle className="text-gray-700 mr-2" /> Verify Email
                Sender
              </MenuItem>
            )}
            {/* <MenuItem onClick={() => EditEmailSenderId(item)}>
              <CiEdit className="text-gray-700 mr-2" /> Edit Email Sender
            </MenuItem>
            <Seperator />
            <MenuItem onClick={() => DeleteThisDevice(item.id)}>
              <MdDelete className="text-red-700 mr-2" /> Delete Email Sender
            </MenuItem> */}
          </MenuOptions>
        )}
        <Btn title="Actions" type="button" onClick={() => openMenu(item.id)}>
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
          Not Verified
        </PendingBadge>
      );
    } else if (status === 2) {
      return (
        <SuccessBadge>
          <FaRegCheckCircle className="inline mr-1 w-4 h-4" />
          Verified
        </SuccessBadge>
      );
    } else {
      return (
        <RejectedBadge
          data-tooltip-id={`tooltip-rejected-${reason}`}
          data-tooltip-content={reason}
        >
          <RxCrossCircled className="inline mr-1 w-4 h-4" />
          Not Verified
          <Tooltip
            id={`tooltip-rejected-${reason}`}
            place="top"
            effect="solid"
          />
        </RejectedBadge>
      );
    }
  };
  function getInitials(fromName) {
    const senderParts = fromName.split(" ");
    const firstPart = senderParts[0];
    let secondPart;
    let initials;
    initials = firstPart.charAt(0).toUpperCase();
    if (senderParts.length > 1) {
      secondPart = senderParts[1];
      initials =
        firstPart.charAt(0).toUpperCase() + secondPart.charAt(0).toUpperCase();
    }
    return initials;
  }
  const getFromName = (name, status, email) => {
    return (
      <>
        <div className="flex items-center">
          <div className="mr-2 mb-3 h-10 w-10 flex-shrink-0 sm:mr-3">
            <div
              style={{ height: "40px", width: "40px" }}
              className={`rounded-full flex items-center justify-center ${
                status === 2
                  ? "bg-green-100"
                  : status === 3
                  ? "bg-red-100"
                  : "bg-yellow-100"
              }`}
            >
              <p
                className={`${
                  status === 2
                    ? "text-green-500"
                    : status === 3
                    ? "text-red-500"
                    : "text-yellow-500"
                } `}
              >
                {getInitials(name)}
              </p>
            </div>
          </div>
          <div className="font-bold text-gray-600 flex flex-col align-items-start">
            <div className="flex flex-col">
              <span className="text-sm">{name}</span>
              <span className="text-sm font-medium">{`<${email}>`}</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    if (ApiData) {
      const tempData = ApiData.map((item) => ({
        creationDate: moment(item.created_at).format("DD-MM-YYYY hh:mm A"),
        fromName: getFromName(item.name, item.status, item.email_id),
        status: getStatus(item.status, item.reason),
        id: getId(item),
        action: ActionBtns(item),
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
        Header: "Email Sender",
        accessor: "fromName",
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
        Header: "Creation Date",
        accessor: "creationDate",
      },
      {
        Header: "Actions",
        accessor: "action",
      },
    ],
    []
  );

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
                  className={`${
                    isMobile ? "block text-right px-4" : "table-cell"
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
                    className={`${
                      isMobile
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
    </>
  );
};

const ActionBtnWrapper = tw.div`flex items-center gap-3 relative`;
const Btn = tw.button`action-btn grid place-items-center border border-gray-300 w-8 h-8 rounded-full transform transition duration-200 hover:scale-110 hover:shadow-md`;
const CustomTable = tw.table`w-full`;
const Thead = tw.thead`rounded-md`;

const Tbody = tw.tbody`border-b`;
const Tr = tw.tr`border-b rounded-md overflow-hidden`;
const Th = tw.th`text-md p-4 font-semibold text-gray-700 text-left`;

const Td = tw.td`p-3 text-md`;
const SuccessBadge = tw.div`bg-green-100 text-green-700 text-xs w-24 h-7 flex items-center justify-center rounded-lg`;
const RejectedBadge = tw.div`bg-rose-100 text-rose-700 text-xs w-24 h-7 flex items-center justify-center rounded-lg`;
const PendingBadge = tw.div`bg-yellow-100 text-yellow-700 text-xs w-24 h-7 flex items-center justify-center rounded-lg`;
const MenuOptions = tw.div`absolute bottom-10 right-0 py-4 w-max bg-white z-50 rounded-lg shadow-lg border border-gray-200 flex flex-col`;
const MenuItem = tw.div`flex items-center gap-2 px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-100`;

export const Seperator = tw.div`w-full h-0.5 bg-gray-200 my-2`;

export default Table;
