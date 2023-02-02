import { useState } from "react";
import {
  Flex,
  Container,
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const [searchAddress, setSearchAddress] = useState("");

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const handleButtonClick = () => {
    console.log("searchAddress", searchAddress);
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

        <Flex gap="20px">
          <Autocomplete
            restrictions={{ country: ["au"] }}
            onPlaceChanged={(e) => setSearchAddress(e.target.value)}
          >
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Search2Icon color="white" />}
              />
              <Input
                type="text"
                placeholder="Suburb or address"
                width="500px"
                borderColor="white"
                focusBorderColor="white"
              />
            </InputGroup>
          </Autocomplete>
          <Button
            colorScheme="white"
            borderColor="white"
            border="1px"
            onClick={() => handleButtonClick()}
          >
            Button
          </Button>
        </Flex>
        {user ? (
          <Flex gap="20px">
            <Image
              src={user.photos[0].value}
              alt="avatar"
              borderRadius="full"
              boxSize="50px"
            />
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
          </Flex>
        ) : (
          <Link to="login">Login</Link>
        )}
      </Container>
    </Flex>
  );
};

export default Navbar;
