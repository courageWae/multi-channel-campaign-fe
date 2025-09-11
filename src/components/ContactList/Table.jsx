import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";

import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { PaginationLimit } from "../../Config";
import { MdDelete, MdBlock, MdEdit, MdArrowBack, MdArrowForward } from "react-icons/md";
import { IoMdMore, IoIosCreate } from "react-icons/io";
import useMedia from "use-media";
import { MdMoreVert, MdDriveFileRenameOutline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";

const AdminTable = ({
    setOpenDeleteModel,
    setDeviceId,
    setOpenBlockModel,
    setOpenDeletePermanentlyModel,
    setSelectedItem,
    setOpenEditModel,
    ApiData
}) => {
    const isMobile = useMedia({ maxWidth: "768px" });
    const [data, setData] = useState([]);
    const [openActionMenu, setOpenActionMenu] = useState({});
    const [previousId, setPreviousId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const deleteContact = (id) => {
        setDeviceId(id);
        setOpenDeleteModel(true);
        setOpenActionMenu(null);
    };
    const blockContact = (id) => {
        setDeviceId(id);
        setOpenBlockModel(true);
        setOpenActionMenu(null);
    };
    const deletePermanentContact = (id) => {
        setDeviceId(id);
        setOpenDeletePermanentlyModel(true);
        setOpenActionMenu(null);
    };

    const getRandomColor = () => {
        const colors = [
            "bg-gray-200 text-gray-600 ",

        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };


    // const ActionBtns = (item) => {
    //     const openMenu = (id) => {
    //         setOpenActionMenu((prevId) => (prevId === id ? null : id));

    //     };

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
            <ActionBtnWrapper >
                {openActionMenu === item.id && (
                    <MenuOptions id="menuOptions">
                        <MenuItem
                            onClick={() => blockContact(item)}
                        >
                            <MdBlock className="text-gray-700 mr-2" /> {item.status == "1" ? "Block" : "Unblock"}
                        </MenuItem>
                        <MenuItem
                            onClick={() => deleteContact(item)}
                        >
                            <AiTwotoneDelete className="text-gray-700 mr-2" /> Delete from this group
                        </MenuItem>
                        <Seperator />
                        <MenuItem onClick={() => deletePermanentContact(item)}>
                            <MdDelete className="text-red-700 mr-2" /> Delete from everywhere
                        </MenuItem>
                    </MenuOptions>
                )}
                <Btn title="Actions" type="button" onClick={() => openMenu(item.id)}>
                    <IoMdMore className="text-gray-600" size={24} />
                </Btn>
            </ActionBtnWrapper>
        );
    };


    useEffect(() => {
        if (ApiData) {
            const initialState = ApiData.reduce((acc, item) => {
                acc[item.id] = false;
                return acc;
            }, {});
            setOpenActionMenu(initialState);
        }
    }, [ApiData]);
    useEffect(() => {
        if (ApiData) {
            const tempData = ApiData.map((item) => ({
                fullname: getName(item) || "N/A",
                // fullname: `${item.first_name} ${item.last_name}`,

                custName: item.username,
                // contact: getRecord(item) || "N/A",

                phone: getSMS(item) || "N/A",
                whatsapp: item.whatsapp || "N/A",
                email: item.email || "N/A",
                date: moment(item.created_at).format("DD-MM-YYYY hh:mm A"),
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

    const getSMS = (item) => {
        return (
            <span className="bg-green-200 text-black-700 px-4 py-1 rounded-sm inline-flex items-center gap-2">
                {item.phone != null ? `#${item.phone}` : "N/A"}
            </span>
        );
    };

    const getEmail = (item) => {
        return (
            <span className="bg-sky-400/40 text-sky-700 px-4 py-1 rounded-sm inline-flex items-center gap-2">
                @{item.email}
            </span>
        );
    };

    const getName = (item) => {
        const initial = item.first_name && item.first_name[0];
        const randomColor = getRandomColor();
        return (
            <div className="flex items-center gap-2 capitalize">
                {item.first_name && (
                    <div className={`px-3 py-1.5 inline-block rounded-full ${randomColor}`}>
                        {initial}
                    </div>)}
                <div className="flex flex-col">
                    <span>{item.first_name || 'N/A'} {item.last_name ? item.last_name : ''}</span>
                    {/* <span>{item.first_name} {item.last_name}</span> */}
                    <span className="text-red-400 text-xs">{item.status == "1" ? "" : "#blocked"}</span>
                </div>
            </div>);
    };

    const columns = React.useMemo(
        () => [

            {
                Header: "Name",
                accessor: "fullname",

            },

            {
                Header: "SMS",
                accessor: "phone",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            // {
            //     Header: "Whatsapp",
            //     accessor: "whatsapp",
            // },
            {
                Header: "Uploaded Date",
                accessor: "date",
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
            <CustomTable {...getTableProps()} className={`${isMobile ? 'block' : 'table'} w-full`}>
                <Thead className={`${isMobile ? 'hidden' : 'table-header-group'}`}>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} className={`${isMobile ? 'block mb-4' : 'table-row'}`}>
                            {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps(column.getSortByToggleProps())} className={`${isMobile ? 'block text-right px-4' : 'table-cell'}`}>
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
                <Tbody {...getTableBodyProps()} className={`${isMobile ? 'block' : 'table-row-group'}`}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} className={`${isMobile ? 'block mb-4' : 'table-row'}`}>
                                {row.cells.map((cell) => (
                                    <Td {...cell.getCellProps()} className={`${isMobile ? 'block text-right px-4 py-2 before:content-[attr(data-header)] before:block before:text-left before:font-bold' : 'table-cell'}`} data-header={cell.column.Header}>
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
//const Thead = tw.thead`border-b`;
const Thead = tw.thead`rounded-md`;

const Tbody = tw.tbody`border-b`;
const Tr = tw.tr`border-b rounded-md overflow-hidden hover:bg-slate-100`;
//const Th = tw.th`text-md p-3 font-medium text-gray-200 text-left bg-[#06163A]`;
const Th = tw.th`text-md p-4 font-semibold text-gray-700 text-left`;

const Td = tw.td`p-3 text-md`;

const MenuOptions = tw.div`absolute bottom-10 right-0 py-4 w-max bg-white z-500 rounded-lg shadow-lg border border-gray-200 flex flex-col`;

const MenuItem = tw.div`flex items-center gap-2 px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-100`;
export const Seperator = tw.div`w-full h-0.5 bg-gray-200 my-2`;
export default AdminTable;
