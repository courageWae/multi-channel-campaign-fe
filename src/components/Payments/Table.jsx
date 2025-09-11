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
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const AdminTable = ({ ApiData, setOpenViewModel, setSelectedItem }) => {
  const [data, setData] = useState([
    {
      deviceName: "",
      extractionTime: "",
      processingTime: "",
      drops: "",
      action: "",
    },
  ]);

  const view = (item) => {
    setSelectedItem(item);
    setOpenViewModel(true);
  };

  const ActionBtns = (item) => {
    return (
      <ActionBtnWrapper>
        <Btn title="View All Details" onClick={() => view(item)}>
          <HiEye className="text-gray-700" />
        </Btn>
      </ActionBtnWrapper>
    );
  };

  useEffect(() => {
    if (ApiData) {
      const tempData = ApiData.map((item) => ({
        name: item.name,
        mobile: item.msisdn,
        date: moment(item.payment_date).format("DD-MM-YYYY hh:mm A"),
        transactionId: item.transaction_id,
        plan: item.plan_type,
        payment_type: getPaymentType(item.payment_type),
        amount: item.amount + " GHc",
        status: getStatus(item.status),
        network: getNetwork(item.network),
        action: ActionBtns(item),
      }));

      setData(tempData);
    }
  }, [ApiData]);

  const getStatus = (status) => {
    if (status === "Success") {
      return <SuccessBadge>Success</SuccessBadge>;
    } else {
      return <FailedBadge>Failed</FailedBadge>;
    }
  };

  const getPaymentType = (payment_type) => {
    if (payment_type === "TOPUP") {
      return <TopUpBadge>TOPUP</TopUpBadge>
    } else if(payment_type ==="PACKAGE") {
      return <PackageBadge>PACKAGE</PackageBadge>
    }
  };

  const getNetwork = (network) => {
    if (network === "MTN") {
      return (
        <div className="">
          <img
            className="w-10 h-10 rounded-md"
            src={Images.MTN_NETWORK}
            alt="MTN_CODE"
          />
        </div>
      );
    } else if (network === "VODA") {
      return (
        <div className="">
          <img
            className="w-10 h-10 rounded-md"
            src={Images.TELECEL_NETWORK}
            alt="MTN_CODE"
          />
        </div>
      );
    } else {
      return (
        <div className="">
          <img
            className="w-10 h-10 rounded-md"
            src={Images.NETWORK_AT}
            alt="MTN_CODE"
          />
        </div>
      );
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "User Name",
        accessor: "name",
      },
      {
        Header: "Mobile",
        accessor: "mobile",
      },
      {
        Header: "Network",
        accessor: "network",
      },
      {
        Header: "Transaction Id",
        accessor: "transactionId",
      },
      {
        Header: "Payment Type",
        accessor: "payment_type",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },

      {
        Header: "Date",
        accessor: "date",
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
                        className={`${
                          column.isSortedDesc ? "-rotate-90" : "rotate-90"
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
      {/* {ApiData.length!==false && ( */}
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
      {/* )} */}
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
const TopUpBadge = tw.div`bg-purple-100 text-purple-700 text-xs border-purple-300 border w-24 h-7 flex items-center justify-center rounded`;
const PackageBadge = tw.div`bg-orange-100 text-orange-700 text-xs border-orange-300 border w-24 h-7 flex items-center justify-center rounded`;
const PendingBadge = tw.div`bg-yellow-100 text-yellow-700 text-xs border-yellow-300 border w-24 h-7 flex items-center justify-center rounded`;
const FailedBadge = tw.div`bg-red-100 text-red-700 text-xs border-red-300 border w-24 h-7 flex items-center justify-center rounded`;

export default AdminTable;
