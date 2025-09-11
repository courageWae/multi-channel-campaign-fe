import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import tw from "tailwind-styled-components";
import {
  Page,
  Container,
  Content,
  LearnMoreLink,
  ContentHeader,
  HeaderTitle,
} from "../../components/Styles/PageStyles";
import TopNavbar from "components/TopNavbar";
import {
  FaRegBookmark,
  FaRegImage,
  FaRegThumbsUp,
  FaTimesCircle,
} from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { PiShareFat } from "react-icons/pi";
import { useSelector } from "react-redux";
import Images from "../../Images";
import { Link, useNavigate } from "react-router-dom";
import SendCampaign from "components/Campaign/SendCampaign";
import { toast } from "react-toastify";
import axios from "axios";
import Config from "../../Config";
import { useMutation } from "react-query";
import { IoMdHelpCircle } from "react-icons/io";
import { IoReloadSharp } from "react-icons/io5";
import { IoEarth } from "react-icons/io5";
import { MdOutlineMoreHoriz, MdOutlineClose } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import ExpandPreview from "components/FbPost/ExapandPreview";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { InputGroup, Label } from "components/Styles/InputStyles";
import { MdOutlineCopyAll } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { TbMessageCircle } from "react-icons/tb";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import NoPermissionModal from "components/NoPermission";

const PostContainer = tw.div`bg-white h-[26rem] overflow-y-auto border border-gray-200 rounded-lg shadow-lg lg:w-2/3 md:w-1/2 w-full`;
const Header = tw.div`flex items-center space-x-2 mb-4 px-4 pt-4`;
const AvatarContainers = tw.div`w-10 h-10 bg-blue-300 rounded-full flex items-center text-lg justify-center text-[#075CE5] font-semibold`;
const AvatarContainer = tw.div`w-10 h-10 rounded-full flex items-center justify-center relative`;
const Username = tw.div`font-semibold text-gray-900`;
const TextArea = tw.textarea`w-full p-2 rounded-lg mb-12 `;
const Footer = tw.div`flex justify-end items-center mt-2 pr-4 border-t border-gray-200`;
const DropzoneContainer = tw.div`flex w-full h-28 items-center p-4 border-2 border-dotted border-gray-300 hover:border-blue-500 rounded mb-4 text-center`;
const DropzoneText = tw.div`flex-1 text-gray-600 text-base`;
const Button = tw.button`text-white bg-orange-500 hover:bg-orange-600 px-8 flex items-center space-x-1 justify-center h-10 text-base whitespace-nowrap rounded transition-colors duration-300 ${(
  props
) => (props.disabled ? "bg-gray-400 cursor-not-allowed" : "")}`;
const PreviewImage = tw.img`w-full h-28 object-cover rounded mb-4`;
const InstaPreviewImage = tw.img`w-full h-full object-cover`;
const AvatarContainerSkeleton = tw.div`w-10 h-10 bg-gray-200 rounded-full flex items-center`;
const Skeleton = tw.div`bg-gray-200 h-3 w-1/2 rounded mb-2 animate-pulse`;
const AiWrap = tw.div`border-t border-gray-200 mt-2 py-1 px-4`;
const AiButton = tw.button`flex items-center text-gray-600 hover:text-black space-x-1 justify-center h-10 text-base whitespace-nowrap rounded transition-colors duration-300`;

const CreateInstaPost = () => {
  const [images, setImages] = useState([]);
  const [postText, setPostText] = useState("");
  const user = useSelector((state) => state.UserReducer.user);
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [expandModel, setExpandModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [aiContent, setAiContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [contentText, setContentText] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canCreate, setCanCreate] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Config.apiUrl}/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Token: user?.token,
          },
        });

        const { data } = response;
        if (isMounted && data) {
          console.log("dashboardData", data);
          
          //* STORE THE PERMISSIONS
          setDashboardData((data?.data?.permissions));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (user?.token) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [user?.token]);
  
  useEffect(() => {
    const permissions = dashboardData ? dashboardData.split(",") : [];
    console.log("social_permissions", permissions)

    if (
      (permissions.includes(Config.Permissions.SOCIAL) &&
        user?.type === Config.UserType.ClientUser) ||
      user?.type === Config.UserType.SuperAdminUser ||
      user?.type === Config.UserType.CommercialAdminUser ||
      user?.type === Config.UserType.FinanceAdminUser
    ) {
      setCanCreate(true);
    } else {
      setCanCreate(false);
    }
  }, [user, dashboardData]);

  const handleImageClicks = (index) => {
    setCurrentImageIndex(index);
  };
  const AvatarUser = ({ user }) => {
    const firstLetter = user.name.charAt(0).toUpperCase();
    return (
      <AvatarContainers>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-full"
          />
        ) : (
          firstLetter
        )}
      </AvatarContainers>
    );
  };

  const mockUser = {
    instagram: "./images/instagram-icon.jpg",
  };

  const Avatar = ({ user }) => {
    const [selectedFacebook, setSelectedFacebook] = useState(null);
    const [isInstagramSelected, setIsInstagramSelected] = useState(false);

    const handleInstagramSelection = () => {
      setIsInstagramSelected(!isInstagramSelected);
    };

    return (
      <div
        className={`flex gap-2  ${
          openUploadModel ? "blur-effect pointer-events-none" : ""
        }`}
      >
        <AvatarContainer
          className={`avatar ${isInstagramSelected ? "instaselected" : ""}`}
          onClick={handleInstagramSelection}
        >
          <img src={user.instagram} alt="Instagram" />
        </AvatarContainer>
      </div>
    );
  };
  const isAspectRatioValid = (width, height) => {
    const aspectRatio = width / height;
    return aspectRatio >= 0.8 && aspectRatio <= 1.91;
  };
  const [error, setError] = useState("");
  const onDrop = useCallback(
    (acceptedFiles) => {
      const validImages = [];
      const errors = [];
      const totalImages = images.length + acceptedFiles.length;

      if (totalImages > 10) {
        setError("You can only upload up to 10 images.");
        return;
      }

      let filesProcessed = 0;

      acceptedFiles.forEach((file) => {
        const isDuplicate = images.some(
          (img) => img.name === file.name && img.size === file.size
        );

        if (isDuplicate) {
          errors.push(`${file.name} is already uploaded`);
          filesProcessed++;
          if (filesProcessed === acceptedFiles.length) {
            setError(errors.join(", "));
          }
          return;
        }

        if (file.size > 10 * 1024 * 1024) {
          errors.push(`${file.name} is larger than 10MB`);
          filesProcessed++;
          if (filesProcessed === acceptedFiles.length) {
            setImages((prevImages) => [...prevImages, ...validImages]);
            setError(errors.join(", "));
          }
        } else {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = () => {
            if (isAspectRatioValid(img.width, img.height)) {
              validImages.push(Object.assign(file, { preview: img.src }));
            } else {
              errors.push(
                `${file.name} does not have an acceptable aspect ratio (4:5 to 1.91:1)`
              );
            }
            filesProcessed++;
            if (filesProcessed === acceptedFiles.length) {
              setImages((prevImages) => [...prevImages, ...validImages]);
              setError(errors.join(", "));
            }
          };
        }
      });
    },
    [images]
  );

  // const onDrop = useCallback((acceptedFiles) => {
  //   setImages((prevImages) => [
  //     ...prevImages,
  //     ...acceptedFiles.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     ),
  //   ]);
  // }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleContentChange = (e) => {
    setContentText(e.target.value);
  };

  const handleRemoveImage = (image) => {
    setImages((prevImages) => prevImages.filter((img) => img !== image));
  };
  const handleImageClick = (image) => {
    setSelectedImage(image.preview);
  };
  // start

  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  // end

  const ScheduleFunction = async (values) => {
    return await axios.post(`${Config.apiUrl}/create/fb/post`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };

  const scheduleSuccess = (data) => {
    navigate("/campaign/sms");
    setOpenUploadModel(false);
    toast.success(data?.data?.msg || "Success");
  };

  const scheduleError = (data) => {
    setOpenUploadModel(false);
    toast.error(data?.response?.data?.msg || "An Error Occurred");
  };

  const { isLoading: scheduleLoading, mutate: ScheduleMutate } = useMutation(
    ScheduleFunction,
    {
      onSuccess: scheduleSuccess,
      onError: scheduleError,
    }
  );

  const isShareDisabled = postText.trim().length === 0 && images.length === 0;

  const GenerateFunction = async (values) => {
    return await axios.post(`${Config.apiUrl}/generate`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };

  const generateSuccess = (data) => {
    // toast.success(data?.data?.msg || "Success");
  };

  const generateError = (data) => {
    // toast.error(data?.response?.data?.msg || "Error");
  };

  const {
    isLoading: generateLoading,
    mutate: GenerateMutate,
    data,
  } = useMutation(GenerateFunction, {
    onSuccess: generateSuccess,
    onError: generateError,
  });
  const aiContentapi = data?.data?.data?.msg;
  const handleAiButtonClick = () => {
    setShowAiAssistant(!showAiAssistant);
  };

  const handleGenerateAiContent = () => {
    GenerateMutate({
      contentText: contentText,
    });
    setAiContent(
      "Every day is a new opportunity to make a difference. #positivity #motivation"
    );
  };

  const handleInsertAiContent = () => {
    setPostText(aiContent);
    setShowAiAssistant(false);
  };

  const handleCopyAiContent = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(aiContent)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = aiContent;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const renderPostTextWithHashtags = (text) => {
    const hashtagRegex = /(#\w+)/g;
    const parts = text.split(hashtagRegex);

    return parts.map((part, index) => {
      if (hashtagRegex.test(part)) {
        return (
          <span key={index} className="text-blue-500">
            {part}
          </span>
        );
      }
      return part;
    });
  };
  return (
    <Container>
      <Page>
        <TopNavbar />
        <Content>
          {!canCreate && !loading && (
            <NoPermissionModal isOpen={true} planType={user?.planType} />
          )}
          <ContentHeader>
            <div className="flex items-center justify-between">
              <HeaderTitle>Create Instagram Post</HeaderTitle>
            </div>
            <LearnMoreLink>
              <Link to="" className="flex items-center gap-1">
                <p className="underline hover:text-topBar-purple">
                  Why is it necessary to manually enter a message for Instagram?
                </p>
                <img src={Images.ShareIcon} alt="Share" />
              </Link>
            </LearnMoreLink>
          </ContentHeader>

          <div
            className={`${
              openUploadModel ? "flex" : "hidden"
            } h-screen w-screen bg-black/30 backdrop-blur-sm  fixed inset-0 transition-all duration-400 ease-in-out`}
          />

          <div
            className={`${
              openUploadModel ? "translate-x-0" : "translate-x-full"
            } fixed h-screen right-0 top-0 transition-all duration-300 ease-in-out bg-white flex items-start rounded-l-2xl overflow-hidden w-1/3 justify-start z-50`}
          >
            <SendCampaign
              setOpenUploadModel={setOpenUploadModel}
              ScheduleMutate={ScheduleMutate}
              scheduleLoading={scheduleLoading}
              postText={postText}
              images={images}
            />
          </div>

          {expandModel && (
            <ExpandPreview
              setExpandModel={setExpandModel}
              images={images}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
            />
          )}
          <div className="flex flex-col space-x-4 md:flex-row">
            <PostContainer>
              <Header>
                <Avatar user={mockUser} />
                {/* <Username>{user.name}</Username> */}
              </Header>
              <div className="h-[16rem] overflow-y-auto border border-gray-200 m-4 rounded">
                <div className="px-2">
                  <TextArea
                    placeholder="Enter your post caption here..."
                    value={postText}
                    onChange={handleTextChange}
                  />
                </div>
                <div className="grid items-center grid-cols-1 gap-2 px-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
                  {images.map((image) => (
                    <div
                      key={image.name}
                      className={`relative${
                        openUploadModel ? "blur-effect pointer-events-none" : ""
                      }`}
                    >
                      <PreviewImage
                        src={image.preview}
                        alt="Image preview"
                        onClick={() => {
                          setExpandModel(true);
                          handleImageClick(image);
                        }}
                        className="cursor-pointer"
                      />
                      <button
                        className="absolute p-1 rounded-full -top-2 -right-2"
                        onClick={() => handleRemoveImage(image)}
                      >
                        <FaTimesCircle className="w-4 h-4 text-gray-600 bg-white rounded-full hover:text-red-600" />
                      </button>
                    </div>
                  ))}
                  <DropzoneContainer {...getRootProps()}>
                    <input {...getInputProps()} />
                    <DropzoneText>
                      <span className="flex justify-center">
                        <FaRegImage className="w-6 h-6" />
                      </span>
                      Drag & drop or
                      <span className="text-blue-500"> select files</span>
                    </DropzoneText>
                  </DropzoneContainer>
                </div>
                {error && <p className="px-4 text-red-500">{error}</p>}
                <AiWrap>
                  <AiButton onClick={handleAiButtonClick}>
                    <FaWandMagicSparkles className="mr-1.5" />
                    AI Assistant
                  </AiButton>
                </AiWrap>
              </div>
              <Footer>
                <Button
                  className="rounded-xl mt-3.5"
                  type="button"
                  onClick={() => setOpenUploadModel(true)}
                  disabled={isShareDisabled}
                >
                  <p className="font-semibold">Schedule</p>
                </Button>
              </Footer>
            </PostContainer>

            <div className="w-full lg:w-1/3 md:w-1/2 h-[26rem]  bg-white border border-gray-200  rounded-lg shadow-lg">
              {showAiAssistant ? (
                <>
                  <div className="h-[22rem] overflow-y-auto p-4">
                    <div className="flex justify-between">
                      <h3 className="flex items-center mb-6 text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-700">
                        <FaWandMagicSparkles className="mr-1.5 text-purple-500" />
                        AI Assistant
                      </h3>
                      <RxCrossCircled
                        className="w-5 h-5"
                        onClick={() => setShowAiAssistant(false)}
                      />
                    </div>
                    {!aiContent && (
                      <>
                        <InputGroup>
                          <Label>What do you want to write about?</Label>

                          <TextArea
                            placeholder="Enter keyword..."
                            className="p-2 border border-gray-300 rounded h-28"
                            value={contentText}
                            onChange={handleContentChange}
                          />
                        </InputGroup>
                        <p className="mt-1 text-sm text-gray-500">
                          <span className="font-semibold text-black">
                            Pro tip:
                          </span>{" "}
                          Include key points, your target audience and your
                          desired outcome for this post
                        </p>
                        <div className="flex justify-end">
                          <button
                            onClick={handleGenerateAiContent}
                            className={`text-white bg-gradient-to-r from-purple-500 to-purple-700 px-4 py-2 mt-2 rounded-lg ${
                              contentText === "" || generateLoading
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={contentText === "" || generateLoading}
                          >
                            <div className="flex items-center">
                              {generateLoading ? (
                                <span>Loading...</span>
                              ) : (
                                <>
                                  <FaWandMagicSparkles className="mr-1.5 mt-1" />{" "}
                                  Generate
                                </>
                              )}
                            </div>
                          </button>
                        </div>
                      </>
                    )}
                    {aiContent && (
                      <div>
                        <InputGroup>
                          <Label>What do you want to write about?</Label>
                          <div className="relative">
                            <input
                              placeholder="Enter keyword..."
                              className="w-full p-2 pr-10 border border-gray-300 rounded"
                              value={contentText}
                              readOnly
                            />
                            <button
                              className="absolute text-gray-400 transform -translate-y-1/2 top-1/2 right-2 hover:text-gray-600"
                              onClick={() => setAiContent("")}
                              title="Clear"
                            >
                              <MdOutlineClose className="w-4 h-4" />
                            </button>
                          </div>
                        </InputGroup>
                        <div className="p-3 mt-4 rounded bg-gradient-to-r from-purple-100 to-purple-200">
                          <p className="mb-2 text-gray-900">{aiContent}</p>
                          <div className="flex items-center justify-between mt-3 space-x-2">
                            <div>
                              <button
                                title="Copy Text"
                                onClick={handleCopyAiContent}
                              >
                                {isCopied ? (
                                  "Copied"
                                ) : (
                                  <MdOutlineCopyAll className="w-6 h-6 text-gray-600 hover:text-black" />
                                )}
                              </button>
                            </div>
                            <div className="flex">
                              <button
                                onClick={handleGenerateAiContent}
                                className="flex mr-2 font-semibold text-gray-600 hover:text-black"
                              >
                                <IoReloadSharp className=" mt-1.5 mr-1" />
                                Retry
                              </button>
                              <button
                                onClick={handleInsertAiContent}
                                className="h-8 px-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                              >
                                Insert
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 border-t border-gray-200">
                    <div className="flex p-4 text-sm text-gray-500">
                      <IoMdHelpCircle className="w-5 h-5 mr-2 " />
                      Need tips on writing better prompts?{" "}
                      <span className="ml-1 text-blue-500">See tips.</span>
                    </div>
                  </div>
                </>
              ) : images.length > 0 ? (
                <div className="h-[26rem] overflow-y-auto">
                  <h3 className="flex items-center p-4 mb-2 font-semibold text-gray-900">
                    Instagram Preview{" "}
                    <IoMdInformationCircleOutline className="ml-1 text-gray-400" />
                  </h3>
                  <div className="mx-4 mb-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-2">
                        <AvatarUser user={user} />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                      <MdOutlineMoreHoriz className="w-6 h-6" />
                    </div>

                    <InstaPreviewImage
                      src={images[currentImageIndex].preview}
                      alt="Image preview"
                    />
                    <div className="flex justify-center w-full py-1 space-x-1">
                      {images.map((_, index) => (
                        <span
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full ${
                            currentImageIndex === index
                              ? "bg-black"
                              : "bg-gray-400"
                          }`}
                          onClick={() => handleImageClicks(index)}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between px-2 pb-1 my-2">
                      <div className="flex space-x-4">
                        <GoHeart className="w-5 h-5 text-gray-500" />
                        <TbMessageCircle className="w-5 h-5 text-gray-500" />
                        <PiPaperPlaneTiltBold className="w-5 h-5 text-gray-500" />
                      </div>
                      <FaRegBookmark className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="px-2 pb-1">
                      <div className="flex flex-col">
                        <div className="flex flex-wrap items-baseline">
                          <p className="mr-2 text-base font-semibold">
                            {user.name}{" "}
                            <span className="text-gray-900 text-[0.92rem] font-normal">
                              {renderPostTextWithHashtags(postText)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start h-full p-4">
                  <h3 className="flex items-center mb-2 font-semibold text-gray-900">
                    Instagram Preview{" "}
                    <IoMdInformationCircleOutline className="ml-1 text-gray-400" />
                  </h3>
                  <div className="mx-auto my-auto">
                    <img src={Images.FacebookPreview} alt="Facebook Preview" />
                    <p className="text-sm font-semibold text-center text-gray-500">
                      See your post's preview here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Content>
      </Page>
    </Container>
  );
};

export default CreateInstaPost;
