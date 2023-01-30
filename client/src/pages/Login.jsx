import { Box, Flex, Button, Input } from "@chakra-ui/react";
import { AiOutlineGoogle, AiFillGithub, AiFillFacebook } from "react-icons/ai";
const Login = () => {
  const handleGoogleLogin = () =>{
    window.open("http://localhost:5000/auth/google", "_self");
  }

  const handleGithubLogin = () =>{
    window.open("http://localhost:5000/auth/github", "_self");
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      border="1px"
      borderColor="gray.200"
      width="50%"
      margin="auto"
      padding="20px"
      gap="100px"
      boxShadow="lg"
      rounded="md"
      marginTop="200px"
    >
      <Flex direction="column" width="50%" gap="50px">
        <Button
          leftIcon={<AiOutlineGoogle />}
          backgroundColor="red.400"
          variant="solid"
          _hover={{ backgroundColor: "red.500" }}
          onClick={handleGoogleLogin}
        >
          Google
        </Button>
        <Button
          leftIcon={<AiFillFacebook />}
          backgroundColor="blue.400"
          variant="solid"
          _hover={{ backgroundColor: "blue.500" }}
        >
          Facebook
        </Button>
        <Button
          leftIcon={<AiFillGithub />}
          backgroundColor="#000"
          color="white"
          variant="solid"
          _hover={{ backgroundColor: "#2b2727" }}
          onClick={handleGithubLogin}
        >
          Github
        </Button>
      </Flex>
      <Flex direction="column" width="50%" gap="50px">
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button
          backgroundColor="#92BCBA"
          variant="solid"
          _hover={{ backgroundColor: "#92BCBA" }}
        >
          Login
        </Button>
      </Flex>
    </Box>
  );
};

export default Login;
