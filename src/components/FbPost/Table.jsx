import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { PaginationLimit } from "../../Config";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import useMedia from "use-media";
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
    const isMobile = useMedia({ maxWidth: "768px" });
    const [data, setData] = useState([]);
    const [openActionMenu, setOpenActionMenu] = useState(null);

    useEffect(() => {
        if (ApiData) {
            const tempData = ApiData.map((item) => ({
                id: item.id,
                imageUrl: item.imageUrl || "", // URL of the post image
                text: item.text || "", // Text content of the post
                likes: item.likes || 0,
                comments: item.comments || 0,
                shares: item.shares || 0,
                clicks: item.clicks || 0,
                reach: item.reach || 0,
                createdAt: moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a"), // Creation date of the post
                sharedVia: item.sharedVia || "Buffer", // Platform shared via
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
                Header: "Post",
                accessor: "text",
                Cell: ({ row }) => (
                    <div>
                        <div className="flex items-center">
                            <img src={row.original.imageUrl} alt="Post" className="w-12 h-12 rounded-full mr-3" />
                            <div>
                                <div className="font-semibold">{row.original.text}</div>
                                <div className="text-sm text-gray-500">Shared via {row.original.sharedVia} on {row.original.createdAt}</div>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                Header: "Likes",
                accessor: "likes",
            },
            {
                Header: "Comments",
                accessor: "comments",
            },
            {
                Header: "Shares",
                accessor: "shares",
            },
            {
                Header: "Clicks",
                accessor: "clicks",
            },
            {
                Header: "Reach",
                accessor: "reach",
            },
        ],
        [user.type]
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

const CustomTable = tw.table`w-full`;
const Thead = tw.thead`rounded-md`;

const Tbody = tw.tbody`border-b`;
const Tr = tw.tr`border-b rounded-md overflow-hidden hover:bg-slate-100`;

const Th = tw.th`text-md p-4 font-semibold text-gray-700 text-left`;
const Td = tw.td`p-3 text-md`;

export const Seperator = tw.div`w-full h-0.5 bg-gray-200 my-2`;

export default Table;
