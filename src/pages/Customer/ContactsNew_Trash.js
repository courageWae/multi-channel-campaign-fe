import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "components/SideNavbar";
import TopNavbar from "components/TopNavbar";

import { useMutation, useQuery } from "react-query";
import SingleEntry from "components/Contacts/SingleEntryNewTrash";
import AdminTable from "components/Contacts/TableNew_Trash";
import DeleteModel from "components/Contacts/DeleteModelNew_Trash";
import RenameModel from "components/Contacts/RenameModelNew_Trash";
import axios from "axios";
import Config from "../../Config";
import Loading from "components/Loading";
import {
  Page,
  BoxContainer,
  BoxTitle,
  Underline,
  ErrorText,
} from "components/Styles/PageStyles";
import NotFoundModel from "components/NotFoundModel";
import { MdAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import CreateContact from "components/Contacts/CreateContact_Trash";

const ContactNew = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [renameModel, setRenameModel] = useState(false);
  const [createModel, setCreateModel] = useState(false);
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNavbar
            pageTitle="Contact Groups"
            pageSubtitle="This is where you organize your group. Create, modify, and manage custom groups for targeted interactions."
          />
          <div className="py-10 px-8 flex-1">
            <div className="flex w-full justify-between items-center">
              <Uploader setOpenUploadModel={setOpenUploadModel} />
            </div>

            {renameModel && (
              <RenameModel
                deviceId={deviceId}
                setRenameModel={setRenameModel}
              />
            )}
            {createModel && (
              <CreateContact
                deviceId={deviceId}
                setCreateModel={setCreateModel}
              />
            )}
            {deleteModel && (
              <DeleteModel
                setDeleteModel={setDeleteModel}
                deviceId={deviceId}
              />
            )}

            {openUploadModel && (
              <SingleEntry setOpenUploadModel={setOpenUploadModel} />
            )}

            <TableWrapper>
              <AdminTable
                // ApiData={error ? [] : data?.data?.data}
                setDeleteModel={setDeleteModel}
                setRenameModel={setRenameModel}
                setDeviceId={setDeviceId}
                setCreateModel={setCreateModel}
              />
            </TableWrapper>
          </div>
        </div>
      </div>
    </>
  );
};

const Uploader = ({ setOpenUploadModel }) => {
  return (
    <UploadWrapper>
      <Button type="button" onClick={() => setOpenUploadModel(true)}>
        <MdAdd className="text-white w-5 h-5" /> <p>Add</p>
      </Button>
    </UploadWrapper>
  );
};
const TableWrapper = tw.h1`my-10 border   rounded-md overflow-auto`;
const UploadWrapper = tw.div`
 w-full flex justify-end space-x-4 items-center `;

const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 px-8 flex items-center space-x-1 justify-center h-10   text-base whitespace-nowrap rounded`;

export default ContactNew;
