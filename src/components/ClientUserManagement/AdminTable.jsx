import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";
import tw from "tailwind-styled-components";
import { PaginationLimit } from "../../Config";
import {
  MdArrowBack,
  MdArrowForward,
  MdDriveFileRenameOutline,
} from "react-icons/md";
import { IoMdEye, IoMdMore } from "react-icons/io";
import useMedia from "use-media";
import moment from "moment";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { VscActivateBreakpoints } from "react-icons/vsc";

const AdminTable = ({ ApiData, setSelectedData, setOpenViewModel, setUpdateStatusModel }) => {
  const isMobile = useMedia({ maxWidth: "768px" });
  const [data, setData] = useState([]);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [previousId, setPreviousId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);



  const handleStatusChange = (item)=>{
    setUpdateStatusModel(true)
    setSelectedData(item)
    setOpenActionMenu(null)
  }

  const viewUserDetails = (item)=>{
    setOpenViewModel(true)
    setSelectedData(item)
    setOpenActionMenu(null)
  }

  const ActionBtns = (item) => {
    const openMenu = (id) => {
      console.log("Button clicked, ID:", id);
      setPreviousId(openActionMenu);
      setOpenActionMenu((prevId) => {
        console.log("Previous open menu ID:", prevId);
        return prevId === id ? null : id;
      });
    };

    return (
      <ActionBtnWrapper>
        {openActionMenu === item.id && (
          <MenuOptions id="menuOptions">
            <MenuItem onClick={() => handleStatusChange(item)}>
              <VscActivateBreakpoints className="mr-2 text-gray-700" /> Change Status
            </MenuItem>
            <MenuItem onClick={() => viewUserDetails(item)}>
              <IoMdEye className="mr-2 text-gray-700" /> View Details
            </MenuItem>
          
          </MenuOptions>
        )}
        <Btn title="Actions" type="button" onClick={() => openMenu(item.id)}>
          <IoMdMore className="text-gray-600" size={24} />
        </Btn>
      </ActionBtnWrapper>
    );
  };

  const getName = (item) => {
    return <div className="text-capitalize">{item.name}</div>;
  };

  const getStatus = (item) => {
    if (item.status === 2) {
      return (
        <button
          type="button"
          class="flex items-center text-red-600 text-sm bg-red-50 px-3 py-1.5 tracking-wide rounded-md"
        >
          <FaTimesCircle className="text-md" />
          <span className="ml-2 font-semibold">Inactive</span>
        </button>
      );
    } else if (item.status === 1) {
      return (
        <button
          type="button"
          class="flex items-center text-green-600 text-sm bg-green-50 px-3 py-1.5 tracking-wide rounded-md"
        >
          <FaCheckCircle className="text-md" />
          <span className="ml-2 font-semibold">Active</span>
        </button>
      );
    }
  };

  useEffect(() => {
    if (ApiData) {
      const tempData = ApiData.map((item) => ({
        userName: getName(item),
        email: item.email,
        phoneNumber: item?.phoneNumber,
        creation_date: moment(item.created_at).format("DD-MM-YYYY hh:mm A"),
        status: getStatus(item),
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

  const columns = React.useMemo(
    () => [
      {
        Header: "User Name",
        accessor: "userName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Creation Date",
        accessor: "creation_date",
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
      initialState: { pageIndex: currentPage, pageSize: PaginationLimit },
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setCurrentPage(pageIndex); // Update current page on state change
  }, [pageIndex]);

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
const Btn = tw.button`action-btn grid place-items-center border border-gray-300 w-8 h-8 rounded-full transform transition duration-200 hover:scale-110 hover:shadow-md`;
const CustomTable = tw.table`w-full`;
const Thead = tw.thead`rounded-md`;
//const Thead = tw.thead`rounded-md border border-[#06163A]`;
const Tbody = tw.tbody`border-b`;
const Tr = tw.tr`border-b rounded-md overflow-hidden hover:bg-slate-100`;
//const Th = tw.th`text-md p-4 font-medium text-gray-200 text-left bg-[#06163A]`;
const Th = tw.th`text-md p-4 font-semibold text-gray-700 text-left`;
const Td = tw.td`p-3 text-md`;
const MobileBadge = tw.div`inline-block bg-purple-100 text-purple-800 border-purple-400 px-2 pt-1 pb-1.5 text-xs rounded-md`;
const EmailBadge = tw.div`inline-block bg-blue-100 text-blue-800 border-blue-400 px-2 pt-1 pb-1.5 text-xs rounded-md`;
const SuccessBadge = tw.div`bg-green-100 text-green-700 text-xs w-24 h-7 flex items-center justify-center rounded-lg`;
const PendingBadge = tw.div`bg-yellow-100 text-yellow-800 text-xs border-yellow-400 border w-24 h-7 flex items-center justify-center rounded-full`;
const MenuOptions = tw.div`absolute bottom-10 right-0 py-4 w-max bg-white z-50 rounded-lg shadow-lg border border-gray-200 flex flex-col`;
const MenuItem = tw.div`flex items-center gap-2 px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-100`;
export const Seperator = tw.div`w-full h-0.5 bg-gray-200 my-2`;

export default AdminTable;
