import { Box, Button } from "@chakra-ui/react";

const StrategiesLoginButton = ({
  icon,
  backgroundColor,
  strategyName,
  color,
}) => {
  return (
    <Button
      leftIcon={icon}
      backgroundColor={backgroundColor}
      color={color}
      variant="solid"
      fontSize="lg"
      boxShadow="base"
      width={{ base: "300px", sm: "480px" }}
      height="50px"
      data-testid="strategiesLoginButton"
    >
      <Box flexGrow={1}>Continue with {strategyName}</Box>
    </Button>
  );
};

export default StrategiesLoginButton;
