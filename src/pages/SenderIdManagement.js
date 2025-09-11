import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import Sidebar from "components/SideNavbar";
import TopNavbar from "components/TopNavbar";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Config from "../Config";
import Loading from "components/Loading";
import Table from "components/SenderIdManagement/Table";
import {
  Page,
  BoxContainer,
  BoxTitle,
  Underline,
  ErrorText,
} from "components/Styles/PageStyles";
import NotFoundModel from "components/NotFoundModel";
import {
  SmallBtn,
  Label,
  FieldWrapper,
  InputGroup,
} from "components/Styles/InputStyles";
import moment from "moment";
import { Field, Form, Formik } from "formik";
import DeleteModel from "components/SenderIdManagement/DeleteModal";
import { useSelector } from "react-redux";
import { ForUs } from "../Config";
import EditDeviceModel from "components/SenderIdManagement/EditDeviceModal";
import SingleEntry from "components/SenderIdManagement/SingleEntry";
import { MdAdd } from "react-icons/md";
import { HiUpload } from "react-icons/hi";
import RequestSenderIdModel from "components/AddSms/RequestSenderIdModal";
import { toast } from "react-toastify";

import UploadModel from "components/SenderIdManagement/DeleteModal";
import EditModel from "components/SenderIdManagement/EditDeviceModal";
import ViewModel from "components/SenderIdManagement/ViewModel";
import { Tooltip } from "react-tooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { BsSearch } from "react-icons/bs";

const SenderIdManagement = () => {
  const user = useSelector((state) => state.UserReducer.user);

  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const [editDevice, setEditDevice] = useState(false);

  const navigate = useNavigate();

  // ----- Getting Initial Data ------
  const fetchFunction = async () =>
    await axios.get(`${Config.apiUrl}/allSenderId`, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });

  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    "AllSenderId",
    fetchFunction
  );

  //------- Add Single Entry -------
  const SingleEntryPostFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/requestSenderId`, values, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });

  const onSingleEntrySuccess = (data) => {
    refetch();
    setDeviceId("");
    setOpenUploadModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const onSingleEntryError = (data) => {
    setOpenUploadModel(false);
    setDeviceId("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: SingleEntryLoading, mutate: postSingleEntry } =
    useMutation(SingleEntryPostFunction, {
      onSuccess: onSingleEntrySuccess,
      onError: onSingleEntryError,
    });

  //------- Edit Single Entry -------
  const EditSingleEntryFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/editSenderId`, values, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });

  const onEditEntrySuccess = (data) => {
    refetch();
    setDeviceId("");
    setEditDevice(false);
    toast.success(data?.data?.msg || "Success");
  };

  const onEditEntryError = (data) => {
    setEditDevice(false);
    setDeviceId("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: editEntryLoading, mutate: editSingleEntry } = useMutation(
    EditSingleEntryFunction,
    {
      onSuccess: onEditEntrySuccess,
      onError: onEditEntryError,
    }
  );

  //------- Delete Single Entry -------
  const deleteSingleEntryFunction = async (values) =>
    await axios.post(`${Config.apiUrl}/deleteSenderId`, values, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });

  const onDeleteEntrySuccess = (data) => {
    refetch();
    setSelectedItem("");
    setOpenDeleteModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const onDeleteEntryError = (data) => {
    setOpenDeleteModel(false);
    setSelectedItem("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: deleteEntryLoading, mutate: deleteSingleEntry } =
    useMutation(deleteSingleEntryFunction, {
      onSuccess: onDeleteEntrySuccess,
      onError: onDeleteEntryError,
    });

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNavbar
            pageTitle="Sender Id Management"
            pageSubtitle="Sender Id Management subtitle"
          />
          <div className="py-10 px-8 flex-1">
            <div className="flex w-full justify-between items-center">
              {/* <div>
                <Title className="flex  items-center space-x-2">
                  <p>Sender Id Management</p>
                  <AiOutlineInfoCircle
                    className="text-lg mt-0.5 text-gray-900"
                    id="senderId"
                  />
                </Title>
                <Underline />
              </div> */}

              <Tooltip
                className="!max-w-sm !z-50"
                anchorId="senderId"
                place="bottom"
                content="Sender ID is how the recipient of the message identifies the sender of the message. It could be an individual name, brand name etc. Sender ID should be 11 characters long."
              />

              <Uploader setOpenUploadModel={setOpenUploadModel} />
            </div>

            {openUploadModel && (
              <RequestSenderIdModel
                postSingleEntry={postSingleEntry}
                SingleEntryLoading={SingleEntryLoading}
                setOpenUploadModel={setOpenUploadModel}
              />
            )}

            {editDevice && (
              <EditDeviceModel
                editSingleEntry={editSingleEntry}
                editEntryLoading={editEntryLoading}
                selectedItem={selectedItem}
                setEditModel={setEditDevice}
              />
            )}

            {openDeleteModel && (
              <DeleteModel
                deleteDeviceMutate={deleteSingleEntry}
                deleteDeviceLoading={deleteEntryLoading}
                deviceId={selectedItem.id}
                setOpenDeleteModel={setOpenDeleteModel}
              />
            )}

            {viewModel && (
              <ViewModel
                selectedItem={selectedItem}
                setViewModel={setViewModel}
              />
            )}

            {!isLoading && !isRefetching && (
              <TableWrapper>
                <Table
                  ApiData={error ? [] : data?.data}
                  setOpenDeleteModel={setOpenDeleteModel}
                  setDeviceId={setDeviceId}
                  setEditDevice={setEditDevice}
                  setSelectedItem={setSelectedItem}
                  setViewModel={setViewModel}
                />
              </TableWrapper>
            )}

            {(isLoading || isRefetching) && <Loading />}
            {error && !isLoading && <NotFoundModel />}
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
        <MdAdd className="text-white w-5 h-5" /> <p>Request Sender Id</p>
      </Button>
      {/* <Button type="button" onClick={() => setOpenUploadModel(true)}>
        <HiUpload className="text-white w-5 h-5" /> <p>Upload Bulk Contact</p>
      </Button> */}
    </UploadWrapper>
  );
};

const TableWrapper = tw.h1`my-10 border   rounded-md overflow-auto`;

const Title = tw.h1`text-xl  text-gray-800 whitespace-nowrap   font-medium`;

const UploadWrapper = tw.div`
 w-full flex justify-end space-x-4 items-center `;

const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 w-40 flex items-center space-x-1 justify-center h-10   text-xs whitespace-nowrap rounded`;

export default SenderIdManagement;
