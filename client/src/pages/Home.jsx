import {
  Box,
  Container,
  Flex,
  SkeletonText,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import Card from "../components/Card";
import { posts } from "../data";
import { Search2Icon } from "@chakra-ui/icons";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { useState } from "react";

const Home = () => {
  const [map, setMap] = useState();
  const handleClickModal = () => {
    alert("123");
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <SkeletonText />;

  const center = {
    lat: -37.840935,
    lng: 144.946457,
  };

  return (
    <Container display="flex" direction="column" maxWidth="100%">
      {/* restrictions={{ country: "Australia" }} */}
      <Flex
        direction="column"
        justifyContent="space-between"
        gap="20px"
        width="40%"
        marginTop="20px"
      >
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </Flex>
      <Box
        width="60%"
        marginTop="20px"
        marginLeft="20px"
        border="1px"
        borderColor="teal.600"
        borderRadius="lg"
      >
        {/* Google Map */}
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={10}
          options={{
            //zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          // onLoad={(map) => setMap(map)}
        >
          <MarkerF
            position={{ lat: -37.840935, lng: 144.946457 }}
            onClick={() => handleClickModal()}
          />
        </GoogleMap>
      </Box>
    </Container>
  );
};

export default Home;
