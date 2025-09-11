import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import Images from "../../Images";
import { useMutation } from "react-query";
import axios from "axios";
import Config from "../../Config";
import Loading from "../../components/Loading";
import Table from "../../components/Payments/Table";
import { Field, Form, Formik } from "formik";

import NotFoundModel from "../../components/NotFoundModel";
import { useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";
import ViewModel from "../../components/Payments/ViewModal";
import moment from "moment";
import {
  Page,
  BoxContainer,
  Underline,
  Content,
  HeaderTitle,
  HeaderSubTitle,
  ContentHeader,
} from "../../components/Styles/PageStyles";
import {
  FieldWrapper,
  InputGroup,
  Label,
} from "../../components/Styles/InputStyles";
import TopNavbar from "components/TopNavbar";

const Payments = () => {
  const user = useSelector((state) => state.UserReducer.user);

  const [selectedItem, setSelectedItem] = useState(null);
  const [openViewModel, setOpenViewModel] = useState(false);
  const [startDate, setStartDate] = useState(
    moment(new Date()).subtract(7, "days").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const navigate = useNavigate();

  // ------------
  const getPaymentListFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/payment/get`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          Token: user?.token,
        },
      }
    );

  const getPaymentListSuccess = (res) => {};

  const getPaymentListError = (res) => {};

  const {
    isLoading: getPaymentListLoading,
    mutate: getPaymentListMutate,
    error,
    data,
  } = useMutation(getPaymentListFunction, {
    onSuccess: getPaymentListSuccess,
    onError: getPaymentListError,
  });

  useEffect(() => {
    getPaymentListMutate({
      startDate,
      endDate,
    });
  }, []);

  const initialValues = {
    startDate: moment(new Date()).subtract(7, "days").format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD"),
  };

  const submitHandler = (values) => {
    const newValues = {
      startDate: moment(values.startDate).format("YYYY-MM-DD"),
      endDate: moment(values.endDate).format("YYYY-MM-DD"),
    };
    setStartDate(newValues.startDate);
    setEndDate(newValues.endDate);
    getPaymentListMutate(newValues);
  };

  return (
    <Page>
      <TopNavbar />
      <Content>
      <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle>Manage Payments</HeaderTitle>
              </div>
              <HeaderSubTitle>
                This is where you can add and view all payments from clients in the application.
              </HeaderSubTitle>
            </ContentHeader>


        <Filters
          submitHandler={submitHandler}
          initialValues={initialValues}
          InitialLoading={getPaymentListLoading}
          user={user}
        />

        {openViewModel && (
          <ViewModel
            setOpenViewModel={setOpenViewModel}
            selectedItem={selectedItem}
          />
        )}

        {!getPaymentListLoading && (
          <TableWrapper>
            <Table
              ApiData={error ? [] : data?.data?.payments}
              setOpenViewModel={setOpenViewModel}
              setSelectedItem={setSelectedItem}
            />
        {getPaymentListLoading && <Loading />}
        {error && !getPaymentListLoading && <NotFoundModel />}
          </TableWrapper>
        )}

      </Content>
    </Page>
  );
};

const Filters = ({ initialValues, submitHandler, InitialLoading, user }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      <Form>
        <FilterContainer>
          <InputGroup className="max-w-xs">
            <Label htmlFor="startDate">Start Date:</Label>
            <FieldWrapper className="h-10">
              <img
                src={Images.Calender}
                alt="Calender icon"
                className="w-3.5"
              />
              <Field type="date" name="startDate" id="startDate" class="ml-1" />
            </FieldWrapper>
          </InputGroup>

          <InputGroup className="max-w-xs">
            <Label htmlFor="endDate">End Date:</Label>
            <FieldWrapper className="h-10">
              <img
                src={Images.Calender}
                alt="Calender icon"
                className="w-3.5"
              />
              <Field type="date" name="endDate" id="endDate" class="ml-1" />
            </FieldWrapper>
          </InputGroup>

          <ApplyBtn disabled={InitialLoading} type="submit">
            Apply Filter
          </ApplyBtn>
        </FilterContainer>
      </Form>
    </Formik>
  );
};

const Uploader = ({ setOpenUploadModel }) => {
  return (
    <UploadWrapper>
      <Button type="button" onClick={() => setOpenUploadModel(true)}>
        <MdAdd className="w-5 h-5 text-white" /> <p>Add User</p>
      </Button>
      {/* <Button type="button" onClick={() => setOpenUploadModel(true)}>
        <HiUpload className="w-5 h-5 text-white" /> <p>Upload Bulk Contact</p>
      </Button> */}
    </UploadWrapper>
  );
};

const TableWrapper = tw.h1`my-10 border   rounded-md overflow-auto`;

const Title = tw.h1`text-xl  text-gray-800 whitespace-nowrap   font-medium`;

const UploadWrapper = tw.div`
 w-full flex justify-end space-x-4 items-center `;

const Button = tw.button`text-white bg-teal-500 hover:bg-teal-600 w-40 flex items-center space-x-1 justify-center h-10   text-xs whitespace-nowrap rounded`;

const FilterContainer = tw.div`
grid grid-cols-2 w-full max-w-xl gap-4 md:flex md:space-x-4 items-end mt-12 md:mt-8`;

const ApplyBtn = tw.button`${(p) =>
  p.$active
    ? "bg-orange-500 text-white"
    : ""} border whitespace-nowrap border-orange-200 flex space-x-1.5 justify-center items-center text-orange-500 h-full rounded-md px-6  cursor-pointer hover:bg-orange-100  py-2.5 text-sm`;

export default Payments;
