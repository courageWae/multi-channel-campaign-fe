import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { PaginationLimit } from "../../Config";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import Config from "Config";
import { useSelector } from "react-redux";

const Table = ({
  ApiData,
  setSelectedData,
  setDeleteModel,
  setViewModel,
  setOpenActionModel,
}) => {
  const user = useSelector((state) => state.UserReducer.user);
  const [data, setData] = useState([]);
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const deleteThisDevice = (id) => {
    setDeleteModel(true);
    setSelectedData(id);
  };
  const View = (item) => {
    setViewModel(true);
    setSelectedData(item);
  };

  const getStatus = (status, is_scheduled) => {
    if (status === 1 && is_scheduled === 1) {
      return <span>Scheduled</span>;
    } else if (status === 2) {
      return <span>Running</span>;
    } else if (status === 3) {
      return <span>Sent</span>;
    } else {
      return <span>Pending</span>;
    }
  };

  const getName = (item) => {
    const status = getStatus(item.status, item.is_scheduled);
    return (
      <>
        <div>
          <span className="text-sm font-medium text-gray-900 ">
            {item.name}
          </span>
          <div className="text-sm text-gray-500">
            #{item.id} • <span className="font-medium">{status}</span> on{" "}
            {item.is_scheduled === 1
              ? moment(item.schedule).format("MMMM Do YYYY, h:mm:ss a")
              : moment(item.updated_at).format("MMMM Do YYYY, h:mm:ss a")}
          </div>
          <div className="flex mt-1 space-x-2">
            {item.status === Config.CampaignStatus.Pending &&
              item.is_scheduled === Config.CampaignStatus.isSchedule &&
              user.type === Config.UserType.ClientUser && (
                <>
                  <Link
                    to={`/email/campaign/edit/${item.id}`}
                    className="text-gray-600 underline hover:text-blue-600"
                  >
                    Edit
                  </Link>
                  <span className="text-gray-400">•</span>
                </>
              )}
            <button
              className="text-gray-600 underline hover:text-blue-600"
              onClick={() => View(item)}
            >
              Preview
            </button>
            {(user.type === Config.UserType.ClientUser) && (
                <>
                  <span className="text-gray-400">•</span>
                  <button
                    className="text-gray-600 underline hover:text-blue-600"
                    onClick={() => deleteThisDevice(item.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            <span className="text-gray-400">•</span>
            <Link
              to={`/campaign/email/report/${item.id}`}
              className="text-gray-600 underline hover:text-blue-600"
            >
              Report
            </Link>
          </div>
        </div>
      </>
    );
  };

  const getDeliver = (item) => {
    return (
      <div className="items-center">
        <div className="text-sm font-semibold text-orange-500">
          {item.deliveredCount}
        </div>
        <div className="text-sm ">{item.deliveredPercentage} %</div>
      </div>
    );
  };

  const getRecipietent = (item) => {
    return (
      <div className="items-center">
        <div className="text-sm font-semibold">{item.recipentCount}</div>
        <div className="text-sm ">{item.recipentPercentage} %</div>
      </div>
    );
  };

  useEffect(() => {
    if (ApiData) {
      const tempData = ApiData.map((item) => ({
        name: getName(item),
        // name: item.name || "N/A",
        id: item.id,
        creationDate: moment(item.created_at).format("DD MMM YYYY, HH:mm"),
        updated_at: moment(item.updated_at).format("DD MMM YYYY, HH:mm"),
        recipients: getRecipietent(item),
        delivered: getDeliver(item),
        status: getStatus(item.status, item.is_scheduled),
        userName: item.userName || "N/A",
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

  const columns = React.useMemo(
    () => [
      {
        Header: "Campaigns",
        accessor: "name",
      },
      {
        Header: user.type === Config.UserType.SuperAdminUser ? "User" : "",
        accessor:
          user.type === Config.UserType.SuperAdminUser
            ? "userName"
            : "undefined",
      },
      {
        Header: "Recipients",
        accessor: "recipients",
      },
      {
        Header: "Delivered",
        accessor: "delivered",
      },
    ],
    [user.type]
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

const CustomTable = tw.table`w-full`;
const Thead = tw.thead`rounded-md`;

const Tbody = tw.tbody`border-b`;
const Tr = tw.tr`border-b rounded-md overflow-hidden hover:bg-slate-100`;

const Th = tw.th`text-md p-4 font-semibold text-gray-700 text-left`;
const Td = tw.td`p-3 text-md`;

export const Seperator = tw.div`w-full h-0.5 bg-gray-200 my-2`;

export default Table;
