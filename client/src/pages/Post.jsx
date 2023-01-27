import { Image, Text, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { posts } from "../data";
const Post = () => {
  const location = useLocation();
  //location pathname e.g. "/post/1"
  const path = location.pathname.split("/")[2];

  //find a post whose id equal to 'path'
  const post = posts.find((post) => path === post.id.toString());
  return (
    <Flex
      direction="column"
      alignItems="center"
      margin="auto"
      objectFit="cover"
    >
      <Image src={post.img} width="100%" height="500px" />
      <Text marginBottom="20px" fontWeight="500" fontSize="44px" padding="20px">
        {post.title}
      </Text>
      <Text marginBottom="20px" padding="20px">
        {post.desc}
      </Text>
      <Text padding="20px">{post.longDesc}</Text>
    </Flex>
  );
};

export default Post;
