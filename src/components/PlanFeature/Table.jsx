import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useTable, useExpanded, usePagination, useSortBy } from "react-table";
import useMedia from "use-media";
import {
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdArrowBack,
    MdArrowForward,
    MdDelete,
    MdEdit,
} from "react-icons/md";
import { IoMdEye, IoMdMore } from "react-icons/io";
import { PaginationLimit } from "../../Config";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";
import tw from "tailwind-styled-components";
import { Tooltip } from "react-tooltip";
import { FiPlusCircle } from "react-icons/fi";
import { CiCircleMinus } from "react-icons/ci";


const AdminTable = ({
    setSelectedData,
    setAddModel,
    setDeleteModel,
    setDeleteCategoryModel,
    setEditCategoryModel,
    setEditFeatureModel,
    ApiData
}) => {

    const isMobile = useMedia({ maxWidth: "768px" });
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const [openFeatureActionMenu, setOpenFeatureActionMenu] = useState(null);




    const AddThisDevice = (category) => {
        setAddModel(true);
        setSelectedData(category);
        setOpenActionMenu(null);
    };

    const EditThisDevice = (category) => {
        setEditCategoryModel(true);
        setSelectedData(category);
        setOpenActionMenu(null);
    };

    const EditFeatureThisDevice = (feature) => {
        setEditFeatureModel(true);
        setSelectedData(feature);
        setOpenFeatureActionMenu(null);
    };

    const DeleteThisDevice = (feature) => {
        setDeleteModel(true);
        setSelectedData(feature);
        setOpenFeatureActionMenu(null);
    };

    const DeleteCategoryThisDevice = (category) => {
        setDeleteCategoryModel(true);
        setSelectedData(category);
        setOpenActionMenu(null);
    };

    useEffect(() => {
        if (ApiData) {
            const tempData = ApiData.map((category) => {
                const subRows =
                    category.feature?.map((features) => {
                        const planAccessibility = {
                            Free: { symbol: "---", className: "" },
                            Bronze: { symbol: "---", className: "" },
                            Silver: { symbol: "---", className: "" },
                            Gold: { symbol: "---", className: "" },
                        };

                        features.plan.forEach((plans) => {
                            if (plans.is_accessiable === "1") {
                                planAccessibility[plans.planName] = {
                                    symbol: "✓",
                                    className: "text-white bg-green-500 rounded-full px-2 py-1",
                                };
                            } else if (plans.is_accessiable === "0") {
                                planAccessibility[plans.planName] = {
                                    symbol: "✗",
                                    className: "text-white bg-red-500 rounded-full px-2 py-1",
                                };
                            }
                        });

                        return {
                            name: features.name,
                            featureId: features.id,
                            tooltip: features.tool_tip,
                            free: planAccessibility["Free"],
                            bronze: planAccessibility["Bronze"],
                            silver: planAccessibility["Silver"],
                            gold: planAccessibility["Gold"],
                            action: FeatureActionBtns(features),
                        };
                    }) || [];

                return {
                    name: category.name,
                    status: category.status,
                    tooltip: "---",
                    free: { symbol: "---", className: "" },
                    bronze: { symbol: "---", className: "" },
                    silver: { symbol: "---", className: "" },
                    gold: { symbol: "---", className: "" },
                    action: ActionBtns(category),
                    subRows,
                };
            });

            setData(tempData);
        }
    }, [ApiData, openActionMenu, openFeatureActionMenu]);

    const ActionBtns = (category) => {
        const openMenu = (id) => {
            setOpenActionMenu((prevId) => (prevId === id ? null : id));
        };
        return (
            <ActionBtnWrapper onClick={(e) => e.stopPropagation()}>
                {openActionMenu === category.id && (
                    <MenuOptions id="menuOptions">
                        <MenuItem onClick={() => EditThisDevice(category)}>
                            <MdEdit className="text-gray-700 mr-2" /> Edit Category
                        </MenuItem>
                        <MenuItem onClick={() => AddThisDevice(category)}>
                            <FiPlusCircle className="text-gray-700 mr-2" /> Add Feature
                        </MenuItem>
                        <Seperator />
                        <MenuItem onClick={() => DeleteCategoryThisDevice(category)}>
                            <MdDelete className="text-red-700 mr-2" /> Delete Category
                        </MenuItem>
                    </MenuOptions>
                )}
                <Btn title="Actions" onClick={() => openMenu(category.id)}>
                    <IoMdMore className="text-gray-600" size={24} />
                </Btn>
            </ActionBtnWrapper>
        );
    };
    const FeatureActionBtns = (features) => {
        const openFeatureMenu = (id) => {
            setOpenFeatureActionMenu((prevId) => (prevId === id ? null : id));
        };

        return (
            <ActionBtnWrapper onClick={(e) => e.stopPropagation()}>
                {openFeatureActionMenu === features.id && (
                    <MenuOptions id="menuOptions">
                        <MenuItem onClick={() => EditFeatureThisDevice(features)}>
                            <MdEdit className="text-gray-700 mr-2" /> Edit Feature
                        </MenuItem>
                        <Seperator />
                        <MenuItem onClick={() => DeleteThisDevice(features)}>
                            <MdDelete className="text-red-700 mr-2" /> Delete Feature
                        </MenuItem>
                    </MenuOptions>
                )}
                <Btn title="Actions" onClick={() => openFeatureMenu(features.id)}>
                    <IoMdMore className="text-gray-600" size={24} />
                </Btn>
            </ActionBtnWrapper>
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !event.target.closest("#menuOptions") &&
                !event.target.closest(".action-btn")
            ) {
                setOpenActionMenu(null);
                setOpenFeatureActionMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const columns = useMemo(
        () => [
            {
                id: "expander",
                Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                    <span {...getToggleAllRowsExpandedProps()}>
                        {isAllRowsExpanded ? (
                            <MdKeyboardArrowUp className="w-6 h-6 bg-gray-100 border border-orange-400 text-orange-400 rounded-full" />
                        ) : (
                            <MdKeyboardArrowDown className="w-6 h-6 bg-gray-100 border border-orange-400 text-orange-400 rounded-full" />
                        )}
                    </span>
                ),
                Cell: ({ row }) =>
                    row.canExpand && row.depth === 0 ? (
                        <span
                            {...row.getToggleRowExpandedProps({
                                style: {
                                    paddingLeft: `${row.depth * 2}rem`,
                                },
                            })}
                        >
                            {row.isExpanded ? (
                                <MdKeyboardArrowUp className="w-6 h-6 bg-gray-100 border border-orange-400 text-orange-400 rounded-full" />
                            ) : (
                                <MdKeyboardArrowDown className="w-6 h-6 bg-gray-100 border border-orange-400 text-orange-400 rounded-full" />
                            )}
                        </span>
                    ) : (
                        <span>{row.depth === 0 ? <CiCircleMinus className="w-6 h-6  text-orange-400 " /> : null}</span>
                    ),
            },

            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ row }) => {
                    const status = row.original.status === 1 ? "Active" : "Inactive";
                    const isSubRow = row.depth > 0;
                    const statusClass =
                        status === "Active"
                            ? "bg-green-100 text-green-700 text-xs w-24 h-7 flex items-center justify-center rounded-lg"
                            : "bg-rose-100 text-rose-700 text-xs w-24 h-7 flex items-center justify-center rounded-lg";
                    return !isSubRow ? (
                        <span className={`px-2 py-1 rounded ${statusClass}`}>{status}</span>
                    ) : (
                        <span>---</span>
                    );
                },
            },

            {
                Header: "Tooltip",
                accessor: "tooltip",
                Cell: ({ value, row }) => {
                    const isSubRow = row.depth > 0;
                    return isSubRow ? (
                        <div
                            className="w-40 truncate"
                            data-tooltip-id={`tooltip-${value}`}
                            data-tooltip-content={value}
                            data-tooltip-delay-show={1000}
                        >
                            {value}
                            <Tooltip id={`tooltip-${value}`} />
                        </div>
                    ) : (
                        <span>---</span>
                    );
                },
            },
            {
                Header: "Free",
                accessor: "free",
                Cell: ({ value }) => (
                    <span className={value.className}>{value.symbol}</span>
                ),
            },
            {
                Header: "Bronze",
                accessor: "bronze",
                Cell: ({ value }) => (
                    <span className={value.className}>{value.symbol}</span>
                ),
            },
            {
                Header: "Silver",
                accessor: "silver",
                Cell: ({ value }) => (
                    <span className={value.className}>{value.symbol}</span>
                ),
            },
            {
                Header: "Gold",
                accessor: "gold",
                Cell: ({ value }) => (
                    <span className={value.className}>{value.symbol}</span>
                ),
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
        state: { pageIndex, pageSize, expanded },
        gotoPage,
        pageCount,
        previousPage,
        nextPage,
        setPageSize,
        canPreviousPage,
        canNextPage,
        toggleRowExpanded,
        isRowsExpanded
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: currentPage, pageSize: PaginationLimit },
            autoResetExpanded: false,
        },
        useSortBy,
        useExpanded,
        usePagination
    );
    useEffect(() => {
        toggleRowExpanded(true);
    }, [isRowsExpanded]);

    useEffect(() => {
        setCurrentPage(pageIndex);
    }, [pageIndex]);

    return (
        <>
            <CustomTable {...getTableProps()} className="min-w-full bg-white">
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className="px-4 py-2 border-b"
                                >
                                    {column.render("Header")}
                                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <React.Fragment key={row.id}>
                                <Tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <Td {...cell.getCellProps()} className="px-4 py-2 border-b">
                                            {cell.render("Cell")}
                                        </Td>
                                    ))}
                                </Tr>
                            </React.Fragment>
                        );
                    })}
                </Tbody>
            </CustomTable>
            {data.length > 0 && (
                <PaginationWrapper>
                    <div className="px-2">
                        Page{" "}
                        <em>
                            {pageIndex + 1} of {pageOptions.length}
                        </em>
                    </div>
                    <div className="flex gap-1">
                        <Btn onClick={() => previousPage()} disabled={!canPreviousPage}>
                            <MdArrowBack className="w-4 h-4" />
                        </Btn>
                        <Btn onClick={() => nextPage()} disabled={!canNextPage}>
                            <MdArrowForward className="w-4 h-4" />
                        </Btn>
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
const Tbody = tw.tbody`border-b`;
const Tr = tw.tr`border-b rounded-md overflow-hidden hover:bg-slate-100`;
const Th = tw.th`text-md p-4 font-semibold text-gray-700 text-left`;
const Td = tw.td`p-3 text-md`;
const MenuOptions = tw.div`absolute bottom-10 right-0 py-4 w-max bg-white z-50 rounded-lg shadow-lg border border-gray-200 flex flex-col`;
const MenuItem = tw.div`flex items-center gap-2 px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-100`;
export const Seperator = tw.div`w-full h-0.5 bg-gray-200 my-2`;
export default AdminTable;
