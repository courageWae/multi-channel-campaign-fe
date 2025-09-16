import NotFoundModel from "components/NotFoundModel";
import Config from "Config";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import tw from "tailwind-styled-components";
import useMedia from "use-media";

const TableContainer = tw.div`bg-white p-[1.10rem] shadow-md rounded-md w-full`;
const Table = tw.table`min-w-full table-auto`;
const Thead = tw.thead`bg-gray-200`;
const Tbody = tw.tbody``;
const Th = tw.th`px-4 py-2 text-left text-gray-600 text-sm font-medium uppercase tracking-wider`;
const Td = tw.td`px-4 py-3 text-sm text-gray-700`;
const ListContainer = tw.div`bg-white p-5 shadow-md rounded-md w-full`;
const ListItem = tw.div`bg-gray-100 p-4 mb-2 rounded-md`;

const StatusCell = ({ value }) => {
  let styles = "";
  let textStyles = "";

  if (value === 1) {
    styles =
      "bg-[#F38B22FF] text-white pt-1 pb-1.5 px-2 rounded-md border border-[#F39C22FF]  !items-center";
    textStyles = "text-xs";
  } else if (value === 3) {
    styles =
      "bg-red-500 text-white pt-1 pb-1.5 px-2 rounded-md border border-red-500  !items-center";
    textStyles = "text-xs";
  } else if (value === 2) {
    styles =
      "bg-[#4AA23C] text-white pt-1 pb-1.5 px-2 rounded-md border border-[#4AA23C]  !items-center";
    textStyles = "text-xs";
  }

  return (
    <span className={`${styles} ${textStyles}`}>
      {value === 1 ? "Pending" : value === 2 ? "Approved" : "Sent"}
    </span>
  );
};

const dateCell = (value)=>{
  return moment(value).format("YYYY-MM-DD");
}

const typeCell = ({ value }) => {
  let styles = "";
  let textStyles = "";
  if (value === Config.CampaignType.Sms) {
    styles =
      "bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400";
    textStyles = "text-sm font-semibold";
  }
  if (value === Config.CampaignType.Email) {
    styles =
      "bg-orange-100 text-orange-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-orange-400 border border-orange-400";
    textStyles = "text-sm font-semibold";
  }
  if (value === Config.CampaignType.Voice) {
    styles =
      "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-400 border border-yellow-400";
    textStyles = "text-sm font-semibold";
  }

  return (
    <span className={`${styles} ${textStyles}`}>
      {value === Config.CampaignType.Sms
        ? "SMS"
        : value === Config.CampaignType.Email
        ? "Email"
        : value === Config.CampaignType.Voice
        ? "Voice"
        : "Unknown"}
    </span>
  );
};

const OrderStatus = ({ campaigns }) => {
  const user = useSelector((state) => state.UserReducer.user);
  const isMedium = useMedia({ maxWidth: "768px" });

  // Move columns definition outside of component body
  const columns = React.useMemo(() => [
    { Header: "ID", accessor: "id" },
    ...(user.type === Config.UserType.CommercialAdminUser ||
    user.type === Config.UserType.SuperAdminUser
      ? [{ Header: "USERNAME", accessor: "userName" }]
      : []),
    { Header: "NAME", accessor: "name" },
    { Header: "TYPE", accessor: "type", Cell: typeCell },
    { Header: "STATUS", accessor: "status", Cell: StatusCell },
    { Header: "DATE", accessor: "created_at", Cell: dateCell },
  ], [user.type]); // Only depend on user.type

  const data = React.useMemo(() => campaigns, [campaigns]);
  
  const tableInstance = useTable({ 
    columns, 
    data,
    initialState: { pageSize: 10 } // Set initial page size here instead of using useEffect
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <TableContainer>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">
          Recent Campaigns (SMS, Email)
        </h2>
      </div>
      {campaigns.length === 0 ? (
        <NotFoundModel />
      ) : (
        <>
          {isMedium ? (
            <ListContainer>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <ListItem key={row.id}>
                    {row.cells.map((cell) => (
                      <div key={cell.column.id}>
                        <strong>{cell.column.Header}: </strong>
                        {cell.render("Cell")}
                      </div>
                    ))}
                  </ListItem>
                );
              })}
            </ListContainer>
          ) : (
            <Table {...getTableProps()}>
              <Thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <Th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </Th>
                    ))}
                  </tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                      ))}
                    </tr>
                  );
                })}
              </Tbody>
            </Table>
          )}
        </>
      )}
    </TableContainer>
  );
};

export default OrderStatus;
