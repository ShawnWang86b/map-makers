import { Box, Text, Flex, Button, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Card = ({ post }) => {
  return (
    <Box
      width="100%"
      padding="10px"
      shadow="md"
      border="1px"
      borderColor="teal.600"
      borderRadius="lg"
    >
      <Link to={`/post/${post.id}`}>
        <Box display="flex" alignItems="center" gap="20px" marginBottom="20px">
          <Avatar size="lg" src={post.img} />
          <Text fontWeight="600" fontSize="24px">
            {post.title}
          </Text>
        </Box>

        <Text marginBottom="40px">{post.desc}</Text>
        <Flex direction="row-reverse">
          <Button
            backgroundColor="#92BCBA"
            color="#FFF"
            _hover={{ backgroundColor: "#62beb9" }}
          >
            Read more
          </Button>
        </Flex>
      </Link>
    </Box>
  );
};

export default Card;
