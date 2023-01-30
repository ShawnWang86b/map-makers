import { Flex, Container, Button } from "@chakra-ui/react";
import { navigate } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = ({user}) => {
  const navigate = useNavigate();
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
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
       {user?
        (<Flex gap="20px">
          <Image  src={user.photos[0].value}
              alt=""/>
          <Button
            backgroundColor="#92BCBA"
            color="#FFFFFF"
            _hover={{ backgroundColor: "#92BCBA" }}
          >
            {user.displayName}
          </Button>
          <Button
            backgroundColor="#92BCBA"
            color="#FFFFFF"
            _hover={{ backgroundColor: "#92BCBA" }}
            onClick={logout}
          >
            Logout
          </Button>
        </Flex>):(<Link to='login'>
          Login
        </Link>)}

      </Container>
    </Flex>
  );
};

export default Navbar;
