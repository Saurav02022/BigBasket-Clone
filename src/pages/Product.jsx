import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";

import CartItem from "../components/productCardItem";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/ProductPage/action";

const Product = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((store) => store.productReducer);

  useEffect(() => {
    dispatch(getData());
  }, []);

  if (loading) {
    return <Heading textAlign="center">loading...</Heading>;
  }
  if (error) {
    return (
      <Heading textAlign="center" color="red">
        Server Down PLease Try again Later
      </Heading>
    );
  }
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
