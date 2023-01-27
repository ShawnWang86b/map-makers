import { Box, Text, Image, Button, transition } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Card = ({ post }) => {
  return (
    <Box width="30%" padding="10px" shadow="lg" borderRadius="lg">
      <Link to={`/post/${post.id}`}>
        <Text>{post.title}</Text>
        <Image
          src={post.img}
          width="100%"
          height="200px"
          marginY="20px"
          borderRadius="lg"
        />
        <Text marginBottom="40px">{post.desc}</Text>
        <Button
          backgroundColor="#92BCBA"
          color="#FFF"
          _hover={{ backgroundColor: "#92BCBA" }}
        >
          Read more
        </Button>
      </Link>
    </Box>
  );
};

export default Card;
