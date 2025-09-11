import React, { useState } from "react";
import axios from "axios";
import Config from "Config";
import { useNavigate } from "react-router-dom";
import Loading from "components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Remove_User } from "../../Redux/actions";

const ChangePasswordConfirmation = ({
  isOpen,
  onCancel,
  setConfirmModalOpen,
  payload,
  setTab,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentPassword, newPassword } = payload;

  const logout = () => dispatch(Remove_User());

  const user = useSelector((state) => state.UserReducer.user);

  const changePasswordSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${Config.apiUrl}/changepassword`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: user.token,
          },
        }
      );
      console.log("response", response.status);

      if (response.status === 200) {
        setLoading(false);
        logout();
      } else {
        setLoading(false);
        setConfirmModalOpen(false);
        setTab(4);
        toast.error("Sorry, An Occurred");
      }
    } catch (error) {
      setLoading(false);
      setTab(4);
      setConfirmModalOpen(false);
      console.log(error);
      toast.error("Sorry, An Occurred");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[1000] flex h-full w-full flex-wrap items-center justify-center overflow-auto p-4 font-[sans-serif] before:fixed before:inset-0 before:h-full before:w-full before:bg-[rgba(0,0,0,0.5)]">
        <div className="relative w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
          <button className="flex justify-end w-full" onClick={onCancel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="float-right w-3.5 shrink-0 cursor-pointer fill-gray-400 hover:fill-red-500"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>

          {loading ? (
            <Loading />
          ) : (
            <div className="my-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline w-14 fill-orange-500"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15 3H6C5.44772 3 5 3.44772 5 4V20C5 20.5523 5.44772 21 6 21H15C15.5523 21 16 20.5523 16 20C16 19.4477 15.5523 19 15 19H7V5H15C15.5523 5 16 4.55228 16 4C16 3.44772 15.5523 3 15 3ZM19.7071 12.7071C19.3166 13.0976 18.6834 13.0976 18.2929 12.7071L15.2929 9.70711C14.9024 9.31658 14.9024 8.68342 15.2929 8.29289L18.2929 5.29289C18.6834 4.90237 19.3166 4.90237 19.7071 5.29289C20.0976 5.68342 20.0976 6.31658 19.7071 6.70711L17.4142 9L22 9C22.5523 9 23 9.44772 23 10C23 10.5523 22.5523 11 22 11H17.4142L19.7071 13.2929C20.0976 13.6834 20.0976 14.3166 19.7071 14.7071Z"
                />
              </svg>

              <h4 className="mt-4 text-base font-semibold text-gray-800">
                You are going to be logged out of the Platform. Do you want to
                proceed?
              </h4>

              <div className="mt-8 space-x-4 text-center">
                <button
                  onClick={onCancel}
                  type="button"
                  className="px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={changePasswordSubmit}
                  className="px-4 py-2 text-sm text-white bg-orange-600 rounded-lg hover:bg-orange-700 active:bg-orange-600"
                >
                  Proceed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangePasswordConfirmation;
