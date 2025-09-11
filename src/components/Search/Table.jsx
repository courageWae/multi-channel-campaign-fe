

import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { PaginationLimit } from "../../Config";
import { RiContactsFill } from "react-icons/ri";
import { MdDelete, MdArrowBack, MdArrowForward, MdDriveFileRenameOutline, MdFileDownload } from "react-icons/md";
import { FaListUl, FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { IoMdMore, IoIosCreate, IoMdEye } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import useMedia from "use-media";
import { DateRange } from "@mui/icons-material";
import { RxCrossCircled } from "react-icons/rx";
import Config from "Config";

const Table = ({
    ApiData,
    setOpenViewModel,
    setSelectedItem,
    searchType,
    user,
}) => {
    const isMobile = useMedia({ maxWidth: "768px" });
    const [data, setData] = useState([]);
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const [previousId, setPreviousId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);


    const view = (item) => {
        setOpenViewModel(true);
        setSelectedItem(item);
        setOpenActionMenu(null);
    };
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
                        <MenuItem onClick={() => view(item)}>
                            <IoMdEye className="text-gray-700 mr-2" /> View Details
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
        if (user?.type == Config?.UserType?.ClientUser) {
            return <BlueBadge>Sent</BlueBadge>;
        } else {
            if (status == 1) {
                return <BlueBadge>Sent</BlueBadge>;
            } else if (status == 3) {
                return <PendingBadge>Not Delivered</PendingBadge>;
            } else if (status == 4) {
                return <DeclinedBadge>Failed</DeclinedBadge>;
            } else if (status == 5) {
                return <DeclinedBadge>Expired</DeclinedBadge>;
            } else {
                //2
                return <SuccessBadge>Delivered</SuccessBadge>;
            }
        }
    };


    useEffect(() => {
        if (ApiData) {
            const tempData = ApiData.map((item) => ({
                msisdn: item.contact,
                userName: item.userName,
                sentAt: moment(item.created_at).format("DD-MM-YYYY hh:mm A"),
                senderId: item.sender_id,
                status: getStatus(item.status),
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



    const columns = React.useMemo(
        () => [
            {
                Header: "Phone Number",
                accessor: "msisdn",
            },
            {
                Header: "User Name",
                accessor: "userName",
            },

            {
                Header: "Sent At",
                accessor: "sentAt",
            },
            {
                Header: "Sender Id",
                accessor: "senderId",
            },
            {
                Header: "Status",
                accessor: "status",
            },

            {
                Header: "Action",
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
const RejectedBadge = tw.div`bg-rose-100 text-rose-700 text-xs w-24 h-7 flex items-center justify-center rounded-lg`;
const PendingBadge = tw.div`bg-yellow-100 text-yellow-700 text-xs w-24 h-7 flex items-center justify-center rounded-lg`;
const MenuOptions = tw.div`absolute bottom-10 right-0 py-4 w-max bg-white z-50 rounded-lg shadow-lg border border-gray-200 flex flex-col`;
const MenuItem = tw.div`flex items-center gap-2 px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-100`;

const BlueBadge = tw.div`bg-blue-100 text-blue-700 text-xs border-blue-300 border w-24 h-7 flex items-center justify-center rounded`;

const CancelledBadge = tw.div`bg-gray-200 text-gray-700 text-xs border-gray-300 border w-24 h-7 flex items-center justify-center rounded`;
const DeclinedBadge = tw.div`bg-red-100 text-red-700 text-xs border-red-300 border w-24 h-7 flex items-center justify-center rounded`;

export const Seperator = tw.div`w-full h-0.5 bg-gray-200 my-2`;

export default Table;
