import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import BackgroundImage from "../../assets/images/network_page.jpg";
import { Box, Container, Text, Flex } from "@radix-ui/themes";
import axios from "axios";
import Config from "Config";
import { useSelector } from "react-redux";

//* initial question
const initialQuestion = {
  text: "Do you want to proceed with the simulation?",
  options: ["1. Yes", "2. No"],
  type: "initial",
};

const customStyles = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
};
const headLine = {
  color: "#ffffff",
  fontSize: "2.5rem",
  fontWeight: "600",
};

const topHeading = {
  color: "#ffffff",
  fontSize: "1.2rem",
  lineHeight: "2.6rem",
  fontWeight: "500",
};

const imageContainer = {
  position: "absolute",
  height: "100%",
  width: "100%",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  zIndex: "-1",
};

const imageStyle = {
  height: "100%",
  width: "100%",
  objectFit: "cover",
};

const screenStyles = {
  width: "90%",
  borderRadius: "16px",
  overflow: "hidden",
  padding: "20px",
  background: "#ffffff",
  boxSizing: "border-box",
  boxShadow: "10px 0 10px 6px rgba(0,0,0,0.2)",
};

const contentStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  background:
    "linear-gradient(135deg, hsla(17, 95%, 50%, 1) 0%, hsla(28, 95%, 58%, 1) 100%)",
};

const inputElement = {
  borderRadius: "5px",
  padding: "10px 12px",
  marginBottom: "20px",
  fontSize: "16px",
  border: "1px solid #ccc",
};

const buttonSubmit = {
  background: "#8E2800",
  color: "#ffffff",
  padding:"10px 15px",
  borderRadius:"10px",
  fontSize:"16px",
  marginTop:"10px",
};

const inputStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
};

const buttonStyle = {
  padding: "10px 40px",
  border: "none",
  background: "#F74C06",
  color: "white",
  textAlign: "center",
  borderRadius: "3px",
};
const errorMessageStyle = {
  position: "absolute",
  bottom: "0px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#e44e4e",
  color: "#ffffff",
  padding: "20px",
  borderRadius: "5px",
  width: "100%",
  textAlign: "center",
  fontSize: "1.15rem",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};
const ShareablePreview = () => {
  const location = useLocation();
  const { encoded_id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentContent, setCurrentContent] = useState(initialQuestion);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [zoom, setZoom] = useState(1);

  //* Fetch the corresponding data associated to the encoded ui
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${Config.apiUrl}/ussd/get/${encoded_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.data);
        const data = response.data.data;
        const dataParts = data.split("state=");
        const state = dataParts[1];
        const decodedData = decodeURIComponent(state);
        const stateParse = JSON.parse(decodedData);
        console.log("state", stateParse);
        setQuestions(stateParse);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("done");
      }
    };

    fetchQuestions();
  }, [encoded_id]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const state = query.get("state");
    if (state) {
      const parsedState = JSON.parse(decodeURIComponent(state));
      setQuestions(parsedState);
    }
  }, [location.search]);

  useEffect(() => {
    const updateZoom = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const newZoom = Math.min(screenWidth / 460, screenHeight / (900 * 0.98));
      setZoom(newZoom);
    };
    updateZoom();
    window.addEventListener("resize", updateZoom);
    return () => {
      window.removeEventListener("resize", updateZoom);
    };
  }, []);

  const findQuestionById = (id) => {
    return questions.find((question) => question.id === id);
  };

  const handleNext = () => {
    if (!inputValue.trim()) {
      setError("Input cannot be empty. Please enter a valid response.");
      return;
    }

    if (currentContent.type === "initial") {
      if (inputValue === "1") {
        setError("");
        setHistory([currentContent]);
        setCurrentContent({
          text: questions[0].text,
          options: questions[0].answers.map(
            (a, index) => `${index + 1}. ${a.text}`
          ),
          type: questions[0].answers.length > 1 ? "question" : "question_free",
          nextNodes: questions[0].answers.map((a) => a.next),
        });
      } else if (inputValue === "2") {
        setError("");
      } else {
        setError("Invalid input. Please enter a valid option (1 or 2).");
      }
    } else if (
      currentContent.type === "question" ||
      currentContent.type === "question_free"
    ) {
      let selectedIndex;

      if (inputValue === "0" && history.length > 0) {
        const previousContent = history.pop();
        setCurrentContent(previousContent);
        setHistory([...history]);
        setInputValue("");
        setError("");
        return;
      } else if (currentContent.type === "question_free") {
        selectedIndex = 0;
      } else if (!isNaN(parseInt(inputValue, 10))) {
        selectedIndex = parseInt(inputValue, 10) - 1;
        if (
          selectedIndex < 0 ||
          selectedIndex >= currentContent.options.length
        ) {
          setError(
            "Invalid input. Please enter a number corresponding to one of the options."
          );
          return;
        }
      } else {
        setError(
          "Invalid input. Please enter a number corresponding to one of the options."
        );
        return;
      }

      const nextNodeId = currentContent.nextNodes[selectedIndex];

      if (nextNodeId) {
        const nextQuestion = findQuestionById(nextNodeId);
        if (nextQuestion) {
          setHistory([...history, currentContent]);
          setCurrentContent({
            text: nextQuestion.text,
            options: nextQuestion.answers.map(
              (a, index) => `${index + 1}. ${a.text}`
            ),
            type:
              nextQuestion.answers.length > 1 ? "question" : "question_free",
            nextNodes: nextQuestion.answers.map((a) => a.next),
          });
          setError("");
        } else {
          setCurrentContent({
            text: "There was an issue loading the next question. Please try again later.",
            type: "error",
          });
        }
      } else {
        setError("");
        setCurrentContent({
          text: "Thank you for completing the survey!",
          type: "end",
        });
      }
    }
    setInputValue("");
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = days[now.getDay()];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[now.getMonth()];

    const formattedDate = `${weekday}, ${now.getDate()} ${month} ${now.getFullYear()}`;

    return formattedDate;
  };

  console.log("questions", questions);

  const title = "Why Customize Your USSD Menu with Adsevo?";

  const subWording = `Transform the way you engage with your audience by creating a personalized USSD 
    menu tailored to your unique needs. With Adsevo, our intuitive USSD Menu Builder
    empowers you to design and deploy USSD menus effortlessly`;

  return (
    <Box style={customStyles}>
      <div style={imageContainer}>
        <img style={imageStyle} src={BackgroundImage} alt="background-image" />
      </div>
      <Container size={1}>
        <div className="flex items-center mx-auto sm:h-full lg:w-full md:full">
          <div className="h-full w-[600px] sm:w-[300px] md:w-[450px] mx-auto flex justify-start items-center">
            <DeviceFrameset
              device="iPhone X"
              color="gold"
              height={812}
              width={375}
              zoom={zoom}
            >
              <div style={contentStyle}>
                <div
                  style={{
                    marginBottom: "30px",
                    position: "absolute",
                    top: "30px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "5rem",
                      fontWeight: "bold",
                      color: "#000000",
                      textAlign: "center",
                      marginBottom: "5px",
                    }}
                  >
                    {getCurrentTime()}
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#000000",
                      textAlign: "center",
                    }}
                  >
                    {getCurrentDateTime()}
                  </div>
                </div>
                <div style={screenStyles}>
                  <p style={{ fontSize: "1.04rem", fontWeight: "bold" }}>
                    {currentContent.text}
                  </p>
                  {currentContent.options &&
                    currentContent.options.length > 1 && (
                      <ul>
                        {currentContent.options.map((option, index) => (
                          <li
                            style={{
                              fontSize: "18px",
                              fontWeight: "500",
                              listStyle: "none",
                            }}
                            key={index}
                          >
                            {option}
                          </li>
                        ))}
                        {currentContent.type !== "initial" &&
                          currentContent.type !== "end" && (
                            <li
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                listStyle: "none",
                              }}
                            >
                              0. Back
                            </li>
                          )}
                      </ul>
                    )}
                  <div style={inputStyle}>
                    {currentContent.options &&
                      currentContent.options.length > 0 && (
                        <input
                          className="mt-2 focus:border-orange-600"
                          style={inputElement}
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                      )}
                    {currentContent.options &&
                      currentContent.options.length > 0 && (
                        <button style={buttonSubmit} onClick={handleNext}>
                          Send
                        </button>
                      )}
                    {currentContent.type === "end" && (
                      <button
                        style={buttonSubmit}
                        onClick={() => {
                          setCurrentContent(initialQuestion);
                        }}
                      >
                        End
                      </button>
                    )}
                  </div>
                </div>
                {error && <div style={errorMessageStyle}>{error}</div>}
              </div>
            </DeviceFrameset>
          </div>
          <div className="w-[800px] h-full ">
            <Text style={topHeading}>ADSEVO USSD MENU BUILDER</Text>
            <Box mb={"10px"} mt={"10px"}>
              <div
                style={{
                  background: "#F74C06",
                  height: "5px",
                  borderRadius: "5px",
                  width: "100px",
                  borderBottom: "1px solid #000000",
                  marginTop: "20px",
                }}
              ></div>
            </Box>
            <div className="w-full text-white">
              <div>
                <Text style={headLine}>{title}</Text>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {subWording}
                </h3>
              </div>
              <Box mt={"50px"}>
                <Link style={buttonStyle} to="/register">
                  Build Your Own USSD Menu
                </Link>
              </Box>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default ShareablePreview;
