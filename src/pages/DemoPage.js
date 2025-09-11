import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { MdAdd } from "react-icons/md";
import Sidebar from "components/SideNavbar";
import TopNavbar from "components/TopNavbar";
import Table from "components/Demo/Table";
import SingleEntry from "components/Demo/SingleEntry";
import DeleteModel from "components/Demo/DeleteModel";
import ViewModel from "components/Demo/ViewModel";
import { MdOutlineArrowOutward } from "react-icons/md";

const DemoPage = () => {
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [openViewModel, setOpenViewModel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: "2 Jan 2024 - 1 Feb 2024",
    frequency: "Daily",
    product: "All products",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNavbar pageTitle="Demo" pageSubtitle="Demo subtitle" />
          <div className="py-10 px-8 flex-1">
            <div className="flex items-end justify-end mb-4">
              <ExportButton>
                <MdOutlineArrowOutward className="mr-2 mt-1" />
                Export
              </ExportButton>
              <Uploader setOpenUploadModel={setOpenUploadModel} />
            </div>
            {/* <div className="flex items-end justify-between mb-4">
              <Filters
                filters={filters}
                setFilters={setFilters}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearchChange={handleSearchChange}
              />
            </div> */}

            {openUploadModel && (
              <SingleEntry setOpenUploadModel={setOpenUploadModel} />
            )}
            {openDeleteModel && (
              <DeleteModel
                setOpenDeleteModel={setOpenDeleteModel}
                selectedItem={selectedItem}
              />
            )}
            {openViewModel && (
              <ViewModel
                selectedItem={selectedItem}
                setOpenViewModel={setOpenViewModel}
              />
            )}

            <TableWrapper>
              <Table
                setOpenViewModel={setOpenViewModel}
                setSelectedItem={setSelectedItem}
                setOpenDeleteModel={setOpenDeleteModel}
              />
            </TableWrapper>
          </div>
        </div>
      </div>
    </>
  );
};

const Filters = ({
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
  handleSearchChange,
}) => {
  return (
    <FilterContainer>
      <SelectWrapper>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Quick search"
        />

        <select
          className="w-full pl-2  bg-transparent text-xs p-0 border rounded-md font-bold w-full md:w-11/12"
          style={{ height: "40px" }}
          value={filters.dateRange}
          onChange={(e) =>
            setFilters({ ...filters, dateRange: e.target.value })
          }
        >
          <option value="2 Jan 2024 - 1 Feb 2024">
            2 Jan 2024 - 1 Feb 2024
          </option>
          <option value="1 Dec 2023 - 31 Dec 2023">
            1 Dec 2023 - 31 Dec 2023
          </option>
        </select>
        <select
          className="w-full pl-2  bg-transparent text-xs p-0 border rounded-md font-bold w-full md:w-5/12"
          style={{ height: "40px" }}
          value={filters.frequency}
          onChange={(e) =>
            setFilters({ ...filters, frequency: e.target.value })
          }
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        <select
          className="w-full pl-2  bg-transparent text-xs p-0 border rounded-md font-bold w-full md:w-7/12"
          style={{ height: "40px" }}
          value={filters.product}
          onChange={(e) => setFilters({ ...filters, product: e.target.value })}
        >
          <option value="All products">All products</option>
          <option value="Product 1">Product 1</option>
          <option value="Product 2">Product 2</option>
        </select>
      </SelectWrapper>
      <SelectWrapper>
        <select
          className="w-full pl-2  bg-transparent text-xs p-0 border rounded-md font-bold"
          style={{ height: "40px" }}
          value={filters.product}
          onChange={(e) => setFilters({ ...filters, product: e.target.value })}
        >
          <option value="All products">Sort by</option>
          <option value="name">Name</option>
          <option value="date">date</option>
        </select>
      </SelectWrapper>
    </FilterContainer>
  );
};

const Uploader = ({ setOpenUploadModel }) => {
  return (
    <UploadWrapper>
      <Button type="button" onClick={() => setOpenUploadModel(true)}>
        <MdAdd className="text-white w-4 h-4" />
        <p>Add</p>
      </Button>
    </UploadWrapper>
  );
};

const TableWrapper = tw.div`my-10 border rounded-md overflow-auto`;

const FilterContainer = tw.div`
md:flex md:space-x-4 items-center w-full justify-between gap-2 grid `;

const SearchInput = tw.input`border px-4 py-2 rounded-md `;

const SelectWrapper = tw.div`grid grid-cols-2 md:flex gap-2 md:space-x-4 font-bold`;

const ExportButton = tw.button`bg-transpartent text-black px-3 text-sm py-2 rounded-md mr-4 flex border font-bold  shadow-lg`;

const UploadWrapper = tw.div`flex space-x-4 items-center`;

const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 px-8 flex items-center space-x-1 justify-center h-10 text-xs whitespace-nowrap rounded-md`;

export default DemoPage;
