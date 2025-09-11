


import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import useMedia from 'use-media';
import tw from "tailwind-styled-components";
import { HiEye } from "react-icons/hi";
import { FaFileExport } from "react-icons/fa";
import { MdDelete, MdEdit, MdArrowBack, MdArrowForward } from "react-icons/md";
import { PrevBtn, NextBtn, PaginationWrapper } from "components/Styles/PageStyles";

const AdminTable = ({ setOpenViewModel, setSelectedItem, setOpenDeleteModel }) => {
    const isMobile = useMedia({ maxWidth: '768px' });

    const view = (item) => {
        setOpenViewModel(true);
        setSelectedItem(item);
    };

    const deleteRow = (item) => {
        setOpenDeleteModel(true);
        setSelectedItem(item);
    };

    const data = React.useMemo(() => [
        {
            name: "Device 1",
            date: "15-06-2024 10:30 AM",
            dateRange: "01/01/2024 - 31/12/2024",
            type: "SMS",
            status: "Generated",
            action: "View",
        },
        {
            name: "Device 1",
            date: "15-06-2024 10:30 AM",
            dateRange: "01/01/2024 - 31/12/2024",
            type: "Email",
            status: "Generated",
            action: "View",
        },
        {
            name: "Device 1",
            date: "15-06-2024 10:30 AM",
            dateRange: "01/01/2024 - 31/12/2024",
            type: "SMS",
            status: "Cancelled",
            action: "View",
        },
        {
            name: "Device 1",
            date: "15-06-2024 10:30 AM",
            dateRange: "01/01/2024 - 31/12/2024",
            type: "SMS",
            status: "Generated",
            action: "View",
        },
        {
            name: "Device 1",
            date: "15-06-2024 10:30 AM",
            dateRange: "01/01/2024 - 31/12/2024",
            type: "Voice",
            status: "Pending",
            action: "View",
        },
        {
            name: "Device 1",
            date: "15-06-2024 10:30 AM",
            dateRange: "01/01/2024 - 31/12/2024",
            type: "SMS",
            status: "Generated",
            action: "View",
        },
        {
            name: "Device 1",
            date: "15-06-2024 10:30 AM",
            dateRange: "01/01/2024 - 31/12/2024",
            type: "Email",
            status: "Generated",
            action: "View",
        },
        {
            name: "Device 1",
            date: "15-06-2024 10:30 AM",
            dateRange: "01/01/2024 - 31/12/2024",
            type: "SMS",
            status: "Cancelled",
            action: "View",
        },
        {
            name: "Device 1",
            date: "15-06-2024 10:30 AM",
            dateRange: "01/01/2024 - 31/12/2024",
            type: "SMS",
            status: "Generated",
            action: "View",
        },
        {
            name: "Device 1",
            date: "15-06-2024 10:30 AM",
            dateRange: "01/01/2024 - 31/12/2024",
            type: "Voice",
            status: "Pending",
            action: "View",
        },
    ], []);

    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Creation Date",
                accessor: "date",
            },
            {
                Header: "Date Range",
                accessor: "dateRange",
            },
            {
                Header: "Type",
                accessor: "type",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ value }) => (
                    <Td className="text-center">
                        <span className={getStatusBadgeClass(value)}>{value}</span>
                    </Td>
                ),
            },
            {
                Header: "Action",
                accessor: "action",
                Cell: ({ row }) => (
                    <ActionBtnWrapper>
                        <Btn onClick={() => view(row.original)}>
                            <HiEye className="text-gray-700" />
                        </Btn>
                        <Btn onClick={() => deleteRow(row.original)}>
                            <MdDelete className="text-gray-700" />
                        </Btn>
                    </ActionBtnWrapper>
                ),
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
            initialState: { pageSize: 10 },
        },
        useSortBy,
        usePagination
    );

    React.useEffect(() => {
        setPageSize(10);
    }, [setPageSize]);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Generated":
                return " bg-green-500 border-green-500 text-white px-2 pt-1 pb-1.5 text-xs rounded-md";
            case "Pending":
                return "badge bg-yellow-500 border-yellow-500 text-white px-2 pt-1 text-xs pb-1.5 rounded-md";
            case "Cancelled":
                return "badge bg-red-500 border-red-500 text-white px-2 pt-1 pb-1.5 text-xs rounded-md";
            default:
                return "badge bg-gray-500 border-gray-500 text-white px-2 pt-1 pb-1.5 text-xs rounded-md";
        }
    };

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

const ActionBtnWrapper = tw.div`flex items-center space-x-3`;
const Btn = tw.button`grid place-items-center border border-gray-300 w-8 h-8 rounded-full transform transition duration-200 hover:scale-110 hover:shadow-md`;
const CustomTable = tw.table`w-full`;
const Thead = tw.thead`border-b`;
const Tbody = tw.tbody`border-b`;
const Tr = tw.tr`border-b rounded-md overflow-hidden`;
const Th = tw.th`text-left text-sm p-3 font-medium text-gray-500`;
const Td = tw.td`p-3 text-sm`;

export default AdminTable;
