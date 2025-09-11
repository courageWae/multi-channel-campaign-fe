import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlowProvider,
} from "reactflow";

import StartSurvey from "USSD/nodes_library/StartSurvey";
import TitleNode from "USSD/nodes_library/TitleNode";
import QuestionNode from "USSD/nodes_library/QuestionNode";
import AnswerNode from "USSD/nodes_library/AnswerNode";
import EndSurvey from "USSD/nodes_library/EndSurvey";
import FreeTextAnswerNode from "USSD/nodes_library/FreeTextAnswerNode";

import Sidebar from "USSD/components/WidgetBar";
import PropertiesBar from "USSD/components/PropertiesBar";

import { onDropNode, onDragOver } from "USSD/utilities/drag_utilities";
import "reactflow/dist/style.css";

import useStore from "./store";
import { useShallow } from "zustand/react/shallow";
import { Toaster } from "react-hot-toast";
import { exportFlow } from "USSD/utilities/save_export_utilities";

import MobilePreviewModal from "USSD/components/Mobile/MobilePreviewModal";
import { Box, Button, Flex } from "@radix-ui/themes";

import {
  EyeOpenIcon,
  Share1Icon,
  ThickArrowLeftIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { showSuccessAlert } from "USSD/utilities/alert_utilities";
import ConfirmationModal from "USSD/components/SaveUssdSurvey";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const defaultEdgeOptions = {
  animated: false,
  type: "smoothstep",
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onSelectionChange: state.onSelectionChange,
  setNodes: state.setNodes,
});

function USSDBuilder({setStep}) {

  const user = useSelector((state) => state.UserReducer.user);
  const navigate = useNavigate
  const nodeTypes = useMemo(
    () => ({
      startSurvey: StartSurvey,
      titleNode: TitleNode,
      questionNode: QuestionNode,
      answerNode: AnswerNode,
      freeTextAnswerNode: FreeTextAnswerNode,
      endSurvey: EndSurvey,
    }),
    []
  );

  const [questions, setQuestions] = useState([]);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonDisabled = questions.length === 0;
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [shareableLink, setShareableLink] = useState(null);



  const handleGoBack = () => setStep(1);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    onSelectionChange,
  } = useStore(useShallow(selector));

  const onDrop = useCallback(
    (event) => onDropNode(event, reactFlowInstance, setNodes, nodes),
    [nodes, reactFlowInstance, setNodes]
  );

  const handlePreviewClick = () => {
    setIsModalOpen(true);
  };

  //* function to create question nodes
  function createQuestions(nodes, edges) {
    const questionsMap = {};

    console.log("nodes", nodes);
    console.log("edges", edges);

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
        if (answerNode && answerNode.type === "answerNode") {
          question.answers.push({
            text: answerNode.data.text,
            next: null,
            id: answerNode.id,
          });
        }
        if (answerNode && answerNode.type === "freeTextAnswerNode") {
          question.answers.push({
            text: `free_text_${answerNode.id}`,
            next: null,
            id: answerNode.id,
          });
        }
      }
    });

    // Third pass: Link answers to next questions
    edges.forEach((edge) => {
      const answerNode = nodes.find((node) => node.id === edge.source);
      const nextQuestion = questionsMap[edge.target];

      if (answerNode && nextQuestion) {
        Object.values(questionsMap).forEach((question) => {
          question.answers.forEach((answer) => {
            if (answer.id === answerNode.id) {
              answer.next = nextQuestion.id;
            }
          });
        });
      }
    });

    return Object.values(questionsMap);
  }

  useEffect(() => {
    const loadQuestions = () => {
      const storageData = localStorage.getItem("ussd-storage");
      if (storageData) {
        const parsedData = JSON.parse(storageData);
        const { nodes, edges } = parsedData.state;
        const questions = createQuestions(nodes, edges);
        setQuestions(questions);
      }
    };
    loadQuestions();
  }, [nodes, edges]);

  useEffect(()=>{
    const generateShareableLink = () => {
      const encodedState = encodeURIComponent(JSON.stringify(questions));
      // const generatedUrl = `${window.location.origin}/preview?state=${encodedState}`;
      const new_url = `state=${encodedState}`
      console.log("generated_url", new_url);
      return new_url;
    };
    const shareable_link = generateShareableLink();
    setShareableLink(shareable_link);

  },[questions])

  const openModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveClick = () => {
    setConfirmModalOpen(true);
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
  };

  return (
    <div className="h-screen border border-gray-500 overflow-hidden rounded-md">
      <div className="grid h-full grid-cols-12">
        {/* Sidebar */}
        <div className="col-span-2 flex flex-col h-full">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-span-7 flex flex-col h-full">
          <div className="h-24 p-4 shadow-md flex items-center justify-center">
            <Box>
              <Flex gap="3" align={"end"}>
                <Button
                  disabled={buttonDisabled}
                  color="yellow"
                  variant="soft"
                  onClick={handlePreviewClick}
                >
                  <EyeOpenIcon /> Preview
                </Button>
                {/* <Button
                  disabled={buttonDisabled}
                  color="blue"
                  variant="soft"
                  onClick={() => {
                    const link = generateShareableLink();
                    navigator.clipboard.writeText(link);
                    showSuccessAlert("Shareable link copied to clipboard!");
                  }}
                >
                  <Share1Icon /> Copy Link
                </Button> */}
                <Button
                  color="cyan"
                  variant="soft"
                  onClick={handleSaveClick}
                  disabled={buttonDisabled}
                >
                  <UploadIcon /> Save
                </Button>
                <Button color="red" variant="soft" onClick={handleGoBack}>
                  <ThickArrowLeftIcon /> Go Back
                </Button>
              </Flex>
            </Box>
          </div>

          {/* Flow Area */}
          <div className="flex-grow">
            <Toaster position="bottom-center" reverseOrder={false} />
            <ReactFlowProvider>
              <ReactFlow
                onDragOver={onDragOver}
                nodes={nodes}
                edges={edges}
                onDrop={onDrop}
                onInit={setReactFlowInstance}
                selectNodesOnDrag
                onSelectionChange={onSelectionChange}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                snapToGrid
                fitView
              >
                <Controls />
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={20}
                  size={1}
                  color="#666666"
                />
              </ReactFlow>
            </ReactFlowProvider>
          </div>
        </div>

        {/* Properties Bar */}
        <div className="col-span-3 flex flex-col h-full">
          <PropertiesBar />
        </div>
      </div>

      <MobilePreviewModal
        isOpen={isModalOpen}
        onRequestClose={openModal}
        nodes={nodes}
        edges={edges}
      />

       {/* //Todo => Confirmation Modal for Save */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        setConfirmModalOpen={setConfirmModalOpen}
        onCancel={handleCancel}
        nodes={nodes}
        edges={edges}
        shareableLink={shareableLink}
      />
    </div>
  );
}

export default USSDBuilder;
