import { Box } from "@chakra-ui/react";
import ReactLoading from "react-loading";
import backgroundColor from "./backgroundColor";

const HandleLoading = () => {
  return (
    <Box width="10%" margin="auto" marginTop="5" marginBottom="10">
      <ReactLoading type={"bars"} color={backgroundColor} />
    </Box>
  );
};

export default HandleLoading;
