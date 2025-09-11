import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import tw from "tailwind-styled-components";
import { FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa"; // Importing icons
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Config from "Config";
import Loading from "components/Loading";
import Images from "Images";

const PersonalInfo = ({ user }) => {
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchFunction = async () =>
    await axios.get(`${Config.apiUrl}/profile/get/info`, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user?.token}`,
      },
    });

  const getListSuccess = (data) => {
    setProfileData(data?.data);
    setGotInitialResp(true);
  };

  const getListError = () => {
    setGotInitialResp(true);
  };

  const { isLoading, mutate: getListMutate } = useMutation(fetchFunction, {
    onSuccess: getListSuccess,
    onError: getListError,
  });

  const updateUserDetails = async (values) => {
    setIsUpdating(true);
    await axios.post(`${Config.apiUrl}/profile/edit/user`, values, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user?.token}`,
      },
    });
  };

  const updateSuccess = () => {
    setIsUpdating(false);
    getListMutate();
    toast.success("Details updated successfully");
  };

  const updateError = () => {
    setIsUpdating(false); // Stop loading state
    getListMutate();
    toast.error("Something went wrong");
  };

  const { mutate: updateMutate } = useMutation(updateUserDetails, {
    onSuccess: updateSuccess,
    onError: updateError,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      getListMutate();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [getListMutate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profileData?.name || "",
      email: profileData?.email || "",
      phone: profileData?.phone || "",
    },
    onSubmit: (values) => {
      console.log("Form values", values);
      updateMutate(values);
    },
  });

  if (isLoading && !gotInitialResp) {
    return <Loading />;
  }

  if (isUpdating) {
    return <Loading />;
  }

  if (!isLoading && gotInitialResp) {
    return (
      <PersonalInfoContainer>
        <DescriptionContainer>
          <ProfileCard
            name={profileData?.name}
            company_name={profileData?.company_name}
            phone={profileData?.phone}
            email={profileData?.email}
          />
        </DescriptionContainer>
        <FormContainer>
          <form onSubmit={formik.handleSubmit} className="w-full">
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <InputWrapper>
                <IconWrapper>
                  <FaUser className="text-gray-500" />
                </IconWrapper>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="Enter your name"
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <InputWrapper>
                <IconWrapper>
                  <FaEnvelope className="text-gray-500" />
                </IconWrapper>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Enter your email"
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <InputWrapper>
                <IconWrapper>
                  <FaPhoneAlt className="text-gray-500" />
                </IconWrapper>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  maxLength={12}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  placeholder="Enter your phone number"
                />
              </InputWrapper>
            </FormGroup>
            <Button type="submit">Save Changes</Button>
          </form>
        </FormContainer>
      </PersonalInfoContainer>
    );
  }
};

const ProfileCard = ({ name, phone, email, company_name }) => {
  return (
    <div className="flex h-[300px] my-10 w-full px-10 items-center justify-center">
      <div className="px-6 py-3 bg-white rounded-lg shadow-xl">
        <div className="p-2 photo-wrapper">
          <img
            className="w-32 h-32 mx-auto rounded-full"
            src={Images.avatar_placeholder}
            alt="John Doe"
          />
        </div>
        <div className="p-2">
          <h3 className="text-xl font-bold leading-8 text-center text-gray-800">
            {name}
          </h3>
          <div className="text-lg font-semibold text-center text-gray-400">
            <p>{company_name}</p>
          </div>
          <table className="my-3 text-md">
            <tbody>
              <tr>
                <td className="px-2 py-2 font-semibold text-gray-500">Phone</td>
                <td className="px-2 py-2">{phone}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 font-semibold text-gray-500">Email</td>
                <td className="px-2 py-2">{email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Styled Components
const PersonalInfoContainer = tw.section`flex flex-col md:flex-row justify-between items-start gap-6 w-full h-fit p-6`;
const DescriptionContainer = tw.div`flex-[1] flex flex-col items-start gap-3`;
const FormContainer = tw.div`flex-[2] flex flex-col items-start gap-3`;

const FormGroup = tw.div`mb-4 w-full`;
const Label = tw.label`block text-gray-700 font-semibold mb-1`;

const InputWrapper = tw.div`relative w-full mb-6`;
const IconWrapper = tw.div`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none`;
const Input = tw.input`block w-full rounded-lg border-2 border-gray-300 bg-gray-10 p-2.5 pl-12 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-500 dark:focus:ring-orange-500`;

const Button = tw.button`bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 mt-4`;

export default PersonalInfo;
