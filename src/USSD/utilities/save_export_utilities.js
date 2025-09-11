import axios from "axios";
import { showAlert, showSuccessAlert } from "./alert_utilities";
import Config from "Config";

export const exportFlow = async (nodes, edges, user, link) => {
  //* Function to format the question data for the backend
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
    console.log("questionsMap", questionsMap);

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

  const questions = createQuestions(nodes, edges);

  const unstructured_data = sessionStorage.getItem("ussd-storage");
  const shortCode = localStorage.getItem("shortCode");
  const surveyName = localStorage.getItem("surveyTitle");

  try {
    const response = await axios.post(
      `${Config.apiUrl}/ussd/create`,
      {
        survey_name: surveyName,
        short_code: shortCode,
        semi_formatted_data: JSON.stringify(questions),
        raw_data: unstructured_data,
        preview_url: link || "http://google.com",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Token: `${user.token}`,
        },
      }
    );

    if (response.data.status === "success") {
      // localStorage.removeItem("surveyTitle");
      // localStorage.removeItem("shortCode");
      // sessionStorage.removeItem("ussd-storage");

      showSuccessAlert("USSD Survey Upload Successful");
      
    } else {
      console.error("error",response.data);
      showAlert("USSD Survey Upload Failed");
    }
  } catch (err) {
    console.error(err);
    showAlert("USSD Survey Upload Failed");
  }
};
