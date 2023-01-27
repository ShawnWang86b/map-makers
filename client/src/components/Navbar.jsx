import { Flex, Container, Button } from "@chakra-ui/react";
import { navigate } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Flex backgroundColor="#92BCBA" padding="10px">
      <Container
        maxW="8xl"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex
          fontSize="24px"
          fontWeight="500"
          color="#FFFFFF"
          cursor="pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          LuluHome
        </Flex>
        <Flex gap="20px">
          <Button
            backgroundColor="#92BCBA"
            color="#FFFFFF"
            _hover={{ backgroundColor: "#92BCBA" }}
          >
            Shawn
          </Button>
          <Button
            backgroundColor="#92BCBA"
            color="#FFFFFF"
            _hover={{ backgroundColor: "#92BCBA" }}
          >
            Sign out
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
