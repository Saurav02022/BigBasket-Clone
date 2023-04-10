import { Box, Image } from "@chakra-ui/react";
import serverdown from "../images/MainCarousel/serverdown.jpg";

const HandleError = () => {
  return (
    <Box margin="auto" marginTop="10" marginBottom="10">
      <Image src={serverdown} margin="auto" />
    </Box>
  );
};

export default HandleError;
