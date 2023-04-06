import { Box, Heading, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import CartItem from "../components/productCardItem";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/ProductPage/action";

const Product = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((store) => store.productReducer);
  const [sortby, setSortBy] = useState("");

  useEffect(() => {
    dispatch(getData(sortby));
  }, [sortby]);

  if (loading) {
    return <Heading textAlign="center">loading...</Heading>;
  }
  if (error) {
    return (
      <Heading textAlign="center" color="red">
        Server Down Please Try again later
      </Heading>
    );
  }
  return (
    <>
      <Box
        width={{
          base: "60%",
          lg: "30%",
        }}
        margin="auto"
        marginTop="5"
        display={"flex"}
        flexDirection={{
          base: "column",
          md: "row",
          lg: "row",
        }}
        gap="5"
      >
        <Select onChange={(e) => setSortBy(e.target.value)}>
          <option value=" ">Sort by Price</option>
          <option value="all">All</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select>
      </Box>
      <Box
        display="grid"
        width="90%"
        margin="auto"
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
          xl: `repeat(4,1fr)`,
        }}
        gap="20px"
        marginTop="50px"
        marginBottom="50px"
      >
        {data.map((item, index) => (
          <CartItem {...item} key={index} />
        ))}
      </Box>
    </>
  );
};

export default Product;
