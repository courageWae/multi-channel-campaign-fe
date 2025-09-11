import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { PaginationLimit } from "../../Config";
import { RiContactsFill } from "react-icons/ri";
import { MdDelete, MdArrowBack, MdArrowForward, MdMoreVert, MdDriveFileRenameOutline } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import useMedia from "use-media";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IoIosCreate } from "react-icons/io";
const AdminTable = ({
    setOpenDeleteModel,
    setDeviceId,
    setEditDevice,
    setRenameModel,
    setDeleteModel,
    setCreateModel,
}) => {
    const isMobile = useMedia({ maxWidth: "768px" });
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    const createDevice = (id) => {
        setCreateModel(true);
        setDeviceId(id);
        handleCloseModal();
    };

    const RenameThisDevice = (item) => {
        setRenameModel(true);
        setDeviceId(item);
        handleCloseModal();
    };

    const DeleteThisDevice = (id) => {
        setDeleteModel(true);
        setDeviceId(id);
        handleCloseModal();
    };

    const getRandomColor = () => {
        const colors = [
            "bg-blue-200 text-blue-600 ",
            "bg-green-200 text-green-600",
            "bg-red-200 text-red-600",
            "bg-yellow-200 text-yellow-600",
            "bg-purple-200 text-purple-600",
            "bg-pink-200 text-pink-600",
            "bg-indigo-200 text-indigo-600",
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const getContact = (item) => {
        return (
            <div className="flex gap-4">
                <div className="flex flex-col ">
                    <span className="font-bold text-left">{item.contacts_count || 0}</span>
                    <span className="text-xs text-left font-light">Total</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-left">{item.correct_count || 0}</span>
                    <span className="text-xs text-left font-light">Valid</span>
                </div>
            </div>
        );
    };

    const ActionBtns = (item) => {
        return (
            <ActionBtnWrapper>
                <Btn title="More Actions" onClick={() => handleOpenModal(item)}>
                    <MdMoreVert className="text-blue-700" />
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
            return (
                <MobileBadge>
                    Mobile
                </MobileBadge>
            );
        } else {
            return (
                <EmailBadge>
                    Email
                </EmailBadge>
            );
        }
    };

    const getName = (item) => {
        const initial = item.name && item.name[0];
        const randomColor = getRandomColor();
        return (
            <div className="flex items-center gap-2 capitalize">
                <div className={`px-3 py-1.5 inline-block rounded-full ${randomColor}`}>
                    {initial}
                </div>
                <div className="flex flex-col">
                    <span>
                        {item.name}{" "}
                    </span>
                </div>
            </div>
        );
    };

    useEffect(() => {
        const hardcodedData = [
            {
                id: 1,
                name: "Group A",
                created_at: "2023-06-01T10:00:00Z",
                contacts_count: 50,
                correct_count: 45,
                status: 1,
                type: 1
            },
            {
                id: 2,
                name: "Group B",
                created_at: "2023-06-10T12:00:00Z",
                contacts_count: 100,
                correct_count: 95,
                status: 2,
                type: 2
            },
            {
                id: 3,
                name: "Group C",
                created_at: "2023-06-15T14:00:00Z",
                contacts_count: 150,
                correct_count: 140,
                status: 1,
                type: 1
            }
        ];

        const tempData = hardcodedData.map((item) => ({
            name: getName(item),
            creationDate: moment(item.created_at).format("DD-MM-YYYY hh:mm A"),
            count: `${item.contacts_count} Total / ${item.correct_count} Processed`,
            contact: getContact(item),
            status: getStatus(item.status),
            type: getType(item.type),
            action: ActionBtns(item),
        }));

        setData(tempData);
    }, []);

    const handleOpenModal = (item) => {
        setActiveItem(item);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setActiveItem(null);
        setModalOpen(false);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "Group Name",
                accessor: "name",
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

            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Box sx={modalStyle}>
                    {activeItem && (
                        <>
                            <Link to={`/import-contact/${activeItem.id}`}>
                                <Btn title="View Contact List">
                                    <RiContactsFill className="text-gray-700 mr-2" /> Import Contacts
                                </Btn>
                            </Link>

                            <Btn title="Create Contact" onClick={() => createDevice(activeItem.id)}>
                                <IoIosCreate className="text-gray-700 mr-2" /> Create Contact
                            </Btn>
                            <Btn title="Rename Group" onClick={() => RenameThisDevice(activeItem.id)}>
                                <MdDriveFileRenameOutline className="text-gray-700 mr-2" /> Rename Group
                            </Btn>
                            <Btn className="text-red-500 font-bold" title="Delete Group" onClick={() => DeleteThisDevice(activeItem.id)}>
                                <MdDelete className="text-red-700 mr-2" /> Delete Group
                            </Btn>
                        </>
                    )}
                    <div className="flex justify-end">
                        <button onClick={handleCloseModal} className=" text-blue-500 hover:underline">
                            Close
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    right: '8%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: 1,
};

const ActionBtnWrapper = tw.div`flex items-center space-x-3`;
const Btn = tw.button`grid place-items-center flex transform transition duration-200 mb-3`;

const CustomTable = tw.table`w-full`;
const Thead = tw.thead`border-b`;
const Tbody = tw.tbody`border-b`;
const Tr = tw.tr`border-b rounded-md overflow-hidden hover:bg-slate-100`;
const Th = tw.th`text-sm p-3 font-medium text-gray-200 text-left bg-[#06163A]`;
const Td = tw.td`p-3 text-sm`;
const MobileBadge = tw.div`inline-block bg-purple-100 text-purple-800 border-purple-400 px-2 pt-1 pb-1.5 text-xs rounded-md`;
const EmailBadge = tw.div`inline-block bg-blue-100 text-blue-800 border-blue-400 px-2 pt-1 pb-1.5 text-xs rounded-md`;

const SuccessBadge = tw.div`bg-green-100 text-green-800 text-xs border-green-400 border w-24 h-7 flex items-center justify-center rounded-full`;
const PendingBadge = tw.div`bg-yellow-100 text-yellow-800 text-xs border-yellow-400 border w-24 h-7 flex items-center justify-center rounded-full`;

export default AdminTable;
