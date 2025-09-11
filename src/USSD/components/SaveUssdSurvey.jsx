import React, { useState } from "react";
import axios from "axios";
import Config from "Config";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../utilities/alert_utilities";
import Loading from "components/Loading";
import { useSelector } from "react-redux";

const ConfirmationModal = ({
  isOpen,
  onCancel,
  nodes,
  edges,
  shareableLink,
  setConfirmModalOpen,
}) => {
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.UserReducer.user);

  function createQuestions(nodes, edges) {
    const questionsMap = {};

    // First pass: Create question entries in the map
    nodes.forEach((node) => {
      if (node.type === "questionNode") {
        questionsMap[node.id] = {
          id: node.id,
          text: node.data.text,
          answers: [],
        };
      }
    });

    // Second pass: Populate answers for each question
    edges.forEach((edge) => {
      if (questionsMap[edge.source]) {
        const question = questionsMap[edge.source];
        const answerNode = nodes.find((node) => node.id === edge.target);
        if (answerNode) {
          const answer = {
            text:
              answerNode.type === "answerNode"
                ? answerNode.data.text
                : `free_text_${answerNode.id}`,
            next: null,
            id: answerNode.id,
          };
          question.answers.push(answer);
        }
      }
    });

    // Third pass: Link answers to next questions
    edges.forEach((edge) => {
      const sourceNode = nodes.find((node) => node.id === edge.source);
      const targetQuestion = questionsMap[edge.target];
      if (sourceNode && targetQuestion) {
        Object.values(questionsMap).forEach((question) => {
          question.answers.forEach((answer) => {
            if (answer.id === sourceNode.id) {
              answer.next = targetQuestion.id;
            }
          });
        });
      }
    });

    return Object.values(questionsMap);
  }

  const navigate = useNavigate();

  const questions = createQuestions(nodes, edges);

  const unstructured_data = localStorage.getItem("ussd-storage");
  const surveyName = localStorage.getItem("surveyTitle");

  const submitUssdSurvey = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${Config.apiUrl}/ussd/create`,
        {
          survey_name: surveyName,
          semi_formatted_data: JSON.stringify(questions),
          raw_data: unstructured_data,
          preview_data: shareableLink,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: user.token,
          },
        }
      );

      if (response.data.data.status === "success") {
        setLoading(false);
        localStorage.removeItem("surveyTitle");
        localStorage.removeItem("shortCode");
        localStorage.removeItem("ussd-storage");

        navigate("/ussd-survey");
      } else {
        setLoading(false);
        console.error("error", response.data.data.status);
        showAlert("USSD Survey Upload Failed");
      }
    } catch (error) {
      setLoading(false);
      setConfirmModalOpen(false);
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="fixed inset-0 z-[1000] flex h-full w-full flex-wrap items-center justify-center overflow-auto p-4 font-[sans-serif] before:fixed before:inset-0 before:h-full before:w-full before:bg-[rgba(0,0,0,0.5)]">
          <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
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

            <div className="my-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline w-14 fill-orange-500"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"
                />
              </svg>

              <h4 className="mt-4 text-base font-semibold text-gray-800">
                Are you sure you want to save it?
              </h4>

              <div className="mt-8 space-x-4 text-center">
                <button
                  onClick={onCancel}
                  type="button"
                  className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 active:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitUssdSurvey}
                  className="rounded-lg bg-orange-600 px-4 py-2 text-sm text-white hover:bg-orange-700 active:bg-orange-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
