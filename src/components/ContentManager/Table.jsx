import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";
import tw from "tailwind-styled-components";
import { PaginationLimit } from "../../Config";
import { MdArrowBack, MdArrowForward, MdSms, MdEmail } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import useMedia from "use-media";
import { Tooltip } from "react-tooltip";

const AdminTable = ({
    ApiData,
    setSelectedData,
    setContentModel,
    setViewModel,
}) => {
    const isMobile = useMedia({ maxWidth: "768px" });
    const [data, setData] = useState([]);
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const [previousId, setPreviousId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const Edit = (item, type) => {
        setContentModel(true);
        setSelectedData({ ...item, type });
        setOpenActionMenu(null);
    };
    const View = (item) => {
        setViewModel(true);
        setSelectedData(item);
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

                        {/* <MenuItem onClick={() => Preview(item.id)}>
                            <IoIosCreate className="text-gray-700 mr-2" /> Preview
                        </MenuItem> */}
                        <MenuItem onClick={() => Edit(item, '1')}>
                            <MdSms className="text-gray-700 mr-2" /> SMS
                        </MenuItem>
                        <MenuItem onClick={() => Edit(item, '2')}>
                            <MdEmail className="text-gray-700 mr-2" /> Email
                        </MenuItem>

                    </MenuOptions>
                )}
                <Btn title="Actions" type="button" onClick={() => openMenu(item.id)}>
                    <IoMdMore className="text-gray-600" size={24} />
                </Btn>
            </ActionBtnWrapper>
        );
    };

    const getDescription = (sms_content) => {
        return (
            <span data-tooltip-id={`tooltip-${sms_content}`} data-tooltip-content={sms_content} data-tooltip-delay-show={1000}>
                <Description>{sms_content}</Description>
                <Tooltip id={`tooltip-${sms_content}`} place="top" effect="solid" className="!w-72" />
            </span>
        );
    };
    const getEmail = (item) => {
        return (

            <EmailDescription onClick={() => View(item)} dangerouslySetInnerHTML={{ __html: item?.email_content }} />


        );
    };
    const getSubject = (subject) => {
        return (
            <span data-tooltip-id={`tooltip-${subject}`} data-tooltip-content={subject} data-tooltip-delay-show={1000}>
                <Description>{subject}</Description>
                <Tooltip id={`tooltip-${subject}`} place="top" effect="solid" className="!w-72" />
            </span>
        );
    };

    useEffect(() => {
        if (ApiData) {
            const tempData = ApiData.map((item) => ({
                day: item.day,
                subject: getSubject(item.subject),
                sms_content: getDescription(item.sms_content),
                email_content: getEmail(item),
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
                Header: "Day",
                accessor: "day",
            },
            {
                Header: "Subject",
                accessor: "subject",
            },
            {
                Header: "Email Content",
                accessor: "email_content",
            },
            {
                Header: "SMS Content",
                accessor: "sms_content",
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
        setCurrentPage(pageIndex);
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
const Tbody = tw.tbody`border-b`;
const Tr = tw.tr`border-b rounded-md overflow-hidden hover:bg-slate-100`;
const Th = tw.th`text-md p-4 font-semibold text-gray-700 text-left`;
const Td = tw.td`p-3 text-md`;
const Description = tw.span`truncate block w-40`;
const EmailDescription = tw.span`truncate block w-40 h-6 cursor-pointer`;
const MenuOptions = tw.div`absolute bottom-10 right-0 py-4 w-max bg-white z-50 rounded-lg shadow-lg border border-gray-200 flex flex-col`;
const MenuItem = tw.div`flex items-center gap-2 px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-100`;
export const Seperator = tw.div`w-full h-0.5 bg-gray-200 my-2`;

export default AdminTable;
