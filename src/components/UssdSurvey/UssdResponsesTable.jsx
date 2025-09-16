import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import tw from "tailwind-styled-components";
import moment from "moment";
import { PaginationLimit } from "../../Config";

import {
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { PrevBtn, NextBtn, PaginationWrapper } from "../Styles/PageStyles";

const UssdResponsesTable = ({ responses, onDeleteResponse, deleteLoading }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (responses) {
      const formattedData = responses.map((response, index) => {
        // Parse the JSON response string
        let parsedResponse = "N/A";
        try {
          if (response.response) {
            parsedResponse = JSON.parse(response.response);
          }
        } catch (error) {
          console.error("Error parsing response JSON:", error);
          parsedResponse = response.response || "N/A";
        }

        return {
          id: response.id,
          index: index + 1,
          phone_number: response.msisdn || "N/A",
          responses: parsedResponse,
          created_at: response.created_at,
          formatted_date: moment(response.created_at).format("DD MMM YYYY, HH:mm"),
          actions: response,
        };
      });
      setData(formattedData);
    }
  }, [responses]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "index",
        width: 60,
        minWidth: 60,
        maxWidth: 60,
      },
      {
        Header: "Phone Number",
        accessor: "phone_number",
        width: 180,
        minWidth: 150,
        maxWidth: 200,
        Cell: ({ value }) => (
          <div className="flex items-center space-x-2">
            <div className="flex flex-shrink-0 justify-center items-center w-8 h-8 bg-green-100 rounded-full">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <span className="font-medium text-gray-900 truncate">{value}</span>
          </div>
        ),
      },
      {
        Header: "Responses",
        accessor: "responses",
        width: 400,
        minWidth: 300,
        maxWidth: 500,
        Cell: ({ value }) => {
          const [isExpanded, setIsExpanded] = React.useState(false);
          
          const renderResponse = () => {
            if (value === "N/A" || !value) {
              return <span className="italic text-gray-500">No responses</span>;
            }
            
            if (typeof value === 'object' && value !== null) {
              const entries = Object.entries(value);
              const totalLength = JSON.stringify(value).length;
              
              // Show truncated version if response is too long
              if (totalLength > 200 && !isExpanded) {
                const truncatedEntries = entries.slice(0, 2);
                const remainingCount = entries.length - 2;
                
                return (
                  <div className="space-y-2">
                    {truncatedEntries.map(([question, answer], index) => (
                      <div key={index} className="pl-3 border-l-2 border-blue-200">
                        <div className="mb-1 text-xs font-medium text-gray-600 break-words">
                          Q: {question.length > 40 ? `${question.substring(0, 40)}...` : question}
                        </div>
                        <div className="text-sm font-medium text-gray-800 break-words">
                          A: {answer.length > 80 ? `${answer.substring(0, 80)}...` : answer}
                        </div>
                      </div>
                    ))}
                    {remainingCount > 0 && (
                      <div className="pt-2 border-t border-gray-200">
                        <button
                          onClick={() => setIsExpanded(true)}
                          className="text-xs font-medium text-blue-600 hover:text-blue-800"
                        >
                          +{remainingCount} more responses...
                        </button>
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <div className="space-y-2">
                  {entries.map(([question, answer], index) => (
                    <div key={index} className="pl-3 border-l-2 border-blue-200">
                      <div className="mb-1 text-xs font-medium text-gray-600 break-words">
                        Q: {question}
                      </div>
                      <div className="text-sm font-medium text-gray-800 break-words">
                        A: {answer}
                      </div>
                    </div>
                  ))}
                  {totalLength > 200 && isExpanded && (
                    <div className="pt-2 border-t border-gray-200">
                      <button
                        onClick={() => setIsExpanded(false)}
                        className="text-xs font-medium text-gray-600 hover:text-gray-800"
                      >
                        Show less
                      </button>
                    </div>
                  )}
                </div>
              );
            }
            
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            const shouldTruncate = stringValue.length > 120;
            
            return (
              <div>
                <span className="text-sm text-gray-800 break-words">
                  {shouldTruncate && !isExpanded 
                    ? `${stringValue.substring(0, 120)}...` 
                    : stringValue
                  }
                </span>
                {shouldTruncate && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="ml-2 text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            );
          };

          return (
            <div className="w-full">
              <div className="overflow-y-auto p-3 max-h-48 bg-gray-50 rounded-lg border border-gray-200">
                {renderResponse()}
              </div>
            </div>
          );
        },
      },
      {
        Header: "Submitted At",
        accessor: "formatted_date",
        width: 180,
        minWidth: 150,
        maxWidth: 200,
        Cell: ({ value }) => (
          <div className="flex items-center space-x-2">
            <div className="flex flex-shrink-0 justify-center items-center w-8 h-8 bg-blue-100 rounded-full">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm text-gray-600 whitespace-nowrap">{value}</span>
          </div>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        width: 120,
        minWidth: 100,
        maxWidth: 120,
        Cell: ({ value: response }) => (
          <ActionButtons response={response} onDelete={onDeleteResponse} loading={deleteLoading} />
        ),
      },
    ],
    [deleteLoading, onDeleteResponse]
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
      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto lg:block">
        <CustomTable {...getTableProps()} className="w-full table-fixed">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className="flex items-center space-x-2">
                      <span>{column.render("Header")}</span>
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <MdArrowBack className="inline-block text-gray-400" />
                          ) : (
                            <MdArrowForward className="inline-block text-gray-400" />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} className="transition-colors hover:bg-gray-50">
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </CustomTable>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 lg:hidden">
        {page.map((row) => {
          prepareRow(row);
          const rowData = row.original;
          return (
            <div key={rowData.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="space-y-3">
                {/* Phone Number */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="flex justify-center items-center w-8 h-8 bg-green-100 rounded-full">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900">{rowData.phone_number}</span>
                  </div>
                  <span className="text-sm text-gray-500">#{rowData.index}</span>
                </div>

                {/* Responses */}
                <MobileResponseCard response={rowData.responses} />

                {/* Date and Actions */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="flex justify-center items-center w-6 h-6 bg-blue-100 rounded-full">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">{rowData.formatted_date}</span>
                  </div>
                  <ActionButtons response={rowData.actions} onDelete={onDeleteResponse} loading={deleteLoading} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {data.length > 0 && (
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

const ActionButtons = ({ response, onDelete, loading }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (showConfirm) {
      onDelete(response);
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {showConfirm ? (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
          >
            <FaTrash className="w-3 h-3" />
            <span>Confirm</span>
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="px-3 py-1.5 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleDelete}
          disabled={loading}
          className="p-2 text-red-600 rounded-lg transition-colors hover:text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Delete Response"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// Mobile Response Card Component
const MobileResponseCard = ({ response }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const renderResponse = () => {
    if (response === "N/A" || !response) {
      return <span className="italic text-gray-500">No responses</span>;
    }
    
    if (typeof response === 'object' && response !== null) {
      const entries = Object.entries(response);
      const totalLength = JSON.stringify(response).length;
      
      if (totalLength > 200 && !isExpanded) {
        const truncatedEntries = entries.slice(0, 2);
        const remainingCount = entries.length - 2;
        
        return (
          <div className="space-y-2">
            {truncatedEntries.map(([question, answer], index) => (
              <div key={index} className="pl-3 border-l-2 border-blue-200">
                <div className="mb-1 text-xs font-medium text-gray-600">
                  Q: {question.length > 40 ? `${question.substring(0, 40)}...` : question}
                </div>
                <div className="text-sm font-medium text-gray-800">
                  A: {answer.length > 80 ? `${answer.substring(0, 80)}...` : answer}
                </div>
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-xs font-medium text-blue-600 hover:text-blue-800"
                >
                  +{remainingCount} more responses...
                </button>
              </div>
            )}
          </div>
        );
      }
      
      return (
        <div className="space-y-2">
          {entries.map(([question, answer], index) => (
            <div key={index} className="pl-3 border-l-2 border-blue-200">
              <div className="mb-1 text-xs font-medium text-gray-600">
                Q: {question}
              </div>
              <div className="text-sm font-medium text-gray-800">
                A: {answer}
              </div>
            </div>
          ))}
          {totalLength > 200 && isExpanded && (
            <div className="pt-2 border-t border-gray-200">
              <button
                onClick={() => setIsExpanded(false)}
                className="text-xs font-medium text-gray-600 hover:text-gray-800"
              >
                Show less
              </button>
            </div>
          )}
        </div>
      );
    }
    
    const stringValue = typeof response === 'string' ? response : JSON.stringify(response);
    const shouldTruncate = stringValue.length > 120;
    
    return (
      <div>
        <span className="text-sm text-gray-800 break-words">
          {shouldTruncate && !isExpanded 
            ? `${stringValue.substring(0, 120)}...` 
            : stringValue
          }
        </span>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 text-xs font-medium text-blue-600 hover:text-blue-800"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase">Responses</div>
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        {renderResponse()}
      </div>
    </div>
  );
};

// Styled Components
const CustomTable = tw.table`w-full border-collapse table-fixed`;
const Thead = tw.thead`bg-gray-50`;
const Tbody = tw.tbody``;
const Tr = tw.tr`border-b border-gray-200`;
const Th = tw.th`px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`;
const Td = tw.td`px-6 py-4`;

export default UssdResponsesTable;
