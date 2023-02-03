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
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useMemo, useState } from "react";

const Home = () => {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const center = useMemo(() => ({ lat: -37.8550658, lng: 145.1542159 }), []);
  if (!isLoaded) return <div>Loading</div>;

  const PlacesAutoComplete = () => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        componentRestrictions: {
          country: "au",
        },
      },
      debounce: 300,
    });

    const handleSelect =
      ({ description }) =>
      () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          console.log("📍 Coordinates: ", { lat, lng });
        });
      };

    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li key={place_id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });

    return (
      <>
        {console.log(data)}
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Search Address"
        />
        <Box>{status === "OK" && <ul>{renderSuggestions()}</ul>}</Box>
      </>
    );
  };

  return (
    <Container display="flex" direction="column" maxWidth="100%">
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
        <PlacesAutoComplete />
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <MarkerF position={center} />
        </GoogleMap>
      </Box>
    </Container>
  );
};

export default Home;
