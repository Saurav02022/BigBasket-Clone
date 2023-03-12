import { Box, Heading, Image } from "@chakra-ui/react";
import React from "react";

const FourCards = ({ data = [], xl = 4, text }) => {
  return (
    <>
      <Heading
        as="h2"
        textAlign="center"
        marginTop="20px"
        fontFamily="sans-serif"
        fontSize="xx-large"
        fontWeight="500"
      >
        {text}
      </Heading>
      <Box
        display="grid"
        width="90%"
        margin="auto"
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
          xl: `repeat(${xl},1fr)`,
        }}
        gap="10px"
        marginTop="20px"
      >
        {data.map((item) => {
          return (
            <Box>
              <Image src={item} />
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default FourCards;
