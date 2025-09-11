

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
import { FaCircle } from "react-icons/fa";
import useMedia from "use-media";

const AdminTable = ({
  ApiData,
  setSelectedData,
  setRenameModel,
  setDeleteModel,
  setContactModel,
}) => {
  const isMobile = useMedia({ maxWidth: "768px" });
  const [data, setData] = useState([]);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [previousId, setPreviousId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const contactDevice = (id) => {
    setContactModel(true);
    setSelectedData(id);
    setOpenActionMenu(null);
  };

  const RenameThisDevice = (item) => {
    setRenameModel(true);
    setSelectedData(item);
    setOpenActionMenu(null);
  };

  const DeleteThisDevice = (id) => {
    setDeleteModel(true);
    setSelectedData(id);
    setOpenActionMenu(null);
  };

  const getRandomColor = () => {
    const colors = ["bg-gray-200 text-gray-600"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const getContact = (item) => {
    return (
      <div className="flex gap-4">
        <div className="flex flex-col">
          <span className="font-bold text-left">
            {item?.contacts_count || 0}
          </span>
          <span className="text-xs text-left font-light">Total</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-left">
            {item?.correct_count || 0}
          </span>
          <span className="text-xs text-left font-light">Valid</span>
        </div>
      </div>
    );
  };

  // const ActionBtns = (item) => {
  //   const openMenu = (id) => {
  //     setOpenActionMenu((prevId) => (prevId === id ? null : id));
  //   };
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
            <Link to={`/contact-list/${item.id}`}>
              <MenuItem>
                <FaListUl className="text-gray-700 mr-2" /> Contact List
              </MenuItem>
            </Link>
            <Link to={`/import-contact/${item.id}`}>
              <MenuItem>
                <RiContactsFill className="text-gray-700 mr-2" /> Import Contacts to the group
              </MenuItem>
            </Link>
            <MenuItem onClick={() => contactDevice(item.id)}>
              <IoIosCreate className="text-gray-700 mr-2" /> Create Contact
            </MenuItem>
            <MenuItem onClick={() => RenameThisDevice(item)}>
              <MdDriveFileRenameOutline className="text-gray-700 mr-2" /> Rename Group
            </MenuItem>
            <Seperator />
            <MenuItem onClick={() => DeleteThisDevice(item.id)}>
              <MdDelete className="text-red-700 mr-2" /> Delete Group
            </MenuItem>
          </MenuOptions>
        )}
        <Btn title="Actions" type="button" onClick={() => openMenu(item.id)}>
          <IoMdMore className="text-gray-600" size={24} />
        </Btn>
      </ActionBtnWrapper>
    );
  };



  const getStatus = (status) => {
    if (status === 1) {
      return (
        <PendingBadge>
          <FaCircle className="inline mr-1 w-2 h-3" />
          Processing
        </PendingBadge>
      );
    } else {
      return (
        <SuccessBadge>
          <FaCircle className="inline mr-1 w-2 h-3" />
          Completed
        </SuccessBadge>
      );
    }
  };

  const getType = (type) => {
    if (type === 1) {
      return <MobileBadge>Mobile</MobileBadge>;
    } else {
      return <EmailBadge>Email</EmailBadge>;
    }
  };

  useEffect(() => {
    if (ApiData) {
      const tempData = ApiData.map((item) => ({
        name: getName(item) || "N/A",
        creationDate: moment(item.created_at).format("DD-MM-YYYY hh:mm A"),
        count: `${item.contacts_count} Total / ${item.correct_count} Processed`,
        contact: item?.contacts_count || 0,
        status: getStatus(item.status),
        type: getType(item.type),
        action: ActionBtns(item),
        // action: <ActionBtns item={item} />,
        id: getId(item),
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
    const initial = item.name && item.name[0];
    const randomColor = getRandomColor();
    return (
      <div className="flex items-center gap-2 capitalize">
        <div className={`px-3 py-1.5 inline-block rounded-full ${randomColor}`}>
          {item.name ? initial : 'N/A'}
        </div>
        <div className="flex flex-col">
          <Link to={`/contact-list/${item.id}`}>
            <span className="capitalize underline">{item.name || 'N/A'}</span>
          </Link>
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
        Header: "Group Name",
        accessor: "name",
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Contacts",
        accessor: "contact",
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
