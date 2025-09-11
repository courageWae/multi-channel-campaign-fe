import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { Handle, Position } from "reactflow";
import PropTypes from "prop-types";
import { ListBulletIcon } from "@radix-ui/react-icons";

const Index = ({ isConnectable, data, selected }) => {
  return (
    <Box>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box>
        <Card
          style={{
            backgroundColor: data.color,
            borderTop: "5px solid #3f88c5",
            borderBottom:"2px solid #3f88c5",
            borderRadius:"15px",
            boxShadow:selected ? "2px 0px 5px rgba(0,0,0,0.3)":""
          }}
        >
          <Flex gap="2" align="center">
            <Box>
              <Box as="div" size="1" weight="bold">
                <Flex gap="2" align="center" style={{ color: data.titleColor }}>
                  <ListBulletIcon width={24} height={24} style={{
                      marginRight: "5px",
                      padding: "5px",
                      background: "#3f88c5",
                      color: "#ffffff",
                      borderRadius: "50%",
                    }} />
                  <Text weight="bold" size="1" style={{color:'#3f88c5'}}>
                    Multi Choice Answer
                  </Text>
                </Flex>
              </Box>
              <hr style={{borderTop:"1px solid #3f88c5", margin:"5px 0px"}}/>
              <Text
                as="div"
                size="1"
                color="gray"
                style={{ color: data.subtitleColor, width: "180px", fontWeight:"500" }}
              >
                {data.text
                  ? data.text
                  : "Option will display here..."}
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
    </Box>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired,
  isConnectable: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Index;
