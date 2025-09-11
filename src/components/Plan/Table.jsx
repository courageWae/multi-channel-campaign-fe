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

const AdminTable = ({ ApiData, setSelectedData, setUpdateModel, setOpenViewModel }) => {
    const isMobile = useMedia({ maxWidth: "768px" });
    const [data, setData] = useState([]);
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const [previousId, setPreviousId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const UpdateThisDevice = (item) => {
        setUpdateModel(true);
        setSelectedData(item);
        setOpenActionMenu(null);
    };
    const OpenDetail = (item) => {
        setOpenViewModel(true);
        setSelectedData(item);
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
                        <MenuItem onClick={() => OpenDetail(item)}>
                            <IoMdEye className="text-gray-700 mr-2" /> View Details
                        </MenuItem>
                        <MenuItem onClick={() => UpdateThisDevice(item)}>
                            <MdDriveFileRenameOutline className="text-gray-700 mr-2" /> Edit Plan
                        </MenuItem>
                    </MenuOptions>
                )}
                <Btn title="Actions" type="button" onClick={() => openMenu(item.id)}>
                    <IoMdMore className="text-gray-600" size={24} />
                </Btn>
            </ActionBtnWrapper>
        );
    };

    const getPlan = (item) => {
        if (item.name === "Free") {
            return (
                <div className="items-center">
                    <div className="text-sm ">
                        --
                    </div></div>
            );
        } else {
            return (

                <div className="items-center">
                    <div className="text-sm ">
                        ₵ <span className="font-bold">{item.price}</span> /month
                    </div></div>
            );
        }

    };
    const getDiscount = (item) => {
        if (item.name === "Free") {
            return (<div className="items-center">
                <div className="text-sm font-semibold">
                    --
                </div></div>)
        }
        else {
            return (
                <div className="items-center">
                    <div className="text-sm font-semibold">
                        {item.discount} %
                    </div></div>
            );
        }
    };

    const getPlanName = (item) => {
        if (item.name === "Free") {
            return (
                <div className="bg-gray-300 border border-gray-400 text-black text-sm font-normal rounded-full text-center items-center max-w-fit px-4 py-0.5">
                    Free
                </div>
            );
        } else if (item.name === "Bronze") {
            return (
                <div className="bg-amber-300 border border-amber-400 text-black text-sm font-normal rounded-full text-center items-center max-w-fit px-4 py-0.5">
                    Bronze
                </div>
            );
        } else if (item.name === "Silver") {
            return (
                <div className="bg-slate-300 border border-slate-400 text-black text-sm font-normal rounded-full text-center items-center max-w-fit px-4 py-0.5">
                    Silver
                </div>
            );
        } else {
            return (
                <div className="bg-orange-300 border border-orange-400 text-black text-sm font-normal rounded-full text-center items-center max-w-fit px-4 py-0.5">
                    Gold
                </div>
            );
        }
    };

    useEffect(() => {
        if (ApiData) {
            const tempData = ApiData.map((item) => ({
                plan: getPlanName(item),
                discount: item.discount,
                description: item?.plan_short_description,
                price: getPlan(item),
                discount: getDiscount(item),
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
                Header: "Plan",
                accessor: "plan",
            },
            {
                Header: "Price",
                accessor: "price",
            },
            {
                Header: "Discount",
                accessor: "discount",
            },
            {
                Header: "Description",
                accessor: "description",
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

