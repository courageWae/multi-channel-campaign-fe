import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link, useNavigate } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import Images from "../../Images";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Config from "../../Config";
import Loading from "components/Loading";
import AdminTable from "components/PlanFeature/Table";
import DeleteModel from "components/PlanFeature/DeleteModel";
import { PiPlusCircleBold } from "react-icons/pi";
import {
  Page,
  Container,
  Content,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
  LearnMoreLink,
} from "../../components/Styles/PageStyles";
import NotFoundModel from "components/NotFoundModel";

import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import AddFeature from "components/PlanFeature/AddFeature";
import DeleteCategory from "components/PlanFeature/DeleteCategory";
import EditCategory from "components/PlanFeature/EditCategory";
import EditFeature from "components/PlanFeature/EditFeature";
import AddCategory from "components/PlanFeature/Addcategory";

const PlanFeature = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteCategoryModel, setDeleteCategoryModel] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [addModel, setAddModel] = useState(false);
  const [editCategoryModel, setEditCategoryModel] = useState(false);
  const [addCategoryModel, setAddCategoryModel] = useState(false);
  const [editFeatureModel, setEditFeatureModel] = useState(false);
  const [openViewModel, setOpenViewModel] = useState(false);
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const navigate = useNavigate();

  // ----- Getting Initial Data ------

  const fetchFunction = async () =>
    await axios.get(`${Config.apiUrl}/category/listing`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });

  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    "adminApi",
    fetchFunction
  );
  console.log(data?.data?.data);

  //------- Add Category Name -------
  const addCategoryFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/category/add

`,
      values,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Token: `${user.token}`,
        },
      }
    );

  const addCategorySuccess = (data) => {
    refetch();
    setSelectedData("");
    setAddCategoryModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const addCategoryError = (data) => {
    refetch();
    setAddCategoryModel(false);
    setSelectedData("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: addCategoryLoading, mutate: addCategoryMutate } =
    useMutation(addCategoryFunction, {
      onSuccess: addCategorySuccess,
      onError: addCategoryError,
    });

  //------- Edit Category Name -------
  const editCategoryFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/category/update

`,
      values,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Token: `${user.token}`,
        },
      }
    );

  const editCategorySuccess = (data) => {
    refetch();
    setSelectedData("");
    setEditCategoryModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const editCategoryError = (data) => {
    refetch();
    setEditCategoryModel(false);
    setSelectedData("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: editCategoryLoading, mutate: editCategoryMutate } =
    useMutation(editCategoryFunction, {
      onSuccess: editCategorySuccess,
      onError: editCategoryError,
    });
  //------- Feature Add -------
  const addFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/plan/feature/add

`,
      values,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Token: `${user.token}`,
        },
      }
    );

  const addSuccess = (data) => {
    refetch();
    setSelectedData("");
    setAddModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const addError = (data) => {
    refetch();
    setAddModel(false);
    setSelectedData("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: addLoading, mutate: addMutate } = useMutation(
    addFunction,
    {
      onSuccess: addSuccess,
      onError: addError,
    }
  );

  //------- Feature Edit -------
  const editFeatureFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/plan/feature/update

`,
      values,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Token: `${user.token}`,
        },
      }
    );

  const editFeatureSuccess = (data) => {
    refetch();
    setSelectedData("");
    setEditFeatureModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const editFeatureError = (data) => {
    refetch();
    setEditFeatureModel(false);
    setSelectedData("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: editFeatureLoading, mutate: editFeatureMutate } =
    useMutation(editFeatureFunction, {
      onSuccess: editFeatureSuccess,
      onError: editFeatureError,
    });

  //------- Delete Category -------
  const deleteCategoryFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/category/delete`,
      values,

      {
        headers: {
          "Content-Type": "application/json",
          Token: `${user.token}`,
        },
      }
    );

  const deleteCategorySuccess = (data) => {
    refetch();
    setSelectedData("");
    setDeleteCategoryModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const deletecategoryError = (data) => {
    setDeleteCategoryModel(false);
    setSelectedData("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: deleteCategoryLoading, mutate: deleteCategoryMutate } =
    useMutation(deleteCategoryFunction, {
      onSuccess: deleteCategorySuccess,
      onError: deletecategoryError,
    });

  //------- Delete Feature -------
  const deleteFunction = async (values) =>
    await axios.post(
      `${Config.apiUrl}/plan/feature/delete`,
      values,

      {
        headers: {
          "Content-Type": "application/json",
          Token: `${user.token}`,
        },
      }
    );

  const deleteSuccess = (data) => {
    refetch();
    setSelectedData("");
    setDeleteModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const deleteError = (data) => {
    setDeleteModel(false);
    setSelectedData("");
    toast.error(data?.response?.data?.msg || "An Error Occured");
  };

  const { isLoading: deleteLoading, mutate: deleteMutate } = useMutation(
    deleteFunction,
    {
      onSuccess: deleteSuccess,
      onError: deleteError,
    }
  );

  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          <Content>
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle>Plan Features</HeaderTitle>
                <Button
                  className="rounded-xl"
                  type="button"
                  onClick={() => setAddCategoryModel(true)}
                >
                  <PiPlusCircleBold size={18} />{" "}
                  <p className="font-semibold">Create</p>
                </Button>
              </div>
              <HeaderSubTitle>
                This is where you organize your plan features. Add, Modify for
                targeted interactions.
              </HeaderSubTitle>
              <LearnMoreLink>
                <Link to="" className="flex items-center gap-1">
                  <p className="underline hover:text-topBar-purple">
                    Get started with plan features
                  </p>
                  <img src={Images.ShareIcon} alt="Share" />
                </Link>
              </LearnMoreLink>
            </ContentHeader>
            {deleteModel && (
              <DeleteModel
                setDeleteModel={setDeleteModel}
                deleteLoading={deleteLoading}
                selectedData={selectedData}
                deleteMutate={deleteMutate}
              />
            )}

            {deleteCategoryModel && (
              <DeleteCategory
                setDeleteCategoryModel={setDeleteCategoryModel}
                deleteCategoryLoading={deleteCategoryLoading}
                selectedData={selectedData}
                deleteCategoryMutate={deleteCategoryMutate}
              />
            )}
            <div
              className={`${
                addModel ? "flex" : "hidden"
              } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                addModel ? "translate-x-0" : "translate-x-full"
              } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <AddFeature
                selectedData={selectedData}
                setAddModel={setAddModel}
                addLoading={addLoading}
                addMutate={addMutate}
              />
            </div>

            <div
              className={`${
                editCategoryModel ? "flex" : "hidden"
              } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                editCategoryModel ? "translate-x-0" : "translate-x-full"
              } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <EditCategory
                selectedData={selectedData}
                setEditCategoryModel={setEditCategoryModel}
                editCategoryLoading={editCategoryLoading}
                editCategoryMutate={editCategoryMutate}
              />
            </div>

            <div
              className={`${
                addCategoryModel ? "flex" : "hidden"
              } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                addCategoryModel ? "translate-x-0" : "translate-x-full"
              } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <AddCategory
                setAddCategoryModel={setAddCategoryModel}
                addCategoryLoading={addCategoryLoading}
                addCategoryMutate={addCategoryMutate}
              />
            </div>

            <div
              className={`${
                editFeatureModel ? "flex" : "hidden"
              } h-screen w-screen bg-black/30 backdrop-blur-sm fixed inset-0 transition-all duration-400 ease-in-out`}
            />
            <div
              className={`${
                editFeatureModel ? "translate-x-0" : "translate-x-full"
              } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
            >
              <EditFeature
                selectedData={selectedData}
                setEditFeatureModel={setEditFeatureModel}
                editFeatureLoading={editFeatureLoading}
                editFeatureMutate={editFeatureMutate}
              />
            </div>

            {!isLoading && !isRefetching && (
              <TableWrapper>
                <AdminTable
                  ApiData={error ? [] : data?.data?.data}
                  setSelectedData={setSelectedData}
                  setAddModel={setAddModel}
                  setOpenViewModel={setOpenViewModel}
                  setDeleteModel={setDeleteModel}
                  setDeleteCategoryModel={setDeleteCategoryModel}
                  setEditCategoryModel={setEditCategoryModel}
                  setEditFeatureModel={setEditFeatureModel}
                />
                {(error || data?.data?.data?.length === 0) &&
                  !isLoading &&
                  gotInitialResp && <NotFoundModel />}
              </TableWrapper>
            )}

            {(isLoading || isRefetching) && <Loading />}
          </Content>
        </Page>
      </Container>
    </>
  );
};

const TableWrapper = tw.div` border rounded-md `;
const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded`;
export default PlanFeature;
