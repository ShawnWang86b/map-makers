import { Flex } from "@chakra-ui/react";
import Card from "../components/Card";
import { posts } from "../data";

const Home = () => {
  return (
    <Flex
      justifyContent="space-between"
      paddingX="100px"
      paddingY="50px"
      flexWrap="wrap"
      maxW="8xl"
      margin="auto"
    >
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </Flex>
  );
};

export default Home;
