import {
  ComponentInstanceIcon,
  InputIcon,
  ListBulletIcon,
  PlayIcon,
  QuestionMarkCircledIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import { Box, Text, Flex, HoverCard, Heading } from "@radix-ui/themes";
import { onDragStart } from "../../utilities/drag_utilities";

const Index = () => {
  return (
    <div className="h-full">
      <div className="h-24 shadow-md pt-4" style={{ background: "#f8f8f8" }}>
        <div className="h-full flex items-start justify-center flex-col mb-10 p-6">
          <Flex align={"center"} justify={"center"} gap={"2"}>
            <Text size={"3"} weight={"medium"} style={{ color: "#06163A" }}>
              USSD Survey Builder
            </Text>
          </Flex>
          <hr style={{ background:"orange" , width: "100%", margin: "10px 0" }} />
          <Text
            size={"3"}
            weight={"bold"}
            style={{ color: "#06163A", padding: "10px 0" }}
          >
            <Flex gap="2" align="center">
              Main Widgets
            </Flex>
          </Text>
        </div>
      </div>
      <div className="h-full shadow-lg" style={{ background: "#f8f8f8" }}>
        <div className="grid grid-cols-4 gap-7 p-4">
          <Box
            as="div"
            draggable
            onDragStart={(event) => onDragStart(event, "startSurvey")}
            className="col-span-2 w-[80px] bg-white group rounded-md h-24 border shadow-md hover:shadow-lg hover:border-orange-400 transform transition-transform duration-300 hover:scale-105"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border:"1px solid #c4c4c4"
            }}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              gap="3"
              className="h-full w-full"
            >
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <PlayIcon
                    width="32"
                    height="32"
                    className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
                  />
                </HoverCard.Trigger>
                <HoverCard.Content maxWidth="300px">
                  <Flex gap="4">
                    <Box>
                      <Heading size="3" as="h3">
                        Description
                      </Heading>
                      <Text as="div" size="2" color="gray" mb="2">
                        Info
                      </Text>
                      <Text as="div" size="2">
                        Start the survey. (Required for the start of your new
                        survey)
                      </Text>
                    </Box>
                  </Flex>
                </HoverCard.Content>
              </HoverCard.Root>
              <Text
                size="3"
                align="center"
                weight="medium"
                className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
              >
                Start
              </Text>
            </Flex>
          </Box>
          <Box
            as="div"
            draggable
            onDragStart={(event) => onDragStart(event, "endSurvey")}
            className="col-span-2 group w-[80px] rounded-md h-24 border bg-white shadow-md hover:shadow-lg hover:border-orange-400 transform transition-transform duration-300 hover:scale-105"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border:"1px solid #c4c4c4"
            }}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              gap="3"
              className="h-full w-full"
            >
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <ComponentInstanceIcon
                    width="32"
                    height="32"
                    className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
                  />
                </HoverCard.Trigger>
                <HoverCard.Content maxWidth="300px">
                  <Flex gap="4">
                    <Box>
                      <Heading size="3" as="h3">
                        Description
                      </Heading>
                      <Text as="div" size="2" color="gray" mb="2">
                        End
                      </Text>
                      <Text as="div" size="2">
                        End the survey (Required for the end of your survey)
                      </Text>
                    </Box>
                  </Flex>
                </HoverCard.Content>
              </HoverCard.Root>
              <Text
                size={"3"}
                align={"center"}
                weight={"medium"}
                className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
              >
                End
              </Text>
            </Flex>
          </Box>
          <Box
            draggable
            onDragStart={(event) => onDragStart(event, "titleNode")}
            className="col-span-2 group bg-white rounded-md h-24 border  w-[80px] shadow-md hover:shadow-lg hover:border-orange-400 transform transition-transform duration-300 hover:scale-105"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border:"1px solid #c4c4c4"
            }}
          >
            <Flex
              direction="column"
              align="center"
              justify={"center"}
              gap="3"
              className="h-full w-full"
            >
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <TextIcon
                    width="32"
                    height="32"
                    className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
                  />
                </HoverCard.Trigger>
                <HoverCard.Content maxWidth="300px">
                  <Flex gap="4">
                    <Box>
                      <Heading size="3" as="h3">
                        Description
                      </Heading>
                      <Text as="div" size="2" color="gray" mb="2">
                        Title
                      </Text>
                      <Text as="div" size="2">
                        Add a title for your survey
                      </Text>
                    </Box>
                  </Flex>
                </HoverCard.Content>
              </HoverCard.Root>
              <Text
                size={"3"}
                align="center"
                weight="medium"
                className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
              >
                Title
              </Text>
            </Flex>
          </Box>
          <Box
            draggable
            onDragStart={(event) => onDragStart(event, "questionNode")}
            className="col-span-2 group bg-white rounded-md h-24 border w-[80px] shadow-md hover:shadow-lg hover:border-orange-400 transform transition-transform duration-300 hover:scale-105"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border:"1px solid #c4c4c4"
            }}
          >
            <Flex
              direction="column"
              align="center"
              justify={"center"}
              gap="3"
              className="h-full w-full"
            >
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <QuestionMarkCircledIcon
                    width="32"
                    height="32"
                    className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
                  />
                </HoverCard.Trigger>
                <HoverCard.Content maxWidth="300px">
                  <Flex gap="4">
                    <Box>
                      <Heading size="3" as="h3">
                        Description
                      </Heading>
                      <Text as="div" size="2" color="gray" mb="2">
                        Question
                      </Text>
                      <Text as="div" size="2">
                        Add your question in this node
                      </Text>
                    </Box>
                  </Flex>
                </HoverCard.Content>
              </HoverCard.Root>
              <Text
                size={"3"}
                align={"center"}
                weight={"medium"}
                className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
              >
                Question
              </Text>
            </Flex>
          </Box>
        </div>
        <Text
          size={"3"}
          style={{ fontWeight: "bold" }}
          className="p-4 text-sm text-blue-950"
        >
          Answer Widgets
        </Text>
        <div className="grid grid-cols-4 gap-4 p-4">
          <Box
            draggable={true}
            onDragStart={(event) => onDragStart(event, "answerNode")}
            className="col-span-2 group w-[80px] bg-white rounded-md h-24 border shadow-md hover:shadow-lg hover:border-orange-400 transform transition-transform duration-300 hover:scale-105"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border:"1px solid #c4c4c4"
            }}
          >
            <Flex
              direction="column"
              align="center"
              justify={"center"}
              gap="3"
              className="h-full w-full"
            >
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <ListBulletIcon
                    width="32"
                    height="32"
                    className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
                  />
                </HoverCard.Trigger>
                <HoverCard.Content maxWidth="300px">
                  <Flex gap="4">
                    <Box>
                      <Heading size="3" as="h3">
                        Description
                      </Heading>
                      <Text as="div" size="2" color="gray" mb="2">
                        Multiple Choice Answer
                      </Text>
                      <Text as="div" size="2">
                        Add an option for a question demanding a single select
                        answer
                      </Text>
                    </Box>
                  </Flex>
                </HoverCard.Content>
              </HoverCard.Root>
              <Text
                size={"3"}
                align="center"
                weight="medium"
                className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
              >
                Options
              </Text>
            </Flex>
          </Box>
          <Box
            draggable={true}
            onDragStart={(event) => onDragStart(event, "freeTextAnswerNode")}
            className="col-span-2 w-[80px] group bg-white rounded-md h-24 border  border-orange-500 shadow-md hover:shadow-lg hover:border-orange-400 transform transition-transform duration-300 hover:scale-105"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border:"1px solid #c4c4c4"
            }}
          >
            <Flex
              direction="column"
              align="center"
              justify={"center"}
              gap="3"
              className="h-full w-full"
            >
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <InputIcon
                    width="32"
                    height="32"
                    className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
                  />
                </HoverCard.Trigger>
                <HoverCard.Content maxWidth="300px">
                  <Flex gap="4">
                    <Box>
                      <Heading size="3" as="h3">
                        Description
                      </Heading>
                      <Text as="div" size="2" color="gray" mb="2">
                        Free Text Answer
                      </Text>
                      <Text as="div" size="2">
                        Expecting a user input as an answer, use this node.
                      </Text>
                    </Box>
                  </Flex>
                </HoverCard.Content>
                <Text
                  size={"3"}
                  align="center"
                  weight="medium"
                  className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
                >
                  Free-Text
                </Text>
              </HoverCard.Root>
            </Flex>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Index;
