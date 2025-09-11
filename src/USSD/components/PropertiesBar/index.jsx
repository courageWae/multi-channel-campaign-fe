import { Box, Card, Flex, Text } from "@radix-ui/themes";
import useStore from "components/UssdSurveyBuilder/store";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import TitleNodeProperties from "../../property_panel/TitleNodeProperties";
import StartSurveyProperties from "../../property_panel/StartSurveyProperties";
import QuestionNodeProperties from "../../property_panel/QuestionNodeProperties";
import AnswerNodeProperties from "../../property_panel/AnswerNodeProperties";
import EndSurveyProperties from "../../property_panel/EndSurveyProperties";
import FreeAnswerNodeProperties from "../../property_panel/FreeAnswerNodeProperties";
import { LayersIcon } from "@radix-ui/react-icons";

const selector = (state) => ({
  selectedNode: state.selectedNode,
});

const Index = () => {
  const { selectedNode } = useStore(useShallow(selector));
  const [panelProperties, setPanelProperties] = useState(null);

  useEffect(() => {
    if (selectedNode && selectedNode.length) {
      const selectedNodeValue = selectedNode[0];
      switch (selectedNodeValue.type) {
        case "startSurvey":
          setPanelProperties(
            <StartSurveyProperties
              id={selectedNodeValue.id}
              data={selectedNodeValue.data}
            />
          );
          return;
        case "titleNode":
          setPanelProperties(
            <TitleNodeProperties
              id={selectedNodeValue.id}
              data={selectedNodeValue.data}
            />
          );
          return;
        case "questionNode":
          setPanelProperties(
            <QuestionNodeProperties
              id={selectedNodeValue.id}
              data={selectedNodeValue.data}
            />
          );
          return;
        case "answerNode":
          setPanelProperties(
            <AnswerNodeProperties
              id={selectedNodeValue.id}
              data={selectedNodeValue.data}
            />
          );
          return;
        case "freeTextAnswerNode":
          setPanelProperties(
            <FreeAnswerNodeProperties
              id={selectedNodeValue.id}
              data={selectedNodeValue.data}
            />
          );
          return;
        case "endSurvey":
          setPanelProperties(
            <EndSurveyProperties
              id={selectedNodeValue.id}
              data={selectedNodeValue.data}
            />
          );
          return;
        default:
          setPanelProperties(null);
          return;
      }
    }
  }, [selectedNode, setPanelProperties]);

  return (
    <>
      <div className="h-full">
        <div className="h-24 shadow-2xl">
          <div className="h-full flex items-center mb-10 p-4">
            <Text size={"3"} color="#FF9100D5" weight={"bold"}>
              <Flex gap="2" align="center">
                <LayersIcon width={32} height={32} color="#c4c4c4" />
                Node Properties
              </Flex>
            </Text>
          </div>
        </div>
        <div className="bg-white h-full w-full shadow-lg  border-l-2 border-gray-300 border-t-2">
          {panelProperties ? (
            
            <Box
              className="h-3/5  w-full mx-auto"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "30vh",
                width:"100%",
                backgroundColor: "#ffffff",
                padding: "10px",
                borderRadius: "5px",
                
              }}
            >
              <Card
              size={"5"}
                style={{
                  backgroundColor: "#ffffff",
                  height:"100%",
                }}
              >
                <Flex gap="3" direction="column" width="100%" height="100%" className=" w-full">
                  {panelProperties}
                </Flex>
              </Card>
            </Box>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Index;
