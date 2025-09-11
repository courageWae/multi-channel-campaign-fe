import Loading from "components/Loading";
import {
  FieldWrappers,
  InputGroup,
  Label,
} from "components/Styles/InputStyles";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaPlus, FaRegEdit, FaTimes, FaTrash } from "react-icons/fa";
import { ImMobile } from "react-icons/im";
import tw from "tailwind-styled-components";
import * as Yup from "yup";
import { FaPhoneVolume } from "react-icons/fa6";
import axios from "axios";
import Config from "Config";
import { useSelector } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";

const ModalBackdrop = tw.div`fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-black bg-opacity-50 flex justify-center items-center`;
const ModalDialog = tw.div`relative w-auto p-6 pointer-events-none translate-y-0 opacity-100 transition-all duration-300 ease-in-out sm:mx-auto w-3/5 sm:mt-7 sm:max-w-[800px] lg:max-w-[1000px]`;
const ModalContent = tw.div`pointer-events-auto flex w-full flex-col rounded-md bg-white shadow-lg text-current dark:bg-surface-dark`;
const ModalHeader = tw.div`flex items-center justify-between rounded-t-md border-b-2 p-4 dark:border-white/10`;
const ModalTitle = tw.h5`text-xl py-4 flex gap-2  items-center font-bold text-gray-900 dark:text-white leading-normal text-surface dark:text-white`;
const ModalBody = tw.div`relative p-4`;
const CloseButton = tw.button`box-content text-neutral-500 hover:text-neutral-800 focus:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300 focus:outline-none`;

// Main Modal Component
const AssignTestNumberModal = ({
  selectedData,
  assignTestNumberMutate,
  assignTestNumberLoading,
  assignTestNumberModal,
  setAssignTestNumberModal,
}) => {
  const user = useSelector((state) => state.UserReducer.user);
  const [testNumber, setTestNumber] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [addNumber, setAddNumber] = useState(false);
  const [editNumber, setEditNumber] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const fetchTestNumbers = async () => {
    try {
      const response = await axios.post(
        `${Config.apiUrl}/ussd/whitelist/get`,
        { id: selectedData.id },
        {
          headers: {
            "Content-Type": "application/json",
            token: `${user.token}`,
          },
        }
      );
      const data = response.data.data;
      console.log("response: ", data);
      setNumbers(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      console.log("Done");
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchTestNumbers();
  }, [selectedData, user.token]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        setEditId(null);
      }, 3000);
    }
  }, [success]);

  const closeModal = () => {
    setAssignTestNumberModal(false);
  };

  const initialValues = {
    phoneNumber: "",
  };

  const editInitialValue = {
    phoneNumber: testNumber,
  };

  const handleSubmit = async (values, { resetForm }) => {
    const phoneNumber = values.phoneNumber;

    setLoading(true);
    await axios
      .post(
        `${Config.apiUrl}/ussd/whitelist/create`,
        {
          mobile: phoneNumber,
          id: selectedData.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: `${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log("Response from backend:", response.data);
        setSuccess(true);
        fetchTestNumbers();
        setAddNumber(false);
        resetForm();
      })
      .catch((error) => {
        console.error("Error while submitting:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = async (values, { resetForm }) => {
    const phoneNumber = values.phoneNumber;

    setLoading(true);
    await axios
      .post(
        `${Config.apiUrl}/ussd/whitelist/update`,
        {
          id: editId,
          ussdId: selectedData.id,
          mobile: phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: `${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log("Response from backend:", response.data);
        setSuccess(true);
        setTestNumber(null);
        setEditNumber(false);

        fetchTestNumbers();

        resetForm();
      })
      .catch((error) => {
        console.error("Error while submitting:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios
        .post(
          `${Config.apiUrl}/ussd/whitelist/delete`,
          { id },
          {
            headers: {
              "Content-Type": "application/json",
              token: `${user.token}`,
            },
          }
        )
        .then((response) => {
          console.log("Response: ", response);
          setDeleteSuccess(true);
          fetchTestNumbers();
          setLoading(false)
        });
    } catch (error) {
      setDeleteError(true);
      console.log(error);
    } finally {
      setLoading(false);
      console.log("Deletion Done");
    }
  };

  useEffect(() => {
    if (deleteSuccess === true) {
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (deleteError === true) {
      setTimeout(() => {
        setDeleteError(false);
      }, 3000);
    }
  }, [deleteError]);

  useEffect(() => {
    if (numbers.length > 4) {
      setError(true);
    } else {
      setError(false);
    }
  }, [numbers]);

  const assignTestNumberSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .length(12, "Phone number must be exactly 10 digits"),
  });

  const handleAddNumberInput = () => {
    setAddNumber(!addNumber);
  };

  const handleEditNumberInput = (number) => {
    setEditNumber(true);
    setTestNumber(number.mobile);
    setAddNumber(false);
    setEditId(number.id);
  };

  const closeEditInput = () => {
    setEditNumber(false);
    setTestNumber(null);
    setEditId(null);
    setAddNumber(false);
  };

  if (!assignTestNumberModal || !selectedData) return null;

  return (
    <ModalBackdrop
      id="exampleModalLg"
      tabIndex="-1"
      aria-labelledby="exampleModalLgLabel"
      aria-modal="true"
      role="dialog"
    >
      <ModalDialog>
        <ModalContent>
          {/* Modal Header */}
          <ModalHeader>
            <ModalTitle id="exampleModalLgLabel">
              <ImMobile className="text-xl text-orange-600" />
              <span className="flex items-center gap-3 ml-2 font-semibold text-gray-600">
                Assign Test Numbers for:{" "}
                <span className="flex items-center justify-center h-12 px-3 text-orange-500 bg-gray-100 rounded-md w-fit">
                  {selectedData.short_code}
                </span>
              </span>
            </ModalTitle>
            <CloseButton aria-label="Close" onClick={closeModal}>
              <span className="[&>svg]:h-6 [&>svg]:w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            {loading ? (
              <Loading />
            ) : (
              <div className="body">
                {error && <AlertBadge />}
                {success && (
                  <SuccessAlert
                    children={
                      editId
                        ? "Number Updated Successfully"
                        : "Number Added Successfully"
                    }
                  />
                )}
                {deleteSuccess && <DeleteSuccess />}
                {deleteError && <DeleteError />}
                <div className="grid w-full h-full grid-cols-1">
                  <div className="w-full cols-span-1">
                    {addNumber && (
                      <div
                        className={`transition-all ease-in-out duration-500 ${
                          addNumber
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        <Formik
                          initialValues={initialValues}
                          validationSchema={assignTestNumberSchema}
                          onSubmit={handleSubmit}
                        >
                          {({ errors, touched, values, setFieldValue }) => (
                            <Form className="flex items-center justify-between w-full gap-3">
                              <Wrapper>
                                <InputGroup>
                                  <Label htmlFor="phoneNumber">
                                    Phone Number *
                                  </Label>
                                  <FieldWrappers>
                                    <Field
                                      type="text"
                                      name="phoneNumber"
                                      id="phoneNumber"
                                      autoComplete="off"
                                      className="uppercase truncate"
                                      required
                                      maxLength="12"
                                      onChange={(e) => {
                                        setFieldValue(
                                          "phoneNumber",
                                          e.target.value
                                        );
                                        setTestNumber(e.target.value);
                                      }}
                                      value={values.phoneNumber}
                                    />
                                  </FieldWrappers>
                                  {errors.phoneNumber && touched.phoneNumber ? (
                                    <Error>{errors.phoneNumber}</Error>
                                  ) : null}
                                </InputGroup>
                              </Wrapper>

                              <div className="flex mt-8">
                                <button
                                  className="flex items-center justify-center p-3 text-white bg-orange-500 rounded-full shadow-md hover:bg-orange-600"
                                  type="submit"
                                >
                                  <span className="flex items-center">
                                    <span className="font-semibold text-white">
                                      <FaPlus className="text-lg text-white" />
                                    </span>
                                  </span>
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    )}
                    {editNumber && (
                      <div
                        className={`transition-all ease-in-out duration-500 ${
                          editNumber
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        <Formik
                          initialValues={editInitialValue}
                          validationSchema={assignTestNumberSchema}
                          onSubmit={handleEdit}
                        >
                          {({ errors, touched, values, setFieldValue }) => (
                            <Form className="flex items-center justify-between w-full gap-3">
                              <Wrapper>
                                <InputGroup>
                                  <Label htmlFor="phoneNumber">
                                    Phone Number Edit *
                                  </Label>
                                  <FieldWrappers>
                                    <Field
                                      type="text"
                                      name="phoneNumber"
                                      id="phoneNumber"
                                      autoComplete="off"
                                      className="uppercase truncate"
                                      required
                                      maxLength="12"
                                      onChange={(e) => {
                                        setFieldValue(
                                          "phoneNumber",
                                          e.target.value
                                        );
                                        setTestNumber(e.target.value);
                                      }}
                                      value={values.phoneNumber}
                                    />
                                  </FieldWrappers>
                                  {errors.phoneNumber && touched.phoneNumber ? (
                                    <Error>{errors.phoneNumber}</Error>
                                  ) : null}
                                </InputGroup>
                              </Wrapper>

                              <div className="flex mt-8">
                                <button
                                  className="flex items-center justify-center p-3 text-white bg-orange-500 rounded-full shadow-md hover:bg-orange-600"
                                  type="submit"
                                >
                                  <span className="flex items-center">
                                    <span className="font-semibold text-white">
                                      <FaRegEdit className="text-xl text-white" />
                                    </span>
                                  </span>
                                </button>
                                <button
                                  onClick={closeEditInput}
                                  className="flex items-center justify-center p-3 ml-4 text-white rounded-full shadow-md bg-rose-500 hover:bg-orange-600"
                                  type="button"
                                >
                                  <span className="flex items-center">
                                    <span className="font-semibold text-white">
                                      <FaTimes className="text-xl text-white" />
                                    </span>
                                  </span>
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    )}
                    {addNumber === false &&
                      numbers.length < 5 &&
                      editNumber === false && (
                        <button
                          onClick={handleAddNumberInput}
                          className="flex items-center justify-center h-10 px-2 text-base text-white bg-orange-500 rounded hover:bg-orange-600 whitespace-nowrap"
                        >
                          <IoIosAddCircleOutline className="mr-1 text-lg text-white" />
                          <span>Add Test Number</span>
                        </button>
                      )}
                  </div>
                  <div className="mb-4 cols-span-1">
                    <div className="py-3 text-lg font-semibold text-gray-500">
                      {numbers.length === 0 ? "" : "Test Numbers"}
                    </div>
                    <div className="grid justify-center grid-cols-2 gap-4">
                      {numbers.length === 0 && <NotFound />}
                      {numbers.length > 0 &&
                        numbers.map((number, index) => {
                          return (
                            <div key={index} className="col-span-1">
                              <div
                                
                                className="flex items-center justify-between w-full h-20 gap-4 px-3 py-2 bg-white border border-gray-200 rounded-md"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center justify-center w-12 h-12 border border-gray-200 rounded-md shadow-md">
                                    <FaPhoneVolume className="text-2xl text-orange-500" />
                                  </div>
                                  <div className="h-12">
                                    <div className="flex flex-col justify-center ml-2">
                                      <p className="text-lg font-semibold leading-8 text-gray-700">
                                        {`Test-Phone #${index + 1}`}
                                      </p>
                                      <span className="text-gray-400 text-md">
                                        {`( ${number.mobile ?? number} )`}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center h-full gap-3">
                                  <button
                                    onClick={() =>
                                      handleEditNumberInput(number)
                                    }
                                  >
                                    <FaRegEdit className="text-xl text-blue-500" />
                                  </button>
                                  <button onClick={() => handleDelete(number.id)}>
                                    <FaTrash className="text-xl text-rose-600" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </ModalDialog>
    </ModalBackdrop>
  );
};

const NotFound = () => {
  return (
    <div className="body">
      <div className="flex flex-col items-center justify-center py-3 text-lg font-semibold text-gray-500">
        <svg
          fill="#ff8000"
          height="30px"
          width="30px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 490.667 490.667"
        >
          <g>
            <path d="M309.333,85.333h-128c-9.664,0-18.752,4.565-24.981,12.544c-3.605,4.651-2.795,11.349,1.856,14.976 c4.629,3.584,11.328,2.773,14.976-1.856c1.259-1.621,3.989-4.331,8.149-4.331h128c5.888,0,10.667,4.779,10.667,10.667v153.003 c0,5.888,4.779,10.667,10.667,10.667c5.888,0,10.667-4.779,10.667-10.667V117.333C341.333,99.691,326.976,85.333,309.333,85.333z" />
            <path d="M426.176,192.768c-4.608-3.648-11.349-2.795-14.976,1.856c-1.237,1.621-3.989,4.331-8.149,4.331H341.33v-85.335 c0-35.285-28.748-64.002-64-64.002h-128c-35.253,0-64,28.717-64,64.002v192.003c0,5.888-4.779,10.667-10.667,10.667 c-5.888,0-10.667-4.779-10.667-10.667v-85.333H74.624c-5.888,0-10.667-4.779-10.667-10.667v-96c0-5.888,4.779-10.667,10.667-10.667 h85.333V32.003C159.957,14.368,145.6,0,128,0H10.667C4.779,0,0,4.779,0,10.667v469.333C0,475.221,4.779,480,10.667,480h469.333 c5.888,0,10.667-4.779,10.667-10.667v-277.33C490.667,194.539,435.819,207.467,426.176,192.768z" />
          </g>
        </svg>
        <p className="text-lg">No Test Numbers Found</p>
      </div>
    </div>
  );
};

const AlertBadge = () => {
  return (
    <div
      className="flex items-center p-4 mb-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-semibold">Limit Reached!</span> You've reached the
        limit for adding test numbers.
      </div>
    </div>
  );
};

const SuccessAlert = ({ children }) => {
  return (
    <div
      className="relative flex items-start p-4 mb-3 text-green-800 bg-green-100 rounded-lg max-sm:flex-col"
      role="alert"
    >
      <div className="flex items-center max-sm:mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-3 inline w-[18px] fill-green-500"
          viewBox="0 0 512 512"
        >
          <ellipse
            cx="256"
            cy="256"
            fill="#32bea6"
            data-original="#32bea6"
            rx="256"
            ry="255.832"
          />
          <path
            fill="#fff"
            d="m235.472 392.08-121.04-94.296 34.416-44.168 74.328 57.904 122.672-177.016 46.032 31.888z"
            data-original="#ffffff"
          />
        </svg>
        <strong className="text-sm font-bold">Success!</strong>
      </div>

      <span className="block ml-4 mr-8 text-sm max-sm:ml-0 max-sm:mt-2 sm:inline">
        {children}
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute p-2 transition-all -translate-y-1/2 rounded-lg cursor-pointer right-4 top-1/2 w-7 fill-green-500 hover:bg-green-200"
        viewBox="0 0 320.591 320.591"
      >
        <path
          d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
          data-original="#000000"
        />
        <path
          d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
          data-original="#000000"
        />
      </svg>
    </div>
  );
};

const DeleteSuccess = () => {
  return (
    <div
      className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Success</span>
      <div>
        <span className="font-medium">Success!</span> Successfully Deleted the
        Number.
      </div>
    </div>
  );
};

const DeleteError = () => {
  return (
    <div
      className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Error</span>
      <div>
        <span className="font-semibold">Error!</span> Sorry and Error Occurred
        during this process.
      </div>
    </div>
  );
};

const Wrapper = tw.div`grid grid-cols-1 gap-3 w-full mt-4`;
// const BtnWrapper = tw.div`grid grid-cols-1 gap-6 w-full mt-4 justify-end`;
const Error = tw.p`text-red-600 text-xs italic mb-4`;

export default AssignTestNumberModal;
