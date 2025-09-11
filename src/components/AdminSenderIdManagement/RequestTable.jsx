import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";
import Images from "../../Images";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { PaginationLimit } from "../../Config";
import { HiEye } from "react-icons/hi";
import { RiContactsFill } from "react-icons/ri";
import { FaFileExport } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";

const AdminTable = ({
    ApiData,
    setActiveItem,
    setOpenRejectConsentModel,
    setOpenConsentModel,
    setConsentText,
}) => {
    const [data, setData] = useState([
        {
            deviceName: "",
            extractionTime: "",
            processingTime: "",
            drops: "",
            action: "",
        },
    ]);

    const takeConsent = (item) => {
        setOpenConsentModel(true);
        setActiveItem(item);
        setConsentText("Are you sure you want to approve this sender Id?");
    };
    const takeConsent2 = (item) => {
        setOpenRejectConsentModel(true);
        setActiveItem(item);
        setConsentText("Are you sure you want to reject this sender Id?");
    };

    const ActionBtns = (item) => {
        return (
            <ActionBtnWrapper>
                <ClickableBtn onClick={() => takeConsent(item)}>Approve</ClickableBtn>
                <ClickableBtn
                    onClick={() => takeConsent2(item)}
                    className="bg-rose-500 hover:bg-rose-600"
                >
                    Reject
                </ClickableBtn>
            </ActionBtnWrapper>
        );
    };

    useEffect(() => {
        if (ApiData) {
            const tempData = ApiData.map((item) => ({
                senderId: item.senderid,
                requestedDate: moment(item.updated_at).format("DD-MM-YYYY hh:mm A"),
                requestedBy: item.username,
                action: ActionBtns(item),
            }));

            setData(tempData);
        }
    }, [ApiData]);

    const columns = React.useMemo(
        () => [
            {
                Header: "Sender Id",
                accessor: "senderId",
            },

            {
                Header: "Requested Date",
                accessor: "requestedDate",
            },
            {
                Header: "Requested By",
                accessor: "requestedBy",
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
        },
        useSortBy,
        usePagination
    );

    useEffect(() => {
        setPageSize(PaginationLimit);
    }, []);

    return (
        <>
            <CustomTable {...getTableProps()}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (
                                            <img
                                                src={Images.Arrow}
                                                alt="down arrow"
                                                className={`${column.isSortedDesc ? "-rotate-90" : "rotate-90"
                                                    } w-1.5 inline-block ml-1.5`}
                                            />
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
                                {row.cells.map((cell) => {
                                    return (
                                        <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                                    );
                                })}
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
                        <img src={Images.Arrow} alt="arrow" className="w-2 opacity-75 " />
                    </PrevBtn>
                    <NextBtn onClick={() => nextPage()} disabled={!canNextPage}>
                        <img
                            src={Images.Arrow}
                            alt="arrow"
                            className="w-2 rotate-180 opacity-75"
                        />
                    </NextBtn>
                </div>
            </PaginationWrapper>
        </>
    );
};

const UserImageWrapper = tw.div` flex items-center space-x-2`;
const UserImage = tw.img`w-5 h-5 rounded-full overflow-hidden`;

const ActionBtnWrapper = tw.div`flex items-center space-x-3`;
const AddBtn = tw.button`grid place-items-center bg-blue-100 w-8 h-8 rounded-full transform transition duration-200 hover:scale-110 hover:shadow-md`;
const EditBtn = tw.button`grid place-items-center bg-yellow-100 w-8 h-8 rounded-full transform transition duration-200 hover:scale-110 hover:shadow-md`;
const Delete = tw.button`grid place-items-center bg-red-100 w-8 h-8 rounded-full transform transition duration-200 hover:scale-110 hover:shadow-md`;

const CustomTable = tw.table` w-full`;
const Thead = tw.thead`border-b`;
const Tbody = tw.tbody`border-b`;
const Tr = tw.tr`border-b rounded-md overflow-hidden `;
const Th = tw.th`text-left text-sm p-3 font-medium text-gray-500  `;
const Td = tw.td`p-3 text-sm`;
const BookingBtn = tw.button` px-8 py-1 shadow bg-green-100 text-green-700 rounded cursor-pointer`;
const Btn = tw.button`grid place-items-center border border-gray-300 w-8 h-8 rounded-full transform transition duration-200 hover:scale-110 hover:shadow-md`;

const Active = tw.p`w-16 h-7 text-green-700  bg-green-100 grid place-items-center rounded inline-block`;
const Inactive = tw.p`w-16 h-7 text-red-700  bg-red-100 grid place-items-center rounded inline-block`;

const SuccessBadge = tw.div`bg-green-100 text-green-700 text-xs border-green-300 border w-24 h-7 flex items-center justify-center rounded`;
const PendingBadge = tw.div`bg-yellow-100 text-yellow-700 text-xs border-yellow-300 border w-24 h-7 flex items-center justify-center rounded`;

const ClickableBtn = tw.button`bg-cyan-600 hover:bg-cyan-700 text-xs text-white rounded py-1.5 px-6`;

export default AdminTable;
