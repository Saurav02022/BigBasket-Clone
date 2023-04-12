import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Image } from "@chakra-ui/react";

const PaymentConfirm = () => {
  const navigae = useNavigate();

  setTimeout(() => {
    alert("Redirecting to homepage...");
    navigae("/");
  }, 3000);
  return (
    <Flex
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
      fontWeight="700"
      fontSize={30}
      m="auto"
      mb="50"
      textAlign="center"
      w={{ lg: "100%", sm: "90%", base: "905" }}
    >
      <Box w={400}>
        <Image src="https://static.vecteezy.com/system/resources/previews/006/900/704/original/green-tick-checkbox-illustration-isolated-on-white-background-free-vector.jpg" />
      </Box>
      <h1>Your order has been placed successfully</h1>
    </Flex>
  );
};

export default PaymentConfirm;
