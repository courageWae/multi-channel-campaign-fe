import React, { useEffect, useState, useCallback } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";
import tw from "tailwind-styled-components";
import moment from "moment";
import { PaginationLimit } from "../../Config";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const VoiceTable = ({
    ApiData,
}) => {
    const [data, setData] = useState([]);
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const getStatus = useCallback((status) => {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {status || 'Completed'}
            </span>
        );
    }, []);

    const getName = useCallback((item) => {
        return (
            <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-900">
                    {item.campaignName || "N/A"}
                </div>
                <div className="text-xs text-gray-500">
                    {moment(item.createdAt).format("DD MMM YYYY, HH:mm")}
                </div>
                <div className="mt-1">
                    {getStatus(item.status)}
                </div>
            </div>
        );
    }, [getStatus]);

    const getRecipietent = useCallback((item) => {
        // Debug log to see what we're getting
        console.log('getRecipietent item:', item);
        
        // If recipientName is missing or looks like an ID, try to find the name
        let displayName = item.recipientName;
        
        // If recipientName is missing or looks like a number/ID, show a fallback
        if (!displayName || displayName === item.recipients || /^\d+$/.test(displayName)) {
            displayName = 'Contact Group Selected';
        }
        
        return (
            <div className="flex flex-col items-start">
                <div className="text-sm font-semibold text-gray-900">
                    {displayName}
                </div>
                <div className="text-xs text-gray-500">
                    Contact Group
                </div>
            </div>
        );
    }, []);

    useEffect(() => {
        if (ApiData) {
            console.log('VoiceTable ApiData:', ApiData); // Debug log
            const tempData = ApiData.map((item) => {
                console.log('Processing item:', item); // Debug log
                return {
                    name: getName(item),
                    id: item.id,
                    creationDate: moment(item.createdAt).format("DD MMM YYYY, HH:mm"),
                    recipients: getRecipietent(item),
                    status: item.status,
                    recipientName: item.recipientName, // Explicitly preserve recipientName
                    callerName: item.callerName, // Explicitly preserve callerName
                };
            });
            setData(tempData);
        }
    }, [ApiData, openActionMenu, getName, getRecipietent]);

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
                Header: "Campaign Details",
                accessor: "name",
            },
            {
                Header: "Recipients",
                accessor: "recipients",
            },
            {
                Header: "Caller ID",
                accessor: "callerName",
                Cell: ({ value }) => (
                    <div className="text-sm text-gray-600">
                        {value || 'N/A'}
                    </div>
                ),
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
            {ApiData.length !== 0 && (
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

export default VoiceTable;

