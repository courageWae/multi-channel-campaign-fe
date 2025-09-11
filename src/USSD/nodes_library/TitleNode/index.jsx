import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { Handle, Position } from "reactflow";
import PropTypes from "prop-types";
import { TextIcon } from "@radix-ui/react-icons";

const Index = ({ isConnectable, data, selected }) => {
  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box>
        <Card
          style={{
            backgroundColor: data.color,
            borderTop:"5px solid #FD00A0C7",
            borderBottom:"2px solid #FD00A0C7",
            borderRadius:"15px",
            boxShadow:selected ? "2px 0px 5px rgba(0,0,0,0.3)":""
          }}
        >
          <Flex gap="2" align="center">
            <Box>
              <Box as="div" size="1">
                <Flex gap="1" align="center" style={{ color: data.titleColor }}>
                  <TextIcon width={24} height={24}
                    style={{
                      marginRight: "5px",
                      padding: "5px",
                      background: "#C2007BEF",
                      color: "#ffffff",
                      borderRadius: "50%",
                    }}
                  />
                  <Text weight="bold" size="1" style={{color:"#C2007BEF"}}>
                    Title
                  </Text>
                </Flex>
              </Box>
              <hr style={{borderTop:"1px solid #FD00A0C7", margin:"5px 0"}} />
              <Text
                as="div"
                size="1"
                color="gray"
                style={{ color: data.subtitleColor, width: "180px", fontWeight:"500" }}
              >
                {data.text ? data.text : "USSD Title..."}
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired,
  isConnectable: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Index;
