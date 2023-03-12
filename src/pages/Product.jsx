import { Box } from "@chakra-ui/react";
import React from "react";

import { data } from "./Data/productsData";

import CartItem from "../components/productCardItem";
const Product = () => {
  return (
    <Box
      display="grid"
      width="90%"
      margin="auto"
      gridTemplateColumns={{
        base: "repeat(1,1fr)",
        sm: "repeat(2,1fr)",
        lg: "repeat(3,1fr)",
        xl: `repeat(3,1fr)`,
      }}
      gap="20px"
      marginTop="50px"
      marginBottom="50px"
    >
      {data.map((item, index) => (
        <CartItem {...item} key={index} />
      ))}
    </Box>
  );
};

export default Product;
